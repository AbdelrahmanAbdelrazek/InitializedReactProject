export const mapDispatchToProps = (dispatch) => {
    return {
        setWizardSettings: (value) => {
            dispatch({
                type: 'setWizard',
                path: 'wizardSettings',
                data: value
            })
        },
        setSteps: (value) => {
            dispatch({
                type: 'setWizard',
                path: 'steps',
                data: value
            })
        },
        setCurrentStep: (value) => {
            dispatch({
                type: 'setWizard',
                path: 'currentStep',
                data: value
            })
        }
    }
}
