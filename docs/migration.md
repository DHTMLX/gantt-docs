---
title: "Migration from Older Versions"
sidebar_label: "Migration from Older Versions"
---

# Migration from Older Versions

## 9.1 -> 9.2 {#91---92}

### XSS protection in framework wrappers

Starting from v9.2, [React Gantt](integrations/react.md), [Vue Gantt](integrations/vue.md), and [Angular Gantt](integrations/angular.md) wrappers automatically HTML-escape string values returned from user-provided template functions. This prevents XSS vulnerabilities caused by unsanitized user data rendered through templates.

The escaping applies to:

- Functions passed via the `templates` prop
- `config.columns[].template` functions
- `config.scales[].format` functions

If your templates intentionally return HTML markup (e.g. `<b>`, `<span>`, `<div>`), the markup will now be escaped and rendered as plain text by default.

#### Per-template opt-out (recommended)

Wrap specific templates that need to output raw HTML with the `allowRawHTML` helper:

~~~jsx
import { allowRawHTML } from "@dhx/react-gantt";
// or "@dhx/vue-gantt" / "@dhx/angular-gantt"

<ReactGantt
    templates={{
        task_text: allowRawHTML((start, end, task) => `<b>${escapeHTML(task.text)}</b>`),
        task_class: (start, end, task) => task.priority // still escaped
    }}
/>
~~~

:::note
When using `allowRawHTML`, you are responsible for sanitizing any user-provided data inside that template. Use the exported `escapeHTML` utility for values that come from user input.
:::

#### Full opt-out

Set the `allowRawHTML` component prop to `true` to restore pre-9.2 behavior and disable escaping for all templates:

~~~jsx
<ReactGantt allowRawHTML={true} /* ... */ />
~~~

~~~vue
<VueGantt :allowRawHTML="true" /* ... */ />
~~~

~~~html
<dhx-gantt [allowRawHTML]="true" /* ... */></dhx-gantt>
~~~

## 9.0 -> 9.1

Version 9.1 does not introduce breaking changes, but several configuration options have been deprecated, and [migration to the new unified format](#autoscheduling) is recommended.
Also note that the previously deprecated [`subscales`](#subscales) configuration option has been deleted.

### Unified auto scheduling configuration {#autoscheduling}

Multiple properties that previously controlled [auto scheduling](guides/auto-scheduling.md) behavior have been deprecated in favor of the unified [`auto_scheduling`](api/config/auto_scheduling.md) configuration object.

~~~js
// before v9.1
gantt.config.auto_scheduling = true;
gantt.config.auto_scheduling_compatibility = true;
gantt.config.auto_scheduling_strict = true;
gantt.config.auto_scheduling_initial = false;

// since v9.1
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress",
    schedule_on_parse: false
};
~~~

The deprecated properties continue working for backward compatibility, but switching to the new object format is recommended.

The following options were deprecated:

- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)

**Mapping of deprecated configs to the unified object**


- `gantt.config.auto_scheduling_initial` -> `schedule_on_parse`
- `gantt.config.auto_scheduling_descendant_links` -> `descendant_links`
- `gantt.config.auto_scheduling_move_projects` -> `move_projects`
- `gantt.config.auto_scheduling_project_constraint` -> `project_constraint`
- `gantt.config.auto_scheduling_use_progress` -> `use_progress`
- `gantt.config.auto_scheduling_compatibility = true` -> `apply_constraints: false`
- `gantt.config.auto_scheduling_compatibility = false` -> `apply_constraints: true`
- `gantt.config.auto_scheduling_strict = true` -> `gap_behavior: "compress"`
- `gantt.config.auto_scheduling_strict = false` -> `gap_behavior: "preserve"`

### The obsolete `subscales` configuration option is deleted {#subscales}

