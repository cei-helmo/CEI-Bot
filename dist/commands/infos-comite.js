"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeInfoComiteCommand = exports.infoComite = void 0;
const discord_js_1 = require("discord.js");
exports.infoComite = new discord_js_1.SlashCommandBuilder()
    .setName('infos-comite')
    .setDescription("Affiche les informations d'un membre du comité.")
    .addUserOption(option => option.setName("pseudo")
    .setDescription("Mentionne un membre pour voir ses infos.")
    .setRequired(true));
const executeInfoComiteCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!interaction.guild) {
        return interaction.reply({ content: "Cette commande doit être utilisée dans un serveur.", ephemeral: true });
    }
    const user = (_a = interaction.options.get("pseudo")) === null || _a === void 0 ? void 0 : _a.user;
    if (!user) {
        return interaction.reply({ content: "Utilisateur non trouvé.", ephemeral: true });
    }
    // permet de s'assurer que le membre a bien le rôle comité sinon la commande renvoie une erreur
    const member = yield interaction.guild.members.fetch(user.id);
    const roleId = "989507387218067496";
    const role = interaction.guild.roles.cache.get(roleId);
    if (!role || !member.roles.cache.has(roleId)) {
        return interaction.reply({ content: `${user.username} n'est pas membre du comité.`, ephemeral: true });
    }
    const roles = member.roles.cache
        .filter(r => { var _a; return r.id !== ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.id); })
        .sort((a, b) => b.position - a.position)
        .map(r => r.toString())
        .join(", ") || "Aucun rôle";
    const embed = new discord_js_1.EmbedBuilder()
        .setColor("Aqua")
        .setTitle(`📌 Infos de **${user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}**`)
        .setThumbnail(user.displayAvatarURL())
        .addFields({ name: "👤 Pseudo", value: `**${user.tag.charAt(0).toUpperCase() + user.tag.slice(1).toLowerCase()}**`, inline: true }, { name: "🎭 Rôles", value: roles, inline: false }, { name: "📅 Rejoint le", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false })
        .setTimestamp();
    yield interaction.reply({ embeds: [embed] });
});
exports.executeInfoComiteCommand = executeInfoComiteCommand;
