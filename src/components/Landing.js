import React, { useContext } from "react";
import "./style.css";
import { Button, Col, Row, Container } from "react-bootstrap";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";
import { AuthContext } from "../StateStore/AuthProvider";

export default function Landing() {
  const {
    currentUser,
    modalShow,
    setModalShow,
    modalUpShow,
    setModalUpShow,
  } = useContext(AuthContext);

  return (
    <div className="landingPage">
      <SignInModal show={modalShow} onHide={() => setModalShow(false)} />
      <SignUpModal show={modalUpShow} onHide={() => setModalUpShow(false)} />
      <div className="intro">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="w-75">
                “People Who Love to Eat Are Always the Best People”
              </h2>
              <span>Julia Child</span>
            </Col>
          </Row>
          <Row className="btnsGroup d-inline-flex">
            <Col sm={6}>
              <Button
                className="primaryButton px-5"
                disabled={currentUser.isAuthenticated}
                onClick={() => setModalUpShow(true)}
              >
                Join Now
              </Button>
            </Col>
            <Col sm={6}>
              <Button as={Link} className="primaryButton px-5" to="/recipes">
                Recipes
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
