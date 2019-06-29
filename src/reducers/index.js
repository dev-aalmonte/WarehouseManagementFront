import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import auth from './authReducer';
import product from './productReducer';
import warehouse from './warehouseReducer';

const rootReducer = combineReducers({
  form,
  auth,
  product,
  warehouse,
});

export default rootReducer;