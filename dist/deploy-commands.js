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
exports.registerCommands = registerCommands;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const ping_1 = require("./commands/ping");
const infos_comite_1 = require("./commands/infos-comite");
dotenv_1.default.config();
const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;
const rest = new discord_js_1.REST({ version: '10' }).setToken(token);
// Enregistrer les commandes slash
function registerCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        const commands = [
            ping_1.pingCommand.toJSON(),
            infos_comite_1.infoComite.toJSON(),
        ];
        try {
            console.log('Démarrage de l\'enregistrement des commandes slash...');
            // Enregistrer chaque commande individuellement
            for (const command of commands) {
                yield rest.put(discord_js_1.Routes.applicationCommands(clientId), { body: [command] });
                console.log(`====Commande slash "${command.name}" enregistrée avec succès !====`);
            }
            console.log('Toutes les commandes ont été enregistrées avec succès !');
        }
        catch (error) {
            console.error('Erreur lors de l\'enregistrement des commandes slash:', error);
        }
    });
}
