"use client";
import { useState } from "react";
import { MdMan } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import style from "../../styles/sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import Profile from "../../../images/github.jpg";

const SideBar = ({ toggleSideBar, closeSideBar }) => {
  const handleHideSideBar = () => toggleSideBar(!closeSideBar);
  const [studentData, setStudentData] = useState([]);
  const [error, setErrMsg] = useState({});
  return (
    <>
      <div
        className={`${style.sidebar} ${closeSideBar ? style.collapsed : ""}`}
      >
        <MdMenu
          size={40}
          className={style.menuBtn}
          onClick={handleHideSideBar}
        />
        <Link href="/">
          <FaAngleLeft size={40} className={style.backBtn} />
        </Link>
        <ul className={style.ul}>
          <Link
            href="/admin/manage-teachers"
            className={closeSideBar ? style.noListMan : style.li}
          >
            <MdMan
              className={`${style.manBtn} ${closeSideBar ? style.center : ""}
              }`}
              size={40}
            />
            <span>Manage teachers </span>
          </Link>
        </ul>
        <div className={closeSideBar ? style.profileCollapse : style.profile}>
          <Image
            src={Profile}
            alt="profile image"
            className={`${style.image} ${
              closeSideBar ? style.collapsedImage : ""
            }`}
          />
          <span> Guy Stephane </span>
        </div>
      </div>
    </>
  );
};

export default SideBar;
