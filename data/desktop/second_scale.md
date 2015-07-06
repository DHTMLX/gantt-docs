Adding the Second Scale(s)
=================================
To present tasks in different time units, simultaneously, you can add any number of additional scales underneath the default one.

The second scales are defined with the api/gantt_subscales_config.md property:

~~~js
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";


gantt.config.subscales = [
	{unit:"week", step:1, date:"%W"},
	{unit:"day", step:1, date:"%D" }
];
~~~


You can configure the following aspects of a second scale:

- [unit](desktop/second_scale.md#settingthescalesunit)
- [step](desktop/second_scale.md#settingthescalesstep)
- [format](desktop/second_scale.md#settingthescalesformat)
- [style](desktop/second_scale.md#settingthescalesstyle)

Setting the scale's unit
-------------------------------------------
To set the unit of the second scale, use the **unit** attribute of the  api/gantt_subscales_config.md property:

~~~js
gantt.config.subscales = [
	{unit:"month", date:"%F, %Y" }
];
~~~

{{sample
	03_scales/01_multiple_scales.html
}}


Setting the scale's step
-------------------------------------------
To set the step of the second scale, use the **step** attribute of the  api/gantt_subscales_config.md property:

~~~js
gantt.config.subscales = [
	{unit:"month", step:1, date:"%F, %Y" }
];
~~~

{{sample
	03_scales/01_multiple_scales.html
}}


Setting the scale's format
-------------------------------------------
To set the format of the second scale, use:

- the **date** attribute,  to set a simple format as a string:

~~~js
gantt.config.subscales = [
	{unit:"week", step:1, date:"%W"}
];
~~~
- the **template** attribute,  to set a complex format as a function that takes a date object as a parameter:

~~~js
gantt.config.subscales = [
	{unit:"week", step:1, template:weekScaleTemplate}
];

var weekScaleTemplate = function(date){
		var dateToStr = gantt.date.date_to_str("%d %M");
		var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
		return dateToStr(date) + " - " + dateToStr(endDate);
	};

~~~


{{sample
	03_scales/01_multiple_scales.html
}}


{{note
See the desktop/date_format.md article to know about available format characters 
}}


Setting the scale's style
------------------------------------------
To style the second scale, use the **css** attribute of the  api/gantt_subscales_config.md property:

~~~html
<style type="text/css">
.weekend{
    background: #F0DFE5 !important;
}
</style>
~~~
~~~js
gantt.config.subscales = [
	{unit:"day", date:"%D", css:daysStyle }
];

var daysStyle = function(date){
	var dateToStr = gantt.date.date_to_str("%D");
    if (dateToStr(date) == "Sun"||dateToStr(date) == "Sat")  return "weekend";

	return "";
};
~~~



{{note
Use the <b> !important</b> keyword with CSS properties to guarantee that they will be correctly applied.
}}