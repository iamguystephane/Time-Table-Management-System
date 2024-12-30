import style from "../app/styles/loading.module.css";
const Loading = ({ message }) => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.loading}> </div>
      <p> {message} </p>
    </div>
  );
};

export default Loading;
