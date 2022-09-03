const BaseClient = require('./BaseClient');
const { Collection } = require('discord.js');

class Client extends BaseClient {
  constructor({owner}) {
    super();
    this.city = new Collection();
    this.city.houses = new Collection();
    this.owner = {
      name: owner.name,
      id: owner.id,
      money: 0,
      inventory: {
        medicine: 0,
        food: 0
      }
    }
    this.cat = {
      name: null,
      age: 0,
      state: {
        love:   100,
        fun:    100,
        hunger: 100,
        life:   100
      },
      emoji: null,
      level: {
        xp: 1,          //XP Actual
        xpLimit: 0,     //XP límite para que cuando xp llegue al número, suba el now
        now: 0          //Nivel actual
      }
    }
  }

  
}
