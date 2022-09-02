const Discord = require("discord.js");
const db = require("megadb");
const { SlashCommandBuilder } = require("@discordjs/builders");

const cats = require("../schemas/cats");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("community")
    .setDescription("Novedades de la comunidad"),
    async run(Client, interaction){
        
    }
}