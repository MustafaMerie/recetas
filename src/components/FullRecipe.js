import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Row, Image, Button, Spinner } from "react-bootstrap";
import DishIcon from "../assets/dish-fork-and-knife.svg";
import { db } from "../firebase";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import NotFoundRoute from "./NotFoundRoute";
import { AuthContext } from "../StateStore/AuthProvider";
import PropTypes from "prop-types";

export default function FullRecipe(props) {
  const { modalShow, setModalShow, modalUpShow, setModalUpShow } = useContext(AuthContext)
  const [recipe, setRecipe] = useState("");

  let id = props.location.pathname.slice(8);
  useEffect(() => {
    db.collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        setRecipe(doc.data());
      });
  }, []);

  if (recipe === undefined) {
    return <NotFoundRoute />;
  }

  return (
    <Container>
      <SignInModal show={modalShow} onHide={() => setModalShow(false)} />
      <SignUpModal show={modalUpShow} onHide={() => setModalUpShow(false)} />
      <Row>
        {recipe ? (
          <Col className="my-5" key={recipe.recipeName}>
            <Image
              style={{ height: "35rem" }}
              className="rounded imgCover w-75 mx-auto d-block d-print-none"
              src={recipe.recipeImageURL}
              alt="recipe"
              rounded
            />
            <Image
              className="dishIcon"
              width={45}
              height={45}
              src={DishIcon}
              alt="icon"
            />
            <h1 className="text-center">{recipe.recipeName}</h1>
            <h2 className="mt-5">Ingredients:</h2>
            <ul>
              {recipe
                ? recipe.recipeIngredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))
                : "No Ingredients"}
            </ul>

            <h2 className="mt-5">Methods:</h2>
            <p>{recipe.recipeMethods}</p>
            <div className="text-center py-4 ">
              <Button
                className="primaryButton mt-3 px-5 py-1 d-print-none"
                onClick={window.print}
              >
                Print <i className="fas fa-print"></i>
              </Button>
              <div className="d-none d-print-block">
                Provided by <b>RECETAS</b>
              </div>
            </div>
          </Col>
        ) : (
            <Col className="text-center marginTop">
              <Spinner animation="grow" />
            </Col>
          )}
      </Row>
    </Container>
  );
}

FullRecipe.propTypes = {
  location: PropTypes.object,
};
