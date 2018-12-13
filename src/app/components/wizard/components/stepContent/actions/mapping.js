export const mapStateToProps = ({wizard:{currentStep, steps}}) => ({
    currentStep,
    steps,
})

export const mapDispatchToProps = (dispatch) => (
    {
        setCurrentStep: (step) => {
            dispatch({
                type:'setWizard',
                path: 'currentStep',
                data: step
            })
        },
        setMainObject: (data, step) => {
            dispatch({
                type: 'setWizard',
                path: `mainObject.${step}`,
                data
            })
        }
    }
)