---
title: "Configuration"
sidebar_label: "Configuration"
---

# Configuration

To gain the desired look for the Gantt chart, dhtmlxGantt provides 2 objects: 

- [gantt.config](api/overview/properties-overview.md) - configuration options for dates, scale, controls etc.
- [gantt.templates](api/overview/templates-overview.md) - formatting templates for dates and labels used in the Gantt chart.

## 'gantt.config' object {#ganttconfigobject}

All the configuration options are declared in the **gantt.config** object. 

To set the desired option, just write it as it's stated in this documentation.
  
Beware, configuration options should go before the code line with dhtmlxGantt initialization. 


~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

See the full list of the **gantt.config** properties in ["Gantt API:Properties"](api/overview/properties-overview.md).


**Related sample**: [Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


## 'gantt.templates' object {#gantttemplatesobject}

Templates can be used to change the displaying of dates and labels.

To define a template, just write it as it's stated in this documentation. Remember, the definitions of templates should go before the code line with dhtmlxGantt initialization.


~~~js
gantt.templates.task_text =
    (start, end, task) => `<b>Text:</b> ${task.text},<b> Holders:</b> ${task.users}`;

gantt.init("gantt_here");
~~~


![gantt_templates](/img/gantt_templates.png)

See the full list of available templates in the [Gantt API:Templates](api/overview/templates-overview.md) section. 


**Related sample**: [Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)
