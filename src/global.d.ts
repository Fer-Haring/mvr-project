declare global {
  interface Window {
    setPosition: (lat: number, lon: number) => void;
    nativeAppHandler: {
      postMessage: (message: string) => void;
    };
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flutter_inappwebview: any;
  }
}

export {};
