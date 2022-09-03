const { Interaction } = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");
const cats = require("../schemas/cats");
const bedroom = new db.crearDB("bedroom");

module.exports = {
    name: "cat",
    description: "Este comando se utiliza para ver el michi de alguien mas ^^",
    run: async (Client, message, args) => {
        let player = await cats.findOne({ id: { $eq:  message.member.id } })
        const inBedroom = await bedroom.get("sleeping");
        if(inBedroom.includes(player.cat.name)) {
            bedroom.extract("sleeping",player.cat.name)
            .then(() => {
                message.reply("**tu michi se despertó :D**")
              })
            return
        }
        bedroom.push(`sleeping`,player.cat.name)
        .then(() => {
            message.reply("**tu michi se fue a mimir💤**")
        })
    }
}