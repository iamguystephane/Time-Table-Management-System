"use client";

import Image from "next/image";
import styles from "./profile.module.css";
import { MdEdit, MdClose } from "react-icons/md";
import { signOut } from "next-auth/react";

export default function Profile({ setModal }) {
  return (
    <>
      <div className={`${styles.container} rounded-xl bg-white shadow-xl`}>
        <form className={`${styles.form} flex-col items-center justify-center`}>
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
              value="Guy Stephane :)"
            />
          </div>
          <div className={`mt-3`}>
            <label> Contact </label>
            <input
              type="text"
              className="form-control form-control-lg"
              value="672280977"
            />
          </div>
          <div className={`mt-3`}>
            <label> Email </label>
            <input
              type="text"
              className="form-control form-control-lg"
              value="gstephane138@gmail.com"
            />
          </div>
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
