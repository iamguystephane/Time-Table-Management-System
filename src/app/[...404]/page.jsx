"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  return (
    <>
      <div style={styles.container}>
        <div style={styles.subContainer}>
          <h1> 404 Error </h1>
          <h1> Page not found</h1>
        </div>
        <button onClick={() => router.push("/")} style={styles.button}>
          Return to Homepage
        </button>
      </div>
    </>
  );
}

//internal CSS
const styles = {
  subContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    gap: "50px",
  },
  button: {
    border: "none",
    width: "500px",
    borderRadius: "10px",
    padding: "1em",
  },
};
