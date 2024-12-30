"use client";

import style from "../../styles/confirm-delete.module.css";
import updateStudent from "../../../../lib/update-student";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../loading/loading";

const DeleteConfirmation = ({
  checkDeleteTeacher,
  recordToDelete,
  setDeleteConfirmation,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const method = 'DELETE';
      const res = await updateStudent(recordToDelete, method);
      if (res.error) {
        setIsDeleting(true);
        toast.error(error.message);
        return;
      }
      console.log(`Successfully deleted ${recordToDelete.names}`);
      toast.success(res.message);
      setDeleteConfirmation(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(`Error deleting teacher ${err}`);
      toast.error(
        `Error deleting ${recordToDelete.names} due to internal server error. Please try again later`
      );
    } finally {
      setIsDeleting(false);
    }
    checkDeleteTeacher(false);
  };
  if (isDeleting) {
    return (
      <div className="w-full h-full items-center justify-center">
        <Loading message="deleting student" />
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

export default DeleteConfirmation;
