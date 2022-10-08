import React, { useContext, useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../navigator";
import { offLine } from "../../services/firebase/firebase";

function UserBar() {
  const navigate = useNavigate();

  const [user, online] = useContext(UserContext);

  const onSignOutSuc = () => {
    online(null);

    navigate("/personal");
  }

  const onSignOutFail = (errorCode, errorMessage) => {
    console.log("sign out failed.", errorCode, errorMessage);
  }

  const handleClick = (event) => {
    offLine(onSignOutSuc, onSignOutFail);
  }

  if (user) {
    return (
      <Stack direction="horizontal" gap={3}>
        <Button variant="danger"onClick={(e) => {handleClick(e);}}>Sign Out</Button>
        <h5 style={{ color: "white" }}>Hello, {user.name}</h5>
      </Stack>
    );
  } else {
    return (
      <Stack direction="horizontal" gap={3}>
        <Link to="/personal/signup">
          <Button variant="primary">Sign Up</Button>
        </Link>
        <h4 style={{ color: "white" }}>or</h4>
        <Link to="/personal/signin">
          <Button variant="success">Sign In</Button>
        </Link>
      </Stack>
    );
  }
}

export default UserBar;