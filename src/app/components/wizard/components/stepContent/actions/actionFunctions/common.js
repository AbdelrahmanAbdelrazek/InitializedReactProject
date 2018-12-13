import {get} from 'lodash';

export const next = (params, props, values) => {
    const {steps, currentStep, setCurrentStep, setMainObject} = props;
    setMainObject(values, currentStep);
    setCurrentStep(get(steps, steps.indexOf(currentStep)+1));
}

export const previous = (params, props) => {
    const {steps, currentStep, setCurrentStep} = props;
    setCurrentStep(get(steps, steps.indexOf(currentStep)-1));

}

export const done = (params, props, values) => {
    const {steps, currentStep, setCurrentStep, setMainObject} = props;
    setMainObject(values, currentStep);
    setCurrentStep(steps[0])
    //.....
    //To do when done
    console.log('Done!!!!')
    //.....
}