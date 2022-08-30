const Discord = require("discord.js");
const db = require("megadb");
 
const ms = require("ms");
const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
    
    interaction.message.delete()
}