import React, { useEffect, useState } from "react";
import { AuthContex } from "./AuthContex";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  const provider = new GoogleAuthProvider();

  const gLogin = () => {
    setloading(true);
    return signInWithPopup(auth, provider);
  };
  const RegisterUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const Signedin = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, (CurrentsUser) => {
      setuser(CurrentsUser);
      setloading(false);
    });
    return () => {
      Unsubscribe();
    };
  }, []);
  const logOut = () => {
    return signOut(auth);
  };
  const userInfo = {
    RegisterUser,
    Signedin,
    user,
    loading,
    logOut,
    gLogin,
  };
  return <AuthContex.Provider value={userInfo}>{children}</AuthContex.Provider>;
};

export default AuthProvider;
