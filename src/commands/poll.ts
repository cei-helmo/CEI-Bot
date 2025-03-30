import { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags, Message, SlashCommandStringOption, MessageReaction, Collection, GuildMember } from "discord.js";
import { setTimeout } from "timers";

type PollError = {
    message: string;
    code: 'INVALID_OPTIONS' | 'INVALID_DATE' | 'UPDATE_FAILED';
};

function isPollError(error: unknown): error is PollError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        'code' in error
    );
}

interface PollOptions {
    question: string;
    options: string[];
    endDate?: Date;
}

function validatePollOptions(options: PollOptions): PollError | null {
    if (!options.options || options.options.length < 2 || options.options.length > 10) {
        return {
            message: "Veuillez fournir entre 2 et 10 options séparées par des virgules.",
            code: 'INVALID_OPTIONS'
        };
    }
    
    if (options.endDate && (isNaN(options.endDate.getTime()) || options.endDate <= new Date())) {
        return {
            message: "La date de fin doit être dans le futur. Veuillez entrer une date valide.",
            code: 'INVALID_DATE'
        };
    }
    
    return null;
}

export const pollCommand = new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Crée un sondage pour recueillir des avis.")
    .addStringOption((option: SlashCommandStringOption) => 
        option.setName("question")
            .setDescription("La question du sondage")
            .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) => 
        option.setName("options")
            .setDescription("Options séparées par une virgule (max 10)")
            .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) => 
        option.setName("end_date")
            .setDescription("Date de fin du sondage (format: YYYY-MM-DD HH:mm)")
            .setRequired(false)
    );

export const executePollCommand = async (interaction: ChatInputCommandInteraction) => {
    try {
        if (!interaction.isCommand()) return;

        const requiredRoleId = "989507387218067496";
        const member = interaction.member as GuildMember;
        if (
            !member ||
            !member.roles.cache.has("989507387218067496")
        ) {
            return interaction.reply({
                content: "Vous devez avoir le rôle approprié pour utiliser cette commande.",
                flags: MessageFlags.Ephemeral,
            });
        }



        const question = interaction.options.getString("question", true);
        const optionsString = interaction.options.getString("options");
        if (!optionsString) {
            return await interaction.reply({ 
                content: "Veuillez fournir des options pour le sondage.", 
                flags: MessageFlags.Ephemeral 
            });
        }

        const options = optionsString.split(",").map(opt => opt.trim());
        const endDateString = interaction.options.getString("end_date");
        
        const pollOptions: PollOptions = {
            question,
            options,
            endDate: endDateString ? new Date(endDateString) : undefined
        };
        
        const validationError = validatePollOptions(pollOptions);
        if (validationError) {
            return await interaction.reply({ 
                content: validationError.message, 
                flags: MessageFlags.Ephemeral 
            });
        }

        const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"] as const;
        const formattedPoll = `**${question}**\n\n${options.map((option, index) => 
            `${emojis[index]} ${option}`).join("\n")}`;

        const pollMessage = await interaction.reply({ content: formattedPoll, fetchReply: true });

        for (const emoji of emojis.slice(0, options.length)) {
            await pollMessage.react(emoji).catch(error => {
                console.error(`Failed to add reaction ${emoji}:`, error);
            });
        }

    } catch (error) {
        console.error('Unexpected error in poll command:', error);
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "Une erreur inattendue s'est produite. Veuillez réessayer.",
                    flags: MessageFlags.Ephemeral
                });
            } else {
                await interaction.reply({
                    content: "Une erreur inattendue s'est produite. Veuillez réessayer.",
                    flags: MessageFlags.Ephemeral
                });
            }
        } catch (responseError) {
            console.error('Failed to notify user of error:', responseError);
        }
    }
};
