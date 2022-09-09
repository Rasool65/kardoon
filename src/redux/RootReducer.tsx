import authenticationReducer from './reducers/authenticationReducer';
import requestReducer from './reducers/requestReducer';

export const RootReducer = {
  authentication: authenticationReducer,
  Request: requestReducer,
};

export default RootReducer;
