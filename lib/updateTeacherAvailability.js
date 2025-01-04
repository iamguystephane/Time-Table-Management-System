const updateTeacherAvailability = async (data, method) => {
  try {
    const response = await fetch("/api/availability-update-delete", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: await error.message };
    }
    const res = await response.json();
    return { message: res.message };
  } catch (err) {
    return { error: err };
  }
};

export default updateTeacherAvailability;
