/**
 * @class
 * @type {Talent}
 */
module.exports = class Talent{
    name;
    description;

    /**
     * @constructor
     * @param name
     * @param description
     */
    constructor({name, description}){
        this.name = name;
        this.description = description;
    }
};