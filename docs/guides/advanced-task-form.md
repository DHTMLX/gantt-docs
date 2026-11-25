---
sidebar_label: Advanced Task Form
title: Advanced Task Form
description: "Configure tabs, fields, dependency editing and validation in the advanced task form."
---

# Advanced Task Form

The advanced task form is available in paid browser editions. It supports tabs, rows and columns, built-in dependency editing, resource assignments and field-level validation.

## Enable the form

Enable the [`task_form` plugin](api/method/plugins.md) before initializing Gantt.

~~~js
gantt.plugins({ task_form: true });
gantt.init("gantt_here");
~~~

Double-click a task or call [`gantt.showLightbox(id)`](api/method/showlightbox.md) to open it. Set [`gantt.config.lightbox.advanced`](api/config/lightbox.md) to `false` to use the classic lightbox with the plugin enabled. Change the setting while the form is closed.

The built-in layout depends on the task type.

| Task type | Built-in layout |
| --- | --- |
| Task | General, Predecessors, Successors, Resources and Advanced |
| Project | General and Advanced, with a read-only duration field |
| Milestone | General, Predecessors, Successors and Advanced, with a single-date duration field |

Gantt skips fields whose features are unavailable and omits tabs with no renderable fields.

## Complete default configuration {#default-configuration}

These are the built-in layouts for tasks, projects, and milestones. The plugin uses them automatically.
Copy this configuration if you want to replace the defaults and edit individual fields or tabs.
For a fresh copy of the defaults from your installed version, use `getDefaultSections(type)`.

~~~js
gantt.plugins({ task_form: true });

gantt.config.lightbox.sections = {
    tabs: [
        {
            name: "general",
            children: [
                { name: "description", height: 44, map_to: "text", type: "textarea", focus: true },
                {
                    cols: [
                        { name: "type", type: "typeselect", map_to: "type" },
                        { name: "progress", type: "progress", map_to: "progress" }
                    ]
                },
                { name: "time", type: "duration", map_to: "auto" }
            ]
        },
        {
            name: "predecessors",
            children: [
                { name: "predecessors", type: "predecessors" }
            ]
        },
        {
            name: "successors",
            children: [
                { name: "successors", type: "successors" }
            ]
        },
        {
            name: "resources",
            children: [
                { name: "resources", type: "resource_selector", map_to: "auto" }
            ]
        },
        {
            name: "advanced",
            children: [
                { name: "constraint", type: "constraint", map_to: "auto" },
                {
                    cols: [
                        { name: "deadline", type: "datepicker", map_to: "deadline" },
                        { name: "calendar", type: "calendar", map_to: "auto" }
                    ]
                },
                {
                    cols: [
                        { name: "work", type: "work" },
                        { name: "scheduling_mode", type: "scheduling_mode" }
                    ]
                },
                { name: "effort_driven", type: "effort_driven" },
                { name: "wbs", type: "template", map_to: "$wbs" },
                {
                    cols: [
                        { name: "auto_scheduling", type: "auto_scheduling" },
                        { name: "unscheduled", type: "unscheduled" }
                    ]
                },
                {
                    cols: [
                        { name: "hide_bar", type: "switch", map_to: "hide_bar" },
                        { name: "rollup", type: "switch", map_to: "rollup" }
                    ]
                }
            ]
        }
    ]
};

gantt.config.lightbox.project_sections = {
    tabs: [
        {
            name: "general",
            children: [
                { name: "description", height: 44, map_to: "text", type: "textarea", focus: true },
                { name: "type", type: "typeselect", map_to: "type" },
                { name: "time", type: "duration", readonly: true, map_to: "auto" }
            ]
        },
        {
            name: "advanced",
            children: [
                { name: "constraint", type: "constraint", map_to: "auto" },
                {
                    cols: [
                        { name: "deadline", type: "datepicker", map_to: "deadline" },
                        { name: "calendar", type: "calendar", map_to: "auto" }
                    ]
                },
                { name: "work", type: "work", readonly: true },
                { name: "wbs", type: "template", map_to: "$wbs" },
                {
                    cols: [
                        { name: "auto_scheduling", type: "auto_scheduling" },
                        { name: "unscheduled", type: "unscheduled" }
                    ]
                }
            ]
        }
    ]
};

