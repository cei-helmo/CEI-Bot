import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";

export const socialCommand = new SlashCommandBuilder()
    .setName('social')
    .setDescription("Affiche nos différents réseaux sociaux, incluant Facebook, Instagram et notre site web.")

export const executeSocialCommand = async (interaction: ChatInputCommandInteraction) => {
    const guildIcon = interaction.guild?.iconURL({ size: 512 }) ?? ""; // Récupère l'icône du serveur

    // Génère une couleur aléatoire
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    const embed = new EmbedBuilder()
        .setColor(`#${randomColor}`) // Applique la couleur aléatoire
        .setTitle("Nos différents réseaux sociaux")
        .setDescription("📢 Retrouvez-nous sur nos différentes plateformes !")
        .setThumbnail(guildIcon) // Affiche l'icône du serveur
        .addFields(
            { name: "Facebook", value: "[Suivez-nous ici](https://www.facebook.com/CEI.HELMo)", inline: false },
            { name: "Instagram", value: "[Abonnez-vous ici](https://www.instagram.com/cei.helmo/e)", inline: false },
            { name: "Notre Site Web", value: "[Abonnez-vous ici](https://cei.helmo.be)", inline: false },
        )
        .setFooter({ text: "Merci de votre soutien !", iconURL: guildIcon });

    await interaction.reply({ embeds: [embed] });
};
