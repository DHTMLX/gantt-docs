templates
=============

@short:defines formatting templates for dates, titles, tooltips in the Gantt chart
	

@type:object

@example:
//specifies the format of the date in the 'Start Time' column of the table
gantt.templates.date_grid = function(date){
    return gantt.date.str_to_date(gantt.config.date_grid);
};


@template:	api_config
@descr:
The properties of the **templates** object are described in a separate chapter of <br> 
the root API page <a href="api/refs/gantt.md#templates">"Gantt API: Templates"</a>.
