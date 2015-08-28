var React = require('react'),
    FloatingEditor = require('./floatingEditor.jsx').FloatingEditor,
    InputEditor = require('./inputEditor.jsx').InputEditor,
    Aspects = require('../models/aspects').Aspects;

var styles = {
    aspect:{
        textAlign:"center"
    },
    aspectName:{
        fontSize:"13px",
        fontWeight:"bold",
        margin:"1em 0 0 0"
    },
    aspectValue:{
        fontSize:"1.5em",
        margin:"0.5em 0 0.5em 0"
    }
};

var AspectsComponent = React.createClass({
    getDefaultProps(){
        return {
            editableFields:{might:true}
        }
    },

    renderAspect(aspect){
        var self = this,
            value = <p style={styles.aspectValue}>{aspect.value} {aspect.addRank ? `(${this.props.rank.value+aspect.value})` : ""}</p>,
            editor = <InputEditor
                ref={'input'+aspect.name}
                onComplete={()=>this.refs["window"+aspect.name].closeEditor()}
                value={aspect.value}
                change={updateAspect}
                name={aspect.name}
                label={`Enter ${aspect.displayName} (between -5 and 5)`}
            />,
            floatingEditor =<FloatingEditor
                onOpen={()=>{
                    if(this.openAspect && this.refs[this.openAspect] && "window"+aspect.name != this.openAspect){
                        this.refs[this.openAspect].closeEditor();
                    }
                    this.openAspect = "window"+aspect.name;
                    this.refs["input"+aspect.name].focus()
                }}
                ref={'window'+aspect.name} editor={editor}
            >
                {value}
            </FloatingEditor>;

        return <div key={aspect.name} className="pure-u-1-4" style={styles.aspect}>
            <p style={styles.aspectName}>{aspect.displayName}</p>
            {this.props.editableFields[aspect.name] ? floatingEditor : value}
        </div>;

        function updateAspect(e){
            var value = e.target.value,
                intVal = parseInt(e.target.value, 10);
            if(intVal == 0 || intVal) {
                value = Math.max(intVal, -5);
                value = Math.min(value, 5);
            }else{
                value = value.replace(/\w/g,'');
            }
            aspect.value = value;
            self.props.update();
        }
    },

    render(){
        var aspects = this.props.aspects;
        return <div className="pure-g" style={{backgroundColor:"#fff",borderBottom:"1px solid #333"}}>
            {aspects.toList().map(this.renderAspect)}
        </div>
    }
});

module.exports.AspectsComponent = AspectsComponent;