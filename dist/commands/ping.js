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
exports.executePingCommand = exports.pingCommand = void 0;
// Commande de tests
const discord_js_1 = require("discord.js");
exports.pingCommand = new discord_js_1.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Répond avec Pong !');
const executePingCommand = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.commandName === 'ping') {
        yield interaction.reply('Pong !');
    }
});
exports.executePingCommand = executePingCommand;
