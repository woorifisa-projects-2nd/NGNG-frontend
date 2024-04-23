"use client";

import { useEffect, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
const chatAlarm: number[] = [];

export default function StompAlarmSubscibe() {
  const notificationRef = useRef<Notification>();
  const timerRef = useRef(null);

  //   const isLogin = true;
  //   if (isLogin) {
  if (!Notification) {
    return;
  }

  if (Notification.permission !== "granted") {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") return;
      });
    } catch (error) {
      // 사파리의 경우
      if (error instanceof TypeError) {
        Notification.requestPermission().then((permission) => {
          if (permission !== "granted") return;
        });
      }
    }
  }
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

      if (chatAlarm.find((id) => id === datas.body.chatId) === undefined) {
        chatAlarm.push(datas.body.chatId);
        notificationRef.current = new Notification(datas.body.user.nickname, {
          body: datas.body.message,
          icon: datas.body.productThumbnail,
          tag: datas.body.chatId,
          dir: "ltr",
          lang: "ko",
          requireInteraction: false,
        });
        notificationRef.current.onclick = (e) => {
          e.preventDefault();
          window.focus();
          notificationRef.current?.close();
        };
      }
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
