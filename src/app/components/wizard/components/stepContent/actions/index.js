import React, { Component } from 'react';
import * as Actions from './actionTypes';
import { get } from 'lodash';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from './mapping';
import * as actionFuncs from './actionFunctions';


class RenderAction extends Component {
    constructor(props) {
        super(props)
        this.Action = get(Actions, props.type, Actions.ButtonComponent);
    }

    takeAction = (actionName, params, props, values) => {
        get(actionFuncs, actionName, () => {})(params, props, values);
    }

    render() {
        const { Action } = this;
        const {handleSubmit, params, htmlType, actionName} = this.props;
        const handleClick = htmlType === 'submit' ? handleSubmit(values => this.takeAction(actionName, params, this.props, values)) : (e) => this.takeAction(actionName, params, this.props);
        return (
            <Action onClick={handleClick} {...this.props}/>
        )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(RenderAction); 
