Creating Custom Element
===================================

To create  a custom control for the lightbox, define a new object in the following way:


~~~js
gantt.form_blocks["my_editor"]={
	render:function(sns){ //sns - the section's configuration object
		return "html code of the editor here";
	},
	set_value:function(node,value,task,section){
		//node - an html object related to the html defined above
		//value - a value defined by the map_to property
		//task - the task object
        //section- the section's configuration object
		... code to set value to the element ...
	},
	get_value:function(node,task,section){
		//node - an html object related to the html defined above
		//task - the task object
        //section - the section's configuration object
		return "current value from editor";
	},
	focus:function(node){
		//node - an html object related to the html defined above
		...code to set focus to the element...
	}
}
~~~

Make sure that you **don't** use the short closing syntax for tags inside the HTML code 
returned by the "render" function, since that might cause parsing problems in the browser:

~~~js
//this is WRONG
render:function(){
	return "<div id='box'/>";
}

//instead use opening and closing tags syntax:
render:function(){
    return "<div id='box'></div>";// recommended
}
~~~

{{sample
	05_lightbox/04_custom_editor.html
}}

##Example

Let's consider how to create the following custom editor:

<img src="desktop/custom_lightbox_editor.png"/>
	

~~~js
gantt.form_blocks["my_editor"] = {
	render:function(sns) {
		return "<div class='dhx_cal_ltext' style='height:60px;'>Text&nbsp;"
        +"<input type='text'><br/>Holders&nbsp;<input type='text'></div>";
	},
	set_value:function(node, value, task,section) {
		node.childNodes[1].value = value || "";
		node.childNodes[4].value = task.users || "";
	},
	get_value:function(node, task,section) {
		task.users = node.childNodes[4].value;
		return node.childNodes[1].value;
	},
	focus:function(node) {
		var a = node.childNodes[1];
		a.select();
		a.focus();
	}
};
gantt.config.lightbox.sections = [
	{ name:"description", height:200, map_to:"text", type:"my_editor", focus:true},
	{ name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

{{sample
	05_lightbox/04_custom_editor.html
}}