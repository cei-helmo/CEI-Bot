import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { registerCommands } from './deploy-commands'; 
import { executePingCommand } from './commands/ping';  
import { executeInfoComiteCommand } from './commands/infos-comite';  
import { handleReady } from './event/ready';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const token = process.env.TOKEN as string;

client.once('ready', () => handleReady(client));


client.once(Events.ClientReady, () => {
    console.log('Bot prêt et connecté');
    registerCommands();
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    await executePingCommand(interaction);
    await executeInfoComiteCommand(interaction)
    //ajoute d'autre commandes ici
});

client.login(token);
