class Damage {
    weak;
    medium;
    severe;

    /**
     * @param weak
     * @param medium
     * @param severe
     */
    constructor({weak = 1, medium = 2, severe = 3}){
        this.weak = weak;
        this.medium = medium;
        this.severe = severe;
    }
}

module.exports.Damage = Damage;