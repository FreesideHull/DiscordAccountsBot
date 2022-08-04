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

        message.channel.send({ embeds: [embed], components: [row] })
    },
};
