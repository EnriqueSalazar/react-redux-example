//I have a list of modifiers to a item ("modificadores"). And I have a list of sub modifiers ("submodificadores")
// I relate them by selecting a "modificador" from ModificadoresList (it appears in the form in Modificador),
// and then I drag a "submodificador" from SubmodificadoresList and drop it over ModSubmodList.
// ModSubmodList contains all the "submodificadores" related to a single "modificador".

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//Funcions imported from the ctions
import {
  loadModificadores,
  destroyModificador,
  createModificador,
  updateModificador,
} from '../actions/modificadorActions';
import {
  loadSubmodificadores,
  destroySubmodificador,
  createSubmodificador,
  updateSubmodificador,
} from '../actions/submodificadorActions';
import {
  loadModSubmods,
  destroyModSubmod,
  createModSubmod,
  updateModSubmod,
} from '../actions/modSubmodActions';

//I divided the app in 3 main components, just to keep it organized.
import RightPanel from '../components/modificadores/RightPanel'
import LeftPanel from '../components/modificadores/LeftPanel'
import SubmodModal from '../components/modificadores/SubmodModal'


import {Grid, Col, Row} from 'react-bootstrap';

//ES6 style component
class EditMods extends Component {
//initialize the class and define initial state.
  constructor(props) {
    super(props);
    //Lots of docs about using pure stateless functions with redux.
    //I agree with that for persistence, but not for UI temp values,
    // is too much work to setup the whole unidirectional cycle for a temp var.
    this.state = {
      modificador: {},
      submodificador: {},
      addingSubmod: false
    };
  }

//when component first mounts, tells the store to get fresh values from the DB.
  componentDidMount() {
    this.props.loadModificadores();
    this.props.loadSubmodificadores();
    this.props.loadModSubmods();
  }

//Everytime a prop changes (and since we mapped the reducers to the props) this get executed.
  componentWillReceiveProps(nextProps) {
    //I use a switch in the reducer to know when I should update any part of the view with fresh data,
    // otherwise it gets pretty annoying, lots of reloads.
    if (nextProps.shouldUpdateSubmodificadores) {
      this.props.loadSubmodificadores();
    }
    if (nextProps.shouldUpdateModificadores) {
      this.props.loadModificadores();
    }
    if (nextProps.shouldUpdateModSubmods) {
      this.props.loadModSubmods();
    }
    if (this.state.addingSubmod) {
      this.setState({
        submodificador: nextProps.submodificador,
        addingSubmod: false
      })
    }
  }

//ES6 Arrow Functions doesn't need bind because contents keep seeing the variables of the scope where it were defined
// So, if you pass an arrow function to a component as prop, and execute it, I will see the content
  // of this container. For example, modificadorSelect is executed deep down RightPanel, modifies the state of
  // this container, and then the modified state is passed as nextProp to the LeftPanel component.
  // WARNING: For this to work, you need stage-0 babel.
  modificadorSelect = (modificador) => {
    this.setState({modificador});
  };

  submodificadorSelect = (submodificador)=> {
    this.setState({submodificador});
  };

  handleUpdateModificador = (modificador)=> {
    if (modificador.id) {
      this.props.updateModificador(modificador.id, modificador);
    } else {
      this.props.createModificador(modificador);
    }
  };

  handleUpdateSubmodificador = (submodificador)=> {
    if (submodificador.id) {
      this.props.updateSubmodificador(submodificador.id, submodificador);
    }
    this.submodificadorSelect({});
  };
  handleCreateSubmodificador = (submodificador)=> {
    this.props.createSubmodificador(submodificador);
    this.setState({addingSubmod: true})
  };

  handleDestroyModSubmods = (ids)=> {
    for (let id of ids) {
      this.props.destroyModSubmod(id);
    }
  };

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={6}>
              <LeftPanel
                modificador={this.state.modificador}
                modificadorSubmit={this.handleUpdateModificador}
                modSubmods={this.props.modSubmods}
                createModSubmod={this.props.createModSubmod}
                handleDestroyModSubmods={this.handleDestroyModSubmods}
                submodificadores={this.props.submodificadores}
                modificadorSelect={this.modificadorSelect}
              />
            </Col>
            <Col md={6}>
              <RightPanel
                modificadores={this.props.modificadores}
                modificadorSelect={this.modificadorSelect}
                submodificadorSelect={this.submodificadorSelect}
                submodificadores={this.props.submodificadores}
                destroyModificador={this.props.destroyModificador}
                createSubmodificador={this.handleCreateSubmodificador}
                destroySubmodificador={this.props.destroySubmodificador}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>

            </Col>
          </Row>
        </Grid>
        <SubmodModal
          submodificadorSelect={this.submodificadorSelect}
          submodificadorSubmit={this.handleUpdateSubmodificador}
          initialValues={this.state.submodificador}
        />
      </div>
    );
  };
}

//propTypes are useful as documentation and to check if you missed something during development
EditMods.propTypes = {
  loadModificadores: PropTypes.func.isRequired,
  destroyModificador: PropTypes.func.isRequired,
  createModificador: PropTypes.func.isRequired,
  updateModificador: PropTypes.func.isRequired,
  loadSubmodificadores: PropTypes.func.isRequired,
  destroySubmodificador: PropTypes.func.isRequired,
  createSubmodificador: PropTypes.func.isRequired,
  updateSubmodificador: PropTypes.func.isRequired,
  loadModSubmods: PropTypes.func.isRequired,
  destroyModSubmod: PropTypes.func.isRequired,
  createModSubmod: PropTypes.func.isRequired,
  updateModSubmod: PropTypes.func.isRequired,
  modificadores: PropTypes.array.isRequired,
  shouldUpdateModificadores: PropTypes.bool.isRequired,
  submodificadores: PropTypes.array.isRequired,
  submodificador: PropTypes.object.isRequired,
  shouldUpdateSubmodificadores: PropTypes.bool.isRequired,
  modSubmods: PropTypes.array.isRequired,
  shouldUpdateModSubmods: PropTypes.bool.isRequired,
};

//This allows us to use the variables of the reducers registered in the store.
function mapStateToProps(state) {
  //we take the reducers
  const {
    modificadorReducer,
    submodificadorReducer,
    modSubmodReducer
  } = state;
  //then take the variables you need from each reducer
  const {modificadores, shouldUpdateModificadores} = modificadorReducer;
  const {submodificadores, shouldUpdateSubmodificadores, submodificador} = submodificadorReducer;
  const {modSubmods, shouldUpdateModSubmods} = modSubmodReducer;
  //and return them to map to the props
  return {
    modificadores,
    shouldUpdateModificadores,
    submodificadores,
    submodificador,
    shouldUpdateSubmodificadores,
    modSubmods,
    shouldUpdateModSubmods
  };
}

//here we map the variables from the reducers and the functions imported from the actions in the top of this file.
// so we can use them as this.props.
export default connect(mapStateToProps, {
  loadModificadores,
  destroyModificador,
  createModificador,
  updateModificador,
  loadSubmodificadores,
  destroySubmodificador,
  createSubmodificador,
  updateSubmodificador,
  loadModSubmods,
  destroyModSubmod,
  createModSubmod,
  updateModSubmod,
  //This is from react-dnd (drag and drop), is a High Order Component (HOC)
  // basically, tells react that this component will hold dnd activity, we later define the source (to be dragged)
  // and the target (were we can release)
})(DragDropContext(HTML5Backend)(EditMods));
