import { PrefixCommand } from '@/types';

export default {
  data: {
    name: 'ping',
    description: 'Replies with pong!',
    aliases: [],
  },
  enabled: true,
  guildOnly: false,
  category: 'util',
  async execute(message, args) {
    await message.reply('🏓 Pong!');
    return;
  },
} as PrefixCommand;
