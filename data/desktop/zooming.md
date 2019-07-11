Zooming
==============

dhtmlxGantt doesn't have a built-in 'zoom' method. However, the ability to change the settings of time scale dynamically allows implementing it easily.

In fact, implementing a zooming feature means defining several presets of the time scale configuration (zoom levels) and providing the user with the ability to switch between them.

You'll need the following settings to configure the time scale:

- [gantt.config.scale_unit](api/gantt_scale_unit_config.md), [gantt.config.step](api/gantt_step_config.md), [gantt.config.date_scale](api/gantt_date_scale_config.md), 
- unit, step and date format for the primary time scale.

Note, that the date format of the time scale is defined by the **date_scale** *template*, and the **date_scale** *config* sets the default value for the template.
It means that if you have both a template and a config specified, the template value will be used. If you want to define the date format via the **date_scale** config, you need to set the **date_scale** template to *null*.

- [gantt.config.subscales](api/gantt_subscales_config.md) - allows setting any number of additional time scale rows.

- [gantt.config.min_column_width](api/gantt_min_column_width_config.md), [gantt.config.scale_height](api/gantt_scale_height_config.md) - the scale column width and the overall height of the time scale.

Let's consider the following presets:

~~~js
/* global gantt */
function setScaleConfig(level) {
	switch (level) {
		case "day":
			gantt.config.scale_unit = "day";
			gantt.config.step = 1;
			gantt.config.date_scale = "%d %M";
			gantt.templates.date_scale = null;

			gantt.config.scale_height = 27;

			gantt.config.subscales = [];
			break;
		case "week":
			var weekScaleTemplate = function (date) {
			  var dateToStr = gantt.date.date_to_str("%d %M");
			  var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
			  return dateToStr(date) + " - " + dateToStr(endDate);
			};

			gantt.config.scale_unit = "week";
			gantt.config.step = 1;
			gantt.templates.date_scale = weekScaleTemplate;

			gantt.config.scale_height = 50;

			gantt.config.subscales = [
				{unit: "day", step: 1, date: "%D"}
			];
			break;
		case "month":
			gantt.config.scale_unit = "month";
			gantt.config.date_scale = "%F, %Y";
			gantt.templates.date_scale = null;

			gantt.config.scale_height = 50;

			gantt.config.subscales = [
				{unit: "day", step: 1, date: "%j, %D"}
			];

			break;
		case "year":
			gantt.config.scale_unit = "year";
			gantt.config.step = 1;
			gantt.config.date_scale = "%Y";
			gantt.templates.date_scale = null;

			gantt.config.min_column_width = 50;
			gantt.config.scale_height = 90;

			gantt.config.subscales = [
				{unit: "month", step: 1, date: "%M"}
			];
			break;
	}
}
~~~

<br>
The described function can configure the gantt object by one of the four predefined configs, from the "day" to "year" time scale.
Gantt will require a complete repaint in order to display the change of configuration:<br>

~~~js
setScaleConfig("year");
gantt.init("gantt_here");
~~~


Then you can implement a UI for the user to switch the zoom level:<br><br>

~~~html
<label><input type="radio" name="scale" value="day" checked/>Day scale</label>
<label><input type="radio" name="scale" value="week"/>Week scale</label>
<label><input type="radio" name="scale" value="month"/>Month scale</label>
<label><input type="radio" name="scale" value="year"/>Year scale</label> 
~~~

<br>
~~~js
var els = document.querySelectorAll("input[name='scale']");
for (var i = 0; i < els.length; i++) {
	els[i].onclick = function(e){
		e = e || window.event;
		var el = e.target || e.srcElement;
		var value = el.value;
		setScaleConfig(value);
		gantt.render();
	};
}
~~~


{{sample 03_scales/05_dynamic_scales.html}}

{{sample 03_scales/13_zoom_to_fit.html}}

@todo:
check