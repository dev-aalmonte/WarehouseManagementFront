import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import auth from './authReducer';
import product from './productReducer';
import warehouse from './warehouseReducer';
import user from './userReducer';
import role from './roleReducer';
import status from './statusReducer';

const rootReducer = combineReducers({
  form,
  auth,
  product,
  warehouse,
  user,
  role,
  status
});

export default rootReducer;