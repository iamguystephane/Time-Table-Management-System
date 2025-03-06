"use client";

import { useSession } from "next-auth/react";
import Profile from "../components/global/profile";
import NavBar from "../components/global/nav";
import Link from "next/link";
import Image from "next/image";
import githubImage from "../../images/github.jpg";
import { useState } from "react";
import { usePathname } from 'next/navigation'

const StudentDashboard = () => {
  const pathname = usePathname();
  const { data: user } = useSession();
  const [displayProfile, setDisplayProfile] = useState(false);
  console.log(user);
  
  const styles = {
    active: {
      borderBottom: '2px solid black',
      marginTop: 2,
    }
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <nav className="w-full px-5 py-3 flex items-center justify-between bg-gray-500">
        <div className='flex items-center justify-center gap-10'>
          <Link href='/student' className='text-white no-underline' style={pathname === '/student' ? styles.active : {}}> Home </Link>
          <Link
            href="/timetables"
            className="text-white no-underline hover:!text-black rounded-lg px-4 py-2 transition-all duration-500 ease-in-out hover:bg-white"
          >
            Timetable
          </Link>
        </div>
        <button
          className="flex items-center justify-center gap-3 hover:bg-white text-white hover:!text-black rounded-lg px-4 py-2 transition-all duration-500 ease-in-out"
          onClick={() => setDisplayProfile((prev) => !prev)}
        >
          <p className="text-center w-[] h-[10px]"> {user?.names || "Guest"} </p>
          <Image
            src={githubImage}
            width={500}
            height={500}
            alt="profile-picture"
            className="rounded-full w-[35px] h-[35px]"
          />
        </button>
      </nav>
      {displayProfile && <Profile setModal={setDisplayProfile} />}
      <p className='w-full px-10 mt-10'> Display student's schedule here! </p>
    </div>
  );
};

export default StudentDashboard;
