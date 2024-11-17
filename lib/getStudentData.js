const getStudentData = async () => {
  try {
    const response = await fetch("http://localhost:5000/student");
    if (!response.ok) throw Error("Error getting data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {error: error.message}
  }
};

export default getStudentData;
