link_description
=============

@short:specifies the text in the header of the link's "delete" confirm window
	
@params: 
- link	object	the link object

@example:
gantt.templates.link_description = function(link){
	var from = gantt.getTask(link.source),
	to = gantt.getTask(link.target),
	types = gantt.config.links;

	var from_start = link.type == types.start_to_start;
	var to_start = link.type == types.finish_to_start ||  
    				link.type == types.start_to_start;
	var text = "From <b>" + from.text + "</b> " +(from_start?"Start":"End")+"<br/>";
	text += "To <b>" + to.text + "</b> "+ (to_start ? "Start" : "End")+"<br/>";

	return text;
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@related:
	desktop/dependency_templates.md