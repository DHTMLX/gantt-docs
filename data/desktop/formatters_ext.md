Formatters Extension
========================

The **gantt.ext.formatters** extension provides two formatting methods:

- [durationFormatter()]()
- [linkFormatter()]()

durationFormatter
----------------------

The **durationFormatter** method returns a new instance of the durationFormatter. 

~~~js
gantt.ext.formatters.durationFormatter();
~~~

The method takes a configuration object with optional properties of the *durationFormatter* as a parameter. This *object* has the following properties:



- **enter** - (*string*) specifies the default format for the **parse** method, which is used when an input value is entering without units

~~~js
formatter.parse("1");
// is it 1 day or 1 hour?
~~~

Default value: "day".

- **store** - (*string*) specifies the format for the duration values storage in the gantt. This property affects the output value of the **parse** method:

~~~js
formatter.parse("1 day"); // 24 - if store:"hours"
formatter.parse("1 day"); // 1440 - store:"minutes" 
~~~

Default value: "hour".

- **format** - (*string|array*) specifies the format for the output value

~~~js
gantt.ext.formatters.durationFormatter({
	format: ["hour", "minute"], /*!*/
	store:"minute"
}).format(260); // 4 hours 20 minutes

gantt.ext.formatters.durationFormatter({
	format: "hour", /*!*/
	store:"minute"	
}).format(260);// 4.33 hours
~~~

Supported values: "auto", "minute", "hour", "day", "week", "month", "year", "an array containing any of these values".

The "auto" value  means the formatter will try to select an appropriate unit depending on provided value (i.e. larger values will be formatted as days/months/years, smaller values will be formatted as minutes/hours).

- **short** - (*boolean*)  sets short labels (abbreviations) for time units

~~~js
gantt.ext.formatters.durationFormatter({
	format: ["week", "hour", "minute"],
	store:"minute",
	short: false /*!*/	
}).format(10021); //"4 weeks 7 hours 1 minute"
 
gantt.ext.formattersdurationFormatter.durationFormatter({
	format: ["week", "hour", "minute"],
	store:"minute",
	short: true	 /*!*/
}).format(10021); //"4wk 7h 1min"
~~~

Default value: false

- **minutesPerHour** - (*number*) - defines how duration values will be converted from minutes to hours and vice-versa. 
*Default value: 60*

- **hoursPerDay** - (*number*) - defines how duration values will be converted from hours to days and vice-versa. 
*Default value: 8*

- **hoursPerWeek** - (*number*) - defines how duration values will be converted from hours to weeks and vice-versa. 
*Default value: 40*

- **daysPerMonth** - (*number*) - defines how duration values will be converted from days to months and vice-versa. 
*Default value: 30*

- **daysPerYear** - (*number*) - defines how duration values will be converted from days to years and vice-versa. 
*Default: 365*

- **labels** - (*object*) - defines text labels for different time units. These labels are used both for parsed and formatted values. 


~~~js
{
    enter: "day",
    store: "hour",
    format: "auto",
    short: false,
    minutesPerHour: 60,
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30,
    daysPerYear: 365,
    labels: {
        minute: {
            full: "minute",
            plural: "minutes",
            short: "min"
        },
        hour: {
            full: "hour",
            plural: "hours",
            short: "h"
        },
        day: {
            full: "day",
            plural: "days",
            short: "d"
        },
        week: {
            full: "week",
            plural: "weeks",
            short: "wk"
        },
        month: {
            full: "month",
            plural: "month",
            short: "mon"
        },
        year: {
            full: "year",
            plural: "years",
            short: "y"
        }
    }
}
~~~
