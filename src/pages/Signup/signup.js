import mainLogo from './logo-red.png';
import './signup.css';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const axios = require('axios');

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://binh-ask-answer.herokuapp.com/api/user/register', {
                email: email,
                password: password,
                name: name
            })
                .then((response) => {
                    alert("Register Success !")
                    navigate('/login');
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
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
                <div className="form-wrapper">
                    <h3 className="status-text">Register</h3>
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" value={name} onChange={onChangeName} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                        </Form.Group>

                        <div className="navigate mt-2">
                            Do you already have an account? <Link to="/login" className="login-link">Login</Link>
                        </div>
                        <br />

                        <button className="btn-signin" type="submit" onSubmit={onHandleSubmit}>
                            Sign up
                        </button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Signup;