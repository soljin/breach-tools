var React = require('react'),
    EditorController = require('./editorController.jsx').EditorController,
    InputEditor = require('./inputEditor.jsx').InputEditor,
    SelectEditor = require('./selectEditor.jsx').SelectEditor,
    Factions = require('../dataTables/factions').Factions,
    Types = ["Living", "Undead", "Spirit"];

var styles={
    mainHeader:{
        padding:"10px 0",
        clear:"both",
        backgroundImage:"url('img/texture.png')",
        backgroundPosition:"center center",
        backgroundBlendMode:"multiply"
    },
    mainHeaderText:{
        fontWeight:"bold",
        fontSize:"1.5em",
        color:"white",
        textAlign:"center",
        textShadow:"3px 3px rgba(0,0,0,0.65)"
    },
    subHeader:{
        textAlign:"center",
        padding:"5px 100px",
        borderBottom:"1px solid #333"
    },
    mainContainer:{
        float: "left",
        position: "relative",
        left: "50%"
    },
    fixerContainer:{
        float: "left",
        position: "relative",
        left: "-50%"
    },
    fleft:{
        float:"left",
        marginRight:"5px"
    }
};

var FactionColorMap={
    Guild:"#DD0000",
    "Resurectionists":"#669900",
    "Neverborn":"#990099",
    "Archanists":"#0000dd",
    "Outcasts":"#FFBB00",
    "Gremlins":"#33CC33",
    "Ten Thunders":"#EECC00"
};

var NPCIdentity = React.createClass({
    mixins:[EditorController],

    render(){
        var npc = this.props.npc,
            mainHeaderStyles = styles.mainHeader;

        mainHeaderStyles.backgroundColor = FactionColorMap[npc.faction];

        return <div>
            <div style={styles.mainHeader}>
                <div style={styles.mainContainer}><div style={styles.fixerContainer}>
                    {this.floatingEditorFactory(
                        InputEditor,
                        (value)=> npc.name = value,
                        "name",
                        npc.name,
                        'Enter Character Name',
                        null,
                        <span style={styles.mainHeaderText}>{npc.name}, </span>,
                        styles.fleft
                    )}
                    {this.floatingEditorFactory(
                        SelectEditor,
                        (value)=> npc.faction = value,
                        "faction",
                        npc.faction,
                        'Select Faction',
                        Factions.map((faction)=>{ return {name:faction,value:faction} }),
                        <span style={styles.mainHeaderText}>{npc.faction}</span>,
                        styles.fleft
                    )}
                </div></div>
                <div style={{clear:"both"}}></div>
            </div>
            <div style={styles.subHeader}>
                <div style={styles.mainContainer}><div style={styles.fixerContainer}>
                    {this.floatingEditorFactory(
                        InputEditor,
                        (value)=>{
                            var intVal = parseInt(value, 10);
                            if(intVal == 0 || intVal) {
                                value = Math.max(intVal, 0);
                                value = Math.min(value, 20);
                            }else{
                                value = value.replace(/\w/g,'');
                            }
                            npc.rank.value = value
                        },
                        "rank",
                        npc.rank.value,
                        'Enter Character Rank (0-14)',
                        null,
                        <span>{npc.rank.name}, </span>,
                        styles.fleft
                    )}
                    {this.floatingEditorFactory(
                        SelectEditor,
                        (value)=> npc.type = value,
                        "type",
                        npc.type,
                        'Enter Character Name',
                        Types.map((type)=>{return {name:type,value:type}}),
                        <span>{npc.type}, </span>,
                        styles.fleft
                    )}
                    {this.floatingEditorFactory(
                        InputEditor,
                        (value)=> npc.classification = value,
                        "classification",
                        npc.classification,
                        'Enter Character Name',
                        null,
                        <span>{npc.classification}</span>,
                        styles.fleft
                    )}
                </div></div>
                <div style={{clear:"both"}}></div>
            </div>
        </div>
    }
});

module.exports.NPCIdentity = NPCIdentity;