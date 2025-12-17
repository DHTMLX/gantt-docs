---
sidebar_label: scales
title: scales config
description: "defines configuration settings of the time scale"
---

# scales

### Description

@short: Defines configuration settings of the time scale

@signature: scales: Scales

### Example

~~~jsx
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
~~~

### Details

Each object in the array specifies a single scale. An object can take the following attributes:

- **unit** - (*string*) - the name of the scale unit. The available values are: "minute", "hour", "day" (default), "week", "quarter", "month", "year". 
There is also a possiblity to set a custom unit. Read more on the topic [here](guides/configuring-time-scale.md#customtimeunits).
- **step?** - (*number*) - the step of the time scale (X-Axis), 1 by default.
- **format? (date): any** - (*string | Function*) - the format of the scale's labels. If set as a function, expects a date object as a parameter.
    - **_date_** - (*Date*) - a date that will be converted
- **date? (date): any** - (*string | Function*) - the format of the scale's labels. If set as a function, expects a date object as a parameter.
    - **_date_** - (*Date*) - a date that will be converted
- **css? (date): any** - a function that returns the name of a CSS class that will be applied to the scale units. Takes a date object as a parameter.
    - **_date_** - (*Date*) - a date that will be checked
- **sticky?** - (*boolean*) - makes the scale label visible if the scale cell is larger than the viewport width
