import React, { Component } from 'react'
import {date as Date} from './date';
 export class string extends Component {
  render() {
     const {data}=this.props
     

     const datetime= /\d{4,4}-\d{2,2}-\d{2,2}/;
      if(datetime.test(data))
      {
          return (
              <Date data={data}/>
              )
      }
      else {
    return (
     <div>
     {this.props.data}
     </div>
    )
      }
  }
}
