"use client";

import { useState } from "react";
import style from "./login.module.css";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Unique key is required";
    }
    if (Object.keys(errors).length === 0) {
      alert("Logged in");
    }
    setErrorMsg(errors);
  };
  return (
    <>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleOnSubmit}>
          <h1 className={style.heading}> Log in </h1>
          <div className={`form-group ${style.email}`}>
            <label htmlFor="exampleInputEmail">Email</label>
            <input
              type="email"
              className={`form-control form-control-lg`}
              id="exampleInputEmail"
              name="email"
              onChange={handleOnChange}
            />
          </div>
          {errorMsg.email && <p style={{ color: "red" }}>{errorMsg.email}</p>}
          <div className={`form-group ${style.password}`}>
            <label htmlFor="exampleInputEmail">Unique key</label>
            <input
              type="password"
              className={`form-control form-control-lg`}
              id="exampleInputEmail"
              name="password"
              onChange={handleOnChange}
            />
            {errorMsg.password && (
              <p style={{ color: "red" }}>{errorMsg.password}</p>
            )}
          </div>
          <button
            type="submit"
            className={`btn btn-success ${style.submitBtn}`}
          >
            {" "}
            Log in{" "}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
