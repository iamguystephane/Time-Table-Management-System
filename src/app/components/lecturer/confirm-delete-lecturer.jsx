"use client";

import style from "../../styles/confirm-delete.module.css";
import deleteData from "../../../../lib/deleteData";
import { toast } from "react-toastify";
import Loading from "../../../loading/loading";
import { useState } from "react";

const ConfirmLecturerDelete = ({
  checkDeleteTeacher,
  recordToDelete,
  setDeleteConfirmation,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteData(recordToDelete);
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error);
        return;
      }
      console.log(`Successfully deleted ${recordToDelete.names}`);
      toast.success("Successfully deleted record");
      setDeleteConfirmation(true);
    } catch (err) {
      toast.error('Internal server error. Please try again later');
    } finally {
      setIsDeleting(false);
    }
    checkDeleteTeacher(false);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
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
