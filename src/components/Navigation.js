import React, { useContext, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../StateStore/AuthProvider";

export default function Navigation() {
  const { currentUser, setModalShow, signOutHandler } = useContext(AuthContext);
  const currentRoute = useLocation().pathname;
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className={currentRoute === "/" ? "fixed-top" : "navbar-dark bg-dark"}>
      <Container>
        <Navbar className="flex-column flex-md-row">
          <Link to="/" className="logo">
            Recetas
          </Link>
          <Navbar.Collapse className="justify-content-end">
            {currentUser.isAuthenticated ? (
              <>
                <div className="dropDown">
                  <button
                    className="dropDownBtn"
                    onClick={() => setShowDropDown(!showDropDown)}
                  >
                    {" "}
                    Welcome, <b>{currentUser.user.displayName}</b>!
                  </button>
                  <div
                    className="dropDownContent w-75"
                    hidden={!showDropDown ? true : false}
                  >
                    <ul>
                      <li onClick={() => setShowDropDown(!showDropDown)}>
                        <Link to="/me">My account</Link>
                      </li>
                      <li onClick={() => setShowDropDown(!showDropDown)}>
                        <Link to="/recipes" >
                          Recipes
                        </Link>
                      </li>
                      <li onClick={() => setShowDropDown(!showDropDown)}>
                        <Link to="#" onClick={signOutHandler}>
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
                <>
                  <Navbar.Text className="mr-2 navbarCaption">
                    Already have an account?
                </Navbar.Text>
                  <Button
                    className="primaryButton navbarSignInBtn"
                    onClick={() => setModalShow(true)}
                  >
                    Sign In
                </Button>
                </>
              )}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
