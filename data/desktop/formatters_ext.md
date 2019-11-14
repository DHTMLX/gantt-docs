Formatters Extension
========================

The **gantt.ext.formatters** extension provides two formatting methods:

- [durationFormatter()](desktop/formatters_ext.md#durationformatter)
- [linkFormatter()](desktop/formatters_ext.md#linkformatter)

Duration Formatter
----------------------

The **gantt.ext.formatters.durationFormatter(config)** method returns a new instance of the *DurationFormatter*. 

**Parameters:**

- **config** - (*object*) optional, a configuration object

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// an instance of the formatter object is created using the factory method
~~~

###**API**

The created instance of the *DurationFormatter* provides following methods:

- **canParse(value: string)** - returns *true* if the provided string can be parsed into the duration value, otherwise - returns *false*

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- **format(value: number) : string**- converts the provided duration value into the duration string

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// 3 days
~~~

- **parse(value: string) : number** - parses the provided string into the duration value. If the value can’t be parsed, ‘null’ will be returned

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// 8
~~~

###**Configuration**

The **durationFormatter** method takes a configuration object with optional properties of the *durationFormatter* as a parameter:

~~~js
const formatter = gantt.ext.formatters.durationFormatter({
    // default values
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
            plural: "months",
            short: "mon"
        },
        year: {
            full: "year",
            plural: "years",
            short: "y"
        }
    }
});
~~~

The *object* has the following properties:

- **enter** - (*string*) specifies the default format for the **parse** method, which is used when an input value is entering without units

~~~js
formatter.parse("1");
// is it 1 day or 1 hour?
~~~

Default value: "day".

- **store** - (*string*) specifies the format for the duration values storage in the gantt. This property affects the output value of the **parse** method:

~~~js
formatter.parse("1 day"); // 8 - if store:"hour"
formatter.parse("1 day"); // 480 - store:"minute" 
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

**Supported values**: "auto", "minute", "hour", "day", "week", "month", "year", "an array containing any of these values".

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

Default value: *false*

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


Read details about the **durationFormatter** method in the desktop/working_time.md#taskdurationindecimalformat article.

Link Formatter
----------------------

The **gantt.ext.formatters.linkFormatter(config)** method returns a new instance of the *LinkFormatter*. 

**Parameters:**

- **config** - (*object*) optional, a configuration object

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// an instance of the formatter object is created using the factory method
~~~

###**API**

The created instance of the *LinkFormatter* provides following methods:

- **canParse(value: string)** - returns *true* if the provided string can be parsed into the link object, otherwise - returns *false*

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- **format(object: link) : string** - converts the provided link value into the string

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
~~~

- **parse(value: string) : object** - parses the provided string into the link object. If the value can’t be parsed, ‘null’ will be returned. **Note** that the *link.target* of the given link will have "null" value

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format("1SS+5 days");
// {id:1, type:"1", source: 1, target: null, lag: 5}
~~~

###**Format info**

The *LinkFormatter* supports two formats of links:

 - **${WBS}** - short format
   - **${WBS}** - [task WBS code](api/gantt_getwbscode.md)

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1"));
// {id:1, type:"0", source: 2, target: 3, lag: 0}

console.log(formatter.format({id:2, type:"0", source: 1, target: 3, lag: 0}));
// 1.1
~~~

 - **${WBS}${TYPE}${LAG}** - complete format
   - **${WBS}** - [task WBS code](api/gantt_getwbscode.md)
   - **${TYPE}** - [link type](api/gantt_links_config.md). **Supported values:** 'FF', 'FS', 'SS', 'SF', or as defined by the **labels** config of the *LinkFormatter*.
   - **${LAG}** - [link lag](desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks). It's value can be either positive or negative - **+1 day**, **-1 day**. Supported format is defined by the **durationFormatter** parameter provided into the constructor method of the *LinkFormatter*.

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

Finish-To-Start links with no lag/lead will be formatted using the short format, while the other links will be formatted using the complete format.
Similarly, if only WBS code of a task is provided into the **parse** method, the formatter will assume Finish-to-Start type and zero lag time.

###**Configuration**

The **linkFormatter** method takes a configuration object with optional properties of the *linkFormatter* as a parameter. 

~~~js
{
const formatter = gantt.ext.formatters.linkFormatter({
    //default values
    durationFormatter: gantt.ext.formatters.durationFormatter(),
    labels: {
        finish_to_finish: "FF",
        finish_to_start: "FS",
        start_to_start: "SS",
        start_to_finish: "SF"
    }
});
~~~

The *object* has the following properties:

- **durationFormatter** - (*object*) an instance of the *DurationFormatter* created by the *gantt.ext.formatters.durationFormatter()*. 
It affects how lag/lead values of links are parsed and formatted:

~~~js
gantt.ext.formatters.linkFormatter()
   .format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
 
var durationFormatter = gantt.ext.formatters.durationFormatter({
    short: true
});
gantt.ext.formatters.linkFormatter({durationFormatter: durationFormatter})
    .format({id:1, type:"2", source: 1, target: 2, lag: -1});
//"1FF-1d"
~~~

- **labels** - (*object*) locale labels for different types of links

Read details about the linkFormatter method in the desktop/inline_editing.md#linkformatter article.