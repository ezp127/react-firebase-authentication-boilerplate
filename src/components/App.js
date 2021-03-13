import React from 'react'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import PageNotFound from './PageNotFound'
import Signup from './Signup'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import Dashboard from './Dashboard'

export default function App() {
    return (        
        <Container 
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '100vh' }}
        >
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path="/" component={ Dashboard } />
                            <Route path="/signup" component={ Signup } />
                            <Route path="/forgot-password" component={ ForgotPassword } />
                            <Route path="/login" component={ Login } />
                            <Route path='*' component={ PageNotFound } />
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
    )
}
