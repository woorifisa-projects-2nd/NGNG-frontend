import * as StompJs from "@stomp/stompjs";

const client = new StompJs.Client({
  brokerURL: "ws://localhost:8081/chat-server",
  reconnectDelay: 5000,
});
// client.onConnect = () => {
//   if (client.connected) {
//     // 연결 상태 확인
//     client.subscribe(`/public-chats/${data.id}`, (message) => {
//       const data = JSON.parse(message.body).body;
//       console.log("data", data);
//       getMessage(JSON.parse(message.body).body);
//     });
//   } else {
//     console.error("STOMP connection is not established yet.");
//   }
// };

export default client;
