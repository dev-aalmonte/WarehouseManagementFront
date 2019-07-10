import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import auth from './authReducer';
import product from './productReducer';
import warehouse from './warehouseReducer';
import user from './userReducer';
import role from './roleReducer';

const rootReducer = combineReducers({
  form,
  auth,
  product,
  warehouse,
  user,
  role
});

export default rootReducer;