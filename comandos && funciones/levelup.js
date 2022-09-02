const db = require("megadb");
const cats = require("../schemas/cats");
 

module.exports = {
    name: "hab",
    description: "Buscar una habilidad y sus detalles",
    category: "Sekkai",
    usage: "hab <Nombre de la Habilidad>",
    aliases: "Ninguno",
    run: async (Client, message) => {
        let filter = { id: { $eq:  message.member.id } };
        let player = await cats.findOne(filter);

    let xp = player.cat.xp;
    let xpLimit = player.cat.xpLimit;
    let newXpLimit = xpLimit*1.6;

    player.cat.xp = player.cat.xp+50;
    await cats.findOneAndUpdate(filter,player);

    if(xp + 51 > xpLimit){
        let level = player.cat.level;
        level++
        message.channel.send(`Tu michi ha subido a **Nivel ${level}**! :D`)
        message.channel.send("**El :heart: sube al 100%**")

        player.cat.love = 100;
        await cats.findOneAndUpdate(filter,player);
        player.cat.level++
        await cats.findOneAndUpdate(filter,player);
        player.cat.xpLimit = newXpLimit
        player.cat.xp = 0;
        await cats.findOneAndUpdate(filter,player);
    }
    }
}