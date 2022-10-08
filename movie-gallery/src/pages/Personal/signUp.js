import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import { signUp, createUser } from "../../services/firebase/firebase";

function SignUp() {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [signupInfo, setSignupInfo] = useState({
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
        head: '',
    });
    var reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9_-]+\.)+(com|net|org)$/;

    const handleValidate = () =>  {
        return reg.test(signupInfo.email) && signupInfo.name !== '' && signupInfo.password.length >= 6 
            && signupInfo.password === signupInfo.passwordConfirm;
    }

    const handleChange = (key, value) => {
        signupInfo[key] = value;
        setSignupInfo(signupInfo);
        setValidated(handleValidate());
    }

    const onSignUpSuc = async(user) => {
        const ret = createUser(user.uid, signupInfo.name, signupInfo.email, signupInfo.head);
        console.log("createUser", ret)

        navigate("/personal/signin");
    }

    const onSignUpFail = (errorCode, errorMessage) => {
        console.log("sign up failed.");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signUp(signupInfo.email, signupInfo.password, onSignUpSuc, onSignUpFail);
    }

    return (
        <Container>
          <Row className="center" style={{ width: "100%", maxWidth: 1144 }} >
            <h3>Sign Up</h3>
            <Form noValidate  onSubmit={(e) => {handleSubmit(e);}}>
                <Form.Group className="w-50" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => {handleChange("email", e.target.value);}}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="w-50" controlId="formBasicFanName">
                    <Form.Label>Fan name</Form.Label>
                    <Form.Control type="text" placeholder="Fan name" onChange={(e) => {handleChange("name", e.target.value);}}/>
                </Form.Group>

                <Form.Group className="w-50" controlId="formBasicPassword">
                    <Form.Label>Password (6 characters minimum)</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {handleChange("password", e.target.value);}}/>
                </Form.Group>

                <Form.Group className="w-50" controlId="formBasicPasswordConfirm">
                    <Form.Label>Password Confirm</Form.Label>
                    <Form.Control type="password" placeholder="Password Confirm" onChange={(e) => {handleChange("passwordConfirm", e.target.value);}}/>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!validated}>
                    Submit
                </Button>
            </Form>

            <p>Already have an account? Just <Link to="/personal/signin">sign in</Link>.</p>
          </Row>
        </Container>
    );
}

export default SignUp;

/*
                <Form.Group controlId="formFile" className="w-50">
                    <Form.Label>Your Favourite Head Icon</Form.Label>
                    <Form.Control type="file" onChange={(e) => {handleChange("head", e.target.value);}}/>
                </Form.Group>
*/