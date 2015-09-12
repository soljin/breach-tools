module.exports = class AsFpect{
    displayName;
    value;
    name;
    addRank;

    /**
     *
     * @param displayName
     * @param value
     * @param name
     * @param addRank
     */
    constructor({displayName, value, name, addRank = false}){
        this.displayName = displayName;
        this.name = name ? name: displayName.toLowerCase();
        this.value = value;
        this.addRank = addRank;
    }
};