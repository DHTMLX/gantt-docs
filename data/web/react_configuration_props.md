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

React Components in Grid
-------------------

### In Headers

The **label** property of a grid column can be either a `string` or a `ReactElement`. This lets you embed React-based filters, buttons, or other UI directly in the column header:

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, resize: true },
    // Embedding React element directly
    { name: "start_date", label: <DateFilter />, width: 150, align: "center", resize: true },
    // Alternatively, using a function returning a React element:
    { name: "end_date", label: () => <DateFilter />, width: 150, align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

When the wrapper detects a React element in a label or any other template property, it will render it using a React Portal in the grid's header cell.

### In Cells

Grid cells are defined by the **template** property of the column. This template function receives a task object and must return either a plain `string` or a `ReactElement`:

~~~
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick={onClick}>{`Task ID: ${task.id}`}</button>;
}

export default function GanttWithGridCells({ handleButtonClick, ganttRef }) {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      { name: "start_date", width: 150, align: "center", resize: true },
      { name: "duration", width: 80, align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        label: <span>My Column</span>,
        width: 140,
        // Returning a React element
        template: (task) => (
          <AlertButton
            task={task}
            onClick={() => {
              handleButtonClick(task);
              // Force re-render of the task if needed
              ganttRef.current?.instance.updateTask(task.id);
            }}
          />
        ),
        resize: true,
      },
      { name: "add", width: 44 },
    ],
    row_height: 40,
    grid_width: 550,
  };

  return <ReactGantt ref={ganttRef} config={config} /* ...other props */ />;
}
~~~

By returning a React element from your column template, you can create fully interactive content (buttons, dropdowns, badges, etc.) in each cell of the Gantt grid. Internally, the wrapper will inject those elements via portals into the DOM nodes that Gantt manages.

### In Inline Editors

DHTMLX Gantt supports [inline editing for grid cells](desktop/inline_editing.md). In this React wrapper, you can provide your own custom React editors by specifying an editor object in the **column** config, and then mapping an editor name to a React component in the `inlineEditors` prop:


Define a React-based inline editor component:

~~~js
import React, {
	useState,
	forwardRef,
	useImperativeHandle
} from 'react';
import { InlineEditorMethods, InlineEditorProps } from '@dhx/react-gantt';


const MyInlineEditor = forwardRef<InlineEditorMethods, InlineEditorProps>(
	({ initialValue, task, save, cancel, ganttInstance }, ref) => {
		const [value, setValue] = useState(initialValue || "");

		useImperativeHandle(ref, (): InlineEditorMethods => ({
			getValue: () => value,
			setValue: (val: any) => setValue(val),
			isValid: () => true, 
			focus: () => {

			},
			isChanged: (originalValue: any) => {
				return originalValue !== value;
			},

			save: () => {  }
		}));

		return (
			<input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
				autoFocus
			/>
		);
	}
);

export default MyInlineEditor;
~~~

Use the custom editor in your Gantt config

~~~js
import ReactGantt from "@dhx/react-gantt";
import MyInlineEditor from "./CustomInlineEditor";

function Demo() {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      {
        name: "duration",
        width: 80,
        align: "center",
        editor: { type: "customInputEditor", map_to: "text" }, /*!*/
        resize: true
      },
      { name: "start_date", width: 150 },
      { name: "add", width: 44 }
    ],
    editable: true
  };

  return (
    <ReactGantt
      config={config}
      inlineEditors={{
        customInputEditor: MyInlineEditor  /*!*/
      }}
      tasks={[/*...*/]}
      links={[/*...*/]}
    />
  );
}
~~~

When the user double-clicks the column cell, Gantt will display your editor component in place. The wrapper's internal code calls the methods (getValue, setValue, etc.) that you expose via `useImperativeHandle(ref, ...)`, ensuring the Gantt instance stays in sync with the changes in your component.

The value of `type` of the editor object must match the key in `inlineEditors`. 

The `map_to` property specifies the property of the Task object from which the editor will read and write values. Please refer to the article that covers [inline editing](desktop/inline_editing.md) for futher details.

If you're implementing an editor that makes something more complex than writing a value to a property of a task - you need to implement a required logic in the **save** function and specify the `map_to` option of the input to **"auto"**. In this case, the gantt won't modify the task object, but instead will call the **save** function when it's time to apply the changes made to the editor. The `initialValue` of the editor will be passed as `null`.

{{note Note, you can define non-React inline editors using the [editor_types](desktop/inline_editing.md#custominlineeditor) property of the **config** prop}}




#### Props of the editor component

- <span class=subproperty>**initialValue**</span> - (*any*) - initial value of the editor
- <span class=subproperty>**task**</span> - (*Task*) - task that is being edited
- <span class=subproperty>**save**</span> - (*function*) - tells the gantt to save and close the editor
- <span class=subproperty>**cancel**</span> - (*function*) - tells the gantt to close the editor without saving
- <span class=subproperty>**ganttInstance**</span> - (*GanttStatic*) - the current instance of the underlying Gantt object

React Components in tooltips
---------------




Combining Props and the DHTMLX API
---------------

If you want to do something not exposed by a prop, you can still call gantt methods directly. See [Accessing the Underlying Gantt API](web/react.md#accessingtheunderlyingganttapi) for more details.