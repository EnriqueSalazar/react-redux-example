import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

//set defaultIsVisible to false, otherwise is very annoying
//control-h makes it appear in the browser, and doesnt conflicts with the browser history which also uses ctrl-h
export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    defaultIsVisible={false}
    changePositionKey="ctrl-q"
    defaultPosition="left"
    changeMonitorKey="ctrl-m">
    <LogMonitor />
  </DockMonitor>
);
