import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

export let globalNavigate: NavigateFunction;
export let globalLocation: Location;

export const GlobalHistory = () => {
  globalNavigate = useNavigate();
  globalLocation = useLocation();

  return null;
};
