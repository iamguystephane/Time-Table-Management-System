"use client";

import style from "../../styles/confirm-delete.module.css";
import updateTeacherAvailability from "../../../../lib/updateTeacherAvailability";
import { toast } from "react-toastify";
import Loading from "../../../loading/loading";
import { useState } from "react";

const ConfirmLecturerDelete = ({
  checkDeleteTeacher,
  recordToDelete
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const method = 'DELETE';
      const res = await updateTeacherAvailability(recordToDelete, method);
      if (res.error) {
        toast.error(data.error);
        return;
      }
      toast.success(res.message);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (err) {
      toast.error('Internal server error. Please try again later');
    } finally {
      setIsDeleting(false);
    }
    checkDeleteTeacher(false);
  };

  if (isDeleting) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading message="Deleting record" />
      </div>
    );
  }
  return (
    <div className={style.container}>
      <h3> Are you sure you want to remove {recordToDelete.names}?" </h3>
      <div className={style.btns}>
        <button
          type="button"
          className="btn btn-success"
          onClick={confirmDelete}
        >
          YES
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => checkDeleteTeacher(false)}
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default ConfirmLecturerDelete;
