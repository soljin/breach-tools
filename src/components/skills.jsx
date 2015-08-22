var React = require('react'),
    EditorController = require('./editorController.jsx').EditorController,
    InputEditor = require('./inputEditor.jsx').InputEditor,
    SelectEditor = require('./selectEditor.jsx').SelectEditor,
    skillsList = require('../dataTables/skills').skillsList;

var styles = {
    container:{
        padding:"10px 15px",
        borderBottom:"1px solid #333"
    },
    skillRow:{
        paddingBottom:"10px;",
        fontSize:"0.8em"
    }
};

var Skills = React.createClass({
    mixins:[EditorController],

    onChange(value){
        var skills = this.props.skills;

        if(value) {
            var skill = skillsList.filter(skill=>skill.name == value),
                newSkill = {
                    __proto__: skill[0],
                    rank: 1
                };
            skills[newSkill.name.toLowerCase()] = newSkill;
        }
    },

    getSkillOptions(){
        var skills = this.props.skills,
            skillOptions = {};

        skillsList.
            filter( skill => !skills[skill.name.toLowerCase()] ).
            forEach( skill =>{
                var typeKey = skill.type.toLowerCase();
                if(!skillOptions[typeKey]){
                    skillOptions[typeKey] = {
                        groupName: skill.type,
                        options:[]
                    }
                }
                skillOptions[typeKey].options.push(
                    {name:`${skill.name} (${skill.aspect})`,value:skill.name}
                );
            });

        return skillOptions;
    },

    render(){
        var skills = this.props.skills,
            currentSkillsList = [];

        for(var key in skills){
            currentSkillsList.push(skills[key]);
        }

        return <div style={styles.container}>
            <div className="pure-g">
                {currentSkillsList.map(skill=>{
                    return <div style={styles.skillRow} className="pure-u-1-2">
                        <b>{skill.name}</b> ({skill.aspect}): Rank {skill.rank}, <b>AV {skill.actionValue}</b>
                    </div>
                })}
            </div>
            {this.floatingEditorFactory(
                SelectEditor,
                this.onChange.bind(this),
                "skills",
                null,
                "Choose New Skill",
                this.getSkillOptions(),
                <div>+ Skill</div>,
                null
            )}
        </div>;
    }
});

module.exports.Skills = Skills;