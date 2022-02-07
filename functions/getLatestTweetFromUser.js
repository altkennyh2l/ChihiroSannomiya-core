import fetch from "node-fetch";
import "dotenv/config";

async function getTwitterUserID(screenName) {
  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/${screenName}`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    }
  );
  const data = await response.json();
  return data.data.id;
}

<<<<<<< HEAD
  const gettingScreenNameResponse = await gettingScreenName.json();
  let userID = (await gettingScreenNameResponse).data.id;

  const gettingTweetResponse = await fetch(
=======
async function getLatestTweet(userID) {
  const response = await fetch(
>>>>>>> parent of 3d7a0bf (oh i have to wait)
    `https://api.twitter.com/2/users/${userID}/tweets?exclude=retweets&expansions=attachments.media_keys&media.fields=preview_image_url,url`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    }
  );
  const tweet = (await gettingTweetResponse).json();
  let result = [tweet.data[0].text, tweet.includes.media[0].url];
  return result;
}

export default async function getLatestTweetFromUser(userScreenName) {
  getLatestTweet(await getTwitterUserID(userScreenName));
}
