import { ClientEvent } from '@/types';
import { collections } from '@/utils/crossFilesVariables';

export default {
  name: 'interactionCreate',
  async execute(interaction) {
    const command = collections.slashCommands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Erro ao executar o comando!',
        ephemeral: true,
      });
    }
  },
} as ClientEvent;
