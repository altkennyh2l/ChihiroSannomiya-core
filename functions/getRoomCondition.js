import fetch from "node-fetch";
import "dotenv/config";

export default async function getRoomCondition() {
  const response = await fetch(process.env.SWITCHBOT_METER_URL, {
    method: "get",
    headers: { Authorization: process.env.SWITCHBOT_TOKEN },
  });
  const data = await response.json();
  const result = `現在部屋の温度は${data.body.temperature}度で、湿度は${data.body.humidity}%です。`;
  return result;
}
