"use strict";

import { Client, CommandInteraction} from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    ...new SlashCommandBuilder()
        .setName('packages')
        .setDescription('Install packages')
        .addStringOption((option) => option
            .setName('packages')
            .setDescription("the packages you'd like to install, seperate with a comma and space")
            .setRequired(true)
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const packagesInputted = interaction.options.getString("packages")
        const packagesarray = packagesInputted.split(', ')
        console.log(packagesarray)
        interaction.reply(`You inputted: ${packagesarray}`)



    },
};