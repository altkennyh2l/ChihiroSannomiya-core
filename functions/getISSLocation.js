import fetch from "node-fetch";

export default async function getISSLocation() {
  const response = await fetch("http://api.open-notify.org/iss-now.json");
  const data = await response.json();
  let result = [data.iss_position.longitude, data.iss_position.latitude];
  return result;
}
