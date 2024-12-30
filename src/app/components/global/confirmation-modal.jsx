"use client";

import { useState, useContext, useEffect } from "react";
import { formContext } from "../../../global states/form-context"

export default function ConfirmPeriod({ dataFromForm, setDisplayModal }) {
  //importing my form state setter and matched lecturer from context
  const { setFormData, match } = useContext(formContext);
  //state for Hover effects
  const [noBtnHover, setNoBtnHover] = useState(false);
  const [yesBtnHover, setYesBtnHover] = useState(false);


  // additional styles
  const styles = {
    container: {
      width: "35%",
      height: "50vh",
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

  //destructuring the data coming from the form so that I can use it here.
  const { updateFunction, updatedFormData } = dataFromForm;

  useEffect(() => {
    console.log(match);
  }, [match]);
  // functions for handling yes and no click.
  const yesClick = () => {
    if (!match.backupTeacherNames) {
      updateFunction();
      alert("You have been assigned as a backup teacher");
      setTimeout(() => {
        setDisplayModal(false);
      }, 2000);
      setFormData({
        names: "",
        email: "",
        phone: "",
        semester: "",
        course: "",
        level: "",
        department: "",
        day: "",
        time: "",
      });
    } else {
      alert("A backup teacher has already been selected for this course!");
      setTimeout(() => {
        setDisplayModal(false);
      }, 2000);
    }
  };
  const noClick = () => {
    setDisplayModal(false);
    setFormData({
      names: "",
      email: "",
      phone: "",
      semester: "",
      course: "",
      level: "",
      department: "",
      day: "",
      time: "",
    });
  };
  return (
    <>
      <div
        className="flex-col bg-gray-500 text-white rounded flex items-center justify-center p-10"
        style={styles.container}
      >
        <h4 className="my-5">
          Oops, this period and course has already been selected by another
          lecturer. Would you like to be a backup teacher for{" "}
          {updatedFormData?.course}? if not, you can return back and try to
          select another period, but not the same course.
        </h4>
        <div className="flex gap-10 items-center justify-center w-full">
          <button
            type="button"
            className="rounded p-3 w-2/5 bg-green-500 text-white"
            style={styles.yesBtn}
            onMouseEnter={() => setYesBtnHover(true)}
            onMouseLeave={() => setYesBtnHover(false)}
            onClick={yesClick}
          >
            Yes
          </button>
          <button
            type="button"
            className="rounded p-3 w-2/5 bg-red-500 text-white hover:bg-light-red-500"
            style={styles.noBtn}
            onMouseEnter={() => setNoBtnHover(true)}
            onMouseLeave={() => setNoBtnHover(false)}
            onClick={noClick}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
}
