import { SlashCommand } from '@/types';
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')
    .setDMPermission(false),
  category: 'util',
  async execute(interaction) {
    if (interaction.isRepliable()) await interaction.reply('🏓 Pong!');
    return;
  },
} as SlashCommand;
