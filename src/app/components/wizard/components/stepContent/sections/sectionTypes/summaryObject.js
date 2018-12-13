import React, { Component } from 'react'
import * as typeofData from './typeofData';
import {get,map} from 'lodash'
export default class Summaryobject extends Component {
      constructor(props) {
          super(props);
          this.state={
              data:{}
          }
              this.Component=get(typeofData,this)
      }
  render() {
      const {data}=this.props
    return (
        <div>
           { map(data,(k,d)=>{
                 const Component=get(typeofData,(String(typeof(k))).toLowerCase(),typeofData.string) 
                 return (<section>
                    <label>{d}</label>
                     <Component label={d} data={k}/>
                 </section>)
            })}

        </div>
    )
  }
}
