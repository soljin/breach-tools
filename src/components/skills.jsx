var React = require('react'),
    EditorController = require('./editorController.jsx').EditorController,
    InputEditor = require('./inputEditor.jsx').InputEditor,
    SelectEditor = require('./selectEditor.jsx').SelectEditor,
    skillsList = require('../dataTables/skills').skillsList;

var styles = {
    container:{
        padding:"10px 10px",
        backgroundColor:"#fff",
        borderBottom:"1px solid #333"
    },
    skillRow:{
        paddingBottom:"10px",
        fontSize:"13px"
    },
    fleft:{
        float:"left",
        marginRight:"5px"
    },
    addSkill:{
        width:"200px",
        margin:"auto",
        textAlign:"center"
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

    removeSkill(name){
        delete this.props.skills[name.toLowerCase()];
        this.props.update();
    },

    getSkillRow(skill){
        return <span>
            <b>{skill.name} ({skill.rank})</b>,&nbsp;
            {skill.aspect},&nbsp;
            <b>({skill.actionValue})</b>&nbsp;
            <a title="Delete Skill" onClick={this.removeSkill.bind(this, skill.name)}>x</a>
        </span>;
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
                    return <div style={styles.skillRow} className="pure-u-1-3">
                        {
                            this.floatingEditorFactory(
                                InputEditor,
                                value => skill.rank = this.integerFilter(value, 0, 5),
                                skill.name,
                                skill.rank,
                                `Set ${skill.name} Skill Rank (0-5)`,
                                null,
                                this.getSkillRow(skill),
                                styles.fleft
                            )
                        }
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
                <div>Add Skill</div>,
                styles.addSkill
            )}
        </div>;
    }
});

module.exports.Skills = Skills;