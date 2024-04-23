"use client";
import { useEffect } from "react";
import * as StompJs from "@stomp/stompjs";

export default function StompAlarmSubscibe() {
  //   const isLogin = true;
  //   if (isLogin) {
  const userId = 1;
  const client = new StompJs.Client({
    brokerURL: "ws://localhost:8081/chat-server",
    reconnectDelay: 5000,
  });
  client.onConnect = () => {
    console.log("웹소켓연결", `/alarm/${userId}`);

    client.subscribe(`/alarms/${userId}`, (message) => {
      const datas = JSON.parse(message.body);
      console.log("message", datas.body);
      new Notification(datas.body.user.nickname, {
        body: datas.body.message,
        icon: datas.body.productThumbnail,
      });
    });
  };
  //   }
  client.activate();

  useEffect(() => {
    if (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <div
      id="alarm"
      className="p-2 list-none max-w-[24rem] cursor-pointer absolute right-0 z-50 mt-[4rem] md:mt-2"
    />
  );
}
