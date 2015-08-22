class Talent{
    name;
    description;

    /**
     * @param name
     * @param description
     */
    constructor({name, description}){
        this.name = name;
        this.description = description;
    }
}

module.exports.Talent = Talent;