import React, { Component } from 'react';
import * as FieldsComponent from './fields';
import { get, isString, isEqual, pick } from 'lodash';
import { Form } from 'antd';
import { translate } from "react-i18next";
import { connect } from 'react-redux'

class renderFields extends Component {
    constructor(props) {
        super(props)
        this.FieldComponent = get(FieldsComponent, props.field, FieldsComponent.text);
    }

    shouldComponentUpdate(nextProps) {
        const newData = pick(nextProps, ['meta', 'input', 'data', 'errors', 'lang'])
        const oldData = pick(this.props, ['meta', 'input', 'data', 'errors', 'lang'])
        return !isEqual(newData, oldData)
    }

    render() {
        const { FieldComponent } = this;
        const { label, meta: { touched, error, warning, asyncValidating }, t, hideLabel } = this.props;
        let validateStatus = null;
        const stringError = isString(error);
        const stringWarning = isString(warning);
        if (touched) {
            if (error && stringError) {
                validateStatus = 'error';
            } else if (warning && stringWarning) {
                validateStatus = 'warning';
            }
            else if (asyncValidating) {
                validateStatus = "validating"
            }
        }
        return (
            <Form.Item
                label={!hideLabel && t(`labels:${label}`)}
                hasFeedback
                validateStatus={validateStatus}
                help={touched && (stringError && t(`messages:${error}`) || stringWarning && t(`messages:${warning}`))}>
                <FieldComponent {...this.props} />
            </Form.Item >
        )
    }
}

export const mapStateToProps = ({ mainApp }) => ({
    lang: mainApp.language
})

export default connect(mapStateToProps)(translate("messages", "labels")(renderFields)); 
