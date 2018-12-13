import React, { Component } from 'react';
import * as SectionsComponent from './sectionTypes';
import { get } from 'lodash';

class renderSection extends Component {
    constructor(props) {
        super(props)
        this.SectionComponent = get(SectionsComponent, props.type, SectionsComponent.inputs);
    }
    // shouldComponentUpdate(nextProps){
    //     const newData = pick(nextProps, ['meta', 'input', 'data', 'errors'])
    //     const oldData = pick(this.props, ['meta', 'input', 'data', 'errors'])

    //     return !isEqual(newData, oldData)
    // }
    render() {
        const { SectionComponent } = this;
        return (
            <SectionComponent {...this.props} />
        )
    }
}



export default renderSection; 
