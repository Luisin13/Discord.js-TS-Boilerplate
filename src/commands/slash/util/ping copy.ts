import { SlashCommand } from '@/types';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Replies with information about the bot!')
    .setDMPermission(false),
  category: 'util',
  async execute(interaction) {
    if (!interaction.isRepliable()) return;
    const Embed = new EmbedBuilder()
      .setColor('Aqua')
      .setTitle(`${interaction.client.user.username} info`)
      .setDescription(
        `A simple discord bot in ${interaction.client.guilds.cache.size} guilds and about ${interaction.client.channels.cache.size} channels with ${interaction.client.users.cache.size} users.

      This bot was generated with [Discord.js Typescript Boilerplate](https://github.com/Luisin13/Discord.js-TS-Boilerplate)
      `,
      );

    await interaction.reply({ embeds: [Embed] });

    return;
  },
} as SlashCommand;
