class Trigger{
    suit;
    name;
    description;

    /**
     * @param suit
     * @param name
     * @param description
     */
    constructor({suit, name, description}){
        this.suit = suit;
        this.name = name;
        this.description = description;
    }
}

module.exports.Trigger = Trigger;