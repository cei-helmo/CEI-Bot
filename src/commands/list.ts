import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, MessageFlags } from "discord.js";

// Commande /list
export const listCommand = new SlashCommandBuilder()
  .setName("list")
  .setDescription("Répertorie toutes les commandes disponibles");

// Fonction d'exécution de la commande /list
export const executeListCommand = async (interaction: ChatInputCommandInteraction) => {
  try {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "list") {
      // Récupérer toutes les commandes enregistrées
      const commands = await interaction.client.application?.commands.fetch();

      if (!commands || commands.size === 0) {
        return interaction.reply({
          content: "Aucune commande n'a été trouvée.",
          flags: MessageFlags.Ephemeral,
        });
      }
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      // Créer l'embed pour afficher les commandes
      const embed = new EmbedBuilder()
        .setColor(`#${randomColor}`)
        .setTitle("Liste des Commandes Disponibles")
        .setDescription("Voici la liste des commandes que vous pouvez utiliser.")
        .setTimestamp()
        .setFooter({
          text: "Bot Commandes",
        });

      // Ajouter chaque commande à l'embed
      commands.forEach((command) => {
        embed.addFields({
          name: `/${command.name}`,
          value: command.description || "Aucune description fournie.",
          inline: false,
        });
      });

      // Envoyer l'embed dans la réponse
      return interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'exécution de la commande /list :", error);
    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Une erreur inattendue s'est produite. Veuillez réessayer.",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "Une erreur inattendue s'est produite. Veuillez réessayer.",
          flags: MessageFlags.Ephemeral,
        });
      }
    } catch (responseError) {
      console.error("Échec de la notification de l'utilisateur :", responseError);
    }
  }
};
