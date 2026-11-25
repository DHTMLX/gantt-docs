---
title: "Formatters Extension"
sidebar_label: "Formatters Extension"
---

# Formatters Extension

:::note
The examples with duration units, link types and lag or lead values apply to the paid editions. The Community edition provides numeric duration formatting and basic dependency references.
:::

The **gantt.ext.formatters** extension provides two formatting methods:

- [durationFormatter()](guides/formatters-ext.md#durationformatter)
- [linkFormatter()](guides/formatters-ext.md#linkformatter)

You can also specify a [custom formatter](#customformatter) based on the existing ones.

## Duration Formatter {#durationformatter}

Call **gantt.ext.formatters.durationFormatter()** to use the shared default formatter for the current duration unit. Pass a configuration object to create a separate formatter.

In a grid column named `duration`, set [default_formatter: true](guides/specifying-columns.md#durationcolumn) to use this default for display. The raw duration remains the default display value when this option is off.

### **Configuration**

- <span class="submethod">**durationFormatter (config): DurationFormatter**</span> - creates a Duration Formatter
    - **_config?_** - (*object*) - optional, a configuration object which can include the following attributes:
        - **_enter?_** - (*string*) - sets the unit used by **parse** when the input has no unit. Defaults to [duration_unit](api/config/duration_unit.md).
        - **_store?_** - (*string*) - sets the unit for stored duration values and the result of **parse**. Defaults to [duration_unit](api/config/duration_unit.md).
        - **_format?_** - (*string | Array &lt;string&gt;*) - specifies the format for the output value. Supported values: "auto", "minute", "hour", "day", "week", "month", "year", "an array containing any of these values". The "auto" value  means the formatter will try to select an appropriate unit depending on provided value (i.e. larger values will be formatted as days/months/years, smaller values will be formatted as minutes/hours).
        - **_short?_** - (*boolean*) - sets short labels (abbreviations) for time units. Default value: *false*
        - **_minutesPerHour?_** - (*number*) - defines how duration values will be converted from minutes to hours and vice-versa. *Default value: 60*
        - **_hoursPerDay?_** - (*number*) - defines how duration values will be converted from hours to days and vice-versa. *Default value: 8*
        - **_hoursPerWeek?_** - (*number*) - defines how duration values will be converted from hours to weeks and vice-versa. *Default value: 40*
        - **_daysPerMonth?_** - (*number*) - defines how duration values will be converted from days to months and vice-versa. *Default value: 30*
        - **_daysPerYear?_** - (*number*) - defines how duration values will be converted from days to years and vice-versa. *Default: 365*
        - **_labels?_** - (*object*) - defines text labels for different time units. These labels are used both for parsed and formatted values. 
            - **_minute?_** - (*object*) - configuration for minutes
                - **_full?_** - (*string*) - full text label for minutes
                - **_plural?_** - (*string*) - plural text label for minutes
                - **_short?_** - (*string*) - short text label for minutes
            - **_hour?_** - (*object*) - configuration for hours
                - **_full?_** - (*string*) - full text label for hours
                - **_plural?_** - (*string*) - plural text label for hours
                - **_short?_** - (*string*) - short text label for hours
            - **_day?_** - (*object*) - configuration for days
                - **_full?_** - (*string*) - full text label for days
                - **_plural?_** - (*string*) - plural text label for days
                - **_short?_** - (*string*) - short text label for days
            - **_week?_** - (*object*) - configuration for weeks
                - **_full?_** - (*string*) - full text label for weeks
                - **_plural?_** - (*string*) - plural text label for weeks
                - **_short?_** - (*string*) - short text label for weeks
            - **_month?_** - (*object*) - configuration for months
                - **_full?_** - (*string*) - full text label for months
                - **_plural?_** - (*string*) - plural text label for months
                - **_short?_** - (*string*) - short text label for months
            - **_year?_** - (*object*) - configuration for years
                - **_full?_** - (*string*) - full text label for years
                - **_plural?_** - (*string*) - plural text label for years
                - **_short?_** - (*string*) - short text label for years


**Examples:**

Initialize Duration Formatter with the default settings:
~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// an instance of the formatter object is created using the factory method
~~~

- **_enter_**:
~~~js
formatter.parse("1"); // entered value: 1 day - if enter:"day" (default)
formatter.parse("1"); // entered value: 1 hour - if enter:"hour"
~~~

- **_store_**:

~~~js
formatter.parse("1 day"); // stored value: 8 - if store:"hour"
formatter.parse("1 day"); // stored value: 480 - store:"minute" 
~~~


- **_format_**
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


- **_short_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: false /*!*/    
}).format(10021); //"4 weeks 7 hours 1 minute"
 
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: true     /*!*/
}).format(10021); //"4wk 7h 1min"
~~~


