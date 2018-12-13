import { get } from 'lodash';

export const mapStateToProps = ({ wizard }) => ({
    steps: wizard.steps,
    mainObject: wizard.mainObject,
    initialValues: get(wizard.mainObject, wizard.currentStep),
    currentStep: {
        name: wizard.currentStep,
        ...get(wizard.wizardSettings, ['steps', wizard.currentStep]),
    },
})