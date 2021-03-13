import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {

    const { currentUser, logOut } = useAuth()
    const [ error, setError ] = useState('')
    const history = useHistory()

    async function handleLogOut() {
        setError('')

        try {
            await logOut()
            history.pushState('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <h1 className="page-title">Profile</h1>
            { error && <div className="alert alert-danger">{ error }</div> }
            <div className="box bg-white">
                <div className="py-3">
                    E-mail: <strong>{ currentUser.email }</strong>
                </div>
                <div className="py-3">
                    <Link to="/update-profile" className="btn btn-primary">Update Profile</Link>
                </div>
            </div>
            <div className="mt-2 text-center">
                <button type="button" className="link" onClick={handleLogOut}>Log Out</button>
            </div>
        </>
    )
}
