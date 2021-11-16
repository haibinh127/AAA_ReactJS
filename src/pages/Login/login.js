import mainLogo from './logo-red.png';
import './login.css';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const axios = require('axios');

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://binh-ask-answer.herokuapp.com/api/user/login', {
                email: email,
                password: password
            })
                .then((response) => {
                    const { user, token } = response.data;
                    console.log({ user, token });
                    localStorage.setItem('token', token);
                    // setUser(user);
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="logo-navbar">
                <img className="logo-image" src={mainLogo} alt="logo" />
            </div>
            <div className="form-container">
                <div className="login-form-wrapper">
                    <h3 className="status-text">Login</h3>
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                        </Form.Group>

                        <div className="navigate mt-2">
                            Do not have an account? <Link to="/signup" className="signup-link">Register</Link>
                        </div>
                        <br />

                        <button className="btn-signin" type="submit" onSubmit={onHandleSubmit} >
                            Sign in
                        </button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login;