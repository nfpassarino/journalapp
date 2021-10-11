import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { SignupScreen } from '../components/auth/SignupScreen';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>
                    <Route exact path="/auth/login" component={ LoginScreen } />
                    <Route exact path="/auth/signup" component={ SignupScreen } />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </div>
    )
}
