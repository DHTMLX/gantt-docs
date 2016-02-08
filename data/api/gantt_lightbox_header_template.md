lightbox_header
=============

@short:specifies the lightbox's header
	

@params:
- start_date	Date	the date when a task is scheduled to begin   
- end_date	Date	the date when a task is scheduled to be completed
- task	object	the task's object

@returns:
- text    string     an HTML text for rendering in the gantt


@example:
gantt.templates.lightbox_header = function(start_date,end_date,task){
	return gantt.templates.task_time(task.start_date, task.end_date, task)  +  "&nbsp;" +
    (gantt.templates.task_text(task.start_date, task.end_date, task) || "").substr(0, 70);
};

@template:	api_template
@descr:


@related:
	desktop/lightbox_templates.md





@descr:
Note, if the template isn't specified, the date part of the header will be set according to the api/gantt_task_time_template.md template.


    