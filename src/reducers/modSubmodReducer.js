
import {
  LOAD_MODSUBMODS_SUCCESS,
  LOAD_ONE_MODSUBMOD_SUCCESS,
  CREATE_MODSUBMOD_SUCCESS,
  UPDATE_MODSUBMOD_SUCCESS,
  DESTROY_MODSUBMOD_SUCCESS,
} from '../actions/modSubmodActions';

export default function modSubmodReducer(state = {
  modSubmods: [],
  shouldUpdateModSubmods: false,
  modSubmod:{}
}, action) {
  switch (action.type) {
    case CREATE_MODSUBMOD_SUCCESS:
    case DESTROY_MODSUBMOD_SUCCESS:
    case UPDATE_MODSUBMOD_SUCCESS:
      return Object.assign({}, state,
        {modSubmod:action.modSubmod,
          shouldUpdateModSubmods: true});
    case LOAD_ONE_MODSUBMOD_SUCCESS:
      return Object.assign({}, state,
        {modSubmod: action.modSubmod,
          shouldUpdateModSubmods: false});
    case LOAD_MODSUBMODS_SUCCESS:
      return Object.assign({}, state,
        {modSubmods: action.modSubmods,
          shouldUpdateModSubmods: false});
    default:
      return state;
  }
}

