import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Signup() {

    const { signUp } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        
        if (passwordRef.current.value != passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <>
            <h1 className="page-title">Sign Up</h1>
            { error && <div className="alert alert-danger">{ error }</div> }
            <div className="box bg-white">
                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" type="email" className="form-control" ref={ emailRef } required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input id="password" type="password" className="form-control" ref={ passwordRef } required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-confirm" className="form-label">Password confirmation</label>
                        <input id="password-confirm" type="password" className="form-control" ref={ passwordConfirmRef } required />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={ loading }>Sign Up</button>
                </form>
            </div>
            <div className="text-center">
                Already have an account? <Link to="/login" className="link">Log In</Link>
            </div>  
        </>
    )
}
