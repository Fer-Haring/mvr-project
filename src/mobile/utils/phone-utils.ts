/* eslint-disable no-useless-catch */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IS_DEVELOPMENT, IS_STAGING } from '@webapp/configuration/constants';
import {
  BiometricAuthRequest,
  OpenCameraRequest,
  OpenCameraResponse,
} from '@webapp/mobile/platform/phone/model/phone-action-payloads';
import set from 'lodash/set';
import unset from 'lodash/unset';

import { OpenImagePickerRequest, OpenImagePickerResponse } from './PhoneActionPayloads';
import { logger } from './logger-utils';

type StripePaymentEvent = {
  type: string;
  hasPermission: boolean;
  value: number;
};

export type OSType = 'ios' | 'android';

export type PhoneActionType =
  | 'get_contacts'
  | 'payment_redirect_1'
  | 'open_url'
  | 'open_phone'
  | 'open_sms'
  | 'get_location'
  | 'close_sso'
  | 'open_sso'
  | 'open_camera'
  | 'request_health_permissions'
  | 'stripe_payment'
  | 'face_id_auth'
  | 'show_welcome_page'
  | 'show_about_sinapsis'
  | 'open_smart_selfie'
  | 'start_health_tracking'
  | 'open_os_health_app'
  | 'user_logged_in'
  | 'user_logged_out'
  | 'open_map'
  | 'validate_phone_permission'
  | 'request_phone_permission'
  | 'get_native_app_info'
  | 'open_app_settings'
  | 'open_image_picker'
  | 'update_steps_observer_reference_date'
  | 'native_app_min_version_signal'
  | 'refresh_webview'
  | 'open_keyboard_for_sms_code'
  | 'close_keyboard_for_sms_code'
  | 'send_analytics_event'
  | 'get_all_media_data'
  | 'change_web_app_url'
  | 'background_refresh_status'
  | 'validate_health_permission'
  | 'update_user_info'
  | 'get_steps_observer_status'
  | 'get_last_steps'
  | 'attempt_sending_accumulated_steps';
export interface PhoneActionRequest<T> {
  type: PhoneActionType;
  payload?: T;
  timeout?: number;
}

export interface PhoneActionResponse<T> {
  payload?: T;
}

export default class PhoneUtils {
  static hasNativeSupport(): boolean {
    return !!(window as any).nativeAppHandler;
  }

  static runAction<TRequest, TResponse>(request: PhoneActionRequest<TRequest>): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      let timeout = request.timeout
        ? setTimeout(
            () => reject(`Mobile operation: ${request.type} exceeded ${request.timeout}ms timeout`),
            request.timeout
          )
        : undefined;
      const requestCallback = `sb_${request.type}_${new Date().getTime()}`;

      const message = JSON.stringify({
        callback: `window.${requestCallback}`,
        type: request.type,
        payload: request.payload || {},
      });

