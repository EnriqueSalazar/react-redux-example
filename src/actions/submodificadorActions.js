import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../../cfg/'

// Same as modificadorActions.js

export const LOAD_SUBMODIFICADORES_SUCCESS = 'LOAD_SUBMODIFICADORES_SUCCESS';
export const LOAD_ONE_SUBMODIFICADOR_SUCCESS = 'LOAD_ONE_SUBMODIFICADOR_SUCCESS';
export const CREATE_SUBMODIFICADOR_SUCCESS = 'CREATE_SUBMODIFICADOR_SUCCESS';
export const UPDATE_SUBMODIFICADOR_SUCCESS = 'UPDATE_SUBMODIFICADOR_SUCCESS';
export const DESTROY_SUBMODIFICADOR_SUCCESS = 'DESTROY_SUBMODIFICADOR_SUCCESS';

export function loadSubmodificadoresSuccess(submodificadores) {
  return {type: LOAD_SUBMODIFICADORES_SUCCESS, submodificadores};
}
export function loadOneSubmodificadorSuccess(submodificador) {
  return {type: LOAD_ONE_SUBMODIFICADOR_SUCCESS, submodificador};
}
export function updateSubmodificadorSuccess(submodificador) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_SUBMODIFICADOR_SUCCESS, submodificador};
}
export function createSubmodificadorSuccess(submodificador) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_SUBMODIFICADOR_SUCCESS, submodificador};
}
export function destroySubmodificadorSuccess(submodificador) {
  toastr.success(submodificador.nombre+' Eliminación exitosa.');
  return {type: DESTROY_SUBMODIFICADOR_SUCCESS, submodificador:{}};
}

export function loadSubmodificadores() {
  return dispatch => {
    return Api.findAll(model.submodificador).then(submodificadores => {
      dispatch(loadSubmodificadoresSuccess(submodificadores.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneSubmodificador(id) {
  return dispatch => {
    return Api.findOne(model.submodificador, id).then(submodificador => {
      dispatch(loadOneSubmodificadorSuccess(submodificador.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateSubmodificador(id, payload) {
  return dispatch => {
    return Api.update(model.submodificador, id, payload).then((submodificador) => {
      dispatch(updateSubmodificadorSuccess(submodificador.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createSubmodificador(payload) {
  return dispatch => {
    return Api.create(model.submodificador, payload).then((submodificador) => {
      dispatch(createSubmodificadorSuccess(submodificador.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroySubmodificador(id) {
  return dispatch => {
    return Api.destroy(model.submodificador,id).then((submodificador) => {
      dispatch(destroySubmodificadorSuccess(submodificador.data));
    }).catch(error => {
      throw(error);
    });
  };
}

