import { CommandCreate } from "./CommandCreate";
import config from "../config";

export class MessageCreate {
  constructor(message: any) {
    message.content = message.content.trim();
    message.content = message.content.replace(/ +(?= )/g, "");
    if (!message.content) return;
    let messageContent: string = message.content;
    if (messageContent.substring(0, config.prefix.length) === config.prefix) {
      if (!messageContent.split(config.prefix)[1]) return;
      messageContent = messageContent.replace(config.prefix, "");
      messageContent = messageContent.replace(/ +(?= )/g, "");
      if (!messageContent) return;
      const messageArray = messageContent.split(" ");
      const commandName = messageArray[0];
      messageArray.splice(0, 1);
      const args: string[] = messageArray;
      new CommandCreate(message, commandName, args);
      return;
    }
  }
}
