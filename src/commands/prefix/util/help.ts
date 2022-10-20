import generateCommandUsage from '@/lib/generateCommandUsage';
import { PrefixCommand } from '@/types';
import { PrefixCommandCategories } from '@/utils/commandCategories';
import { collections } from '@/utils/crossFilesVariables';
import { EmbedBuilder, Interaction, SelectMenuBuilder } from 'discord.js';

export default {
  data: {
    name: 'help',
    description: 'Sends a help menu!',
    aliases: [],
    args: [
      {
        name: 'command',
        required: false,
      },
    ],
  },
  enabled: true,
  guildOnly: false,
  category: 'util',
  async execute(message, args) {
    console.log(args);

    if (args[0]) {
      const command = args[0].toLowerCase();

      const cmd =
        collections.prefixCommands.get(command) ||
        collections.prefixCommands.find(
          (cmd) => cmd.data.aliases && cmd.data.aliases.includes(command),
        );

      if (!cmd) {
        await message.reply(`Could not find \`${command}\``);

        return;
      }

      const cmdEmbed = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle(`${cmd.data.name} command`).setDescription(`
        **Name:** \`${cmd.data.name}\`
        **Description:** \`${cmd.data.description}\`
        **Aliases: ** ${
          cmd.data.aliases.length > 0
            ? cmd.data.aliases.map((alias) => `\`${alias}\``)
            : '`none`'
        }
        **Args: ** ${
          cmd.data.args && cmd.data.args.length > 0
            ? `\`${generateCommandUsage(cmd, process.env.BOT_PREFIX!).replace(
                `${process.env.BOT_PREFIX!}${cmd.data.name} `,
                '',
              )}\``
            : '`none`'
        }
        **Usage: ** \`${generateCommandUsage(cmd, process.env.BOT_PREFIX!)}\`
        **Enabled: ** \`${cmd.enabled ? 'true' : 'false'}\`
        **Guild only: ** \`${cmd.enabled ? 'true' : 'false'}\`
        `);

      await message.reply({ embeds: [cmdEmbed] });

      return;
    }

    const startEmbed = new EmbedBuilder()
      .setColor('Aqua')
      .setTitle(`${message.client.user.username} commands`)
      .setDescription('Select a category below to continue');

    const categorySelectMenu = new SelectMenuBuilder()
      .setCustomId(`helpCategorySelector${message.id}`)
      .setPlaceholder('Select a category')
      .addOptions(
        PrefixCommandCategories.map((Category) => {
          return {
            label: Category.name,
            emoji: Category.emoji,
            description: Category.description,
            value: `helpCategorySelector${Category.value}${message.id}`,
          };
        }),
      );

    const components = {
      type: 1,
      components: [categorySelectMenu.toJSON()],
    };

    const replyMessage = await message.reply({
      embeds: [startEmbed],
      components: [components],
    });

    const filter = (inter: Interaction) => {
      return (
        inter.isSelectMenu() &&
        inter.customId === `helpCategorySelector${message.id}` &&
        message.author.id === inter.user.id
      );
    };

    const collector = replyMessage.createMessageComponentCollector({
      filter,
      time: 120_000,
    });

    collector.on('collect', async (collected) => {
      if (
        collected.isSelectMenu() &&
        collected.customId === `helpCategorySelector${message.id}`
      ) {
        const categories = PrefixCommandCategories.map(
          (PrefixCommandCategory) => {
            return PrefixCommandCategory.value;
          },
        );

        const categorySelected = collected.values[0]
          .replace('helpCategorySelector', '')
          .replace(message.id, '');

        if (!categories.includes(categorySelected)) return;

        const commandsInCategory = collections.prefixCommands.filter(
          (PrefixCommand) =>
            PrefixCommand.category.toLowerCase() ===
            categorySelected.toLowerCase(),
        );

        const categoryDetails = PrefixCommandCategories.find(
          (CommandCategory) => CommandCategory.value === categorySelected,
        );

        if (!categoryDetails) return;

        const categoryEmbed = new EmbedBuilder()
          .setColor('Aqua')
          .setTitle(`${categoryDetails.name} commands`)
          .setDescription(
            `These are ${
              categoryDetails.description[0].toLowerCase() +
              categoryDetails.description.substring(1)
            }`,
          );

        for (const command of commandsInCategory) {
          categoryEmbed.setDescription(
            `${categoryEmbed.data.description}\n\n**${process.env.BOT_PREFIX}${command[1].data.name}**\n> ${command[1].data.description}`,
          );
        }

        await collected.deferUpdate();
        await replyMessage.edit({ embeds: [categoryEmbed] });
      }
    });

    collector.once('end', async (_) => {
      const endedEmbed = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle(`Time to use this command has ended`)
        .setDescription(
          `Use \`${process.env.BOT_PREFIX}${this.data.name}\` again to continuing viewing help menu`,
        );

      components.components[0].disabled = true;
      await replyMessage.edit({
        embeds: [endedEmbed],
        components: [components],
      });
    });

    return;
  },
} as PrefixCommand;
