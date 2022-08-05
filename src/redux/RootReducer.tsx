import authenticationReducer from './reducers/authenticationReducer';
import requestReducer from './reducers/requestReducer';
// import layoutReducer from './reducers/layoutReducer';
// import navbarReducer from './reducers/navbarReducer';
// import generalInformationReducer from './reducers/generalInformationReducer';
// import ticketSlice from './reducers/ticketReducer';
export const RootReducer = {
  // layout: layoutReducer,
  authentication: authenticationReducer,
  Request: requestReducer,
  // generalInformation: generalInformationReducer,
  // ticket: ticketSlice,
};

export default RootReducer;
