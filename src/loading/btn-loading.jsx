import style from "../app/styles/loading.module.css";

const BtnLoading = ({ statement }) => {
  return (
    <div className={style.btnLoadingContainer}>
      <div className={style.btnLoading}> </div>
      {statement}
    </div>
  );
};

export default BtnLoading;
