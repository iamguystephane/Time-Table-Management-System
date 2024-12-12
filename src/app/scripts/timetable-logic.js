import getTeacherAvailability from "../../../lib/getTeacherAvailability";
const getAvailability = async () => {
  try {
    const result = await getTeacherAvailability();
    if (result.error) {
      console.log(result.error);
      return ["An error occured."];
    } else {
      return result;
    }
  } catch (err) {
    console.log(err);
    return ["error fetching data"];
  }
};
let arr = [];
const handleTableLogic = async () => {
  const data = await getAvailability();
  data.forEach((teacher) => {
    if (
      [
        "SWE",
        "BFI",
        "MKT",
        "PM",
        "MGT",
        "HRM",
        "HWM",
        "CNSM",
        "LTM",
        "ACY",
      ].includes(teacher.department) &&
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(
        teacher.day
      ) &&
      ["Level One", "Level Two", "Degree One"].includes(teacher.level) &&
      [
        "8:00 - 10:00",
        "10:15 - 12:15",
        "13:00 - 15:00",
        "16:00 - 17:30",
        "17:30 - 19:00",
        "19:00 - 20:30",
      ].includes(teacher.time)
    ) {
      arr.push({ ...teacher });
    }
  });
};

export { arr, handleTableLogic };
