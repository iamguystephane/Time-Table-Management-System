"use client";

import React, { createContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const formContext = createContext();

const FormProvider = ({ children }) => {
  function generateRandomID() {
    return uuidv4();
  }
  const [formData, setFormData] = useState({
    id: generateRandomID(),
    names: "",
    email: "",
    phone: "",
    semester: "",
    course: "",
    level: "",
    department: "",
    day: "",
    time: "",
  });
  const [fetchedLogin, setFetchedLogin] = useState({});
  const [match, setMatch] = useState({});
  return (
    <formContext.Provider
      value={{
        formData,
        setFormData,
        setMatch,
        match,
        fetchedLogin,
        setFetchedLogin,
      }}
    >
      {children}
    </formContext.Provider>
  );
};

export { formContext, FormProvider };
