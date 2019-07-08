import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import auth from './authReducer';
import product from './productReducer';
import warehouse from './warehouseReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  form,
  auth,
  product,
  warehouse,
  user
});

export default rootReducer;