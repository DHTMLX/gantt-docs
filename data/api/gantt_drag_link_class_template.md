drag_link_class
=============
@short:specifies the CSS class that will be applied to the link receiver (pop-up circle near the task bar) 
	

@params:
- from	string, number	the id of the source task
- from_start	boolean		<i>true</i>, if the link is being dragged from the start of the  source task, <i>false</i> - if <br> from the end of the task
- to	string, number	the id of the target task( 'null' or 'undefined', if the target task isn't specified yet)
- to_start	boolean		<i>true</i>, if the link is being dragged to the start of the target task, <i>false</i> - if <br> to the end of the task


@example:
gantt.templates.drag_link_class = function(from, from_start, to, to_start) {
	var add = "";
	if(from && to){
		var allowed = gantt.isLinkAllowed(from, to, from_start, to_start);
		add = " " + (allowed ? "gantt_link_allow" : "gantt_link_deny");
	}
	return "gantt_link_tooltip" + add;
};
@template:	api_template
@returns:
- text		string		css class for item in question
@descr:


@related:
	desktop/dependency_templates.md