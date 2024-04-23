"use client";
import { useEffect } from "react";
// import * as StompJs from "@stomp/stompjs";

export default function StompAlarmSubscibe() {
  //   const isLogin = true;
  //   if (isLogin) {
  // const userId = 1;
  // const client = new StompJs.Client({
  //   brokerURL: "ws://192.168.0.6:3838/chat-server",
  //   reconnectDelay: 5000,
  // });
  // client.onConnect = () => {
  //   console.log("웹소켓연결", `/alarm/${userId}`);

  //   client.subscribe(`/alarms/${userId}`, (message) => {
  //     const datas = JSON.parse(message.body);
  //     console.log("message", datas.body);
  //     new Notification(datas.body.user.nickname, {
  //       body: datas.body.message,
  //       icon: datas.body.productThumbnail,
  //     });
  //   });
  // };
  //   }
  // client.activate();

  useEffect(() => {
    if (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/servie-worker.js").then((regist) => {
        console.log("서비스 워커 준비완료");

        regist.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey:
              "BPsAyffZNUgbk8LgC2LhCi1pP56KFMsMZC5VH1Z23BWKP-XuZFhZF7Apa7LN_O55Bn6LoQBPwd11EVZfCX9iRK4",
          })
          .then(async (sub) => {
            console.log(sub);
          });

        regist.addEventListener("updatefound", () => {
          // const newWorker = Worker.instance.installing();
          console.log("서비스 워커 업데이트 발견");
        });
      });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("서비스워커 컨트롤러 변경");
      });
    }

    return () => {
      // client.deactivate();
    };
  }, []);

  return (
    <div
      id="alarm"
      className="p-2 list-none max-w-[24rem] cursor-pointer absolute right-0 z-50 mt-[4rem] md:mt-2"
    />
  );
}
