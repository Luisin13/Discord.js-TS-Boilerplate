import generateCommandUsage from '@/lib/generateCommandUsage';
import { ClientEvent } from '@/types';
import { clientLogger, collections } from '@/utils/crossFilesVariables';
import { Message } from 'discord.js';

export default {
  name: 'messageCreate',
  async execute(message: Message) {
    if (message.author.bot || message.webhookId || !message) return;

    const prefix = process.env.BOT_PREFIX!;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()!.toLowerCase();
    const cmd =
      collections.prefixCommands.get(command) ||
      collections.prefixCommands.find(
        (cmd) => cmd.data.aliases && cmd.data.aliases.includes(command),
      );

    if (!cmd) return;
    if (!cmd.enabled) return;
    if (cmd.guildOnly && !message.inGuild()) return;

    if (
      cmd.data.args &&
      args.length < cmd.data.args.filter((arg) => arg.required).length
    ) {
      await message.reply(
        `Incorrect usage, expected usage is: \`${generateCommandUsage(
          cmd,
          prefix,
        )}\``,
      );
      return;
    }

    try {
      await cmd.execute(message, args);
    } catch (error) {
      clientLogger.error(`Error while executing command: ${command}!`);
    }
  },
} as ClientEvent;
