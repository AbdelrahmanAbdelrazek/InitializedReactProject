import React, { Component } from 'react'
import { Switch } from 'antd';

export  class singel extends Component {
  render() {
      const {className,input:{value,...input},type}=this.props
    return (
        <Switch {...input} checked={value} type={type} {...{className}}/>
    )
  }
}
