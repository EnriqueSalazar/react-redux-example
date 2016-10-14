import React, {Component, PropTypes} from 'react';
import Modificador from './Modificador'
import ModSubmodList from './ModSubmodList'
import {
  Row
} from 'react-bootstrap';

//Well, this is the left panel, no logic at all.
class LeftPanel extends Component {
  constructor(props) {
    super(props);
  }
// Modificador is a form, with initialValues passed from the container.
// Notice there is not a handleSubmit prop passed.
  render = ()=> {
    return (
      <div>
        <Row>
          <Modificador
            initialValues={this.props.modificador}
            modificadorSubmit={this.props.modificadorSubmit}
            modificadorSelect={this.props.modificadorSelect}
          />
        </Row>
        <Row>
          <ModSubmodList
            modificador={this.props.modificador}
            modSubmods={this.props.modSubmods}
            createModSubmod={this.props.createModSubmod}
            handleDestroyModSubmods={this.props.handleDestroyModSubmods}
          >
            {this.props.submodificadores}
          </ModSubmodList>
        </Row>
      </div>
    )
  }


}

LeftPanel.propTypes = {};

export default LeftPanel;
