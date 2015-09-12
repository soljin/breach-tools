var React = require('react'),
    EditorController = require('./editorController.jsx'),
    InputEditor = require('./inputEditor.jsx'),
    SelectEditor = require('./selectEditor.jsx'),

    skillsList = require('../dataTables/skills'),
    suits = require('../dataTables/suits'),

    AttackModel = require('../models/attack'),
    Attack = AttackModel.Attack,
    AttackTypes = AttackModel.AttackTypes,
    ResistType = AttackModel.ResistType,
    ResistDisplayName = AttackModel.ResistDisplayName;

var styles = {
    container:{
        padding:"10px 10px",
        backgroundColor:"#fff",
        position:"relative",
        clear:"both"
    },
    attack:{
        position:"relative",
        marginBottom:"10px",
        borderBottom:"1px solid #ddd"
    },
    rightHover:{
        position:"absolute",
        top:"10px",
        right:"10px",
        fontSize:"13px"
    },
    row:{
        paddingBottom:"5px;"
    },
    fleft:{
        float:"left",
        marginRight:"5px"
    },
    addAttack:{
        width:"200px",
        margin:"auto",
        textAlign:"center"
    },
    clear:{
        clear:"both"
    }
};

var smallRow = {
    __proto__:styles.row,
    fontSize:"14px"
};

