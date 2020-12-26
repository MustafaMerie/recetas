import React, { useContext, useState, useEffect } from "react";
import { Image, Col, Row, Container } from "react-bootstrap";
import Search_draw from "../assets/search_draw.svg";
import { RecipesContext } from "../StateStore/RecipesListProvider";
import RecipesList from "./RecipesList";

export default function RecipesSearch() {
  const { recipes } = useContext(RecipesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterdRecipesList, setFilterdRecipesList] = useState([]);

  useEffect(() => {
    if (searchTerm === "  ") {
      alert("Please write something");
      setSearchTerm("");
    } else {
      setFilterdRecipesList(
        recipes.filter((recipe) => {
          return recipe.recipeName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        })
      );
    }
  }, [searchTerm, recipes]);

  return (
    <Container>
      <Row>
        <Col className="text-center my-5" md={12}>
          <Image
            className="img-fluid searchDraw"
            src={Search_draw}
            alt="Search svg"
          />
          <p className="lead mt-5 font-weight-bold">I Want to Cook </p>
          <input
            type="text"
            name="search"
            className="form-control text-center"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search"
          />
        </Col>
      </Row>
      <Row>
        <RecipesList filterdRecipesList={filterdRecipesList} />
      </Row>
    </Container>
  );
}
