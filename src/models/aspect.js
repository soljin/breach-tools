class Aspect{
    displayName;
    value;
    name;

    /**
     *
     * @param displayName
     * @param value
     * @param name
     */
    constructor({displayName, value, name}){
        this.displayName = displayName;
        this.name = name ? name: displayName.toLowerCase();
        this.value = value;
    }
}

module.exports.Aspect = Aspect;