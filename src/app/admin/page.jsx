"use client";

import SideBar from "./sidebar";
import MainPage from "./admin";
import style from "./styles/page.module.css";
import "../JS/all";
import { useState } from "react";
const AdminPage = () => {
  const [closeSideBar, setCloseSideBar] = useState(false);
  return (
    <>
      <SideBar toggleSideBar={setCloseSideBar} closeSideBar={closeSideBar} />
      <div className={style.page}>
        <main className={closeSideBar ? style.mainClosed : style.mainOpen}>
          <MainPage />
        </main>
      </div>
    </>
  );
};

export default AdminPage;
