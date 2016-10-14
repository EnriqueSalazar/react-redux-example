/**
 * Created by enriq on 6/09/16.
 */
import React, {Component, PropTypes} from 'react';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import routes from '../../routes';
//same as Root.dev.js, but without the dev tools
export default class Root extends Component {
  render() {
    const {store, history} = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes}/>
          <ReduxToastr
            timeOut={3000}
            newestOnTop={true}
            position="top-right"/>
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
