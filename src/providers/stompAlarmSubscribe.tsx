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
  const client = new StompJs.Client({
    brokerURL: `${process.env.NEXT_PUBLIC_CHAT_SOCKET}/chat-server`,
    reconnectDelay: 5000,
  });
  client.onConnect = () => {
    client.subscribe(`/alarms/${user?.id}`, (message) => {
      const datas = JSON.parse(message.body);

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

  client.activate();

  return (
    <div
      id="alarm"
      className="p-2 list-none max-w-[24rem] cursor-pointer absolute right-0 z-50 mt-[4rem] md:mt-2"
    />
  );
}
