"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import style from "./login.module.css";
import { useRouter } from "next/navigation";
import BtnLoading from "@/loading/btn-loading";
import { FaEye } from "react-icons/fa";
import Loading from "@/loading/loading";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [homePageLoading, setHomePageLoading] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState({});

  const styles = {
    button: {
      cursor: isLoading ? 'not-allowed' : 'pointer'
    }
  }
  useEffect(() => {
    setHomePageLoading(true);
  }, []);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (Object.keys(errors).length === 0) {
      try {
        setIsLoading(true);
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        console.log(res);
        if (!res.ok) {
          setErrorMsg({ loginError: res.error.slice(6) });
          return;
        }
        setLoginSuccessful(true);
        const userRes = await fetch("/api/auth/session");
        console.log(userRes);
        if (!userRes) {
          console.log("Failed to get user information");
          return;
        }
        const user = await userRes.json();
        setTimeout(() => {
          if (user.status === "Lecturer") {
            router.push("/lecturer");
          } else if (user.status === "Student") {
            router.push("/student");
          } else {
            router.push("/lecturer");
          }
        }, 1500);
      } catch (error) {
        console.log("error ", error);
        setErrorMsg({ loginError: "Something went wrong. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
    setErrorMsg(errors);
  };
  if (!homePageLoading) {
    return (
      <div
        className="items-center justify-center flex"
        style={{ width: "100%", height: "100vh" }}
      >
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleOnSubmit}>
          <h1 className={style.heading}> Log in </h1>
          {loginSuccessful && (
            <div className="w-full h-15 p-2 bg-green-500 text-white text-2xl text-center">
              Login successful. Redirecting...
            </div>
          )}
          <div className={`form-group ${style.email}`}>
            <label htmlFor="exampleInputEmail">Email</label>
            <input
              type="email"
              className={`form-control form-control-lg`}
              id="emailInput"
              name="email"
              onChange={handleOnChange}
            />
          </div>
          {errorMsg.email && <p style={{ color: "red" }}>{errorMsg.email}</p>}
          <div className={`form-group position-relative ${style.password}`}>
            <label htmlFor="exampleInputEmail">Password</label>
            <input
              type={displayPassword ? "text" : "password"}
              className={`form-control form-control-lg`}
              id="passwordInput"
              name="password"
              onChange={handleOnChange}
            />
            {errorMsg.password && (
              <p style={{ color: "red" }}>{errorMsg.password}</p>
            )}
            <FaEye
              size={20}
              className={`${
                !displayPassword ? `text-gray-300` : `text-gray-800`
              } position-absolute right-8 top-7 cursor-pointer w-10 h-10 p-2 hover:bg-gray-500 hover:rounded-3xl transition-all duration-800 ease-in-out`}
              onClick={() => setDisplayPassword((prev) => !prev)}
            />
          </div>
          {errorMsg.loginError && (
            <p style={{ color: "red" }} className="mt-2">
              {errorMsg.loginError}
            </p>
          )}
          <button
            type="submit"
            className={`btn btn-success shadow-3xl ${style.submitBtn}`}
            style={styles.button}
          >
            {isLoading ? <BtnLoading /> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
