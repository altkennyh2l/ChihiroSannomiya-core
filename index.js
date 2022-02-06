const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const app = express();

const request = require("request");
const dotenv = require("dotenv").config();
const switchbotOptions = {
  url: process.env.SWITCHBOT_METER_URL,
  method: "get",
  headers: {
    Authorization: process.env.SWITCHBOT_TOKEN,
  },
};

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server Is Working......");
});
/**
 * on this route dialogflow send the webhook request
 * For the dialogflow we need POST Route.
 * */
app.post("/webhook", (req, res) => {
  // get agent from request
  let agent = new WebhookClient({ request: req, response: res });
  // create intentMap for handle intent
  let intentMap = new Map();
  // add intent map 2nd parameter pass function
  intentMap.set("webhook_roomCondition", respondRoomCondition);
  // now agent is handle request and pass intent map
  agent.handleRequest(intentMap);
});
function respondRoomCondition(agent) {
  let result = [];
  let resp = "";
  request(switchbotOptions, function (error, response, body) {
    let res = JSON.parse(body);
    if (res.message === "success") {
      result = [res.body.temperature, res.body.humidity];
      agent.add(`現在部屋の温度は${result[0]}度で、湿度は${result[1]}%です。`);
    } else {
      agent.add(
        "ごめん！APIからエラーが来ました。暫くたってからやり直してみてください。。。"
      );
    }
  });
}
/**
 * now listing the server on port number 3000 :)
 * */
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is Running on port 3000");
});
