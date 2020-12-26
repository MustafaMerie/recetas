import React, { useContext } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { AuthContext } from "../StateStore/AuthProvider";
import DishIcon from "../assets/dish-fork-and-knife.svg";
import PropTypes from "prop-types";

export default function RecipesList({ filterdRecipesList }) {
  const { modalShow, setModalShow, modalUpShow, setModalUpShow } = useContext(
    AuthContext
  );

  return (
    <>
      <Container>
        <SignInModal show={modalShow} onHide={() => setModalShow(false)} />
        <SignUpModal show={modalUpShow} onHide={() => setModalUpShow(false)} />
        <Row>
          {filterdRecipesList.length >= 1 ? (
            filterdRecipesList.map((recipe, i) => (
              <Col md={6} lg={4} key={i}>
                <Card className="my-3 text-center">
                  <Card.Img
                    className="imgCover"
                    variant="top"
                    src={recipe.recipeImageURL}
                  />
                  <Card.Body>
                    <img
                      className="dishIcon"
                      width={35}
                      height={35}
                      src={DishIcon}
                      alt="icon"
                    />

                    <Card.Title>{recipe.recipeName}</Card.Title>
                    <Card.Text className="text-truncate">
                      {recipe.recipeMethods}
                    </Card.Text>
                    <Link
                      className="primaryButton px-5"
                      to={{
                        pathname: `recipe/${recipe.recipeId}`,
                        recipe: recipe,
                      }}
                    >
                      Full Recipe
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
              <Col className="marginTop mb-5 text-center"><h4>No results, try another thing!</h4></Col>
            )}
        </Row>
      </Container>
    </>
  );
}

RecipesList.propTypes = {
  filterdRecipesList: PropTypes.array,
};
