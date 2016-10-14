
import {
  LOAD_MODIFICADORES_SUCCESS,
  LOAD_ONE_MODIFICADOR_SUCCESS,
  CREATE_MODIFICADOR_SUCCESS,
  UPDATE_MODIFICADOR_SUCCESS,
  DESTROY_MODIFICADOR_SUCCESS,
} from '../actions/modificadorActions';

//initialize the reducer
export default function modificadorReducer(state = {
  modificadores: [],
  shouldUpdateModificadores: false,
  modificador:{}
}, action) {
  switch (action.type) {
    //some actions trigger the same result
    case CREATE_MODIFICADOR_SUCCESS:
    case DESTROY_MODIFICADOR_SUCCESS:
    case UPDATE_MODIFICADOR_SUCCESS:
      //important to create a copy of the state! Never send the modified original state.
      //shouldUpdateModificadores is used in the component to check if should reload state from DB and re-render the page,
      // saves lots of unnecessary reloads.
      return Object.assign({}, state,
        {modificador:action.modificador,
          shouldUpdateModificadores: true});
    case LOAD_ONE_MODIFICADOR_SUCCESS:
      return Object.assign({}, state,
        {modificador: action.modificador,
          shouldUpdateModificadores: false});
    case LOAD_MODIFICADORES_SUCCESS:
      return Object.assign({}, state,
        {modificadores: action.modificadores,
          shouldUpdateModificadores: false});
    default:
      return state;
  }
}

