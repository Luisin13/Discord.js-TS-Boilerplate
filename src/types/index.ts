import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

export type ClientEvent = {
  name: string;
  once?: boolean;
  execute(...args: any[]): void;
};

export type SlashCommand = {
  data: SlashCommandBuilder;
  category: string;
  execute(interaction: Interaction): Promise<void>;
};

export type PrefixCommand = {
  data: PrefixCommandData;
  category: string;
  enabled: boolean;
  guildOnly?: boolean;
  execute(message: Message, args: string[]): Promise<void>;
};

export type PrefixCommandData = {
  name: string;
  description: string;
  aliases: string[];
  args?: PrefixCommandDataArgs[];
};

type PrefixCommandDataArgs = {
  name: string;
  required?: boolean;
};

export interface LoggerConstructor {
  logPrefix: string;
  onLog?: (logMessage: string, logLevel: logLevels) => void;
}

export interface LoggerInterface {
  debug: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  fatal: (message: string) => void;
}

export type CommandCategories = {
  name: string;
  description: string;
  emoji: string;
  value: string;
};

export type logLevels = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
