import React, { Component } from 'react';
import {Button} from 'antd';
import {translate} from 'react-i18next';

class ButtonComp extends Component {
    render() {
        const {label, htmlType, onClick, t} = this.props;
        return (
            <Button type='primary' {...{htmlType}} {...{onClick}}>{t(label)}</Button>
        );
    }
}

export const ButtonComponent = translate('actions')(ButtonComp);