---
title: "Export and Import from MS Project"
sidebar_label: "Export and Import from MS Project"
---

# Export and Import from MS Project

The dhtmlxGantt library allows you to export data from the Gantt chart into MS Project. You can also import data into Gantt from MS Project.

:::note
The service is free, but the output file will contain the library's watermark under the GPL license.
In case you buy a license, the result of export will be available without a watermark
during the valid support period (12 months for all PRO licenses).
:::

There are several export services available. You can install them on your computer and export Gantt chart to MS Project locally.
Note that export services are not included in the Gantt package,
read the [corresponding article](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) to learn the terms of using each of them.

## Online export service restrictions

:::note
The export service has time and request size restrictions.
:::

### Time limits

If the process takes more than 20 seconds, the export will be canceled and the following error will occur:

~~~html
Error: Timeout trigger 20 seconds
~~~

If several people export Gantt at the same time, the process can take more time than usual. But that's fine because the time which is spent for export request from a specific user is counted separately.

### Limits on request size

There is a common API endpoint `https://export.dhtmlx.com/gantt` which serves for all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Max request size is 10 MB**.

There is also a separate API endpoint `https://export.dhtmlx.com/gantt/project` specific for the [MSProject](#limits-on-request-size-and-import-of-large-files) and
[Primavera P6](guides/export-primavera.md)
export/import services (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* only). **Max request size: 40 MB**.

## Using export modules

:::note
If you need to export large charts, you can use a [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).
The export module is provided free of charge if you've obtained Gantt under [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) or [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) license, or you can [buy the module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[Read more on the usage of the export module for MS Project](guides/msp-export-module.md).


## Export to MS Project

The Gantt component allows exporting links, tasks and resources into MS Project.

To export data from the Gantt chart to MS Project, do the following:

- To use the export/import functionality, enable the `export_api` plugin via the [`plugins()`](api/method/plugins.md) method:

~~~js
gantt.plugins({
    export_api: true
});
~~~

It allows you to use either the online export service or a local export module.

:::note
If you use the Gantt version older than 8.0, you need to include the `https://export.dhtmlx.com/gantt/api.js` on your page to enable the export functionality, e.g.:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Call the [`exportToMSProject()`](api/method/exporttomsproject.md) method to export data from the Gantt chart.

~~~js
gantt.exportToMSProject();
~~~

The method will send a request to the remote service, which will either output an XML Project file or return a URL to download a generated file.


**Related sample**: [Export data: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


### Export settings

The `exportToMSProject()` method takes an object with a number of properties as a parameter. All properties are optional:

- `name` - (string) the name of the obtained file (`gantt.xml` by default).

~~~js
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

- `auto_scheduling` - (boolean) indicates scheduling mode for tasks in the exported project. `true` will mark tasks as auto scheduled, `false` will mark tasks as manually scheduled (the default state).

~~~js
gantt.exportToMSProject({
    auto_scheduling: false
});
~~~

- `skip_circular_links` - (boolean) indicates whether the circular links will be removed or not (`true` will be removed, which is the default mode; `false` will not be removed).

~~~js
gantt.exportToMSProject({
    skip_circular_links: false
});
~~~

- `project` - (object) allows setting custom properties to the exported project entity

~~~js
gantt.exportToMSProject({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': () => gantt.config.hours_per_day * 60
    }
});
~~~

The properties of this object correspond to the appropriate properties of the [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)).
The list of supported properties can be found [here](guides/tags.md). The properties may contain either fixed values or functions that will be executed when export is called.

- `tasks` - (object) allows setting custom properties to the exported task items

~~~js
gantt.exportToMSProject({
    tasks: {
        'StartVariance': (task) => {
            if (task.startVariance) {
                return task.startVariance;
            }

            return 0;
        },
        'PercentWorkComplete': (task) => task.progress + 0.1,
        'Custom': (task) => 'Custom value',
        'Custom 2': 'My Custom value'
    }
});
~~~

The properties of this object correspond to the appropriate properties of the [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)),
here is a list of supported [properties](guides/tags.md#tasks-properties).
The properties may contain either fixed values or functions that will be called for each task in the dataset when export is called.

- `data` - (object) allows setting a custom data source that will be presented in the output Gantt chart

:::note
It is expected that the `start_date` and `end_date` properties will be specified in the format that includes both date and time.
:::

~~~js
const customData = {
    tasks: [
        { id: "10", text: "Project #5", start_date: "2027-04-01 00:00", duration: 3, parent: 0 },
        { id: "1", text: "Task #67", start_date: "2027-04-02 00:00", duration: 2, parent: "10" },
        { id: "2", text: "Task #89", start_date: "2027-04-01 00:00", duration: 2, parent: "10" }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "1" }
    ]
};

