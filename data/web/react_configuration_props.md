Using DHTMLX Gantt Properties in ReactGantt
===============

This page describes the props accepted by React Gantt and how they map to DHTMLX Gantt features.

Available Props
-----------------


<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>Task[]</td>
      <td>An array of <a href="desktop/supported_data_formats.md#json">task objects</a>.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>Link[]</td>
      <td>An array of <a href="desktop/supported_data_formats.md#json">link objects</a>.</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>GanttTemplates</td>
      <td>Overrides <a href="api/refs/gantt_templates.md">gantt.templates</a>, for example: api/gantt_task_text_template.md, api/gantt_task_class_template.md, api/gantt_scale_cell_class_template.md.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>GanttConfig</td>
      <td>Merged into <a href="api/refs/gantt_props.md">gantt.config</a>, for example: api/gantt_scales_config.md, api/gantt_columns_config.md, api/gantt_autosize_config.md.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>Resource[]</td>
      <td>An array of <a href="desktop/resource_management.md#:~:text=In%20order%20to%20populate%20the%20data%20store%2C%20use%20the%20datastore.parse%20method%3A">resource objects</a>.</td>
    </tr>
    <tr>
      <td>baselines</td>
      <td>Baseline[]</td>
      <td>An array of <a href="desktop/inbuilt_baselines.md#baselines:~:text=Loading%20baselines%20with%20tasks">baseline objects</a>.</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[]</td>
      <td>An array of marker objects for <a href="desktop/markers.md">timeline markers</a>.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>GanttPlugins</td>
      <td><a href="desktop/extensions_list.md">Gantt extensions</a> that need to be activated (for example: <a href="desktop/critical_path.md">critical_path</a>, <a href="desktop/auto_scheduling.md">auto_scheduling</a>).</td>
    </tr>
    <tr>
      <td>data</td>
      <td>{ load?: string, save?: string|RouterFunction, batchSave?: BatchChanges}</td>
      <td>Allows loading data via the built-in Gantt transport and provides
        callbacks for changes made to Gantt data.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string</td>
      <td>Sets <a href="desktop/localization.md">gantt.i18n.setLocale(locale)</a>. Defaults to "en".</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string</td>
      <td>Applies <a href="desktop/skins.md">gantt.setSkin(theme)</a>. Defaults to "terrace".</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>ReactElement | null</td>
      <td>A React component that replaces the built-in Lightbox (see <a href="desktop/custom_edit_form.md">Custom Lightbox</a>.)</td>
    </tr>
    <tr>
      <td>inlineEditors</td>
      <td>{ [editorType: string]: React.ComponentType }</td>
      <td>Allows mapping your React-based inline editors to DHTMLX's inline
        editor interface.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>GroupConfig | boolean | null</td>
      <td>Grouping configuration object or false/null to disable grouping (see <a href="api/gantt_groupby.md">Grouping Tasks
</a>.).</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>((task: Task) =&gt; boolean) | null</td>
      <td>A function used to filter Gantt tasks.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>((resource: Resource) =&gt; boolean) | null</td>
      <td> A function used to filter resources for the <a href="desktop/resource_management.md">Resource Panel</a>.</td>
    </tr>
    <tr>
      <td>modals</td>
      <td>GanttModals</td>
      <td>Allows replacing <code>onBeforeTaskDelete</code> and
        <code>onBeforeLinkDelete</code> modals with custom components.</td>
    </tr>
    <tr>
      <td>(Event Props)</td>
      <td>Function</td>
      <td>The wrapper also supports passing event handler props that correspond to DHTMLX Gantt events. For example, onTaskClick, onAfterTaskAdd, etc. If the prop name matches the event name, it's attached automatically.</td>
    </tr>
  </tbody>
</table>

Example Usage
-------------------

~~~js
<ReactGantt
  tasks={tasks}
  links={links}
  theme="material"
  locale="en"
  config={ {
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%M" }
    ],
    columns: [
      { name: "text", tree: true, width: '*' },
      { name: "start_date", align: "center" },
      { name: "duration", align: "center" },
      { name: "add" }
    ],
    // any other gantt.config you want
  } }
  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates={ {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  } }
/>
~~~

Using Event Props
----------------


You can pass any DHTMLX Gantt event as a prop. For example:

~~~js
<ReactGantt

  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
Internally, the wrapper calls [gantt.attachEvent("onBeforeTaskAdd", handler)](api/gantt_attachevent.md) if you pass a prop named `onBeforeTaskAdd`. For a full event list, see [DHTMLX Gantt API](api/refs/gantt_events.md).




Combining Props and the DHTMLX API
---------------

The `@dhx/react-gantt` library is designed to be as declarative as possible for day-to-day usage - most use cases can be addressed through the standard props (such as tasks, links, resources, templates, etc.). However, there may be scenarios where you need a deeper access to the Gantt engine. For example, for:

