Configuration
================================================

To gain the desired look for the Gantt chart, dhtmlxGantt provides 2 objects: 

- [gantt.config](api/refs/gantt_props.md) - configuration options for dates, scale, controls etc.
- [gantt.templates](api/refs/gantt_templates.md) - formatting templates for dates and labels used in the Gantt chart.

'gantt.config' object
------------------------
All the configuration options are declared in the **gantt.config** object. 

To set the desired option, just write it as it's stated in this documentation.
  
Beware, configuration options should go before the code line with dhtmlxGantt initialization. 


~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

See the full list of the **gantt.config** properties in  ["Gantt API:Properties"](api/refs/gantt_props.md).

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