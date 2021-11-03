date_grid
=============
@short:sets the format of dates in the "Start time" column of the table
	

@type: string
@default:"%Y-%m-%d"
@example:
gantt.config.date_grid = "%d/%m/%Y";

gantt.init("gantt_here");

@template:	api_config
@descr:
To change the **grid_date** config dynamically (for instance, after a user changes the locale language), you need to redefine the [grid_date_format](api/gantt_grid_date_format_template.md) template:

~~~js
function change_grid_date(){
  gantt.config.date_grid = "%d.%m.%Y";
  gantt.render()
}
gantt.templates.grid_date_format = function(date, column){
  return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

**Related sample:** [Changing date in grid dynamically](https://snippet.dhtmlx.com/5/eb8d92554)


@relatedapi:
	api/gantt_date_grid_template.md
