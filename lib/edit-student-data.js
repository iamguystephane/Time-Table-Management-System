import updateStudentAvailability from "./update-student";

const EditStudent = async (data) => {
  try {
    let method = data && data.id && "PUT";
    const res = await updateStudentAvailability(data, method);
    if (!res.ok) {
      const response = await res.json();
      throw new Error(response.error);
    }
    const resData = await res.json();
    return resData.message;
  } catch (err) {
    console.log("error submitting the data " + err);
  }
};

export default EditStudent;
