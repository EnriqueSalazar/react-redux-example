import React, {Component, PropTypes} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {
  Button,
  Glyphicon,
  Row, Col,
  FormGroup,
  Well,
} from 'react-bootstrap';
import _ from 'lodash';
import InputField from '../InputField';
import check from '../check';

//Returns a single object with a single error per field evaluated.
const validate = values => {
  const errors = {}
  errors.minimo = check.isNumber(values.minimo);
  errors.maximo = check.isNumber(values.maximo);
  errors.codigo = check.isNumber(values.codigo);
  return errors
}

//A stateless function just to handle a form.
let Modificador = props => {
  //Notice handleSubmit prop is not passed from the parent component, but needed to handle submission.
  const {
    initialValues,
    modificadorSubmit,
    handleSubmit,
    modificadorSelect
  }= props;

  // if (_.isEmpty(initialValues)) {
  //   return (<div></div>);
  // }

  //This gets props.initialValues and fills the form. Use the Field component from redux-form
  // and format it using your custom component like InputField.
  //Notice you can style the button using a ternary conditional.
  return (
    <Well>
      <form onSubmit={handleSubmit(modificadorSubmit)}>
        <FormGroup>
          <Row className="show-grid">
            <Col md={9}>
              <Field
                name="nombre"
                label="Nombre"
                type="text"
                component={InputField}
              />
            </Col>
            <Col md={3}>
              <Field
                name="is_inactivo"
                label="Inactivo"
                type="checkbox"
                component={InputField}
              />
            </Col>
          </Row>
          <br/>
          <Row className="show-grid">
            <Col md={3}>
              <Field
                name="codigo"
                label="Codigo"
                type="text"
                component={InputField}
              />
            </Col>
            <Col md={3}>
              <Field
                name="maximo"
                label="Maximo"
                type="text"
                component={InputField}
              />
            </Col>
            <Col md={3}> <Field
              name="minimo"
              label="Minimo"
              type="text"
              component={InputField}
            />
            </Col>
            <Col md={3}>
              <Field
                name="orden"
                label="Orden"
                type="text"
                component={InputField}
              />
            </Col>
          </Row>
          <br/>
          <Row className="show-grid">
            <Col md={9}>
              <Button
                type="submit"
                bsStyle={_.isEmpty(initialValues) ? "primary" : "info"}
              >
                {_.isEmpty(initialValues) ? "Crear " : "Guardar "}
                <Glyphicon glyph="floppy-save"/>
              </Button>
              {" "}
              <Button
                onClick={()=>modificadorSelect({})}
                bsStyle="warning">
                {"Reset "}
                <Glyphicon glyph="floppy-save"/>
              </Button>
            </Col>

          </Row>
        </FormGroup>
      </form>
    </Well>
  );
};

//Here the form setup. You assign a name (used in more complex scenarios),
// enable to refresh when initialValues gets updated in the parent,
// and add the validation.
Modificador = reduxForm({
  form: 'modificadorForm',
  enableReinitialize: true,
  validate
})(Modificador);

Modificador.PropTypes = {};

export default Modificador;
