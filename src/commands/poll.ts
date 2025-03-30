import { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags, Message } from "discord.js";
import { setTimeout } from "timers";

export const pollCommand = new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Crée un sondage pour recueillir des avis.")
    .addStringOption((option: any) => 
        option.setName("question")
            .setDescription("La question du sondage")
            .setRequired(true)
    )
    .addStringOption((option: any) => 
        option.setName("options")
            .setDescription("Options séparées par une virgule (max 10)")
            .setRequired(true)
    )
    .addStringOption((option: any) => 
        option.setName("end_date")
            .setDescription("Date de fin du sondage (format: YYYY-MM-DD HH:mm)")
            .setRequired(false)
    );

export const executePollCommand = async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isCommand()) return;

    const question = interaction.options.getString("question");
    const options = interaction.options.getString("options")?.split(",").map((opt: string) => opt.trim());
    const endDateString = interaction.options.getString("end_date");

    if (!options || options.length < 2 || options.length > 10) {
        return interaction.reply({ content: "Veuillez fournir entre 2 et 10 options séparées par des virgules.", flags: MessageFlags.Ephemeral });
    }

    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    let pollMessage = `📊 **${question}**\n\n`;
    options.forEach((option: string, index: number) => {
        pollMessage += `${emojis[index]} ${option}\n`;
    });

    const reply = await interaction.reply({ content: pollMessage, fetchReply: true });

    // Ajouter des réactions une fois que le message a été envoyé
    for (let i = 0; i < options.length; i++) {
        await reply.react(emojis[i]);
    }

    // Si une date de fin est fournie, on programme la fin du sondage
    if (endDateString) {
        const endDate = new Date(endDateString);

        // Vérifier si la date est dans le futur
        if (isNaN(endDate.getTime()) || endDate <= new Date()) {
            return interaction.followUp({ content: "La date de fin doit être dans le futur. Veuillez entrer une date valide.", flags: MessageFlags.Ephemeral });
        }

        const timeRemaining = endDate.getTime() - new Date().getTime();

        // Planifier la fin du sondage
        setTimeout(async () => {
            const reactions = reply.reactions.cache;
            const counts = options.map((_, index) => reactions.get(emojis[index])?.count || 0);

            const maxVotes = Math.max(...counts);
            const winningOptionIndex = counts.indexOf(maxVotes);
            const winningOption = options[winningOptionIndex];
            const winningEmoji = emojis[winningOptionIndex];

            const pollResults = options.map((option, index) => `${emojis[index]} ${option}: ${counts[index]} votes`).join("\n");
            await reply.edit({ 
                content: `📊 **${question}**\n\n**Sondage terminé !**\n\n**Gagnant :** ${winningEmoji} ${winningOption}\n\nRésultats :\n${pollResults}` 
            });
        }, timeRemaining);
    }
};
