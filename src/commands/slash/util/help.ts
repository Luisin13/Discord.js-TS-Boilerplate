import { SlashCommand } from '@/types';
import { SlashCommandCategories } from '@/utils/commandCategories';
import { collections } from '@/utils/crossFilesVariables';
import {
  EmbedBuilder,
  Interaction,
  SelectMenuBuilder,
  SlashCommandBuilder,
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Send a help menu!')
    .setDMPermission(false),
  category: 'util',
  async execute(interaction) {
    if (!interaction.isRepliable()) return;

    const startEmbed = new EmbedBuilder()
      .setColor('Aqua')
      .setTitle(`${interaction.client.user.username} commands`)
      .setDescription('Select a category below to continue');

    const categorySelectMenu = new SelectMenuBuilder()
      .setCustomId(`helpCategorySelector${interaction.id}`)
      .setPlaceholder('Select a category')
      .addOptions(
        SlashCommandCategories.map((Category) => {
          return {
            label: Category.name,
            emoji: Category.emoji,
            description: Category.description,
            value: `helpCategorySelector${Category.value}${interaction.id}`,
          };
        }),
      );

    const components = {
      type: 1,
      components: [categorySelectMenu.toJSON()],
    };

    const replyInteraction = await interaction.reply({
      embeds: [startEmbed],
      components: [components],
      fetchReply: true,
    });

    const filter = (inter: Interaction) => {
      return (
        inter.isSelectMenu() &&
        inter.customId === `helpCategorySelector${interaction.id}` &&
        interaction.user.id === inter.user.id
      );
    };

    const collector = replyInteraction.createMessageComponentCollector({
      filter,
      time: 120_000,
    });

    collector.on('collect', async (collected) => {
      if (
        collected.isSelectMenu() &&
        collected.customId === `helpCategorySelector${interaction.id}`
      ) {
        const categories = SlashCommandCategories.map(
          (SlashCommandCategory) => {
            return SlashCommandCategory.value;
          },
        );

        const categorySelected = collected.values[0]
          .replace('helpCategorySelector', '')
          .replace(interaction.id, '');

        if (!categories.includes(categorySelected)) return;

        const commandsInCategory = collections.slashCommands.filter(
          (SlashCommand) =>
            SlashCommand.category.toLowerCase() ===
            categorySelected.toLowerCase(),
        );

        const categoryDetails = SlashCommandCategories.find(
          (CommandCategory) => CommandCategory.value === categorySelected,
        );

        if (!categoryDetails) return;

        const categoryEmbed = new EmbedBuilder()
          .setColor('Aqua')
          .setTitle(`${categoryDetails?.name} commands`)
          .setDescription(
            `These are ${
              categoryDetails.description[0].toLowerCase() +
              categoryDetails.description.substring(1)
            }`,
          );

        for (const command of commandsInCategory) {
          categoryEmbed.setDescription(
            `${categoryEmbed.data.description}\n\n**/${command[1].data.name}**\n> ${command[1].data.description}`,
          );
        }

        await collected.deferUpdate()
        await replyInteraction.edit({embeds: [categoryEmbed]})
      }
    });

    collector.once("end", async (_) => {
      const endedEmbed = new EmbedBuilder()
      .setColor('Aqua')
      .setTitle(`Time to use this command has ended`)
      .setDescription(
        `Use \`/${this.data.name}\` again to continuing viewing help menu`,
      );

      components.components[0].disabled = true
      await replyInteraction.edit({embeds: [endedEmbed], components: [components]})
    })

    return;
  },
} as SlashCommand;
