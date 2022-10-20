import { PrefixCommand, SlashCommand } from '@/types';
import { Collection } from 'discord.js';
import { Logger } from './logger';
import { name } from '../../package.json'

export const collections = {
  slashCommands: new Collection<string, SlashCommand>(),
  prefixCommands: new Collection<string, PrefixCommand>(),
  prefixCommandAliases: new Collection<string, PrefixCommand>(),
};

export const clientLogger = new Logger({ logPrefix: `${name}` });