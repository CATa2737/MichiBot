const Discord = require("discord.js");
const db = require("megadb");
 
const admin = new db.crearDB("admin");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({ id: { $eq:  interaction.member.id } });
 await interaction.deferReply().catch(e => {
  console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
})
   
  Client.levelupCheck(interaction);
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageSelectMenu()
            .setCustomId(`${interaction.member.id}minigames`)
            .setPlaceholder('¿A que jugaremos? :3')
            .setMaxValues(1)
            .addOptions([{
              label: `MICHIRULETA`,
              emoji: `💸`,
              description: `Haz una apuesta en la ruleta del casino al estilo michibot y unbelievaboat! :D`,
              value: `${interaction.member.id}roullette`
              },{
              label: `Carreras de Michis!`,
              emoji: `🚗`,
              description: `Haz una carrera con el michi de alguien mas! `,
              value: `${interaction.member.id}race`
              },
              {
              label: `Pesca con ${player.cat.name}!`,
              emoji: `🐟`,
              description: `Pesca relajada con ${player.cat.name}`,
              value: `${interaction.member.id}fish`
            },
            {
              label: `Piedras, Papel, Tijeras!`,
              emoji: `✂️`,
              description: `Jugar con ${player.cat.name} al Piedras, papel, tijeras!`,
              value: `${interaction.member.id}rps`
            },
            {
              label: `Ajedrez Moral!`,
              emoji: `♟️`,
              description: `Jugar con ${player.cat.name} al Ajedrez!`,
              value: `${interaction.member.id}chess`
            },
            {
              label: `Caza la rata!`,
              emoji: `🐭`,
              description: `Ayuda a ${player.cat.name} a cazar!`,
              value: `${interaction.member.id}rat`
            },
            {
              label: `Memes!`,
              emoji: `💩`,
              description: `Mira memes con ${player.cat.name} y gana dinero -w-! *Memes de muy mal gusto*`,
              value: `${interaction.member.id}shitpost`
            }])
    );

    await interaction.editReply({content: `${(!player.cat.bismarck) ? "miau" : "*bocina*"}  .w.(Ama, ¿sabias que puedes escribir "/" y el nombre del juego para acceder a un juego especifico de forma rapida?, excepto con los memes)`, components: [row]}).then((msj) => {
        setTimeout(async () => {
        await interaction.editReply({components: []}).catch(e => {
            return;
          });
        },60000)
        })
        .catch(e => {
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
        });
}