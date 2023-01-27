import { IEmbedMessage } from "./IMessageTypes";
import { BaseChannelMessage, BaseUserMessage } from "./Message";

export class ChannelNormalMessage extends BaseChannelMessage {
  constructor(channelId: number, message: string) {
    super(channelId, { content: message });
  }
}

export class ChannelEmbedMessage extends BaseChannelMessage {
  constructor(channelId: number, embeds: IEmbedMessage[]) {
    if (!embeds.length) throw new TypeError("En az 1 tane embed mesajı olmak zorunda.");
    super(channelId, { embeds: embeds });
  }
}

// user
export class UserNormalMessage extends BaseUserMessage {
  constructor(userId: number, message: string) {
    super(userId, { content: message });
  }
}

export class UserEmbedMessage extends BaseUserMessage {
  constructor(userId: number, embeds: IEmbedMessage[]) {
    if (!embeds.length) throw new TypeError("En az 1 tane embed mesajı olmak zorunda.");
    super(userId, { embeds: embeds });
  }
}
