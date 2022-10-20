import { PrefixCommand } from '@/types';

export default function generateCommandUsage(
  command: PrefixCommand,
  prefix: string,
) {
  if (!command.data.args) return `${prefix}${command.data.name}`;
  const usage = [];

  for (const arg of command.data.args) {
    if (arg.required) usage.push(`<${arg.name}>`);
    else usage.push(`[${arg.name}]`);
  }

  return `${prefix}${command.data.name} ${usage.join(' ')}`;
}
