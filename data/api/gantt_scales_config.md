scales
=============

@short: defines configuration settings of the time scale
	

@type: Scales
@example:
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function (date) {
        return "Week #" + gantt.date.getWeek(date);
    }},
    {unit: "day", step: 1, format: "%D", css: function(date) {
    if(!gantt.isWorkTime({ date: date, unit: "day"})){
            return "weekend"
        }
    }}
];

@template:	api_config
@descr:
Each object in the array specifies a single scale. An object can take the following attributes:

- <span class=subproperty>**unit**</span> - (*string*) - the name of the scale unit. The available values are: "minute", "hour", "day" (default), "week", "quarter", "month", "year". 
There is also a possiblity to set a custom unit. Read more on the topic [here](desktop/configuring_time_scale.md#customtimeunits).
- <span class=subproperty>**step?**</span> - (*number*) - the step of the time scale (X-Axis), 1 by default.
- <span class=hybrid_property>**format? (date): any**</span> - (*string | Function*) - the format of the scale's labels. If set as a function, expects a date object as a parameter.
    - **_date_** - (*Date*) - a date that will be converted
- <span class=hybrid_property>**date? (date): any**</span> - (*string | Function*) - the format of the scale's labels. If set as a function, expects a date object as a parameter.
    - **_date_** - (*Date*) - a date that will be converted
- <span class=submethod>**css? (date): any**</span> - a function that returns the name of a CSS class that will be applied to the scale units. Takes a date object as a parameter.
    - **_date_** - (*Date*) - a date that will be checked
- <span class=subproperty>**sticky?**</span> - (*boolean*) - makes the scale label visible if the scale cell is larger than the viewport width

