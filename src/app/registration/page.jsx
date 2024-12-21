"use client";

import { combinedDepartments } from "../scripts/departments";
import { useState } from "react";
import ErrorMessages from "../scripts/error-messages";

const Registration = () => {
  const [formData, setFormData] = useState({
    names: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    age: "",
    status: "",
    department: "",
  });
  const [errors, setErrors] = useState({});
  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  let errMsg = {};
  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    ErrorMessages(formData, errMsg);
    if (Object.keys(errMsg).length === 0) {
      alert("submitted successfully");
      form.reset();
    }
    setErrors(errMsg);
  }
  return (
    <>
      <div
        className="flex items-center justify-center bg-gray-800"
        style={styles.container}
      >
        <form
          className="bg-white text-black p-2 rounded-xl overflow-auto my-5 shadow"
          style={styles.form}
          onSubmit={handleOnSubmit}
        >
          <h1 className="text-center"> Registration </h1>
          <p className="text-red-500"> All fields are required </p>
          <div className="w-full h-1 bg-red-500 my-3" />
          <p className="my-3"> Personal information </p>
          <div>
            <label>Full Names</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="names"
              value={formData.names}
              onChange={handleOnChange}
            />
          </div>
          {errors.names && <p className="text-red-800 my-1">{errors.names}</p>}
          <div className="flex items-center gap-4">
            <div className="mt-2 flex-col justify-center">
              <label>Phone Contact</label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="phone"
                value={formData.phone}
                onChange={handleOnChange}
              />
              {errors.phone && (
                <p className="text-red-800 my-1">{errors.phone}</p>
              )}
            </div>
            <div className="mt-2 flex-col justify-center">
              <label>Email</label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
              />
              {errors.email && (
                <p className="text-red-800 my-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="mt-2 flex-col justify-center gap-2">
            <label> Gender </label>
            <div className="flex items-center gap-5">
              <div className="flex items-center">
                <label> M </label> &nbsp; &nbsp; &nbsp;
                <input
                  type="radio"
                  name="gender"
                  onChange={handleOnChange}
                  value="M"
                  checked={formData.gender === "M"}
                />
              </div>
              <div className="flex items-center">
                <label> F </label> &nbsp; &nbsp; &nbsp;
                <input
                  type="radio"
                  value="F"
                  checked={formData.gender === "F"}
                  name="gender"
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>
          {errors.gender && (
            <p className="text-red-800 my-1">{errors.gender}</p>
          )}

          <div className="flex items-center gap-4">
            <div className="mt-2 flex-col justify-center">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control form-control-lg"
                name="dob"
                value={formData.dob}
                onChange={handleOnChange}
              />
              {errors.dob && <p className="text-red-800 my-1">{errors.dob}</p>}
            </div>

            <div className="mt-2 flex-col justify-center">
              <label>Age</label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="age"
                value={formData.age}
                onChange={handleOnChange}
              />
              {errors.age && <p className="text-red-800 my-1">{errors.age}</p>}
            </div>
          </div>
          <div className="w-full h-1 bg-red-500 my-3" />
          <p className="my-3"> School information </p>
          <div className="mt-2">
            <label>Status</label>
            <select
              className="form-control form-control-lg"
              name="status"
              onChange={handleOnChange}
            >
              <option> Lecturer </option>
              <option> Student </option>
            </select>
          </div>
          {errors.status && (
            <p className="text-red-800 my-1">{errors.status}</p>
          )}

          <div className="mt-2">
            <label>Department</label>
            <select
              className="form-control form-control-lg"
              name="department"
              value={formData.department}
              onChange={handleOnChange}
            >
              {combinedDepartments.map((department, index) => (
                <option key={index}>{department}</option>
              ))}
            </select>
          </div>
          {errors.department && (
            <p className="text-red-800 my-1">{errors.department}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-800 text-white rounded-md p-2 hover:bg-green-600 transition-all duration-800 ease-in-out my-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;

const styles = {
  container: {
    width: "100%",
  },
  form: {
    width: "30%",
  },
};
