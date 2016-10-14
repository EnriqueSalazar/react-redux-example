import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../../cfg/'


//this const can be stored in independent files,or in the reducer. I like them here.
export const LOAD_MODIFICADORES_SUCCESS = 'LOAD_MODIFICADORES_SUCCESS';
export const LOAD_ONE_MODIFICADOR_SUCCESS = 'LOAD_ONE_MODIFICADOR_SUCCESS';
export const CREATE_MODIFICADOR_SUCCESS = 'CREATE_MODIFICADOR_SUCCESS';
export const UPDATE_MODIFICADOR_SUCCESS = 'UPDATE_MODIFICADOR_SUCCESS';
export const DESTROY_MODIFICADOR_SUCCESS = 'DESTROY_MODIFICADOR_SUCCESS';

//this functions return the action for the reducer
export function loadModificadoresSuccess(modificadores) {
  return {type: LOAD_MODIFICADORES_SUCCESS, modificadores};
}
export function loadOneModificadorSuccess(modificador) {
  return {type: LOAD_ONE_MODIFICADOR_SUCCESS, modificador};
}
export function updateModificadorSuccess(modificador) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_MODIFICADOR_SUCCESS, modificador};
}
export function createModificadorSuccess(modificador) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_MODIFICADOR_SUCCESS, modificador};
}
export function destroyModificadorSuccess(modificador) {
  toastr.success(modificador.nombre+' Eliminación exitosa.');
  return {type: DESTROY_MODIFICADOR_SUCCESS, modificador:{}};
}


//this actions wait for the api to finish fetching and dispatchs a function.
export function loadModificadores() {
  return dispatch => {
    return Api.findAll(model.modificador).then(modificadores => {
      dispatch(loadModificadoresSuccess(modificadores.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneModificador(id) {
  return dispatch => {
    return Api.findOne(model.modificador, id).then(modificador => {
      dispatch(loadOneModificadorSuccess(modificador.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateModificador(id, payload) {
  return dispatch => {
    return Api.update(model.modificador, id, payload).then((modificador) => {
      dispatch(updateModificadorSuccess(modificador.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createModificador(payload) {
  return dispatch => {
    return Api.create(model.modificador, payload).then((modificador) => {
      dispatch(createModificadorSuccess(modificador.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyModificador(id) {
  return dispatch => {
    return Api.destroy(model.modificador,id).then((modificador) => {
      dispatch(destroyModificadorSuccess(modificador.data));
    }).catch(error => {
      throw(error);
    });
  };
}

