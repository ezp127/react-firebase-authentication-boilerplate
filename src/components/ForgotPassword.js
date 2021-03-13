import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
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
            <Card>
                <Card.Body>
                    <h2 className="mb-2 text-center">Password Reset</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    { message && <Alert variant="success">{ message }</Alert> }
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={ emailRef } required />
                        </Form.Group>
                        <Button type="submit" disabled={ loading } className="w-100">Reset Password</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 mt-2 text-center">
                <Link to="/login">Back to Login</Link>
            </div>  
        </>
    )
}
