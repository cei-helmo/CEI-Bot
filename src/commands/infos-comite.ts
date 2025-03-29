import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from "discord.js";

export const infoComite = new SlashCommandBuilder()
    .setName('infos-comite')
    .setDescription("Affiche les informations d'un membre du comité.")
    .addUserOption(option =>
        option.setName("pseudo")
            .setDescription("Mentionne un membre pour voir ses infos.")
            .setRequired(true) 
    );

export const executeInfoComiteCommand = async (interaction: CommandInteraction) => {
    if (!interaction.guild) {
        return interaction.reply({ content: "Cette commande doit être utilisée dans un serveur.", ephemeral: true });
    }

    const user = interaction.options.get("pseudo")?.user;
    if (!user) {
        return interaction.reply({ content: "Utilisateur non trouvé.", ephemeral: true });
    }

    // permet de s'assurer que le membre a bien le rôle comité sinon la commande renvoie une erreur
    const member = await interaction.guild.members.fetch(user.id);
    const roleId = "989507387218067496"; 
    const role = interaction.guild.roles.cache.get(roleId);

    if (!role || !member.roles.cache.has(roleId)) {
        return interaction.reply({ content: `${user.username} n'est pas membre du comité.`, ephemeral: true });
    }

    const roles = member.roles.cache
        .filter(r => r.id !== interaction.guild?.id) 
        .sort((a, b) => b.position - a.position)
        .map(r => r.toString()) 
        .join(", ") || "Aucun rôle";

    const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle(`📌 Infos de **${user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}**`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            { name: "👤 Pseudo", value: `**${user.tag.charAt(0).toUpperCase() + user.tag.slice(1).toLowerCase()}**`, inline: true },
            { name: "🎭 Rôles", value: roles, inline: false },
            { name: "📅 Rejoint le", value: `<t:${Math.floor(member.joinedTimestamp! / 1000)}:F>`, inline: false }
        )
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
};
