resource_attribute
=============

@short: changes the name of the attribute that Gantt uses to find which resource the task row in the resource grid/timeline is referring to
	

@type: string

@example:
gantt.config.resource_attribute = "data-resource-id";

@default: data-resource-id

@template:	api_config
@descr:

{{pronote This functionality is available in the PRO edition only.}}

{{note Each resource element has the *data-resource-id* attribute that is used to find which a resource the DOM element is attached to.}}


<img src="api/resource_attribute.png" /><br>
{{editor 	https://snippet.dhtmlx.com/5/66401acf0 	Resourse_attribute}}

@edition: pro

