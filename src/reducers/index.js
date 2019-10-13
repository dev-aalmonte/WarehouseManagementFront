import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import auth from './authReducer';
import product from './productReducer';
import warehouse from './warehouseReducer';
import user from './userReducer';
import role from './roleReducer';
import status from './statusReducer';
import client from './clientReducer';
import order from './orderReducer';
import location from './locationReducer';

const rootReducer = combineReducers({
  form,
  auth,
  product,
  warehouse,
  user,
  role,
  status, 
  client,
  order,
  location
});

export default rootReducer;