      if (this.hasNativeSupport()) {
        set(window, requestCallback, (data?: string) => {
          try {
            if (timeout) {
              clearTimeout(timeout);
              timeout = undefined;
            }

            const operationResult = data ? JSON.parse(data) : {};
            if (request.type === 'validate_health_permission' && IS_STAGING) {
              logger.debug(`<!==== Validate validate_health_permission response: ${data} - message: ${message}`);
              logger.info(`<!==== Validate validate_health_permission response: ${data} - ${message}`);
              logger.log(`<!==== Validate validate_health_permission response: ${data} - ${message}`);
            }
            if (operationResult.status === 'success') {
              resolve(operationResult.payload as TResponse);
            } else {
              reject(operationResult.error);
            }
            unset(window, requestCallback);
          } catch (error) {
            logger.error(error);
            reject(error as any);
          }
        });

        (window as any).nativeAppHandler && (window as any).nativeAppHandler.postMessage(message);
      } else {
        reject({
          message: `Mobile action not supported: ${request.type}`,
        });
      }
    });
  }

  static listenAction<TResponse>(globalName: string, handle: (response: TResponse) => void): void {
    if (!PhoneUtils.hasNativeSupport()) {
      return;
    }
    const requestCallback = globalName;

    if (this.hasNativeSupport()) {
      set(window, requestCallback, (data?: string) => {
        try {
          const operationResult = data ? JSON.parse(data) : {};
          handle(operationResult);
        } catch (error) {
          logger.error(error);
        }
      });

      (window as any).nativeAppHandler && (window as any).nativeAppHandler.postMessage(onmessage);
    } else {
      logger.warn({
        message: `Mobile action not supported: ${globalName}`,
      });
    }
  }

  /**
   * Determine the mobile operating system.
   * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
   *
   * @returns {String}
   */
  static getMobileOperatingSystem(): 'windows' | 'android' | 'ios' | 'unknown' {
    if (IS_DEVELOPMENT) {
      return 'ios';
    }
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'windows';
    }

    if (/android/i.test(userAgent)) {
      return 'android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/i.test(userAgent) && !(window as any).MSStream) {
      return 'ios';
    }

    return 'unknown';
  }

  static handlePayment(paymentId: string, paymentToken: string) {
    if (PhoneUtils.hasNativeSupport()) {
      try {
        return PhoneUtils.runAction({
          type: 'stripe_payment',
          payload: {
            payment_id: paymentId,
            payment_token: paymentToken,
          },
        });
      } catch (e) {
        throw e;
      }
    } else {
      return undefined;
    }
  }

  static redirectOption1() {
    if (PhoneUtils.hasNativeSupport()) {
      try {
        return PhoneUtils.runAction({
          type: 'payment_redirect_1',
          payload: {},
        });
      } catch (e) {
        throw e;
      }
    } else {
      return undefined;
    }
  }

  static openImagePicker(request: OpenImagePickerRequest) {
    if (PhoneUtils.hasNativeSupport()) {
      try {
        return PhoneUtils.runAction<OpenImagePickerRequest, OpenImagePickerResponse>({
          type: 'open_image_picker',
          payload: request,
        });
      } catch (e) {
        throw e;
      }
    } else {
      return undefined;
    }
  }

  static async openCamera(activityId?: string, userId?: string, userToken?: string) {
    if (IS_DEVELOPMENT) {
      const response: OpenCameraResponse = {
        activity_id: activityId || '123',
        is_healthy: true,
        // picture_id: "31270b4d-d61b-46f9-8292-ccc32d973b57",
        status: 'confirmed',
      };

      return response;
    }

    return PhoneUtils.runAction<OpenCameraRequest, OpenCameraResponse>({
      type: 'open_camera',
      payload: {
        activity_id: activityId || '123',
        user_id: userId || '123',
        user_token: userToken || '123',
        healthy_message: 'That looks healthy!\nYou just doubled your points 🎉',
      },
    });
  }

  static async faceIdAuth(success: boolean) {
    if (IS_DEVELOPMENT) {
      const response: BiometricAuthRequest = {
        success: true,
        message: '',
      };
      return response;
    }

    return PhoneUtils.runAction<BiometricAuthRequest, BiometricAuthRequest>({
      type: 'face_id_auth',
      payload: {
        message: 'Please authenticate to continue',
        success: success,
      },
    });
  }
}

export const BasicPhoneUtils = {
  cameraPermissions: () => {
    const event = {
      type: 'camera_permission',
      hasPermission: true,
    };
    sendMessageToFlutter(event);
  },
  geoLocationPermissions: () => {
    const event = {
      type: 'geo_location_permission',
      hasPermission: true,
    };
    sendMessageToFlutter(event);
  },
  galleryPermissions: () => {
    const event = {
      type: 'gallery_permission',
      hasPermission: true,
    };
    sendMessageToFlutter(event);
  },
  gPayPayment: (value: number) => {
    const event: StripePaymentEvent = {
      type: 'gpay_payment',
      hasPermission: true,
      value: value,
    };
    runStripePayment(event);
  },
};
function sendMessageToFlutter(event: { type: string; hasPermission: boolean }) {
  window.nativeAppHandler.postMessage(JSON.stringify(event));
}
function runStripePayment(event: StripePaymentEvent) {
  window.nativeAppHandler.postMessage(JSON.stringify(event));
}
