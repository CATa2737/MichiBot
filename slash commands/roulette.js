const Discord = require("discord.js");
const db = require("megadb");
const { SlashCommandBuilder } = require("@discordjs/builders");

const cats = require("../schemas/cats");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("roulette")
    .setDescription("Juega a la MICHI-RULETA y prueba tu suerte! .w."),
    async run(Client, interaction){
        const modal = new Discord.Modal()
    
            .setTitle("MICHIRULETA")
    
            .setCustomId("roullette-init");
    
    
        
    const bet = new Discord.TextInputComponent()
    
            .setCustomId("bet")
    
            .setPlaceholder("Cuanta plata vas a apostar? .w.")
            .setLabel("PON TU APUESTA AQUI")
            
    .setStyle("SHORT")
            
    .setRequired(true);
        
    
    
        const row = new Discord.MessageActionRow()
            .addComponents(bet);
            
    
    modal.addComponents(row)
    
        await interaction.showModal(modal)
    
    }
}