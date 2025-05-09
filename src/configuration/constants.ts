export const APP_MODE = process.env.REACT_APP_MODE as string as 'native' | 'web';
export const APP_ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT as 'dev' | 'staging' | 'production';
export const BUGSNAG_API_KEY = process.env.REACT_APP_BUGSNAG_API_KEY as string;
export const APP_ACCOUNT_HOME = process.env.REACT_APP_ACCOUNT_HOME as string;
export const APP_MODE_NATIVE = APP_MODE === 'native';
export const APP_MODE_WEB = APP_MODE === 'web';

export const IS_DEVELOPMENT = APP_ENVIRONMENT === 'dev';
export const IS_STAGING = APP_ENVIRONMENT === 'staging';

export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_KEY as string;


export const API_URL = `/api/v1`;
