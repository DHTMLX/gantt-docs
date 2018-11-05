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

##Custom editor with two inputs

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

##Custom third-party editor

You can create a custom multiselect control for selecting multiple values. 

For example, you can make a control based on the [jQuery Chosen plugin](https://harvesthq.github.io/chosen/) to assign multiple resources to a task.
Unlike the default Gantt [resource control](desktop/resources.md), it allows just assigning resources to a task without setting their quantity. However, it can be useful, if you want a pretty simple control.

![Custom resources control](desktop/custom_resources_control.png)

{{sample 05_lightbox/14_jquery_multiselect.html}}


To use a jQuery Chosen-based control in the Gantt Chart:

- include its source files on the page

~~~html
<script
	src="https://code.jquery.com/jquery-3.3.1.min.js?v=5.2.4"
	integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.js?v=5.2.4"></script>
<link rel="stylesheet" type="text/css" 
	href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.css?v=5.2.4">
~~~

- describe the control logic

~~~js
gantt.form_blocks["multiselect"] = {
 render: function (sns) {
  var height = (sns.height || "23") + "px";
  var html = "<div class='gantt_cal_ltext gantt_cal_chosen gantt_cal_multiselect'"+
	 "style='height:"+ height + ";'><select data-placeholder='...'"+
    	"class='chosen-select' multiple>";
  if (sns.options) {
   for (var i = 0; i < sns.options.length; i++) {
    if(sns.unassigned_value !== undefined && sns.options[i].key==sns.unassigned_value){
		continue;
	}
    html+="<option value='" +sns.options[i].key+ "'>"+sns.options[i].label+"</option>";
  }
}
  html += "</select></div>";
  return html;
},

set_value: function (node, value, ev, sns) {
	node.style.overflow = "visible";
	node.parentNode.style.overflow = "visible";
	node.style.display = "inline-block";
	var select = $(node.firstChild);

	if (value) {
		value = (value + "").split(",");
		select.val(value);
	}
	else {
		select.val([]);
	}

	select.chosen();
	if(sns.onchange){
		select.change(function(){
			sns.onchange.call(this);
		})
	}
	select.trigger('chosen:updated');
	select.trigger("change");
},

get_value: function (node, ev) {
	var value = $(node.firstChild).val();
	//value = value ? value.join(",") : null
	return value;
},

focus: function (node) {
	$(node.firstChild).focus();
 }
};
~~~

- use the control as a lightbox section with the *type:"multiselect"*

~~~js
gantt.config.lightbox.sections = [
	{name:"description",height:38,map_to:"text",type:"textarea",focus: true},
	{name:"owner",height:60, type:"multiselect", options:gantt.serverList("people"), 
    	map_to:"owner_id", unassigned_value:5 },
	{name: "time", type: "duration", map_to: "auto"}
];
~~~

The *unassigned_value* property in the control object is used to hide resources that shouldn't be available for selection in the control. You need to set the id of the corresponding resource as a value of this property.
In the example above the resource with the id=5 is not shown as an option in the control.