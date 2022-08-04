const client = require("../index");
const discord = require("discord.js")

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
    
    // Button Handling
    if (interaction.isButton()) {
            if(interaction.customId == "codeOfConduct"){
                if(interaction.member.roles.cache.has("973646380771979304"))
                {
                    interaction.reply({ content: 'You already have agreed to the code of conduct!', ephemeral: true})
                } 
                else
                {
                    interaction.member.roles.add("973646380771979304")
                    await interaction.reply({ content: 'Thank you for agreeing to the code of conduct!\r\nYou can now access the rest of the server!', ephemeral: true});
                }
            }
    }


    // Modal Handling
    if(interaction.isModalSubmit) {
        if(interaction.customId === 'modal-paidmember'){
            const execchannel = client.channels.cache.get('981678376655921153')
    
            const embed = new discord.MessageEmbed()
                .setTitle("New Paid Member Request")
                .setColor('GREEN')
                .addField('Discord Tag', `${ interaction.user} <- Click to add role.`)
                .addField('Student Name', `${ interaction.fields.getTextInputValue("studentname")}`)
                .addField('Student Number',`${ interaction.fields.getTextInputValue("studentnumber")}`)
                .setDescription('https://hulluniunion.com/')
            const row = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId('deletemessage')
                    .setEmoji('')
                    .setLabel('Delete Message')
                    .setStyle('DANGER')
            )
            execchannel.send({embeds: [embed], components: [row] });
            await interaction.deferReply({ ephemeral: true })
            interaction.followUp({ content: 'Your request has been sent to execs!', ephemeral: true })
    
        }  
    }
    

});