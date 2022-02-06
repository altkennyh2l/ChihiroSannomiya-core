import express, { json } from "express";
import { WebhookClient } from "dialogflow-fulfillment";
import getRoomCondition from "./functions/getRoomCondition.js";
import getISSLocation from "./functions/getISSLocation.js";
import getAstrosCountNow from "./functions/getAstrosCountNow.js";
import { wakeDyno, wakeDynos } from "heroku-keep-awake";

const app = express();

app.use(json());
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
  intentMap.set("webhook_ISSLocation", respondISSLocation);
  intentMap.set("webhook_astrosCountNow", respondAstrosCountNow);
  // now agent is handle request and pass intent map
  agent.handleRequest(intentMap);
});

async function respondRoomCondition(agent) {
  let roomCondition = await getRoomCondition();
  agent.add(roomCondition);
}

async function respondISSLocation(agent) {
  let ISSLocation = await getISSLocation();
  agent.add(
    `国際宇宙ステーション（ISS）はただいま(${ISSLocation[0]}, ${ISSLocation[1]})に居ます。かなり早いスピードで回ってるよ！`
  );
}

async function respondAstrosCountNow(agent) {
  let astrosCountNow = await getAstrosCountNow();
  agent.add(
    `黒く広い宇宙の中に、今${astrosCountNow}人も居ますよ！静かだけど、寂しくはないね！`
  );
}

app.listen(process.env.PORT || 3000, () => {
  wakeDyno("https://cs-webhook.herokuapp.com/").start();
  console.log("Server is Running on port 3000");
});
