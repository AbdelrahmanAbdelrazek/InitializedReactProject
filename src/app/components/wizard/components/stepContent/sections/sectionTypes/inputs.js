import React, { Component } from 'react'
import { Field } from 'redux-form';
import renderField from 'components/inputs';
import { serverFieldMapper } from "helpers/functions";
import {map} from 'lodash'

export class inputs extends Component {
  constructor(props) {
    super(props);
    const { fields } = this.props;
    this.fields = map(fields, (value, key) => ({name:key, ...serverFieldMapper(value)}))
  }
  render() {
    // const {input:{name:sectionName}} = this.props;
    return (
      <div >
        {this.fields.map((field) => (
          <Field
            component={renderField}
            key={field.name}
            {...{ ...field }} />
        ))}
      </div>
    )
  }
}
