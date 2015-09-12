var Aspects = require('./aspects'),
    Attack = require('./attack').Attack,
    /**
     * @type {Skill|exports|module.exports}
     */
    Skill = require('./skill'),
    /**
     *
     * @type {Talent|exports|module.exports}
     */
    Talent = require('./talent'),
    DerivedAspects = require('./derivedAspects');

module.exports = class Character {
    aspects;
    skills;
    attacks;
    talents;

    constructor({aspects = {}, skills = {}, derivedAspects = {}, attacks = [], talents = [], rank = {value:5}}, isNPC = false){
        this.aspects = new Aspects(aspects);
        this.skills = {};
        for(var skillName in skills) {
            var skill = skills[skillName];
            var newSkill = new Skill(skill, aspects);

            this.skills[newSkill.name.toLowerCase()] = newSkill;
        }
        this.derivedAspects = new DerivedAspects(derivedAspects, this.aspects, this.skills, rank, isNPC);
        this.attacks = attacks.map(attack => new Attack(attack));
        this.talents = talents.map(talent => new Talent(talent));
    }
};