Pay attention that the `subscales` configuration option [deprecated in v6.2](#timescalesettings) has been deleted in v9.1.

## 8.0 -> 9.0

The v9.0 update introduces several breaking changes.
### Skins switched to CSS variables

CSS skins (themes) have been completely reworked and now utilize CSS variables. While the HTML structure of the component and CSS class names have mostly remained unchanged, CSS styles written for older versions of the Gantt may no longer work as intended with v9.0.

For example, the following style was used to color tasks depending on their priority:

~~~html
<style>
    /* common styles for overriding borders/progress color */
    .gantt_task_line {
        border-color: rgba(0, 0, 0, 0.25);
    }
    .gantt_task_line .gantt_task_progress {
        background-color: rgba(0, 0, 0, 0.25);
    }

    /* high */
    .gantt_task_line.high {
        background-color: #03A9F4;
    }
    .gantt_task_line.high .gantt_task_content {
        color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        background-color: #f57730;
    }
    .gantt_task_line.medium .gantt_task_content {
        color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        background-color: #e157de;
    }
    .gantt_task_line.low .gantt_task_content {
        color: #fff;
    }
</style>
~~~

Starting from v9.0, the same effect is achieved with the following style:

~~~html
<style>
    /* high */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }
</style>
~~~

Check the available variables on the [Custom Skins](guides/custom-skins.md) page.

:::note
Migration will likely require updating of existing CSS to achieve the required design.
:::

### Single CSS file

All themes are now embedded into a single `dhtmlxgantt.css` file.

To activate a specific skin, use the `gantt.skin` property:

~~~js
gantt.skin = "material";
~~~

Or use [`setSkin()`](api/method/setskin.md):

~~~js
gantt.setSkin("material");
~~~

:::note
Note that `gantt.setSkin()` will repaint Gantt.
:::

If you use a skin other than `terrace`, the following migration steps are required:

1) Replace the CSS file of the skin with the `dhtmlxgantt.css` file:

~~~html
<!-- OLD -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt_material.css" type="text/css">
<!-- NEW -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt.css" type="text/css">
~~~

2) Enable the required skin from javascript:

~~~js
gantt.setSkin("material");
gantt.init("gantt_here");
~~~

### Built-in support for baselines, deadlines and constraints

Previously, adding baselines required manual coding using the [`addTaskLayer()`](api/method/addtasklayer.md) API. With Gantt 9.0, built-in support for baseline entities, deadlines, and task constraints was introduced.

If you want to switch off the default settings and render baselines and deadlines manually, use the corresponding configuration options: [`baselines`](api/config/baselines.md) and [`deadlines`](api/config/deadlines.md):

~~~js
// disabling the built-in baselines functionality
gantt.config.baselines = false;

// disabling the built-in deadlines functionality
gantt.config.deadlines = false;
~~~

Built-in display of task constraints can also be disabled using the extended [`auto_scheduling`](api/config/auto_scheduling.md) configuration:

~~~js {3}
gantt.config.auto_scheduling = {
    enabled: true,
    show_constraints: false
};
~~~

It disables the default display of task constraints while still keeping auto-scheduling functionality active.

### Sticky labels in the Timeline

Starting from v9.0, time scale labels are sticky by default. This means the labels stay visible on the screen as you scroll, following the viewport until they scroll off naturally. In previous versions, labels were centered within their cells and did not remain visible while scrolling.

If you need to revert to the old behavior and disable sticky labels, you can set the `sticky` property of the [scale](guides/configuring-time-scale.md) object to false:

~~~js
gantt.config.scales = [
    { unit: "year", step: 1, format: "%Y", sticky: false },
    { unit: "month", step: 1, format: "%F", sticky: false },
    { unit: "day", step: 1, format: "%j", sticky: false }
];
~~~

### Promise implementation

The **Bluebird** library has been excluded from the Gantt bundle. [`promise()`](api/method/promise.md) now uses the native `Promise` implementation.

### Lightbox resizing

Since v9.0, [`resizeLightbox()`](api/method/resizelightbox.md) has been deprecated and removed from the Gantt code. It is no longer needed, since lightbox resizing now works automatically.
If you still have `resizeLightbox()` in your configuration, remove it to avoid errors.

## 7.1 -> 8.0

### Resource assignments

