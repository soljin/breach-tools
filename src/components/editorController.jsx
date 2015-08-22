var React = require('react'),
    FloatingEditor = require('./floatingEditor.jsx').FloatingEditor;

var EditorController = {
    onOpen(name){
        if(this.openAspect && this.refs[this.openAspect] && "window"+name != this.openAspect){
            this.refs[this.openAspect].closeEditor();
        }
        this.openAspect = "window"+name;
        this.refs["input"+name].focus()
    },

    editorFactory(Editor, save, name, value, label, data){
        return <Editor
            ref={'input'+name}
            onComplete={()=>this.refs['window'+name].closeEditor()}
            value={value}
            change={(e)=>{
                    save(e.target.value);
                    this.props.update();
                }}
            name={"name"}
            label={label}
            data={data}
            />
    },

    floatingEditorFactory(Editor, save, name, value, label, data, child, styles = {}){
        return <FloatingEditor
            style={styles}
            onOpen={()=>this.onOpen(name)}
            ref={'window'+name} editor={
                this.editorFactory( Editor, save, name, value, label, data )
            }
            >
            {child}
        </FloatingEditor>
    }
};

module.exports.EditorController = EditorController;