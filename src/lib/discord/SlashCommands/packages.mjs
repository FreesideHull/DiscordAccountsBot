"use strict";

import { Client, CommandInteraction} from "discord.js";

export default {
    name: "packages",
    // This may be wrong  - Kieran
    description: "Gets the input for packages to install",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.reply("test")
    },
};