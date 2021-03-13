import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function UpdateProfile() {

    const { currentUser, updateEmail } = useAuth()
    const emailRef = useRef()
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')
        setMessage('')
        setLoading(true)

        const promises = []

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        Promise.all(promises).then(() => {
            setMessage('Profile successfully updated')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <h1 className="page-title">Update Profile</h1>
            { error && <div className="alert alert-danger">{ error }</div> }
            { message && <div className="alert alert-success">{ message }</div> }
            <div className="box bg-white">
                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" type="email" className="form-control" defaultValue={ currentUser.email } ref={ emailRef } required />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={ loading }>Save</button>
                </form>
            </div>
            <div className="text-center">
                <Link to="/" className="link">Back to Dashboard</Link>
            </div>  
        </>
    )
}
