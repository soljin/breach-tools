var Aspects = require('./aspects').Aspects,
    Attack = require('./attack').Attack,
    Skill = require('./skill').Skill,
    Talent = require('./talent').Talent,
    DerivedAspects = require('./derivedAspects').DerivedAspects;

class Character {
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
}

module.exports.Character = Character;