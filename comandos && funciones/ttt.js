const { Interaction } = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");
const Shitpost = require('discord-shitpost');
const cats = require("./schemas/cats");
const ms = require("ms");
const tresenraya = require('tresenraya');

module.exports = {
    name: "hab",
    description: "Buscar una habilidad y sus detalles",
    category: "Sekkai",
    usage: "hab <Nombre de la Habilidad>",
    aliases: "Ninguno",
    run: async (Client, message, args) => {
let filter = { id: { $eq:  message.member.id } };
	    let player = await cats.findOne({id: message.member.id});
	    let opciones = {
	        fichas: [ '❌', '⭕' ],
	        jugadores: [ message.user.username,  player.cat.name]
	        }
	    const juego = new tresenraya.partida(opciones);

    }
}