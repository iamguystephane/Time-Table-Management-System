const getStudentData = async () => {
  try {
    const response = await fetch("/api/fetch-students");
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    return {
      error:
        error.message,
    };
  }
};

export default getStudentData;
