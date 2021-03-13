import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Login() {

    const { logIn } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await logIn(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    return (
        <>
            <h1 className="page-title">Log In</h1>
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
                    <button type="submit" className="btn btn-primary w-full" disabled={ loading }>Log In</button>
                </form>
                <div className="text-center">
                    <Link to="/forgot-password" className="link">Forgot password?</Link>
                </div>
            </div>
            <div className="text-center">
                Need an account? <Link to="/signup" className="link">Sign Up</Link>
            </div>  
        </>
    )
}
