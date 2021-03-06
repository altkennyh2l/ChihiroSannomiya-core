import express, { json } from "express";
import { WebhookClient } from "dialogflow-fulfillment";
import { Text, Image } from "dialogflow-fulfillment";
import getRoomCondition from "./functions/getRoomCondition.js";
import getISSLocation from "./functions/getISSLocation.js";
import getAstrosCountNow from "./functions/getAstrosCountNow.js";
import getLatestTweetFromUser from "./functions/getLatestTweetFromUser.js";
import { wakeDyno, wakeDynos } from "heroku-keep-awake";

const app = express();

app.use(json());
app.get("/", (req, res) => {
  res.send("Server Is Working......");
});

app.post("/webhook", (req, res) => {
  let agent = new WebhookClient({ request: req, response: res });

  let intentMap = new Map();

  intentMap.set("webhook_roomCondition", respondRoomCondition);
  intentMap.set("webhook_ISSLocation", respondISSLocation);
  intentMap.set("webhook_astrosCountNow", respondAstrosCountNow);
  intentMap.set("webhook_getPompompurinTweet", respondPompompurinTweet);
  intentMap.set("webhook_getCinnamonTweet", respondCinnamonTweet);

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

async function respondPompompurinTweet(agent) {
  let tweetContent = await getLatestTweetFromUser("purin_sanrio");
  agent.add(
    new Text(`@Purin_Sanrioがこれをツイートしました：${tweetContent[0]}`)
  );
  agent.add(new Image(tweetContent[1]));
}

async function respondCinnamonTweet(agent) {
  let tweetContent = await getLatestTweetFromUser("cinnamon_sanrio");
  agent.add(
    new Text(`@Cinnamon_Sanrioがこれをツイートしました：${tweetContent[0]}`)
  );
  agent.add(new Image(tweetContent[1]));
}

app.listen(process.env.PORT || 3000, () => {
  wakeDyno("https://cs-webhook.herokuapp.com/", {
    interval: 20,
    logging: true,
    stopTimes: { start: "00:00", end: "00:01" },
  });
  console.log("Server is Running on port 3000");
});
