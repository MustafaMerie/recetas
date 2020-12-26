import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { AuthContext } from "../StateStore/AuthProvider";
import { db, storage } from "../firebase";
import firebase from "firebase";
import "firebase/firestore";
import bsCustomFileInput from "bs-custom-file-input";
import UserRecipesList from "./UserRecipesList";

export default function MyAccount() {
  const { currentUser } = useContext(AuthContext);
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([{}]);
  const [recipeMethods, setRecipeMethods] = useState("");
  const [recipeImg, setRecipeImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitCompleted, setSubmitCompleted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadTask = storage.ref(`images/${recipeImg.name}`).put(recipeImg);
    uploadTask.on(
      "state_changed",
      // eslint-disable-next-line no-unused-vars
      (snapshot) => { },

      (error) => {
        alert("error", error);
      },
      () => {
        storage
          .ref("images")
          .child(recipeImg.name)
          .getDownloadURL()
          .then((url) => {
            const newDocRef = db.collection("recipes").doc();
            newDocRef.set({
              recipeName: recipeName,
              recipeIngredients: recipeIngredients,
              recipeMethods: recipeMethods,
              recipeImageURL: url,
              recipeImgName: recipeImg.name,
              recipeId: newDocRef.id,
              userId: currentUser.user.uid,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })

              .then(() => {
                setSubmitCompleted(true);
                setRecipeName("");
                setRecipeIngredients([{}]);
                setRecipeMethods("");
                setRecipeImg("");
                setLoading(false);
              })
              .catch((error) =>
                alert(
                  "Something went wrong,please reload the Page. The error:",
                  error
                )
              );
          });
      }
    );
  };

  const handleInputChange = (e, i) => {
    const { value } = e.target;
    const list = [...recipeIngredients];
    list[i] = value;
    setRecipeIngredients(list);
  };

  const addAnotherInput = () => {
    setRecipeIngredients([...recipeIngredients, {}]);
  };

  const removeInput = (e, i) => {
    const list = [...recipeIngredients];
    list.splice(i, 1);
    setRecipeIngredients(list);
  };

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  return (
    <Container>
      {currentUser && !submitCompleted ? (
        <>
          <Row className="text-center marginTop">
            <Col>
              <h1 className="yellowBorder titleWidth">
                Add your recipe and let others enjoy cooking it
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={6}>
              <form onSubmit={submitHandler}>
                <input
                  size="lg"
                  className="form-control"
                  type="text"
                  placeholder="Recipe name"
                  required
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                />
                {recipeIngredients &&
                  recipeIngredients.map((item, i) => {
                    return (
                      <div key={i}>
                        <input
                          size="lg"
                          className="form-control"
                          type="text"
                          placeholder="Ingredient"
                          required
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>
                    );
                  })}
                {recipeIngredients.length > 1 ? (
                  <input
                    className="addRemoveInput"
                    type="button"
                    value="Remove"
                    onClick={removeInput}
                  />
                ) : null}
                <input
                  className="addRemoveInput"
                  type="button"
                  value="Add another ingredient"
                  onClick={addAnotherInput}
                />
                <textarea
                  size="lg"
                  className="form-control"
                  placeholder="Methods"
                  value={recipeMethods}
                  required
                  onChange={(e) => setRecipeMethods(e.target.value)}
                ></textarea>
                <div className="custom-file">
                  <input
                    id="inputGroupFile01"
                    type="file"
                    accept="image/*"
                    className="custom-file-input"
                    onChange={(e) => setRecipeImg(e.target.files[0])}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    {recipeImg ? recipeImg.name : "Upload a photo"}
                  </label>
                </div>

                <button
                  className="primaryButton publishBtn w-100"
                  type="submit"
                >
                  {loading ? <Spinner animation="grow" size="sm" /> : "Publish"}
                </button>
              </form>
            </Col>
          </Row>
        </>
      ) : null}

      {submitCompleted && (
        <Row>
          <Col className="text-center marginTop">
            <h3>Your recipe has been submitted successfully!</h3>
            <input
              className="primaryButton mt-3 px-5 py-1"
              type="button"
              value="Add another recipe"
              onClick={() => setSubmitCompleted(false)}
            />
          </Col>
        </Row>
      )}
      <UserRecipesList />
    </Container>
  );
}
