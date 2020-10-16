import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userLoginActions'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control type='email' 
                    placeholder='Enter email' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label> Password </Form.Label>
                    <Form.Control type='password' 
                    placeholder='Enter password' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            
        </FormContainer>
    )
}

export default LoginScreen
