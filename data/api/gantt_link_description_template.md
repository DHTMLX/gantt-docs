link_description
=============

@short:specifies the text in the header of the link's "delete" confirm window
	
@params: 
- link	object	the link object

@example:
gantt.templates.link_description = function(link){
	const from = gantt.getTask(link.source);
	const to = gantt.getTask(link.target);
	const types = gantt.config.links;

	const from_start = link.type == types.start_to_start;
	const to_start = link.type == types.finish_to_start ||  
    				link.type == types.start_to_start;
	return `From <b>${from.text}</b> ${(from_start?"Start":"End")}<br/>
To <b>${to.text}</b> ${(to_start ? "Start" : "End")}<br/>`;
};

@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

@related:
	desktop/dependency_templates.md