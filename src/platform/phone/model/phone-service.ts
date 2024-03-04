import { IS_DEVELOPMENT } from '@webapp/configuration/constants';
import PhoneUtilities from '@webapp/utils/phone-utilities';
// import { compare } from 'semver';
import { OpenCameraRequest, OpenCameraResponse } from './phone-action-payloads';

class PhoneService {
  // static handlePushNotification(response: EventResponse<HandlePushNotificationEvent>) {
  //   NotificationsCTAHandler(response.payload.data);
  // }
  // static handleKeyboardEvent(response: EventResponse<HandleKeyboardEvent>): void {
  //   PhoneStoreUtils.setPhoneProperties({ keyboardOpened: response.payload.is_keyboard_opened });
  // }

  // static async requestFriends(): Promise<Friend[]> {
  //   if (IS_DEVELOPMENT && !PhoneUtilities.hasNativeSupport()) {
  //     const users = [...MockedExistingUsers, ...MockedUsers].map((item: any) => ({
  //       id: item.id.toString(),
  //       name: `${item.first_name} ${item.last_name}`,
  //       phones: item.phones || [],
  //       disabled: item.disabled,
  //     }));
  //     return users;
  //   }

  //   const actionResponse = await PhoneUtilities.runAction<void, Friend[]>({
  //     type: 'get_contacts',
  //   });
  //   return actionResponse;
  // }

  // static async openUrl(url: string) {
  //   if (IS_DEVELOPMENT || !PhoneUtilities.hasNativeSupport()) {
  //     window?.open(url, '_blank', 'noopener,noreferrer')?.focus();
  //   }
  //   return PhoneUtilities.runAction<OpenUrlRequest, void>({
  //     type: 'open_url',
  //     payload: {
  //       url: url,
  //     },
  //   });
  // }

  // static callNumber(phoneNumber: string) {
  //   return PhoneUtilities.runAction<OpenPhoneRequest, void>({
  //     type: 'open_phone',
  //     payload: {
  //       number: phoneNumber,
  //     },
  //   });
  // }

  // static openOSHealthApp() {
  //   return PhoneUtilities.runAction<void, void>({
  //     type: 'open_os_health_app',
  //   });
  // }

