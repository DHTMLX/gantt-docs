scales
=============

@todo:
	check 


@short:defines the configuration settings of the time scale
	

@type: array
@example:
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];

@template:	api_config
@descr:
Each object in the array specifies a single scale. An object can take the following attributes:

- **unit** - (*string*) the name of the scale unit. The available values are: "minute", "hour", "day" (default), "week", "quarter", "month", "year". 
There is also a possiblity to set a custom unit. Read more on the topic [here](desktop/configuring_time_scale.md#customtimeunits).
- **step** - (*number*) the step of the time scale (X-Axis), 1 by default.
- **format** - (*string*|*function*) the format of the scale's labels. If set as a function, expects a date object as a parameter.
- **css** (*function*) a function that returns the name of a CSS class that will be applied to the scale units. Takes a date object as a parameter.
