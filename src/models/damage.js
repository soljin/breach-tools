class Damage {
    weak;
    medium;
    strong;

    /**
     * @param weak
     * @param medium
     * @param strong
     */
    constructor({weak = 1, medium = 2, strong = 3}){
        this.weak = weak;
        this.medium = medium;
        this.strong = strong;
    }
}

module.exports.Damage = Damage;