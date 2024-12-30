"use client";

import React, { useState } from "react";
import Form from "../../components/lecturer/availability-form";
import ConfirmPeriod from "../../components/global/confirmation-modal";

// export const metadata = {
//   title: "Form",
//   description: "Teacher's form",
// };

const FormComponent = () => {
  const [displayModal, setDisplayModal] = useState(null);
  const [dataFromForm, setDataFromForm] = useState({
    updateFunction: null,
    updatedFormData: {},
  });
  return (
    <>
      <div style={styles.container}>
        <Form setDisplayModal={setDisplayModal} data={setDataFromForm} />
        {displayModal && (
          <div style={styles.confirm}>
            <ConfirmPeriod
              dataFromForm={dataFromForm}
              setDisplayModal={setDisplayModal}
            />
          </div>
        )}
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
