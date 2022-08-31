const Discord = require("discord.js");
const db = require("megadb");
const { SlashCommandBuilder } = require("@discordjs/builders");

const admin = new db.crearDB("admin");
const ms = require("ms");
const cats = require("../schemas/cats");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("rat")
    .setDescription("Ayuda a tu michi a cazar ratones!"),
    async run(Client, interaction){
        let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
if(!player) interaction.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
  console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
});
 await interaction.deferReply().catch(e => {
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
        })
  
  if(!player) return await interaction.editReply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
  })
  
    let posCat = {
        y: Math.floor(Math.random() * 3),
        x: Math.floor(Math.random() * 3)
    }
    let posRat = {
        y: Math.floor(Math.random() * 3),
        x: Math.floor(Math.random() * 3)
    }

    admin.set(`${interaction.member.id}.ratGame.cat`,posCat)
const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setLabel(" ")
          .setCustomId(interaction.member.id+"1ratG")
          .setStyle("SECONDARY"))
        .addComponents(
          new Discord.MessageButton()
            .setLabel(" ")
            .setCustomId(interaction.member.id+"2ratG")
            .setStyle("SECONDARY"))
        .addComponents(
          new Discord.MessageButton()
          .setLabel(" ")
          .setCustomId(interaction.member.id+"3ratG")
          .setStyle("SECONDARY"));
const row1 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setLabel(" ")
          .setCustomId(interaction.member.id+"4ratG")
          .setStyle("SECONDARY"))
        .addComponents(
          new Discord.MessageButton()
            .setLabel(" ")
            .setCustomId(interaction.member.id+"5ratG")
            .setStyle("SECONDARY"))
        .addComponents(
          new Discord.MessageButton()
          .setLabel(" ")
          .setCustomId(interaction.member.id+"6ratG")
          .setStyle("SECONDARY"));
const row2 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setLabel(" ")
          .setCustomId(interaction.member.id+"7ratG")
          .setStyle("SECONDARY"))
        .addComponents(
          new Discord.MessageButton()
            .setLabel(" ")
            .setCustomId(interaction.member.id+"8ratG")
            .setStyle("SECONDARY"))
        .addComponents(
          new Discord.MessageButton()
          .setLabel(" ")
          .setCustomId(interaction.member.id+"9ratG")
          .setStyle("SECONDARY"));
const rows = [row,row1,row2]

let yRan = Math.floor(Math.random() * 3);
let xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🐛");
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🍁")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🐌")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🦟")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🪳")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🐹")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🌼")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🐜")

rows[posCat.y].components[posCat.x].setEmoji("🐱")
rows[posRat.y].components[posRat.x].setEmoji("🐭")

admin.set(`${interaction.member.id}.ratGame.rat`,posRat)
await interaction.editReply("Vamos "+player.cat.name+", atrapa la rata :D").catch(e => {
  console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
})
interaction.channel.send({components: rows}).then(msj => {setInterval(async () => {
posRat = {
  y: Math.floor(Math.random() * 3),
  x: Math.floor(Math.random() * 3)
};
let cat = await admin.get(`${interaction.member.id}.ratGame.cat`);

const row = new Discord.MessageActionRow()
.addComponents(
new Discord.MessageButton()
.setLabel(" ")
.setCustomId(interaction.member.id+"1ratG")
.setStyle("SECONDARY"))
.addComponents(
new Discord.MessageButton()
  .setLabel(" ")
  .setCustomId(interaction.member.id+"2ratG")
  .setStyle("SECONDARY"))
.addComponents(
new Discord.MessageButton()
.setLabel(" ")
.setCustomId(interaction.member.id+"3ratG")
.setStyle("SECONDARY"));
const row1 = new Discord.MessageActionRow()
.addComponents(
new Discord.MessageButton()
.setLabel(" ")
.setCustomId(interaction.member.id+"4ratG")
.setStyle("SECONDARY"))
.addComponents(
new Discord.MessageButton()
  .setLabel(" ")
  .setCustomId(interaction.member.id+"5ratG")
  .setStyle("SECONDARY"))
.addComponents(
new Discord.MessageButton()
.setLabel(" ")
.setCustomId(interaction.member.id+"6ratG")
.setStyle("SECONDARY"));
const row2 = new Discord.MessageActionRow()
.addComponents(
new Discord.MessageButton()
.setLabel(" ")
.setCustomId(interaction.member.id+"7ratG")
.setStyle("SECONDARY"))
.addComponents(
new Discord.MessageButton()
  .setLabel(" ")
  .setCustomId(interaction.member.id+"8ratG")
  .setStyle("SECONDARY"))
.addComponents(
new Discord.MessageButton()
.setLabel(" ")
.setCustomId(interaction.member.id+"9ratG")
.setStyle("SECONDARY"));
const rows = [row,row1,row2]

if(cat === posRat){
posRat = {
y: Math.floor(Math.random() * 3),
x: Math.floor(Math.random() * 3)
};
}

let yRan = Math.floor(Math.random() * 3);
let xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🐛");
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🍁")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🐌")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🦟")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🪳")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🐹")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🌼")
yRan = Math.floor(Math.random() * 3);
xRan = Math.floor(Math.random() * 3);
rows[yRan].components[xRan].setEmoji("🐜")

rows[posRat.y].components[posRat.x].setEmoji("🐭")
rows[cat.y].components[cat.x].setEmoji("🐱")

admin.set(`${interaction.member.id}.ratGame.rat`,posRat)

msj.edit({components: rows}).catch(e => {
return;
})
},2700)

setTimeout(() => msj.delete().catch(e => {
  return;
})
.then(m => m.channel.send("Juego acabado!")),45000)

}
)
    }
}