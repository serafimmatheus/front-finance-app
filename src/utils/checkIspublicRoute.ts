import { APP_ROUTES } from "./routes";

export const checkIsPublicRoute = (pathname: string) => {
  const isPublicRoute = Object.values(APP_ROUTES.public).includes(pathname);
  return isPublicRoute;
};
