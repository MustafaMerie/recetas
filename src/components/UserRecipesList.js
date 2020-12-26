import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "../StateStore/AuthProvider";
import { RecipesContext } from "../StateStore/RecipesListProvider";
import DishIcon from "../assets/dish-fork-and-knife.svg";
import { db, storage } from "../firebase";

export default function UserRecipesList() {
  const { currentUser } = useContext(AuthContext);
  const { recipes } = useContext(RecipesContext);
  const thisUserRecipes = recipes.filter(recipe => recipe.userId === currentUser.user.uid)

  const handleDeleteRecipe = (id, imageName) => {
    db.collection("recipes").doc(id).delete()
    storage.ref(`images/${imageName}`).delete()
  };

  return (
    <>
      <Row className="text-center marginTop">
        <Col>
          <h1 className="yellowBorder titleWidth">Your Recipes</h1>
        </Col>
      </Row>
      <Row>
        {thisUserRecipes.length >= 1
          ? thisUserRecipes.map((recipe) => (
            <div
              className="col-md-6 text-center my-5"
              key={recipe.recipeName}
            >
              <img className="imgCover" src={recipe.recipeImageURL} alt="recipe" />
              <img
                className="dishIcon"
                width={35}
                height={35}
                src={DishIcon}
                alt="icon"
              />
              <h1>{recipe.recipeImgName}</h1>
              <h1>{recipe.recipeName}</h1>
              <p className="text-truncate">{recipe.recipeMethods}</p>
              <Row>
                <Col md={12} lg={6}>
                  <Link
                    className="primaryButton px-5 py-1"
                    to={{
                      pathname: `recipe/${recipe.recipeId}`,
                      state: recipe,
                    }}
                  >
                    Full Recipe
                    </Link>
                </Col>

                <Col md={12} lg={6} className="mt-4 mt-lg-0">
                  <Link
                    to="#"
                    className="primaryButton px-5 py-1"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this Recipe?"
                        )
                      )
                        handleDeleteRecipe(recipe.id, recipe.recipeImgName);
                      // handleDeleteRecipeImg(recipe.recipeImgName)
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Link>
                </Col>
              </Row>
            </div>
          ))
          : <Col className="marginTop mb-5 text-center"><h4>You have no Recipes yet!</h4></Col>}
      </Row>
    </>
  );
}
