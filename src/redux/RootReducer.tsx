import authenticationReducer from './reducers/authenticationReducer';
import messageReducer from './reducers/messageReducer';
import requestReducer from './reducers/requestReducer';

export const RootReducer = {
  authentication: authenticationReducer,
  Request: requestReducer,
  message: messageReducer,
};

export default RootReducer;
