"use client";

import { MdPerson } from "react-icons/md";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { FaMale } from "react-icons/fa";
import style from "../../styles/sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import Profile from "../global/profile";
import picture from "../../../images/github.jpg";
import { useSession } from "next-auth/react";

const SideBar = ({ toggleSideBar, closeSideBar }) => {
  const { data: user } = useSession();
  const handleHideSideBar = () => toggleSideBar(!closeSideBar);
  const [displayModal, setDisplayModal] = useState(false);
  return (
    <>
      <div>
        <div
          className={`${style.sidebar} ${closeSideBar ? style.collapsed : ""}`}
        >
          <div className={style.goBack}>
            <MdMenu
              size={40}
              className={style.menuBtn}
              onClick={handleHideSideBar}
            />
            <Link href="/admin">
              <FaAngleLeft size={40} className={style.backBtn} />
            </Link>
          </div>
          <ul className={style.ul}>
            <Link
              href="/admin/manage-lecturer-availabilities"
              className={closeSideBar ? style.noListMan : style.li}
            >
              <FaMale
                className={`${style.manBtn} ${closeSideBar ? style.center : ""}
                }`}
                size={40}
              />
              <span>Manage teachers </span>
            </Link>
            <Link
              href="/admin/manage-students"
              className={`${closeSideBar ? style.noListMan : style.li}`}
              style={{ marginTop: "100px" }}
            >
              <MdPerson
                className={`${style.manBtn} ${closeSideBar ? style.center : ""}
                }`}
                size={40}
              />
              <span>Manage Students </span>
            </Link>
          </ul>
          <div
            className={closeSideBar ? style.profileCollapse : style.profile}
            onClick={() => setDisplayModal((mod) => !mod)}
          >
            <Image
              src={picture}
              width={30}
              height={30}
              alt="profile image"
              className={`${style.image} ${
                closeSideBar ? style.collapsedImage : ""
              }`}
            />
            <span> {user?.names || 'Guest'} </span>
          </div>
        </div>
        <div
          className={`transition duration-500 ease-in-out ${
            displayModal ? style.show : style.hide
          }`}
        >
          <Profile
            setModal={setDisplayModal}
            displayModal={displayModal}
            customStyle={true}
          />
        </div>
      </div>
    </>
  );
};

export default SideBar;
