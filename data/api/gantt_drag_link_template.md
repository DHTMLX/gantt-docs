drag_link
=============
@short:specifies the text of tooltips that are displayed when the user creates a new dependency link
	

@params:
- from				string,number			the id of the source task
- from_start		boolean					<i>true</i>, if the link is being dragged from the start of the  source task, <i>false</i> - if <br> from the end of the task
- to				string,number			the id of the target task( 'null' or 'undefined', if the target task isn't specified yet)
- to_start			boolean					<i>true</i>, if the link is being dragged to the start of the target task, <i>false</i> - if <br> to the end of the task


@example:
gantt.templates.drag_link = function(from, from_start, to, to_start) {
	from = gantt.getTask(from);

	var text = "From:<b> " +from.text + "</b> " +(from_start?"Start":"End")+"<br/>";
	if(to){
		to = gantt.getTask(to);
		text += "To:<b> " + to.text + "</b> "+ (to_start?"Start":"End")+"<br/>";
	}
	return text;
};
@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:


@related:
	desktop/dependency_templates.md