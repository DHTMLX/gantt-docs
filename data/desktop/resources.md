Resources Control
===================

A multiselect control. The control is used to assign several resources to a task.

![Resources control](desktop/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name:"owner",height:60, type:"resources", options:gantt.serverList("people"),   /*!*/
 	map_to:"owner_id", default_value:8},                                 /*!*/
 {name: "time", type: "duration", map_to: "auto"}
];
~~~

{{sample 11_resources/07_resource_multiselect_values.html}}

or

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms", options:[  /*!*/
  	  { key: 1, label: "room 1", sku: "hours" },    /*!*/
	  { key: 2, label: "room 2", sku: "hours" },   /*!*/
	  { key: 3, label: "room 3", sku: "hours" }   /*!*/
    ]  /*!*/
  }	   /*!*/
];

gantt.locale.labels.section_rooms = "Rooms";
~~~

{{sample  05_lightbox/13_resources.html}}

Initialization
------------

To add the **resources** control to the lightbox, follow the steps below:

1\. Add a section to the lightbox configuration:

~~~js
var roomsMap =  [
	{ key: 1, label: "room 1", sku: "hours" },
	{ key: 2, label: "room 2", sku: "hours" },
	{ key: 3, label: "room 3", sku: "hours" }
];

gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms", options:roomsMap}	   /*!*/
];
~~~

2\. Set a label for the section:

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~

{{sample 05_lightbox/13_resources.html}}


Properties
-------------

The following properties are mostly important and commonly set for the **resources** control (see the full list [here](api/gantt_lightbox_config.md)):

- **name** - (*string*) the section name 
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the type of the [section control](desktop/default_edit_form.md#lightboxcontrols)
- **options** - (*array*) an array of objects. Defines select options of the control (*used for the **select**, **checkbox**  and **radio**  controls*). Each object in the array specifies a single option and takes
the following properties:
	- **key** - (*string*) the option id. This attribute is compared with the task data property to assign options to tasks
	- **label** - (*string*) the option label
    - **sku** - (*number*) the unit of measurement for the option
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox
- **default_value** - (*any*) the default value of the section's control. Applied only if the input value is underfined. 


Populating control with data
-------------------------------

Generally, to set values for the **resources** control, use the [options](api/gantt_lightbox_config.md) parameter:

~~~js
gantt.config.lightbox.sections = [
  { name:"rooms",type:"resources",map_to:"rooms",
  	options:[
  	  { key: 1, label: "room 1", sku: "hours" },   
	  { key: 2, label: "room 2", sku: "hours" },   
	  { key: 3, label: "room 3", sku: "hours" }  
    ]  
  }	   
];
~~~

Items in the [options](api/gantt_lightbox_config.md) parameter have 3 mandatory properties:

- **key** - the option id
- **label** - the option label
- **sku** - the unit of measurement for the option

Populating control with data from the server
---------------------------------------------

To populate the control from the server, set the [options](api/gantt_lightbox_config.md) option to the value returned by the api/gantt_serverlist.md method:

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name: "resources", type: "resources", map_to: "owner_id", default_value:8,
 	options: gantt.serverList("people")},
 {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
gantt.load("/data");
~~~

{{sample 11_resources/07_resource_multiselect_values.html}}


Custom resources control
------------------

You can use a custom control for selecting resources to assign to a task. For example, you can make use of the [jQuery Chosen plugin](https://harvesthq.github.io/chosen/).
Unlike the default Gantt resource control, it allows just assign resources to a task without setting their quantity. However, it can be useful, if you want a pretty simple control.

![Custom resources control](desktop/custom_resources_control.png)

{{sample 11_resources/06_resource_multiselect.html}}


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
gantt.form_blocks["resources"] = {
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

- use the control as a lightbox section with the type:"resources"

~~~js
gantt.config.lightbox.sections = [
	{name:"description",height:38,map_to:"text",type:"textarea",focus: true},
	{name:"owner",height:60, type:"resources", options:gantt.serverList("people"), 
    	map_to:"owner_id", unassigned_value:5 },
	{name: "time", type: "duration", map_to: "auto"}
];
~~~

@todo: check intro and the image, custom control