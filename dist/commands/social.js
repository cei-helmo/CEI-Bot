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
exports.executeSocialCommand = exports.socialCommand = void 0;
const discord_js_1 = require("discord.js");
exports.socialCommand = new discord_js_1.SlashCommandBuilder()
    .setName('social')
    .setDescription("Affiche nos différents réseaux sociaux, incluant Facebook, Instagram et notre site web.");
const executeSocialCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const guildIcon = (_b = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.iconURL({ size: 512 })) !== null && _b !== void 0 ? _b : ""; // Récupère l'icône du serveur
    // Génère une couleur aléatoire
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const embed = new discord_js_1.EmbedBuilder()
        .setColor(`#${randomColor}`) // Applique la couleur aléatoire
        .setTitle("Nos différents réseaux sociaux")
        .setDescription("📢 Retrouvez-nous sur nos différentes plateformes !")
        .setThumbnail(guildIcon) // Affiche l'icône du serveur
        .addFields({ name: "Facebook", value: "[Suivez-nous ici](https://www.facebook.com/CEI.HELMo)", inline: false }, { name: "Instagram", value: "[Abonnez-vous ici](https://www.instagram.com/cei.helmo/e)", inline: false }, { name: "Notre Site Web", value: "[Abonnez-vous ici](https://cei.helmo.be)", inline: false })
        .setFooter({ text: "Merci de votre soutien !", iconURL: guildIcon });
    yield interaction.reply({ embeds: [embed] });
});
exports.executeSocialCommand = executeSocialCommand;
