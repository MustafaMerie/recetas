import React, { useEffect, useState, createContext } from "react";
import { auth, db } from "../firebase";

export const AuthContext = createContext();
export const AuthProvider = (prpos) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState({
    isAuthenticated: false,
    initializing: true,
  });

  const [modalShow, setModalShow] = useState(false);
  const [modalUpShow, setModalUpShow] = useState(false);

  useEffect(() => {
    const currentUserStore = JSON.parse(localStorage.getItem("user"));
    if (currentUserStore) setCurrentUser(currentUserStore);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const signInHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setModalShow(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        // ...
      });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (res) {
        res.user
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            db.collection("users").doc(res.user.uid).set({
              displayName: name,
              userEmail: res.user.email,
              userId: res.user.uid,
            });
          });

        setModalUpShow(false);
        alert("You have Registered Successfully");
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        // ...
      });
  };

  const signOutHandler = () => {
    auth
      .signOut()
      .then(() => { })
      .catch((error) => {
        alert("error", error);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          isAuthenticated: true,
          initializing: false,
          user: user,
        });
      } else {
        setCurrentUser({
          isAuthenticated: false,
          initializing: false,
        });
      }
    });
  }, [setCurrentUser]);

  if (currentUser.initializing) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        modalShow,
        setModalShow,
        modalUpShow,
        setModalUpShow,
        signUpHandler,
        signInHandler,
        signOutHandler,
      }}
    >
      {prpos.children}
    </AuthContext.Provider>
  );
};
