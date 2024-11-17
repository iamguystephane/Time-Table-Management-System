import { FaCheck } from "react-icons/fa";
import styles from "./styles/confirmation-message.module.css";
import { useState, useEffect } from "react";
const UpdateConfirmationMessage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const displayTimer = setTimeout(() => {
      setHide(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(displayTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;
  return (
    <div className={`${styles.container} ${hide ? styles.hide : ""}`}>
      <FaCheck size={20} />
      <div className={styles.text}>
        <h1> SUCCESS </h1>
        <p> Successfully updated </p>
      </div>
    </div>
  );
};

export default UpdateConfirmationMessage;
