const { Schema, model } = require("mongoose");

const catsSchema = new Schema({
        id: {type: String, required: true},
        cat: {
            name: {type: String, required: true},
            emoji: {type: String, default: ":cat:"},
            edad: {type: Date, default: Date.now},
            life: {type: Number, default: 100},
            food: {type: Number, default: 100},
            fun: {type: Number, default: 100},
            love: {type: Number, default: 100},
            level: {type: Number, default: 1},
            xp: {type: Number, default: 0},
            xpLimit: {type: Number, default: 100}
          },
          money: {type: Number, default: 0},
          inv: {type: Object, default: {}},
          noSub: {type: Array, default: []},
          viewShit: {type: Boolean, default: false}
});

module.exports = model(`cats`,catsSchema)
