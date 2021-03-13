import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
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
            <Card>
                <Card.Body>
                    <h2 className="mb-2 text-center">Update Profile</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    { message && <Alert variant="success">{ message }</Alert> }
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={ emailRef } defaultValue={ currentUser.email } required />
                        </Form.Group>
                        <Button type="submit" disabled={ loading } className="w-100">Save</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 mt-2 text-center">
                <Link to="/">Back to Dashboard</Link>
            </div>  
        </>
    )
}
