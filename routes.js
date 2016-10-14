/**
 * Created by enriq on 6/09/16.
 */
import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';

import App from './src/containers/App';
import EditMods from './src/containers/EditMods';
import Home from './src/containers/Home';
// "/*" so every not found route will go to Home (for development only, should have a nice 404 page)
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/editmods" component={EditMods}/>
    <Route path="/*" component={Home}/>
  </Route>
);

export default routes;
