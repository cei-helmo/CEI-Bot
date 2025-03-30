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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const deploy_commands_1 = require("./deploy-commands");
const ping_1 = require("./commands/ping");
const infos_comite_1 = require("./commands/infos-comite");
const ready_1 = require("./event/ready");
const poll_1 = require("./commands/poll");
const social_1 = require("./commands/social");
const list_1 = require("./commands/list");
dotenv_1.default.config();
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const token = process.env.TOKEN;
client.once('ready', () => (0, ready_1.handleReady)(client));
client.once(discord_js_1.Events.ClientReady, () => {
    console.log('Bot prêt et connecté');
    (0, deploy_commands_1.registerCommands)();
});
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    switch (interaction.commandName) {
        case 'ping':
            yield (0, ping_1.executePingCommand)(interaction);
            break;
        case 'infos-comite':
            yield (0, infos_comite_1.executeInfoComiteCommand)(interaction);
            break;
        case 'poll':
            yield (0, poll_1.executePollCommand)(interaction);
        case 'social':
            yield (0, social_1.executeSocialCommand)(interaction);
        case 'list':
            yield (0, list_1.executeListCommand)(interaction);
            break;
    }
}));
client.login(token);
