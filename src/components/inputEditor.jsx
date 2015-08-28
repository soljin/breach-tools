var React = require('react');

var styles={
    label:{
        fontSize:"11px"
    },
    input:{
        width:"100%",
        boxSizing:"border-box",
        margin:"10px 0"
    }
};

var InputEditor = React.createClass({
    onKeyPress(e){
        if(e.key == "Enter"){
            this.props.onComplete();
        }
    },

    focus(){
        var input = React.findDOMNode(this.refs.input);
        input.focus();
        input.select(0,-1);
    },

    render(){
        return <div>
            <label style={styles.label} htmlFor={this.props.name}>{this.props.label}</label>
            <input
                style={styles.input}
                ref="input"
                id={this.props.name}
                value={this.props.value}
                onChange={this.props.change}
                placeholder={this.props.placeholder}
                onKeyPress={this.onKeyPress}
            />
        </div>
    }
});

module.exports.InputEditor = InputEditor;