import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2'

export class doughnut extends Component {
    render() {
    const {data, options} = this.props;
        return (
             <Doughnut {...{ data, options }}/>
        );
    }
}
