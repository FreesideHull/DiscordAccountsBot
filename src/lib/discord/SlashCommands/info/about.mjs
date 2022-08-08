"use strict";

import { Client, CommandInteraction, MessageEmbed} from "discord.js";

export default {
    name: "about",
    description: "returns information about the bot",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
        .setTitle("About")
        .setFooter({ text: `Called By: ${interaction.user.tag}`})
        .setTimestamp()
        .setColor('#e4b400')
        .addField(`GitHub repo`, `https://github.com/FreesideHull/DiscordAccountsBot`)
        .addField(`Privacy Policy`, `https://github.com/FreesideHull/DiscordAccountsBot/blob/main/docs/sysadmin/discordbot/Privacy%20Policy.md`)
        .addField(`TOS`, `https://github.com/FreesideHull/DiscordAccountsBot/blob/main/docs/sysadmin/discordbot/TOS.md`)
        .addField(`License`, `DiscordAccountsBot is released under the Apache 2.0 licence. The full license text is included in the [LICENSE](https://github.com/FreesideHull/DiscordAccountsBot/blob/main/LICENSE) file in this repository. Tldr legal have a great summary of the license if you're interested.`)
        interaction.reply({ embeds: [embed]});


    },
};