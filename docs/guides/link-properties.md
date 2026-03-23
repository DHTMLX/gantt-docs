---
title: "Link Properties"
sidebar_label: "Link Properties"
---

# Link Properties 

On this page you'll find the full list of properties that the link object may include.

This article describes the client-side runtime link object used inside Gantt after data is loaded. For the serialized JSON shape used in [gantt.parse()](api/method/parse.md), [gantt.load()](api/method/load.md), and backend data exchange, see [Data Model](guides/data-model.md).

The full list of properties of the task object is given in the [Task Properties](guides/task-properties.md) article.

## Runtime shape at a glance

~~~ts
// Exported from @dhx/gantt as "Link"
interface Link {
    id: string | number;
    source: string | number;
    target: string | number;
    type: string;
    lag?: number;
    readonly?: boolean;
    editable?: boolean;
    [customProperty: string]: any;
}
~~~

Runtime link objects have the same shape as serialized links - they are client-side objects returned by methods like `gantt.getLink()`. For the serialized shape, see [Data Model - SerializedLink](guides/data-model.md#serializedlink).


## Required properties

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

## Optional properties

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
gantt.parse({
    tasks: [
        { id: 1, text: "Project #1", start_date: "2026-04-01", duration: 18 },
        { id: 2, text: "Task #1", start_date: "2026-04-02", duration: 8, parent: 1 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "0" }
    ]
});

const link = gantt.getLink(1);

console.log(link.type); // "0"
console.log(link.source); // 1
~~~

