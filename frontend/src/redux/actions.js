
const fetchUser = (loggedUser = null) => {
    return { 
        type : 'FETCH',
        payload : loggedUser
    }
}

const logIn = (loggedUser = null) => {
    return { 
        type : 'LOG IN',
        payload : loggedUser
    }
}

const register = (loggedUser = null) => {
    return { 
        type : 'REGISTER',
        payload : loggedUser
    }
}

const logOut = () => {
    return { 
        type : 'LOG OUT',
        payload : null
    }
}

export { fetchUser, logIn, register, logOut }