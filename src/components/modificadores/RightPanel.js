import React, {Component, PropTypes} from 'react';
import ModificadoresList from './ModificadoresList'
import SubmodificadoresList from './SubmodificadoresList'
import {Nav, NavItem} from 'react-bootstrap';

//I chose to make it a component to handle the state of the tab
class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'mod'};
  }

//handles the state of the component
  handleSelect = (eventKey)=> {
    event.preventDefault();
    this.setState({selectedTab: eventKey})
  };

  //renders only what is needed
  renderBody = ()=> {
    switch (this.state.selectedTab) {
      case 'mod':
        return (
          <ModificadoresList
            modificadorSelect={this.props.modificadorSelect}
            destroyModificador={this.props.destroyModificador}
          >
            {this.props.modificadores}
          </ModificadoresList>
        );
        break;
      case 'submod':
        return (
          <SubmodificadoresList
            createSubmodificador={this.props.createSubmodificador}
            destroySubmodificador={this.props.destroySubmodificador}
            submodificadorSelect={this.props.submodificadorSelect}
          >
            {this.props.submodificadores}
          </SubmodificadoresList>
        );
        break;
      default:
        return null;
    }
  };

  render = ()=> {
    //the tabs in the RightPanel and the body
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.selectedTab} onSelect={this.handleSelect}>
          <NavItem eventKey="mod">Modificadores</NavItem>
          <NavItem eventKey="submod">Submodificadores</NavItem>
        </Nav>
        {this.renderBody()}
      </div>
    )
  }

}

RightPanel.propTypes = {};

export default RightPanel;
