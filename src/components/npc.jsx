var React = require('react'),
    NPC = require('../models/npc').NPC,
    AspectsComponent = require('./aspects.jsx').AspectsComponent,
    NPCIdentity = require('./npcIdentity.jsx').NPCIdentity,
    Skills = require('./skills.jsx').Skills,
    AttacksComponent = require('./attacks.jsx').AttacksComponent;

var styles = {
    boxRoot:{
        maxWidth: "600px",
        minWidth: "450px",
        margin: "20px auto"
    },
    npcRoot:{
        border: "4px solid #333",
        borderBottom: "none",
        backgroundColor:"#f5f5f5",
        fontFamily:"Times New Roman, Times, Serif"
    },
    filigree:{
        width:"600px",
        height:"186px",
        background:"no-repeat center center url('img/filigree.png') transparent"
    }
};

var NpcComponent = React.createClass({
    getDefaultProps(){
        return {
            npc: new NPC({})
        };
    },

    render(){
        var npc = this.props.npc;

        return <div style={styles.boxRoot}>
            <div style={styles.npcRoot}>
                <NPCIdentity update={this.props.update} npc={npc}/>
                <AspectsComponent update={this.props.update} aspects={npc.aspects} editableFields={npc.aspects}/>
                <AspectsComponent update={this.props.update} rank={npc.rank} aspects={npc.derivedAspects} editableFields={{height:true}}/>
                <Skills update={this.props.update} skills={npc.skills}/>
                <AttacksComponent update={this.props.update} rank={npc.rank} attacks={npc.attacks} skills={npc.skills} aspects={npc.aspects}/>
            </div>
            <div style={styles.filigree}></div>
        </div>
    }
});

module.exports.NpcComponent = NpcComponent;