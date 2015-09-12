module.exports = class Trigger{
    suits;
    name;
    description;

    /**
     * @param name
     * @param description
     * @param suits
     */
    constructor({name = "Trigger name", description = "Please enter the trigger description here", suits = []}){
        this.suits = suits;
        this.name = name;
        this.description = description;
    }
};