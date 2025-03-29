import { Client } from 'discord.js';

export function handleReady(client: Client) {
    console.log(`Connecté en tant que ${client.user?.tag}`);
}
