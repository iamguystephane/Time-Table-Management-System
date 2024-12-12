"use client";

import style from "./styles/confirm-delete.module.css";
import deleteStudent from "../../../../lib/delete-student";

const DeleteConfirmation = ({
  checkDeleteTeacher,
  recordToDelete,
  setDeleteConfirmation,
}) => {
  const confirmDelete = async () => {
    try {
      await deleteStudent(recordToDelete);
      console.log(`Successfully deleted ${recordToDelete.Name}`);
      setDeleteConfirmation(true);
    } catch (err) {
      console.log(`Error deleting teacher ${err}`);
    }
    checkDeleteTeacher(false);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  return (
    <div className={style.container}>
      <h3> Are you sure you want to remove {recordToDelete.Name}?" </h3>
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
