const discord = require("discord.js");

module.exports = {
    name: "welcome",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
            const embed = new discord.MessageEmbed()
            .setColor('#e4b400')
            .setTitle("Create a Freeside Account!")
            .setDescription(`Press the button below to start the process to create a freeside account!`)

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
