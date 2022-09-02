const Discord = require("discord.js");
const db = require("megadb");
const admin = new db.crearDB("admin");
const TicTacToe = require('discord-tictactoe');
 
const levelup = require("../comandos && funciones/levelup");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply()
 
    const levelup = require("../comandos && funciones/levelup");
    levelup.run(Client,interaction);
    try {
    if(!player) return await interaction.editReply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`);
      
    const game = new TicTacToe({ language: 'es' });

    game.handleInteraction(interaction);
     
    if(player.cat.fun < 101) cats.sumar(`${interaction.member.id}.cat.fun`,1)
    game.on('win', async data => {
        if(data.winner === "Michi"){
            await interaction.editReply(`Miaaau B)(Jaja te gane)`)
        }

        if(data.winner === interaction.member.id){
            await interaction.editReply(`${(!player.cat.bismarck) ? "miau" : "*bocina*"} ${(!player.cat.bismarck) ? "miau" : "*bocina*"} miaaaau -w-(Rayos me ganaste ama, aqui tu money)\n \n**Tienes +50 de 💸`)
            cats.sumar(`${interaction.member.id}.money`,50);

            levelup(Client,interaction,args)
        }
      });    
    } catch (error) {
        let er = error.toString()
        if(er.startsWith("Error: Cannot find module './interactions")) return;
        console.log(error)
    }
}