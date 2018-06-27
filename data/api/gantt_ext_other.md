ext
=============

@todo:
	needs improving and completing


@short:
	an object that stores various extensions

@type:object

@example:
gantt.ext.inlineEditors.init();

@template:	api_config
@descr:
The **ext** object includes the following extensions:

1) **inlineEditors**

The *inlineEditors* object possesses the following API:

Methods:

- attachAll(t,e)
- attachEvent(t,i,n)
- callEvent(t,i,n)
- checkEvent(t)
- destructor()
- detachAllEvents()
- detachEvent(t)
- editNextCell(t)
- editNextRow()
- editPrevCell(t)
- editPrevRow()
- focus()
- getEditorConfig(t)
- getFirstCell()
- getLastCell()
- getMapping()
- getNextCell(t)
- getState()
- getValue()
- hide()
- init()
- isChanged()
- isVisible()
- locateCell n(t)
- moveRow(e)
- save()
- setMapping(e)
- setValue(t,i)
- show(t,n)
- startEdit(t,e)

Events:

~~~js
var editorState = {id: itemId, columnName: columnName};

if(this.callEvent("onBeforeEdit", [editorState]) === false){
 return;
}

if(this.callEvent("onBeforeShow", [editorState]) === false){
 return;
}

this.callEvent("onShow", [editorState]);

this.callEvent("onEdit", [editorState]);


this.callEvent("onHide", [{id: itemId, columnName: columnName}]);

var editorState = {
 id: itemId,
 columnName: columnName,
 newValue: this.getValue(),
 oldValue: this._getItemValue()
};
if(this.callEvent("onBeforeSave", [editorState]) !== false) 

this.callEvent("onSave", [editorState]);
~~~