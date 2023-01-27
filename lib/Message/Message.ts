import fetch from "node-fetch";
import config from "../../config";
import { IEmbedMessage } from "./IMessageTypes";

export class BaseChannelMessage {
  constructor(channelId: number, body: any) {
    fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${config.token}`,
      },
      body: JSON.stringify(body),
    });
  }
}

//

export class BaseUserMessage {
  constructor(userId: number, body: any) {
    fetch("https://discordapp.com/api/v9/users/@me/channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${config.token}`,
      },
      body: JSON.stringify({ recipient_id: userId }),
    })
      .then((response: any) => response.json())
      .then((data: any) => {
        new BaseChannelMessage(data.id, body);
      });
  }
}
