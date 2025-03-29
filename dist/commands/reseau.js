"use strict";
// Commande qui permet d'afficher nos différents réseaux
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
exports.executeSocialCommand = exports.socialCommand = void 0;
const discord_js_1 = require("discord.js");
exports.socialCommand = new discord_js_1.SlashCommandBuilder()
    .setName('social')
    .setDescription("Affiche nos différents réseaux sociaux.");
const executeSocialCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand() || !interaction.guild)
        return;
    const serverLogo = interaction.guild.iconURL({ size: 1024 }) || "";
    const embed = new discord_js_1.EmbedBuilder()
        .setColor("Aqua")
        .setTitle("📢 Nos Réseaux Sociaux")
        .setDescription("Suivez-nous sur nos différents réseaux !")
        .addFields({ name: "📸 Instagram", value: "[Clique ici](https://www.instagram.com/cei.helmo/)", inline: true }, { name: "📘 Facebook", value: "[Clique ici](https://www.facebook.com/CEI.HELMo)", inline: true }, { name: "🌐 Site Web", value: "[Clique ici](https://cei.helmo.be)", inline: true })
        .setThumbnail(serverLogo)
        .setTimestamp();
    yield interaction.reply({ embeds: [embed] });
});
exports.executeSocialCommand = executeSocialCommand;
