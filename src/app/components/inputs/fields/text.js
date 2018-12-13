import React from 'react'
import { Input } from 'antd';
import mainInput from 'helpers/main/input';
import {translate} from 'react-i18next'

class textComp extends mainInput {
  render() {    
      const { className, input, label, type, placeholder, style, t} = this.props;
    return (
        <Input {...{className}} {...input} {...{type}} placeholder={t(placeholder ? placeholder: label)} {...{style}}/>
    )
  }
}

export const text = translate('labels')(textComp)
