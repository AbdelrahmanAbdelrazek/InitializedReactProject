import React, { Component } from 'react'
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
export  class radio extends Component {
  render() {
      const { input:{...input}, type, options, className}=this.props
    return <RadioGroup {...{ className }} {...input} options={options} type={type} />;
  }
}