- [Worktime calculations](desktop/working_time.md)
- [Auto scheduling](desktop/auto_scheduling.md) logic or advanced features like [resource computations](desktop/resource_management.md)
- Calling any of specialized methods of the [Gantt API](api/refs/gantt.md)

In these cases, you can use two additional approaches to tap into the underlying DHTMLX Gantt functionality:

- **React hooks** specifically provided by the wrapper to bridge Gantt's data stores and scheduling logic

- **Direct access** to the Gantt instance via a `ref` if the built-in hooks don't cover all your needs

### Using built-in hooks 

The `@dhx/react-gantt` library exposes a set of optional hooks that connect React components to internal Gantt APIs. These hooks provide a 'bridge' to Gantt's underlying methods and data stores. You can either call these hooks directly in your components or compose them into your own custom hooks for specialized features like resource histograms.

#### useGanttDatastore<T>(ganttRef, storeName)

The `useGanttDatastore` hook hives a read-only access to a specific Gantt datastore. 
The common use is accessing the resource datastore, baseline, or any other built-in or custom store.

It provides the following functions:

- `getItem(id)` -  returns a specified item from the datastore

- `getItems()` -  returns all items in the specified datastore

- `hasChild(id: string | number)` - checks if an item has children

- `getChildren(id: string | number)` - retrieves child items

~~~js
import { useMemo } from 'react';
import { useGanttDatastore } from '@dhx/react-gantt';

function MyResourceList({ ganttRef }) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');

  const resourceIds = resourceStore.getItems().map(item => item.id);

  // for demonstration, just log the data
  useMemo(() => {
    console.log('Resource IDs:', resourceIds);
  }, [resourceIds]);

  return null; 
}
~~~

You can use this hook whenever you need direct low-level data from a specific datastore. For example, checking if a resource is a group vs. an individual.

#### useResourceAssignments(ganttRef)

The `useResourceAssignments` hook exposes Gantt's resource-related methods, such as retrieving assignments for a resource or enumerating which resources are assigned to a given task.

It provides the following functions:

- `getResourceAssignments(resourceId, taskId?)` - bridge to api/gantt_getresourceassignments.md
- `getTaskResources(taskId)` - bridge to api/gantt_gettaskresources.md

~~~js
import React from 'react';
import { useResourceAssignments } from '@dhx/react-gantt';

export function ResourceUsage({ ganttRef, taskId }) {
  const { getTaskResources } = useResourceAssignments(ganttRef);

  const resources = getTaskResources(taskId);
  return (
    <div>
      Task {taskId} assigned to: 
      {resources.map(r => r.text).join(', ')}
    </div>
  );
}
~~~

You may need this hook for any custom logic around resource usage, e.g., calculating allocated hours or grouping tasks by owner

#### useWorkTime(ganttRef)

Provides a direct bridge for built-in DHTMLX Gantt worktime functions, such as api/gantt_isworktime.md, api/gantt_calculateenddate.md, api/gantt_calculateduration.md.

You'll need this hook for highlighting working/non-working time according to Gantt work calendar settings, as well as for date operations in accordance to work calendars.

It provides the following functions:

- `isWorkTime({ date:Date, unit?: string, task?:Task })` - bridge to api/gantt_isworktime.md
- `calculateEndDate({start:Date, duration:number, unit?: string, task?: Task})` - bridge to api/gantt_calculateenddate.md
- `calculateDuration({start:Date, end:Date, task?: Task})` - bridge to api/gantt_calculateduration.md
- `getClosestWorkTime({ date:Date, unit?: string, task?: Task, dir?: "past"|"future" })` - bridge to api/gantt_getclosestworktime.md



~~~js
import { useEffect, useRef, useState } from 'react';
import ReactGantt, {GanttTemplates, useWorkTime} from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime }= useWorkTime(ganttRef);
  ...
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({date, task}) ? "" : "weekend";
    }
  };
  ...
~~~

#### Composing hooks into your own custom hooks

A great practice is to build your own domain or project-specific hooks using these fundamental bridging hooks. For instance, if you want to create a resource histogram, you might create a custom hook that caches capacity values, sums resource usage, etc.:

~~~js
import { useMemo } from 'react';
import { useGanttDatastore, useResourceAssignments } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // Custom logic: capacity caching, group detection, etc.
  // ...
  return {
    // e.g. getCapacity, getAllocatedValue
  };
}
~~~

### Direct access to Gantt instance with ref

While these hooks handle most advanced needs, you might still want direct access to the entire Gantt instance. For that, the ref approach remains available:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // here you can call ANY Gantt API method
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~

{{info Be mindful that if you alter tasks/links in the direct Gantt instance while also feeding them as React props, 
you should keep them in sync or re-parse the data. Otherwise, the next React re-rendering may overwrite your manual changes. }}

If you want to do something not exposed by a prop, you can still call gantt methods directly. See [Accessing the Underlying Gantt API](web/react.md#accessingtheunderlyingganttapi) for more details.