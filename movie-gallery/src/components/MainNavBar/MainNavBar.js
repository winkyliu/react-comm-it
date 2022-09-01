import React, { useState } from "react";
import { Button, Form, Navbar, Nav, FormControl } from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";

import "./styles.css";
import logo from "../../resources/img/logo.png";

function MainNavBar({ ...props }) {
  const { history, query, handler_current_page } = props;
  const location = useLocation();

  const [word, setWord] = useState(query ? query : "");
  const isPageSearch = location.pathname.includes("search");

  function GoToSearch(word) {
    if (word == "") return false;
    if (isPageSearch) {
      history.replace({
        pathname: `/search/${word}`,
      });
      handler_current_page(1);
      return false;
    }

    history.push({ pathname: `/search/${word}` });
  }

  return (
    <div
      className={`container-header ${
        location.pathname.includes("details") ? "" : "mb-4"
      } `}
    >
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <img title="Chenguang's Movie Gallery" alt="Chenguang's Movie Gallery" className="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              activeClassName="active-page"
              className={`nav-link`}
              exact
              to="/"
            >
              Movies
            </NavLink>
            <NavLink
              activeClassName="active-page"
              className={`nav-link`}
              to="/actors"
            >
              Actors
            </NavLink>
            <NavLink
              activeClassName="active-page"
              className={`nav-link`}
              to="/personal"
            >
              Personal
            </NavLink>
            <NavLink
              activeClassName="active-page"
              className={`nav-link`}
              to="/about"
            >
              About
            </NavLink>
          </Nav>
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
              GoToSearch(word);
            }}
          >
            <FormControl
              type="text"
              placeholder="Movie or Person..."
              className="mr-sm-2"
              onChange={(e) => {
                setWord(e.currentTarget.value);
              }}
              value={word}
            />
            <Button
              disabled={word == "" ? true : false}
              className="button-primary btn-search"
              onClick={() => GoToSearch(word)}
            >
              Find
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MainNavBar;