  // static async sendText(id: string, phoneNumber: string, message: string): Promise<OpenSMSResponse> {
  //   if (IS_DEVELOPMENT && !PhoneUtilities.hasNativeSupport()) {
  //     return {
  //       sms_sent: true,
  //     };
  //   }
  //   try {
  //     const response = await PhoneUtilities.runAction<OpenSMSRequest, OpenSMSResponse>({
  //       type: 'open_sms',
  //       payload: {
  //         id: id,
  //         number: phoneNumber,
  //         message: message,
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     return {
  //       sms_sent: false,
  //     };
  //   }
  // }

  // @debouncedRequestDecorator(10000)
  // static async getLocation() {
  //   if (
  //     IS_DEVELOPMENT ||
  //     (!!SessionUtils.getProfilePhone() && DEMO_USERS_PHONES.includes(SessionUtils.getProfilePhone()))
  //   ) {
  //     return {
  //       latitude: Number(DEMO_USERS_GEO_LOCATION[0]),
  //       longitude: Number(DEMO_USERS_GEO_LOCATION[1]),
  //     };
  //   }

  //   if (APP_MODE_WEB) {
  //     return BrowserUtils.getLocation();
  //   }

  //   return PhoneUtilities.runAction<void, GeoCoordinates>({
  //     type: 'get_location',
  //     timeout: 5000,
  //   });
  // }

  // static async openSSO() {
  //   return PhoneUtilities.runAction<void, void>({
  //     type: 'open_sso',
  //   });
  // }

  // static async closeSSO() {
  //   return PhoneUtilities.runAction<void, void>({
  //     type: 'close_sso',
  //   });
  // }

  static async openCamera(activityId: string, userId: string, userToken: string) {
    if (IS_DEVELOPMENT) {
      const response: OpenCameraResponse = {
        activity_id: activityId,
        is_healthy: true,
        // picture_id: "31270b4d-d61b-46f9-8292-ccc32d973b57",
        status: 'confirmed',
      };

      return response;
    }

    return PhoneUtilities.runAction<OpenCameraRequest, OpenCameraResponse>({
      type: 'open_camera',
      payload: {
        activity_id: activityId,
        user_id: userId,
        user_token: userToken,
        healthy_message: 'That looks healthy!\nYou just doubled your points 🎉',
      },
    });
  }

  //   static async sendLoginInformation(accessToken: AccessTokenDto, update = false) {
  //     if (!PhoneUtilities.hasNativeSupport() || IS_DEVELOPMENT) {
  //       return;
  //     }
  //     if (update) {
  //       return PhoneUtilities.runAction<UserLoginRequest, void>({
  //         type: 'update_user_info',
  //         payload: {
  //           id: accessToken.user_id,
  //           first_name: accessToken.user_first_name,
  //           last_name: accessToken.user_last_name,
  //           email: accessToken.user_email,
  //           user_api_key: accessToken.user_api_key,
  //           gender: '',
  //           is_first_login: false,
  //         },
  //       });
  //     }
  //     return PhoneUtilities.runAction<UserLoginRequest, void>({
  //       type: 'user_logged_in',
  //       payload: {
  //         id: accessToken.user_id,
  //         first_name: accessToken.user_first_name,
  //         last_name: accessToken.user_last_name,
  //         email: accessToken.user_email,
  //         user_api_key: accessToken.user_api_key,
  //         gender: '',
  //         is_first_login: true,
  //       },
  //     });
  //   }

  //   static async sendLogoutInformation() {
  //     if (IS_DEVELOPMENT) {
  //       return;
  //     }
  //     return PhoneUtilities.runAction<void, void>({
  //       type: 'user_logged_out',
  //     });
  //   }

  //   static async requestHealthPermissions(
  //     userId: string,
  //     userApiKey: string,
  //     forFutureActivity: boolean,
  //     lastStepsTackedDate?: Date,
  //     data_type: HealthPermissionsRequestDataType = 'STEPS'
  //   ) {
  //     if (IS_DEVELOPMENT) {
  //       const granted = confirm(`Do you want to give health ${data_type.toLowerCase()} permissions access?`);
  //       const response: HealthPermissionsResponse = {
  //         permissions_displayed: true,
  //         permissions_granted_by_user: granted,
  //         // permissions_health_app_installed: true,
  //         steps_count: 5000,
  //         measurement_start_date: dayjs(lastStepsTackedDate).valueOf(),
  //         measurement_end_date: dayjs().valueOf(),
  //       };

  //       return response;
  //     }

  //     return PhoneUtilities.runAction<HealthPermissionsRequest, HealthPermissionsResponse>({
  //       type: 'request_health_permissions',
  //       payload: {
  //         user_id: userId,
  //         user_api_key: userApiKey,
  //         for_future_activity: forFutureActivity,
  //         last_step_count_update: dayjs(lastStepsTackedDate).valueOf(),
  //         data_type,
  //       },
  //     })
  //       .then((response) => {
  //         return {
  //           ...response,
  //           permissions_displayed: true,
  //         };
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  //   }

  //   static async checkHealthPermissions(
  //     request: CheckHealthPermissionRequest = { data_type: 'STEPS' }
  //   ): Promise<CheckHealthPermissionResponse> {
  //     if (!PhoneUtilities.hasNativeSupport()) {
  //       return {
  //         status: 'granted',
  //       };
  //     }
  //     const response = await PhoneUtilities.runAction<CheckHealthPermissionRequest, CheckHealthPhonePermissionResponse>({
  //       type: 'validate_health_permission',
  //       payload: request,
  //     });

  //     let status: PermissionStatus = 'not_installed';

  //     if (!response.permissions_displayed) {
  //       status = 'not_requested';
  //     }

  //     if (response.permissions_displayed && response.permissions_granted_by_user) {
  //       status = 'granted';
  //     }

  //     if (response.permissions_displayed && !response.permissions_granted_by_user) {
  //       status = 'denied';
  //     }

  //     return {
  //       status: status,
  //     };
  //   }

  //   // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  //   static async getLastSteps(request: GetLastStepsRequest): Promise<GetLastStepsResponse> {
  //     if (!PhoneUtilities.hasNativeSupport()) {
  //       const response: GetLastStepsResponse = {
  //         permissions_displayed: true,
  //         permissions_granted_by_user: true,
  //         // permissions_health_app_installed: true,
  //         steps_count: 5000,
  //         measurement_start_date: dayjs(request.last_step_count_update).valueOf(),
  //         measurement_end_date: dayjs().valueOf(),
  //         platform: 'ios',
  //       };

  //       return response;
  //     }

  //     return PhoneUtilities.runAction<GetLastStepsRequest, GetLastStepsResponse>({
  //       type: 'get_last_steps',
  //       payload: request,
  //     });
  //   }

  //   static openProfileScore() {
  //     this.openUrl(APP_ACCOUNT_HOME);
  //   }

  //   static async showAboutWecare() {
  //     if (PhoneUtilities.hasNativeSupport()) {
  //       return PhoneUtilities.runAction<void, void>({
  //         type: 'show_welcome_page',
  //       });
  //     }
  //   }

  //   static async showAboutSinapsis() {
  //     if (PhoneUtilities.hasNativeSupport()) {
  //       return PhoneUtilities.runAction<void, void>({
  //         type: 'show_about_sinapsis',
  //       });
  //     }
  //   }

  //   static async openMedicalSelfie(activityId: string, userId: string) {
  //     if (IS_DEVELOPMENT) {
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //       const response: OpenSmartSelfieResponse = {
  //         activity_id: activityId,
  //         height_centimeters: 170,
  //         weight_kilograms: 72,
  //         bmi: 2.3,
  //         age: 37,
  //         gender: 'MALE',
  //         status: 'confirmed',
  //       };
  //       return response;
  //     }
  //     return PhoneUtilities.runAction<OpenSmartSelfieRequest, OpenSmartSelfieResponse>({
  //       type: 'open_smart_selfie',
  //       payload: {
  //         activity_id: activityId,
  //         user_id: userId,
  //         user_token: '',
  //       },
  //     });
  //   }

  //   static async openDirections(lat: number, long: number, location?: string) {
  //     if (IS_DEVELOPMENT && !PhoneUtilities.hasNativeSupport()) {
  //       PhoneService.openUrl(`http://maps.google.com/?daddr=${lat},${long}`);
  //     } else {
  //       PhoneUtilities.runAction<OpenMapRequest, void>({
  //         type: 'open_map',
  //         payload: {
  //           location_name: location,
  //           latitude: lat,
  //           longitude: long,
  //           mode: 'directions',
  //         },
  //       });
  //     }
  //   }

  //   static async checkPermission(permission: PhonePermissionType): Promise<CheckPermissionResponse> {
  //     if (IS_DEVELOPMENT) {
  //       const firstTime = !LocalStorageCacheUtils.getItemOrDefault(permission, false);
  //       return {
  //         status: firstTime ? 'not_requested' : 'granted',
  //       };
  //     }
  //     if (PhoneUtilities.getMobileOperatingSystem() === 'android' && permission === 'push_notification') {
  //       return {
  //         status: 'granted',
  //       };
  //     }
  //     if (permission === 'health_steps' || permission === 'health_sleep') {
  //       const data_type_value = permission === 'health_sleep' ? 'SLEEP' : ('STEPS' as HealthPermissionsRequestDataType);

  //       return this.checkHealthPermissions({ data_type: data_type_value });
  //     }
  //     return PhoneUtilities.runAction<CheckPermissionRequest, CheckPermissionResponse>({
  //       type: 'validate_phone_permission',
  //       payload: {
  //         type: permission,
  //       },
  //     });
  //   }

  //   static async requestPermission(permission: PhonePermissionType, isFuture = true): Promise<RequestPermissionResponse> {
  //     if (IS_DEVELOPMENT) {
  //       await new Promise((resolve) => setTimeout(resolve, 100));
  //       LocalStorageCacheUtils.setItem(permission.toString(), true);
  //       const granted = confirm(`Do you want to give ${permission} permissions access?`);
  //       return {
  //         status: granted ? 'granted' : 'denied',
  //       };
  //     }

  //     if (permission === 'health_steps' || permission === 'health_sleep') {
  //       let stepsMaxDate = dayjs().subtract(1, 'day').toDate();

  //       try {
  //         const lastStepsResponse = await userMetricsService.lastSteps();
  //         if (dayjs(lastStepsResponse.metric.measurement_end_date).isAfter(stepsMaxDate)) {
  //           stepsMaxDate = lastStepsResponse.metric.measurement_end_date;
  //         }
  //       } catch (e) {
  //         logger.error(e);
  //       }
  //       const data_type = permission === 'health_sleep' ? 'SLEEP' : ('STEPS' as HealthPermissionsRequestDataType);
  //       const response = await PhoneService.requestHealthPermissions(
  //         SessionUtils.getUserId(),
  //         SessionUtils.getUserApiKey(),
  //         isFuture,
  //         stepsMaxDate,
  //         data_type
  //       );

  //       return {
  //         status: response.permissions_granted_by_user ? 'granted' : 'denied',
  //       };
  //     }

  //     return PhoneUtilities.runAction<RequestPermissionRequest, RequestPermissionResponse>({
  //       type: 'request_phone_permission',
  //       payload: {
  //         type: permission,
  //       },
  //     });
  //   }

  //   static async backgroundRefreshStatus(): Promise<BackgroundRefreshStatusResponse> {
  //     if (!PhoneUtilities.hasNativeSupport() || IS_DEVELOPMENT) {
  //       return {
  //         enabled: true,
  //       };
  //     }
  //     return PhoneUtilities.runAction<void, BackgroundRefreshStatusResponse>({
  //       type: 'background_refresh_status',
  //     });
  //   }

  //   // static async requestPlatformInformation(): Promise<PlatformInformationResponse> {
  //   //   const fallbackInfo = {
  //   //     app_platform_name: PhoneUtilities.getMobileOperatingSystem(),
  //   //     app_platform_version: APP_VERSION,
  //   //     app_device_model: 'browser',
  //   //     app_bundle: APP_VERSION,
  //   //     app_version: APP_VERSION,
  //   //     app_build_number: APP_VERSION,
  //   //   };
  //   //   if (PhoneUtilities.hasNativeSupport()) {
  //   //     try {
  //   //       const metadata = LocalStorageCacheUtils.getItem<PlatformInformationResponse>('PLATFORM_METADATA');
  //   //       if (metadata) {
  //   //         return metadata;
  //   //       }

  //   //       const response = await PhoneUtilities.runAction<void, PlatformInformationResponse>({
  //   //         type: 'get_native_app_info',
  //   //         timeout: 100,
  //   //       });

  //   //       LocalStorageCacheUtils.setItem('PLATFORM_METADATA', response, 24 * 60 * 60);
  //   //       return response;
  //   //     } catch {
  //   //       return fallbackInfo;
  //   //     }
  //   //   } else {
  //   //     return fallbackInfo;
  //   //   }
  //   // }

  //   static goToAppSettings() {
  //     if (PhoneUtilities.hasNativeSupport()) {
  //       return PhoneUtilities.runAction<void, void>({
  //         type: 'open_app_settings',
  //       });
  //     }
  //   }

  //   static async getStepsObserverStatus(): Promise<StepsObserverStatusResponse> {
  //     const fallbackInfo: StepsObserverStatusResponse = {
  //       last_steps_count_saved: 0,
  //       created: true,
  //     };
  //     if (PhoneUtilities.hasNativeSupport()) {
  //       return PhoneUtilities.runAction<void, StepsObserverStatusResponse>({
  //         type: 'get_steps_observer_status',
  //       });
  //     }
  //     return fallbackInfo;
  //   }

  //   static openImagePicker(request: OpenImagePickerRequest) {
  //     if (PhoneUtilities.hasNativeSupport()) {
  //       try {
  //         return PhoneUtilities.runAction<OpenImagePickerRequest, OpenImagePickerResponse>({
  //           type: 'open_image_picker',
  //           payload: request,
  //         });
  //       } catch (e) {
  //         logger.error(e);
  //         return undefined;
  //       }
  //     } else {
  //       return undefined;
  //     }
  //   }

  //   static sendAppVersion(request: ResponseHeadersEvent) {
  //     if (
  //       PhoneUtilities.hasNativeSupport() &&
  //       request['wecare-app-min-version-android'] &&
  //       request['wecare-app-min-version-ios']
  //     ) {
  //       try {
  //         let minOsAppVersion = request['wecare-app-min-version'];
  //         if (PhoneUtilities.getMobileOperatingSystem() === 'android') {
  //           minOsAppVersion = request['wecare-app-min-version-android'];
  //         }
  //         if (PhoneUtilities.getMobileOperatingSystem() === 'ios') {
  //           minOsAppVersion = request['wecare-app-min-version-ios'];
  //         }
  //         if (minOsAppVersion) {
  //           return PhoneUtilities.runAction<NativeAppMinVersionRequest, void>({
  //             type: 'native_app_min_version_signal',
  //             payload: {
  //               minimum_required_version: minOsAppVersion || request['wecare-app-min-version'],
  //             },
  //           });
  //         } else {
  //           throw Error('Platfom not supported');
  //         }
  //       } catch (e) {
  //         logger.error(e);
  //       }
  //     }
  //   }

  //   // static refreshWebview(request: ResponseHeadersEvent) {
  //   //   const minVersion = request['wecare-web-min-version'];
  //   //   if (minVersion) {
  //   //     const shouldRefresh = compare(minVersion, APP_VERSION) === 1;
  //   //     if (PhoneUtilities.hasNativeSupport() && shouldRefresh) {
  //   //       try {
  //   //         logger.debug('Refeshing web view due min version', APP_VERSION, minVersion);
  //   //         return PhoneUtilities.runAction<void, void>({
  //   //           type: 'refresh_webview',
  //   //         });
  //   //       } catch (e) {
  //   //         logger.error(e);
  //   //       }
  //   //     } else {
  //   //       if (shouldRefresh) {
  //   //         window.location.reload();
  //   //       }
  //   //     }
  //   //   }
  //   // }

  //   static openKeyboardForSMSCode() {
  //     if (PhoneUtilities.hasNativeSupport()) {
  //       try {
  //         return PhoneUtilities.runAction<void, void>({
  //           type: 'open_keyboard_for_sms_code',
  //         });
  //       } catch (e) {
  //         logger.error(e);
  //       }
  //     }
  //   }

  //   static closeKeyboardForSMSCode() {
  //     if (PhoneUtilities.hasNativeSupport()) {
  //       try {
  //         return PhoneUtilities.runAction<void, void>({
  //           type: 'close_keyboard_for_sms_code',
  //         });
  //       } catch (e) {
  //         logger.error(e);
  //       }
  //     }
  //   }

  //   static sendAnalyticsEvent(request: SendAnalyticsEventRequest) {
  //     if (PhoneUtilities.hasNativeSupport()) {
  //       try {
  //         return PhoneUtilities.runAction<SendAnalyticsEventRequest, void>({
  //           type: 'send_analytics_event',
  //           payload: request,
  //         });
  //       } catch (e) {
  //         logger.error(e);
  //       }
  //     }
  //   }

  //   static async getAllCameraRollData() {
  //     if (PhoneUtilities.hasNativeSupport()) {
  //       try {
  //         const response = await PhoneUtilities.runAction<void, GetAllCameraRollDataResponse>({
  //           type: 'get_all_media_data',
  //         });

  //         if (!Array.isArray(response.results)) {
  //           logger.warn('getAllCameraRollData', 'Remove this workaround once flutter fixes it');
  //           response.results = JSON.parse(response.results as any as string) as CameraRollDataItem[];
  //         }
  //         return response;
  //       } catch (e) {
  //         logger.error(e);
  //         throw e;
  //       }
  //     }

  //     return CameraRollResponseMock;
  //   }

  //   static setViewUrl(url: string) {
  //     if (!PhoneUtilities.hasNativeSupport() || IS_DEVELOPMENT) {
  //       return;
  //     }
  //     try {
  //       PhoneUtilities.runAction<
  //         {
  //           newUrl: string;
  //         },
  //         void
  //       >({
  //         type: 'change_web_app_url',
  //         payload: {
  //           newUrl: url,
  //         },
  //       });
  //     } catch (error) {
  //       logger.error(error);
  //     }
  //   }

  //   static async attemptSendingAccumulatedSteps(): Promise<void> {
  //     if (!PhoneUtilities.hasNativeSupport() || IS_DEVELOPMENT) {
  //       return;
  //     }
  //     await PhoneUtilities.runAction<AttemptSendingAccumulatedStepsRequest, void>({
  //       type: 'attempt_sending_accumulated_steps',
  //       payload: {
  //         source: 'REDEEM',
  //       },
  //     });
  //   }
}

export default PhoneService;