gantt.exportToMSProject({
    data: customData
});
~~~

**Related sample**: [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

- `callback` - (function) If you want to receive a URL to download a generated XML file, the `callback` property can be used. It receives a JSON object with the `url` property:

~~~js
gantt.exportToMSProject({
    callback: (response) => {
        alert(response.url);
    }
});
~~~
 
- `resources` - (array) allows exporting the list of resources into an MS Project file

~~~js
gantt.exportToMSProject({
    resources: [
        { id: "1", name: "John", type: "work" },
        { id: "2", name: "Mike", type: "work" },
        { id: "3", name: "Anna", type: "work" }
    ]
});
~~~

Possible resource types are `work`, `cost`, `material`. Resource assignments are specified using the `ResourceAssignments` property of the tasks configuration:

~~~js {13}
const users = [// resources
    { key: '0', label: "N/A" },
    { key: '1', label: "John" },
    { key: '2', label: "Mike" },
    { key: '3', label: "Anna" }
];

gantt.exportToMSProject({
    resources: users
        .filter((user) => user.key !== '0') //skip the default option
        .map((user) => ({ id: user.key, name: user.label, type: "work" })),
    tasks: {
        ResourceAssignments: (task) => task.user
    }
});
~~~

The `ResourceAssignments` property is set as a function that takes the task object as a parameter and returns either a string or number value, or an array of string or number values:

~~~js
tasks: {
    ResourceAssignments: (task) => [task.user, task.office]
}
~~~

It is possible to specify the `units` parameter for resource assignments by returning the following object in the `ResourceAssignments` property:

~~~js
{
    resource_id: "id",
    units: "units value"
}
~~~

- **resource calendars**

By default, each task has some calendar added to it. If resource calendars are used, you need to specify -1 for a task in the
`CalendarUID` property during export in the [`tasks`](#export-settings) object. Then the task will use the resource calendar.

While exporting [resource calendars](api/config/resource_calendars.md), it is possible to specify the resource calendar in an object of the [`resources`](#export-settings) array:

~~~js
gantt.exportToMSProject({
    resources: [
        {
            id: "10",
            name: "John",
            type: "work",
            calendar: gantt.config.resource_calendars[10]
        }
    ]
});
~~~

- `server` - (string) the API endpoint for the request. Can be used with the local install of the export service. The default value is `https://export.dhtmlx.com/gantt`.

~~~js
gantt.exportToMSProject({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## Import from MS Project

In order to convert an XML or MPP MS Project file, you need to send the following request to the export service:

 - Request URL - `https://export.dhtmlx.com/gantt`
 - Request Method - `POST`
 - Content-Type - `multipart/form-data`

The request parameters are:

 - `file` - an MPP or XML MS Project file
 - `type` - `msproject-parse`
 - `data` - (*optional*) a JSON string with settings

For example:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

Alternatively, you can use the [`importFromMSProject()`](api/method/importfrommsproject.md) client-side API, like this:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: (project) => {
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


**Related sample**: [Import MS Project file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_mpp.html)


Where *file* is an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain either an XML or MPP Project file.

:::note
`gantt.importFromMSProject()` requires HTML5 File API support.
:::


### Response

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


- `data` - (*object*) a gantt [data object](guides/supported-data-formats.md). Each task has the following properties: `id`, `open`, `parent`, `progress`, `start_date`, `text`, `resource`.
Dates are stringified in the `%Y-%m-%d %H:%i` format. 
- `config` - (*object*) a gantt [configuration](api/overview/properties-overview.md) object with settings retrieved from the project file.
- `resources` - (*array*) an array of objects (each having the following properties: (*id: string, name: string, type: string, calendar: string*)
that represent the list of resources from the project file.
- `worktime` - (*object*) an object containing the working time settings from the project calendar. It can contain the following attributes:
    - `id` - (*string | number*) optional, the calendar id
    - `hours` - (*array*) an array with global working hours, sets the start and end hours of the task
    - `dates` - (*array*) an array of dates that can contain:
        - 7 days of the week (from `0` - Sunday, to `6` - Saturday), where `1`/`true` stands for a working day and `0`/`false` - a non-working day
        - other records are dates 
- `calendars` - (*array*) an array containing calendar configuration objects for creating a new calendar.
    - `calendarConfig` - (*object*) a calendar configuration object that can contain the following attributes:
        - `id` - (*string | number*) optional, the calendar id
        - `name` - (*string*) the calendar name
        - `hours` - (*array*) an array with global working hours, sets the start and end hours of the task
        - `dates` - (*array*) an array of dates that can contain:
            - 7 days of the week (from `0` - Sunday, to `6` - Saturday), where `1`/`true` stands for a working day and `0`/`false` - a non-working day
            - other records are dates
  
### Import settings

#### Setting the duration unit

To set an expected duration unit, the `durationUnit` (`minute`, `hour`, `day`, `week`, `month`, `year`) string can also be sent to the server.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data"
        value='{ "durationUnit": "hour" }' />
    <button type="submit">Get</button>
</form>
~~~

or

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    callback: (project) => {}
});
~~~

#### Getting properties of the Project

To get project fields, the `projectProperties` input with an array of necessary fields can be sent to the server.
It extracts arbitrary properties of [the Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))
into the `config` property of the output. Here is the list of supported [properties](guides/tags.md#project-properties).

 - `projectProperties` - specifies an array of project properties that should be put into the response.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data"
        value='{ "projectProperties": ["Author", "Title"] }' />
    <button type="submit">Get</button>
</form>
~~~

or

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    projectProperties: ["Author", "Title"],
    callback: (project) => {
        const projectConfig = project.config;
        alert(projectConfig.$custom_properties.Author);
    }
});
~~~

#### Getting tasks properties

To get task fields, the `taskProperties` input with an array of necessary fields can be sent to the server.
It extracts arbitrary properties of the [Task entities](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)). Here is the list of supported [properties](guides/tags.md#tasks-properties):

 - `taskProperties` - specify an array of additional task properties to be imported.


~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data"
        value='{ "taskProperties": ["Contact", "Priority"] }' />
    <button type="submit">Get</button>
</form>
~~~
or
~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    taskProperties: ["Contact", "Priority"],
    callback: (project) => {
        gantt.parse(project.data);
    }
});
gantt.attachEvent("onTaskLoading", (task) => {
    if (task.$custom_data) {
        task.contact = task.$custom_data["Contact"];
        task.priority = task.$custom_data["Priority"];
        delete task.$custom_data;
    }
    return true;
});
~~~

#### Getting task types

The following logic allows you to obtain the task type: tasks with the `Project` type have the `Summary: "1"` property, and tasks with the `Milestone` type have the `Milestone: "1"` property. We need to import the data with these properties and then set the task type depending on these properties.

The call of the import function will look like this:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: [
        "Summary",
        "Milestone"
    ],
    callback: (project) => {
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

After that you can convert the types of tasks based on the received properties as follows:

~~~js
gantt.attachEvent("onTaskLoading", (task) => {
    if (task.$custom_data) {
        if (task.$custom_data.Summary === "1") {
            task.type = "project";
        }
        if (task.$custom_data.Milestone === "1") {
            task.type = "milestone";
        }
        // delete task.$custom_data;
    }
    return true;
});
~~~

**Related sample**: [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)

#### Adding and adjusting calendars

Note that calendars aren't automatically added during import. You need to add them using the [`addCalendar()`](api/method/addcalendar.md) method.
After that, you should specify calendar settings via the [`setWorkTime()`](api/method/setworktime.md) method. For example:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: (project) => {
        if (project) {
            // settings for adding calendars
            project.calendars.forEach((calendar) => {
                let addedCalendar;
                // adding working time settings for the global calendar
                if (calendar.id === project.config.global_calendar_id) {
                    addedCalendar = gantt.getCalendar("global");
                } else {
                    // Gantt doesn't add a calendar
                    // if the `hours` parameter is an empty array
                    let calendarHours = calendar.hours;
                    if (!calendarHours.length) {
                        calendarHours = undefined;
                    }
                    gantt.addCalendar({
                        id: calendar.id,
                        hours: calendarHours,
                        name: calendar.name
                    });

                    addedCalendar = gantt.getCalendar(calendar.id);
                }
                const worktimeDates = calendar.dates;
                for (const dateKey in worktimeDates) {
                    const calendarDate = new Date(+dateKey);
                    if (dateKey < 10) {
                        addedCalendar.setWorkTime({
                            day: dateKey,
                            hours: worktimeDates[dateKey]
                        });
                    } else {
                        addedCalendar.setWorkTime({
                            date: calendarDate,
                            hours: worktimeDates[dateKey]
                        });
                    }
                }
            });
        }
    }
});
~~~

