import { ClientEvent } from '@/types';
import { clientLogger } from '@/utils/crossFilesVariables';
import { Client } from 'discord.js';
import { lstatSync, readdirSync } from 'node:fs';
import path from 'node:path';

export default function readEvents(client: Client) {
  const fileEnding = __dirname.includes('src') ? '.ts' : '.js';
  const eventsPath = path.join(__dirname, '..', 'events');
  const eventFiles = readdirSync(eventsPath).filter(
    (file) => lstatSync(path.join(eventsPath, file)).isFile() && file.endsWith(fileEnding),
  );

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const event: ClientEvent = require(filePath).default;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }

    clientLogger.debug(`${event.name} event registered`)
  }
}
