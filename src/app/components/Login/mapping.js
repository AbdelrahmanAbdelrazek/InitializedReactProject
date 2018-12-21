export const mapDispatchToProps = dispatch => ({
    addUser(user) {
        dispatch({
            type: 'setUser',
            path: 'user',
            data: user
        })
    },
})