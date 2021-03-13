import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
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
        setLoading(true)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="mb-2 text-center">Log In</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={ emailRef } required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={ passwordRef } required />
                        </Form.Group>
                        <Button type="submit" disabled={ loading } className="w-100">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 mt-2 text-center">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>  
        </>
    )
}
