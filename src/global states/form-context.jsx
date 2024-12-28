"use client";

import React, { createContext, useState } from "react";

const formContext = createContext();

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
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
