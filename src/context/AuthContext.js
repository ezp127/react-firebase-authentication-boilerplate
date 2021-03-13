import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {

    const [ currentUser, setCurrentUser ] = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function logOut() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        resetPassword
    }

    return (
        <AuthContext.Provider value={ value }>
            { !loading && props.children }
        </AuthContext.Provider>
    )
}
