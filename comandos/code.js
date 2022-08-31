const { Interaction } = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");

module.exports = {
    name: "hab",
    description: "Buscar una habilidad y sus detalles",
    category: "Sekkai",
    usage: "hab <Nombre de la Habilidad>",
    aliases: "Ninguno",
    run: async (Client, message, args) => {
let filter = { id: { $eq:  message.member.id } };
      try {
      } catch (error) {
        message.channel.send("error: " + error).then(msj => {
          setTimeout(() => {
            msj.delete().catch(e => {
              return;
            });
          },10000)
        })
      }
    }
};
