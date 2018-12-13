import React, { Component } from 'react'
import {get} from 'lodash';
export class label extends Component {
  render() {
      const { className, input: {value}, type, data={}  } = this.props;

    return (
      <label {...{ className }} type={type} > {get(data, value, value)} </label>
    )
  }
}
