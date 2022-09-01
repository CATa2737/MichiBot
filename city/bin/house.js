module.exports = class {
        constructor({owner}) {
                this.owner = {
                        name: owner.name,
                        id: owner.id,
                        money: 0,
                        inventory: []

                },
                this.cat = {
                        name: null,
                        state: {
                                love:   100,
                                fun:    100,
                                hunger: 100,
                                life:   100
                        },
                        xp: 0
                }
        }
        setName(name) {
                this.cat.name = name
                city.houses.set(this.owner.id, this)
                return this
        }
}
