"use strict";

import discord from "discord.js";

export default {
    name: "embed",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
			console.log(`DEBUG:embed`, discord);
            const embed = new discord.MessageEmbed()
            .setColor('#e4b400')
            .setTitle("Create a Freeside Account!")
            .setDescription(`Press the button below to start the process to create a freeside account!`)
            .addField('Disclaimer', `
            This bot requires you to enter your student email and will only accept valid '@hull.ac.uk' emails. If you enter a non-valid email, you will be prompted to try again!\r\n
            The email you enter will be used to create your Freeside username.
            `)

            const row = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                .setCustomId('accountCreate')
                .setLabel('Create an account')
                .setStyle('PRIMARY')
            )

        message.channel.send({ embeds: [embed], components: [row] })
    },
};
