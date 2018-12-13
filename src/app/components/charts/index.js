import React, { Component } from 'react';
import * as chartTypes from './chartTypes';
import {get} from 'lodash';

class renderChart extends Component {
    constructor(props) {
        super(props);
        this.ChartComponent = get(chartTypes, props.type, chartTypes.bar);
    }
    
    render() {
        const {label, hideLabel} = this.props;
        const {ChartComponent} = this
        return (
            <div>
                {!hideLabel && label && <label>{label}</label>}
                <ChartComponent {...this.props}/>
            </div>
        );
    }
}

export default renderChart;