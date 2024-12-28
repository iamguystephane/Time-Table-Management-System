'use client'

import LecturerNav from "./nav";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

export default function LecturerPage() {
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      console.log("Session:", session);
    };

    checkSession();
  }, []);
  return (
    <>
      <div className='position-relative'>
        <LecturerNav />
        <main className="grid place-items-center w-96 h-96">
          <h3> Viewing your schedule </h3>
            Make the lecturer see all their courses taken, and all the classes they took and make it downloadable
        </main>
      </div>
    </>
  );
}