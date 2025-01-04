"use client";

import { useSession } from "next-auth/react";
import Profile from "../components/global/profile";

const StudentDashboard = () => {
  const { data: user } = useSession();
  console.log(user);
  return (
    <div>
      <Profile />
    </div>
  );
};

export default StudentDashboard;
