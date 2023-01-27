import { WebSocket } from "ws";
import fetch from "node-fetch";
import ReconnectingWebSocket from "reconnecting-websocket";
import { MessageCreate } from "./events/MessageCreate";
import "./commands/index";
import config from "./config";
let wsLink = "wss://gateway.discord.gg/?v=10&encoding=json";

const ws = new ReconnectingWebSocket(wsLink, [], { WebSocket });
let interval: any = 0;
let last_seq: any;
let payload = {
  op: 2,
  d: {
    token: config.token,
    intents: 65027,
    properties: {
      $os: "linux",
      $browser: "31",
      $device: "31",
    },
    presence: {
      activities: [
        {
          name: "RAW Roleplay",
          type: 0,
        },
      ],
      status: "dnd",
    },
  },
};

ws.addEventListener("open", () => {
  ws.send(JSON.stringify(payload));
});

ws.addEventListener("message", function incoming(rawdata) {
  let payload = JSON.parse(rawdata.data); //
  const { t, event, op, d, s } = payload; //
  last_seq = s; // heartbeat
  //console.log(payload)
  switch (op) {
    case 10:
      const { heartbeat_interval } = d;
      interval = heartbeat(heartbeat_interval);
      break;
  }
  // console.log(t);
  switch (t) {
    case "MESSAGE_CREATE":
      new MessageCreate(d);
      break;
    case "MESSAGE_DELETE":
      console.log(payload);
  }
});

const heartbeat = (ms: number) => {
  return setInterval(() => {
    ws.send(JSON.stringify({ op: 1, d: last_seq }));
  }, ms);
};
