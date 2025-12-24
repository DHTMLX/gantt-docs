---
title: "What's New"
sidebar_label: "What's New"
---

# What's New

:::note
Updating from an earlier version? Check the [migration guide](migration.md) for required changes and update steps.
:::

## 9.1.1

<span class='release_date'>December 15, 2025. Bugfix release</span>

### Fixes

- Fix the error that occurred in [React Gantt](integrations/react.md) when the user provided `links` prop without the `tasks` prop
- Fix the issue in [React Gantt](integrations/react.md) where reloaded tasks did not have link IDs in their `$source` and `$target` properties
- Fix the issue where Gantt opened the inline editor after pressing the **Meta** key
- Fix the `%w` [date format](guides/date-format.md) not working correctly in CSP production environments
- Fix the issue that prevented [group tasks](api/method/groupby.md) from being displayed as [split tasks](guides/split-tasks.md) when they had `render="split"` specified
- Fix the issue with the resource grid disappearing on pressing the **Tab** key after editing a resource cell

### Updates 

- Allow configuring row and task bar height for [virtual tasks](api/method/groupby.md)

## 9.1

<span class='release_date'>November 5, 2025. Minor update</span>

### Breaking Changes

This update brings some changes in the structure of the Gantt package and behavior of the functionality. Make sure to check the 
[Migration notes](migration.md#90---91) to be on the safe side.

### New Functionality

- [Multi-user backend](guides/multiuser-live-updates.md) module for real-time updates is added
- [Remote updates API](guides/multiuser-live-updates.md#remote-updates-api) for managing data synchronization in real time is added
- New [Resource Assignments control](guides/resource-assignments.md) is introduced to extend the functionality of the [Resources](guides/resources.md) control
- The ability to [display tasks in Day/Week scale](guides/configuring-time-scale.md#workhourawaretaskbarsrenderingindayweekscales) 
based on actual working hours instead of the fixed 24-hour period
- The ability to [render split subtasks depending on the state of the parent row](guides/split-tasks.md#per-child-placement-of-split-subtasks)


### Updates

- Ability to fix the size of [Timeline cells](guides/configuring-time-scale.md#fixed-column-width) is added
- Support for specifying [dates in the calendar configuration](api/method/addcalendar.md) is added
- A [configuration object](api/config/auto_scheduling.md) for [Auto Scheduling](guides/auto-scheduling.md) to simplify setup is added
- Improved touch screen support for Windows devices is added
- The obsolete **subscales** API is removed

### Fixes

- Fix the issue where [](api/method/exporttoexcel.md) with `visual:true` and custom data failed when the timeline was hidden
- Fix the issue where [](api/method/exporttopdf.md) with `additional_settings.slice_archive` setting caused incomplete display of Gantt
- Prevent [unscheduled tasks](guides/unscheduled-tasks.md) from being included in Excel exports
- Add support for exporting [split tasks](guides/split-tasks.md) in Excel output
- Fix the incorrect display of the [Resource Histogram](guides/resource-management.md#resourceviewpanel) after resizing
- Fix the issue with tasks overlapping on changing the zoom level


## 9.0.15

<span class='release_date'>September 19, 2025. Bugfix release</span>

### Fixes

- Fix the issue where Gantt ignored the weekday configuration of `customWeeks` when set via the [setWorkTime](api/method/setworktime.md) method
- Improve support for [Shadow DOM](https://html.spec.whatwg.org/multipage/custom-elements.html) inside elements of Gantt
- Fix the [React Gantt](integrations/react.md) issue where multiple component instances caused duplicated templates

## 9.0.14

<span class='release_date'>July 31, 2025. Bugfix release</span>

### Fixes

- Fix the script error thrown after closing a [Modalbox](guides/message-boxes.md)
- Prevent creation of an empty row in the tree after re-parsing data in [grouped](api/method/groupby.md) mode
- Ensure the [setWorkTime](api/method/setworktime.md) method correctly applies **customWeeks** in Firefox
- Fix the issue where calling [setTasks](integrations/react.md) with an empty dataset broke the React Gantt component


## 9.0.13

<span class='release_date'>June 26, 2025. Bugfix release</span>

### Fixes

- Fix the issue where Gantt became unusable after creating and deleting a duplicate link
- Ensure link placeholders are displayed correctly on touch devices
- Fix the issue where a project's `end_date` is not updated when it has a single milestone child
- Prevent unnecessary repaints of resource items when using a custom datastore
- Fix the issue where [silently](api/method/silent.md) calling [gantt.addLink](api/method/addlink.md) resulted in an incorrect state of the internal datastore
- Prevent [DataProcessor](guides/server-side.md) from adding the `!nativeeditor_status` property to [custom router](guides/server-side.md#customrouting) arguments
- Fix incorrect handling of `tasks` and `links` props changes in the [React Gantt](integrations/react.md) component


## 9.0.12

<span class='release_date'>June 19, 2025. Bugfix release</span>

### Fixes

- Ensure the [contrast-white](guides/skins.md#contrastwhiteskin) skin passes color contrast accessibility tests
- Fix the issue where [dynamic loading](guides/dynamic-loading.md) stops working after calling [gantt.clearAll()](api/method/clearall.md)
- Prevent the [Tooltip](guides/tooltips.md) from rendering outside the Gantt container when displaying a long text
- Fix the issue where [server updates](guides/server-side.md) were not finalized when [keyboard navigation](guides/keyboard-navigation.md) was active
- Fix the incorrect work of custom class names applied to [milestone baselines](guides/inbuilt-baselines.md)

### Updates

- [React Gantt](integrations/react.md) is now compatible with **Next.js** and **Remix** SSR frameworks without additional configuring

## 9.0.11

<span class='release_date'>May 27, 2025. Bugfix release</span>

### Fixes

- Fix the issue where [](api/method/mergecalendars.md) merged `customWeeks` values incorrectly
- Fix the error thrown in the `onrender` function when the [column](guides/specifying-columns.md#wbscode) `name` includes spaces
- Fix the issue where Gantt stayed in read-only mode after [click_drag](guides/extensions-list.md#advanced-drag-n-drop) the Timeline when the [S-Curve Overlay](guides/baselines.md#extra-overlay-for-the-chart) was enabled
- Fix the issue where task duration was reset to `0` when using a [Resource calendar](guides/resource-management.md) and the [Resources](guides/resource-management.md#resourceviewpanel) section was placed below the duration section of the [Lightbox](guides/default-edit-form.md)
- Fix the console error triggered by the "This is a Trial version" warning when Gantt is used in **React StrictMode**
- Fix the issue where the [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) function did not recalculate row height when [gantt.config.baselines.render_mode](api/config/baselines.md#details) was disabled
- Fix the issue preventing tasks from being displayed when the Timeline is [hidden](api/config/show_chart.md) in the Salesforce environment
- Fix the issue where calendars are not inherited from parent tasks when [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) config is disabled
- Fix the issue where scroll position reset on re-render when [ReactGantt](integrations/react.md) was in the groupBy mode

### Updates

- Add the `isSalesforce` flag to [gantt.env](api/other/env.md)
- Add the `groupTasks` prop to [React Gantt](integrations/react.md#groupingtasks)

## 9.0.10

<span class='release_date'>April 22, 2025. Bugfix release</span>

### Fixes

- Fix the issue preventing changes to the `parent` field value in the [Lightbox](guides/default-edit-form.md)
- Fix excessive scroll speed when using a mouse wheel in Firefox 88 and newer
- Fix the inability to drag [project tasks](guides/task-types.md#project-tasks) when a subtask is unscheduled and lacks date parameters
- Ensure [gantt.render()](api/method/render.md) is not called unexpectedly during the [gantt.silent](api/method/silent.md) operation when using the [open](api/method/open.md) or [close](api/method/close.md)  methods
- Fix the issue where [project tasks](guides/task-types.md#project-tasks) are not repainted if the [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) event returns `false`
- Ensure that task progress bars span the full width of the task when expected
- Remove invalid WAI-ARIA attributes from read-only task links to improve [accessibility](guides/accessibility.md#wai-aria-attributes)
- Fix the issue where task bar resizers do not adapt to changes in task bar height

## 9.0.9

<span class='release_date'>April 16, 2025. Bugfix release</span>

### Updates

- Samples for [React Gantt](integrations/react.md) were added to the Commercial, Enterprise, Ultimate, and Evaluation packages

### Fixes

- Fix the issue where mouse wheel zooming stopped working after calling the [resetLayout](api/method/resetlayout.md) method
- Fix the issue where the [Quick Info](guides/quick-info.md) popup appeared after clicking the expand/collapse button in the [Timeline](guides/configuring-time-scale.md) or [Grid](guides/specifying-columns.md) views
- Fix the error that occurred when destroying Gantt without initializing the grid view
- Fix the error that occurred when loading a task with a non-existent parent while the [Undo extension](guides/undo-redo.md) was enabled
- Fix the issue where the [click_drag](guides/extensions-list.md#advanced-drag-n-drop) extension did not function on touch devices
- Improve grid scrolling responsiveness on touch devices

## 9.0.7

<span class='release_date'>March 27, 2025. Bugfix release</span>

### Fixes

- Fix the error that occurs when clicking on a task in the timeline without a grid if [keyboard_navigation](guides/keyboard-navigation.md) is enabled
- Correct [WBS code](guides/specifying-columns.md#wbscode) calculation for sorted tasks that include a [placeholder task](api/config/placeholder_task.md)
- Resolve the issue where scale cells in the resource timeline disappear upon collapsing tasks or [resizing the grid](guides/layout-config.md#default-layout)
- Ensure that the correct task order is maintained when adding both child and parent tasks inside the [`gantt.silent`](api/method/silent.md) function
- Preserve focus in editable [resource cells](guides/resource-management.md) after the value has been edited
- Prevent Gantt from scrolling to the leftmost position of the grid when clicking on a task
- Retain the `group` property when adding new tasks while in the [group](api/method/groupby.md) mode
- Fix the issue where [markers](guides/markers.md) are not displayed if the timeline has been initially disabled
- Prevent duplicate [markers](guides/markers.md) when the chart is not initially displayed in the layout configuration
- Fix the disappearing of drag handles (link, progress, task resize) after [dragging the timeline](api/config/drag_timeline.md)
- Ensure the [predecessor inline editor](guides/inline-editors-ext.md) functions correctly when the link id type is numeric
- Prevent duplication of the `gantt_marker_area` elements
- Fix the [undo](guides/undo-redo.md) functionality with the `changeTaskId` action

## 9.0.6

<span class='release_date'>March 18, 2025. Bugfix release</span>

### Fixes

- Fix the issue with the [lightbox](guides/default-edit-form.md) where buttons did not reflect the current locale until Gantt was reinitialized
- Resolve an error that occurred when deleting links with partially loaded tasks
- Prevent tasks from incorrectly moving to the bottom of their branches after changing the `parent` property type from numeric to string
- Improve scrollbar behavior by adjusting the resizers near scrollbars
- Ensure that [resource assignments](guides/resource-management.md#assigningresources) remain when adding tasks within [gantt.batchUpdate](api/method/batchupdate.md)
- Fix an issue causing tasks to disappear during drag-and-drop actions in the [infinite scale](guides/configuring-time-scale.md#infinite-scroll)
- Ensure the correct display of resource names in the [lightbox](guides/default-edit-form.md) after data is parsed multiple times
- Fix an incorrect date calculation in [`getClosestWorkTime`](api/method/getclosestworktime.md) when using the [](api/config/duration_step.md) config
- Allow the [onColumnDragMove](api/config/reorder_grid_columns.md) event to be canceled
- Fix a compatibility issue preventing the trial build from running in Lightning Web Components (LWC)
- Resolve issues related to `fetchTasks` and [deepcopy_on_parse](api/config/deepcopy_on_parse.md) configurations that affected the [resource panel](guides/resource-management.md#resourceviewpanel)
- Correct the appearance of font icons during Gantt initialization

## 9.0.5

<span class='release_date'>February 28, 2025. Bugfix release</span>

- Fix the error that occurs while resizing rows in the [Resource Grid](guides/resource-management.md#resourceviewpanel)
- Ensure the last year is specified in the range specified by the **year_range** property of the [Time control](guides/time.md#properties)
- Correct the position of link arrows affected by the `line-height` CSS style
- Fix the error that occurs while loading [collections](guides/supported-data-formats.md#jsonwithcollections) without the `links` array
- Resolve the issue with `gantt.config.baselines` when it is falsy but not explicitly set to `false`
- Fix the issue where [click_drag](guides/extensions-list.md#advanced-drag-n-drop) doesn't work after calling [resetLayout](api/method/resetlayout.md)
- Ensure selected child tasks are not displayed above their parent when [keyboard_navigation](guides/keyboard-navigation.md) is enabled
- Fix keyboard navigation issues that occur when task IDs contain single quotes
- Correct [calculateEndDate](api/method/calculateenddate.md) behavior when the duration is negative
- Resolve the error that occurs while loading datasets with [baselines](guides/inbuilt-baselines.md) without an active timeline
- Ensure grid cells are focused even when tasks fall outside the chart time range
- Fix the error that occurs while partially deleting a date value in the [inline editor](guides/inline-editors-ext.md)
- Fix the issue where the [resource panel](guides/resource-management.md#resourceviewpanel) is displayed incorrectly after filtering when `fetchTasks` is enabled

## 9.0.4

<span class='release_date'>December 3, 2024. Bugfix release</span>

- Fix the issue where the [SNET constraint](guides/auto-scheduling.md#timeconstraintsfortasks) date cannot be changed via the [inline editor](guides/inline-editors-ext.md)
- Fix the issue where Gantt returns the global [calendar](guides/working-time.md) instead of the resource calendar for tasks that have a single [resource assignment](guides/resource-management.md#assigningresources) when the [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) config is disabled
- Fix the [constraint](guides/auto-scheduling.md#timeconstraintsfortasks) date issue when changing the start date via the inline editor after [reinitializing](api/method/init.md) Gantt or [resetting the layout](api/method/resetlayout.md)
- Fix the script error with some configurations of [gantt.plugins](api/method/plugins.md) when using the [gantt.getGanttInstance](guides/multiple-gantts.md) method without specifying a container
- Fix the issue where Gantt stops working when the [](api/config/auto_scheduling_project_constraint.md) configuration is enabled, and tasks are [grouped](api/method/groupby.md)
- Ensure Gantt retains the task [constraint](guides/auto-scheduling.md#timeconstraintsfortasks) after dragging a task


## 9.0.3

<span class='release_date'>November 19, 2024. Bugfix release</span>

- Fix the regression in styles for the [Quick Info](guides/quick-info.md) popup
- Resolve build warnings from PostCSS caused by the usage of 'start'/'end' instead of 'flex-start'/'flex-end'
- Prevent [resource assignment](guides/resource-management.md#assigningresources) from being removed when updated via the lightbox
- Fix the issue with an empty task array in [resource_cell_value](api/template/resource_cell_value.md) on non-working days when [resource_render_empty_cells](api/config/resource_render_empty_cells.md) is enabled
- Correct the error occurring when clicking on buttons embedded into sections of the [lightbox](guides/default-edit-form.md)
- Ensure the [resource panel](guides/resource-management.md#resourceviewpanel) and [zoom levels](guides/zooming.md#built-in-zooming-module) remain in sync
- Prevent [Inline Editors](guides/inline-editors-ext.md) events from being removed after [reinitializing](api/method/init.md) Gantt or [resetting the layout](api/method/resetlayout.md)
- Fix the issue where the open state is not restored after [redoing](guides/undo-redo.md) changes

## 9.0.2

<span class='release_date'>November 11, 2024. Bugfix release</span>

### Fixes

- Fix the regression causing incorrect styles for task borders and progress when the task color is specified via [properties of a task object](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
- Restore the functionality of the [marker_class](api/template/marker_class.md) template
- Restore missing classname of the [textarea](guides/textarea.md) section of the lightbox
- Correct the issue where [deadlines](guides/inbuilt-baselines.md#deadlines-and-constraints) are displayed outside the task row and are not fully centered
- Ensure that links are displayed above other links on mouse hover
- Fix the issue where [baseline](guides/inbuilt-baselines.md) dates are not calculated when loading them using the [parse](api/method/parse.md) method
- Correct positions of [constrains](guides/inbuilt-baselines.md#deadlines-and-constraints) for both regular and [RTL](guides/rtl-mode.md) views
- Prevent unnecessary link loops when linking parts of split tasks
- Fix the issue where [Quick Info](guides/quick-info.md) in [detached mode](api/config/quick_info_detached.md) is not hidden due to increased width and hardcoded styles
- Update the [Export API](api/method/exporttoexcel.md) to support tree indentation for Excel export
- Resolve the issue preventing task selection when the [multiselect_one_level](api/config/multiselect_one_level.md) is enabled and a task on another tree level is selected
- Restore functionality of the [export_api](api/method/exporttopdf.md) plugin in the TypeScript environment
- Update type definitions

## 9.0.1


<span class='release_date'>October 21, 2024. Bugfix release</span>

### Fixes

- Fix the regression with the incorrect link position while dragging with enabled [smart_rendering](api/config/smart_rendering.md)
- Fix the regression where the [Resource Control](guides/resources.md) of the [lightbox](guides/default-edit-form.md) expands beyond its container
- Correct the missing bottom border of [time scale](guides/configuring-time-scale.md) cells in the last row when cells are highlighted with custom CSS
- Fix the incorrect behavior of [sticky labels](guides/configuring-time-scale.md#sticky-labels) when [smart_scales](api/config/smart_scales.md) is disabled
- Resolve the issue where Gantt continues [vertically dragging](api/config/order_branch.md) a task after a right click
- Fix the issue where calling [resetLayout](api/method/resetlayout.md) breaks the functionality of the [S-Curve Overlay](guides/baselines.md#extra-overlay-for-the-chart) plugin
- Prevent creation of duplicate links by the [predecessor editor](guides/inline-editing.md#types-of-editors)

## <b>9.0</b>


<span class='release_date'>October 17, 2024. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-9-0/)

### Breaking Changes

This update brings some changes in the structure of the Gantt package and behavior of the functionality. Make sure to check the 
[Migration notes](migration.md#80---90) to be on the safe side.

### New functionality

- [Skins customization](guides/custom-skins.md) with CSS variables
- New [Dark skin](guides/skins.md#darkskin) is introduced
- Built-in support for [baselines](guides/inbuilt-baselines.md) is added
- [Manually scheduled summary tasks](guides/custom-projects-dates.md) are now supported
- [Sticky labels for time scales](guides/configuring-time-scale.md#sticky-labels)

### Updates

- [Terrace skin](guides/skins.md#terraceskin) is updated
- Default display of [deadlines](guides/inbuilt-baselines.md#deadlines-and-constraints) is added
- Default display of [task constraints](guides/auto-scheduling.md#timeconstraintsfortasks) is added
- [Source files of skins](guides/custom-skins.md) are now included in the package
- The `setUndoStack` and `setRedoStack` methods are added to the [Undo plugin](guides/undo-redo.md) for managing the undo/redo stacks
- Ability to [install the professional versions of the Gantt via npm](guides/installation.md)
- [Bluebird Promise](api/method/promise.md) library is **removed** from the core library
- Various improvements for scaling on high-definition screens and responsiveness on smaller screens
- Updated type definitions

### Fixes


- Fix the incorrect link positions for Milestones when the parent task has a larger height
- Resolve the error that occurs during [Auto Scheduling](guides/auto-scheduling.md) if auto-scheduling is canceled for a task
- Ensure [split tasks](guides/split-tasks.md) are properly displayed within the split parent row
- Correct the [Auto Scheduling](guides/auto-scheduling.md) of projects when a subtask link has a lag of 0
- Fix incorrect link positions for [split tasks](guides/split-tasks.md) that have different row heights
- Ensure Gantt properly auto-schedules projects with 2 levels of tasks
- Fix the issue where Gantt doesn't return the fixedDate "assignments" in the [resource_cell_value](guides/resource-management.md) when the task is outside the specified date range


## 8.0.11


<span class='release_date'>October 8, 2024. Bugfix release</span>

### Fixes

- Fix the Grid scrolling with the Timeline when a [column resizer](guides/specifying-columns.md#resizing) is present on the rightmost column
- Prevent the [lightbox](guides/default-edit-form.md) from switching to the [wide form](api/config/wide_form.md) mode upon adding the [Time section](guides/time.md)
- Ensure the [number editor](guides/inline-editing.md) respects min and max properties, preventing entry of values outside the defined range
- Fix the error on deleting a task inside the [gantt.batchUpdate](api/method/batchupdate.md) method while tasks are displayed in the [Resource Panel](guides/resource-management.md)
- Correct the [lightbox](guides/default-edit-form.md) positioning to be properly centered in the Salesforce environment
- Fix [Keyboard navigation](guides/keyboard-navigation.md) stopping due to the [row_height](api/config/row_height.md) setting
- Correct the dates for project [Auto Scheduling](guides/auto-scheduling.md) in some scenarios, so only one auto-scheduling call is needed for accurate results
- Resolve the issue with [Keyboard navigation](guides/keyboard-navigation.md) when the [Resource Histogram](guides/resource-management.md#resourceviewpanel) is present on the page
- Fix the initialization error on touch-enabled devices when [gantt.getGanttInstance](guides/multiple-gantts.md) is called with configuration parameters
- The [gantt.load](api/method/load.md) method is removed from the Node.js version
- Fix the error thrown by Gantt when defining a custom [getVisibleRange](api/method/addtasklayer.md) function
- Resolve the regression causing Gantt to scroll to a task after it is updated when [Keyboard navigation](guides/keyboard-navigation.md) is enabled
- Ensure [grid sorting](api/config/sort.md) works properly when clicking the sort icon in the header
- Fix inconsistent task repainting when [drag_timeline](api/config/drag_timeline.md) is enabled

## 8.0.10


<span class='release_date'>August 23, 2024. Bugfix release</span>

### Fixes

- Fix the issue where Gantt didn't [merge](guides/working-time.md#mergingcalendars)" date settings from the second [Calendar](guides/working-time.md)
- Fix the issue where [Resources](guides/resource-management.md) were not assigned when the ["hide empty"](guides/resources.md) option was enabled
- Fix the [getLightboxSection](api/method/getlightboxsection.md) method returning a `null` for the [Resource Section](guides/resources.md) until any value was modified
- Fix the issue where templates of the [Resource Histogram](guides/resource-management.md#resourceviewpanel) were not called for tasks starting before the minimum date but ending within the displayed date range
- Fix the issue where [Resource Assignments](guides/resource-management.md) were not saved after changing the task [type](guides/typeselect.md)
- Fix the issue where the 'project' task [type](guides/typeselect.md) was not set in the lightbox
- Fix the issue where [worktime settings](guides/working-time.md) of the [merged](guides/working-time.md#mergingcalendars)" calendar were treated as weekends
- Fix the issue that prevented [grouping](api/method/groupby.md) by resources when a task had [Resource Assignments](guides/resource-management.md) on different dates
- Fix the error caused by attempting to [filter split tasks](guides/split-tasks.md#filtering-split-tasks) with no children using the [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) event
- Fix the issue where [Resource Assignments](guides/resource-management.md) were not updated after [dragging the project with subtasks](api/config/drag_project.md)

## 8.0.9


<span class='release_date'>June 18, 2024. Bugfix release</span>

### Fixes

- Resolve the issue where tasks disappear after using [keyboard shortcuts](guides/keyboard-navigation.md) to indent or outdent multiple times
- Fix the issue that prevented reopening the [Inline editor](guides/inline-editing.md) after vertically scrolling the Gantt
- Fix the issue with [DataProcessor](guides/server-side.md#resources_crud) ignoring custom headers specified in the [gantt.createDataProcessor](api/method/createdataprocessor.md) method
- Fix tasks display issue that occurs when [onBeforeLightbox](api/event/onbeforelightbox.md) handler returns `false` while creating a new task
- Fix the incorrect [markers](guides/markers.md) height when [timeline_placeholder](api/config/timeline_placeholder.md) config is enabled
- Fix [Formatter](guides/formatters-ext.md) working only with Latin symbols
- Fix the issue that causes tasks to disappear after [vertically dragging](api/config/order_branch.md) a parent task
- Fix the incorrect work of [keyboard shortcut](guides/keyboard-navigation.md) for scrolling when [smart_rendering](api/config/smart_rendering.md) is enabled
- Fix the issue with custom properties of [Resource Assignments](guides/resource-management.md) objects not being included after parsing
- Update TypeScript type definitions


## 8.0.8


<span class='release_date'>May 31, 2024. Bugfix release</span>

### Fixes

- Fix the issue that caused the [Undo extension](guides/undo-redo.md) to skip some actions in bulk operations
- Fix the script error that occurs when [gantt.deleteLink](api/method/deletelink.md) is called from the [gantt.silent](api/method/silent.md) function
- Fix the incorrect behavior of [Auto Scheduling](guides/auto-scheduling.md) when two connected tasks have different [calendars](guides/working-time.md)
- Fix the script error that occurs after creating a [circular link](api/method/iscircularlink.md)
- Fix the script error that occurs after [destroying](api/method/destructor.md) the Gantt which has an  editable [Resource Panel](guides/resource-management.md)
- Fix the issue that caused the [tooltip](guides/tooltips.md) to disappear in some browsers

## 8.0.7


<span class='release_date'>May 16, 2024. Bugfix release</span>

### Fixes

- Fix the script error occurring in the trial build on SalesForce
- The [onAfterTaskUpdate](api/event/onaftertaskupdate.md) event now fires before [Auto Scheduling](guides/auto-scheduling.md) events after dragging tasks in the timeline
- Fix the duplicate event firing while interacting with a selected task when the [Multiselect](guides/multiselection.md) extension is enabled
- Fix the script error that happened when the first task in the chart did not contain dates
- Add the [lightbox](guides/default-edit-form.md) section name as a class name to the section element for better identification
- Fix the inability to unschedule tasks from the [lightbox](guides/default-edit-form.md) when [Auto Scheduling](guides/auto-scheduling.md) is enabled
- Fix the [resize_rows](api/config/resize_rows.md) marker positioning when scrolling the Gantt chart
- Prevent [Auto Scheduling](guides/auto-scheduling.md) of linked [unscheduled tasks](guides/unscheduled-tasks.md)
- Fix Gantt crash while adding [Rollup](guides/milestones.md#rolluptasksandmilestones) tasks with disabled smart rendering
- Fix dragging of [split tasks](guides/split-tasks.md) on touch devices
- Fix errors that occurred with the [isCriticalTask](api/method/iscriticaltask.md), [getFreeSlack](api/method/getfreeslack.md), and [getTotalSlack](api/method/gettotalslack.md) methods for [unscheduled tasks](guides/unscheduled-tasks.md)
- Fix the error occurring when a linked project contains only [unscheduled](guides/unscheduled-tasks.md) child tasks

## 8.0.6


<span class='release_date'>September 25, 2023. Bugfix release</span>

### Fixes

- Enhancements and corrections in the usage of [WAI-ARIA attributes](guides/accessibility.md#wai-aria-attributes) for improved accessibility
- Fix the issue of decreasing grid's width after repainting when the [`grid_elastic_columns`](api/config/grid_elastic_columns.md) config is enabled
- The default number of [`undo_steps`](guides/undo-redo.md#configuring-the-undo-functionality) is increased from 10 to 100
- The [Export API client](guides/extensions-list.md#export-service) is now integrated into the GPL version of Gantt, previously it has been included only in PRO versions
- Add support for the https export [server endpoints](guides/export.md#parameters-of-the-export-methods) in the [Node.js version of Gantt](guides/using-gantt-on-server.md)

## 8.0.5


<span class='release_date'>September 1, 2023. Bugfix release</span>

### Fixes

- Fix incorrect warnings triggered by enabling extensions via the [gantt.getGanttInstance](guides/multiple-gantts.md) configuration
- Fix the incorrect work of [gantt.exportToExcel()](api/method/exporttoexcel.md) when the [skip_off_time](api/config/skip_off_time.md) config is enabled
- Improvements for the [Samples Viewer](https://docs.dhtmlx.com/gantt/samples/)

## 8.0.4


<span class='release_date'>July 31, 2023. Bugfix release</span>

### Fixes

- Fix issue with [DataProcessor](guides/server-side.md#resources_crud) not tracking changes of the [Resource Datastore](guides/resource-management.md#working-with-resource-view-panel)
- Resolve an error that occurred after dragging a task when the [process_resource_assignments](api/config/process_resource_assignments.md) config is disabled
- Fix the incorrect work of [gantt.calculateEndDate](api/method/calculateenddate.md) when subtracting dates in minute units
- Minor performance improvement for layouts with [visibility groups](guides/layout-config.md#visibility-groups)

## 8.0.3


<span class='release_date'>June 14, 2023. Bugfix release</span>

### Fixes

- Performance improvements for the [Resource Panel](guides/resource-management.md)
- Fix incorrect calculation of [Free Slack](guides/critical-path.md#gettingfreeandtotalslack) for tasks with a [negative Lag](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)
- Fix incorrect calculation of [Critical Path](guides/critical-path.md) for tasks with 100% progress

## 8.0.2


<span class='release_date'>May 31, 2023. Bugfix release</span>

### Fixes

- Fix [Export](guides/export-common.md) errors that happen when [LinkFormatters](guides/formatters-ext.md#linkformatter) are used.
- Fix the incorrect work of the [Undo extension](guides/undo-redo.md) with [Resources and Resource Assignments](guides/resource-management.md)
- Type definitions are updated
- Performance improvements for [Rollup](guides/milestones.md#rolluptasksandmilestones) tasks rendering
- Performance improvement for [Split Tasks](guides/split-tasks.md) rendering
- Other performance improvements

## 8.0.1


<span class='release_date'>March 30, 2023. Bugfix release</span>

### Fixes

- Fix an error thrown from [gantt.showCover()](api/method/showcover.md) called when the [lightbox](guides/default-edit-form.md) is not opened
- Fix regression in [split tasks](guides/split-tasks.md) which caused a script error for the split tasks displayed outside of the time scale
- Fix regression in the [gantt.addLinkLayer()](api/method/addlinklayer.md) method
- Fix the incorrect work of [auto scheduling](guides/auto-scheduling.md) with [MSO, FNET, and FNLT constraints](guides/auto-scheduling.md#timeconstraintsfortasks) when the [settings of work time](guides/working-time.md#global-settings) contain a minute part
- Fix work of the [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) event on scroll

## <b>8.0</b>


<span class='release_date'>March 20, 2023. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-8-0/)

### Breaking changes

Check the [Migration article](migration.md#71---80) to keep in step with the latest version.

### New functionality

- Updated Resource Management:
    - resources and resource assignments can now be [loaded together with the data](guides/supported-data-formats.md#json)
    - changes of resources and resource Assignments can be captured using the [DataProcessor](guides/server-side.md#resources_crud)
    - reduced amount of boilerplate code required to use the [Resource panel](guides/resource-management.md#working-with-resource-view-panel)
- Grouping tasks functionality now can preserve the original Gantt tree structure inside groups:
    - new **save_tree_structure** parameter of the [groupBy()](api/method/groupby.md) method
- [Empty state screen](guides/empty-state-screen.md):
    - new [show_empty_state](api/config/show_empty_state.md) property
    - new [emptyStateElement extension](guides/empty-state-element-ext.md)
- The ability to extend the background grid of the timeline to the whole container:
    - new [timeline_placeholder](api/config/timeline_placeholder.md) property
- Improvements for rollup items and split tasks:
    - the ability to style separate [rollup items](guides/milestones.md#stylingseparaterollupitems) and [split tasks](guides/split-tasks.md#styling)
    - the ability to [hide all rollup items from the project task](guides/milestones.md#hiding-tasks-and-milestones)
    - the ability to control where rollup items are displayed (new [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md) event)
    - the ability to [filter split tasks](guides/split-tasks.md#filtering-split-tasks) (new [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) event)
    - performance optimization for display of split tasks
- The ability to delete items only after receiving confirmation from the backend:
    - new **deleteAfterConfirmation** parameter of the [dataProcessor configuration object](api/method/createdataprocessor.md)
- Updated Auto Scheduling & Constraint calculation:
    - tasks now can inherit the constraint type from parent projects:
        - new [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md) property
- Improvements for Critical Path, Slack and Auto Scheduling:
    - Critical path, Slack and Auto scheduling algorithms can now use progress of a task:
        - new [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) property
     - [total slack](guides/critical-path.md#gettingfreeandtotalslack) can now be calculated for projects
     - major performance improvement of critical path calculation
- The [getTaskBy()](api/method/gettaskby.md) method now allows selecting 'project' tasks:
    - new **types** parameter of the [getTaskBy()](api/method/gettaskby.md) method
- The ability to put any HTML content into the cells of the Timeline:
    - new [timeline_cell_content](api/template/timeline_cell_content.md) template
- The export API is included into [gantt.plugins](guides/extensions-list.md#export-service) and no longer requires adding additional JS file. Check the [Migration](migration.md#71---80) article

### Updates

- Updated TypeScript type definitions

### Fixes

- Fix the [duration calculation](guides/working-time.md) issue with minute [duration_unit](api/config/duration_unit.md) and custom [working time](guides/working-time.md#global-settings) settings
- Fix various issues with slack calculation
- Fix the script error on data loading when [Slack calculations](guides/critical-path.md#gettingfreeandtotalslack) are enabled
- [setWorkTime](api/method/setworktime.md) method now supports setting rules for dates inside customWeeks
- Fix the issue with smart rendering that causes blank spaces instead of data in the Gantt
- Fix the issue with [vertical reordering](guides/reordering-tasks.md) of rows in the Grid when some rows have [custom heights](guides/resizing-rows.md#setting-the-row-height)
- Fix the incorrect work of [Inline editors](guides/inline-editing.md) when the [Multiselect](guides/multiselection.md) extension is enabled
- Fix the incorrect display of [Quick Info](guides/quick-info.md) popup when [gantt.config.quick_info_detached](api/config/quick_info_detached.md) config is set to `false`
- Correct arguments of `is_valid` function of [Inline Editor](guides/inline-editing.md#custominlineeditor) interface. The function now receives the column object
- Ensure the `parent` property of task is saved correctly when the task is created with [gantt.groupBy](guides/grouping.md) active
- Fix the issue with unexpected vertical scroll when [placeholder tasks](api/config/placeholder_task.md) and [Keyboard navigation](guides/keyboard-navigation.md) are enabled
- Fix the issue with [DataProcessor](guides/server-side.md) causing some changes not to be set to the backend after [Auto Scheduling](guides/auto-scheduling.md)
- Fix the incorrect work of [vertical reordering](guides/reordering-tasks.md), which allowed task rows to being dragged outside the Gantt
- Fix the incorrect order of `odd` CSS classes of rows in the [Resource panel](guides/resource-management.md#resourceviewpanel)

## 7.1.13


<span class='release_date'>November 4, 2022. Bugfix release</span>

### Fixes

- Fix the incorrect work of the [gantt.addLinkLayer()](api/method/addlinklayer.md) method with the [smart_rendering](api/config/smart_rendering.md) property
- Fix issues with display of [S-Curve Overlay](guides/baselines.md#extra-overlay-for-the-chart) together with different [time scales](guides/configuring-time-scale.md)
- Fix the issue with [resizing of grid columns](guides/specifying-columns.md#resizing) when the [grid_elastic_columns](api/config/grid_elastic_columns.md) property is enabled
- Fix the issue that caused Gantt to reset the position of the vertical scroll after deleting a task using [Keyboard Navigation](guides/keyboard-navigation.md)
- Fix the incorrect work of the [treeDatastore.move()](api/other/treedatastore.md) method
- Fix the issue with the [gantt.parse()](api/method/parse.md) method, [extra collections](guides/supported-data-formats.md#jsonwithcollections) from the dataset should be available via the [gantt.serverList()](api/method/serverlist.md) method
- Fix the issue with the [gantt.groupBy()](api/method/groupby.md) method, which caused the selection state to reset after grouping
- Fix compatibility issues with Vue.js v3.x
- Fix the script error thrown from the [gantt.getConstraintLimitations()](api/method/getconstraintlimitations.md) method when the specified task didn't have 'constraint_date'
- Fix compatibility issues with SalesForce Web Security
- Fix the issue which caused focus to be returned to the Gantt after clicking outside the Gantt container when [Keyboard Navigation](guides/keyboard-navigation.md#focus-behavior-during-keyboard-navigation) was enabled
- [German locale](guides/localization.md#activating-a-locale) is updated
- Now it is possible to open the inline editor after one click on a task in the multi-selection mode (the [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) property is added)

## 7.1.12


<span class='release_date'>June 16, 2022. Bugfix release</span>

### Fixes

- Fix the incorrect work of the [gantt.isWorkTime()](api/method/isworktime.md) method with the "week" time unit
- Fix the issue that prevented tasks and links from being rendered when they were added via the [gantt.silent()](api/method/silent.md) method
- Fix the issue that caused the "Task not found" error message to be shown after data loading in some cases
- Fix the incorrect work of the [gantt.changeLightboxType()](api/method/changelightboxtype.md) method that left old lightbox elements in DOM
- Fix the incorrect calculation of the end dates of tasks when the tasks overlap after the Summer/Winter clock change
- Fix the issue that caused the [Resource Grid](guides/resource-management.md#resourceviewpanel) to disappear when the user edited a resource value using the cell editor
- Fix the script error that happened when the [Gantt layout](guides/layout-config.md) contained the ["resourceGrid"/"resourceTimeline"](guides/resource-management.md#resourceviewpanel) views but not included the "grid"/"timeline" views
- Fix the incorrect work of the [autosize](api/config/autosize.md) config when the Gantt layout contained [Resource Panel](guides/resource-management.md#resourceviewpanel) 
- Fix the [lightbox](guides/default-edit-form.md) for [split tasks](guides/split-tasks.md), the lightbox now should be displayed when you double-click on a split task

## 7.1.11


<span class='release_date'>April 27, 2022. Bugfix release</span>

### Fixes

- Fix sourcemaps for compressed Gantt files
- Fix the incorrect position of [markers](guides/markers.md) when [autosize = 'y'](api/config/autosize.md) was applied
- Fix the incorrect position of the [tooltip](guides/tooltips.md) and some other elements of Gantt in cases when the Gantt container had extra margin or vertical offsets
- Fix the issue that caused rows of the [editable resource diagram](guides/resource-management.md) to change the order after the first cell of the resource assignment was edited
- Fix the issue that caused the incorrect work of the [smart rendering](api/config/smart_rendering.md) after expanding or collapsing of tasks in some cases
- Fix the issue with the [onBeforeDrag](guides/advanced-dnd.md) event which didn't block the default actions when the [click_drag](guides/extensions-list.md#advanced-drag-n-drop) and [drag_timeline](guides/extensions-list.md#drag-timeline) extensions were activated
- Fix the script error that fired when the [changeId()](api/other/datastore.md) method was called for the [resource assignments store](guides/resource-management.md#assigningresources)
- Scrollbars of the default [Gantt layout](guides/layout-config.md#default-layout) no longer require fixed **scrollVer**/**scrollHor** names to work correctly
- [Split tasks](guides/split-tasks.md) now receive the 'gantt_selected' class on [selection](api/config/select_task.md), in the same way as regular tasks do

## 7.1.10


<span class='release_date'>March 16, 2022. Bugfix release</span>

### Fixes

- Fix the issue which caused Gantt not to render a [project task](guides/task-types.md#project-tasks) if it didn't have children and the `start_date` parameter was specified for the task
- Fix the issue with [resizing a task row by drag and drop](guides/resizing-rows.md#resizing-rows-by-drag-and-drop) if the task ID was either a non-number value or a numeric string with more than 16 symbols
- Fix the incorrect work of [visibility groups](guides/layout-config.md#visibility-groups) which prevented the sizes of the grid and time scale from being synchronized in the [complex layout](guides/layout-config.md)
- Fix the issues with task dates after dragging several tasks horizontally at once
- Fix the issue which caused [dataProcessor](guides/server-side.md) not to send all updates from different datastores when the [auto-update mode](https://docs.dhtmlx.com/api__dataprocessor_setupdatemode.html) was disabled
- Fix the issue which caused the [milestone](guides/milestones.md) with the [FF link](api/config/links.md) to be moved to the next day
- Fix the incorrect calculation of the `end_date` of milestones when using [backward scheduling](guides/auto-scheduling.md#forwardbackwardplanning) and setting [project_end](api/config/project_end.md) to the non-working time
- Fix the incorrect work of task reordering if HTML elements were displayed above the gantt
- Fix the issue with the [unsetWorkTime()](api/method/unsetworktime.md) method when the date/day configuration was removed from the calendar but the changes were not applied immediately
- Fix the issue with the [clearAll()](api/method/clearall.md) method which didn't clear selected tasks if the [multiselect](guides/extensions-list.md#multitaskselection) extension was enabled
- Fix the error appeared when applying the [exportToExcel()](api/method/exporttoexcel.md) method with the
`visual: true` parameter and setting the [duration_unit](api/config/duration_unit.md) config to 'hour'


## 7.1.9


<span class='release_date'>January 10, 2022. Bugfix release</span>

### Fixes

- Fix the issue with alignment of subtasks after dragging a project in the "year" scale and [switching between scales dynamically](guides/dynamic-scale.md)
- Fix the issue which caused the duration of the project to change after [dragging the project with subtasks](api/config/drag_project.md) in the ["month"](api/config/scales.md) scale
- Fix the issue with [Auto Scheduling](guides/auto-scheduling.md) that caused the [constraint type](guides/auto-scheduling.md#timeconstraintsfortasks) to be changed from "ASAP" to "SNET" after changing the duration of the task
- Fix the incorrect work of [backward scheduling](guides/auto-scheduling.md#forwardbackwardplanning) after changing the start and end dates via inline editors when [schedule_from_end](api/config/schedule_from_end.md) is enabled
- Now it is possible to open the lightbox [for read-only tasks in the read-only mode ](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)
- Now it is impossible to edit read-only tasks via the lightbox
- Fix the issue with the lightbox which caused it not to open for [editable tasks in the read-only mode](guides/readonly-mode.md#readonlymodefortheentiregantt) (appeared in v6.3.1)
- Fix the issue with resizing columns in grid after hiding the timeline via [show_chart](api/config/show_chart.md)
- Fix the issue with [Auto Scheduling](guides/auto-scheduling.md) which couldn't be canceled after changing values of [project_start](api/config/project_start.md) and [project_end](api/config/project_end.md)
- Fix the issue which caused the gantt to assign constraints to the tasks with disabled auto-scheduling
- Fix the issue with defining a year range by the lightbox when the range of dates of tasks is more than 10 years and [a range for the year selector isn't specified](guides/duration.md)
- Fix the script error that was thrown after loading Gantt if a horizontal scrollbar was attached to 3 or more vertical views
- Fix the incorrect work of the [onBeforeTaskAutoSchedule](api/event/onbeforeautoschedule.md) event after setting [the ASAP constraint](guides/auto-scheduling.md#timeconstraintsfortasks) for the task without links when [the strict mode](api/config/auto_scheduling_strict.md) is enabled
- Fix the error occurred when running minified versions of Gantt in Next.js projects
- Fix the issue which caused the width of Gantt to be changed after initializing the [gantt instance](guides/multiple-gantts.md#gantt-instance-configuration) inside an empty container 


## 7.1.8


<span class='release_date'>November 30, 2021. Bugfix release</span>

### Fixes

- Fix the script error that was thrown from the [gantt.groupBy](guides/grouping.md) method when the [Resource Histogram](guides/resource-management.md#resourceviewpanel) and [fit_tasks](api/config/fit_tasks.md) config were enabled
- Fix the incorrect work of the [Undo extension](guides/undo-redo.md) that didn't send updates [to the server](guides/server-side.md) when [vertical reordering](guides/reordering-tasks.md) was reverted
- Fix the issue with the [Export to MS Project](guides/export-msproject.md) module which in some cases caused an `Unknown error` result when custom properties were sent to the export
- Fix the incorrect work of the [gantt.silent](api/method/silent.md) method, which did not prevent [gantt.changeTaskId](api/method/changetaskid.md) from triggering API events and repaints
- Fix the incorrect work of the [gantt.undo](api/config/undo.md) method that did not restore the original vertical position of the reverted item
- Fix the incorrect work of the [resource assignment form](guides/resources.md) which caused gantt to replace the user-provided id of the [resource assignment](guides/resource-management.md#assigningresources) with an auto-generated value
- Fix the incorrect work of [gantt.changeTaskId](api/method/changetaskid.md) in cases when the affected tasks had nested items, which caused the level of nested items to be calculated incorrectly

## 7.1.7


<span class='release_date'>October 5, 2021. Bugfix release</span>

### Fixes

- Fix issues with incorrect calculation of the [total slack](api/method/gettotalslack.md) values
- Performance improvement for [total slack](guides/critical-path.md#gettingfreeandtotalslack) calculation
- Style fixes for the [lightbox](guides/edit-form.md) in the [Material](guides/skins.md#materialskin) skin
- Fix the issue with the [Zoom plugin](guides/zooming.md#built-in-zooming-module) that prevented the [zoom.init](guides/zoom.md) method from working when calling the method after [gantt.init](api/method/init.md)
- Fix the script error that happened when using the [inherit_calendar](guides/working-time.md#assigning-calendar-to-project) config together with the [gantt.groupBy](guides/grouping.md) method
- Fix the script error thrown when adding tasks via [gantt.batchUpdate](api/method/batchupdate.md) if the [placeholder task](api/config/placeholder_task.md) is active
- Fix the issue that allowed the [placeholder task](api/config/placeholder_task.md) to be sorted, reordered, or accept subtasks
- Fix issues with incorrect size of [grid columns](guides/specifying-columns.md)
- Fix the incorrect work of the [column's resizers](guides/specifying-columns.md#resizing) which conflicted with [reordering of the columns](api/config/reorder_grid_columns.md)

## 7.1.6


<span class='release_date'>August 23, 2021. Bugfix release</span>

### Fixes

- Fix the incorrect work of the [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md) config when [schedule_from_end](api/config/schedule_from_end.md) is enabled
- Fix the incorrect work of the [onrender](api/config/columns.md) callback of the column which caused custom elements to disappear when the grid is scrolled quickly
- Fix the regression (appeared in v7.1.5) which caused rows of the grid to disappear after the grid cell is resized in complex layouts
- Fix the incorrect work of the [size/visibility groups](guides/layout-config.md#visibility-groups) which prevented the sizes of columns from being synchronized in the complex layout
- Improved the display of the grid when the gantt is rendered in a small container

## 7.1.5


<span class='release_date'>July 22, 2021. Bugfix release</span>

### Fixes

- Fix the incorrect work of vertical reordering of tasks in the ["marker" mode](guides/reordering-tasks.md#improving-performance-for-large-datasets) when gantt rows have different heights
- Fix the issue with the sizes of the timeline and the grid in some layouts when the [show_grid](api/config/show_grid.md) and [show_chart](api/config/show_chart.md) configs are disabled
- The `data-column-name` and `data-column-index` attributes are added for cells of the grid header
- Fix the incorrect display of the grid after [re-initialization](api/method/init.md) of the gantt after removing all columns [from the config](guides/specifying-columns.md#overview)
- Fix the issue that caused the resource panel configuration to overwrite [the main configuration](guides/common-configuration.md#ganttconfigobject) of the gantt in Vue.js applications
- Added the ability to modify the configuration of the [resource panel](guides/resource-management.md#resourceviewpanel) on the fly by modifying the configuration object provided to the [resource layout](guides/layout-config.md#configs-and-templates-of-views)

## 7.1.4


<span class='release_date'>June 30, 2021. Bugfix release</span>

### Fixes

- Fix the incorrect work of [unsetWorkTime](api/method/unsetworktime.md) that caused affected dates to have incorrect work hours
- Fix the script error thrown in the [Resource histogram](guides/resource-management.md#resourceviewpanel) after scrolling the histogram when [resource_render_empty_cells](api/config/resource_render_empty_cells.md) is set to false and [smart_rendering](api/config/smart_rendering.md) is enabled
- Fix the incorrect work of the `editNextRow` and `editPrevRow` methods of the [Inline Editors](guides/inline-editors-ext.md) module
- Fix the incorrect work of the [Quick Info](guides/extensions-list.md#quick-info) popup that caused the popup to be displayed after clicking on the "add" button in the grid
- Fix the incorrect work of the [ASAP constraints](guides/auto-scheduling.md#timeconstraintsfortasks) that caused tasks not to be moved to the earliest date of the project
- Fix the incorrect work of [Inline Editors](guides/inline-editors-ext.md) that prevented [constraints](guides/auto-scheduling.md#timeconstraintsfortasks) from being edited via the inline editor 
- Fix the incorrect behavior of the "scroll into view" logic of [Keyboard Navigation](guides/keyboard-navigation.md) which called an unnecessary scroll when selected task bars are visible
- Fix the script error thrown when the mouse is moved outside the container when the [click_drag](guides/extensions-list.md#advanced-drag-n-drop) extension is enabled
- Performance improvements for the [auto_types](api/config/auto_types.md) configuration option of Gantt

## 7.1.3


<span class='release_date'>May 25, 2021. Bugfix release</span>

### Fixes

- Fix the script error thrown on [gantt.moveTask](api/method/movetask.md) call when some tasks are hidden via the [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) event
- Fix the issue with the speed of the scroll in the latest Firefox browser
- Performance improvement for [calculations of working time](guides/working-time.md)

## 7.1.2


<span class='release_date'>April 26, 2021. Bugfix release</span>

### Fixes

- Major performance improvement of the [resource panel](guides/resource-management.md#resourceviewpanel)
- Fix the script error thrown when [gantt.destructor](api/method/destructor.md) is called while [gantt.load](api/method/load.md) is in progress
- Fix the incorrect behavior of [split tasks](guides/split-tasks.md) on change of the task id 
- Fix the incorrect work of scroll on mouse wheel in Angular

## 7.1.1


<span class='release_date'>April 19, 2021. Bugfix release</span>

### Fixes

- Fix the regression in the [click_drag](guides/extensions-list.md#advanced-drag-n-drop) plugin
- Fix the Security Violation error thrown from the gantt when setting the [gantt.config.csp](api/config/csp.md) config to the "auto" mode
- Fix code build settings that caused the package code v7.1.0 to contain ES6 syntax, the library is again ES5 compatible
- Fix the script error fired when trying to resize a grid column when [gantt.config.reorder_grid_columns](api/config/reorder_grid_columns.md) config is enabled
- Update TypeScript type definitions
- Add the [onDestroy](api/other/datastore.md#ondestroy) event to the [datastore](api/other/datastore.md)
- Performance improvement for gantts with a large number of [task calendars](guides/working-time.md#assigningcalendartotask)
- Performance improvement for [calculations of resource assignment](guides/resource-management.md#managingresourceassignments) during [batchUpdate](api/method/batchupdate.md) and [autoScheduling](guides/auto-scheduling.md)

## 7.1


<span class='release_date'>April 8, 2021. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-7-1-part-time-resource-assignment-rollup-tasks/)
### Breaking changes

The update brings changes to some parts of the component. While the update doesn't introduce any changes that would require modifying the existing code, be sure to check the [Migration](migration.md#70---71) article.

### New functionality

- [The ability to assign resources to the specific dates of the task](guides/resource-management.md#resourceassignmenttime)
- The new [gantt.getTaskAssignments()](api/method/gettaskassignments.md) method
- [The ability to manage the resource assignments](guides/resource-management.md#managingresourceassignments) via the new [gantt.config.process_resource_assignments](api/config/process_resource_assignments.md) and [gantt.updateTaskAssignments()](api/method/updatetaskassignments.md) Gantt API
- [Rollup tasks and milestones](guides/milestones.md#rolluptasksandmilestones)
- [The ability to hide task bars and milestones in the timeline area](guides/milestones.md#hiding-tasks-and-milestones)
- [The ability to set different working hours for different time spans](guides/working-time.md#rules_for_periods)
- [The ability to set the height for a separate row in the grid](guides/resizing-rows.md#setting-the-row-height)
- [The ability to resize a row in the grid by drag-and-drop](guides/resizing-rows.md#resizing-rows-by-drag-and-drop)
- The ability to get the height of the DOM element of the task via the [gantt.getTaskBarHeight()](api/method/gettaskbarheight.md) method
- New events: [onBeforeRowResize](api/event/onbeforerowresize.md), [onRowResize](api/event/onrowresize.md), [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md), [onAfterRowResize](api/event/onafterrowresize.md)
- The [onrender](guides/specifying-columns.md#modifyingcellsafterrendering) callback for rendering a grid cell into DOM is added
- The [onrender](api/method/addtasklayer.md) callback for rendering a custom element of the task layer into DOM is added

### Fixes

- Fix the issue with reordering tasks vertically in the resource view when resources have values assigned 
- Fix the issue that caused "resource_cell_value" not being called and the resource markers not being rendered if a task doesn't start at the beginning of the timeline cell 
- Fix the issue that caused Gantt to stop working when deleting the task with the id that already exists in the data store
- Fix the script error thrown when specifying the 0 number value as a task id even if the "root_id" parameter is set
- Fix the issue that caused the resizer listener not to work in Salesforce environment
- Fix the script error appeared when applying [Fullscreen Extension](guides/fullscreen-ext.md) several times together with its methods
- Fix the issue with [Keyboard Navigation Extension](guides/keynav-ext.md) that caused navigation in Grid to stop working when adding the plugin several times
- Fix the issue with [Inline Editors](guides/inline-editing.md) when the editor couldn't be opened in a cell located after a column hidden via the [hide:true](guides/specifying-columns.md#visibility) property


## 7.0.13


<span class='release_date'>February 15, 2021. Bugfix release</span>

### Fixes

- Fix the script error happened when the [layout configuration](guides/layout-config.md#layout-customization) is changed dynamically and [gantt.addTaskLayer](api/method/addtasklayer.md) is used
- Fix the issue with the initial inner height of the [resource histogram](guides/resource-management.md#resourceviewpanel) when the `fetchTasks` option is used
- Fix the incorrect work of the [predecessor editor](guides/inline-editing.md#types-of-editors) which caused it to delete existing links when the value is edited
- Fix the incorrect work of the gantt when a [task with a non-unique ID](guides/task-object-operations.md) is added to the gantt via the [gantt.addTask](api/method/addtask.md) and [gantt.parse](api/method/parse.md) methods
- Performance improvement for drag and drop when the [auto_types](api/config/auto_types.md) and [drag_project](api/config/drag_project.md) configuration options are enabled
- Performance improvement for [calculation of working time](guides/working-time.md) when [duration_unit](api/config/duration_unit.md) is set to "day"

## 7.0.12


<span class='release_date'>January 14, 2021. Bugfix release</span>

### Fixes

- Fix some minor issues with [vertical drag and drop](guides/reordering-tasks.md#drag-n-drop-within-the-whole-gantt-structure) in large projects
- Fix the issue with the incorrect size of the container when the [autosize](api/config/autosize.md) config is used
- [Keyboard navigation](guides/keyboard-navigation.md) should now work correctly with the horizontal scroll of the grid
- [HTML views](guides/layout-config.md#html-as-inner-view) of Layout now support external [scrollbars](guides/layout-config.md#scrollbar)
- Fix the issue that caused the incorrect state of the grid after [reordering tasks](guides/reordering-tasks.md#drag-n-drop-within-the-whole-gantt-structure), if the [additional grid](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html) was added to the layout
- Fix the script error that happened after clearing and reloading the [resource panel](guides/resource-management.md) if a resource was selected
- Add the ability to disable automatic correction of the end date in the [time](guides/time.md) section of the lightbox, which was applied when the selected start date was greater than the end date
- Fix a typo in the default config of [Duration Formatter](guides/formatters-ext.md)
- Fix the script error thrown when the gantt is [destroyed](api/method/destructor.md) while a [popup message](guides/message-boxes.md#basic-popup-message) is shown
- Fix the initial position of the horizontal scroll in Grid and Timeline in the [RTL](guides/rtl-mode.md) mode
- Fix the incorrect work of the lightbox which caused the selected type of a task not to be saved if the [typeselect](guides/typeselect.md) control was not added to the lightbox configuration
- Fix the issue that caused [markers](guides/markers.md) to disappear after calling the [gantt.resetLayout()](api/method/resetlayout.md) method
- Fix the performance issue with the [drag_project](api/config/drag_project.md) config used in large projects
- Fix the issue that prevented the [Quick-Info](api/method/showquickinfo.md) popup from being displayed in the [read-only](guides/readonly-mode.md) mode when custom buttons were added to the config

## 7.0.11


<span class='release_date'>November 11, 2020. Bugfix release</span>

### Updates

- Add the [container_resize_timeout](api/config/container_resize_timeout.md) config for changing the timeout before redrawing Gantt when resizing the container
- Add the [wheel_scroll_sensitivity](api/config/wheel_scroll_sensitivity.md) config for changing the speed of scrolling the gantt by the mouse wheel

### Fixes

- Fix the bug with [Auto Scheduling](guides/auto-scheduling.md) when using different working calendars
- Fix the conflict between [placeholder](api/config/placeholder_task.md) tasks and [Auto Scheduling](guides/auto-scheduling.md)
- Fix redundant repaints when [](api/config/sort.md) is enabled
- Fix the issue with [Inline Editors](guides/inline-editing.md) and a scrollable grid, when inline editors lose focus right after click
- Fix the issue that caused Gantt to close the [Quick Info](guides/extensions-list.md#quick-info) popup when the user clicks on it


## 7.0.10


<span class='release_date'>September 22, 2020. Bugfix release</span>

### Fixes

- Fix the incorrect work of [vertical resizers](guides/layout-config.md#default-layout) (the regression appeared in v7.0.9)
- Prevent unexpected page refresh which happened during vertical reordering of tasks on Android Chrome (pull-to-refresh)
- Fix the script error which fired during creating a link on mobile Firefox
- Fix the incorrect work of task selection when the [multiselect](api/config/multiselect.md) config is enabled but the [multiselect](guides/extensions-list.md#multitaskselection) plugin is not activated
- Improve the work of HTML select controls inside [Inline Editors](guides/inline-editing.md)
- Fix the incorrect work of [Auto Scheduling](guides/auto-scheduling.md) when linked tasks use different [work calendars](guides/working-time.md)
- The [gantt.plugins](api/method/plugins.md) method will not activate plugins which are specified with `false` value
- Fix the conflict between [Inline Editors](guides/inline-editing.md) and [Keyboard Navigation](guides/keyboard-navigation.md)
- Fix the issue that caused [Inline Editors](guides/inline-editing.md) to close on double click

## 7.0.9


<span class='release_date'>August 27, 2020. Bugfix release</span>

### Fixes

- Fix the script error on the second [initialization](api/method/init.md) of Gantt when [custom datastores](api/method/createdatastore.md) are added
- Fix the incorrect work of [auto-scheduling](guides/auto-scheduling.md) when using with [FF and SS links](api/config/links.md) and when the source and target tasks use [different working calendars](guides/working-time.md#multipleworktimecalendars)
- Fix the incorrect [calculation of working time](guides/working-time.md) when [duration_unit](api/config/duration_unit.md) is set to "minute" and the start time is set to the middle of a non-working day
- Fix touch support for Safari iPad on iPadOS v13.6
- Fix the sizes of the [Lightbox](guides/default-edit-form.md) modal overlay on mobile devices
- Fix the incorrect display of [lightbox buttons](guides/custom-button.md) in some browsers
- Fix support of Italian and Portuguese locales in the [gantt.i18n](api/other/i18n.md) module
- Fix the bug in the [Parent control](guides/parent.md) of the [Lightbox](guides/default-edit-form.md) which caused the incorrect work when tasks were assigned to the root level
- Fix the script error which happened when initializing a gantt inside an iframe
- Fix the incorrect work of the [redo](api/config/redo.md) config when the [undo](api/config/undo.md) config is disabled

## 7.0.8


<span class='release_date'>July 24, 2020. Bugfix release</span>

### Fixes

- Fix some issues with touch support on Android/iOS devices
- Fix regression (appeared in v7.0.6) with link creation and [gantt.isLinkAllowed](api/method/islinkallowed.md) method
- Fix the script error which was thrown when the 'locale' parameter was used in [gantt.getGanttInstance](guides/multiple-gantts.md)
- Fix the script error that was thrown from [gantt.destructor](api/method/destructor.md) when the [Keyboard Navigation](guides/extensions-list.md#keyboardnavigation) and the [Quick Info](guides/extensions-list.md#quick-info) extensions were used


## 7.0.7


<span class='release_date'>July 17, 2020. Bugfix release</span>

- Fix the syntax error in type definition of [gantt.Promise](api/method/promise.md)


## 7.0.6


<span class='release_date'>July 16, 2020. Bugfix release</span>

### Fixes

- Fix script errors that were fired on touch devices during [drag and drop](guides/dnd.md)
- Fix the incorrect work of the [Auto Scheduling](guides/auto-scheduling.md) extension when [types of links](api/config/links.md) were defined using numeric values
- Reduced the number of redundant repaints of the [resource histogram](guides/resource-management.md#resourceviewpanel)
- Performance improvements for the task [grouping](guides/grouping.md) extension
- Fix the ability to scroll a resource timeline on touch devices
- Fix the incorrect work of the [resource control](guides/resource-management.md) when the 'hide empty' button is used
- The return type of [gantt.Promise](api/method/promise.md) in type definitions is fixed

## 7.0.5


<span class='release_date'>June 19, 2020. Bugfix release</span>

### Updates

- Performance improvements for [work time calculation](guides/working-time.md) when the [duration_unit](api/config/duration_unit.md) config is set to "hour"
- Performance improvements for [work time calculation](guides/working-time.md) when the [duration_unit](api/config/duration_unit.md) config is set to "minute" 
- The ability to specify working calendars in the configuration object of [`Gantt.getGanttInstance`](guides/multiple-gantts.md#gantt-instance-configuration) is added


## 7.0.4


<span class='release_date'>June 4, 2020. Bugfix release</span>

### Fixes

- Removed the 10000px limit on the gantt size in the autosize mode, which should allow [printing](api/method/exporttopdf.md) larger charts
- [Drag and drop](guides/dnd.md) now finishes when the user releases the mouse button over any part of the document body rather than over the gantt container only
- [Portuguese locale](guides/localization.md) was updated
- The return type of [gantt.columnIndexByDate](api/method/columnindexbydate.md) in type definitions is fixed
- Fix script errors that were fired when the Gantt instance [was destroyed](api/method/destructor.md) during [drag and drop](guides/dnd.md)
- Fix the incorrect calculation of [end_date](api/method/calculateenddate.md)/[duration](api/method/calculateduration.md) when [duration_unit](api/config/duration_unit.md) is set to "minute" and [the last worktime interval](api/method/setworktime.md) finishes after 23:00
- Fix the issue which caused groups of the [grouping extension](guides/grouping.md) to expand whenever the user modified any task
- Fix the issue which caused the second parameter of [dataProcessor.setTransactionMode](guides/server-side.md#technique) to be ignored if an object was passed into the first parameter
- Fix the issue which caused the active [inline editor](guides/inline-editing.md) to disappear after [repaint of Gantt](api/method/render.md)
- Fix the issue with the [static_background](api/config/static_background.md) extension which caused mouse click on empty cells to be interpreted as a click on task elements
- Gantt now dynamically repaints links between [split tasks](guides/split-tasks.md) during drag and drop
- Fix the script error which was thrown from [gantt.addTask](api/method/addtask.md) in the [node.js package](guides/using-gantt-on-server.md)
- Fix the script error which was thrown from [gantt.destructor](api/method/destructor.md) in the [node.js package](guides/using-gantt-on-server.md)

## 7.0.3


<span class='release_date'>May 14, 2020. Bugfix release</span>

### Fixes

- Fix regression in the [setWorkTime method](api/method/setworktime.md) which caused a script error when the working time was set for a specific day
- Fix the incorrect work of the [Keyboard Navigation](guides/keyboard-navigation.md) extension when Gantt is used inside a [SalesForce Lightning Web Component](https://github.com/DHTMLX/salesforce-gantt-demo)

## 7.0.2


<span class='release_date'>April 30, 2020. Bugfix release</span>

### Fixes

- Fix the incorrect work of [date formatters](api/other/date.md) when [gantt.config.csp](api/config/csp.md) is set to true
- Fix regression in the [click_drag](guides/extensions-list.md#advanced-drag-n-drop) and [drag_timeline](guides/extensions-list.md#drag-timeline) extensions which caused the incorrect work when [multiple instances of Gantt](guides/multiple-gantts.md) were created
- Fix the incorrect css class of a task row element after returning the error status from the [dataProcessor router function](guides/server-side.md#customrouting)
- Fix the incorrect work of [inline editors](guides/inline-editing.md) inside Shadow DOM

## 7.0.1


<span class='release_date'>April 16, 2020. Bugfix release</span>


### Fixes

- Major performance improvement for [calculation of tasks' duration in the working minutes](guides/working-time.md)
- Fix regression in the [Tooltip](guides/tooltips.md) and [Undo](guides/undo-redo.md) extensions which caused the incorrect work when multiple instances of Gantt were created
- Fix the issue with the [reordering of grid columns](api/config/reorder_grid_columns.md) which caused the timeline to scroll when a mouse pointer moved to the edge of the grid during drag and drop
- Fix [the incorrect position of the column after its dragging and dropping to the right side of the grid border](api/config/reorder_grid_columns.md)
- [dataProcessor custom router](guides/server-side.md#customrouting) should now work correctly with rejected promises
- Fix the regression in [smart rendering](guides/performance.md#smart-rendering) which caused some links not to be visible
- [Split tasks](guides/split-tasks.md) now display not only the first level children but also all nested subtasks
- Fix the issue with [split tasks](guides/split-tasks.md) and smart rendering which happened when a split task had the 'task' type
- Fix the issue with [split tasks](guides/split-tasks.md) which caused the gantt not to calculate the duration of the 'project' tasks nested in a split task
- Fix the incorrect position of a placeholder after opening an [inline editor](guides/inline-editing.md) in the [RTL mode](guides/rtl-mode.md)


## <b>7.0</b>


<span class='release_date'>April 7, 2020. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-7-0-node-js-server-module-merging-multiple-calendars-reordering-grid-columns-drag-n-drop-new-customization-options/)
### Breaking changes

The update brings multiple changes in the API methods. Check the [Migration](migration.md#63---70) article to keep in step with the latest version.

### New functionality

- Ability to create [a Gantt instance in Node.js](guides/using-gantt-on-server.md)
- The [](api/config/grid_elastic_columns.md) config for adjusting the size of columns during resizing of the whole grid is added
- [Ability to reorder columns of the grid by drag and drop](api/config/reorder_grid_columns.md)
- The [Quick-Info](guides/quick-info.md) extension  now provides the ability to have control over the popup manually via the [methods of the gantt.ext.quick-Info object](guides/quickinfo-ext.md)
- Ability to [truncate long text with ellipsis in grid columns](guides/styling-guide.md#customizationgridcolumns)
- The [](api/config/dynamic_resource_calendars.md) config and [](api/method/mergecalendars.md) method are added [for merging multiple calendars automatically and manually](guides/working-time.md#mergingcalendars) respectively
- The [](api/method/getresourcecalendar.md) method is added
- Ability to specify [working time in minutes](guides/working-time.md#global-settings)


### Updates

- Locale files were removed from the package, [new API](api/other/i18n.md) for the Gantt chart localization is added
- All extensions must be activated now via the [](api/method/plugins.md) method
- `Gantt.getGanttInstance` now [can take a configuration object](guides/multiple-gantts.md#gantt-instance-configuration)  while creating a new Gantt instance
- The CSP extension was removed from the package, the [csp mode is enabled by default](api/config/csp.md)
- The settings object as the third parameter of the [](api/method/attachevent.md) method is added
- The format for setting working hours in the [setWorkTime](api/method/setworktime.md) method is simplified
- The default working hours are changed from 8:00-17:00 to 8:00-12:00, 13:00-17:00
- The format of the [gantt.config.resource_calendars](api/config/resource_calendars.md) config is simplified
- [](guides/video-guides.md) are added in the documentation

### Fixes

- Fix the bug which caused a column to change width after hiding and showing the column again
- Fix the bug which disabled the ability to select any task when the multiselect extension was disabled via the `multiselect` config
- Fix the incorrect work of `gantt.sort` for tasks with equal start dates
- Fix drag and drop of a link when Gantt is initialized inside a Web Component

## 6.3.7


<span class='release_date'>February 12, 2020. Bugfix release</span>

### Fixes

- Significant performance improvement for smart rendering of chart and resource panel

## 6.3.6


<span class='release_date'>February 10, 2020. Bugfix release</span>

### Fixes


- Fix the regression in [gantt.resetLayout](api/method/resetlayout.md) which caused the script error
- Fix the issue with the [Quick-Info popup](https://docs.dhtmlx.com/gantt/desktop__extensions_list.html#quick-info ) which caused it to be positioned behind the [resource panel](https://docs.dhtmlx.com/gantt/desktop__resource_management.html#resourceviewpanel) in some cases
- Fix the script error thrown from the [gantt.getShortcutHandler](api/method/getshortcuthandler.md) method
- Fix the script error thrown from the [tooltip.show(x, y)](https://docs.dhtmlx.com/gantt/desktop__tooltips_ext.html) method
- [gantt.getTaskNode](api/method/gettasknode.md) now returns the correct HTML element for [split tasks](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html
)
- Fix the issue with [horizontal scrollbars](https://docs.dhtmlx.com/gantt/desktop__specifying_columns.html#horizontal-scrollbar) not being displayed when [visibility groups](https://docs.dhtmlx.com/gantt/desktop__layout_config.html#visibility-groups) are specified in some layout configurations

## 6.3.5


<span class='release_date'>January 31, 2020. Bugfix release</span>

### Fixes

- Fix the issue with task [grouping](guides/grouping.md) which caused vertical scroll position to reset after moving any task with drag and drop
- Fix the script error which happened when [](api/config/drag_timeline.md) config was set to `null`
- Fix the incorrect position of highlighted cells when [](api/config/static_background.md) and [](api/config/static_background_cells.md) are enabled and [](api/config/smart_rendering.md) is disabled
- Fix the issue with the [](api/event/onafterbranchloading.md) event not being called
- Fix the incorrect work of the [smart rendering](guides/performance.md#smart-rendering) when the value of [](api/config/task_height.md) is less than the value of [](api/config/row_height.md)

### Updates

- [A public method for rebuilding the Gantt layout after changing its config](api/method/resetlayout.md) is added

## 6.3.4


<span class='release_date'>December 27, 2019. Bugfix release</span>

### Fixes

- Fix crashes of the [resource load diagram](guides/resource-management.md#resourceviewpanel) when [smart rendering](guides/performance.md#smart-rendering) is switched off
- Fix issue with the custom task property named "unit", as Gantt considered it as a duration unit value and multiplied the task duration after its dragging
- Fix the incorrect [Tooltip](guides/tooltips.md) position when the [autosize](api/config/autosize.md) config is enabled
- Fix the incorrect alignment behavior of grid cells when both the [scrollable](guides/specifying-columns.md#horizontal-scrollbar) property and [autofit](api/config/autofit.md) config are set to true
- Creating a link between a task in the timeline and [a placeholder](api/config/placeholder_task.md) in the grid is now blocked
- Fix the bug with the [auto scheduling extension](guides/auto-scheduling.md) that caused Gantt to freeze when a task has [the constraint type (SNET/FNET/SNLT/FNLT)](guides/auto-scheduling.md#timeconstraintsfortasks) with no date specified, or with an invalid date

## 6.3.3


<span class='release_date'>December 18, 2019. Bugfix release</span>

### Fixes

- Fix the incorrect [resizing behavior of grid](guides/specifying-columns.md#resizing) that disabled the Timeline in some cases
- [gantt.parse](api/method/parse.md) should now correctly update the project tree when a parent task is loaded after its children
- Fix compatibility with SalesForce Lightning Aura components framework (Evaluation build)
- Fix the incorrect position of the [Tooltip](guides/tooltips.md) in SalesForce environment
- Fix the incorrect [Tooltip](guides/tooltips.md) position when the gantt container has a vertical margin
- Add missing [WAI-ARIA](guides/accessibility.md#wai-aria-attributes) attributes to elements inside the gantt
- Fix the incorrect work of the [](api/config/min_duration.md) config
- Fix the incorrect work of [link formatters](guides/formatters-ext.md#linkformatter) with custom [instances of the gantt](guides/multiple-gantts.md)

## 6.3.2


<span class='release_date'>December 10, 2019. Bugfix release</span>

### Fixes

- Fix the script error which happened when [gantt.destructor](api/method/destructor.md) was called when the [click-drag feature](guides/advanced-dnd.md) was enabled
- [gantt.parse](api/method/parse.md) no longer modifies data objects passed into arguments, deep copies are made instead

### Updates

- TypeScript type definitions were updated
- [](api/event/onbeforebranchloading.md) and [](api/event/onafterbranchloading.md) public events were added so it would be possible to modify the url or dynamic parameters of [dynamic loading](guides/dynamic-loading.md) requests
- Added a public method for changing the url of the [dataProcessor](guides/server-side.md) after its initialization

## 6.3.1


<span class='release_date'>November 29, 2019. Bugfix release</span>

### Fixes

- Fix the regression in the [smart rendering](api/method/addtasklayer.md#smart-rendering-for-custom-layers) which caused links not to be rendered in some cases
- Fix the bug that allowed modifying and creating new tasks with [keyboard navigation](guides/keyboard-navigation.md) when the [read-only mode](guides/readonly-mode.md) is activated
- Fix the display issue with [Fullscreen extension](guides/fullscreen-mode.md) which allowed some page elements to be displayed over the gantt in the fullscreen mode
- Fix the bug that caused the [drag-timeline extension](guides/extensions-list.md#drag-timeline) to reset the value of the [readonly config](guides/readonly-mode.md)

## 6.3


<span class='release_date'>November 14, 2019. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-chart-6-3-decimal-durations-link-formatting-drag-n-drop-multiple-tasks-even-smarter-rendering/)
### Breaking changes

The update brings multiple changes in the API methods. Check the [Migration](migration.md#62---63) article to keep in step with the latest version.

### New functionality

- [Ability to specify decimal units for the duration of tasks](guides/working-time.md#taskdurationindecimalformat)
- [Ability to scroll the timeline via mouse click and drag](guides/extensions-list.md#drag-timeline)
- [Ability to drag and drop multiple tasks horizontally](guides/multiselection.md#multitaskselectionanddragndrop)


### Updates

- Ability to [display tasks](api/config/show_tasks_outside_timescale.md) outside the explicit [](api/config/start_date.md) and [](api/config/end_date.md) range of the [time scale](guides/configuring-time-scale.md#range)
- Add a new [](api/template/task_end_date.md) template for formatting end dates of tasks
- Ability to add custom actions to the [Undo](guides/undo-redo.md#undoingredoingchangesmadefromcode) stack
- Ability to connect custom layers to [smart rendering](api/method/addtasklayer.md#smart-rendering-for-custom-layers)
- [Inline editors](guides/inline-editing.md) for **predecessors** now support formatted values of links
- Remove default limits for input values in date [inline editors](migration.md#inline_editors)
- Ability to specify the root node for the [Fullscreen extension](guides/fullscreen-mode.md)
- Ability either to change or disable [horizontal scroll](api/config/horizontal_scroll_key.md) by `shiftKey`+`mousewheel`
- Roboto font was removed from [Material skin](guides/skins.md#materialskin) and has to be imported manually

### Fixes

- Fix crashes of the [resource histogram](guides/resource-management.md#resourceviewpanel) when [smart rendering](guides/performance.md#smart-rendering) is switched off
- Fix compatibility with r.js compressor
- Fix various conflicts between [keyboard navigation](guides/keyboard-navigation.md) and [inline editors](guides/inline-editing.md)
- Fix the incorrect state of the [DataProcessor](guides/server-side.md#customrouting) when tasks and links were modified sequentially from a [custom router](guides/server-side.md#customrouting)
- A correct data object of Task/Link is now also passed into **delete** call of a [custom router](guides/server-side.md#customrouting)

## 6.2.7


<span class='release_date'>October 11, 2019. Bugfix release</span>

### Fixes

- Fix the issue with vertical resizing of [grids with horizontal scroll](guides/specifying-columns.md#horizontal-scrollbar) in [complex layouts](guides/resource-management.md#resourceviewpanel)
- Fix the incorrect work of the [resource histogram](guides/resource-management.md#resourceviewpanel) when the [scale step](guides/configuring-time-scale.md#timestep) is greater than one
- Fix the reopened bug with collapsed branches after calling [gantt.parse](api/method/parse.md) from [v6.2.4](#624) bugfix


## 6.2.6


<span class='release_date'>September 19, 2019. Bugfix release</span>

### Fixes

- Fix the regression in [v6.2 Smart Rendering](#62) which in some cases caused incorrect vertical positions of tasks after [re-initialization](api/method/init.md) of the Gantt
- Fix the issue with [Quick-Info popup](guides/extensions-list.md#quick-info) not being displayed for [unscheduled tasks](guides/unscheduled-tasks.md)
- Fix incorrect work of extension files with the Ultimate build of Gantt

## 6.2.5


<span class='release_date'>September 12, 2019. Bugfix release</span>

### Fixes

- Fix incorrect initial values of subtasks in the [](api/event/onbeforetaskchanged.md)[]( event handler after [dragging a project with subtasks](api/config/drag_project.md)
- Fix incorrect work of the [grouping](guides/grouping.md) extension when [auto task types](api/config/auto_types.md) are enabled
- Fix the script error after returning the *false* value from the [](api/event/ontaskloading.md) event handler
- Add clearer error messages for the exceptions that can be thrown from [gantt.load](api/method/load.md) and [gantt.parse](api/method/parse.md)

## 6.2.4


<span class='release_date'>September 5, 2019. Bugfix release</span>

### Fixes

- Fix the issue with task branches being collapsed after updating data using the [](api/method/parse.md) method
- Fix the incorrect work of [smart rendering](guides/performance.md#smart-rendering) in the [resource view](guides/resource-management.md#resourceviewpanel)
- Fix the issue which caused the [Zoom module](guides/zooming.md) to attach redundant DOM event handlers on each [re-initialization](api/method/init.md) of the Gantt


## 6.2.3


<span class='release_date'>August 29, 2019. Bugfix release</span>

### Fixes

- Fix the incorrect work of the [Constraint control](guides/auto-scheduling.md#timeconstraintsfortasks) in IE11 and MS Edge browsers
- Fix the size of the Gantt element in [Fullscreen mode](guides/fullscreen-mode.md)
- Fix the issue with [](api/event/onexpand.md) and [](api/event/oncollapse.md) events not being called from [Fullscreen mode](guides/fullscreen-mode.md)
- Correct the [Tooltip](guides/tooltips.md) position when the mouse pointer is near the left/right edge of the screen
- The [Tooltip](guides/tooltips.md) should now be hidden when the [Lightbox](guides/default-edit-form.md) is opened
- The [Tooltip](guides/tooltips.md) should now be hidden when the chart is scrolled
- Fix the incorrect work of [Tooltip](guides/tooltips.md) which caused the tooltip not to be updated when mouse pointer moved between two elements matching the same selector
- Fix the incorrect work of [](api/method/gettaskby.md) when `null` or `0` is provided as a second argument
- Fix the issue with [WBS](api/method/getwbscode.md) column not being updated after [sorting](guides/sorting.md) the gantt
- Fix the incorrect display of [static_background](api/config/static_background.md) in [Material skin](guides/skins.md#materialskin)

## 6.2.2


<span class='release_date'>August 13, 2019. Bugfix release</span>

### Updates

- Add the [gantt.license](api/other/license.md) property
- Add the [](api/event/onlinkcreated.md) API event for new links, similarly to the [](api/event/ontaskcreated.md) functionality for new tasks
- [](api/method/movetask.md) returns `false` when the action is prevented using [](api/event/onbeforetaskmove.md)

### Fixes

- Fix the issue which caused a link line to disappear when the [](api/method/render.md) method is called while a user creates [a new link](guides/dependencies.md)
- Fix the issue when [markers](guides/markers.md) were not displayed when their start date was set earlier than the minimal date of [the time scale](guides/configuring-time-scale.md#range)
- Fix the issue when [markers](guides/markers.md) were not displayed when gantt was initialized with the [gantt.config.show_chart = false](api/config/show_chart.md) config
- Fix a disappearing modal overlay of the [lightbox](guides/default-edit-form.md) when a user changed the [type of a task](guides/typeselect.md)
- Fix the [issue in keyboard navigation presets](https://docs.dhtmlx.com/gantt/desktop__keyboard_navigation.html#comment-4488512513), when [](api/event/onaftertaskupdate.md) was fired after **Shift+left arrow** hotkey even if the action was canceled using [](api/event/onbeforetaskmove.md)

## 6.2.1


<span class='release_date'>August 7, 2019. Bugfix release</span>

### Fixes

- Fix IE11 compatibility of the [click-drag feature](guides/advanced-dnd.md)
- Fix the script error which happened when the user tried to add a new task into an empty chart with the resource view
- Fix the incorrect behavior of the [grouping](guides/grouping.md) extension which caused assigning an incorrect group value to new tasks
- Fix a script error in the [keyboard navigation](guides/keyboard-navigation.md) extension thrown from the Alt+Arrow key shortcut
- Filtering in the [resource control](guides/resource-management.md) is changed to ignore text case
- Task dragging and drag-and-drop may finish on mouseup on any gantt element
- Fix the script error which happened after saving an [unscheduled task](guides/unscheduled-tasks.md)

## 6.2


<span class='release_date'>July 16, 2019. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-6-2-minor-update-boosting-gantt-chart-performance-zooming-mouse-wheel-much/)

### Breaking changes

The update brings multiple changes in the API methods. Check the [Migration](migration.md#61---62) article to keep in step with the latest version.

### New functionality

- [Creating and selecting tasks by drag-n-drop](guides/advanced-dnd.md)
- Smooth [zooming](guides/zooming.md) by mouse wheel
- Ability to [expand/collapse split tasks](guides/split-tasks.md#expandingcollapsingsplittasks) (PRO)

### Updates

- Major performance improvement for chart and resource panel
- Changing the start/end date of a task via [inline editors](guides/inline-editing.md) modifies the duration of a task accordingly
- The process of [setting up the timeline scale](guides/configuring-time-scale.md) is simplified
- New [zooming](guides/zoom.md) and [scales](api/config/scales.md) API

### Fixes

- Multiple tasks highlighting resets after rendering
- Script error when destroying Gantt from data processor handler

## 6.1.7


<span class='release_date'>June 27, 2019. Bugfix release</span>

### Fixes

- Fix incorrect behavior of [](api/method/getclosestworktime.md)
- Fix issue with the [](api/config/autoscroll.md) which happened after [toggling visibility](api/config/show_chart.md) of the timeline
- Fix bug in the [Multiselect extension](guides/multiselection.md) which caused selected tasks to lose highlight after chart repaint
- Fix script error which happened after [vertical drag-and-drop](guides/reordering-tasks.md) if [smart rendering](guides/performance.md#smart-rendering) and [keyboard navigation](guides/keyboard-navigation.md) extensions were enabled
- Fix incorrect behavior which happened when users tried to switch between [inline editors](guides/inline-editing.md) using the `Tab` key if some columns of the grid were [hidden](guides/specifying-columns.md#visibility)
- Fix unexpected behavior which prevented the [lightbox](guides/edit-form.md) and [inline editors](guides/inline-editing.md) from overriding [constraint dates](guides/auto-scheduling.md#timeconstraintsfortasks)

## 6.1.6


<span class='release_date'>May 14, 2019. Bugfix release</span>

### Fixes

- Fix issue with not working [click handlers](api/config/quickinfo_buttons.md) of [Quick-Info popup](guides/extensions-list.md#quick-info) after a second [](api/method/init.md) call
- Fix issue with [Quick-Info popup](guides/extensions-list.md#quick-info) not showing up if [](api/config/show_chart.md) is set to false
- Fix incorrect `action` argument for [dataProcessor router](guides/server-side.md#customrouting) after [vertical drag-and-drop](guides/reordering-tasks.md)
- Fix issue when [](api/method/createtask.md) ignores the `index` parameter


## 6.1.5


<span class='release_date'>April 25, 2019. Bugfix release</span>

### Fixes

- Fix script error on a second [](api/method/init.md) call when [](api/config/show_chart.md) config is disabled
- Fix incorrect position of [vertical drag-and-drop](guides/reordering-tasks.md) placeholder in the [marker mode](guides/reordering-tasks.md#improving-performance-for-large-datasets)


## 6.1.4


<span class='release_date'>April 18, 2019. Bugfix release</span>

### Fixes

- Fix script error on [reinitialization](api/method/init.md) of gantt in the IE browser
- Fix incorrect behavior of the [Tooltip extension](guides/tooltips.md) when [gantt.destructor](api/method/destructor.md) is called
- Fix incorrect work of [inline editors](guides/inline-editing.md) in the [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md) mode when grid contains
[hidden columns](guides/specifying-columns.md#visibility)
- Fix bug in the [Undo](guides/undo-redo.md) extension when Redo action for recreation of new tasks did not restore all properties
- Fix regression in GPL build which caused a script error on a second [gantt.init](api/method/init.md) call


## 6.1.3


<span class='release_date'>April 15, 2019. Bugfix release</span>

### Fixes

- [gantt.createTask](api/method/createtask.md)/[gantt.addTask](api/method/addtask.md) should use [root_id](api/config/root_id.md) config value instead of hardcoded 0 id
- Performance increase for [worktime calculations](guides/working-time.md) for `minute` and `hour` [duration units](api/config/duration_unit.md)
- Minor performance increase for rendering large lists of tasks in the [smart rendering](guides/performance.md#smart-rendering) mode
- Ensure [vertical drag-and-drop](guides/reordering-tasks.md) doesn't start when the user selects text inside an [inline editor](guides/inline-editing.md)
- Fix script error on [reinitialization](api/method/init.md) of gantt in the IE browser
- Fix script error from [keyboard navigation](guides/keyboard-navigation.md) in the `cell` mode after deleting last tasks from the chart
- Ensure Gantt cleans up autogenerated [static background](api/config/static_background.md) style elements after destruction or reinitialization
- Ensure [inline editors](guides/inline-editing.md) are not active when [read-only mode](guides/readonly-mode.md) is enabled
- Fix incorrect selection of grid header cells in the `cell` mode of [keyboard navigation](guides/keyboard-navigation.md) when the `sort` config is enabled
- Fix regression in the [auto_types](api/config/auto_types.md) config which prevented auto type change when new tasks are added
- Fix bug when returning `false` from [onTaskDblClick](api/event/ontaskdblclick.md) blocked [onLinkDblClick](api/event/onlinkdblclick.md) as well
- Fix script error when parsing [constraint dates](guides/auto-scheduling.md#timeconstraintsfortasks) from JSON data
- Fix incorrect position of tasks and [markers](guides/markers.md) with the [skip_off_time](api/config/skip_off_time.md) config
- Fix incorrect height of [markers](guides/markers.md) after reordering tasks via [drag and drop](guides/reordering-tasks.md)
- New tasks receive the initial value of the `progress` property
- Fix incorrect task position after vertical drag and drop in the [marker](guides/reordering-tasks.md#improving-performance-for-large-datasets) mode
- Fix script error from [gantt.destructor](api/method/destructor.md) when the [resource panel](guides/resource-management.md#resourceviewpanel) is enabled
- Fix the bug which caused an empty line to be displayed in a [typeselect](guides/typeselect.md) block
- Fix the bug which caused a task not to be recognized as a part of [critical path](guides/critical-path.md) after [id change](api/method/changetaskid.md)


## 6.1.2


<span class='release_date'>March 26, 2019. Bugfix release</span>

### Updates

- [Keyboard navigation](guides/keyboard-navigation.md): add a method for getting the active cell

### Fixes

- Fix incorrect work of the [resource panel](guides/resource-management.md#resourceviewpanel) after creating a new datastore to overwrite the previous one
- Fix incorrect values of query parameters in the POST mode of [dataProcessor](guides/server-side.md)
- Fix incorrect result of [gantt.getClosestWorkTime](api/method/getclosestworktime.md) when called without specifying a direction
- Fix issue when the English locale couldn't override the previously added locale
- Fix script error with [gantt.undo](api/config/undo.md) and indent actions in the grid
- Fix SalesForce compatibility: new resize listener was broken in SF, fallback is added


## 6.1.1


<span class='release_date'>March 5, 2019. Bugfix release</span>

### Fixes

- Add missing locale options for the [resource lightbox control](guides/resources.md)
- Fix script error when using [gantt.destructor](api/method/destructor.md) together with the dataProcessor
- Fix script error when using [gantt.destructor](api/method/destructor.md) together with the [resource panel](guides/resource-management.md#resourceviewpanel)
- Fix the filesize of the [tooltip extension](guides/tooltips.md)
- Fix unexpected call of the [](api/event/ontaskdblclick.md) event while double clicking on a link element
- Fix stuck [lightbox](api/config/lightbox.md) cover if [gantt.init](api/method/init.md) is called while lightbox is opened
- Fix issues with [lightbox](api/config/lightbox.md) and the [tooltip extension](guides/tooltips.md) in the [full-screen mode](guides/fullscreen-mode.md)


## 6.1


<span class='release_date'>February 21, 2019. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-6-1-time-constraints-backward-scheduling-s-curve/)

### New functionality

- [Ability to add an overlay for the Gantt Chart](guides/baselines.md#extra-overlay-for-the-chart) (PRO)
- [Time constraints for tasks](guides/auto-scheduling.md#timeconstraintsfortasks) (PRO)
- [Backward scheduling](guides/auto-scheduling.md#backwardscheduling) (PRO)
- TypeScript type definitions are added into the package

### Updates

- Ability to [create tooltips for all the elements](guides/tooltips.md#tooltipsfordifferentelements) of dhtmlxGantt
- [Routing options for dataProcessor](guides/server-side.md#customrouting)
- [Project-level working calendars](guides/working-time.md#assigning-calendar-to-project) (PRO)
- Ability to [import dhtmlxGantt as an ES6 module](guides/initializing-gantt-chart.md#moduleimport)

## 6.0.7


<span class='release_date'>January 16, 2019. Bugfix release</span>

### Fixes

- Reduced the number of redundant repaints of the [resource diagram](guides/resource-management.md#resourceviewpanel)
- Fixed script error from the [resource diagram](guides/resource-management.md#resourceviewpanel) after deleting a task
- Fixed script error from the [fullscreen extension](guides/fullscreen-mode.md) after exiting fullscreen mode on the `Esc` key
- Fixed incorrect state of links drag and drop when dragging a link between multiple charts on the page. Creating links between gantts is not supported
- Fixed script error after deleting [multiple selected tasks](guides/multiselection.md) using [keyboard navigation](guides/keyboard-navigation.md)
- Fixed default mapping of [inline editors](guides/inline-editing.md). Inline editors shouldn't block keyboard shortcuts on task cells

## 6.0.4


<span class='release_date'>December 27, 2018. Bugfix release</span>

### Fixes

- Fixed incorrect task position after task vertical dnd in `order_branch='marker'` mode
- Fixed script error after deleting a sub-tree which contains selected task
- Fixed script error on Save/Cancel lightbox containing resource filters

## 6.0.2


<span class='release_date'>December 6, 2018. Bugfix release</span>

### Fixes

- Fixed `ReferenceError: getResourceAssignments is not defined` when importing Gantt into Vue.js project
- Fixed script error on deleting task after assigning resource to it via resource form
- Fixed script error in resource diagram after second `gantt.init` call
- Fixed script error on toggle timeline visibility when marker extension is used
- Fixed page freeze on `gantt.parse` if tasks tree contains cyclic references, script error is thrown instead


## <b>6.0</b>


<span class='release_date'>November 5, 2018. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-6-0-major-update-advanced-resource-management/)

### Functionality

- [Assignment of several resources to a task](guides/resource-management.md#assigningresources) (PRO version)
- [Grouping tasks by multiple resources](guides/resource-management.md#balancingresourceload) (PRO version)
- [Resource histogram](guides/resource-management.md#resourceviewpanel) in addition to the resource load diagram (PRO version)
- Ability to [get free/total slack of a task](guides/critical-path.md#gettingfreeandtotalslack) while [calculating the critical path](guides/critical-path.md) (PRO version)
- [Import of projects from Excel](guides/excel.md#importfromexcel)
- [The "REST-JSON" DataProcessor mode](guides/server-side.md#restjson) for processing complex records on any server-side platform
- Auto resize when container size changes


### Configuration

- The [Resources control](guides/resources.md) in the lightbox for assigning resources to a task (PRO version)
- [Improved performance of tasks reordering](guides/reordering-tasks.md#improving-performance-for-large-datasets) in the "branch" mode
- Performance update for the [](api/config/auto_types.md) configuration (PRO version)

### API

- The "marker" mode for the [](api/config/order_branch.md) config to speed up tasks reordering within branch
- The [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) event to work in tandem with the [](api/config/order_branch.md) config in the "marker" mode
- The [](api/method/gettotalslack.md) / [](api/method/getfreeslack.md) methods for work with slack instead of the getSlack() method (PRO)
- The [](api/method/importfromexcel.md) method
- The *delimiter* option in the [groupBy](api/method/groupby.md) method for grouping resources

## 5.2


<span class='release_date'>July 6, 2018. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-5-2/)

### Functionality

- [Inline editing in Grid](guides/inline-editing.md)
- [Splitting tasks](guides/split-tasks.md) (PRO version)
- Updated [keyboard navigation](guides/keyboard-navigation.md#existingshortcuts)
- [Auto Scheduling](guides/auto-scheduling.md) performance improvements

### Configuration

- Ability to [set task types automatically](api/config/auto_types.md) (PRO version)
- Ability to [use a placeholder row](api/config/placeholder_task.md) for creating new tasks
- [Checkbox](guides/checkbox.md) and [radio button](guides/radio.md) controls for lightbox
- Updated [Content Security Policy](guides/content-security-policy.md) extension

### API

- New methods and events for [undo](guides/undo-redo.md) and [autoscheduling](guides/auto-scheduling.md) extensions.

## 5.1


<span class='release_date'>February 27, 2018. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-5-1-resource-management-rtl-mode-and-more/)

### Functionality

- [Resource management](guides/resource-management.md) (PRO version)
- [RTL mode](guides/rtl-mode.md)
- [Horizontal scroll for Grid](guides/specifying-columns.md#horizontal-scrollbar) and [other layout improvements](guides/layout-config.md)
- [Destructors for Gantt and DataProcessor instances](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances)


### Configuration

- [Ability to set min/max widths for Grid columns](guides/specifying-columns.md#width)
- [Ability to drag and drop projects with their subtasks](guides/dnd.md#draggingprojectswithsubtasks) (PRO version)
- [Extended parameters for the export methods](guides/export-common.md)


### API

- [Updated API events](guides/multiselection.md#apievents) for the [Multi-Task Selection](guides/multiselection.md) extension


### Fixes

- Fixed issues with the keyboard navigation in the smart rendering mode


## <b>5.0</b>


<span class='release_date'>December 12, 2017. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/large-scale-update-dhtmlxgantt-version-5-0/)

### Functionality

- [Flexible Gantt layout](guides/layout-config.md)
- [Server-side integration with REST API](guides/server-side.md). Check also [tutorials for various server-side platforms](integrations/howtostart-guides.md)


### Styling

- New ["Material" skin](guides/skins.md#materialskin)


## 4.2


<span class='release_date'>August 17, 2017. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-4-2-manage-working-days-hours-individual-tasks/)

### Functionality

- [Work Time calendars at the task and resource levels](guides/working-time.md#multipleworktimecalendars)
- [WBS code (outline numbers) calculation](guides/specifying-columns.md#wbscode)
- [Autoscroll for drag and drop operations](guides/dnd.md#autoscrollduringtasksdragging)
- [Persian (Farsi) locale is added](guides/localization.md#predefinedlocales)

### Configuration

- [The getter function for key navigation shortcuts](api/method/getshortcuthandler.md) is added
- [The config for cascade deleting of nested tasks and links](api/config/cascade_delete.md) is added
- The ability to [scroll timeline horizontally on *Shift+a mouse wheel movement*](guides/keyboard-navigation.md#builtinshortcutforhorizontaltimelinescrolling) is added
- German and Italian locales are updated
- GIF images in the Gantt skins are replaced with PNG


## 4.1


<span class='release_date'>September 1, 2016. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-4-1-full-accessibility-support/)

### Functionality

- [Keyboard navigation](guides/keyboard-navigation.md)
- [WAI-ARIA support](guides/accessibility.md#wai-aria-attributes)
- [High-contrast themes](guides/accessibility.md#highcontrastthemes)
- Updated [Auto Scheduling](guides/auto-scheduling.md) and [Critical Path](guides/critical-path.md) calculations (PRO version)

### Configuration

- Performance improvements for [worktime calculation](guides/working-time.md) and [timescale rendering](guides/performance.md)
- [Public method for unsetting worktimes](api/method/unsetworktime.md) added
- [API events for Quick-Info popup](api/overview/events-overview.md) added
- [Croatian locale](guides/localization.md#predefinedlocales) added
- [Turkish locale](guides/localization.md#predefinedlocales) updated


## <b>4.0</b>


<span class='release_date'>December 1, 2015. Major update</span>

### Functionality

- [Smart rendering](guides/performance.md#smart-rendering) for big datasets
- [Undo/redo](guides/undo-redo.md) extensions

### Configuration

- [Critical path calculation](guides/critical-path.md) - support for [lag/lead of links](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks) added (PRO version)
- Spanish and Chinese [locales](guides/localization.md#predefinedlocales) updated

### API

- Public API improvements - public helpers for [ajax](https://docs.dhtmlx.com/api__refs__dhtmlxajax.html), [environment variables](api/other/env.md)
- [Public API cleanup](migration.md#3x---40) - redundant global objects removed, conflicts with dhtmlxSuite resolved
- Public helpers for [popup messages](guides/message-boxes.md) added


## 3.3


<span class='release_date'>July 21, 2015. Minor update</span>

### Functionality

- Dependency [Auto Scheduling](guides/auto-scheduling.md) feature (PRO version)
- [Fullscreen mode](guides/fullscreen-mode.md)
- Support for [unscheduled tasks](guides/unscheduled-tasks.md)
- [Backward planning](guides/loading.md#loadingtaskdates)

### Configuration

- Initial support for [Content Security Policy](guides/content-security-policy.md)
- A possibility of specifying [per column Grid sorting](guides/sorting.md#percolumngridsorting) settings
- Improved branch ordering feature - [drag-n-drop between levels](guides/reordering-tasks.md#drag-n-drop-within-the-whole-gantt-structure)

### API

- [REST mode for ajax loading/saving](guides/server-side.md)


## 3.2


<span class='release_date'>March 18, 2015. Minor update</span>

### Functionality

- [Grouping tasks](guides/grouping.md) (PRO version)
- [Multi-task selection](guides/multiselection.md)
- [Data export to iCal and Excel formats](guides/excel.md)
- [Major performance improvement of work time and critical path calculations](guides/performance.md)


### Configuration

- [A possibility to set the range for the year selector in the lightbox](guides/time.md#mapping)


### API

- [Events for managing available target places while re-ordering tasks](guides/reordering-tasks.md#denyingdroppingtospecificpositions)
- [Events for managing loading process](guides/loading.md#eventsflow)
- New samples, methods, events


## 3.1


<span class='release_date'>October 25, 2014. Minor update</span>

### Functionality

- Ability to drag tasks on touch devices

### Configuration

- [Changed the default offset between the first and the last tasks on a scale](api/config/scale_offset_minimal.md)

### Bug Fixes

- Incorrect behavior of the tooltip on expanding/collapsing of task tree
- Order of API events during Gantt initialization
- Incorrect behavior of vertical markers when Gantt is cleared or reinitialized


## <b>3.0</b>


<span class='release_date'>September 11, 2014. Major update</span>

### Configuration

- [Ability to map the 'Time' and 'Duration' controls to custom date properties](guides/time.md#mapping)

### Functionality

- [Dynamic loading](guides/dynamic-loading.md) (PRO version)
- [A possibility to resize columns and the whole grid by drag-&-dropping](guides/specifying-columns.md)
- [A possibility to hide/show columns dynamically](guides/specifying-columns.md#visibility) (PRO version)
- [A possibility to display additional elements in the timeline area](guides/baselines.md) (PRO version)
- [Support for the critical path](guides/critical-path.md) (PRO version)
- [New possibilities for the read-only mode](guides/readonly-mode.md)
- [Today's and other vertical markers](guides/markers.md)
- [A possibility to completely redefine rendering of different task types (projects, milestones, etc.)](guides/baselines.md)(PRO version)
- [Styling tasks through special data properties](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
- [Styling links through special data properties](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)


### API

- [New tree-related methods](guides/task-tree-operations.md)

## 2.1


<span class='release_date'>March 28, 2014. Minor update</span>

### Global

- Updated locales
- Many bugs have been fixed

### Configuration

- [Custom configuration of the lightbox for different task types](guides/task-types.md#specificlightboxpertasktype)
- [Non-linear scales, ability to skip time from the scale](guides/custom-scale.md) (PRO version)

### Functionality

- [Milestones](guides/milestones.md) and [Projects](guides/task-types.md#project-tasks) support  (PRO version)
- [A possibility  to calculate the tasks' duration in work days/hours instead of calendar time](guides/working-time.md)
- [Support for multiple Gantt charts on the page](guides/multiple-gantts.md) (PRO version)

### API

- Added more configurations, methods, events


## <b>2.0</b>


<span class='release_date'>October 18, 2013. Major update</span>

### Global

- [jQuery integration](guides/jquery-integration.md)
- Major performance improvements
- [Ready-to-use PHP integration](guides/server-side.md)

### Configuration

- [Configurable multi-line scales](guides/configuring-time-scale.md)
- [Configurable multi-column grid with optional sorting and Drag-n-Drop](guides/reordering-tasks.md)
- [Configurable popup form for editing tasks](guides/edit-form.md)
- [All text elements can be defined through templates](guides/common-configuration.md#gantttemplatesobject)
- [All date strings can be configured](guides/common-configuration.md#ganttconfigobject)
- [All text labels can be localized](guides/localization.md)

### Styling

- [Default skin changed to "terrace"](guides/skins.md#terraceskin)
- [3 new skins](guides/skins.md)
- [Bars can have an optional inner resizer](api/config/drag_resize.md)
- [Optional UI for task creation](guides/overview.md)
- [Vertical and horizontal lines can be colored based on custom rules](guides/highlighting-time-slots.md)

### Functionality

- [Loading and serialization from JSON](guides/supported-data-formats.md#json)
- [Loading and serialization with the simplified XML format](guides/supported-data-formats.md#xmldhtmlxgantt20)
- [3 types of task linking](api/config/links.md)
- Gantt charts work on touch devices


### API

- [A lot of events added](api/overview/events-overview.md)
- [Templates](api/overview/templates-overview.md) and [configuration options](api/overview/properties-overview.md) added
- [API simplified, it uses a single Gantt object instead of a bunch of different objects](migration.md)


