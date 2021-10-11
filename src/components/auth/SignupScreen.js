import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { startSignupWithEmailPasswordName } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export const SignupScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);
    const [msgValidation, setMsgValidation] = useState('');
    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formValues;

    const handleSignup = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startSignupWithEmailPasswordName(email, password, name));
        }
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            setMsgValidation('El nombre no es válido');
            return false;
        }
        if (!validator.isEmail(email)) {
            setMsgValidation('El email no es válido');
            return false;
        }
        if (password !== password2) {
            setMsgValidation('Las contraseñas deben coincidir');
            return false;
        }
        if (password.length < 6) {
            setMsgValidation('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        setMsgValidation('');
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Sign Up</h3>
            <hr />
            <form onSubmit={ handleSignup } className="animate__animated animate__fadeIn">
                {
                    msgValidation &&
                    <div className="auth__alert-error">
                        { msgValidation }
                    </div>
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />
                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                    disabled={ loading }
                >
                    Register
                </button>
                <Link
                    className="link"
                    to ='/auth/login'
                >
                    Already register?
                </Link>
            </form>
        </>
    )
}
