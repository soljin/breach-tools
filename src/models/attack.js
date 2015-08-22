var Damage = require('./damage').Damage,
    Trigger = require('./trigger').Trigger;

var ResistType ={
    df: "Df",
    wp: "Wp"
};

var ResistDisplayName = {
    Df: "Defense",
    Wp: "Willpower"
};

var AttackTypes = {
    range: "range",
    close: "close",
    spell: "spell"
};

class Attack{
    type;
    skillKey;
    range;
    resist;
    damage;
    triggers;
    capacity;
    reload;


    /**
     *
     * @param type
     * @param skillKey
     * @param range
     * @param resist
     * @param damage
     * @param triggers
     * @param capacity
     * @param reload
     */
    constructor({type, skillKey, range, resist, damage, triggers, capacity, reload}){
        this.type = type;
        this.skillKey = skillKey;
        this.range = range;
        this.resist = resist == ResistType.df ? ResistType.df : ResistType.wp;
        this.damage = new Damage(damage);
        this.triggers = triggers.map(function(trigger){
            return new Trigger(trigger);
        });
        this.capacity = capacity;
        this.reload = reload;
    }
}

module.exports.Attack = Attack;