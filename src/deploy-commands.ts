import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { pingCommand } from './commands/ping'; 
import { infoComite } from './commands/infos-comite';
import { pollCommand } from './commands/poll';
import { socialCommand } from './commands/social';
import { listCommand } from './commands/list';

dotenv.config();

const clientId = process.env.CLIENT_ID as string;
const token = process.env.TOKEN as string;
const rest = new REST({ version: '10' }).setToken(token);

// Enregistrer les commandes slash
export async function registerCommands() {
   
    const commands = [
        pingCommand.toJSON(),
        infoComite.toJSON(),
        pollCommand.toJSON(),
        socialCommand.toJSON(),
        listCommand.toJSON()
    ];

    try {
        console.log('Démarrage de l\'enregistrement des commandes slash...');
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('Toutes les commandes ont été enregistrées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des commandes slash:', error);
    }
}
