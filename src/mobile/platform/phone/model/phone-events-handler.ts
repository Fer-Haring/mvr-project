// import { store } from "@configuration/redux/store";
// import { eventsManager } from "@configuration/sdks/DefaultRestClientConfigurationProvider";
// import { fetchTodayStepsMetric } from "@features/home/model/HomeSlice";
import "@icelandinteractive/wecare-core-sdk/lib/service/abstract.api.service";
// import SessionUtils from "@platform/session/utils/SessionUtils";
import { Base64 } from "@webapp/utils/base-64-utils";
import { logger } from "@webapp/utils/logger-utils";
import PhoneUtilities from "@webapp/utils/phone-utilities";
import SessionStorageUtils from "@webapp/utils/session-storage-utils";
// import debounce from "lodash/debounce";
// import { fetchTodaySleepMetric } from "./../../../features/home/model/HomeSlice";
// import PhoneService from "./phone-service";

export interface EventResponse<T> {
  payload: T;
  status: "success" | "failure";
  error?: any;
}

export interface HandleKeyboardEvent {
  is_keyboard_opened: boolean;
}

export interface HandlePushNotificationEvent {
  data: Record<string, any>;
}

export interface HandleMetricsSyncingFinishedEvent {
  updated: boolean;
}

export interface HandleDeepLinkEvent {
  query_params: Record<string, string>;
}

export interface HandleAppStateUpdateEvent {
  app_state: "AppState.foreground" | "AppState.paused" | "AppState.background";
}

export interface HandleSmsCodeInputEvent {
  last_value: string;
}

// PhoneUtilities.listenAction<EventResponse<HandleKeyboardEvent>>("handleKeyboardEvent", (response) => {
//   PhoneService.handleKeyboardEvent(response);
// });

// PhoneUtilities.listenAction<EventResponse<HandlePushNotificationEvent>>("handlePushNotificationOpened", (response) => {
//   logger.debug(`HandlePushNotificationEvent:`, response);
//   PhoneService.handlePushNotification(response);
// });

// PhoneUtilities.listenAction<EventResponse<HandleAppStateUpdateEvent>>("handleAppStateUpdate", (response) => {
//   if (response.payload.app_state === "AppState.foreground") {
//     SessionUtils.refreshAppStores();
//   }
// });

// PhoneUtilities.listenAction<EventResponse<HandleMetricsSyncingFinishedEvent>>("handleMetricsSyncingFinished", (response) => {
//   if (response.payload.updated) {
//     store.dispatch(fetchTodayStepsMetric());
//     store.dispatch(fetchTodaySleepMetric());
//   }
// });

PhoneUtilities.listenAction<EventResponse<HandleDeepLinkEvent>>("handleDeepLink", (response) => {
  logger.debug("HandleDeepLinkEvent:", response);
  const queryParams = response?.payload?.query_params;
  if (response.status === "success" && response.payload && queryParams) {
    const q = queryParams["q"];
    if (!q) {
      return;
    }
    const qDecoded = Base64.decode(q);

    SessionStorageUtils.setItem("DEEP_LINK_DATA", qDecoded);
    SessionStorageUtils.setItem("DEEP_LINK_QUERY_PARAMS", queryParams);
    // SessionUtils.processDeepLinkInformation();
  }
});

// eventsManager.subscribe(
//   "RESPONSE_HEADERS",
//   debounce(
//     (payload) => {
//       PhoneService.sendAppVersion(payload);
//       PhoneService.refreshWebview(payload);
//     },
//     10000,
//     { leading: true },
//   ),
// );
