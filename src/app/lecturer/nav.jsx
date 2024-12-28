"use client";

import Link from "next/link";
import styles from "./nav.module.css";
import Image from "next/image";
import Profile from "../components/profile";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LecturerNav() {
  const { data: user } = useSession();
  const [profileModal, setProfileModal] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <nav
        className={`bg-gray-500 flex justify-between px-5 items-center w-full ${styles.navBar}`}
      >
        <div className="flex items-center justify-center">
          <Link
            href="/lecturer"
            className={`${styles.availability} ${
              pathname === "/lecturer" && styles.active
            }`}
          >
            Home
          </Link>
          <Link
            href="/lecturer/availability"
            className={`${styles.availability} ${
              pathname === "/lecturer/availability" && styles.active
            }`}
          >
            Availability
          </Link>
        </div>
        <div className="flex items-center justify-center gap-10">
          <div
            className="flex cursor-pointer items-center justify-center gap-2 p-2 hover:bg-lightgray transition-all duration-700 ease-in-out rounded"
            onClick={() => setProfileModal(!profileModal)}
          >
            <Image
              src="/profile.jpeg"
              width={40}
              height={40}
              alt="profile picture"
              className={styles.image}
            />
            <h6 className="text-black"> {user?.names || "Guest"} </h6>
          </div>
        </div>
      </nav>
      {profileModal && (
        <div style={style.modalDiv} onClick={() => setProfileModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Profile setModal={setProfileModal} />
          </div>
        </div>
      )}
    </>
  );
}

const style = {
  modalDiv: {
    width: "100%",
    height: "100vh",
    position: "fixed",
    background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6))",
    zIndex: "9999",
    top: "0",
  },
};
