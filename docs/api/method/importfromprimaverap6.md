---
sidebar_label: importFromPrimaveraP6
title: importFromPrimaveraP6 method
description: "converts an XML or XER Primavera P6 file to JSON"
---

# importFromPrimaveraP6

### Description

@short: Converts an XML or XER Primavera P6 file to JSON

@signature: importFromPrimaveraP6: (config: any) =\> void

### Parameters

- `config` - (required) *object* - an object with configuration properties of an imported file

### Example

~~~jsx
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }                    
            gantt.parse(project.data);
        }
     }
});
~~~

### Details

:::note
The method requires HTML5 File API support. 
:::

:::note
This method is defined in the **export** extension, so you need to activate the [export_api](guides/extensions-list.md#export-service) plugin. Read the details in the [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel) article.
:::

:::note
If you use the Gantt version older than 8.0, you need to include the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, e.g.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

The method takes as a parameter an object with configuration properties of an imported file:

- **data** - an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain either XER or XML Project file.
- **callback** - a callback function.
- **durationUnit** - sets an expected duration unit ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - specifies an array of project properties that should be put into the response.
- **taskProperties** - specifies an array of additional task properties to be imported.

Check the detailed descriptions of the import settings in the [related section](guides/export-primavera.md#import-settings).

## Response

The response will contain a JSON of the following structure:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {},
    calendars: []
}
~~~

- **data** - (*object*) a gantt [data object](guides/supported-data-formats.md). Each task has the following properties: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. 
Dates are stringified in the "%Y-%m-%d %H:%i" format. 
- **config** - (*object*) a gantt [configuration](api/overview/properties-overview.md) object with settings retrieved from the project file.
- **resources** - (*array*) an array of objects (each having the following properties: 
\{*id: string, name: string, type: string, calendar: string*\} that represent the list of resources from the project file.
- **worktime** - (*object*) an object containing the working time settings from the project calendar. It can contain the following attributes:
    - **id** - (*string | number*) optional, the calendar id
    - **hours** - (*array*) an array with global working hours, sets the start and end hours of the task
    - **dates** - (*array*) an array of dates that can contain:
        - 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day
        - other records are dates 
- **calendars** - (*array*) an array containing calendar configuration objects for creating a new calendar. 
    - **calendarConfig** - (*object*) a calendar configuration object that can contain the following attributes:
      - **id** - (*string | number*) optional, the calendar id
      - **name** - (*string*) the calendar name
      - **hours** - (*array*) an array with global working hours, sets the start and end hours of the task
      - **dates** - (*array*) an array of dates that can contain:
            - 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day
            - other records are dates

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)
- [importFromExcel](api/method/importfromexcel.md)

### Related Guides
- [Export and Import from Primavera P6](guides/export-primavera.md#import-from-primavera-p6)

