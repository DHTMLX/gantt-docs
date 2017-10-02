progress_text
=============

@short:specifies the text in the completed part of the task bar
	
@params:
- start		Date		the date when a task is scheduled to begin  
- end		Date		the date when a task is scheduled to be completed
- task		object	 	the task object

@example:
gantt.templates.progress_text=function(start, end, task){return "";};


@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt

@descr:


@related:
	 desktop/timeline_templates.md
     
@relatedsample:
04_customization/07_progress_text.html