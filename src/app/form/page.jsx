import React from "react";
import Form from "./form";
import ConfirmPeriod from "./confirmation-modal";

export const metadata = {
  title: "Form",
  description: "Teacher's form",
};

const FormComponent = () => {
  return (
    <>
      <div style={styles.container}>
        <Form />
        <div style={styles.confirm}>
          <ConfirmPeriod />
        </div>
      </div>
    </>
  );
};

export default FormComponent;

// internal CSS, cause why not?
const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },
  confirm: {
    zIndex: "999",
    position: "fixed",
    width: "100%",
    height: "100vh",
    background: "linear-gradient(rgb(0,0,0,0.8), rgb(0,0,0,0.5))",
    display: "grid",
    placeItems: "center",
  },
};
