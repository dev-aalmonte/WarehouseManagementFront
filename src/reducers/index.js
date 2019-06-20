import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import auth from './authReducer';
import product from './productReducer';

const rootReducer = combineReducers({
  form,
  auth,
  product,
});

export default rootReducer;