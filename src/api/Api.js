/**
 * Created by enriq on 19/09/16.
 */
import axios from 'axios';

//I use axios to fetch the data from the api,
// and SailsJS as rest api. Since the names are very similar, I created api to be used with all the actions.

class Api {

  static findAll(model) {
    return axios.get(model);
  }

  static findOne(model, id) {
    return axios.get(model + id);
  }

  static destroy(model, id) {
    return axios.delete(model + id);
  }

  static update(model, id, payload) {
    return axios.put(model + id, payload)
  }

//react-bootstrap-table automatically adds a code to the id, I dont want that, so I delete it if exists.
  static create(model, payload) {
    if (payload.id) {
      delete payload.id
    }
    return axios.post(model, payload)
  }
}

export default Api;
