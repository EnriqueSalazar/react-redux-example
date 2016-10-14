/**
 * Created by enriq on 6/09/16.
 */
import { combineReducers } from 'redux';
import {
  syncHistoryWithStore,
  routerReducer
} from 'react-router-redux';
import
  ReduxToastr,
{
  reducer as toastrReducer
} from 'react-redux-toastr';
import {reducer as formReducer} from 'redux-form';
import modificadorReducer from './modificadorReducer';
import submodificadorReducer from './submodificadorReducer';
import modSubmodReducer from './modSubmodReducer';

//as required in the docs of react-redux-toastr, redux-form and react-router-redux
const appReducers = combineReducers({
  modificadorReducer,
  modSubmodReducer,
  submodificadorReducer,
  routing: routerReducer,
  toastr: toastrReducer,
  form: formReducer
});

export default appReducers;