In previous versions of DHTMLX Gantt, changes in resource assignments were sent to the backend as properties of task objects, which in some cases made integration with the backend API more difficult than necessary.

Starting from DHTMLX Gantt v8.0, changes made to resources and resource assignments can be routed via dataProcessor. Check the [Routing CRUD actions of resources and resource assignments](guides/server-side.md#resources_crud) section.

### Export service

From v8.0, the import/export functionality is included in the gantt library.

Therefore, if you have already included the **https://export.dhtmlx.com/gantt/api.js** on your page to enable the online export service, for example:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

Then you need to remove the file and enable the `export_api` extension using `plugins()`:

~~~js
gantt.plugins({
    export_api: true
});
~~~

### Deprecated class names

Since v8.0 the following deprecated class names have been removed and replaced with the new ones:

- `".dhtmlx-info"` -> `".gantt-info"`
- `".dhtmlx-error"` -> `".gantt-info"`
- `".dhtmlx_popup_title"` -> `".gantt_popup_title"`
- `".dhtmlx_popup_text"` -> `".gantt_popup_text"`
- `".dhtmlx_popup_controls"` -> `".gantt_popup_controls"`
- `".dhtmlx_ok_button"` -> `".gantt_ok_button"`
- `".dhtmlx_click_me_button"` -> `".gantt_click_me_button"`
- `".dhtmlx_popup_button"` -> `".gantt_popup_button"`
- `".dhtmlx_modal_box"` -> `".gantt_modal_box"`
- `".dhtmlx-" + config.type` -> `".gantt-" + config.type`
- `".dhtmlx_" + btn.label.toLowerCase() + "_button"` -> `".gantt_" + btn.label.toLowerCase() + "_button"`

## 7.0 -> 7.1

Version 7.1 doesn't introduce any breaking changes that would require modifying the existing code.

There is a minor visual change in the way milestones are rendered, which can be reverted by the code if needed. Large projects that use the resource panel may have a possible performance decrease caused by the new logic of resource assignments; it can be mitigated by disabling the unneeded logic.

### Milestones

The size of milestone elements has changed compared to previous versions so that milestones have the same height as regular bars.

If you want the milestones to look the same as in previous versions, you can adjust the height of the milestone elements using the `bar_height` property:

~~~js
const milestoneTask = {
    id: 23, text: "Mediate milestone", start_date: "2027-04-13",
    type: "milestone", parent: "15", bar_height: 35
};
~~~

### Resource assignments

Version 7.1 adds logic to resource assignments that allows specifying assignment dates and working with resource assignments via DataStore.
It should not affect the existing code, but the changes may add noticeable performance overhead to resource calculations.

If you don't need to assign resources to specific dates of tasks, you can disable the new functionality using the `process_resource_assignments` config in order to improve performance:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### New optional properties of Task objects

The following task properties are now processed by Gantt and affect the display of tasks:

- `task.row_height`
- `task.bar_height`
- `task.hide_bar`
- `task.rollup`
  
If you have custom properties with the same names, you should rename them to avoid conflicts.

### Deep copy on data parsing

Gantt performed a deep copy of data objects on data parsing from [v6.3.2](whats-new.md#632) till v7.1.

Starting with v7.1, the functionality is disabled by default.

You can enable the old behavior by setting [`deepcopy_on_parse`](api/config/deepcopy_on_parse.md) to `true`:

~~~js
gantt.config.deepcopy_on_parse = true;
~~~

### Deprecated config

The `gantt.config.task_height` property has been deprecated since v7.1. Although it continues to work and the `task_height` config is still used if specified, using [`bar_height`](api/config/bar_height.md) is recommended instead:

~~~js
gantt.config.bar_height = 50;
~~~


## 6.3 -> 7.0

### Extensions and locale files

The newest update v7.0 introduces two major changes in the structure of the Gantt package:

1. All files of extensions are now bundled with the *dhtmlxgantt.js* file.
Therefore, in order to activate any of extra extensions provided by dhtmlxGantt you need to use the API call.

- If you have already included any extension files from the built-in package on your page, for example:

~~~html
<script src="../codebase/dhtmlxgantt.js"></script>
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

or

~~~js
import "dhtmlx-gantt";
import "dhtmlx-gantt/ext/dhtmlxgantt_auto_scheduling";
~~~

Then you need to remove the extension file and enable the extension using `plugins()`:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

See the full list of extensions [here](guides/extensions-list.md).

- If you use a modified version of extension files or have developed custom extensions, include them as files on a page and they will work. 

- Note that the `dhtmlxgantt_smart_rendering.js` and `dhtmlxgantt_csp.js` extensions are completely removed and do not need to be enabled manually.


2. All locales are now embedded into the *dhtmlxgantt.js* file. To activate them, use the API call.

- If you have included any locale on a page, you need to remove it from the page and enable the required locale using `gantt.i18n.setLocale()`:

~~~js
gantt.i18n.setLocale("de");
~~~

- If you use a custom locale file, it can be loaded as before.

### Default settings of the working time are changed

In all versions before 7.0, the default working hours were from 8:00 till 17:00, that is 9 hours per day.

Starting from v7.0, the working hours are 8:00-12:00, 13:00-17:00 that is 8 hours per day.

If you want to revert to the previous settings, you'll need to set it manually:

~~~js
gantt.setWorkTime({ hours: [8, 17] });
~~~

### Content Security Policy

The **ext/dhtmlxgantt_csp.js** extension is no longer needed, as it is removed and replaced with the [`csp`](api/config/csp.md) config, which is enabled by default; the extension should be removed from Gantt.

Since the `csp` property is added to the dhtmlxGantt library, valid HTML5 attributes supported by browsers with HTML5 doctypes will be assigned to all Gantt elements.


Therefore, we recommend that you update already existing attributes with new ones:

- `task_id` -> [`data-task-id`](api/config/task_attribute.md)
- `link_id` -> [`data-link-id`](api/config/link_attribute.md)
- `resource_id` -> [`data-resource-id`](api/config/resource_attribute.md)
- `column_index` -> [`data-column-index`](api/config/grid_resizer_column_attribute.md)

However, the old attributes are included in the markup, so if you don't change the attributes' names, your code will continue working.

### Styling grid cells

Earlier, alignment of grid cells was accomplished via `display:inline-block`. Starting from v7.0, `display:flex` is used instead and cells are positioned inside a flex container.

This change doesn't affect the UI visible to the user (it remains 100% identical) and shouldn't cause any migration issues.
However, some regressions with styling of the grid cells may be related to this update.

### "xml_date" config and template, and "xml_format" templates are removed

Deprecated in v6.2 config and templates are removed in v7.0 and replaced with new ones:

- `gantt.config.xml_date` → [`gantt.config.date_format`](api/config/date_format.md)
- `gantt.templates.xml_date` → [`gantt.templates.parse_date`](api/template/parse_date.md)
- `gantt.templates.xml_format` → [`gantt.templates.format_date`](api/template/format_date.md)

If you have already defined the old names in your code, they will continue working. In other case, use a newer version of the API.

## 6.2 -> 6.3

### Multi-task selection

Since v6.3, the `ext/dhtmlxgantt_multiselect.js` extension automatically allows dragging several tasks that are selected at once horizontally.
If you want to disable this functionality, use [`drag_multiple`](api/config/drag_multiple.md) and set it to `false` (it is enabled by default).

~~~js
gantt.config.drag_multiple = false;
~~~

### Google Roboto font is no longer included into Material skin

Until v6.3, Google [Roboto](https://fonts.google.com/specimen/Roboto) font was included into the ['Material' skin](guides/skins.md#materialskin) of dhtmlxGantt via the `import` statement.
Starting from v6.3, the import was removed, therefore you need to add `Roboto` font manually:

~~~html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto:regular,medium,thin,bold">
~~~

### Usage with Require.JS

Earlier, you could use arbitrary names for different dhtmlxGantt library files included into a RequireJS-based app:

~~~js
requirejs.config({
    paths: {
        "gantt": "../../codebase/dhtmlxgantt",
        "tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
        "marker": "../../codebase/ext/dhtmlxgantt_marker",
        "locale_de": "../../codebase/locale/locale_de"
    },
    shim: {
        "tooltip": ["gantt"],
        "marker": ["gantt"],
        "locale_de": ["gantt"]
    }
});
requirejs(["gantt", "tooltip", "marker", "locale_de"], (dhx) => {
    const gantt = dhx.gantt;
    ...
});
~~~

Starting from version 6.3 names of modules must be fixed according to the folder structure of dhtmlxGantt library:

~~~js
requirejs.config({
    paths: {
        "dhtmlxgantt": "../../codebase/dhtmlxgantt",
        "ext/dhtmlxgantt_tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
        "ext/dhtmlxgantt_critical_path": "../../codebase/ext/dhtmlxgantt_critical_path",
        "locale/locale_de": "../../codebase/locale/locale_de"
    },
    shim: {
        "ext/dhtmlxgantt_tooltip": ["dhtmlxgantt"],
        "ext/dhtmlxgantt_critical_path": ["dhtmlxgantt"],
        "locale/locale_de": ["dhtmlxgantt"]
    }
});

requirejs([
    "dhtmlxgantt",
    "ext/dhtmlxgantt_tooltip",
    "ext/dhtmlxgantt_critical_path",
    "locale/locale_de"
], (dhx) => {
    const gantt = dhx.gantt;
    ...
});
~~~

Check that the module name for any file inside the package is specified as *a relative path inside the `codebase` folder of the package* plus *the filename*, for instance:

**core library:**

- `"dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"`

**extensions:**

- `"ext/dhtmlxgantt_critical_path": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_critical_path"`
- `"ext/dhtmlxgantt_tooltip": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_tooltip"`

**locales:**

- `"locale/locale_de": "./vendor/dhtmlxgantt/locale/locale_de"`
- `"locale/locale_be": "./vendor/dhtmlxgantt/locale/locale_be"`

### Inline Editors {#inline_editors}

Before version 6.3, minimal and maximal values of the `date` [inline editor](guides/inline-editing.md#types-of-editors) were limited by the dates visible on the time scale, unless custom `min` or `max` values were provided.

Starting from v6.3, there are no default limits for minimal and maximal values of date editors.

To restore the previous behavior, you can specify dynamic `min` and `max` values:

~~~js
const dateEditor = {
    type: "date",
    map_to: "start_date",
    min: (taskId) => gantt.getState().min_date,
    max: (taskId) => gantt.getState().max_date
};
~~~

## 6.1 -> 6.2

The update to v6.2 is generally compatible with v6.1 and should not require any changes in code. However, some behavior of the component has changed, old behavior can be restored via config, and some APIs have been deprecated.

### Smart rendering and static background

Smart rendering functionality has been updated and is now embedded into the component. It should now work both in the main timeline area and in resource panels. From now on, all timelines should render only rows and cells that are currently visible.

Smart rendering can be disabled via the `smart_rendering` config, which will return gantt to the default behavior of v6.1:

~~~js
gantt.config.smart_rendering = false;
~~~

The `dhtmlxgantt_smart_rendering` extension is no longer needed and should be removed from gantt. The extension itself is still available in the package in case of compatibility issues.
If the extension is added to the page, gantt will revert to the v6.1 smart rendering mode.

The behavior of [`static_background`](api/config/static_background.md) has been updated as well. Starting from v6.2, it renders a PNG background and any cells that have a CSS class attached to them via a template function.

If you need to revert to v6.1 behavior, use the `static_background_cells` config:

~~~js
gantt.config.static_background_cells = false;
~~~


### Time scale settings {#timescalesettings}

Time scale configuration has been simplified. Instead of specifying several scale settings for each scale separately, you should now use a single [`scales`](api/config/scales.md) configuration option that contains scale objects with their settings.

All in all, the following time scale APIs are deprecated:

- `gantt.config.scale_unit`
- `gantt.config.step`
- `gantt.config.date_scale`
- `gantt.templates.date_scale`
- `gantt.config.subscales`

For example, the code below:

~~~js
gantt.config.scale_unit = "day";
gantt.config.step = 1;
gantt.config.date_scale = "%d %M";
gantt.templates.date_scale = null;
gantt.config.subscales = [];
~~~

Now looks like this:

~~~js
gantt.config.scales = [{ unit: "day", step: 1, format: "%d %M" }];
~~~

#### task_cell_class template renamed

The template used to define the CSS class applied to the cells of the timeline area is renamed as follows:

- `gantt.templates.task_cell_class` → [`gantt.templates.timeline_cell_class`](api/template/timeline_cell_class.md)

An example of using the renamed template is:

~~~html
<style>
    .weekend { background: #f4f7f4 !important; }
</style>

<script>
    gantt.templates.timeline_cell_class = (task, date) => {
        if (date.getDay() === 0 || date.getDay() === 6) {
            return "weekend";
        }

        return "";
    };
</script>
~~~

### `xml_date` config and template, and `xml_format` templates are renamed

Below there is the scheme of replacing previously used API:

- `gantt.config.xml_date` → [`gantt.config.date_format`](api/config/date_format.md)
- `gantt.templates.xml_date` → [`gantt.templates.parse_date`](api/template/parse_date.md)
- `gantt.templates.xml_format` → [`gantt.templates.format_date`](api/template/format_date.md)


Since v6.2 the default values of the `xml_date` config, and `xml_date` and `xml_format` templates are *undefined*. Thus if you haven't assigned any values to them, they won't work.

However, Gantt will continue to use the old names of the config and templates, so if you've redefined those APIs in your code, they will work as before. For example:

~~~js
// will work correctly
gantt.templates.xml_date = (dateString) => new Date(dateString);
~~~


### Unused API removed

The `gantt.config.api_date` config and `gantt.templates.api_date` template are removed from the API, as they were not used inside Gantt code. If you used them in your code, you need to declare them again.

~~~js
gantt.config.api_date = "%d-%m-%Y %H:%i";
gantt.templates.api_date = gantt.date.date_to_str(gantt.config.api_date);
~~~

## 6.0 -> 6.1 

### Time constraints and auto scheduling

The `dhtmlxgantt_auto_scheduling.js` extension is upgraded with the [tasks constraints](guides/auto-scheduling.md#timeconstraintsfortasks) functionality. Since this feature modifies the default behavior of auto scheduling,
Gantt supports the compatibility mode that allows you to restore the previous behavior and not take task constraints into account during auto scheduling.

To enter the compatibility mode, make use of the following configuration option:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### Tooltips displaying area

Before version 6.1, [tooltips](guides/tooltips.md) were displayed only inside the timeline area. After the v6.1 release, tooltip display is no longer limited, and a tooltip follows the mouse pointer.

If necessary, you can restore the previous behavior by using the code below before gantt initialization:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;
    tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

## 5.2 -> 6.0

In version 6.0, `getSlack()` is deprecated. Two methods are added instead:

- [`getFreeSlack()`](api/method/getfreeslack.md) - returns the free slack of a task
- [`getTotalSlack()`](api/method/gettotalslack.md) - returns the total slack of a task

Methods marked as deprecated in v[4.0](#3x---40) stopped working in v6.0. The `dhtmlx` object definition was removed from *dhtmlxgantt.js*.

If you use any of the obsolete methods, you'll need to replace them with supported implementations according to the table below. No changes in the arguments or behavior of the methods were made.

<table class="my_table">

<tr><td class="version_info">Obsolete methods</td><td class="version_info">Working methods</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>


## 3.x -> 4.0

Version 4.0 introduces some changes in public API, namely:

- legacy modules as well as the modules that intersect with dhtmlxSuite modules are no longer defined by the dhtmlxGantt library
- commonly used modules, such as `dhtmlxMessage`, `dataProcessor`, and `Ajax`, are moved to the `window.gantt` namespace and became a part of the dhtmlxGantt public API

A fallback to the old API is included in v4.x, so the code written for v3.3 and earlier will continue working. However, in some cases changes are required.
Generally, all global declarations except for `window.gantt` and `window.Gantt` (enterprise version only) are deprecated and will be removed in version 5.0.

### Deprecated API

There are methods that have been deprecated. They will continue working in v4.x, but will trigger a console warning (not visible to end users) each time they are called.

Overview:

- `dhtmlxMessage` has been moved from the `window.dhtmlx` object to the `window.gantt` object. Read more about Message Boxes [here](guides/message-boxes.md)
- `dhtmlxDataProcessor` has been moved from `window.dataProcessor` to `window.gantt.dataProcessor`
- Utility methods such as `dhtmlx.copy`, `dhtmlx.uid`, and `dhtmlx.mixin` have been moved to the `window.gantt` object

If you use these methods, your application will continue working after updating to v4.0 without requiring any immediate changes. In future we recommend updating them to a newer version of the API.

The complete list of deprecated methods includes:

<table class="my_table">

<tr><td class="version_info">Up to version 3.3</td><td class="version_info">From version 4.0</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>

### Obsolete API

Some methods have become obsolete and will no longer be used in v4.x.
If you still use these methods or objects, you'll need either to modify the code of an application or to include the `dhtmlxgantt_deprecated.js` file on the page.

Overview:

- `window.dhx4` is no longer defined by `dhtmlxgantt.js`
- Environment variables that were defined in `window.dhx4` are now available in the `gantt.env` object
- The Ajax module has been moved from `dhx4.ajax` to `gantt.ajax`
- `gantt.event` and `gantt.eventRemove` should be used instead of `dhtmlxEvent`/`dhtmlxDetachEvent`

The whole list of the obsolete API is given below:

<table class="my_table">

<tr><td class="version_info">Up to version 3.3</td><td class="version_info">From version 4.0</td></tr>
<tr><td>window.dhtmlxEvent</td><td>gantt.event</td></tr>
<tr><td>window.dhtmlxDetachEvent</td><td>gantt.eventRemove</td></tr>
<tr><td>window.dhx4.isIE</td><td>gantt.env.isIE</td></tr>
<tr><td>window.dhx4.isIE6</td><td>gantt.env.isIE6</td></tr>
<tr><td>window.dhx4.isIE7</td><td>gantt.env.isIE7</td></tr>
<tr><td>window.dhx4.isIE8</td><td>gantt.env.isIE8</td></tr>
<tr><td>window.dhx4.isOpera</td><td>gantt.env.isOpera</td></tr>
<tr><td>window.dhx4.isChrome</td><td>gantt.env.isChrome</td></tr>
<tr><td>window.dhx4.isKHTML</td><td>gantt.env.isKHTML</td></tr>
<tr><td>window.dhx4.isFF</td><td>gantt.env.isFF</td></tr>
<tr><td>window.dhx4.isIPad</td><td>gantt.env.isIPad</td></tr>
</table>


## 2.0 -> 3.0

1. In order to prevent CSS conflicts with dhtmlxScheduler, the class names that have been used by both components were renamed in dhtmlxGantt, all classes were related to the lightbox.
If you have customized styling for the lightbox, the migration will consist in renaming to appropriate CSS classes.

There are 2 renamed patterns:

- Replace `'.dhx_gantt_'` with `'.gantt_'` (`.dhx_gantt_duration` -> `.gantt_duration`)
- Replace `'.dhx_'` prefix with `'.gantt_'` (`.dhx_custom_button` -> `.gantt_custom_button`)

*If you encounter difficulties with migrating CSS classes, please, see the full list of renamed classes [here](guides/migrating-renamedcss.md)*.


2. The default values of [`buttons_right`](api/config/buttons_right.md) and [`buttons_left`](api/config/buttons_left.md) were changed in the following way:

~~~js
// Before
gantt.config.buttons_left = [
    "dhx_save_btn",
    "dhx_cancel_btn"
];
gantt.config.buttons_right = [
    "dhx_delete_btn"
];

// After
gantt.config.buttons_left = [
    "gantt_save_btn",
    "gantt_cancel_btn"
];
gantt.config.buttons_right = [
    "gantt_delete_btn"
];
~~~

Old configurations (`"dhx_save_btn"`, `"dhx_cancel_btn"`, `"gantt_delete_btn"`) will still work. These changes do not break any existing behavior.

3. The following features are now available only in the Commercial or Enterprise version of the component, not available in the GPL version of dhtmlxGantt:

- Ability to hide days in week, month, timeline view
- Projects, milestones and other custom types

## 1.0 -> 2.0

1. A variety of objects (`GanttProjectInfo`, `GanttTaskInfo`, `GanttChart`, `GanttProject`, `GanttTask`) are replaced with one static object, `gantt`.

The `gantt` object contains a set of methods and 2 main properties: [`config`](api/overview/properties-overview.md) and [`templates`](api/overview/templates-overview.md).

- [`gantt.config`](api/overview/properties-overview.md) - configuration options for dates, scale, controls, and so on
- [`gantt.templates`](api/overview/templates-overview.md) - formatting templates for dates and labels used in the Gantt chart


2. dhtmlxGantt is initialized through [`init()`](api/method/init.md).

`const gantt = new GanttChart()` -> `gantt.init("gantt_div")`.


3. Instead of GanttProject and GanttTask, data is stored as [an array of plain objects with a number of mandatory properties and any custom properties](guides/loading.md#dataproperties):

~~~js
const taskData = {
    data: [
        { id: "1", text: "Project #2", start_date: "2027-04-01", duration: 18, open: true },
        { id: "2", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "1" },
        { id: "3", text: "Task #2", start_date: "2027-04-11", duration: 8, parent: "1" }
    ],
    links: [
        { id: "1", source: "1", target: "2", type: "1" },
        { id: "2", source: "2", target: "3", type: "0" },
        { id: "3", source: "3", target: "4", type: "0" },
        { id: "4", source: "2", target: "5", type: "2" }
    ]
};
~~~

4. The [XML format](guides/supported-data-formats.md#xmldhtmlxgantt20) was changed, but the [old XML format](guides/supported-data-formats.md#xmldhtmlxganttlt20) can still be loaded with [`load()`](api/method/load.md).

~~~js
gantt.load("tasks.xml", "oldxml");
~~~

**Related sample**: [Loading data in Gantt 1.6 format](https://docs.dhtmlx.com/gantt/samples/01_initialization/09_backward_compatibility.html)

5. **Design-time Objects**:

- Methods of the *GanttProjectInfo* object are replaced with:
- `addTask` -> [`gantt.addTask()`](api/method/addtask.md)
- `deleteTask` -> [`gantt.deleteTask()`](api/method/deletetask.md)
- `getTaskById` -> [`gantt.getTask()`](api/method/gettask.md)
- Methods of the *GanttTaskInfo* object are replaced with:
- `addChildTask` -> [`gantt.addTask()`](api/method/addtask.md) (`parent` of the task object sets the parent for the task)


6. **Run-time Objects**:

dhtmlxGantt 2.0 doesn't use different types for project and task objects. Instead of this, any task object can have 1 parent object and any number of child tasks.

- *GanttProject*
- Instead of `getDuration()`, `getId()`, `getName()`, `getPercentCompleted()`, and `getStartDate()`, project properties are accessed through `gantt.getTask(projectTaskId).propertyName`.
- *GanttTask*
- Instead of `getDuration()`, `getId()`, `getName()`, `getParentTaskId()`, `getPercentCompleted()`, `getPredecessorTaskId()`, and `setDuration()`, task properties are accessed through `gantt.getTask(taskId).propertyName`.
  
A list of methods for getting parent/child objects:

- [`getTask()`](api/method/gettask.md)
- [`hasChild()`](api/method/haschild.md)
- [`getChildren()`](api/method/getchildren.md)

:::note
The parent task ID can be accessed as `gantt.getTask(task_id).parent`. The root element does not have the `parent` property.
:::
