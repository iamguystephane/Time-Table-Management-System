"use client";

import SideBar from "../../components/lecturer/sidebar";
import { useState, useEffect } from "react";
import style from "../../styles/page.module.css";
import Teachers from "../../components/lecturer/teachers";
import Form from "../../components/lecturer/form-update-lecturer";
import ConfirmLecturerDelete from "../../components/lecturer/confirm-delete-lecturer";
import { toast } from "react-toastify";
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
            {updateConfirmation &&
              toast.success("Lecturer info updated successfully")}
            {deleteConfirmation &&
              toast.success("Lecturer info deleted successfully")}

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
