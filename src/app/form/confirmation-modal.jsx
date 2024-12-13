"use client";

import { useState } from "react";

export default function ConfirmPeriod() {
  const [noBtnHover, setNoBtnHover] = useState(false); //state for Hover effects
  const [yesBtnHover, setYesBtnHover] = useState(false);
  // additional styles
  const styles = {
    container: {
      width: "25%",
      height: "45vh",
    },
    noBtn: {
      background: noBtnHover && "#881337",
      transition: "all 360ms ease-in-out",
    },
    yesBtn: {
      background: yesBtnHover && "#14532d",
      transition: "all 360ms ease-in-out",
    },
  };
  return (
    <>
      <div
        className="flex-col bg-gray-500 text-white rounded flex items-center justify-center p-10"
        style={styles.container}
      >
        <h4 className="my-5">
          Oops, this period has already been selected. Do you want to be a
          backup teacher for the course... at this period?
        </h4>
        <div className="flex gap-10 items-center justify-center w-full">
          <button
            type="button"
            className="rounded p-3 w-2/5 bg-green-500 text-white"
            style={styles.yesBtn}
            onMouseEnter={() => setYesBtnHover(true)}
            onMouseLeave={() => setYesBtnHover(false)}
          >
            Yes
          </button>
          <button
            type="button"
            className="rounded p-3 w-2/5 bg-red-500 text-white hover:bg-light-red-500"
            style={styles.noBtn}
            onMouseEnter={() => setNoBtnHover(true)}
            onMouseLeave={() => setNoBtnHover(false)}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
}
