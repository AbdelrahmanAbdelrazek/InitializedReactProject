import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

export class pie extends Component {
    render() {
    const {data, options} = this.props;
        return (
             <Pie {...{ data, options }}/>
        );
    }
}
