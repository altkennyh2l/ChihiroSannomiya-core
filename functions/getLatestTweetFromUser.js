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
  let userID = (await gettingScreenNameResponse).data.id;

  const gettingTweetResponse = await fetch(
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
