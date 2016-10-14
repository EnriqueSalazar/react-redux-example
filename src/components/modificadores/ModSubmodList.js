import React, {Component, PropTypes} from 'react';
import SubmodificadorItem from './SubmodificadorItem';
import _ from 'lodash';

import {ItemTypes} from './Constants';
import {DropTarget} from 'react-dnd';

//This receives the data dragged (the Id in our example) and executes a function passed as prop from the container.
const submodTarget = {
  drop(props, monitor) {
    //Gets the item dragged
    let submodificador = monitor.getItem();
    props.createModSubmod({
      id_modificador: props.modificador.id,
      id_submodificador: submodificador.id
    })
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}
//this is the target of our drag and drop using react-dnd
class ModSubmodList extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    var selectRowProp = {
      mode: "checkbox", // or radio
      clickToSelect: true
    };

    //This prop comes from the react-dnd HOC
    const {connectDropTarget} = this.props;

    let submodificadores = this.props.children;

    // react-bootstrap-table can render an empty table.
    // Sometimes I prefer not to render anything at all. If the data is empty, returns an empty div.
    if (_.isEmpty(submodificadores)) {
      return (<div></div>);
    }

    let modificador = this.props.modificador;
    let modSubmods = this.props.modSubmods;

    //This filters the modSubmods list to show only the data of the selected modificador.
    let submodFiltered = submodificadores.filter((submodificador)=> {
      return (modSubmods.find((modSubmod)=> {
        return (
          (modSubmod.id_submodificador == submodificador.id)
          && (modSubmod.id_modificador == modificador.id)
        );
      }));
    });

    //This converts the whole rendered component into a drop target.
    return connectDropTarget(
      <div style={{height: 400}}>
        <BootstrapTable
          data={submodFiltered}
          striped
          hover
          pagination
          search
          clearSearch
          options={{
            defaultSortName: "orden",
            defaultSortOrder: "asc",
            sizePerPage: 5,
            sizePerPageList: [5, 10, 20, 50],
            deleteText: 'Eliminar',
            afterDeleteRow : this.props.handleDestroyModSubmods
          }}
          deleteRow={true}
          selectRow={selectRowProp}
        >
          <TableHeaderColumn
            dataField="id"
            isKey
            dataAlign="center"
            hidden
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="codigo"
            dataAlign="center"
          >
            Codigo
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nombre"
            dataAlign="center"
            dataFormat={(cell, row)=>(<SubmodificadorItem value={cell} data={row}/>)}
          >
            Nombre
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="maximo"
            dataAlign="center"
          >
            Maximo
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="minimo"
            dataAlign="center"
          >
            Minimo
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

}

ModSubmodList.PropTypes = {};

//This HOC from react-dnd wraps the component. The ItemType relates both source and target.
export default DropTarget(ItemTypes.SUBMOD, submodTarget, collect)(ModSubmodList);
