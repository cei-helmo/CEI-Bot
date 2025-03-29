// Commande de tests
import { SlashCommandBuilder } from 'discord.js';

export const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Répond avec Pong !');

export const executePingCommand = async (interaction: any) => {
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong !');
    }
};
