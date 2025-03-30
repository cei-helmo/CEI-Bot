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
function isPollError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        'code' in error);
}
function validatePollOptions(options) {
    if (!options.options || options.options.length < 2 || options.options.length > 10) {
        return {
            message: "Veuillez fournir entre 2 et 10 options séparées par des virgules.",
            code: 'INVALID_OPTIONS'
        };
    }
    if (options.endDate && (isNaN(options.endDate.getTime()) || options.endDate <= new Date())) {
        return {
            message: "La date de fin doit être dans le futur. Veuillez entrer une date valide.",
            code: 'INVALID_DATE'
        };
    }
    return null;
}
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
    try {
        if (!interaction.isCommand())
            return;
        const requiredRoleId = "989507387218067496";
        const member = interaction.member;
        if (!member ||
            !member.roles.cache.has("989507387218067496")) {
            return interaction.reply({
                content: "Vous devez avoir le rôle approprié pour utiliser cette commande.",
                flags: discord_js_1.MessageFlags.Ephemeral,
            });
        }
        const question = interaction.options.getString("question", true);
        const optionsString = interaction.options.getString("options");
        if (!optionsString) {
            return yield interaction.reply({
                content: "Veuillez fournir des options pour le sondage.",
                flags: discord_js_1.MessageFlags.Ephemeral
            });
        }
        const options = optionsString.split(",").map(opt => opt.trim());
        const endDateString = interaction.options.getString("end_date");
        const pollOptions = {
            question,
            options,
            endDate: endDateString ? new Date(endDateString) : undefined
        };
        const validationError = validatePollOptions(pollOptions);
        if (validationError) {
            return yield interaction.reply({
                content: validationError.message,
                flags: discord_js_1.MessageFlags.Ephemeral
            });
        }
        const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
        const formattedPoll = `**${question}**\n\n${options.map((option, index) => `${emojis[index]} ${option}`).join("\n")}`;
        const pollMessage = yield interaction.reply({ content: formattedPoll, fetchReply: true });
        for (const emoji of emojis.slice(0, options.length)) {
            yield pollMessage.react(emoji).catch(error => {
                console.error(`Failed to add reaction ${emoji}:`, error);
            });
        }
    }
    catch (error) {
        console.error('Unexpected error in poll command:', error);
        try {
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({
                    content: "Une erreur inattendue s'est produite. Veuillez réessayer.",
                    flags: discord_js_1.MessageFlags.Ephemeral
                });
            }
            else {
                yield interaction.reply({
                    content: "Une erreur inattendue s'est produite. Veuillez réessayer.",
                    flags: discord_js_1.MessageFlags.Ephemeral
                });
            }
        }
        catch (responseError) {
            console.error('Failed to notify user of error:', responseError);
        }
    }
});
exports.executePollCommand = executePollCommand;
