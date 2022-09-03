const Discord = require("discord.js");
const db = require("megadb");
const { SlashCommandBuilder } = require("@discordjs/builders");

const cats = require("../schemas/cats");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("backup")
    .setDescription("Con este comando podrán backupear antes del Gran Reinicio"),
    async run(Client, interaction){
        interaction.reply({ ephemeral: true, content: `Descuida aún no se borrará ningún michi, espera a que falten 3 dias antes del **Gran Reinicio** para respaldar tu michi ^^` })
    }
}