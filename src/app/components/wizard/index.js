import React, { Component } from 'react'
import { wizardObject } from './wizardObject'
import { get, keys, head } from 'lodash'
import { connect } from 'react-redux'
import { mapDispatchToProps } from './mapping';
import Steps from './components/stepsComponent';
import StepContent from './components/stepContent'

export class Wizard extends Component {
    constructor(props) {
        super(props);
        const { setCurrentStep, setSteps, setWizardSettings } = this.props;
        const steps = keys(get(wizardObject, 'steps'));
        setSteps(steps);
        setCurrentStep(head(steps));
        setWizardSettings(wizardObject);
    }
    render() {
        return (
            <div>
                <Steps/>
                <StepContent/>
            </div>
        );
    }
}



export default connect(null, mapDispatchToProps)(Wizard);
