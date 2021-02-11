task_end_date
=============

@params:
- date	Date	the date which needs formatting

@returns:
- text		string		html text which will be rendered in the gantt

@short:
	specifies the format for the end dates of tasks in the lightbox

@type:

@example:

gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

@template:	api_template
@descr:

### Setting format for inclusive end dates

The template can be redefined in order to change style of the end dates of tasks in the gantt (i.e. to include the end date in the duration of the tasks).

For example, let's consider a task that starts on April 2nd, 2020 and lasts for one day.

By default, the end date of this task will be displayed as April 3rd, 2020 (`03-04-2020 00:00:00`):

- [Live demo: Default format](https://snippet.dhtmlx.com/24f73d6ec)

<img  src="api/task_end_date_template_default.png"/>


You can change the format of the end date to April 2nd, 2020:

- [Live demo: Inclusive end date format](https://snippet.dhtmlx.com/f2c801d3d)

<img  src="api/task_end_date_template.png"/>

To do this you need to override the **columns** config, as in:

~~~js

gantt.config.columns = [
  {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
  {name: "text", label: "Name", tree: true, width: 200, resize: true},
  {name: "start_date", label: "Start", width:80, align: "center", resize: true},
  {name: "end_date", label: "Finish", width:80, align: "center", resize: true},	
  {name:"add"}
];
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
   if(column === "end_date"){
     return gridDateToStr(new Date(date.valueOf() - 1)); 
   }else{
     return gridDateToStr(date); 
   }
}
gantt.init("gantt_here");

~~~


@relatedapi:
	api/gantt_task_date_config.md
    api/gantt_task_date_template.md
    api/gantt_grid_date_format_template.md
@related:
	desktop/lightbox_templates.md