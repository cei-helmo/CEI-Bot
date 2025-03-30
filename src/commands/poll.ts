import { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags, Message, SlashCommandStringOption, MessageReaction, Collection } from "discord.js";
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

async function validatePollExecution(
    reply: Message<boolean>,
    pollOptions: PollOptions,
    emojis: readonly string[]
): Promise<boolean> {
    try {
        // Validate initial poll message format
        const initialContent = reply.content;
        const hasQuestion = initialContent.includes(pollOptions.question);
        const hasAllOptions = pollOptions.options.every(option => 
            initialContent.includes(option)
        );
        
        if (!hasQuestion || !hasAllOptions) {
            console.error('Poll message validation failed: Missing question or options');
            return false;
        }
        
        // Validate reactions are set up correctly
        const reactions = reply.reactions.cache;
        const hasAllReactions = pollOptions.options.every((_, index) => 
            reactions.has(emojis[index])
        );
        
        if (!hasAllReactions) {
            console.error('Poll reactions validation failed: Missing reactions');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Poll validation error:', error);
        return false;
    }
}

interface PollResult {
    counts: number[];
    winningIndices: number[];
    maxVotes: number;
}

function formatPollResults(
    question: string,
    options: string[],
    emojis: readonly string[],
    counts: number[],
    winningIndices: number[]
): string {
    const pollResults = options.map((option, index) => {
        const voteCount = counts[index];
        return `${emojis[index]} ${option}: ${voteCount} ${voteCount === 1 ? 'vote' : 'votes'}`;
    }).join("\n\n");
    
    let resultHeader = `**${question}**\n\n**Sondage terminé !**\n\n`;
    if (winningIndices.length > 1) {
        resultHeader += "**Égalité entre :**\n" + winningIndices.map(index => 
            `${emojis[index]} ${options[index]}`
        ).join("\n") + "\n\n";
    } else {
        const winningIndex = winningIndices[0];
        resultHeader += `**Gagnant :** ${emojis[winningIndex]} ${options[winningIndex]}\n\n`;
    }
    
    return `${resultHeader}Résultats :\n${pollResults}`;
}

async function calculatePollResult(reactions: Collection<string, MessageReaction>, options: string[], emojis: readonly string[]): Promise<PollResult> {
    const counts = options.map((_, index) => {
        const reaction = reactions.get(emojis[index]);
        if (!reaction) return 0;
        return reaction.users.cache.filter(user => !user.bot).size;
    });
    
    const maxVotes = Math.max(...counts);
    const winningIndices = counts.reduce((indices, count, index) => {
        if (count === maxVotes) indices.push(index);
        return indices;
    }, [] as number[]);
    
    return { counts, winningIndices, maxVotes };
}

async function collectPollReactions(reactions: Collection<string, MessageReaction>): Promise<void> {
    await Promise.all([...reactions.values()].map(async reaction => {
        let users = await reaction.users.fetch();
        while (users.size === 100) {
            const lastUser = users.last();
            if (!lastUser) break;
            users = await reaction.users.fetch({ after: lastUser.id });
        }
    }));
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

        const question = interaction.options.getString("question", true); // true makes it required

        const optionsString = interaction.options.getString("options");
        if (!optionsString) {
            return await interaction.reply({ 
                content: "Veuillez fournir des options pour le sondage.", 
                flags: MessageFlags.Ephemeral 
            });
        }

        const options = optionsString.split(",").map(opt => opt.trim());
        const endDateString = interaction.options.getString("end_date");
        
        // Prepare poll options for validation
        const pollOptions: PollOptions = {
            question,
            options,
            endDate: endDateString ? new Date(endDateString) : undefined
        };
        
        // Validate poll options
        const validationError = validatePollOptions(pollOptions);
        if (validationError) {
            return await interaction.reply({ 
                content: validationError.message, 
                flags: MessageFlags.Ephemeral 
            });
        }

        // Create the formatted poll
        const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"] as const;
        const formattedPoll = `**${question}**\n\n${options.map((option, index) => 
            `${emojis[index]} ${option}`).join("\n")}`;

        // Send the poll
        const pollMessage = await interaction.reply({ content: formattedPoll, fetchReply: true });

        // Add reactions
        for (const emoji of emojis.slice(0, options.length)) {
            await pollMessage.react(emoji).catch(error => {
                console.error(`Failed to add reaction ${emoji}:`, error);
            });
        }

        // Validate poll setup
        const isValid = await validatePollExecution(pollMessage, pollOptions, emojis);
        if (!isValid) {
            await interaction.followUp({
                content: "Le sondage n'a pas pu être configuré correctement. Veuillez réessayer.",
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        // Save the reply for later reference
        const reply = pollMessage;

        // If an end date was provided, schedule the poll to end at that time
        if (pollOptions.endDate) {
            const timeRemaining: number = pollOptions.endDate.getTime() - new Date().getTime();

            // Planifier la fin du sondage

            // Planifier la fin du sondage
            setTimeout(async () => {
                try {
                    // Fetch the message again to ensure we have the latest data
                    let pollMessage: Message;
                    try {
                        pollMessage = await reply.fetch();
                    } catch (fetchError) {
                        console.error('Failed to fetch poll message:', fetchError);
                        // If we can't fetch the message, we can't update it
                        return;
                    }
                    
                    const reactions = pollMessage.reactions.cache;
                    
                    // Fetch all reaction users completely
                    try {
                        await collectPollReactions(reactions);
                    } catch (reactionsError) {
                        console.error('Failed to collect poll reactions:', reactionsError);
                        // Continue with what we have
                    }
                    
                    // Calculate poll results
                    const { counts, winningIndices } = await calculatePollResult(reactions, options, emojis);
                    
                    // Format the poll results
                    const formattedResults = formatPollResults(question, options, emojis, counts, winningIndices);

                    try {
                        await pollMessage.edit({
                            content: formattedResults
                        });
                    } catch (editError) {
                        console.error('Error updating poll results:', editError);
                        
                        const updateError: PollError = {
                            message: "Failed to update poll results",
                            code: 'UPDATE_FAILED'
                        };
                        
                        try {
                            await reply.edit({
                                content: formattedResults
                            });
                        } catch (fallbackError) {
                            console.error('Failed to update poll results with fallback method:', fallbackError);
                            throw updateError;
                        }
                    }
                } catch (error) {
                    console.error('Error finalizing poll:', error);
                    // If we can't reach the interaction or message anymore, we can't notify
                    // But we log the error for debugging
                }
            }, timeRemaining);
        }
    } catch (error) {
        console.error('Unexpected error in poll command:', error);
        
        // Try to respond to user if we can
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
