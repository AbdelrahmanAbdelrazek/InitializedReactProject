import React from 'react'
import { Input } from 'antd';
import mainInput from 'helpers/main/input';
import {translate} from 'react-i18next'
const {TextArea} = Input;

class textAreaComp extends mainInput {
  render() {    
      const { className, input, label, type, placeholder, style, rows=1, t} = this.props;
    return (
        <TextArea {...{className}} {...{rows}} {...input} {...{type}} placeholder={t(placeholder ? placeholder: label)} {...{style}}/>
    )
  }
}

export const textArea = translate('labels')(textAreaComp)