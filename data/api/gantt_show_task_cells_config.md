show_task_cells
=============
@short:enables/disables displaying column borders in the chart area
	

@type: boolean
@default:true
@example:
//hides column borders in the time scale
gantt.config.show_task_cells = false;
 
gantt.init("gantt_here");

@template:	api_config
@descr:
When the property is set to *'false'*, it disables rendering of individial cells  - renders just rows.<br> It can be used to increase the performance, especially if you are displaying a big amount of tasks in the chart.


