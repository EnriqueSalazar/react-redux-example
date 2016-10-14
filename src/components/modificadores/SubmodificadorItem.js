import React, {Component, PropTypes} from 'react';
import {ItemTypes} from './Constants';
import {DragSource} from 'react-dnd';
import {Label} from 'react-bootstrap';

//This is the data being really passed to the target, just the Id in this example. You could pass a whole object.
//props,data is the row from the BootstrapTable in SubmodificadoresList.
const submodSource = {
  beginDrag(props){
    return {id: props.data.id};
  }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

// This is the draggable component
class SubmodificadorItem extends Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    //This prop is passed by the HOC
    const {connectDragSource} = this.props;
    return connectDragSource(
      <div><h43><Label>{this.props.value}</Label></h43></div>
    );
  }
}


SubmodificadorItem.propTypes = {};
//DragSource is a High Order Component HOC from react-dnd, it wraps the draggable component with
// an ItemType, the source (the data being passed) and a monitor.
export default DragSource(ItemTypes.SUBMOD, submodSource, collect)(SubmodificadorItem);