var AttacksComponent = module.exports = React.createClass({
    mixins:[EditorController],

    onChange(value){
        var attacks = this.props.attacks;

        if(value) {
            attacks.push({type:value});
        }
    },

    deleteAttack(attack){
        var attackIndex = this.props.attacks.indexOf(attack);

        if(attackIndex != -1){
            this.props.attacks.splice(attackIndex, 1);
            this.props.update();
        }
    },

    deleteTrigger(attack, trigger){
        var triggerIndex = attack.triggers.indexOf(trigger);

        if(triggerIndex != -1){
            attack.triggers.splice(triggerIndex, 1);
            this.props.update();
        }
    },

    deleteSuit(owner, suit){
        var suitIndex = owner.suits.indexOf(suit);

        if(suitIndex != -1){
            owner.suits.splice(suitIndex,1);
            this.props.update();
        }
    },

    getSkillOptions(){
        var skillOptions = {},
            addedDefault = false;

        skillsList.
            forEach( skill =>{
                var typeKey = skill.type.toLowerCase();
                if(!skillOptions[typeKey]){
                    skillOptions[typeKey] = {
                        groupName: skill.type,
                        options:[]
                    };
                    if(!addedDefault){
                        skillOptions[typeKey].options.push({name:"Choose a Skill", value:''});
                        addedDefault = true;
                    }
                }
                skillOptions[typeKey].options.push(
                    {name:`${skill.name} (${skill.aspect})`,value:skill.name}
                );
            });

        return skillOptions;
    },

    changeDamage(attack, value){
        var damage = attack.damage,
            comps;

        if(value){
            comps = value.split('/');
            damage.weak = this.integerFilter(comps[0]||0,0,20);
            damage.medium = this.integerFilter(comps[1]||0,0,20);
            damage.severe = this.integerFilter(comps[2]||0,0,20);
        }else{
            damage.severe = damage.medium = damage.weak = 0;
        }
    },

    renderTrigger(attack, trigger, suitOpts){
        return <div>
            <a className="noPrint" style={styles.rightHover} title="Delete trigger suit." onClick={this.deleteTrigger.bind(this, attack, trigger)}>
                [delete trigger]
            </a>
            <div style={styles.row}>
                <div style={styles.fleft}>
                    {trigger.suits.map(suit => {
                        return <a title="Click to delete suit." onClick={this.deleteSuit.bind(this, trigger, suit)}>{suit}</a>
                    })}
                </div>
                {this.floatingEditorFactory(
                    SelectEditor,
                    (value)=>trigger.suits.push(value),
                    "triggerSuits",
                    null,
                    "Choose Suit for Trigger",
                    suitOpts,
                    <a className="noPrint"> +Suit</a>,
                    styles.fleft
                )}
                {this.floatingEditorFactory(
                    InputEditor,
                    (value)=>trigger.name = value,
                    "triggerName",
                    trigger.name,
                    "Enter name for trigger",
                    null,
                    <b>{trigger.name}</b>,
                    styles.fleft
                )}
                <div style={styles.clear}></div>
            </div>
            <div style={styles.row}>
                {this.floatingEditorFactory(
                    InputEditor,
                    (value)=>trigger.description = value,
                    "triggerDescription",
                    trigger.description,
                    "Enter description for trigger",
                    null,
                    trigger.description,
                    styles.fleft
                )}
                <div style={styles.clear}></div>
            </div>
        </div>
    },

    renderAttack(attack){
        var skill = skillsList.filter(skill=>skill.name.toLowerCase() == attack.skillKey)[0],
            characterSkill = this.props.skills[skill.name.toLowerCase()],
            damage = attack.damage,
            suitOpts = [{name:"Choose a suit for Trigger"}];

        for(var suit in suits){
            suitOpts.push({name:`(${suit}) ${suits[suit]}`, value:suit});
        }

        return <div style={styles.attack}>
            <a className="noPrint" style={styles.rightHover} title="Delete this attack" onClick={()=>this.deleteAttack(attack)}>[delete]</a>
            <div style={styles.row}>
                {this.floatingEditorFactory(
                    InputEditor,
                    value => attack.actionPoints = this.integerFilter(value),
                    "actionPoints",
                    attack.actionPoints,
                    "Set attack action points cost",
                    null,
                    <b>({attack.actionPoints})</b>,
                    styles.fleft
                )}
                {this.floatingEditorFactory(
                    InputEditor,
                    value => attack.name = value,
                    "name",
                    attack.name,
                    "Set attack name",
                    null,
                    <b>{attack.name}</b>,
                    styles.fleft
                )}
                {this.floatingEditorFactory(
                    SelectEditor,
                    value => attack.skillKey = value.toLowerCase(),
                    "skillKey",
                    skill.name,
                    "Set skill attack is based on",
                    this.getSkillOptions(),
                    <b>({skill.name})</b>,
                    styles.fleft
                )}
                <div style={styles.clear}></div>
            </div>
            <div style={smallRow}>
                <div style={styles.fleft}>
                    <div style={styles.fleft}>
                        AV:{skill.actionValue} (
                            {this.props.rank.value + (characterSkill ? characterSkill.actionValue: this.props.aspects[skill.aspect.toLowerCase()].value)
                        })
                    </div>
                    <div style={styles.fleft}>
                        {attack.suits.map(suit => {
                            return <a title="Click to delete suit." onClick={this.deleteSuit.bind(this, attack, suit)}>{suit}</a>
                        })}
                    </div>
                    {this.floatingEditorFactory(
                        SelectEditor,
                        (value)=>attack.suits.push(value),
                        "attackSuits",
                        null,
                        "Choose Suit for this Attack",
                        suitOpts,
                        <a className="noPrint"> +Suit</a>,
                        styles.fleft
                    )}
                </div>
                {this.floatingEditorFactory(
                    InputEditor,
                    value => attack.range = this.integerFilter(value, 0, 100),
                    "range",
                    attack.range,
                    "Set attack range",
                    null,
                    <span>Range: {attack.range}</span>,
                    styles.fleft
                )}
                <div style={styles.fleft}>
                    Resist: {attack.resist}
                </div>
                <div style={styles.clear}></div>
            </div>
            <div style={smallRow}>
                {this.floatingEditorFactory(
                    InputEditor,
                    this.changeDamage.bind(this, attack),
                    "damage",
                    `${damage.weak}/${damage.medium}/${damage.severe}`,
                    "Enter attack damage if any",
                    null,
                    <span>Damage {damage.weak}/{damage.medium}/{damage.severe}</span>,
                    styles.fleft
                )}
                {this.floatingEditorFactory(
                    InputEditor,
                    value => attack.effect = value,
                    "effect",
                    attack.effect,
                    "Enter attack damage if any",
                    null,
                    attack.effect,
                    styles.fleft
                )}
                <div style={styles.clear}></div>
            </div>
            <div style={styles.container}>
                <div style={smallRow}>
                    {attack.triggers.map(trigger=>this.renderTrigger(attack, trigger, suitOpts))}
                </div>
                {this.floatingEditorFactory(
                    SelectEditor,
                    (value)=>attack.triggers.push({suits:[value]}),
                    "triggers",
                    null,
                    "Choose New Trigger Type",
                    suitOpts,
                    <div className="noPrint">Add Trigger</div>,
                    styles.fleft
                )}
                <div style={styles.clear}></div>
            </div>
            <div style={styles.clear}></div>
        </div>;
    },

    render(){
        var attacks = this.props.attacks,
            attackTypeOpts = [{name:"Choose Attack Type", value:""}];

        for(var type in AttackTypes){
            attackTypeOpts.push({
                name:AttackTypes[type],
                value: type
            })
        }

        return <div style={styles.container}>
            <div>
                {attacks.map(this.renderAttack)}
            </div>
            {this.floatingEditorFactory(
                SelectEditor,
                this.onChange.bind(this),
                "attacks",
                null,
                "Choose New Skill",
                attackTypeOpts,
                <div className="noPrint">Add Attack</div>,
                styles.addAttack
            )}
        </div>;
    }
});