**Related sample**: [Gantt. Calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/668xqts7)

#### Resource calendars

If there are resource calendars, you need to specify them via the [`resource_calendars`](api/config/resource_calendars.md) config:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: (project) => {
        if (project) {
            // settings for calendars
            project.calendars.forEach((calendar) => {
                // adding the calendars and work time settings for them
            });

            // settings for resource calendars
            gantt.config.resource_calendars = {};

            project.resources.forEach((resource) => {
                if (resource.calendar) {
                    gantt.config.resource_calendars[resource.id] = resource.calendar;
                }
            });
        }
    }
});
~~~

**Related sample**: [Gantt. Resource calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/10czv54b)

#### Resources and resource assignments

If there are resources in the file, they come in the `resources` array during import. The `calendar` parameter of the
`resources` property specifies the resource calendar:

~~~js
{
    resources: [
        { id: "6", name: "John", type: "work", calendar: "8" },
        // more resources
    ]
}
~~~

If there are resource assignments, they will be imported in the `assignments` array, where the assignment object contains the
`resource_id: string` and `value: number` parameters. For example:

~~~js
{
    tasks: [
        { id: "5", text: "Interior office", type: "task", start_date: "2027-04-03 00:00", duration: 7 },
        // more tasks
    ],
    links: [],
    assignments: [
        { id: "1", task_id: 5, resource_id: 6, value: 3 },
        // more assignments
    ],
    resources: [
        { id: "6", text: "John", unit: "hours/day" },
        { id: "7", text: "Mike", unit: "hours/day" },
        // more resources
    ]
}
~~~

