import React, { useEffect, useState, createContext } from "react";
import { db } from "../firebase";

export const RecipesContext = createContext();

export const RecipesProvider = (prpos) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("recipes").onSnapshot((snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => ({
          recipeName: doc.data().recipeName,
          recipeIngredients: doc.data().recipeIngredients,
          recipeMethods: doc.data().recipeMethods,
          recipeId: doc.data().recipeId,
          recipeImgName: doc.data().recipeImgName,
          recipeImageURL: doc.data().recipeImageURL,
          userId: doc.data().userId,
          id: doc.id,
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <RecipesContext.Provider value={{ recipes }}>
      {prpos.children}
    </RecipesContext.Provider>
  );
};
