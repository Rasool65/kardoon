import authenticationReducer from './reducers/authenticationReducer';
import routeReducer from './reducers/routeReducer';

export const RootReducer = {
  authentication: authenticationReducer,
  route: routeReducer,
};

export default RootReducer;
