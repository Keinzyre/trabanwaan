export async function getTask(baseUrl, user_id, type) {
  const response = await fetch(
    baseUrl + "/api/task/" + user_id + "?type=" + type
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
  /*  console.log(data,"getfeedbackjs") */
  return data;
}

export async function createTask(
  clientID,
  workerID,
  firstName,
  lastName,
  workerData,
  frequency,
  valueDateTime,
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  description
) {
  console.log(workerData, "workerdata in lib Task");
  const response = await fetch("/api/task", {
    method: "POST",
    body: JSON.stringify({
      clientID,
      workerID,
      firstName,
      lastName,
      workerData: workerData,
      frequency,
      valueDateTime,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
  return data;
}

export async function updateStatus(task_id, status) {
  const response = await fetch("/api/task", {
    method: "PUT",
    body: JSON.stringify({
      task_id,
      status,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}
