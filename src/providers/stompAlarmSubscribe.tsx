"use client";
import { useEffect } from "react";
import client from "./stomp";

export default function StompAlarmSubscibe() {
  const isLogin = true;
  if (isLogin) {
    const userId = 2;
    client.onConnect = () => {
      client.subscribe(`alarm/${userId}`, (message) => {
        const datas = JSON.parse(message.body);
        console.log("message", datas);
        new Notification("text", {
          body: "테스트 알림",
          icon: "/car.jpg",
        });
      });
      client.activate();
    };
  }

  useEffect(() => {
    if (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div
      id="alarm"
      className="p-2 list-none max-w-[24rem] cursor-pointer absolute right-0 z-50 mt-[4rem] md:mt-2"
    />
  );
}
