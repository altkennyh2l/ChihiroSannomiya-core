const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const app = express();
const getRoomCondition = require("./functions/getRoomCondition");

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
  agent.add(getRoomCondition);
}
/**
 * now listing the server on port number 3000 :)
 * */
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is Running on port 3000");
});
