import React, { Component } from 'react'
import { InputNumber } from "antd";
import {translate} from 'react-i18next'

class inputNumberComp extends Component {
  render() {
      const { className, input, label, type,t } = this.props;

    return (
      <InputNumber {...{ className }} {...input} type={type} placeholder={t(label)} />
    )
  }
}

export const inputNumber = translate('labels')(inputNumberComp)
