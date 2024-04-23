self.addEventListener("install", () => {
  // 대기상태에 머무르지 않고 활성화
  self.skipWaiting();
  console.log("install");
});

self.addEventListener("activate", (event) => {
  // console.log("activate");
});

// push 알람 처리
self.addEventListener("push", (event) => {
  console.log("push", event.data.text());

  // 보내는 데이터 형식
  // {
  //  "title":"pwa 알람 테스트입니다",
  //  "body":"바디 ㅋㅋㅋ"
  // }

  const data = JSON.parse(event.data.text());
  console.log(data);

  const title = data.title;
  const options = {
    body: data.body,
    icon: "https://res.cloudinary.com/dhdq4v4ar/image/upload/w_192,h_192/v1659106597/lakun_lx50mu.jpg",
    // 진동음
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  console.log(event.data);
  event.waitUntil(clients.openWindow("http://localhost:3000"));
});
