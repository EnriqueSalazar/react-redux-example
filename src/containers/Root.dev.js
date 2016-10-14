/**
 * Created by enriq on 6/09/16.
 */
import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import ReduxToastr from 'react-redux-toastr';

import routes from '../../routes';
import DevTools from './DevTools';

export default class Root extends Component {
  render() {
    const {store, history} = this.props;
    //the ReduxToastr settings are the default for the whole site
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes}/>
          <DevTools />
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
