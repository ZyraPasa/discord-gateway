import { IDiscordCommand, IDiscordCommandArgs } from "./ICommand";

export const DiscordCommands: IDiscordCommand[] = [];

export class DiscordCommand implements IDiscordCommand {
  name: string;
  useage: string;
  args?: IDiscordCommandArgs;
  channelType?: "dm" | "guild";
  execute: (data: any, author: any, fullArgs: string, ...args: string[]) => void;
  constructor(name: string, useage: string, args?: IDiscordCommandArgs, channelType?: "dm" | "guild") {
    this.name = name;
    this.useage = useage;
    this.args = args;
    this.channelType = channelType;
    DiscordCommands.push(this);
  }
}
