var React = require('react'),
    EditorController = require('./editorController.jsx'),
    InputEditor = require('./inputEditor.jsx'),

    /**
     *
     * @type {Talent|exports|module.exports}
     */
    Talent = require('../models/talent');

var styles = {
    container: {
        padding: "10px 10px",
        backgroundColor: "#fff",
        position: "relative",
        clear: "both"
    },
    addTalent: {
        width: "200px",
        margin: "auto",
        textAlign: "center"
    },
    talent: {
        marginBottom: "10px",
        borderBottom: "1px solid #ddd",
        position:"relative"
    },
    rightHover:{
        position:"absolute",
        top:"10px",
        right:"10px",
        fontSize:"13px"
    }
};

var TalentsComponent = module.exports = React.createClass({
    mixins:[EditorController],

    addTalent(){
        var talent = new Talent({name: "Talent Name", description:"The talent description goes here."});

        this.props.talents.push(talent);
        this.props.update();
    },

    deleteTalent(idx){
        this.props.talents.splice(idx, 1);
        this.props.update();
    },

    renderTalent(talent,idx){
        return <div style={styles.talent}>
            <p>
                {this.floatingEditorFactory(
                    InputEditor,
                    value => talent.name = value,
                    "talentName",
                    talent.name,
                    "Set talent name",
                    null,
                    <b>{talent.name}</b>
                )}
                {this.floatingEditorFactory(
                    InputEditor,
                    value => talent.description = value,
                    "talentDescription",
                    talent.description,
                    "Set talent name",
                    null,
                    talent.description
                )}
            </p>
            <div style={styles.rightHover} onClick={e=> this.deleteTalent(idx)}>
                <a>[delete]</a>
            </div>
        </div>
    },

    render(){
        var talents = this.props.talents;

        return <div style={styles.container}>
            {talents.map(this.renderTalent)}
            <div className="noPrint" style={styles.addTalent} onClick={this.addTalent}>
                <a>Add Talent</a>
            </div>
        </div>
    }
});