
import {
  LOAD_SUBMODIFICADORES_SUCCESS,
  LOAD_ONE_SUBMODIFICADOR_SUCCESS,
  CREATE_SUBMODIFICADOR_SUCCESS,
  UPDATE_SUBMODIFICADOR_SUCCESS,
  DESTROY_SUBMODIFICADOR_SUCCESS,
} from '../actions/submodificadorActions';

export default function submodificadorReducer(state = {
  submodificadores: [],
  shouldUpdateSubmodificadores: false,
  submodificador:{}
}, action) {
  switch (action.type) {
    case CREATE_SUBMODIFICADOR_SUCCESS:
    case DESTROY_SUBMODIFICADOR_SUCCESS:
    case UPDATE_SUBMODIFICADOR_SUCCESS:
      return Object.assign({}, state,
        {submodificador:action.submodificador,
          shouldUpdateSubmodificadores: true});
    case LOAD_ONE_SUBMODIFICADOR_SUCCESS:
      return Object.assign({}, state,
        {submodificador: action.submodificador,
          shouldUpdateSubmodificadores: false});
    case LOAD_SUBMODIFICADORES_SUCCESS:
      return Object.assign({}, state,
        {submodificadores: action.submodificadores,
          shouldUpdateSubmodificadores: false});
    default:
      return state;
  }
}

