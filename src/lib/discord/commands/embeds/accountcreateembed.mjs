"use strict";

import { Client, MessageActionRow, MessageEmbed, MessageButton } from "discord.js";

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
			console.log(`DEBUG:embed`, MessageEmbed);
            const embed = new MessageEmbed()
                .setColor('#e4b400')
                .setTitle("Freeside account configuration")
                .setDescription(`Select a button below to configure your account.`)
                .addField(`Create Account`, `Create an account and recieve the freeside role!`)
                .addField(`Link Account`, `Link your current account with discord.`)
                .addField(`Reset Password`, `Reset the password of the account associated with your discord.`)
                .addField('Disclaimer', `
                This bot requires you to enter your student email and will only accept valid '@hull.ac.uk' emails. If you enter a non-valid email, you will be prompted to try again!\r\n
                The email you enter will be used to create your Freeside username.
                `)

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('accountCreate')
                    .setLabel('Create Account')
                    .setStyle('SUCCESS')
            )
			.addComponents(
                new MessageButton()
                .setLabel('Reset Password')
                .setStyle('DANGER')
                .setCustomId('resetPassword')
            )
            .addComponents(
                new MessageButton()
                .setLabel('Link Account')
                .setStyle('PRIMARY')
                .setCustomId('linkAccount')
            )
            

        message.channel.send({ embeds: [embed], components: [row] })
    },
};
