import { PrefixCommand } from '@/types';
import { clientLogger, collections } from '@/utils/crossFilesVariables';
import { readdirSync, lstatSync } from 'node:fs';
import path from 'node:path';

export default function readSlashCommands() {
  const fileEnding = __dirname.includes('src') ? '.ts' : '.js';
  const commandsPath = path.join(__dirname, '..', 'commands', 'prefix');
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
      const command: PrefixCommand = require(filePath).default;

      collections.prefixCommands.set(command.data.name, command);
      for (const alias of command.data.aliases) {
        collections.prefixCommandAliases.set(alias, command);
      }

      clientLogger.debug(`${command.data.name} prefix command registered`);
    }
  }
}