Example of the full configuration:
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

### **API**

The created instance of the *DurationFormatter* provides the following methods:

- <span class="submethod">**canParse (value): boolean**</span> - returns *true* if the provided string can be parsed into the duration value, otherwise - returns *false*
    - **_value_** - (*string*) - the string that will be checked


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (value): string**</span> - converts the provided duration value into the duration string
    - **_value_** - (*number*) - the duration value that will be converted

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// 3 days
~~~

- <span class="submethod">**parse (value): number**</span> - parses the provided string into the duration value. If the value can't be parsed, 'null' will be returned
    - **_value_** - (*string*) - the string that will be converted


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// 8
~~~

Read details about the **durationFormatter** method in the [Work Time Calculation](guides/working-time.md#taskdurationindecimalformat) article.

## Link Formatter {#linkformatter}

Call **gantt.ext.formatters.linkFormatter()** to use the shared default formatter. Pass a configuration object to create a separate formatter. The full link formatter uses a Duration Formatter for lag and lead values.

### **Configuration**

- <span class="submethod">**linkFormatter (config): LinkFormatter**</span> - create a Link Formatter
    - **_config?_** - (*object*) - optional, a configuration object which can include the following attributes:
        - **_reference?_** - (*string*) - selects the [task reference](#task-references) used for both display and parsing. Defaults to `"legacy"`.
        - **_durationFormatter?_** - (*DurationFormatter*) - an instance of the *DurationFormatter* created by the *gantt.ext.formatters.durationFormatter()*. It affects how lag/lead values of links are parsed and formatted:
        - **_labels?_** - (*object*) - locale labels for different types of links
            - **_finish_to_start?_** - (*string*) - labels for the Finish to Start links
            - **_start_to_start?_** - (*string*) - labels for the Start to Start links
            - **_finish_to_finish?_** - (*string*) - labels for the Finish to Finish links
            - **_start_to_finish?_** - (*string*) - labels for the Start to Finish links

**Examples:**


Initialize Link Formatter with the default settings:

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// uses the shared default link formatter
~~~

- **_short_**:

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


- **_labels_**:
~~~js
const formatter = gantt.ext.formatters.linkFormatter({
    //default values
    durationFormatter: gantt.ext.formatters.durationFormatter(),
    labels: {
        finish_to_start: "FS",
        start_to_start: "SS",
        finish_to_finish: "FF",
        start_to_finish: "SF"
    }
});
~~~


### Task references {#task-references}

| `reference` | Value |
| --- | --- |
| `"legacy"` | The display-order WBS number from [getWBSCode](api/method/getwbscode.md). In MIT, the basic formatter displays the task ID and accepts numeric IDs as dependency references. |
| `"outline"` | A dotted hierarchy number from [getOutlineNumber](api/method/getoutlinenumber.md), such as `2.1`. Requires the numbering API available in paid editions. |
| `"row"` | A positive integer from [getRowNumber](api/method/getrownumber.md), such as `12`. Requires the numbering API available in paid editions. |

Use one reference format for displaying and editing a dependency column. Stored WBS codes such as `PRJ-A.001` are task fields and cannot be used as link references. See [WBS Codes and Task Numbering](guides/wbs-and-task-numbering.md).

The paid formatter accepts a link type and lag or lead after the number. For example, `2.1SS+2 days` refers to outline number `2.1` when `reference` is `"outline"`.

### **API**

The created instance of the *LinkFormatter* provides the following methods:


- <span class="submethod">**canParse (value): boolean**</span> - returns *true* if the provided string can be parsed into the link object, otherwise - returns *false*
    - **_value_** - (*string*) - the string that will be checked

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (link): string**</span> - converts the provided link value into the string
    - **_value_** - (*Link*) - the link object that will be converted

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
~~~

- <span class="submethod">**parse (value): object**</span> - parses the provided string into the link object. If the value can't be parsed, 'null' will be returned. **Note** that the *link.target* of the given link will have "null" value
    - **_value_** - (*string*) - the string that will be converted

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.parse("1SS+5 days");
// {id:1, type:"1", source: 1, target: null, lag: 5}
~~~

### **Format info**

The *LinkFormatter* supports two formats of links:

 - **$(WBS)** - short format
   - **$(WBS)** - a number in the selected [task reference format](#task-references)

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1"));
// {id:1, type:"0", source: 2, target: 3, lag: 0}

console.log(formatter.format({id:2, type:"0", source: 1, target: 3, lag: 0}));
// 1.1
~~~

 - **$(WBS)$(TYPE)$(LAG)** - complete format
   - **$(WBS)** - a number in the selected [task reference format](#task-references)
   - **$(TYPE)** - [link type](api/config/links.md). **Supported values:** 'FF', 'FS', 'SS', 'SF', or as defined by the **labels** config of the *LinkFormatter*.
   - **$(LAG)** - [link lag](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks). It's value can be either positive or negative - **+1 day**, **-1 day**. Supported format is defined by the **durationFormatter** parameter provided into the constructor method of the *LinkFormatter*.

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

Finish-To-Start links with no lag/lead will be formatted using the short format, while the other links will be formatted using the complete format.
If you pass only the task reference to **parse**, the formatter uses a Finish-to-Start link with zero lag.

Read details about the linkFormatter method in the [Inline Editing in Grid](guides/inline-editing.md#linkformatter) article.


## Custom Formatter {#customformatter}

The Gantt functionality allows you to create a custom formatter on the base of the existing Gantt formatters. You can add a custom formatter to the inline editor. Under the 
hood Gantt will store data in the format it expects, while when a user will open the inline editor, it will show the value that the user needs.

A custom formatter is an object with two functions: **format()** and **parse()**.

The **format()** function converts either a number (custom duration formatter) or a link (custom link formatter) into the necessary value. The **parse()** function converts a
formatted value either into a number (custom duration formatter) or a link (custom link formatter).

This is how the custom formatters look like: 

~~~js
const customDurationFormatter = {
    format: function (duration) {
        let formattedDuration;
        // code to convert from number to the desired value
        return formattedDuration;
    },
    parse: function (formattedValue) {
        let duration;
        // code to convert from the desired value to number
        return duration;
    }
};

const customLinkFormatter = {
    format: function (link) {
        let formattedLink;
        // code to convert from the link object to the desired value
        return formattedLink;
    },
    parse: function (formattedValue) {
        let link;
        // code to convert from the desired value to the `link` object
        return link
    }
};
~~~

You can use the existing formatters in the custom formatters and modify the values they return.

Custom formatters are specified for the inline editors the same as the usual formatters. For example:

~~~js
const durationEditor = { 
    type: "duration", map_to: "duration", formatter: customDurationFormatter 
};
~~~

Here's an example of custom duration and link formatters:

**Related sample** [Custom duration and link formatters](https://snippet.dhtmlx.com/gcvw2a6c)

## Custom rules for plural forms 

The configuration of the default [Duration Formatter](guides/formatters-ext.md#durationformatter) allows using just one form for the plural form of a noun, since in English 
the plural form is made by adding a suffix or changing the noun itself.

In other languages a word can have several variants of the plural form. Besides, there can be different rules for the usage of different plural forms. 
You can use a custom formatter and specify the rules for your language. The example below shows how you can apply the necessary rules in a custom formatter for the
Japanese language:

**Related sample** [Custom duration formatter with different plural values for Japanese locale](https://snippet.dhtmlx.com/jyvsiqop)

