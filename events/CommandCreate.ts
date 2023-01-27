import { DiscordCommands } from "../lib/Command/Command";
import { ChannelEmbedMessage } from "../lib/Message/MessageTypes";

export class CommandCreate {
  constructor(data: any, commandName: string, args: string[]) {
    try {
      const command = DiscordCommands.find((c) => c.name === commandName);
      if (!command) return;
      const fullArgs: string = args.join(" ");
      if (command.args !== undefined) {
        if (command.args.static !== undefined && args.length !== command.args.static)
          throw new TypeError(`Doğru kullanım: ${command.useage}`);
        if (command.args.min !== undefined && args.length < command.args.min)
          throw new TypeError(`Doğru kullanım: ${command.useage}`);
        if (command.args.max !== undefined && args.length > command.args.max)
          throw new TypeError(`Doğru kullanım: ${command.useage}`);
        if (command.args.minLength !== undefined && fullArgs.length < command.args.minLength)
          throw new TypeError(`Argümanların uzunluğu en az **${command.args.minLength}** olmak zorunda`);
        if (command.args.maxLength !== undefined && fullArgs.length > command.args.maxLength)
          throw new TypeError(`Argümanların uzunluğu en fazla **${command.args.maxLength}** olabilir.`);
      }
      if (command.channelType !== undefined) {
        if (command.channelType === "dm" && data.guild_id !== undefined)
          throw new TypeError("Bu komut sadece özel mesaj olarak kullanılabilir.");
        else if (command.channelType === "guild" && data.guild_id === undefined)
          throw new TypeError("Bu komut özel mesaj olarak kullanılamaz.");
      }
      // kontroller
      command.execute(data, data.author, fullArgs, ...args);
    } catch (e: any) {
      new ChannelEmbedMessage(data.channel_id, [
        { title: "Hatalı Kullanım", description: e.message || "Bilinmeyen bir hata oluştu.", color: 0xff0000 },
      ]);
    }
  }
}
