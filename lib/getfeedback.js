export async function getFeedBack(baseUrl,page) {
  const response = await fetch(baseUrl + "/api/feedback?limit=5");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
  /*  console.log(data,"getfeedbackjs") */
  return data;
}
