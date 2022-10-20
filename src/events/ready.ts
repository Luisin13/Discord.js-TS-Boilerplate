import { ClientEvent } from '@/types';
import { clientLogger } from '@/utils/crossFilesVariables';
import { ActivityType, Client } from 'discord.js';

export default {
  name: 'ready',
  once: true,
  async execute(client: Client) {
    clientLogger.info(`Client ${client.user?.tag} is online, with no errors!`);
    client.user?.setActivity({
      name: 'Just a simple bot',
      type: ActivityType.Playing,
    });
  },
} as ClientEvent;
