/* eslint-disable @typescript-eslint/no-explicit-any */
type StripePaymentEvent = {
  type: string;
  hasPermission: boolean;
  value: number;
};
export const PhoneUtils = {
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