gantt.config.lightbox.milestone_sections = {
    tabs: [
        {
            name: "general",
            children: [
                { name: "description", height: 44, map_to: "text", type: "textarea", focus: true },
                { name: "type", type: "typeselect", map_to: "type" },
                { name: "time", type: "duration", single_date: true, map_to: "auto" }
            ]
        },
        {
            name: "predecessors",
            children: [
                { name: "predecessors", type: "predecessors" }
            ]
        },
        {
            name: "successors",
            children: [
                { name: "successors", type: "successors" }
            ]
        },
        {
            name: "advanced",
            children: [
                { name: "constraint", type: "constraint", map_to: "auto" },
                {
                    cols: [
                        { name: "deadline", type: "datepicker", map_to: "deadline" },
                        { name: "calendar", type: "calendar", map_to: "auto" }
                    ]
                },
                { name: "wbs", type: "template", map_to: "$wbs" },
                {
                    cols: [
                        { name: "auto_scheduling", type: "auto_scheduling" },
                        { name: "unscheduled", type: "unscheduled" }
                    ]
                },
                {
                    cols: [
                        { name: "hide_bar", type: "switch", map_to: "hide_bar" },
                        { name: "rollup", type: "switch", map_to: "rollup" }
                    ]
                }
            ]
        }
    ]
};

gantt.init("gantt_here");
~~~

## Configure the layout {#layout}

Set [`lightbox.sections`](api/config/lightbox.md) to an array of entries for a single panel, or to `{ tabs: [...] }` for a tabbed form. The form uses your layout for the current task type first, then your shared `sections` layout, then the built-in layout for that type. Custom task types use the built-in task layout if no app layout applies. Use `project_sections`, `milestone_sections` or `<type>_sections` to keep a separate layout for a type.

Each tab can define a `name` or `id`, `label`, `hidden` and `children`. Use `children` to list section entries. A section entry can be:

- A field such as `{ name: "ticket", type: "text", map_to: "ticket" }`.
- A group of side-by-side entries such as `{ cols: [fieldA, fieldB] }`.
- A group of stacked entries such as `{ rows: [fieldA, fieldB] }`.

Nest `cols` and `rows` to combine both directions. The `width` of a field or group accepts a number in pixels, a CSS pixel string such as `"120px"`, a percentage of the available row width, or a fraction such as `"2fr"` of the remaining space. The default is `"1fr"`. To change the gap between fields, set `--dhx-gantt-task-form-gutter`.

Copy the built-in layout to keep its fields and add your own. This example adds two fields to the General tab and keeps the separate project and milestone layouts.

~~~js
gantt.plugins({ task_form: true });

const form = gantt.ext.taskForm;
const layout = form.getDefaultSections("task");
const general = layout.tabs.find(tab => tab.name === "general");

if (general?.children) {
    general.children.push({
        cols: [
            { name: "ticket", label: "Ticket", type: "text", map_to: "ticket" },
            { name: "billable", label: "Billable", type: "switch", map_to: "billable", width: "30%" }
        ]
    });
}

gantt.config.lightbox.sections = layout;
gantt.config.lightbox.project_sections = form.getDefaultSections("project");
gantt.config.lightbox.milestone_sections = form.getDefaultSections("milestone");
gantt.init("gantt_here");
~~~

Set up the layout and feature flags before opening the form. To apply later changes to the layout or enabled features, reopen it.

## Choose fields {#fields}

