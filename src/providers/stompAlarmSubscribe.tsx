"use client";

import { useContext, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import { UserContext } from "./UserContext";
const chatAlarm: number[] = [];

export default function StompAlarmSubscibe() {
  const { getUser } = useContext(UserContext);
  const notificationRef = useRef<Notification>();
  const user = getUser();

  if (!Notification) {
    alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
    return;
  }

  if (Notification.permission !== "granted") {
    try {
      Notification.requestPermission().then((permission) => {
        console.log("요청은 함", Notification.permission);

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
  const client = new StompJs.Client({
    brokerURL: `${process.env.NEXT_PUBLIC_CHAT_SOCKET}/chat-server`,
    reconnectDelay: 5000,
  });
  client.onConnect = () => {
    client.subscribe(`/alarms/${user?.id}`, (message) => {
      const datas = JSON.parse(message.body).body;
      console.log("chat data", datas);

      if (chatAlarm.find((id) => id === datas.chatId) === undefined) {
        chatAlarm.push(datas.chatId);
        notificationRef.current = new Notification(datas.user.nickname, {
          body: datas.message,
          icon: datas.productThumbnail,
          tag: datas.chatId,
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

  client.activate();

  return (
    <div
      id="alarm"
      className="p-2 list-none max-w-[24rem] cursor-pointer absolute right-0 z-50 mt-[4rem] md:mt-2"
    />
  );
}