## Limits on request size and import of large files

There are two API endpoints for the MSProject export/import services:

- `https://export.dhtmlx.com/gantt` - the default endpoint which serves all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Max request size is 10 MB**.
- `https://export.dhtmlx.com/gantt/project` - the endpoint specific for the [MSProject](guides/export-msproject.md) and
[Primavera P6](guides/export-primavera.md)
export/import services (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* only). **Max request size: 40 MB**.

The endpoint can be specified by the `server` property of the export configuration object:

~~~js
gantt.importFromMSProject({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: (project) => {
        // some logic
    }
});
~~~

If no endpoint is specified, `https://export.dhtmlx.com/gantt` is used by default. The following call is equivalent to the one above:

~~~js
gantt.importFromMSProject({
    data: file,
    callback: (project) => {
        // some logic
    }
});
~~~

In order to export or import large projects that exceed the 4MB limit, the second endpoint can be used:

~~~js
gantt.importFromMSProject({
    server: "https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: (project) => {
        // some logic
    }
});
~~~

It allows sending requests up to 40MB in size and supports MS Project exports and imports.

Any other methods, for example, `gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})` should return a server error.

## dhtmlxGantt vs MS Project time calculation

There are fundamental differences between how date calculations work in dhtmlxGantt and MS Project, and in some cases they lead to different results.

The differences also vary depending on the combination of configs used in gantt. But you can change the gantt settings that influence the calculation results:

1. Firstly, there are differences in duration conversions between dhtmlxGantt and [MS Project](https://blog.epmainc.com/start-and-end-date-do-not-align-task-duration/).

You can work around it by specifying `HoursPerDay` and `MinutesPerDay` when you export gantt to MS Project:

~~~js
gantt.exportToMSProject({
    project: {
        HoursPerDay: () => 24,
        MinutesPerDay: () => 24 * 60
    }
});
~~~

**Related sample**: [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)

2. Secondly, your project may have the [work_time](guides/working-time.md) setting disabled:

~~~js
gantt.config.work_time = false;
~~~

Note, even when the work time calculations are disabled, the gantt still has the default calendar settings in the config (8 hours per day, Mon-Fri workweek).
And our export client always sends the default calendar to MS Project, even if the worktime is disabled in gantt. That's why MS Project calculates task durations differently.

As a workaround, you can clear the default calendar so even if it's sent to MS Project, tasks durations will be calculated in the same way as in the gantt:

~~~js
gantt.setWorkTime({ day: 0, hours: [0, 24] });
gantt.setWorkTime({ day: 1, hours: [0, 24] });
gantt.setWorkTime({ day: 2, hours: [0, 24] });
gantt.setWorkTime({ day: 3, hours: [0, 24] });
gantt.setWorkTime({ day: 4, hours: [0, 24] });
gantt.setWorkTime({ day: 5, hours: [0, 24] });
gantt.setWorkTime({ day: 6, hours: [0, 24] });
~~~

3. Besides, you may notice divergence between dates of summary items if you have specified [`gantt.config.duration_unit`](api/config/duration_unit.md) to `day`:

~~~js
gantt.config.duration_unit = "day";
~~~

In this case the gantt will round durations to total days count. But MS Project won't do it and will display fraction durations. For example, the top project will have a duration of 439 in the gantt but 438.58 in MS Project.

The only workaround for it would be to switch [`duration_unit`](api/config/duration_unit.md) to hour units:

~~~js
gantt.config.duration_unit = "hour";
~~~

**Related sample**: [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)
