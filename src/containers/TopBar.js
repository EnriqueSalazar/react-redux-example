/**
 * Created by enriq on 5/07/16.
 */
import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import TopBarLinks from '../components/TopBarLinks'

//this could be a stateless function, but I may need a state later for user management. Dis this for other components as well
class TopBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Enrique Salazar</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <TopBarLinks />
      </Navbar>
    );
  }
}

export default TopBar;
