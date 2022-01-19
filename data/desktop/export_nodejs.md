Export and Import Data on Node.js
=============================

You can export and import data of DHTMLX Gantt which is built with Node.js. 

For that, download the [api.js](https://files.dhtmlx.com/30d/099ae82449593df43ef02926ecae6b49/api.js) file and 
include its code into the Gantt configuration file. 

Exporting data
----------------

The export functionality should work the same way as it works in the web version, with some exceptions:

- Export to Excel needs the timeline to be shown on the page if the tasks are loaded into the gantt. Since the DOM element of the timeline isn't rendered on Node.js at all, export to Excel won't work by itself because the gantt won't be able to implement internal calculations related to the tasks' positioning in the timeline. As a workaround, you need to specify the loaded tasks as a value of the **data** parameter in the export settings:

~~~js
data: gantt.serialize().data
~~~

- When configuring export, specify the **callback** parameter to define the endpoint of the output file, otherwise, the file will be printed to the console.

Importing data
----------------

The import functionality needs the additional *formData* component to be installed:

~~~js
npm install form-data
~~~
<br>
Import from MSP and PrimaveraP6 files should work the same way as it works in the web version.

When importing an Excel file, the data of the file will return to Gantt in the JSON format. Since the columns may have arbitrary names in Excel, it is necessary to map the columns of the Excel document to the task's properties of DHTMLX Gantt. For this, you need to develop your own solution.