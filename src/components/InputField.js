/**
 * Created by enriq on 28/09/16.
 */
import React from 'react';
import {Field} from 'redux-form';
import {
  ControlLabel, FormControl
} from 'react-bootstrap';

//to format each redux-form field using react-bootstrap
// the props are defined this way in redux-form docs
const InputField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <ControlLabel>
      {label}
    </ControlLabel>
    <div>
      <FormControl
        {...input}
        placeholder={label}
        type={type}
      />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default InputField;
