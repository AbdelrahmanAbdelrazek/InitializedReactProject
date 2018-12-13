import React from 'react'
import { Checkbox } from "antd";
import mainInput from 'helpers/main/input';
import { translate } from 'react-i18next'

class booleanComp extends mainInput {
  constructor(props) {
    super(props)
    const { input: { value, onChange } } = props;
    value ? onChange(true) : onChange(false);
  }
  render() {
    const { t, className, input: { value, ...input }, type, label, hide_sublabel } = this.props
    return <Checkbox {...{ className }} {...input} checked={value ? true : false} type={type}>
      {!hide_sublabel && t(label)}
    </Checkbox>;
  }
}

export const boolean = translate('labels')(booleanComp)


