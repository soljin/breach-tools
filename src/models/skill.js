/**
 * @class
 * @type {Skill}
 */
module.exports = class Skill{
    type;
    name;
    aspect;
    description;
    rank;
    actionValue;

    /**
     * @constructor
     * @param type
     * @param name
     * @param aspect
     * @param description
     * @param rank
     * @param aspects
     */
    constructor({type, name, aspect, description, rank}, aspects){
        this.type = type;
        this.name = name;
        this.aspect = aspect;
        this.description = description;
        this.rank = rank;
        this.actionValue = aspects[aspect.toLowerCase()].value + rank;
    }
};
