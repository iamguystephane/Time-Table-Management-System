"use client";

import style from "./styles/confirm-delete.module.css";
import deleteData from "../../../../lib/deleteData";

const ConfirmLecturerDelete = ({
  checkDeleteTeacher,
  recordToDelete,
  setDeleteConfirmation,
}) => {
  const confirmDelete = async () => {
    try {
      await deleteData(recordToDelete);
      console.log(`Successfully deleted ${recordToDelete.names}`);
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
