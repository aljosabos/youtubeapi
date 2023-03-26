import "./Subscriptions.scss";
import Subscription from "./Subscription/Subscription";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Subscriptions() {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("access_token"));

  const url = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&fields=items(id,snippet(title,channelId,thumbnails(high(url))))&nextPageToken&key=${process.env.REACT_APP_API_KEY}`;

  const basicUrl = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&nextPageToken&key=${process.env.REACT_APP_API_KEY}`;

  const getSubscriptions = async () => {
    const subscriptions = await axios
      .get(url, {
        headers: { Authorization: `Bearer ${accessToken} `, Accept: "application/json" },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (accessToken) getSubscriptions();
  }, [accessToken]);

  return (
    <div className="Subscriptions">
      <Subscription />
      <Subscription />
      <Subscription />
      <Subscription />
    </div>
  );
}
