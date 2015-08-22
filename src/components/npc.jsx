var React = require('react'),
    NPC = require('../models/npc').NPC,
    AspectsComponent = require('./aspects.jsx').AspectsComponent,
    NPCIdentity = require('./npcIdentity.jsx').NPCIdentity,
    Skills = require('./skills.jsx').Skills;

var styles = {
    npcRoot:{
        maxWidth: "550px",
        minWidth: "450px",
        borderLeft: "2px solid #333",
        borderRight: "2px solid #333",
        borderBottom: "1px solid #333",
        margin: "20px auto",
        backgroundColor:"#f5f5f5",
        fontFamily:"Times New Roman, Times, Serif"
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

        return <div style={styles.npcRoot}>
            <NPCIdentity update={this.props.update} npc={npc}/>
            <AspectsComponent update={this.props.update} aspects={npc.aspects} editableFields={npc.aspects}/>
            <AspectsComponent update={this.props.update} aspects={npc.derivedAspects} editableFields={{height:true}}/>
            <Skills update={this.props.update} skills={npc.skills}/>
        </div>
    }
});

module.exports.NpcComponent = NpcComponent;