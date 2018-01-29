Setting up the Scale
===========================================

<img src="desktop/gantt_dates.png"/>


You can configure the following aspects of the time scale (X-Axis):

1. [Unit](desktop/configuring_time_scale.md#timeunitofthescale)
2. [Range](desktop/configuring_time_scale.md#daterangeofthescale)
3. [Step](desktop/configuring_time_scale.md#stepofthescale)
4. [Height](desktop/configuring_time_scale.md#heightofthescale)
5. [Format](desktop/configuring_time_scale.md#formatofthescale)
6. [Style](desktop/configuring_time_scale.md#styleofthescale)
7. [Second scale](desktop/configuring_time_scale.md#secondscales)

You can also add a [custom scale](desktop/configuring_time_scale.md#customscale).


Time unit of the scale
----------------------------------------

<img src="desktop/week_scale_unit.png"/>


To set the unit of the scale, use the api/gantt_scale_unit_config.md property: 

{{snippet
Setting the "week" unit for the scale
}}
~~~js
gantt.config.scale_unit = "week"; /*!*/
gantt.config.date_scale = "Week #%W";
gantt.init("gantt_here");
~~~
{{sample
	03_scales/02_month_days.html
}}



Date range of the scale
--------------------------------------

<img src="desktop/day_scale_unit.png"/>

###Default range settings

If you don't specify the date range explicitly, Gantt uses the dates of the loaded tasks and adds offsets before the first and after the last task in the scale. The offset is defined by the settings of the time scale.
Depending on the [scale_offset_minimal](api/gantt_scale_offset_minimal_config.md) value, it will be either the time unit defined in via the api/gantt_scale_unit_config.md option or the smallest of the time scale units.

You can get the displayed date range programmatically using the api/gantt_getstate.md method.

~~~js
var state = gantt.getState();

console.log(state.min_date);
// -> Mon Jan 01 2018 00:00:00

console.log(state.max_date);
// -> Tue Jan 01 2019 00:00:00
~~~

The scale range is recalculated on [gantt rendering](api/gantt_render.md). If the user moves a task outside the displayed time range, the task row will be displayed, but the bar element won't be visible until complete repainting is done.


In order to adjust scale automatically, use the api/gantt_fit_tasks_config.md config.

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~

{{sample  03_scales/08_scale_autoconfig.html}}

###Setting date range explicitly

Alternatively, you can set the date range explicitly by using the api/gantt_start_date_config.md and api/gantt_end_date_config.md configuration options:

~~~js
gantt.config.start_date = new Date(2018, 02, 31);
gantt.config.end_date = new Date(2018, 03, 09);
 
gantt.init("gantt_here");
~~~

They can also be specified in the [gantt initialization](api/gantt_init.md) call:

~~~js
gantt.init("gantt_here", new Date(2018, 02, 31), new Date(2018, 03, 09));
~~~

{{sample
	01_initialization/08_explicit_time_range.html
}}


The tasks that don't fit into the specified interval won't be displayed in the Gantt chart, unless they are [marked as unscheduled](desktop/unscheduled_tasks.md).

{{sample 01_initialization/19_tasks_without_dates.html}}

###Changing the displayed range dynamically

As a third approach, you can control the time range with the help of the **start_date / end_date** configs, but dynamically adjust them to display loaded tasks.

You can do it by [recalculating the scale range](api/gantt_getsubtaskdates.md) via updating the **start_date / end_date** configs each time gantt is repainted:

~~~js
gantt.attachEvent("onBeforeGanttRender", function(){
   var range = gantt.getSubtaskDates();
   var scaleUnit = gantt.getState().scale_unit;
   if(range.start_date && range.end_date){
     gantt.config.start_date = gantt.calculateEndDate(range.start_date, -4, scaleUnit);
     gantt.config.end_date = gantt.calculateEndDate(range.end_date, 5, scaleUnit);
   }
});

gantt.init("gantt_here");
~~~



Step of the scale
--------------------------------------

<img src="desktop/scale_step.png"/>

To set the step of the time scale, use the api/gantt_step_config.md property:

{{snippet
Setting the "day" step for the scale
}}
~~~js
gantt.config.scale_unit= "day";
gantt.config.step = 2;  /*!*/

gantt.init("gantt_here");
~~~

{{sample
	03_scales/03_full_year.html
}}


Height of the scale
--------------------------------------

<img src="desktop/scale_height.png"/>

To set the height of the scale, use the api/gantt_scale_height_config.md property:

~~~js
gantt.config.scale_height = 54; /*!*/

gantt.init("gantt_here");
~~~

{{sample
	03_scales/04_days.html
}}


If you have several scales, they will share the specified height equally. For example, if **scale_height** is 60 pixels and you have 3 scales, each scale will have the height of 60 / 3 = 20 pixels.



Format of the scale
----------------------------------------------

{{note
See the desktop/date_format.md article to know about available format characters 
}}


To set the format of the scale, use:

<ul>
	<li>the api/gantt_date_scale_config.md property,  to set a simple format as a string:<br><br>

~~~js
gantt.config.scale_unit = "day";
gantt.config.date_scale = "%F, %d"; /*!*/

gantt.init("gantt_here");
~~~

{{sample
	03_scales/01_multiple_scales.html
}}

<img style="margin-top:12px; margin-bottom:20px;" src="desktop/scale_format.png"/>


</li>
<li>the api/gantt_date_scale_template.md template,  to set a complex format as a function that takes a date object as a parameter:<br><br>

~~~js
var scale_day = 0;
gantt.templates.date_scale = function(date) {/*!*/
	var d = gantt.date.date_to_str("%F %d");/*!*/
    return "<strong>Day " + (scale_day++) + "</strong><br/>" + d(date);/*!*/
};/*!*/
gantt.config.scale_height = 44;
gantt.init("gantt_here");
~~~


{{sample
	03_scales/06_custom_scales.html
}}

<img style="margin-top:12px;" src="desktop/scale_template.png"/>
</li>
</ul>

Style of the scale
------------------------------------

<img src="desktop/scale_style.png"/>

To style the scale, use the api/gantt_scale_cell_class_template.md template:

{{snippet
Setting a custom style for the scale
}}
~~~js
<style type="text/css">
   .weekend{ background: #BD7990!important; color:white !important;}
</style>
<script>
	gantt.templates.scale_cell_class = function(date){/*!*/
        if(date.getDay()==0||date.getDay()==6){ return "weekend"; }/*!*/
    };/*!*/
    gantt.init("gantt_here");
</script>
~~~

{{sample
	04_customization/06_highlight_weekend.html
}}


Read more on applying a custom style to the timeline area in the desktop/highlighting_time_slots.md article.

Second scale(s)
----------------------------------------------

<img src="desktop/secondscale.png"/>

To add the second scale(s) underneath the default one, use the the api/gantt_subscales_config.md property:

{{snippet
Adding the second scale to the Gantt chart
}}
~~~js
gantt.config.subscales = [/*!*/
	{unit:"week", step:1, date:"Week #%W"}/*!*/
];/*!*/
gantt.config.scale_height = 54;
gantt.init("gantt_here");
~~~
{{sample
	03_scales/01_multiple_scales.html
}}

Read more on second scales in a separate article - desktop/second_scale.md.



Custom time units
-------------------------------------------------

dhtmlxGantt allows you to define custom time units and set a template for labels in the scale configuration.

To define a custom unit you need to define 2 functions in the [Date object](api/gantt_date_other.md): 

~~~js
Date gantt.date.<unit>_start(Date date);
Date gantt.date.add_<unit>(Date date, Integer increment);
~~~

- The first function shall return the start time unit for any given date (e.g. month_start for 14 Feb -> 1st Feb).
- The second function increments the date by any given number of duration units (e.g. 'date minus 2 days') 

Let's create a "fiscal_year" unit and assume that a fiscal year will end on the 31st of January. This is how the new unit can be specified:


~~~js
var firstMonth = 1,
    firstDay = 1;

gantt.date.fiscal_year_start = function(date){       /*!*/
   var next = new Date(date);
   if(next.getMonth() < firstMonth || 
      (next.getMonth() === firstMonth && next.getDate() < firstDay)){
      next = gantt.date.add(next, -1, "year"); 
   }
  
  next = gantt.date.year_start(next);
  next.setMonth(firstMonth);
  next.setDate(firstDay);
 
  return next;
}; 

gantt.date.add_fiscal_year = function(date, inc){    /*!*/
   return gantt.date.add(date, inc, "year");
};
~~~

And then use it in the code as in:

~~~js
var dateToStr = gantt.date.date_to_str("%Y");
function fiscalYearLabel(date){
    return dateToStr(gantt.date.fiscal_year_start(date));
};

gantt.config.subscales = [
  {unit:"year", step:1, date:"Calendar year %Y"},
  {unit:"fiscal_year", step:1, template:fiscalYearLabel}
];
~~~

