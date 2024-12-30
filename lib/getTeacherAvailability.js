const getTeacherAvailability = async () => {
  try {
    const response = await fetch("/api/fetch-availability");
    if (!response.ok) {
      const error = await response.json();
      throw Error(error.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export default getTeacherAvailability;
