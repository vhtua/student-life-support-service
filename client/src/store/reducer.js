import { combineReducers } from 'redux';

// reducer imports
import customizationReducer from './customizationReducer';
import authReducer from './authSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth: authReducer
});

export default reducer;
