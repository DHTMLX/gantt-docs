---
title: "Link Properties"
sidebar_label: "Link Properties"
---

Link Properties 
=======================================

On this page you'll find the full list of properties that the link object may include.

The full list of properties of the task object is given in the [Task Properties](guides/task-properties.md) article.


Required properties
-------------------

<table>
  <tbody>
  <tr>
  <th>Name</th><th>Type</th><th>Description</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>the link id</td>
  </tr>
  <tr>
  <td><b class="subproperty">source</b></td>
  <td><i>string | number</i></td>
  <td>the id of a task that the dependency will start from</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string | number</i></td>
  <td>the id of a task that the dependency will end with.</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>the dependency type. The available values are stored in the [links](api/config/links.md) object. By default, they are: <ul> <li><b>"0"</b> - 'finish_to_start'.</li> <li><b>"1"</b> - 'start_to_start'.</li> <li><b>"2"</b> - 'finish_to_finish'.</li> <li><b>"3"</b> - 'start_to_finish'.</li> </ul></td>
  </tr>
  </tbody>
</table>

If you want to store the dependency types in some way other than the default values('0','1','2'), you may change values of the related properties of the [links](api/config/links.md) object. For example:

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

Note, these values affect only the way the dependency type is stored, not the behaviour of visualization. 

Optional properties
------------------

<table>
  <tbody>
  <tr>
  <th>Name</th><th>Type</th><th>Description</th>
  </tr>
  <tr>
  <td><b class="subproperty">lag</b></td>
  <td><i>number</i></td>
  <td>[the task's lag](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>can mark link as [readonly](guides/readonly-mode.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>can mark link as [editable](guides/readonly-mode.md#details-of-the-editable_property-config-option)</td>
  </tr>
  </tbody>
</table>

## Example

~~~js
var data = {
    tasks: [
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
         {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
         {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
    ]
};
~~~

