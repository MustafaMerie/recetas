import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFoundRoute() {
  return (
    <Container>
      <Row>
        <Col className="notFoundContect text-center">
          <h1>404</h1>
          <p>Oops! Page not Found!</p>
          <Link className="primaryButton mt-2 px-5 py-1" to="/recipes">
            Go Back to Recipes
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
