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
exports.executePollCommand = exports.pollCommand = void 0;
const discord_js_1 = require("discord.js");
const timers_1 = require("timers");
exports.pollCommand = new discord_js_1.SlashCommandBuilder()
    .setName("poll")
    .setDescription("Crée un sondage pour recueillir des avis.")
    .addStringOption((option) => option.setName("question")
    .setDescription("La question du sondage")
    .setRequired(true))
    .addStringOption((option) => option.setName("options")
    .setDescription("Options séparées par une virgule (max 10)")
    .setRequired(true))
    .addStringOption((option) => option.setName("end_date")
    .setDescription("Date de fin du sondage (format: YYYY-MM-DD HH:mm)")
    .setRequired(false));
const executePollCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!interaction.isCommand())
        return;
    const question = interaction.options.getString("question");
    const options = (_a = interaction.options.getString("options")) === null || _a === void 0 ? void 0 : _a.split(",").map((opt) => opt.trim());
    const endDateString = interaction.options.getString("end_date");
    if (!options || options.length < 2 || options.length > 10) {
        return interaction.reply({ content: "Veuillez fournir entre 2 et 10 options séparées par des virgules.", flags: discord_js_1.MessageFlags.Ephemeral });
    }
    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    let pollMessage = `📊 **${question}**\n\n`;
    options.forEach((option, index) => {
        pollMessage += `${emojis[index]} ${option}\n`;
    });
    const reply = yield interaction.reply({ content: pollMessage, fetchReply: true });
    // Ajouter des réactions une fois que le message a été envoyé
    for (let i = 0; i < options.length; i++) {
        yield reply.react(emojis[i]);
    }
    // Si une date de fin est fournie, on programme la fin du sondage
    if (endDateString) {
        const endDate = new Date(endDateString);
        // Vérifier si la date est dans le futur
        if (isNaN(endDate.getTime()) || endDate <= new Date()) {
            return interaction.followUp({ content: "La date de fin doit être dans le futur. Veuillez entrer une date valide.", flags: discord_js_1.MessageFlags.Ephemeral });
        }
        const timeRemaining = endDate.getTime() - new Date().getTime();
        // Planifier la fin du sondage
        (0, timers_1.setTimeout)(() => __awaiter(void 0, void 0, void 0, function* () {
            const reactions = reply.reactions.cache;
            const counts = options.map((_, index) => { var _a; return ((_a = reactions.get(emojis[index])) === null || _a === void 0 ? void 0 : _a.count) || 0; });
            const maxVotes = Math.max(...counts);
            const winningOptionIndex = counts.indexOf(maxVotes);
            const winningOption = options[winningOptionIndex];
            const winningEmoji = emojis[winningOptionIndex];
            const pollResults = options.map((option, index) => `${emojis[index]} ${option}: ${counts[index]} votes`).join("\n");
            yield reply.edit({
                content: `📊 **${question}**\n\n**Sondage terminé !**\n\n**Gagnant :** ${winningEmoji} ${winningOption}\n\nRésultats :\n${pollResults}`
            });
        }), timeRemaining);
    }
});
exports.executePollCommand = executePollCommand;
