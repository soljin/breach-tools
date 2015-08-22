var React = require('react');

var floatWindowCommon = {
    position:"absolute",
    top:"5px",
    left: "-118px",
    background:"white",
    borderRadius:"5px",
    border:"1px solid #ccc",
    boxShadow:"0 5px 20px 0 rgba(0,0,0,0.25)",
    padding:"18px",
    width:"200px",
    zIndex:5
};
var styles = {
    floatWrapper:{
        position:"relative",
        float:"left",
        left:"50%"
    },
    floatWindow:{
        __proto__: floatWindowCommon,
        display:"none"
    },
    floatWindowOpen:{
        __proto__: floatWindowCommon,
        display:"block"
    },
    children:{
        cursor:"pointer"
    }
};

var FloatingEditor = React.createClass({
    getInitialState(){
        return {
            open: false
        }
    },

    openEditor(){
        this.setState({open:true}, this.props.onOpen);
    },

    closeEditor(){
        this.setState({open:false});
    },

    render(){
        return <div style={this.props.style || {}}>
            <div style={styles.children} onClick={this.openEditor}>
                {this.props.children}
            </div>
            <div style={styles.floatWrapper}>
                <div style={this.state.open ? styles.floatWindowOpen : styles.floatWindow}>
                    {this.props.editor}
                    <button onClick={this.closeEditor}>Done</button>
                </div>
            </div>
        </div>
    }
});

module.exports.FloatingEditor = FloatingEditor;