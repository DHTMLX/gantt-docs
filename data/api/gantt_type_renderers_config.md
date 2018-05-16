type_renderers
=============

@short:redefines functions responsible for displaying different types of tasks
	
@edition: pro
@type: object
@default:{}
@example:
gantt.config.type_renderers[gantt.config.types.project] = function(task,defaultRender){
	var main_el = document.createElement("div");
  	var size = gantt.getTaskPosition(task);
  	main_el.innerHTML = [
    	"<div class='project-left'></div>",
    	"<div class='project-right'></div>"
  	].join('');
  	main_el.className = "custom-project";

  	main_el.style.left = size.left + "px";
  	main_el.style.top = size.top + 7 + "px";
  	main_el.style.width = size.width + "px";

  	return main_el;
};
@relatedapi:api/gantt_gettaskposition.md
@relatedsample:
	04_customization/17_classic_gantt_look.html
@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

A function that renders tasks takes 2 parameters:

- **task** - the task object
- **defaultRender** - the default render function used in the dhtmlxGantt

You can use this option  to define a custom display for certain types of tasks.
For example, the setting allows you to implement a more conservative view for the project or summary tasks.



<img src="desktop/custom_look.png"/>



{{sample
04_customization/17_classic_gantt_look.html
}}


