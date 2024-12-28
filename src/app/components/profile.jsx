"use client";

import Image from "next/image";
import styles from "./profile.module.css";
import { MdEdit, MdClose } from "react-icons/md";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { errorMessages } from "../scripts/auth";

export default function Profile({ setModal }) {
  const [formData, setFormData] = useState({
    names: "",
    phone: "",
    email: "",
  });
  const { data: user } = useSession();
  const [error, setError] = useState({});
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 9) : value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errorMsg = {};
    errorMessages(formData, errorMsg);
    if (Object.keys(errorMsg).length === 0) {
      alert("submitted");
    }
    setError(errorMsg);
  };
  useEffect(() => {
    console.log(user);
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        names: user.names || prevData.names,
        phone: user.phone || prevData.phone,
        email: user.email || prevData.email,
      }));
    }
  }, []);
  return (
    <>
      <div className={`${styles.container} rounded-xl bg-white shadow-xl`}>
        <form
          className={`${styles.form} flex-col items-center justify-center`}
          onSubmit={handleOnSubmit}
        >
          <div className={`position-relative`}>
            <Image
              src="/profile.jpeg"
              width={200}
              height={200}
              alt="profile-picture"
              className={`${styles.image}`}
            />
            <label htmlFor="file-input">
              <MdEdit
                size={20}
                className={`position-absolute right-40 top-52 bg-white rounded-3xl p-2 text-black text-base w-10 h-10 cursor-pointer ${styles.edit}`}
              />
            </label>
            <input type="file" id="file-input" style={{ display: "none" }} />
            <MdClose
              size={20}
              className="text-white p-2 position-absolute right-0 top-0 bg-black rounded-3xl w-10 h-10 cursor-pointer"
              onClick={() => setModal(false)}
            />
          </div>
          <div className={`mt-3`}>
            <label> Name </label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={formData.names}
              name="names"
              onChange={handleOnChange}
            />
          </div>
          {error.names && <p className="text-red-600 mt-2">{error.names}</p>}
          <div className={`mt-3`}>
            <label> Phone </label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={formData.phone}
              name="phone"
              onChange={handleOnChange}
            />
          </div>
          {error.phone && <p className="text-red-600 mt-2">{error.phone}</p>}

          <div className={`mt-3`}>
            <label> Email </label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={formData.email}
              name="email"
              onChange={handleOnChange}
            />
          </div>
          {error.email && <p className="text-red-600 mt-2">{error.email}</p>}

          <div className="mt-3">
            <button
              type="submit"
              className="no-underline text-white bg-green-800 w-full rounded-lg px-4 py-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
            >
              Validate changes
            </button>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => signOut()}
              className="no-underline text-white bg-red-800 rounded-lg px-4 py-2 hover:bg-red-600 transition-all duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
