import { PrefixCommand } from '@/types';

export default {
  data: {
    name: 'args',
    description: 'Replies with arguments you passed in!',
    aliases: [],
    args: [
      {
        name: 'discord',
        required: true,
      },
      {
        name: 'guild',
        required: true,
      },
      {
        name: 'name',
        required: false,
      },
    ],
  },
  enabled: true,
  guildOnly: false,
  category: 'util',
  async execute(message, args) {
    await message.reply(args.join(' '));
    return;
  },
} as PrefixCommand;
