import { onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { auth } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if(checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={ JournalScreen } isAuthenticated={ isLoggedIn } />
                <PublicRoute path="/auth" component={ AuthRouter } isAuthenticated={ isLoggedIn } />
                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}
