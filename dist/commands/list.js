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
exports.executeListCommand = exports.listCommand = void 0;
const discord_js_1 = require("discord.js");
// Commande /list
exports.listCommand = new discord_js_1.SlashCommandBuilder()
    .setName("list")
    .setDescription("Répertorie toutes les commandes disponibles");
// Fonction d'exécution de la commande /list
const executeListCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!interaction.isCommand())
            return;
        const { commandName } = interaction;
        if (commandName === "list") {
            // Récupérer toutes les commandes enregistrées
            const commands = yield ((_a = interaction.client.application) === null || _a === void 0 ? void 0 : _a.commands.fetch());
            if (!commands || commands.size === 0) {
                return interaction.reply({
                    content: "Aucune commande n'a été trouvée.",
                    flags: discord_js_1.MessageFlags.Ephemeral,
                });
            }
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            // Créer l'embed pour afficher les commandes
            const embed = new discord_js_1.EmbedBuilder()
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
                flags: discord_js_1.MessageFlags.Ephemeral,
            });
        }
    }
    catch (error) {
        console.error("Erreur lors de l'exécution de la commande /list :", error);
        try {
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({
                    content: "Une erreur inattendue s'est produite. Veuillez réessayer.",
                    flags: discord_js_1.MessageFlags.Ephemeral,
                });
            }
            else {
                yield interaction.reply({
                    content: "Une erreur inattendue s'est produite. Veuillez réessayer.",
                    flags: discord_js_1.MessageFlags.Ephemeral,
                });
            }
        }
        catch (responseError) {
            console.error("Échec de la notification de l'utilisateur :", responseError);
        }
    }
});
exports.executeListCommand = executeListCommand;
