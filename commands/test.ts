import { DiscordCommand } from "../lib/Command/Command";
import {
  ChannelEmbedMessage,
  ChannelNormalMessage,
  UserEmbedMessage,
  UserNormalMessage,
} from "../lib/Message/MessageTypes";

const test = new DiscordCommand("test", "/test", { static: 1, maxLength: 3 }, "guild");

test.execute = (data: any, author: any, fullArgs: string, args1: string, args2: string) => {
  try {
    console.log(author.username);
    new ChannelNormalMessage(data.channel_id, "Channel Normal Message Test");
    new ChannelEmbedMessage(data.channel_id, [
      { title: "Channel Embed Message Title", description: "Channel Embed Message Description" },
    ]);
    new UserNormalMessage(author.id, "User Normal Message");
    new UserEmbedMessage(author.id, [
      { title: "User Embed Message Title", description: "User Embed Message Desctiption" },
    ]);
  } catch (e: any) {
    console.log(e);
  }
};
