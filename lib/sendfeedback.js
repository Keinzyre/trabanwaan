export async function sendFeedBack(
  workerID,
  author_id,
  firstName,
  lastName,
  feedback,
  rating,
  date
) {
  console.log(
    workerID,
    "workerid",
    author_id,
    "author_id",
    firstName,
    "firstName",
    lastName,
    "lastName",
    feedback,
    "feedback",
    rating,
    "rating",
    date,
    "date",
    "data in sendfeedback lib"
  );
  const response = await fetch("/api/feedback", {
    method: "PUT",
    body: JSON.stringify({
      workerID,
      author_id,
      firstName,
      lastName,
      feedback,
      rating,
      date,
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
