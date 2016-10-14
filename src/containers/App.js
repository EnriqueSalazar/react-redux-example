import React, {Component, PropTypes} from 'react';

import TopBar from './TopBar'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //this shows the TobBar component on the top of the page, and the children passed by the router as body.
    return (
      <div>
        <TopBar/>
        <div>
        </div>
        <div style={{marginTop: '1.5em'}}>   {this.props.children}</div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
