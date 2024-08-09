skip_off_time
=============

@short:hides non-working time from the time scale
	
@edition: pro
@type: boolean
@default:false
@example:
// calculates duration in working hours and hides non-working time from the chart
gantt.config.duration_unit = "hour";
gantt.config.work_time = true; 
gantt.config.skip_off_time = true; /*!*/

gantt.init("gantt_here");

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

Please note that the **skip_off_time** config doesn't modify the scale and hides the cells that don't have any working time at all. 

Example 1

A day scale starts at 00:00 and ends at 23:59, the working hours start at 08:00 and end at 16:59. You have a minimal scale in hours. 
When the **skip_off_time** config is set to *true*, the cells that have non-working time, will be hidden for all the scales. 
Thus, the day scale will start at 08:00 and end at 16:59. However, if you have just a day scale, it won't be changed.
It will start at 00:00 and end at 23:59, since there are working hours inside a day.

Example 2

A week scale has 7 days, 2 of which are days off (e.g. Saturday and Sunday). You have a minimal scale in days. When the **skip_off_time** config is set to *true*, the days off
are hidden and the week scale is rendered from Monday to Friday. However, if you have just a week scale the week will start on Monday and end on Sunday, indepenent of the 
**skip_off_time** config, since there are days off in a week.

There are two ways to render a chart with hidden non-working time:

- to add a scale with lesser units (an hour scale for a day scale, a day scale for a week scale, etc.)
- to add a [custom scale](desktop/configuring_time_scale.md#customtimeunits) that will render just the working hours/days

{{editor	https://snippet.dhtmlx.com/eq70o558		5-day work weeks on the scale}}

@related:
	 desktop/working_time.md
@relatedapi:
	api/gantt_correct_work_time_config.md
     api/gantt_work_time_config.md