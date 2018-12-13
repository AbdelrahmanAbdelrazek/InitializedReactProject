export const mapStateToProps = ({ wizard:{currentStep='', steps=[], wizardSettings, mainObject} }) => ({
  currentStep,
  steps,
  wizardSettings,
  mainObject
})

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setStep: (step) => {
      dispatch({
        type: 'setWizard',
        path: 'currentStep',
        data: step
      })
    },
  }
}