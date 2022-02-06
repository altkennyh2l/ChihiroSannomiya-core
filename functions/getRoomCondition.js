const { WebhookClient } = require("dialogflow-fulfillment");
const request = require("request");
const dotenv = require("dotenv").config();
const options = {
  url: process.env.SWITCHBOT_METER_URL,
  method: "get",
  headers: {
    Authorization: process.env.SWITCHBOT_TOKEN,
  },
};

function getRoomCondition() {
  let result = [];
  request(options, function (error, response, body) {
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
  agent.end("");
}

module.exports = getRoomCondition;
