var React = require('react');

var styles={
    label:{
        fontSize:"11px"
    },
    input:{
        width:"100%",
        boxSizing:"border-box",
        margin:"0.75em 0"
    }
};

var SelectEditor = React.createClass({
    onKeyPress(e){
        if(e.key == "Enter"){
            this.props.onComplete();
        }
    },

    focus(){
        var input = React.findDOMNode(this.refs.input);
        input.focus();
    },

    renderOpts(opts){
        return opts.map((datum)=>{
            return <option key={datum.value} value={datum.value}>{datum.name}</option>
        })
    },

    renderNestedOpts(data){
        var optGroups = [],
            group;
        for(var key in data){
            group = data[key];
            optGroups.push(
                <optgroup label={group.groupName}>
                    {this.renderOpts(group.options)}
                </optgroup>
            )
        }
        return optGroups;
    },

    render(){
        var data = this.props.data;

        return <div>
            <label style={styles.label} htmlFor={this.props.name}>{this.props.label}</label>
            <select
                style={styles.input}
                ref="input"
                id={this.props.name}
                value={this.props.value}
                onChange={this.props.change}
                onKeyPress={this.onKeyPress}
            >
                {data.map ? this.renderOpts(data) : this.renderNestedOpts(data)}
            </select>
        </div>
    }
});

module.exports.SelectEditor = SelectEditor;