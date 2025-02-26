Configuration & Props
===============

This page describes the props accepted by ReactGantt and how they map to DHTMLX Gantt features.

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
      <td>Overrides <a href="api/refs/gantt_templates.md">gantt.templates</a>, e.g. api/gantt_task_text_template.md, api/gantt_task_class_template.md, api/gantt_scale_cell_class_template.md.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>GanttConfigOptions</td>
      <td>Merged into <a href="api/refs/gantt_props.md">gantt.config</a>, e.g. api/gantt_scales_config.md, api/gantt_columns_config.md, api/gantt_autosize_config.md.</td>
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
      <td>taskLayers</td>
      <td>TaskLayer[]</td>
      <td>An array of <a href="api/gantt_addtasklayer.md">custom drawing layers for tasks</a>.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>GanttPlugins</td>
      <td><a href="desktop/extensions_list.md">Gantt extensions</a> that need to be activated (e.g., <a href="desktop/critical_path.md">critical_path</a>, <a href="desktop/auto_scheduling.md">auto_scheduling</a>).</td>
    </tr>
    <tr>
      <td>data</td>
      <td>{ load: any; save: any }</td>
      <td>If you want to load and save data via Gantt's dataProcessor (see DHTMLX DataProcessor docs).</td>
    </tr>
    <tr>
      <td>dataProcessor</td>
      <td>any</td>
      <td>A <a href="api/gantt_createdataprocessor.md">custom data processor</a> function or config.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string</td>
      <td>Sets <a href="desktop/localization.md">gantt.i18n.setLocale(locale)</a>. Defaults to "en".</td>
    </tr>
    <tr>
      <td>skin</td>
      <td>string</td>
      <td>Applies <a href="desktop/skins.md">gantt.setSkin(skin)</a>. Defaults to "terrace".</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>ReactElement | null</td>
      <td>A React component to replace the built-in lightbox (see Lightbox & Custom Forms.)</td>
    </tr>
    <tr>
      <td>inlineEditors</td>
      <td>{ [editorType: string]: React.ComponentType }</td>
      <td>Allows mapping your React-based inline editors to DHTMLX's inline editor interface.</td>
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
  skin="material"
  locale="en"
  config={{
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
  }}
  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates={{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  }}
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

React Components in Grid column headers
---------------

React Components in Grid column cells
---------------

React Components in tooltips
---------------




Combining Props and the DHTMLX API
---------------

If you want to do something not exposed by a prop, you can still call gantt methods directly. See [Accessing the Underlying Gantt API](web/react.md#accessingtheunderlyingganttapi) for more details.