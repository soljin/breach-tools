var Aspect = require('./aspect').Aspect;

class DerivedAspects{
    defense;
    willpower;
    wounds;
    walk;
    charge;
    height;

    constructor({height}, aspects, skills, rank, isNPC){
        this.defense = new Aspect({
            displayName:"Defense",
            value: 2 + Math.max(aspects.speed.value, (skills.evade ? skills.evade.rank : 0)),
            addRank:true
        });
        this.willpower = new Aspect({
            displayName:"Willpower",
            value: 2 + Math.max(aspects.tenacity.value, (skills.centering ? skills.centering.rank : 0)),
            addRank:true
        });

        this.initiative = new Aspect({
            displayName: "Initiative",
            value: aspects.speed.value,
            addRank:true
        });

        var resilience = aspects.resilience.value;
        this.wounds = new Aspect({
            displayName:"Wounds",
            value: 4 + (skills.toughness ? skills.toughness.rank : 0) + ( resilience> 0 ? resilience : 0)
        });
        this.walk = new Aspect({
            displayName:"Walk",
            value: 4 + Math.ceil(aspects.speed.value/2)
        });
        var baseCharge = 4 + aspects.speed.value;
        this.charge = new Aspect({
            displayName:"Charge",
            value: baseCharge > this.walk.value ? baseCharge : this.walk.value
        });
        this.height = new Aspect({ displayName:"Height", value: height ? height.value : 2});
    }

    toList(){
        return [this.defense, this.walk, this.height].
            concat(
                this.initiative ? [this.initiative] : []
            ).
            concat(
                [this.willpower, this.charge, this.wounds]
            );
    }
}

module.exports.DerivedAspects = DerivedAspects;