Use the [lightbox section controls](guides/default-edit-form.md#lightboxcontrols) for ordinary fields. Common options include `name`, `type`, `map_to`, `label`, `focus` and `readonly` where supported by the control. The form reads and saves fields marked `hidden`, including fields in a hidden tab. It skips unavailable fields during rendering and saving.

| Field type | Value and configuration |
| --- | --- |
| `text` | A single-line string input with optional `placeholder`. |
| `switch` | A boolean field. Use `default_value` when the task property can be unset, and `switch_label` for text next to the switch. |
| `progress` | Edits a percentage and stores a fraction, such as `0.5` for 50%. The stepper ranges from 0 to 100 in increments of 5 by default. |
| `combo` | Selects an entry from `options` as `{ key, label }` objects. |
| `stepper` | Edits a number. Supports `min`, `max` and `step`. |
| `datepicker` | Edits a single date and saves it as a `Date`. It reads a `Date` or a string in the chart's data date format. Use `format` to set a field display format. |
| `calendar` | Selects a task calendar. Clearing the field restores automatic calendar selection. Set `options` to supply your own choices. By default, it uses the configured [calendar property](api/config/calendar_property.md). |
| `resource_selector` | Edits [resource assignments](guides/resource-assignments.md). |
| `predecessors`, `successors` | Edit incoming and outgoing dependencies. See [Edit dependencies](#edit-dependencies). |

Some field types require an enabled feature.

| Type | Requirement |
| --- | --- |
| `constraint` | The `auto_scheduling` plugin |
| `calendar` | At least one application calendar |
| `work`, `scheduling_mode`, `effort_driven` | [Effort-driven scheduling](guides/effort-driven-tasks.md#editing-effort-fields) |
| `auto_scheduling` | Auto scheduling enabled in the Gantt configuration |
| `unscheduled` | [`show_unscheduled`](api/config/show_unscheduled.md) enabled |

The effort and scheduling field types use their corresponding task properties by default. Use a generic control and its `map_to` option to edit a separate application property.

### Edit dependencies

A `predecessors` or `successors` section lets users change the linked task, dependency type and lag. New rows start with finish-to-start and zero lag. Use `link_types` to restrict the available dependency type IDs, `hide_lag: true` to hide the input and preserve existing lag, or `readonly: true` to show dependencies without editing.

~~~js
gantt.config.lightbox.sections = {
    tabs: [
        {
            name: "general",
            children: [{ name: "description", type: "textarea", map_to: "text" }]
        },
        {
            name: "predecessors",
            children: [{ name: "predecessors", type: "predecessors", hide_lag: true }]
        }
    ]
};
~~~

Before saving link edits, the form checks for circular dependencies through the edited task. If the check fails, the form stays open and displays an error on a visible editable link section or in the form summary.

## Validate a task {#validation}

Attach an `onSave` handler to `gantt.ext.taskForm`. Return `true` to allow saving. To keep the form open, show an error and return `false`.

~~~js
gantt.ext.taskForm.attachEvent("onSave", function (taskId, task) {
    if (task.text?.trim()) {
        gantt.ext.taskForm.setSectionError("description", null);
        return true;
    }

    gantt.ext.taskForm.setActiveTab("general");
    gantt.ext.taskForm.setSectionError("description", "Enter a task name");
    return false;
});
~~~

The message appears below a visible field or in the error summary when the field has no visible cell.

## Form API {#api}

After enabling the plugin, use `gantt.ext.taskForm` for the following operations.

| Method | Result |
| --- | --- |
| `isOpen()` | Reports whether the advanced form is open for a task. |
| `getTabs()` | Returns `{ id, label, hidden }` for tabs with renderable fields. This includes tabs marked hidden or whose renderable fields are all hidden. |
| `getActiveTab()`, `setActiveTab(id)` | Read or set the active tab. The getter can return `null`. The setter ignores unknown or hidden tabs. |
| `getSectionTab(name)` | Returns the tab ID for a section or `null`. |
| `getControl(name)` | Returns the mounted control, native element or section node, or `null`. |
| `setSectionError(name, message)` | Shows and announces an error. Pass `null` to clear it. |
| `getDefaultSections(type?)` | Returns a fresh copy of the layout for `"task"`, `"project"` or `"milestone"`. Defaults to `"task"`. |
| `findSection(sections, name)` | Returns the matching configuration object or `null`. Searches flat and tabbed layouts, including nested groups and hidden fields. |
| `attachEvent(name, handler, settings?)`, `detachEvent(id)`, `checkEvent(name)` | Subscribe to form events, remove a subscription or check whether an event has a handler. |

The layout helpers work while the form is closed. Use [`getLightboxSection(name)`](api/method/getlightboxsection.md) to access the mounted section state. A missing or skipped section returns `null` at runtime.

| Form event | When it fires |
| --- | --- |
| `onRender(taskId, api)` | After the form opens and is filled, or when an open form is rebuilt. Gantt also fires [onTaskFormRender](api/event/ontaskformrender.md). |
| `onTabChange(tabId, previousTabId)` | When the active tab changes. Gantt also fires [onTaskFormTabChange](api/event/ontaskformtabchange.md). |
| `onSave(taskId, task, isNew)` | Before saving. Return a truthy value to proceed. |
| `onDelete(taskId)` | Before deleting. Return a truthy value to proceed. |
| `onCancel(taskId, isNew)` | When the user cancels or presses Escape. |
| `onHide()` | After the form closes. |

The existing lightbox methods and events also apply to the advanced form.

## Localize the form

Set a tab's `label` or define `gantt.locale.labels.tab_<id>`. Set a field's `label` or define `gantt.locale.labels.section_<name>`. Dependency editing uses `task_form_*` labels. The calendar field uses `calendar_none` for the inherited calendar option.

Fields follow the configured order in keyboard navigation. Press Escape to close the form and return focus to the originating control.

## Use with a framework wrapper

Build a default layout before mounting with the named `getDefaultTaskFormSections(type?)` export from `@dhx/gantt` or your wrapper package. The wrappers also provide form state, a validation callback and API helpers. See the [React hook](integrations/react/configuration-props.md#advanced-task-form), [Vue composable](integrations/vue/configuration-props.md#advanced-task-form) or [Angular service](integrations/angular/configuration-props.md#advanced-task-form).

The advanced form sample is available in the paid package examples at `samples/05_lightbox/16_advanced_task_form.html`.
