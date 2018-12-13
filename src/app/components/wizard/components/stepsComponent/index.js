import React, { Component } from 'react'
import { mapStateToProps, mapDispatchToProps } from './mapping';
import { Steps, Icon } from 'antd';
import { get } from 'lodash';
import { connect } from 'react-redux';
const Step = Steps.Step;

class StepsComponent extends Component {

    handleStepClick(step) {
        const { setStep, mainObject, steps } = this.props;
        const unsubmittedSteps = steps.filter(step => !get(mainObject, step))
        if (get(mainObject, step) || step === get(unsubmittedSteps, '[0]')) {
            setStep(step);
        }
    }
    render() {
        const { steps, currentStep, wizardSettings, mainObject} = this.props;
        const stepsSettings = get(wizardSettings, 'steps');
        return (
            <div style={{ margin: "20px" }} className="wizard-container">
                <Steps current={steps.indexOf(currentStep)} style={{ margin: '16px', padding: '20px' }} className="steps-wizard">
                    {steps.map(stepKey => {
                        const step = get(stepsSettings, stepKey);
                        const icon = get(step, 'icon')
                        return <Step style={{ cursor: 'pointer' }}
                            title={get(step, 'label')}
                            status={get(mainObject, stepKey) && stepKey !== currentStep? 'finish' : undefined}
                            key={stepKey}
                            name={stepKey}
                            icon={icon && <Icon type={icon}/>}
                            description={get(step, 'description')}
                            onClick={this.handleStepClick.bind(this, stepKey)}
                        />
                    }
                    )}
                </Steps>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StepsComponent);