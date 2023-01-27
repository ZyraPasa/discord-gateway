export interface IDiscordCommand {
  name: string;
  useage: string;
  args?: IDiscordCommandArgs;
  channelType?: "dm" | "guild";
  execute: (data: any, author: any, fullArgs: string, ...args: string[]) => void;
}

export type IDiscordCommandArgs = {
  static?: number;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
};
