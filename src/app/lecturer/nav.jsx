"use client";

import Link from "next/link";
import styles from "./nav.module.css";
import Image from "next/image";

export default function LecturerNav() {
  return (
    <>
      <nav
        className={`bg-gray-500 flex justify-between px-5 items-center ${styles.navBar}`}
      >
        <Link href="/lecturer" className={styles.availability}>
          {" "}
          Home{" "}
        </Link>
        <Link href="/lecturer/availability" className={styles.availability}>
          Availability
        </Link>
        <div className="flex items-center justify-center gap-10">
          <Link href="" className={styles.logout}>
            Logout
          </Link>
          <div className="flex cursor-pointer items-center justify-center gap-2 p-1 hover:bg-lightgray transition-all duration-700 ease-in-out rounded">
            <Image
              src="/profile.jpeg"
              width={40}
              height={40}
              alt="profile picture"
              className={styles.image}
            />
            <h6 className="text-black"> Guy Stephane</h6>
          </div>
        </div>
      </nav>
    </>
  );
}
