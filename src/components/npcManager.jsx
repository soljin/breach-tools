var React = require('react'),
    NPC = require('../models/npc').NPC,
    SelectEditor = require('./selectEditor.jsx').SelectEditor,
    NpcComponent = require('./npc.jsx').NpcComponent;

var NpcManager = React.createClass({
    getInitialState(){
        var npcs,
            npcsData;

        try {
            npcsData = localStorage.npcs ? JSON.parse(localStorage.npcs) : [{}];
            npcs = npcsData.map(npcData => new NPC(npcData))
        } catch (e) {
            npcs = [new NPC({})];
        }

        return {
            npcs: npcs,
            npc: npcs[0],
            index: 0
        };
    },

    saveNPCs(){
        localStorage.npcs = JSON.stringify(this.state.npcs);
    },

    createNewNCP(){
        var newNCP = new NPC({});

        this.setState({
            npcs: this.state.npcs.concat([newNCP]),
            npc: newNCP,
            index: this.state.npcs.length
        }, this.saveNPCs.bind(this));
    },

    onChange(e){
        var value = e.target.value;
        this.setState({
            npc: this.state.npcs[value],
            index: value
        })
    },

    update(){
        var newNPC = new NPC(this.state.npc);

        this.state.npcs[this.state.index] = newNPC;

        this.setState(
            {
                npc: newNPC,
                npcs: this.state.npcs
            },
            ()=>{
                console.log(this.state.npc);
                this.saveNPCs();
            }
        );
    },

    render(){
        var npc = this.state.npc;

        return <div>
            <SelectEditor
                ref={"npc"}
                value={this.state.index}
                change={this.onChange}
                name={"npc"}
                label={"Select NPC to Edit"}
                data={this.state.npcs.map((npc, index)=>{ return {value:index, name:npc.name} })}
            />
            <button onClick={this.saveNPCs}>Save NPC</button>
            <button onClick={this.createNewNCP}>Create New NPC</button>
            <NpcComponent update={this.update} npc={npc}/>
        </div>
    }
});

module.exports.NpcManager = NpcManager;