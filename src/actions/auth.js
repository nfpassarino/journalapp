import { signInWithPopup, auth, googleAuthProvider, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { codeErrorHandling } from '../helpers/codeErrorHandling';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(login( user.uid, user.displayName ));
                dispatch(finishLoading());
            })
            .catch( e => {
                Swal.fire('Error', codeErrorHandling[e.code], 'error');
                dispatch(finishLoading());
            });
    }
};

export const startSignupWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        dispatch(startLoading());
        createUserWithEmailAndPassword(auth, email, password, name)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name });
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch(e => {
                Swal.fire('Error', codeErrorHandling[e.code], 'error');
                dispatch(finishLoading());
            });
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e => console.error(e));
    }
};

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
};

export const startLogout = () => {
    return async(dispatch) => {
        await signOut(auth);
        dispatch(logout());
        dispatch(noteLogout());
    }
};

export const logout = () => {
    return {
        type: types.logout,
    }
};
