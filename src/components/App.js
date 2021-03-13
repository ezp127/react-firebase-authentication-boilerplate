import React from 'react'
import { AuthProvider } from '../context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import PageNotFound from './PageNotFound'
import Signup from './Signup'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import Dashboard from './Dashboard'
import UpdateProfile from './UpdateProfile'

export default function App() {
    return ( 
        <main className="app-layout">
            <section className="container app-container">
                <Router>
                    <AuthProvider>
                        <Switch>
                            <Route path="/signup" component={ Signup } />
                            <Route path="/forgot-password" component={ ForgotPassword } />
                            <Route path="/login" component={ Login } />
                            <PrivateRoute exact path="/" component={ Dashboard } />
                            <PrivateRoute exact path="/update-profile" component={ UpdateProfile } />
                            <Route path='*' component={ PageNotFound } />
                        </Switch>
                    </AuthProvider>
                </Router>
            </section>
        </main>
    )
}
