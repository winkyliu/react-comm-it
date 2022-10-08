import React, { useState, useContext } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from "../../navigator";
import { signIn, readUserData } from "../../services/firebase/firebase";

function SignIn({ history }) {
    const navigate = useNavigate();

    const [user, online] = useContext(UserContext);

    const [validated, setValidated] = useState(false);
    const [signinInfo, setSigninInfo] = useState({
        email: '',
        password: '',
    });

    var reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9_-]+\.)+(com|net|org)$/;
    const handleValidate = () =>  {
        return reg.test(signinInfo.email) && signinInfo.password.length >= 6;
    }

    const handleChange = (key, value) => {
        signinInfo[key] = value;
        setSigninInfo(signinInfo);
        setValidated(handleValidate());
    }

    const onSignInSuc = async(u) => {
        const docSnap = await readUserData(u.uid);
        if (docSnap.exists()) {
            const userData = docSnap.data()
            console.log("readUserData", userData);
            userData.uid = u.uid;

            // set context value
            online(userData);

            navigate("/personal");
        } else {
            console.error("signIn: read user data failed.");
        }
    }

    const onSignInFail = (errorCode, errorMessage) => {
        console.log("sign in failed.");
        console.log(errorCode, errorMessage);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handle sigin");
        signIn(signinInfo.email, signinInfo.password, onSignInSuc, onSignInFail);
    }

    return (
        <Container>
          <Row className="center" style={{ width: "100%", maxWidth: 1144 }} >
            <h3>Sign In</h3>
            <Form noValidate onSubmit={(e) => {handleSubmit(e);}}>
                <Form.Group className="w-50" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={(e) => {handleChange("email", e.target.value);}}/>
                </Form.Group>

                <Form.Group className="w-50" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {handleChange("password", e.target.value);}}/>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!validated}>
                    Submit
                </Button>
            </Form>

            <p>Have no account? Just <Link to="/personal/signup">sign up</Link>.</p>

          </Row>
        </Container>
    );
}

export default SignIn;