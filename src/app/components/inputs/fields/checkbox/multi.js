import React from 'react'
import {Checkbox} from "antd";
import mainInput from 'helpers/main/input';

export  class multiChecks extends mainInput {
  onCheckAllChange(){
    const {input: {value, onChange}, options} = this.props
    if(value.length == options.length){
      onChange([])
    }else{
      onChange(options);
    }
  }
  render() {
    const { input: { value, ...input }, type, options,className }=this.props
    return <div>
        <div style={{ borderBottom: "1px solid #E9E9E9" }}>
          <Checkbox onChange={this.onCheckAllChange.bind(this)} checked={value.length == options.length}>
            Check all
          </Checkbox>
        </div>
        <br />
        <Checkbox.Group {...input} type={type} value={value} options={options} {...{className}}/>
      </div>;
        
      
  }
}

