import discord from "discord.js";

export default function(client) {
	client.on("interactionCreate", async (interaction) => {
		// Slash Command Handling
		if (interaction.isCommand()) {
			const cmd = client.slashCommands.get(interaction.commandName);
			if (!cmd)
				return interaction.reply({ content: "An error has occurred " });
			
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
				if(interaction.customId == "accountCreate"){
					const modal = new discord.Modal()
					.setCustomId('modal-accountCreate')
					.setTitle('Freeside Account Creation')
				const studentname = new discord.TextInputComponent()                        
					.setLabel("Student Email")
					.setStyle("SHORT")
					.setCustomId("studentemail")
				const firstActionRow = new discord.MessageActionRow().addComponents(studentname);
				modal.addComponents(firstActionRow);
				await interaction.showModal(modal);   
				}
		}
		
		
		// Modal Handling
		if(interaction.isModalSubmit) {
			if(interaction.customId === 'modal-accountCreate'){
				if(interaction.fields.getTextInputValue("studentemail").includes("@hull.ac.uk"))
				{
					const username = interaction.fields.getTextInputValue("studentemail")
					//// INSERT FANCY BLACK MAGIC HERE, EMAIL IS HELD AS `username`
					
					
					
					
					
					await interaction.deferReply({ ephemeral: true })
					interaction.followUp({ content: 'I have sent you a dm!', ephemeral: true })
					client.users.cache.get(interaction.user.id).send('Test dm')
				}
				else
				{
					await interaction.deferReply({ ephemeral: true })
					interaction.followUp({ content: 'That was not a valid student email, please try again.', ephemeral: true })
				}
	
			}  
		}
				
	});
}