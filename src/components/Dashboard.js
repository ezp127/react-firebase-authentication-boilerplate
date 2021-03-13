import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Alert, Button, Card } from 'react-bootstrap'
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
            <Card>
                <Card.Body>
                    <h2 className="mb-2 text-center">Profile</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <div className="my-2">
                        E-mail: <strong>{ currentUser.email }</strong>
                    </div>
                    <div className="my-2">
                        <Link to="/update-profile" className="btn btn-primary">Update Profile</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 mt-2 text-center">
                <Button variant="link" onClick={handleLogOut}>Log Out</Button>
            </div>  
        </>
    )
}
