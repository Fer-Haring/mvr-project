// Setup auth routes here
export const AUTH_ROUTES: string[] = ['/privacy-policy', '/sign-up', '/sign-in', '/forgot-password', '/verification-code'];

// All routes here won't require auth
export const PUBLIC_ROUTES: string[] = [...AUTH_ROUTES, '/terms-and-conditions', '/privacy-policy', '/google-auth-callback', '/set-password', '/forgot-password/new-password'];

export const isAuthRoute = (path: string): boolean => !!AUTH_ROUTES.find((part) => path.startsWith(part));

export const isPublicRoute = (path: string): boolean =>
  !!PUBLIC_ROUTES.find((part) => path.startsWith(part)) || isAuthRoute(path);