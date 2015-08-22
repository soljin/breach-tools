var Aspect = require('./aspect').Aspect;

class Aspects {
    might;
    grace;
    speed;
    resilience;
    charm;
    intellect;
    cunning;
    tenacity;

    /**
     * @param might Int
     * @param grace Int
     * @param speed Int
     * @param resilience Int
     * @param charm Int
     * @param intellect Int
     * @param cunning Int
     * @param tenacity Int
     */
    constructor({might = {}, grace = {}, speed = {}, resilience = {}, charm = {}, intellect = {}, cunning = {}, tenacity = {}}){
        this.might = new Aspect({displayName:"Might", value: might.value || 0});
        this.grace = new Aspect({displayName:"Grace",  value:grace.value || 0});
        this.speed = new Aspect({displayName:"Speed", value:speed.value || 0});
        this.resilience = new Aspect({displayName:"Resilience",  value:resilience.value || 0});
        this.charm = new Aspect({displayName:"Charm",  value:charm.value || 0});
        this.intellect = new Aspect({displayName:"Intellect",  value:intellect.value || 0});
        this.cunning = new Aspect({displayName:"Cunning",  value:cunning.value || 0});
        this.tenacity = new Aspect({displayName:"Tenacity",  value:tenacity.value || 0});
    }

    /**
     *
     * @returns {*[]}
     */
    toList(){
        return [this.might,  this.grace,  this.speed,  this.resilience,  this.charm,  this.intellect,  this.cunning,  this.tenacity];
    }
}

module.exports.Aspects = Aspects;