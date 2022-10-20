import { PrefixCommand } from '@/types';
import { EmbedBuilder } from 'discord.js';

export default {
  data: {
    name: 'info',
    description: 'Replies with information about the bot!',
    aliases: [],
  },
  enabled: true,
  guildOnly: false,
  category: 'util',
  async execute(message, args) {
    const Embed = new EmbedBuilder()
      .setColor('Aqua')
      .setTitle(`${message.client.user.username} info`)
      .setDescription(
        `A simple discord bot in ${message.client.guilds.cache.size} guilds and about ${message.client.channels.cache.size} channels with ${message.client.users.cache.size} users.

        This bot was generated with [Discord.js Typescript Boilerplate](https://github.com/Luisin13/Discord.js-TS-Boilerplate)
        `,
      );

    await message.reply({ embeds: [Embed] });

    return;
  },
} as PrefixCommand;
