export interface OpenSMSRequest {
  id: string;
  number: string;
  message: string;
}
export interface OpenSMSResponse {
  sms_sent: boolean;
}
export interface OpenUrlRequest {
  url: string;
}

export interface OpenPhoneRequest {
  number: string;
}

export interface OpenCameraRequest {
  activity_id: string;
  user_id: string;
  user_token: string;
  healthy_message: string;
}

export interface OpenCameraResponse {
  activity_id: string;
  picture_id?: string;
  is_healthy?: boolean;
  status: "confirmed" | "cancelled";
}

export interface BiometricAuthRequest {
  message: string;
  success: boolean;
}

export interface BiometricAuthResponse {
  message: string;
  success: boolean;
}

export type HealthPermissionsRequestDataType = "STEPS" | "SLEEP";

export interface HealthPermissionsRequest {
  user_id: string;
  user_api_key: string;
  for_future_activity: boolean;
  last_step_count_update?: number;
  data_type: HealthPermissionsRequestDataType;
}

export interface HealthPermissionsResponse {
  permissions_displayed: boolean;
  permissions_granted_by_user: boolean;
  permissions_health_app_installed?: boolean;
  steps_count: number;
  measurement_start_date: number;
  measurement_end_date: number;
}

export interface GetLastStepsRequest {
  last_step_count_update: number;
}


export interface GetLastStepsResponse extends HealthPermissionsResponse {
  platform: string;
}

export interface UpdateStepsObserverReferenceDateRequest {
  last_date_saved_milliseconds?: number;
}

export interface OpenSmartSelfieRequest {
  activity_id: string;
  user_id: string;
  user_token: string;
}

export interface OpenSmartSelfieResponse {
  activity_id: string;
  height_centimeters: number;
  weight_kilograms: number;
  bmi: number;
  age: number;
  gender: string;
  status: "confirmed" | "cancelled";
}

export interface UserLoginRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  is_first_login: boolean;
  user_api_key: string;
}

export interface OpenMapRequest {
  location_name?: string;
  latitude: number;
  longitude: number;
  mode: "directions" | "marker";
}

export type PhonePermissionType = "push_notification" | "contacts" | "camera" | "location" | "media_library" | "health_steps" | "health_sleep";

export interface CheckPermissionRequest {
  type: PhonePermissionType;
}

export type PermissionStatus = "granted" | "denied" | "not_requested" | "not_installed";
export interface CheckPermissionResponse {
  status: PermissionStatus;
}

export interface CheckHealthPermissionRequest {
  data_type: HealthPermissionsRequestDataType;
}

export interface CheckHealthPhonePermissionResponse {
 permissions_displayed: boolean;
 permissions_granted_by_user: boolean;
 permissions_health_app_installed: boolean;
}

export interface CheckHealthPermissionResponse {
  status: PermissionStatus;
}

export interface RequestPermissionRequest {
  type: PhonePermissionType;
}

export interface RequestPermissionResponse {
  status: "granted" | "denied";
}

export interface PlatformInformationResponse {
  app_platform_name: "android" | "ios" | "windows" | "unknown";
  app_platform_version: string;
  app_device_model: string;
  app_bundle: string;
  app_version: string;
  app_build_number: string;
}

export interface StepsObserverStatusResponse {
  last_saved?: number | null;
  last_attempt_timestamp?: number | null;
  last_steps_count_saved: number;
  created: boolean;
}

export type ImageSourceOption = "camera" | "gallery";
export interface OpenImagePickerRequest {
  image_source: ImageSourceOption;
  width?: number;
}

export interface OpenImagePickerResponse {
  base64_image: string;
  mime_type: string;
  file_name: string;
}

export interface NativeAppMinVersionRequest {
  minimum_required_version: string;
}

export interface SendAnalyticsEventRequest {
  is_screen: boolean;
  event_name: string;
  properties?: Record<string, string>;
}

export interface CameraRollDataItem {
  id: string;
  latitude: number;
  longitude: number;
  /**
   * format: ISO8601 yyyy-MM-ddTHH:mm:ss.mmmuuuZ
   */
  created: string;
}

export interface GetAllCameraRollDataResponse {
  results: CameraRollDataItem[];
}

export interface BackgroundRefreshStatusResponse {
  enabled: boolean;
}

export interface AttemptSendingAccumulatedStepsRequest {
  source: "REDEEM";
}
