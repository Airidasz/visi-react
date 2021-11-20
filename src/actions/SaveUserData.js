const saveUserData = (Session) => ({
    type: 'SIGN_IN',
    payload: Session,
})

export default saveUserData