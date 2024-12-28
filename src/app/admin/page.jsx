"use client";

import SideBar from "./sidebar";
import MainPage from "./student";
import style from "./styles/page.module.css";
import "../JS/all";
import StudentForm from "./form-update-student";
import { useState } from "react";
import DeleteConfirmationMessage from "../../global states/delete-confirmation-message-student";
import UpdateConfirmationMessage from "../../global states/update-confirmation-message";
import DeleteConfirmation from "./manage-teachers/confirm-delete-student";
const AdminPage = () => {
  const [closeSideBar, setCloseSideBar] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [checkTeacherInfo, setCheckTeacherInfo] = useState(false);
  const [checkDeleteTeacher, setCheckDeleteTeacher] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState({});
  const [updateConfirmation, setUpdateConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <>
      <SideBar toggleSideBar={setCloseSideBar} closeSideBar={closeSideBar} />
      <div className={style.page}>
        {checkDeleteTeacher && (
          <div
            onClick={() => setCheckDeleteTeacher(false)}
            className={style.formContainer}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={style.deleteDiv}
            >
              <DeleteConfirmation
                setDeleteConfirmation={setDeleteConfirmation}
                checkDeleteTeacher={setCheckDeleteTeacher}
                recordToDelete={recordToDelete}
              />
            </div>
          </div>
        )}
        {checkTeacherInfo && (
          <div
            onClick={() => setCheckTeacherInfo(false)}
            className={style.formContainer}
          >
            <div onClick={(e) => e.stopPropagation()} className={style.formDiv}>
              <StudentForm
                updateConfirmation={setUpdateConfirmation}
                teacherInfo={teacherInfo}
                setCheckTeacherInfo={setCheckTeacherInfo}
              />
            </div>
          </div>
        )}
        <main className={closeSideBar ? style.mainClosed : style.mainOpen}>
          {updateConfirmation && <UpdateConfirmationMessage />}
          {deleteConfirmation && <DeleteConfirmationMessage />}
          <div>
            <MainPage
              setTeacherInfo={setTeacherInfo}
              checkTeacherClick={setCheckTeacherInfo}
              checkDeleteTeacher={setCheckDeleteTeacher}
              setRecordToDelete={setRecordToDelete}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminPage;
