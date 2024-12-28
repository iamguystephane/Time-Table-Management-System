"use client";

import { combinedDepartments } from "../scripts/departments";
import { useState, useEffect } from "react";
import { errorMessages, passwordStrength } from "../scripts/auth";
import Loading from "@/loading/loading";
import { FaEye } from "react-icons/fa";


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
    password: "",
    confirmPassword: "",
  });
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passStrength, setPassStrength] = useState("");

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const getStrength = () => {
      const strength = passwordStrength(formData.password);
      setPassStrength(strength);
    };
    if (formData.password) getStrength();
  }, [formData.password]);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 9) : value,
    }));
  }

  let errMsg = {};
  async function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    errorMessages(formData, errMsg);
    try {
      const res = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { user } = await res.json();
      if (user) {
        errMsg.userExists = "Email address already exists";
        setErrors((prevErrors) => ({
          ...prevErrors,
          userExists: errMsg.userExists,
        }));
        return;
      }
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(errMsg).length === 0) {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("submitted successfully");
          form.reset();
          setAge("");
          setFormData((prevData) => ({
            ...prevData,
            age: "",
          }));
        } else console.log("user registration failed");
      } catch (error) {
        console.log("Server error. Couldn't register user", error);
      }
    }

    setErrors(errMsg);
  }
  const [age, setAge] = useState("Select Date Of Birth first");
  const calculateAge = (date) => {
    const currentDate = new Date();
    const birthDate = new Date(date);
    let yourAge = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      yourAge += 1;
    }
    setFormData((prevData) => ({
      ...prevData,
      age: yourAge,
    }));
    setAge(yourAge);
  };
  useEffect(() => {
    calculateAge(formData.dob);
  }, [formData.dob]);

  if (!isLoading)
    return (
      <div
        style={{ width: "100%", height: "100vh" }}
        className="flex items-center justify-center"
      >
        <Loading />
      </div>
    );
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
                value={isNaN(age) ? "Please select date of birth" : age}
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
              <option> Select Status </option>
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
          <div className="position-relative">
            <label>Password</label>
            <input
              type={displayPassword ? "text" : "password"}
              className="form-control form-control-lg"
              name="password"
              onChange={handleOnChange}
            />
            <FaEye
              size={20}
              className={`position-absolute top-9 right-5 ${
                displayPassword ? `text-gray-800` : `text-gray-300`
              }`}
              onClick={() => setDisplayPassword((prev) => !prev)}
            />
          </div>
          {passStrength && (
            <div className="my-2">
              <p>
                Strength:{" "}
                <span
                  className={`${
                    ["Poor", "Very weak", "Weak"].includes(passStrength)
                      ? `text-red-500`
                      : `text-green-500`
                  }`}
                >
                  {passStrength}
                </span>
              </p>
            </div>
          )}
          {["Poor", "Very weak", "Weak"].includes(passStrength) && (
            <div className="my-2">
              <p>
                tips:{" "}
                <span className="text-red-500">
                  A good password should contain both lower and uppercase
                  letters, a number, and a special symbol, and should be at
                  least 8 characters long.
                </span>
              </p>
            </div>
          )}
          {errors.password && (
            <p className="text-red-800 my-1">{errors.password}</p>
          )}
          <div className="position-relative">
            <label>Confirm Password</label>
            <input
              type={displayConfirmPassword ? "text" : "password"}
              className="form-control form-control-lg"
              name="confirmPassword"
              onChange={handleOnChange}
            />
            <FaEye
              size={20}
              className={`position-absolute top-9 right-5 ${
                displayConfirmPassword ? `text-gray-800` : `text-gray-300`
              }`}
              onClick={() => setDisplayConfirmPassword((prev) => !prev)}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-800 my-1">{errors.confirmPassword}</p>
          )}
          {errors.passwordError && (
            <p className="text-red-800 my-1">{errors.passwordError}</p>
          )}
          {errors.userExists && (
            <p className="text-red-800 my-1">{errors.userExists}</p>
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
