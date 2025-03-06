"use client";

import Image from "next/image";
import styles from "../../styles/profile.module.css";
import { MdEdit, MdClose } from "react-icons/md";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile({ setModal, displayModal, customStyle }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    names: "",
    phone: "",
    email: "",
  });
  const { data: user, status } = useSession();
  const [error, setError] = useState({});
  const [toggleChanges, setToggleChanges] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 9) : value,
    }));
  };
  const hasChanged = () => {
    return (
      formData.names.trim() != user?.names.trim() ||
      formData.phone.trim() != user?.phone.trim() ||
      formData.email.trim() != user?.email.trim()
    );
  };
  useEffect(() => {
    setToggleChanges(hasChanged());
  }, [formData, user]);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errorMsg = {};
    if (!formData.phone || !formData.phone.trim()) {
      errorMsg.phone = "Phone is required";
    } else if (formData.phone.trim().length != 9) {
      errorMsg.phone = "Phone must be 9 digits";
    } else if (formData.phone.trim().slice(0, 1) != 6) {
      errorMsg.phone = "Phone number must begin with 6";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email || !formData.email.trim()) {
      errorMsg.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errorMsg.email = "Invalid email format";
    }
    if (!formData.names || !formData.names.trim()) {
      errorMsg.names = "Name is required";
    }
    if (Object.keys(errorMsg).length === 0) {
      toast.success("Profile has been updated successfully", { theme: "dark" });
      setModal(false);
    }
    setError(errorMsg);
  };
  useEffect(() => {
    console.log('user', user);
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        names: user?.names || prevData.names,
        phone: user?.phone || prevData.phone,
        email: user?.email || prevData.email,
      }));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const body = document.body;
      body.style.overflow = displayModal ? "hidden" : "";
      return () => {
        body.style.overflow = "";
      };
    }
  }, [displayModal]);
  useEffect(() => {
    setIsLoading(true);
    console.log('status: ', status)
  }, []);

  return (
    <>
      <div
        className={`${
          customStyle ? styles.pushedContainer : styles.container
        } rounded-xl bg-white shadow-xl`}
      >
        {status != 'loading' ? (<form
          className={`${styles.form} flex-col items-center justify-center`}
          onSubmit={handleOnSubmit}
        >
          <div className={`position-relative`}>
            <Image
              src={user?.profileImage || "/github.jpg"}
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

          {toggleChanges && (
            <div className="mt-3">
              <button
                type="submit"
                className="no-underline text-white bg-gray-600 w-full rounded-lg px-4 py-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
              >
                Validate changes
              </button>
            </div>
          )}
          <div className="mt-2">
            <button
              type="button"
              onClick={() => signOut()}
              className="no-underline text-white bg-gray-950 rounded-lg px-4 py-2 hover:bg-red-600 transition-all duration-300 ease-in-out w-full"
            >
              Logout
            </button>
          </div>
          <div></div>
        </form>) : <div> Loading... </div>}
      </div>
    </>
  );
}
