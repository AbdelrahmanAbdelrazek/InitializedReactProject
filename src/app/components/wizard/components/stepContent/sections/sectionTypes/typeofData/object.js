import React, { Component } from 'react'
import Summaryobject from '../summaryObject'

export class object extends Component {
  render() {
      const {data}=this.props
    return (
        <Summaryobject data={data}/>
    )
  }
}
