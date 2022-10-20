import { REST, Routes } from 'discord.js';
import { clientLogger, collections } from '@/utils/crossFilesVariables';
import { client } from '..';

export default function deployCommandsToGuild(
  token: string,
  clientId: string,
  guildId: string,
) {
  const commands = [];

  for (const command of collections.slashCommands.values()) {
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(async (data: any) => {
      clientLogger.info(
        `Registered ${data.length} slash commands on ${
          (await client.guilds.fetch(guildId)).name
        }`,
      );
    })

    .catch(console.error);
}
