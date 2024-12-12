"use client";

import SideBar from "./sidebar";
import { useState, useEffect } from "react";
import style from "../styles/page.module.css";
import Teachers from "./teachers";
import Form from "../form-update-lecturer";
import ConfirmLecturerDelete from "./confirm-delete-lecturer";
import DeleteConfirmationMessage from "@/global states/delete-confirmation-message-student";
import UpdateConfirmationMessage from "@/global states/update-confirmation-message";
const ManageTeachers = () => {
  const [closeSideBar, setCloseSideBar] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [checkTeacherInfo, setCheckTeacherInfo] = useState(false);
  const [checkDeleteTeacher, setCheckDeleteTeacher] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState({});
  const [updateConfirmation, setUpdateConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleteConfirmation(false);
      setUpdateConfirmation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {checkTeacherInfo && (
        <div
          className={style.formContainer}
          onClick={() => setCheckTeacherInfo(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className={style.formDiv}>
            <Form
              teacherInfo={teacherInfo}
              setCheckTeacherInfo={setCheckTeacherInfo}
              updateConfirmation={setUpdateConfirmation}
            />
          </div>
        </div>
      )}
      {checkDeleteTeacher && (
        <div
          className={style.formContainer}
          onClick={() => setCheckDeleteTeacher(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className={style.deleteDiv}>
            <ConfirmLecturerDelete
              checkDeleteTeacher={setCheckDeleteTeacher}
              dataToDelete={teacherInfo}
              recordToDelete={recordToDelete}
              setDeleteConfirmation={setDeleteConfirmation}
            />
          </div>
        </div>
      )}
      <>
        <SideBar toggleSideBar={setCloseSideBar} closeSideBar={closeSideBar} />
        <div className={style.page}>
          <main className={closeSideBar ? style.mainClosed : style.mainOpen}>
            {updateConfirmation && <UpdateConfirmationMessage />}
            {deleteConfirmation && <DeleteConfirmationMessage />}

            <Teachers
              setTeacherInfo={setTeacherInfo}
              checkTeacherClick={setCheckTeacherInfo}
              checkDeleteTeacher={setCheckDeleteTeacher}
              setRecordToDelete={setRecordToDelete}
            />
          </main>
        </div>
      </>
    </>
  );
};

export default ManageTeachers;
