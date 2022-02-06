import fetch from "node-fetch";

export default async function getISSLocation() {
  const response = await fetch("http://api.open-notify.org/astros.json");
  const data = await response.json();
  let result = [data.number];
  return result;
}
