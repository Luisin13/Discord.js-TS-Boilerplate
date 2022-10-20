import { Client, IntentsBitField } from 'discord.js';
import { config as envConfig } from 'dotenv';
import deployCommandsToGuild from '@/lib/deployCommandsToGuild';
import { parseExecutionArgs } from '@/lib/parseExecutionArgs';
import readEvents from '@/lib/readEvents';
import readSlashCommands from '@/lib/readSlashCommands';
import validateEnv from '@/lib/validateEnv';
import readPrefixCommands from '@/lib/readPrefixCommands';

envConfig();
validateEnv(['BOT_TOKEN', 'BOT_CLIENT_ID', 'TEST_GUILD_ID', 'BOT_PREFIX']);
const args = parseExecutionArgs(process.argv);

export const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

readEvents(client);
readSlashCommands();
readPrefixCommands();
if (args.shouldDeployCommandsToTestGuild)
  deployCommandsToGuild(
    process.env.BOT_TOKEN!,
    process.env.BOT_CLIENT_ID!,
    process.env.TEST_GUILD_ID!,
  );

client.login(process.env.BOT_TOKEN).catch((err) => {
  console.log(
    `Error: ${err.code}!\n  Possibly you used an invalid/false token or a user token(keep in mind that using user as a bot is against Discord ToS)`,
  );
});
