import { SlashCommand } from '@/types';
import { clientLogger, collections } from '@/utils/crossFilesVariables';
import { readdirSync, lstatSync } from 'node:fs';
import path from 'node:path';

export default function readSlashCommands() {
  const fileEnding = __dirname.includes('src') ? '.ts' : '.js';
  const commandsPath = path.join(__dirname, '..', 'commands', 'slash');
  const commandFolders = readdirSync(commandsPath).filter((folder) =>
    lstatSync(path.join(commandsPath, folder)).isDirectory(),
  );

  for (const commandFolder of commandFolders) {
    const commandFiles = readdirSync(
      path.join(commandsPath, commandFolder),
    ).filter(
      (file) =>
        lstatSync(path.join(commandsPath, commandFolder, file)).isFile() &&
        file.endsWith(fileEnding),
    );

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, commandFolder, file);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const command: SlashCommand = require(filePath).default;

      collections.slashCommands.set(command.data.name, command);

      clientLogger.debug(`${command.data.name} slash command registered`)
    }
  }
}
