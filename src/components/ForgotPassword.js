import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {

    const { resetPassword } = useAuth()
    const emailRef = useRef()
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed reset password')
        }
        setLoading(false)
    }

    return (
        <>
            <h1 className="page-title">Password Reset</h1>
            { error && <div className="alert alert-danger">{ error }</div> }
            { message && <div className="alert alert-success">{ message }</div> }
            <div className="box bg-white">
                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" type="email" className="form-control" ref={ emailRef } required />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={ loading }>Reset Password</button>
                </form>
            </div>
            <div className="text-center">
                <Link to="/login" className="link">Back to Login</Link>
            </div>
        </>
    )
}
