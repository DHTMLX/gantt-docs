Configuration
================================================

To gain the desired look for the Gantt chart, dhtmlxGantt provides 2 objects: 

- <a href="api/refs/gantt.md#properties">gantt.config</a> - configuration options for dates, scale, controls etc.
- <a href="api/refs/gantt.md#templates">gantt.templates</a> - formatting templates for dates and labels used in the Gantt chart.

'gantt.config' object
------------------------
All the configuration options are declared in the **gantt.config** object. 

To set the desired option, just write it as it's stated in this documentation.
  
Beware, configuration options should go before the code line with dhtmlxGantt initialization. 


~~~js
gantt.config.scale_unit = "year";
gantt.config.step = 1;
gantt.config.date_scale = "%Y";
 
gantt.init("gantt_here");
~~~

See the full list of the **gantt.config** properties in  ["Gantt API:Properties"](api/refs/gantt.md#properties).

{{sample
	03_scales/02_month_days.html
}}

'gantt.templates' object
-------------------------------------

Templates can be used to change the displaying of dates and labels.

To define a template, just write it as it's stated in this documentation. Remember, the definitions of templates should go before the code line with dhtmlxGantt initialization.


~~~js
gantt.templates.task_text=function(start,end,task){
	return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
gantt.init("gantt_here");
~~~


<img src="desktop/gantt_templates.png"/>

See the full list of available templates in the [Gantt API:Templates](api/refs/gantt_templates.md) section. 

{{sample
	04_customization/08_templates.html
}}