import React, {Component, PropTypes} from 'react';

//Thjs is a stateless function, since I just use this function to render props data is better this way
// is supposed to have performance advantages in the future.
const ModificadoresList = props => {

  //you could use regular props, or the children
  let modificadores = props.children;

  // Some configuration for BootstrapTable. Options could also be defined as a JSON.
  var selectRowProp = {
    mode: "radio", // or checkbox
    clickToSelect: true
  };

  return (

    //Basically BootstrapTable receives a list of objects, and render the Table. You can define
    // some options and callbacks (functions).
    // I used callbacks from the props passed all the way from the container.
    <div>
      <BootstrapTable
        data={modificadores}
        striped
        hover
        pagination
        search
        clearSearch
        options={{
          defaultSortName: "orden",
          sortOrder: "desc",
          sizePerPage: 5,
          sizePerPageList: [5, 10, 20, 50],
          onRowClick: props.modificadorSelect,
          deleteText: 'Eliminar',
          afterDeleteRow : props.destroyModificador
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
};

ModificadoresList.propTypes = {};

export default ModificadoresList;
