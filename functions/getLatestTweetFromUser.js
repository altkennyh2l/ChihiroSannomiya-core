import fetch from "node-fetch";
import "dotenv/config";

export default async function getLatestTweet(screenName) {
  const gettingScreenName = await fetch(
    `https://api.twitter.com/2/users/by/username/${screenName}`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    }
  );

  const gettingScreenNameResponse = await gettingScreenName.json();
  let userID = gettingScreenNameResponse.data.id;

  const response = await fetch(
    `https://api.twitter.com/2/users/${userID}/tweets?exclude=retweets&expansions=attachments.media_keys&media.fields=preview_image_url,url`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    }
  );
  const data = await response.json();
  let result = [data.data[0].text, data.includes.media[0].url];
  return result;
}
