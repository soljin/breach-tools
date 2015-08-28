var Damage = require('./damage').Damage,
    Trigger = require('./trigger').Trigger;

var ResistType = module.exports.ResistType ={
    df: "Df",
    wp: "Wp"
};

var ResistDisplayName = module.exports.ResistDisplayName = {
    Df: "Defense",
    Wp: "Willpower"
};

var AttackTypes = module.exports.AttackTypes = {
    range: "range",
    close: "close",
    spell: "spell"
};

class Attack{
    name;
    actionPoints;
    suits;
    type;
    skillKey;
    range;
    resist;
    damage;
    triggers;
    capacity;
    reload;
    effect;

    /**
     *
     * @param type
     * @param skillKey
     * @param capacity
     * @param reload
     * @param range
     * @param resist
     * @param name
     * @param suits
     * @param triggers
     * @param effect
     * @param actionPoints
     * @param damage
     */
    constructor({type, skillKey, capacity, reload, range, resist, name = "Attack Name", suits = [], triggers = [], effect = 'Enter attack effect.', actionPoints = 1, damage = {weak:1,medium:2,severe:3}}){
        var defaultSkillTypes = {
            range:"pistol",
            close:"melee",
            spell:"sorcery"
        };

        this.name = name;
        this.type = type;
        this.actionPoints = actionPoints;
        this.suits = suits;
        this.skillKey = skillKey ? skillKey : defaultSkillTypes[type];
        this.range = range ? range : (type == AttackTypes.close) ? 3 : 12;
        this.resist = resist ? (resist == ResistType.df ? ResistType.df : ResistType.wp) : (type == AttackTypes.spell ? ResistType.wp : ResistType.df);
        this.damage = new Damage(damage);
        this.triggers = triggers.map(function(trigger){
            return new Trigger(trigger);
        });
        this.capacity = capacity ? capacity : (type == AttackTypes.close ? null : 6);
        this.reload = reload ? reload : (type == AttackTypes.close ? null : 2);
        this.effect = effect;
    }
}

module.exports.Attack = Attack;