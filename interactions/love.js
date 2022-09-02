const Discord = require("discord.js");
const db = require("megadb");
 
const ms = require("ms");

const cats = require("../schemas/cats");
const cd = new db.crearDB("cd");
 
module.exports.run = async (Client, interaction) => {
let hasCD = await cd.get(`${interaction.member.id}`);
if(hasCD) return;
let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
if(!player) return;
 await interaction.deferReply().catch(e => {
  console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
})
 
  const levelup = require("../comandos && funciones/levelup");
  levelup.run(Client,interaction);

        cd.set(`${interaction.member.id}`,true)
        player.cat.love= player.cat.love+5;
        return cats.findOneAndUpdate(filter,player).then( async e => {
          let {updateEmbed} = require("../commands");

          updateEmbed(interaction); 
           interaction.channel.send(`\`Espere 3 segundos...\``).then(msj => {
             setTimeout(() => {
               msj.delete()
             },3500)
            });
           await interaction.editReply(`**Ronronea y se le/a nota feliz**\n\n**Tienes +5 de :heart:**`).catch(e => {
             console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
           })
           setTimeout( () => {
               cd.set(`${interaction.member.id}`,false)
               interaction.deleteReply().catch(e => {
                 return;
               });
           },3500)
        });

}
