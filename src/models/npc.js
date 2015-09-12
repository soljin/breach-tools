var Character = require('./character'),
    Factions = require('../dataTables/factions');

class Rank {
    value;
    
    get name(){
        var value = this.value;
        
        if(value < 3){
            return "Negligible";
        }else
        if(value > 2 && value < 5){
            return "Peon";
        }else
        if(value > 4 && value < 7){
            return "Minion";
        }else
        if(value > 6 && value < 9){
            return "Enforcer";
        }else
        if(value > 8 && value < 12){
            return "Henchman";
        }else
        if(value > 11 && value < 14){
            return "Master"
        }else
        if(value > 13){
            return "Avatar/Tyrant"
        }
        return "";
    }

    constructor({value = 5}){
        this.value = value;
    }
}

module.exports = class NPC extends Character{
    name;
    rank;
    type;
    faction;
    classification;

    /**
     *
     * @param name
     * @param rank
     * @param type
     * @param classification
     * @param faction
     */
    constructor({name = "NPC Name", rank = {value:5}, type = 'Living', classification = "Generic", faction = Factions[0]}){
        super(arguments[0], true);

        this.name = name;
        this.rank = new Rank(rank);
        this.type = type;
        this.faction = faction;
        this.classification = classification;
    };
};