import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { pingCommand } from './commands/ping'; 
import { infoComite } from './commands/infos-comite';

dotenv.config();

const clientId = process.env.CLIENT_ID as string;
const token = process.env.TOKEN as string;
const rest = new REST({ version: '10' }).setToken(token);

// Enregistrer les commandes slash
export async function registerCommands() {
    const commands = [
        pingCommand.toJSON(),
        infoComite.toJSON(),
    ];

    try {
        console.log('Démarrage de l\'enregistrement des commandes slash...');
        
        // Enregistrer chaque commande individuellement
        for (const command of commands) {
            await rest.put(Routes.applicationCommands(clientId), { body: [command] });
            console.log(`====Commande slash "${command.name}" enregistrée avec succès !====`);
        }

        console.log('Toutes les commandes ont été enregistrées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des commandes slash:', error);
    }
}
