What's New
==========

<style>
.release_date{
	font-size: 13px;
	margin-left: 20px;
}
</style>

If your current version of dhtmlxGantt is older than 2.0, check migrating.md for details of updating.

9.0.11
---------------
<span class='release_date'>May 27, 2025. Bugfix release</span>

### Fixes

- Fix the issue where api/gantt_mergecalendars.md merged `customWeeks` values incorrectly
- Fix the error thrown in the `onrender` function when the [column](desktop/specifying_columns.md#wbscode) `name` includes spaces
- Fix the issue where Gantt stayed in read-only mode after [click_drag](desktop/extensions_list.md#advanceddragndrop) the Timeline when the [S-Curve Overlay](desktop/baselines.md#extraoverlayforthechart) was enabled
- Fix the issue where task duration was reset to `0` when using a [Resource calendar](desktop/resource_management.md) and the [Resources](desktop/resource_management.md#resourceviewpanel) section was placed below the duration section of the [Lightbox](desktop/default_edit_form.md)
- Fix the console error triggered by the "This is a Trial version" warning when Gantt is used in **React StrictMode**
- Fix the issue where the api/gantt_adjusttaskheightforbaselines function did not recalculate row height when [gantt.config.baselines.render_mode](api/gantt_baselines_config.md#rendermode) was disabled
- Fix the issue preventing tasks from being displayed when the Timeline is [hidden](api/gantt_show_chart_config.md) in the Salesforce environment
- Fix the issue where calendars are not inherited from parent tasks when [dynamic_resource_calendars](api/gantt_dynamic_resource_calendars_config.md) config is disabled
- Fix the issue where scroll position reset on re-render when [ReactGantt](web/react.md) was in groupBy mode

### Updates

- Add the `isSalesforce` flag to [gantt.env](api/gantt_env_other.md)
- Add the `groupTasks` prop to [React Gantt](web/react.md#groupingtasks)

9.0.10
---------------
<span class='release_date'>April 22, 2025. Bugfix release</span>

### Fixes

- Fix the issue preventing changes to the `parent` field value in the [Lightbox](desktop/default_edit_form.md)
- Fix excessive scroll speed when using a mouse wheel in Firefox 88 and newer
- Fix the inability to drag [project tasks](desktop/task_types.md#projecttasks) when a subtask is unscheduled and lacks date parameters
- Ensure [gantt.render()](api/gantt_render.md) is not called unexpectedly during the [gantt.silent](api/gantt_silent.md) operation when using the api/gantt_open.md or api/gantt_close.md methods
- Fix the issue where [project tasks](desktop/task_types.md#projecttasks) are not repainted if the api/gantt_onbeforetaskchanged_event.md event returns `false`
- Ensure that task progress bars span the full width of the task when expected
- Remove invalid WAI-ARIA attributes from read-only task links to improve [accessibility](desktop/accessibility.md#waiariaattributes)
- Fix the issue where task bar resizers do not adapt to changes in task bar height

9.0.9
---------------
<span class='release_date'>April 16, 2025. Bugfix release</span>

### Updates

- Samples for [React Gantt](web/react.md) were added to the Commercial, Enterprise, Ultimate, and Evaluation packages

### Fixes

- Fix the issue where mouse wheel zooming stopped working after calling the [resetLayout](api/gantt_resetlayout.md) method
- Fix the issue where the [Quick Info](desktop/quick_info.md) popup appeared after clicking the expand/collapse button in the [Timeline](desktop/configuring_time_scale.md) or [Grid](desktop/specifying_columns.md) views
- Fix the error that occurred when destroying Gantt without initializing the grid view
- Fix the error that occurred when when loading a task with a non-existent parent while the [Undo extension](desktop/undo_redo.md) is enabled
- Fix the issue where the [click_drag](desktop/extensions_list.md#advanceddragndrop) extension did not function on touch devices
- Improve grid scrolling responsiveness on touch devices

9.0.7
---------------
<span class='release_date'>March 27, 2025. Bugfix release</span>

### Fixes

- Fix the error that occurs when clicking on a task in the timeline without a grid if [keyboard_navigation](desktop/keyboard_navigation.md) is enabled
- Correct [WBS code](desktop/specifying_columns.md#wbscode) calculation for sorted tasks that include a [placeholder task](api/gantt_placeholder_task_config.md)
- Resolve the issue where scale cells in the resource timeline disappear upon collapsing tasks or [resizing the grid](desktop/layout_config.md#defaultlayout)
- Ensure that the correct task order is maintained when adding both child and parent tasks inside the [`gantt.silent`](api/gantt_silent.md) function
- Preserve focus in editable [resource cells](desktop/resource_management.md#resourcecellvalue) after the value has been edited
- Prevent Gantt from scrolling to the leftmost position of the grid when clicking on a task
- Retain the `group` property when adding new tasks while in the [group](api/gantt_groupby.md) mode
- Fix the issue where [markers](desktop/markers.md) are not displayed if the timeline has been initially disabled
- Prevent duplicate [markers](desktop/markers.md) when the chart is not initially displayed in the layout configuration
- Fix the disappearing of drag handles (link, progress, task resize) after [dragging the timeline](api/gantt_drag_timeline_config.md)
- Ensure the [predecessor inline editor](desktop/inline_editors_ext.md#predecessoreditor) functions correctly when the link id type is numeric
- Prevent duplication of the `gantt_marker_area` elements
- Fix the [undo](desktop/undo_redo.md) functionality with the `changeTaskId` action

9.0.6
---------------
<span class='release_date'>March 18, 2025. Bugfix release</span>

### Fixes

- Fix the issue with the [lightbox](desktop/default_edit_form.md) where buttons did not reflect the current locale until Gantt was reinitialized
- Resolve an error that occurred when deleting links with partially loaded tasks
- Prevent tasks from incorrectly moving to the bottom of their branches after changing the `parent` property type from numeric to string
- Improve scrollbar behavior by adjusting the resizers near scrollbars
- Ensure that [resource assignments](desktop/resource_management.md#assigningresources) remain when adding tasks within [gantt.batchUpdate](api/gantt_batchupdate.md)
- Fix an issue causing tasks to disappear during drag-and-drop actions in the [infinite scale](desktop/configuring_time_scale.md#infinitescroll)
- Ensure the correct display of resource names in the [lightbox](desktop/default_edit_form.md) after data is parsed multiple times
- Fix an incorrect date calculation in [`getClosestWorkTime`](api/gantt_getclosestworktime.md) when using the api/gantt_duration_step_config.md config
- Allow the [onColumnDragMove](api/gantt_reorder_grid_columns_config.md) event to be canceled
- Fix a compatibility issue preventing the trial build from running in Lightning Web Components (LWC)
- Resolve issues related to `fetchTasks` and api/gantt_deepcopy_on_parse_config.md configurations that affected the [resource panel](desktop/resource_management.md#resourceviewpanel)
- Correct the appearance of font icons during Gantt initialization

9.0.5
---------------
<span class='release_date'>February 28, 2025. Bugfix release</span>

- Fix the error that occurs while resizing rows in the [Resource Grid](desktop/resource_management.md#resourceviewpanel)
- Ensure the last year is specified in the range specified by the **year_range** property of the [Time control](desktop/time.md#properties)
- Correct the position of link arrows affected by the `line-height` CSS style
- Fix the error that occurs while loading [collections](desktop/supported_data_formats.md#jsonwithcollections) without the `links` array
- Resolve the issue with `gantt.config.baselines` when it is falsy but not explicitly set to `false`
- Fix the issue where [click_drag](desktop/extensions_list.md#advanceddragndrop) doesn't work after calling [resetLayout](api/gantt_resetlayout.md)
- Ensure selected child tasks are not displayed above their parent when [keyboard_navigation](desktop/keyboard_navigation.md) is enabled
- Fix keyboard navigation issues that occur when task IDs contain single quotes
- Correct [calculateEndDate](api/gantt_calculateenddate.md) behavior when the duration is negative
- Resolve the error that occurs while loading datasets with [baselines](desktop/inbuilt_baselines.md) without an active timeline
- Ensure grid cells are focused even when tasks fall outside the chart time range
- Fix the error that occurs while partially deleting a date value in the [inline editor](desktop/inline_editors_ext.md)
- Fix the issue where the [resource panel](desktop/resource_management.md#resourceviewpanel) is displayed incorrectly after filtering when `fetchTasks` is enabled

9.0.4
---------------
<span class='release_date'>December 3, 2024. Bugfix release</span>

- Fix the issue where the [SNET constraint](desktop/auto_scheduling.md#timeconstraintsfortasks) date cannot be changed via the [inline editor](desktop/inline_editors_ext.md)
- Fix the issue where Gantt returns the global [calendar](desktop/working_time.md) instead of the resource calendar for tasks that have a single [resource assignment](desktop/resource_management.md#assigningresources) when the api/gantt_dynamic_resource_calendars_config.md config is disabled
- Fix the [constraint](desktop/auto_scheduling.md#timeconstraintsfortasks) date issue when changing the start date via the inline editor after [reinitializing](api/gantt_init.md) Gantt or [resetting the layout](api/gantt_resetlayout.md)
- Fix the script error with some configurations of [gantt.plugins](api/gantt_plugins.md) when using the [gantt.getGanttInstance](desktop/multiple_gantts.md) method without specifying a container
- Fix the issue where Gantt stops working when the api/gantt_auto_scheduling_project_constraint_config.md configuration is enabled, and tasks are [grouped](api/gantt_groupby.md)
- Ensure Gantt retains the task [constraint](desktop/auto_scheduling.md#timeconstraintsfortasks) after dragging a task


9.0.3
---------------
<span class='release_date'>November 19, 2024. Bugfix release</span>

- Fix the regression in styles for the [Quick Info](desktop/quick_info.md) popup
- Resolve build warnings from PostCSS caused by the usage of 'start'/'end' instead of 'flex-start'/'flex-end'
- Prevent [resource assignment](desktop/resource_management.md#assigningresources) from being removed when updated via the lightbox
- Fix the issue with an empty task array in api/gantt_resource_cell_value_template.md on non-working days when api/gantt_resource_render_empty_cells_config.md is enabled
- Correct the error occurring when clicking on buttons embedded into sections of the [lightbox](desktop/default_edit_form.md)
- Ensure the [resource panel](desktop/resource_management.md#resourceviewpanel) and [zoom levels](desktop/zooming.md#builtinzoomingmodule) remain in sync
- Prevent [Inline Editors](desktop/inline_editors_ext.md) events from being removed after [reinitializing](api/gantt_init.md) Gantt or [resetting the layout](api/gantt_resetlayout.md)
- Fix the issue where the open state is not restored after [redoing](desktop/undo_redo.md) changes

9.0.2
---------------
<span class='release_date'>November 11, 2024. Bugfix release</span>

### Fixes

- Fix the regression causing incorrect styles for task borders and progress when the task color is specified via [properties of a task object](desktop/colouring_tasks.md#specifyingstyleinthepropertiesofataskobject)
- Restore the functionality of the api/gantt_marker_class_template.md template
- Restore missing classname of the [textarea](desktop/textarea.md) section of the lightbox
- Correct the issue where [deadlines](desktop/inbuilt_baselines.md#deadlinesandconstraints) are displayed outside the task row and are not fully centered
- Ensure that links are displayed above other links on mouse hover
- Fix the issue where [baseline](desktop/inbuilt_baselines.md) dates are not calculated when loading them using the api/gantt_parse.md method
- Correct positions of [constrains](desktop/inbuilt_baselines.md#deadlinesandconstraints) for both regular and [RTL](desktop/rtl_mode.md) views
- Prevent unnecessary link loops when linking parts of split tasks
- Fix the issue where [Quick Info](desktop/quick_info.md) in [detached mode](api/gantt_quick_info_detached_config.md) is not hidden due to increased width and hardcoded styles
- Update the [Export API](api/gantt_exporttoexcel.md) to support tree indentation for Excel export
- Resolve the issue preventing task selection when the api/gantt_multiselect_one_level_config.md is enabled and a task on another tree level is selected
- Restore functionality of the [export_api](api/gantt_exporttopdf.md) plugin in the TypeScript environment
- Update type definitions

9.0.1
---------------

<span class='release_date'>October 21, 2024. Bugfix release</span>

### Fixes

- Fix the regression with the incorrect link position while dragging with enabled [smart_rendering](api/gantt_smart_rendering_config.md)
- Fix the regression where the [Resource Control](desktop/resources.md) of the [lightbox](desktop/default_edit_form.md) expands beyond its container
- Correct the missing bottom border of [time scale](desktop/configuring_time_scale.md) cells in the last row when cells are highlighted with custom CSS
- Fix the incorrect behavior of [sticky labels](desktop/configuring_time_scale.md#stickylabels) when api/gantt_smart_scales_config.md is disabled
- Resolve the issue where Gantt continues [vertically dragging](api/gantt_order_branch_config.md) a task after a right click
- Fix the issue where calling api/gantt_resetlayout.md breaks the functionality of the [S-Curve Overlay](desktop/baselines.md#extraoverlayforthechart) plugin
- Prevent creation of duplicate links by the [predecessor editor](desktop/inline_editing.md#typesofeditors)

<b>9.0</b>
---------------

<span class='release_date'>October 17, 2024. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-9-0/)

### Breaking Changes

This update brings some changes in the structure of the Gantt package and behavior of the functionality. Make sure to check the 
[Migration notes](migrating.md#8090) to be on the safe side.

### New functionality

- [Skins customization](desktop/custom_skins.md) with CSS variables
- New [Dark skin](desktop/skins.md#darkskin) is introduced
- Built-in support for [baselines](desktop/inbuilt_baselines.md) is added
- [Manually scheduled summary tasks](desktop/custom_projects_dates.md) are now supported
- [Sticky labels for time scales](desktop/configuring_time_scale.md#stickylabels)

### Updates

- [Terrace skin](desktop/skins.md#terraceskin) is updated
- Default display of [deadlines](desktop/inbuilt_baselines.md#deadlinesandconstraints) is added
- Default display of [task constraints](desktop/inbuilt_baselines.md#taskconstraints) is added
- [Source files of skins](desktop/custom_skins.md) are now included in the package
- The `setUndoStack` and `setRedoStack` methods are added to the [Undo plugin](desktop/undo_redo.md) for managing the undo/redo stacks
- Ability to [install the professional versions of the Gantt via npm](desktop/install_with_bower.md)
- [Bluebird Promise](api/gantt_promise.md) library is **removed** from the core library
- Various improvements for scaling on high-definition screens and responsiveness on smaller screens
- Updated type definitions

### Fixes


- Fix the incorrect link positions for Milestones when the parent task has a larger height
- Resolve the error that occurs during [Auto Scheduling](desktop/auto_scheduling.md) if auto-scheduling is canceled for a task
- Ensure [split tasks](desktop/split_tasks.md) are properly displayed within the split parent row
- Correct the [Auto Scheduling](desktop/auto_scheduling.md#summaryscheduling) of projects when a subtask link has a lag of 0
- Fix incorrect link positions for [split tasks](desktop/split_tasks.md) that have different row heights
- Ensure Gantt properly auto-schedules projects with 2 levels of tasks
- Fix the issue where Gantt doesn't return the fixedDate "assignments" in the [resource_cell_value](desktop/resource_management.md#resourcecellvalue) when the task is outside the specified date range


8.0.11
----------

<span class='release_date'>October 8, 2024. Bugfix release</span>

### Fixes

- Fix the Grid scrolling with the Timeline when a [column resizer](desktop/specifying_columns.md#resizing) is present on the rightmost column
- Prevent the [lightbox](desktop/default_edit_form.md) from switching to the api/gantt_wide_form_config.md mode upon adding the [Time section](desktop/time.md)
- Ensure the [number editor](desktop/inline_editing.md) respects min and max properties, preventing entry of values outside the defined range
- Fix the error on deleting a task inside the [gantt.batchUpdate](api/gantt_batchupdate.md) method while tasks are displayed in the [Resource Panel](desktop/resource_management.md)
- Correct the [lightbox](desktop/default_edit_form.md) positioning to be properly centered in the Salesforce environment
- Fix [Keyboard navigation](desktop/keyboard_navigation.md) stopping due to the api/gantt_row_height_config.md setting
- Correct the dates for project [Auto Scheduling](desktop/auto_scheduling.md) in some scenarios, so only one auto-scheduling call is needed for accurate results
- Resolve the issue with [Keyboard navigation](desktop/keyboard_navigation.md) when the [Resource Histogram](desktop/resource_management.md#resourceviewpanel) is present on the page
- Fix the initialization error on touch-enabled devices when [gantt.getGanttInstance](desktop/multiple_gantts.md) is called with configuration parameters
- The [gantt.load](api/gantt_load.md) method is removed from the Node.js version
- Fix the error thrown by Gantt when defining a custom [getVisibleRange](api/gantt_addtasklayer.md) function
- Resolve the regression causing Gantt to scroll to a task after it is updated when [Keyboard navigation](desktop/keyboard_navigation.md) is enabled
- Ensure [grid sorting](api/gantt_sort_config.md) works properly when clicking the sort icon in the header
- Fix inconsistent task repainting when api/gantt_drag_timeline_config.md is enabled

8.0.10
----------

<span class='release_date'>August 23, 2024. Bugfix release</span>

### Fixes

- Fix the issue where Gantt didn't [merge](desktop/working_time.md#:~:text=Merging%20multiple%20calendars) date settings from the second [Calendar](desktop/working_time.md)
- Fix the issue where [Resources](desktop/resource_management.md) were not assigned when the ["hide empty"](desktop/resources.md) option was enabled
- Fix the api/gantt_getlightboxsection.md method returning a `null` for the [Resource Section](desktop/resources.md) until any value was modified
- Fix the issue where templates of the [Resource Histogram](desktop/resource_management.md#resourceviewpanel) were not called for tasks starting before the minimum date but ending within the displayed date range
- Fix the issue where [Resource Assignments](desktop/resource_management.md) were not saved after changing the task [type](desktop/typeselect.md)
- Fix the issue where the 'project' task [type](desktop/typeselect.md) was not set in the lightbox
- Fix the issue where [worktime settings](desktop/working_time.md) of the [merged](desktop/working_time.md#:~:text=Merging%20multiple%20calendars) calendar were treated as weekends
- Fix the issue that prevented [grouping](api/gantt_groupby.md) by resources when a task had [Resource Assignments](desktop/resource_management.md) on different dates
- Fix the error caused by attempting to [filter split tasks](desktop/split_tasks.md#filteringsplittasks) with no children using the api/gantt_onbeforesplittaskdisplay_event.md event
- Fix the issue where [Resource Assignments](desktop/resource_management.md) were not updated after [dragging the project with subtasks](api/gantt_drag_project_config.md)

8.0.9
----------

<span class='release_date'>June 18, 2024. Bugfix release</span>

### Fixes

- Resolve the issue where tasks disappear after using [keyboard shortcuts](desktop/keyboard_navigation.md) to indent or outdent multiple times
- Fix the issue that prevented reopening the [Inline editor](desktop/inline_editing.md) after vertically scrolling the Gantt
- Fix the issue with [DataProcessor](desktop/server_side.md#routingcrudactionsofresourcesandresourceassignments) ignoring custom headers specified in the [gantt.createDataProcessor](api/gantt_createdataprocessor.md) method
- Fix tasks display issue that occurs when [onBeforeLightbox](api/gantt_onbeforelightbox_event.md) handler returns `false` while creating a new task
- Fix the incorrect [markers](desktop/markers.md) height when [timeline_placeholder](api/gantt_timeline_placeholder_config.md) config is enabled
- Fix [Formatter](desktop/formatters_ext.md) working only with Latin symbols
- Fix the issue that causes tasks to disappear after [vertically dragging](api/gantt_order_branch_config.md) a parent task
- Fix the incorrect work of [keyboard shortcut](desktop/keyboard_navigation.md) for scrolling when [smart_rendering](api/gantt_smart_rendering_config.md) is enabled
- Fix the issue with custom properties of [Resource Assignments](desktop/resource_management.md) objects not being included after parsing
- Update TypeScript type definitions


8.0.8
----------

<span class='release_date'>May 31, 2024. Bugfix release</span>

### Fixes

- Fix the issue that caused the [Undo extension](desktop/undo_redo.md) to skip some actions in bulk operations
- Fix the script error that occurs when [gantt.deleteLink](api/gantt_deletelink.md) is called from the [gantt.silent](api/gantt_silent.md) function
- Fix the incorrect behavior of [Auto Scheduling](desktop/auto_scheduling.md) when two connected tasks have different [calendars](desktop/working_time.md)
- Fix the script error that occurs after creating a [circular link](api/gantt_iscircularlink.md)
- Fix the script error that occurs after [destroying](api/gantt_destructor.md) the Gantt which has an  editable [Resource Panel](desktop/resource_management.md)
- Fix the issue that caused the [tooltip](desktop/tooltips.md) to disappear in some browsers

8.0.7
----------

<span class='release_date'>May 16, 2024. Bugfix release</span>

### Fixes

- Fix the script error occurring in the trial build on SalesForce
- The api/gantt_onaftertaskupdate_event.md event now fires before [Auto Scheduling](desktop/auto_scheduling.md) events after dragging tasks in the timeline
- Fix the duplicate event firing while interacting with a selected task when the [Multiselect](desktop/multiselection.md) extension is enabled
- Fix the script error that happened when the first task in the chart did not contain dates
- Add the [lightbox](desktop/default_edit_form.md) section name as a class name to the section element for better identification
- Fix the inability to unschedule tasks from the [lightbox](desktop/default_edit_form.md) when [Auto Scheduling](desktop/auto_scheduling.md) is enabled
- Fix the api/gantt_resize_rows_config.md marker positioning when scrolling the Gantt chart
- Prevent [Auto Scheduling](desktop/auto_scheduling.md) of linked [unscheduled tasks](desktop/unscheduled_tasks.md)
- Fix Gantt crash while adding [Rollup](desktop/milestones.md#rolluptasksandmilestones) tasks with disabled smart rendering
- Fix dragging of [split tasks](desktop/split_tasks.md) on touch devices
- Fix errors that occurred with the api/gantt_iscriticaltask.md, api/gantt_getfreeslack.md, and api/gantt_gettotalslack.md methods for [unscheduled tasks](desktop/unscheduled_tasks.md)
- Fix the error occurring when a linked project contains only [unscheduled](desktop/unscheduled_tasks.md) child tasks

8.0.6
----------

<span class='release_date'>September 25, 2023. Bugfix release</span>

### Fixes

- Enhancements and corrections in the usage of [WAI-ARIA attributes](desktop/accessibility.md#waiariaattributes) for improved accessibility
- Fix the issue of decreasing grid's width after repainting when the [`grid_elastic_columns`](api/gantt_grid_elastic_columns_config.md) config is enabled
- The default number of [`undo_steps`](desktop/undo_redo.md#configuringtheundofunctionality) is increased from 10 to 100
- The [Export API client](desktop/extensions_list.md#exportservice) is now integrated into the GPL version of Gantt, previously it has been included only in PRO versions
- Add support for the https export [server endpoints](desktop/export.md#parametersoftheexportmethods) in the [Node.js version of Gantt](desktop/using_gantt_on_server.md)

8.0.5
----------

<span class='release_date'>September 1, 2023. Bugfix release</span>

### Fixes

- Fix incorrect warnings triggered by enabling extensions via the [gantt.getGanttInstance](desktop/multiple_gantts.md) configuration
- Fix the incorrect work of [gantt.exportToExcel()](api/gantt_exporttoexcel.md) when the [skip_off_time](api/gantt_skip_off_time_config.md) config is enabled
- Improvements for the [Samples Viewer](https://docs.dhtmlx.com/gantt/samples/)

8.0.4
----------

<span class='release_date'>July 31, 2023. Bugfix release</span>

### Fixes

- Fix issue with [DataProcessor](desktop/server_side.md#routingcrudactionsofresourcesandresourceassignments) not tracking changes of the [Resource Datastore](desktop/resource_management.md#workingwithresourceviewpanel)
- Resolve an error that occurred after dragging a task when the [process_resource_assignments](api/gantt_process_resource_assignments_config.md) config is disabled
- Fix the incorrect work of [gantt.calculateEndDate](api/gantt_calculateenddate.md) when subtracting dates in minute units
- Minor performance improvement for layouts with [visibility groups](desktop/layout_config.md#visibilitygroups)

8.0.3
----------

<span class='release_date'>June 14, 2023. Bugfix release</span>

### Fixes

- Performance improvements for the [Resource Panel](desktop/resource_management.md)
- Fix incorrect calculation of [Free Slack](desktop/critical_path.md#gettingfreeandtotalslack) for tasks with a [negative Lag](desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks)
- Fix incorrect calculation of [Critical Path](desktop/critical_path.md) for tasks with 100% progress

8.0.2
----------

<span class='release_date'>May 31, 2023. Bugfix release</span>

### Fixes

- Fix [Export](desktop/export_common.md) errors that happen when [LinkFormatters](desktop/formatters_ext.md#linkformatter) are used.
- Fix the incorrect work of the [Undo extension](desktop/undo_redo.md) with [Resources and Resource Assignments](desktop/resource_management.md)
- Type definitions are updated
- Performance improvements for [Rollup](desktop/milestones.md#rolluptasksandmilestones) tasks rendering
- Performance improvement for [Split Tasks](desktop/split_tasks.md) rendering
- Other performance improvements

8.0.1
----------

<span class='release_date'>March 30, 2023. Bugfix release</span>

### Fixes

- Fix an error thrown from [gantt.showCover()](api/gantt_showcover.md) called when the [lightbox](desktop/default_edit_form.md) is not opened
- Fix regression in [split tasks](desktop/split_tasks.md) which caused a script error for the split tasks displayed outside of the time scale
- Fix regression in the [gantt.addLinkLayer()](api/gantt_addlinklayer.md) method
- Fix the incorrect work of [auto scheduling](desktop/auto_scheduling.md) with [MSO, FNET, and FNLT constraints](desktop/auto_scheduling.md#timeconstraintsfortasks) when the [settings of work time](desktop/working_time.md#globalsettings) contain a minute part
- Fix work of the [onBeforeSplitTaskDisplay](api/gantt_onbeforesplittaskdisplay_event.md) event on scroll

<b>8.0</b>
--------------

<span class='release_date'>March 20, 2023. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-8-0/)

### Breaking changes

Check the [Migration article](migrating.md#7180) to keep in step with the latest version.

### New functionality

- Updated Resource Management:
	- resources and resource assignments can now be [loaded together with the data](desktop/supported_data_formats.md#json)
	- changes of resources and resource Assignments can be captured using the [DataProcessor](desktop/server_side.md#routingcrudactionsofresourcesandresourceassignments)
	- reduced amount of boilerplate code required to use the [Resource panel](desktop/resource_management.md#workingwithresourceviewpanel)
- Grouping tasks functionality now can preserve the original Gantt tree structure inside groups:
	- new **save_tree_structure** parameter of the [groupBy()](api/gantt_groupby.md) method
- [Empty state screen](desktop/empty_state_screen.md):
	- new api/gantt_show_empty_state_config.md property
	- new [emptyStateElement extension](desktop/empty_state_element_ext.md)
- The ability to extend the background grid of the timeline to the whole container:
	- new api/gantt_timeline_placeholder_config.md property
- Improvements for rollup items and split tasks:
	- the ability to style separate [rollup items](desktop/milestones.md#stylingseparaterollupitems) and [split tasks](desktop/split_tasks.md#styling)
	- the ability to [hide all rollup items from the project task](desktop/milestones.md#hidingtasksandmilestones)
	- the ability to control where rollup items are displayed (new api/gantt_onbeforerolluptaskdisplay_event.md event)
	- the ability to [filter split tasks](desktop/split_tasks.md#filteringsplittasks) (new api/gantt_onbeforesplittaskdisplay_event.md event)
	- performance optimization for display of split tasks
- The ability to delete items only after receiving confirmation from the backend:
	- new **deleteAfterConfirmation** parameter of the [dataProcessor configuration object](api/gantt_createdataprocessor.md)
- Updated Auto Scheduling & Constraint calculation:
	- tasks now can inherit the constraint type from parent projects:
		- new api/gantt_auto_scheduling_project_constraint_config.md property
- Improvements for Critical Path, Slack and Auto Scheduling:
	- Critical path, Slack and Auto scheduling algorithms can now use progress of a task:
		- new api/gantt_auto_scheduling_use_progress_config.md property
 	- [total slack](desktop/critical_path.md#gettingfreeandtotalslack) can now be calculated for projects
 	- major performance improvement of critical path calculation
- The [getTaskBy()](api/gantt_gettaskby.md) method now allows selecting 'project' tasks:
	- new **types** parameter of the [getTaskBy()](api/gantt_gettaskby.md) method
- The ability to put any HTML content into the cells of the Timeline:
	- new api/gantt_timeline_cell_content_template.md template
- The export API is included into [gantt.plugins](desktop/extensions_list.md#exportservice) and no longer requires adding additional JS file. Check the [Migration](migrating.md#7180) article

### Updates

- Updated TypeScript type definitions

### Fixes

- Fix the [duration calculation](desktop/working_time.md) issue with minute [duration_unit](api/gantt_duration_unit_config.md) and custom [working time](desktop/working_time.md#globalsettings) settings
- Fix various issues with slack calculation
- Fix the script error on data loading when [Slack calculations](desktop/critical_path.md#gettingfreeandtotalslack) are enabled
- [setWorkTime](api/gantt_setworktime.md) method now supports setting rules for dates inside customWeeks
- Fix the issue with smart rendering that causes blank spaces instead of data in the Gantt
- Fix the issue with [vertical reordering](desktop/reordering_tasks.md) of rows in the Grid when some rows have [custom heights](desktop/resizing_rows.md#settingtherowheight)
- Fix the incorrect work of [Inline editors](desktop/inline_editing.md) when the [Multiselect](desktop/multiselection.md) extension is enabled
- Fix the incorrect display of [Quick Info](desktop/quick_info.md) popup when [gantt.config.quick_info_detached](api/gantt_quick_info_detached_config.md) config is set to `false`
- Correct arguments of `is_valid` function of [Inline Editor](desktop/inline_editing.md#custominlineeditor) interface. The function now receives the column object
- Ensure the `parent` property of task is saved correctly when the task is created with [gantt.groupBy](desktop/grouping.md) active
- Fix the issue with unexpected vertical scroll when [placeholder tasks](api/gantt_placeholder_task_config.md) and [Keyboard navigation](desktop/keyboard_navigation.md) are enabled
- Fix the issue with [DataProcessor](desktop/server_side.md) causing some changes not to be set to the backend after [Auto Scheduling](desktop/auto_scheduling.md)
- Fix the incorrect work of [vertical reordering](desktop/reordering_tasks.md), which allowed task rows to being dragged outside the Gantt
- Fix the incorrect order of `odd` CSS classes of rows in the [Resource panel](desktop/resource_management.md#resourceviewpanel)

7.1.13
----------

<span class='release_date'>November 4, 2022. Bugfix release</span>

### Fixes

- Fix the incorrect work of the [gantt.addLinkLayer()](api/gantt_addlinklayer.md) method with the [smart_rendering](api/gantt_smart_rendering_config.md) property
- Fix issues with display of [S-Curve Overlay](desktop/baselines.md#extraoverlayforthechart) together with different [time scales](desktop/configuring_time_scale.md)
- Fix the issue with [resizing of grid columns](desktop/specifying_columns.md#resizing) when the [grid_elastic_columns](api/gantt_grid_elastic_columns_config.md) property is enabled
- Fix the issue that caused Gantt to reset the position of the vertical scroll after deleting a task using [Keyboard Navigation](desktop/keyboard_navigation.md)
- Fix the incorrect work of the [treeDatastore.move()](api/gantt_treedatastore_other.md) method
- Fix the issue with the [gantt.parse()](api/gantt_parse.md) method, [extra collections](desktop/supported_data_formats.md#jsonwithcollections) from the dataset should be available via the [gantt.serverList()](api/gantt_serverlist.md) method
- Fix the issue with the [gantt.groupBy()](api/gantt_groupby.md) method, which caused the selection state to reset after grouping
- Fix compatibility issues with Vue.js v3.x
- Fix the script error thrown from the [gantt.getConstraintLimitations()](api/gantt_getconstraintlimitations.md) method when the specified task didn't have 'constraint_date'
- Fix compatibility issues with SalesForce Web Security
- Fix the issue which caused focus to be returned to the Gantt after clicking outside the Gantt container when [Keyboard Navigation](desktop/keyboard_navigation.md#focusbehaviorduringkeyboardnavigation) was enabled
- [German locale](desktop/localization.md#activatingalocale) is updated
- Now it is possible to open the inline editor after one click on a task in the multi-selection mode (the [inline_editors_multiselect_open](api/gantt_inline_editors_multiselect_open_config.md) property is added)

7.1.12
-----------

<span class='release_date'>June 16, 2022. Bugfix release</span>

### Fixes

- Fix the incorrect work of the [gantt.isWorkTime()](api/gantt_isworktime.md) method with the "week" time unit
- Fix the issue that prevented tasks and links from being rendered when they were added via the [gantt.silent()](api/gantt_silent.md) method
- Fix the issue that caused the "Task not found" error message to be shown after data loading in some cases
- Fix the incorrect work of the [gantt.changeLightboxType()](api/gantt_changelightboxtype.md) method that left old lightbox elements in DOM
- Fix the incorrect calculation of the end dates of tasks when the tasks overlap after the Summer/Winter clock change
- Fix the issue that caused the [Resource Grid](desktop/resource_management.md#resourceviewpanel) to disappear when the user edited a resource value using the cell editor
- Fix the script error that happened when the [Gantt layout](desktop/layout_config.md) contained the ["resourceGrid"/"resourceTimeline"](desktop/resource_management.md#resourceviewpanel) views but not included the "grid"/"timeline" views
- Fix the incorrect work of the [autosize](api/gantt_autosize_config.md) config when the Gantt layout contained [Resource Panel](desktop/resource_management.md#resourceviewpanel) 
- Fix the [lightbox](desktop/default_edit_form.md) for [split tasks](desktop/split_tasks.md), the lightbox now should be displayed when you double-click on a split task

7.1.11
-----------

<span class='release_date'>April 27, 2022. Bugfix release</span>

### Fixes

- Fix sourcemaps for compressed Gantt files
- Fix the incorrect position of [markers](desktop/markers.md) when [autosize = 'y'](api/gantt_autosize_config.md) was applied
- Fix the incorrect position of the [tooltip](desktop/tooltips.md) and some other elements of Gantt in cases when the Gantt container had extra margin or vertical offsets
- Fix the issue that caused rows of the [editable resource diagram](desktop/resource_management.md) to change the order after the first cell of the resource assignment was edited
- Fix the issue that caused the incorrect work of the [smart rendering](api/gantt_smart_rendering_config.md) after expanding or collapsing of tasks in some cases
- Fix the issue with the [onBeforeDrag](desktop/advanced_dnd.md) event which didn't block the default actions when the [click_drag](desktop/extensions_list.md#advanceddragndrop) and [drag_timeline](desktop/extensions_list.md#dragtimeline) extensions were activated
- Fix the script error that fired when the [changeId()](api/gantt_datastore_other.md) method was called for the [resource assignments store](desktop/resource_management.md#assigningresources)
- Scrollbars of the default [Gantt layout](desktop/layout_config.md#defaultlayout) no longer require fixed **scrollVer**/**scrollHor** names to work correctly
- [Split tasks](desktop/split_tasks.md) now receive the 'gantt_selected' class on [selection](api/gantt_select_task_config.md), in the same way as regular tasks do

7.1.10
-----------

<span class='release_date'>March 16, 2022. Bugfix release</span>

### Fixes

- Fix the issue which caused Gantt not to render a [project task](desktop/task_types.md#projecttasks) if it didn't have children and the `start_date` parameter was specified for the task
- Fix the issue with [resizing a task row by drag and drop](desktop/resizing_rows.md#resizingrowsbydraganddrop) if the task ID was either a non-number value or a numeric string with more than 16 symbols
- Fix the incorrect work of [visibility groups](desktop/layout_config.md#visibilitygroups) which prevented the sizes of the grid and time scale from being synchronized in the [complex layout](desktop/layout_config.md)
- Fix the issues with task dates after dragging several tasks horizontally at once
- Fix the issue which caused [dataProcessor](desktop/server_side.md) not to send all updates from different datastores when the [auto-update mode](https://docs.dhtmlx.com/api__dataprocessor_setupdatemode.html) was disabled
- Fix the issue which caused the [milestone](desktop/milestones.md) with the [FF link](api/gantt_links_config.md) to be moved to the next day
- Fix the incorrect calculation of the `end_date` of milestones when using [backward scheduling](desktop/auto_scheduling.md#forwardbackwardplanning) and setting [project_end](api/gantt_project_end_config.md) to the non-working time
- Fix the incorrect work of task reordering if HTML elements were displayed above the gantt
- Fix the issue with the [unsetWorkTime()](api/gantt_unsetworktime.md) method when the date/day configuration was removed from the calendar but the changes were not applied immediately
- Fix the issue with the [clearAll()](api/gantt_clearall.md) method which didn't clear selected tasks if the [multiselect](desktop/extensions_list.md#multitaskselection) extension was enabled
- Fix the error appeared when applying the [exportToExcel()](api/gantt_exporttoexcel.md) method with the
`visual: true` parameter and setting the [duration_unit](api/gantt_duration_unit_config.md) config to 'hour'


7.1.9
-----------

<span class='release_date'>January 10, 2022. Bugfix release</span>

### Fixes

- Fix the issue with alignment of subtasks after dragging a project in the "year" scale and [switching between scales dynamically](desktop/dynamic_scale.md)
- Fix the issue which caused the duration of the project to change after [dragging the project with subtasks](api/gantt_drag_project_config.md) in the ["month"](api/gantt_scales_config.md) scale
- Fix the issue with [Auto Scheduling](desktop/auto_scheduling.md) that caused the [constraint type](desktop/auto_scheduling.md#timeconstraintsfortasks) to be changed from "ASAP" to "SNET" after changing the duration of the task
- Fix the incorrect work of [backward scheduling](desktop/auto_scheduling.md#forwardbackwardplanning) after changing the start and end dates via inline editors when [schedule_from_end](api/gantt_schedule_from_end_config.md) is enabled
- Now it is possible to open the lightbox [for read-only tasks in the read-only mode ](desktop/readonly_mode.md#readonlymodeforspecifictaskslinks)
- Now it is impossible to edit read-only tasks via the lightbox
- Fix the issue with the lightbox which caused it not to open for [editable tasks in the read-only mode](desktop/readonly_mode.md#readonlymodefortheentiregantt) (appeared in v6.3.1)
- Fix the issue with resizing columns in grid after hiding the timeline via [show_chart](api/gantt_show_chart_config.md)
- Fix the issue with [Auto Scheduling](desktop/auto_scheduling.md) which couldn't be canceled after changing values of [project_start](api/gantt_project_start_config.md) and [project_end](api/gantt_project_end_config.md)
- Fix the issue which caused the gantt to assign constraints to the tasks with disabled auto-scheduling
- Fix the issue with defining a year range by the lightbox when the range of dates of tasks is more than 10 years and [a range for the year selector isn't specified](desktop/duration.md)
- Fix the script error that was thrown after loading Gantt if a horizontal scrollbar was attached to 3 or more vertical views
- Fix the incorrect work of the [onBeforeTaskAutoSchedule](api/gantt_onbeforeautoschedule_event.md) event after setting [the ASAP constraint](desktop/auto_scheduling.md#timeconstraintsfortasks) for the task without links when [the strict mode](api/gantt_auto_scheduling_strict_config.md) is enabled
- Fix the error occurred when running minified versions of Gantt in Next.js projects
- Fix the issue which caused the width of Gantt to be changed after initializing the [gantt instance](desktop/multiple_gantts.md#ganttinstanceconfiguration) inside an empty container 


7.1.8
-----------

<span class='release_date'>November 30, 2021. Bugfix release</span>

### Fixes

- Fix the script error that was thrown from the [gantt.groupBy](desktop/grouping.md) method when the [Resource Histogram](desktop/resource_management.md#resourceviewpanel) and [fit_tasks](api/gantt_fit_tasks_config.md) config were enabled
- Fix the incorrect work of the [Undo extension](desktop/undo_redo.md) that didn't send updates [to the server](desktop/server_side.md) when [vertical reordering](desktop/reordering_tasks.md) was reverted
- Fix the issue with the [Export to MS Project](desktop/export_msproject.md) module which in some cases caused an `Unknown error` result when custom properties were sent to the export
- Fix the incorrect work of the [gantt.silent](api/gantt_silent.md) method, which did not prevent [gantt.changeTaskId](api/gantt_changetaskid.md) from triggering API events and repaints
- Fix the incorrect work of the [gantt.undo](api/gantt_undo_config.md) method that did not restore the original vertical position of the reverted item
- Fix the incorrect work of the [resource assignment form](desktop/resources.md) which caused gantt to replace the user-provided id of the [resource assignment](desktop/resource_management.md#assigningresources) with an auto-generated value
- Fix the incorrect work of [gantt.changeTaskId](api/gantt_changetaskid.md) in cases when the affected tasks had nested items, which caused the level of nested items to be calculated incorrectly

7.1.7
-----------

<span class='release_date'>October 5, 2021. Bugfix release</span>

### Fixes

- Fix issues with incorrect calculation of the [total slack](api/gantt_gettotalslack.md) values
- Performance improvement for [total slack](desktop/critical_path.md#gettingfreeandtotalslack) calculation
- Style fixes for the [lightbox](desktop/edit_form.md) in the [Material](desktop/skins.md#materialskin) skin
- Fix the issue with the [Zoom plugin](desktop/zooming.md#builtinzoomingmodule) that prevented the [zoom.init](desktop/zoom.md) method from working when calling the method after [gantt.init](api/gantt_init.md)
- Fix the script error that happened when using the [inherit_calendar](desktop/working_time.md#assigningcalendartoproject) config together with the [gantt.groupBy](desktop/grouping.md) method
- Fix the script error thrown when adding tasks via [gantt.batchUpdate](api/gantt_batchupdate.md) if the [placeholder task](api/gantt_placeholder_task_config.md) is active
- Fix the issue that allowed the [placeholder task](api/gantt_placeholder_task_config.md) to be sorted, reordered, or accept subtasks
- Fix issues with incorrect size of [grid columns](desktop/specifying_columns.md)
- Fix the incorrect work of the [column's resizers](desktop/specifying_columns.md#resizing) which conflicted with [reordering of the columns](api/gantt_reorder_grid_columns_config.md)

7.1.6
---------------

<span class='release_date'>August 23, 2021. Bugfix release</span>

### Fixes

- Fix the incorrect work of the [auto_scheduling_move_projects](api/gantt_auto_scheduling_move_projects_config.md) config when [schedule_from_end](api/gantt_schedule_from_end_config.md) is enabled
- Fix the incorrect work of the [onrender](api/gantt_columns_config.md) callback of the column which caused custom elements to disappear when the grid is scrolled quickly
- Fix the regression (appeared in v7.1.5) which caused rows of the grid to disappear after the grid cell is resized in complex layouts
- Fix the incorrect work of the [size/visibility groups](desktop/layout_config.md#visibilitygroups) which prevented the sizes of columns from being synchronized in the complex layout
- Improved the display of the grid when the gantt is rendered in a small container

7.1.5
---------------

<span class='release_date'>July 22, 2021. Bugfix release</span>

### Fixes

- Fix the incorrect work of vertical reordering of tasks in the ["marker" mode](desktop/reordering_tasks.md#improvingperformanceforlargedatasets) when gantt rows have different heights
- Fix the issue with the sizes of the timeline and the grid in some layouts when the [show_grid](api/gantt_show_grid_config.md) and [show_chart](api/gantt_show_chart_config.md) configs are disabled
- The `data-column-name` and `data-column-index` attributes are added for cells of the grid header
- Fix the incorrect display of the grid after [re-initialization](api/gantt_init.md) of the gantt after removing all columns [from the config](desktop/specifying_columns.md#overview)
- Fix the issue that caused the resource panel configuration to overwrite [the main configuration](desktop/common_configuration.md#ganttconfigobject) of the gantt in Vue.js applications
- Added the ability to modify the configuration of the [resource panel](desktop/resource_management.md#resourceviewpanel) on the fly by modifying the configuration object provided to the [resource layout](desktop/layout_config.md#configsandtemplatesofviews)

7.1.4
---------

<span class='release_date'>June 30, 2021. Bugfix release</span>

### Fixes

- Fix the incorrect work of [unsetWorkTime](api/gantt_unsetworktime.md) that caused affected dates to have incorrect work hours
- Fix the script error thrown in the [Resource histogram](desktop/resource_management.md#resourceviewpanel) after scrolling the histogram when [resource_render_empty_cells](api/gantt_resource_render_empty_cells_config.md) is set to false and [smart_rendering](api/gantt_smart_rendering_config.md) is enabled
- Fix the incorrect work of the `editNextRow` and `editPrevRow` methods of the [Inline Editors](desktop/inline_editors_ext.md) module
- Fix the incorrect work of the [Quick Info](desktop/extensions_list.md#quickinfo) popup that caused the popup to be displayed after clicking on the "add" button in the grid
- Fix the incorrect work of the [ASAP constraints](desktop/auto_scheduling.md#timeconstraintsfortasks) that caused tasks not to be moved to the earliest date of the project
- Fix the incorrect work of [Inline Editors](desktop/inline_editors_ext.md) that prevented [constraints](desktop/auto_scheduling.md#timeconstraintsfortasks) from being edited via the inline editor 
- Fix the incorrect behavior of the "scroll into view" logic of [Keyboard Navigation](desktop/keyboard_navigation.md) which called an unnecessary scroll when selected task bars are visible
- Fix the script error thrown when the mouse is moved outside the container when the [click_drag](desktop/extensions_list.md#advanceddragndrop) extension is enabled
- Performance improvements for the [auto_types](api/gantt_auto_types_config.md) configuration option of Gantt

7.1.3
------

<span class='release_date'>May 25, 2021. Bugfix release</span>

### Fixes

- Fix the script error thrown on [gantt.moveTask](api/gantt_movetask.md) call when some tasks are hidden via the [onBeforeTaskDisplay](api/gantt_onbeforetaskdisplay_event.md) event
- Fix the issue with the speed of the scroll in the latest Firefox browser
- Performance improvement for [calculations of working time](desktop/working_time.md)

7.1.2
------

<span class='release_date'>April 26, 2021. Bugfix release</span>

### Fixes

- Major performance improvement of the [resource panel](desktop/resource_management.md#resourceviewpanel)
- Fix the script error thrown when [gantt.destructor](api/gantt_destructor.md) is called while [gantt.load](api/gantt_load.md) is in progress
- Fix the incorrect behavior of [split tasks](desktop/split_tasks.md) on change of the task id 
- Fix the incorrect work of scroll on mouse wheel in Angular

7.1.1
------

<span class='release_date'>April 19, 2021. Bugfix release</span>

### Fixes

- Fix the regression in the [click_drag](desktop/extensions_list.md#advanceddragndrop) plugin
- Fix the Security Violation error thrown from the gantt when setting the [gantt.config.csp](api/gantt_csp_config.md) config to the "auto" mode
- Fix code build settings that caused the package code v7.1.0 to contain ES6 syntax, the library is again ES5 compatible
- Fix the script error fired when trying to resize a grid column when [gantt.config.reorder_grid_columns](api/gantt_reorder_grid_columns_config.md) config is enabled
- Update TypeScript type definitions
- Add the [onDestroy](api/gantt_datastore_other.md#ondestroy) event to the [datastore](api/gantt_datastore_other.md)
- Performance improvement for gantts with a large number of [task calendars](desktop/working_time.md#assigningcalendartotask)
- Performance improvement for [calculations of resource assignment](desktop/resource_management.md#managingresourceassignments) during [batchUpdate](api/gantt_batchupdate.md) and [autoScheduling](desktop/auto_scheduling.md)

7.1
----------

<span class='release_date'>April 8, 2021. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-7-1-part-time-resource-assignment-rollup-tasks/)
### Breaking changes

The update brings changes to some parts of the component. While the update doesn't introduce any changes that would require modifying the existing code, be sure to check the [Migration](migrating.md#7071) article.

### New functionality

- [The ability to assign resources to the specific dates of the task](desktop/resource_management.md#resourceassignmenttime)
- The new [gantt.getTaskAssignments()](api/gantt_gettaskassignments.md) method
- [The ability to manage the resource assignments](desktop/resource_management.md#managingresourceassignments) via the new [gantt.config.process_resource_assignments](api/gantt_process_resource_assignments_config.md) and [gantt.updateTaskAssignments()](api/gantt_updatetaskassignments.md) Gantt API
- [Rollup tasks and milestones](desktop/milestones.md#rolluptasksandmilestones)
- [The ability to hide task bars and milestones in the timeline area](desktop/milestones.md#hidingtasksandmilestones)
- [The ability to set different working hours for different time spans](desktop/working_time.md#rules_for_periods)
- [The ability to set the height for a separate row in the grid](desktop/resizing_rows.md#settingtherowheight)
- [The ability to resize a row in the grid by drag-and-drop](desktop/resizing_rows.md#resizingrowsbydraganddrop)
- The ability to get the height of the DOM element of the task via the [gantt.getTaskBarHeight()](api/gantt_gettaskbarheight.md) method
- New events: [onBeforeRowResize](api/gantt_onbeforerowresize_event.md), [onRowResize](api/gantt_onrowresize_event.md), [onBeforeRowResizeEnd](api/gantt_onbeforerowresizeend_event.md), [onAfterRowResize](api/gantt_onafterrowresize_event.md)
- The [onrender](desktop/specifying_columns.md#modifyingcellsafterrendering) callback for rendering a grid cell into DOM is added
- The [onrender](api/gantt_addtasklayer.md) callback for rendering a custom element of the task layer into DOM is added

### Fixes

- Fix the issue with reordering tasks vertically in the resource view when resources have values assigned 
- Fix the issue that caused "resource_cell_value" not being called and the resource markers not being rendered if a task doesn't start at the beginning of the timeline cell 
- Fix the issue that caused Gantt to stop working when deleting the task with the id that already exists in the data store
- Fix the script error thrown when specifying the 0 number value as a task id even if the "root_id" parameter is set
- Fix the issue that caused the resizer listener not to work in Salesforce environment
- Fix the script error appeared when applying [Fullscreen Extension](desktop/fullscreen_ext.md) several times together with its methods
- Fix the issue with [Keyboard Navigation Extension](desktop/keynav_ext.md) that caused navigation in Grid to stop working when adding the plugin several times
- Fix the issue with [Inline Editors](desktop/inline_editing.md) when the editor couldn't be opened in a cell located after a column hidden via the [hide:true](desktop/specifying_columns.md#visibility) property


7.0.13
------

<span class='release_date'>February 15, 2021. Bugfix release</span>

### Fixes

- Fix the script error happened when the [layout configuration](desktop/layout_config.md#layoutcustomization) is changed dynamically and [gantt.addTaskLayer](api/gantt_addtasklayer.md) is used
- Fix the issue with the initial inner height of the [resource histogram](desktop/resource_management.md#resourceviewpanel) when the `fetchTasks` option is used
- Fix the incorrect work of the [predecessor editor](desktop/inline_editing.md#typesofeditors) which caused it to delete existing links when the value is edited
- Fix the incorrect work of the gantt when a [task with a non-unique ID](desktop/task_object_operations.md) is added to the gantt via the [gantt.addTask](api/gantt_addtask.md) and [gantt.parse](api/gantt_parse.md) methods
- Performance improvement for drag and drop when the [auto_types](api/gantt_auto_types_config.md) and [drag_project](api/gantt_drag_project_config.md) configuration options are enabled
- Performance improvement for [calculation of working time](desktop/working_time.md) when [duration_unit](api/gantt_duration_unit_config.md) is set to "day"

7.0.12
------

<span class='release_date'>January 14, 2021. Bugfix release</span>

### Fixes

- Fix some minor issues with [vertical drag and drop](desktop/reordering_tasks.md#dragndropwithinthewholeganttstructure) in large projects
- Fix the issue with the incorrect size of the container when the [autosize](api/gantt_autosize_config.md) config is used
- [Keyboard navigation](desktop/keyboard_navigation.md) should now work correctly with the horizontal scroll of the grid
- [HTML views](desktop/layout_config.md#htmlasinnerview) of Layout now support external [scrollbars](desktop/layout_config.md#scrollbar)
- Fix the issue that caused the incorrect state of the grid after [reordering tasks](desktop/reordering_tasks.md#dragndropwithinthewholeganttstructure), if the [additional grid](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html) was added to the layout
- Fix the script error that happened after clearing and reloading the [resource panel](desktop/resource_management.md) if a resource was selected
- Add the ability to disable automatic correction of the end date in the [time](desktop/time.md) section of the lightbox, which was applied when the selected start date was greater than the end date
- Fix a typo in the default config of [Duration Formatter](desktop/formatters_ext.md)
- Fix the script error thrown when the gantt is [destroyed](api/gantt_destructor.md) while a [popup message](desktop/message_boxes.md#basicpopupmessage) is shown
- Fix the initial position of the horizontal scroll in Grid and Timeline in the [RTL](desktop/rtl_mode.md) mode
- Fix the incorrect work of the lightbox which caused the selected type of a task not to be saved if the [typeselect](desktop/typeselect.md) control was not added to the lightbox configuration
- Fix the issue that caused [markers](desktop/markers.md) to disappear after calling the [gantt.resetLayout()](api/gantt_resetlayout.md) method
- Fix the performance issue with the [drag_project](api/gantt_drag_project_config.md) config used in large projects
- Fix the issue that prevented the [QuickInfo](api/gantt_showquickinfo.md) popup from being displayed in the [read-only](desktop/readonly_mode.md) mode when custom buttons were added to the config

7.0.11
------

<span class='release_date'>November 11, 2020. Bugfix release</span>

### Updates

- Add the [container_resize_timeout](api/gantt_container_resize_timeout_config.md) config for changing the timeout before redrawing Gantt when resizing the container
- Add the [wheel_scroll_sensitivity](api/gantt_wheel_scroll_sensitivity_config.md) config for changing the speed of scrolling the gantt by the mouse wheel

### Fixes

- Fix the bug with [Auto Scheduling](desktop/auto_scheduling.md) when using different working calendars
- Fix the conflict between [placeholder](api/gantt_placeholder_task_config.md) tasks and [Auto Scheduling](desktop/auto_scheduling.md)
- Fix redundant repaints when api/gantt_sort_config.md is enabled
- Fix the issue with [Inline Editors](desktop/inline_editing.md) and a scrollable grid, when inline editors lose focus right after click
- Fix the issue that caused Gantt to close the [Quick Info](desktop/extensions_list.md#quickinfo) popup when the user clicks on it



7.0.10
------

<span class='release_date'>September 22, 2020. Bugfix release</span>

### Fixes

- Fix the incorrect work of [vertical resizers](desktop/layout_config.md#defaultlayout) (the regression appeared in v7.0.9)
- Prevent unexpected page refresh which happened during vertical reordering of tasks on Android Chrome (pull-to-refresh)
- Fix the script error which fired during creating a link on mobile Firefox
- Fix the incorrect work of task selection when the [multiselect](api/gantt_multiselect_config.md) config is enabled but the [multiselect](desktop/extensions_list.md#multitaskselection) plugin is not activated
- Improve the work of HTML select controls inside [Inline Editors](desktop/inline_editing.md)
- Fix the incorrect work of [Auto Scheduling](desktop/auto_scheduling.md) when linked tasks use different [work calendars](desktop/working_time.md)
- The [gantt.plugins](api/gantt_plugins.md) method will not activate plugins which are specified with `false` value
- Fix the conflict between [Inline Editors](desktop/inline_editing.md) and [Keyboard Navigation](desktop/keyboard_navigation.md)
- Fix the issue that caused [Inline Editors](desktop/inline_editing.md) to close on double click

7.0.9
-------

<span class='release_date'>August 27, 2020. Bugfix release</span>

### Fixes

- Fix the script error on the second [initialization](api/gantt_init.md) of Gantt when [custom datastores](api/gantt_createdatastore.md) are added
- Fix the incorrect work of [auto-scheduling](desktop/auto_scheduling.md) when using with [FF and SS links](api/gantt_links_config.md) and when the source and target tasks use [different working calendars](desktop/working_time.md#multipleworktimecalendars)
- Fix the incorrect [calculation of working time](desktop/working_time.md) when [duration_unit](api/gantt_duration_unit_config.md) is set to "minute" and the start time is set to the middle of a non-working day
- Fix touch support for Safari iPad on iPadOS v13.6
- Fix the sizes of the [Lightbox](desktop/default_edit_form.md) modal overlay on mobile devices
- Fix the incorrect display of [lightbox buttons](desktop/custom_button.md) in some browsers
- Fix support of Italian and Portuguese locales in the [gantt.i18n](api/gantt_i18n_other.md) module
- Fix the bug in the [Parent control](desktop/parent.md) of the [Lightbox](desktop/default_edit_form.md) which caused the incorrect work when tasks were assigned to the root level
- Fix the script error which happened when initializing a gantt inside an iframe
- Fix the incorrect work of the [redo](api/gantt_redo_config.md) config when the [undo](api/gantt_undo_config.md) config is disabled

7.0.8
-------

<span class='release_date'>July 24, 2020. Bugfix release</span>

### Fixes

- Fix some issues with touch support on Android/iOS devices
- Fix regression (appeared in v7.0.6) with link creation and [gantt.isLinkAllowed](api/gantt_islinkallowed.md) method
- Fix the script error which was thrown when the 'locale' parameter was used in [gantt.getGanttInstance](desktop/multiple_gantts.md)
- Fix the script error that was thrown from [gantt.destructor](api/gantt_destructor.md) when the [Keyboard Navigation](desktop/extensions_list.md#keyboardnavigation) and the [Quick Info](desktop/extensions_list.md#quickinfo) extensions were used




7.0.7
--------

<span class='release_date'>July 17, 2020. Bugfix release</span>

- Fix the syntax error in type definition of [gantt.Promise](api/gantt_promise.md)


7.0.6
--------

<span class='release_date'>July 16, 2020. Bugfix release</span>

### Fixes

- Fix script errors that were fired on touch devices during [drag and drop](desktop/dnd.md)
- Fix the incorrect work of the [Auto Scheduling](desktop/auto_scheduling.md) extension when [types of links](api/gantt_links_config.md) were defined using numeric values
- Reduced the number of redundant repaints of the [resource histogram](desktop/resource_management.md#resourceviewpanel)
- Performance improvements for the task [grouping](desktop/grouping.md) extension
- Fix the ability to scroll a resource timeline on touch devices
- Fix the incorrect work of the [resource control](desktop/resource_management.md) when the 'hide empty' button is used
- The return type of [gantt.Promise](api/gantt_promise.md) in type definitions is fixed

7.0.5
--------

<span class='release_date'>June 19, 2020. Bugfix release</span>

### Updates

- Performance improvements for [work time calculation](desktop/working_time.md) when the [duration_unit](api/gantt_duration_unit_config.md) config is set to "hour"
- Performance improvements for [work time calculation](desktop/working_time.md) when the [duration_unit](api/gantt_duration_unit_config.md) config is set to "minute" 
- The ability to specify working calendars in the configuration object of [`Gantt.getGanttInstance`](desktop/multiple_gantts.md#ganttinstanceconfiguration) is added


7.0.4
------

<span class='release_date'>June 4, 2020. Bugfix release</span>

### Fixes

- Removed the 10000px limit on the gantt size in the autosize mode, which should allow [printing](api/gantt_exporttopdf.md) larger charts
- [Drag and drop](desktop/dnd.md) now finishes when the user releases the mouse button over any part of the document body rather than over the gantt container only
- [Portuguese locale](desktop/localization.md) was updated
- The return type of [gantt.columnIndexByDate](api/gantt_columnindexbydate.md) in type definitions is fixed
- Fix script errors that were fired when the Gantt instance [was destroyed](api/gantt_destructor.md) during [drag and drop](desktop/dnd.md)
- Fix the incorrect calculation of [end_date](api/gantt_calculateenddate.md)/[duration](api/gantt_calculateduration.md) when [duration_unit](api/gantt_duration_unit_config.md) is set to "minute" and [the last worktime interval](api/gantt_setworktime.md) finishes after 23:00
- Fix the issue which caused groups of the [grouping extension](desktop/grouping.md) to expand whenever the user modified any task
- Fix the issue which caused the second parameter of [dataProcessor.setTransactionMode](desktop/server_side.md#technique) to be ignored if an object was passed into the first parameter
- Fix the issue which caused the active [inline editor](desktop/inline_editing.md) to disappear after [repaint of Gantt](api/gantt_render.md)
- Fix the issue with the [static_background](api/gantt_static_background_config.md) extension which caused mouse click on empty cells to be interpreted as a click on task elements
- Gantt now dynamically repaints links between [split tasks](desktop/split_tasks.md) during drag and drop
- Fix the script error which was thrown from [gantt.addTask](api/gantt_addtask.md) in the [node.js package](desktop/using_gantt_on_server.md)
- Fix the script error which was thrown from [gantt.destructor](api/gantt_destructor.md) in the [node.js package](desktop/using_gantt_on_server.md)

7.0.3
------

<span class='release_date'>May 14, 2020. Bugfix release</span>

### Fixes

- Fix regression in the [setWorkTime method](api/gantt_setworktime.md) which caused a script error when the working time was set for a specific day
- Fix the incorrect work of the [Keyboard Navigation](desktop/keyboard_navigation.md) extension when Gantt is used inside a [SalesForce Lightning Web Component](https://github.com/DHTMLX/salesforce-gantt-demo)

7.0.2
------

<span class='release_date'>April 30, 2020. Bugfix release</span>

### Fixes

- Fix the incorrect work of [date formatters](api/gantt_date_other.md) when [gantt.config.csp](api/gantt_csp_config.md) is set to true
- Fix regression in the [click_drag](desktop/extensions_list.md#advanceddragndrop) and [drag_timeline](desktop/extensions_list.md#dragtimeline) extensions which caused the incorrect work when [multiple instances of Gantt](desktop/multiple_gantts.md) were created
- Fix the incorrect css class of a task row element after returning the error status from the [dataProcessor router function](desktop/server_side.md#customrouting)
- Fix the incorrect work of [inline editors](desktop/inline_editing.md) inside Shadow DOM

7.0.1
-----

<span class='release_date'>April 16, 2020. Bugfix release</span>


###Fixes

- Major performance improvement for [calculation of tasks' duration in the working minutes](desktop/working_time.md)
- Fix regression in the [Tooltip](desktop/tooltips.md) and [Undo](desktop/undo_redo.md) extensions which caused the incorrect work when multiple instances of Gantt were created
- Fix the issue with the [reordering of grid columns](api/gantt_reorder_grid_columns_config.md) which caused the timeline to scroll when a mouse pointer moved to the edge of the grid during drag and drop
- Fix [the incorrect position of the column after its dragging and dropping to the right side of the grid border](api/gantt_reorder_grid_columns_config.md)
- [dataProcessor custom router](desktop/server_side.md#customrouting) should now work correctly with rejected promises
- Fix the regression in [smart rendering](desktop/performance.md#smartrendering) which caused some links not to be visible
- [Split tasks](desktop/split_tasks.md) now display not only the first level children but also all nested subtasks
- Fix the issue with [split tasks](desktop/split_tasks.md) and smart rendering which happened when a split task had the 'task' type
- Fix the issue with [split tasks](desktop/split_tasks.md) which caused the gantt not to calculate the duration of the 'project' tasks nested in a split task
- Fix the incorrect position of a placeholder after opening an [inline editor](desktop/inline_editing.md) in the [RTL mode](desktop/rtl_mode.md)


<b>7.0</b>
--------------

<span class='release_date'>April 7, 2020. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-7-0-node-js-server-module-merging-multiple-calendars-reordering-grid-columns-drag-n-drop-new-customization-options/)
### Breaking changes

The update brings multiple changes in the API methods. Check the [Migration](migrating.md#6370) article to keep in step with the latest version.

### New functionality

- Ability to create [a Gantt instance in Node.js](desktop/using_gantt_on_server.md)
- The api/gantt_grid_elastic_columns_config.md config for adjusting the size of columns during resizing of the whole grid is added
- [Ability to reorder columns of the grid by drag and drop](api/gantt_reorder_grid_columns_config.md)
- The [QuickInfo](desktop/quick_info.md) extension  now provides the ability to have control over the popup manually via the [methods of the gantt.ext.quickInfo object](desktop/quickinfo_ext.md)
- Ability to [truncate long text with ellipsis in grid columns](desktop/styling_guide.md#customizationgridcolumns)
- The api/gantt_dynamic_resource_calendars_config.md config and api/gantt_mergecalendars.md method are added [for merging multiple calendars automatically and manually](desktop/working_time.md#mergingcalendars) respectively
- The api/gantt_getresourcecalendar.md method is added
- Ability to specify [working time in minutes](desktop/working_time.md#globalsettings)


### Updates

- Locale files were removed from the package, [new API](api/gantt_i18n_other.md) for the Gantt chart localization is added
- All extensions must be activated now via the api/gantt_plugins.md method
- `Gantt.getGanttInstance` now [can take a configuration object](desktop/multiple_gantts.md#ganttinstanceconfiguration)  while creating a new Gantt instance
- The CSP extension was removed from the package, the [csp mode is enabled by default](api/gantt_csp_config.md)
- The settings object as the third parameter of the api/gantt_attachevent.md method is added
- The format for setting working hours in the [setWorkTime](api/gantt_setworktime.md) method is simplified
- The default working hours are changed from 8:00-17:00 to 8:00-12:00, 13:00-17:00
- The format of the [gantt.config.resource_calendars](api/gantt_resource_calendars_config.md) config is simplified
- desktop/video_guides.md are added in the documentation

### Fixes

- Fix the bug which caused a column to change width after hiding and showing the column again
- Fix the bug which disabled the ability to select any task when the multiselect extension was disabled via the `multiselect` config
- Fix the incorrect work of `gantt.sort` for tasks with equal start dates
- Fix drag and drop of a link when Gantt is initialized inside a Web Component

6.3.7
-----

<span class='release_date'>February 12, 2020. Bugfix release</span>

### Fixes

- Significant performance improvement for smart rendering of chart and resource panel

6.3.6
-----

<span class='release_date'>February 10, 2020. Bugfix release</span>

### Fixes


- Fix the regression in [gantt.resetLayout]( https://docs.dhtmlx.com/gantt/api__gantt_resetlayout.html ) which caused the script error
- Fix the issue with the [QuickInfo popup](https://docs.dhtmlx.com/gantt/desktop__extensions_list.html#quickinfo ) which caused it to be positioned behind the [resource panel](https://docs.dhtmlx.com/gantt/desktop__resource_management.html#resourceviewpanel) in some cases
- Fix the script error thrown from the [gantt.getShortcutHandler](https://docs.dhtmlx.com/gantt/api__gantt_getshortcuthandler.html) method
- Fix the script error thrown from the [tooltip.show(x, y)](https://docs.dhtmlx.com/gantt/desktop__tooltips_ext.html) method
- [gantt.getTaskNode](https://docs.dhtmlx.com/gantt/api__gantt_gettasknode.html) now returns the correct HTML element for [split tasks](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html
)
- Fix the issue with [horizontal scrollbars](https://docs.dhtmlx.com/gantt/desktop__specifying_columns.html#horizontalscrollbar) not being displayed when [visibility groups](https://docs.dhtmlx.com/gantt/desktop__layout_config.html#visibilitygroups) are specified in some layout configurations

6.3.5
-----

<span class='release_date'>January 31, 2020. Bugfix release</span>

### Fixes

- Fix the issue with task [grouping](desktop/grouping.md) which caused vertical scroll position to reset after moving any task with drag and drop
- Fix the script error which happened when api/gantt_drag_timeline_config.md config was set to `null`
- Fix the incorrect position of highlighted cells when api/gantt_static_background_config.md and api/gantt_static_background_cells_config.md are enabled and api/gantt_smart_rendering_config.md is disabled
- Fix the issue with the api/gantt_onafterbranchloading_event.md event not being called
- Fix the incorrect work of the [smart rendering](desktop/performance.md#smartrendering) when the value of api/gantt_task_height_config.md is less than the value of api/gantt_row_height_config.md

### Updates

- [A public method for rebuilding the Gantt layout after changing its config](api/gantt_resetlayout.md) is added

6.3.4
-----

<span class='release_date'>December 27, 2019. Bugfix release</span>

### Fixes

- Fix crashes of the [resource load diagram](desktop/resource_management.md#resourceviewpanel) when [smart rendering](desktop/performance.md#smartrendering) is switched off
- Fix issue with the custom task property named "unit", as Gantt considered it as a duration unit value and multiplied the task duration after its dragging
- Fix the incorrect [Tooltip](desktop/tooltips.md) position when the [autosize](api/gantt_autosize_config.md) config is enabled
- Fix the incorrect alignment behavior of grid cells when both the [scrollable](desktop/specifying_columns.md#horizontalscrollbar) property and [autofit](api/gantt_autofit_config.md) config are set to true
- Creating a link between a task in the timeline and [a placeholder](api/gantt_placeholder_task_config.md) in the grid is now blocked
- Fix the bug with the [auto scheduling extension](desktop/auto_scheduling.md) that caused Gantt to freeze when a task has [the constraint type (SNET/FNET/SNLT/FNLT)](desktop/auto_scheduling.md#timeconstraintsfortasks) with no date specified, or with an invalid date

6.3.3
-----

<span class='release_date'>December 18, 2019. Bugfix release</span>

### Fixes

- Fix the incorrect [resizing behavior of grid](desktop/specifying_columns.md#resizing) that disabled the Timeline in some cases
- [gantt.parse](api/gantt_parse.md) should now correctly update the project tree when a parent task is loaded after its children
- Fix compatibility with SalesForce Lightning Aura components framework (Evaluation build)
- Fix the incorrect position of the [Tooltip](desktop/tooltips.md) in SalesForce environment
- Fix the incorrect [Tooltip](desktop/tooltips.md) position when the gantt container has a vertical margin
- Add missing [WAI-ARIA](desktop/accessibility.md#waiariaattributes) attributes to elements inside the gantt
- Fix the incorrect work of the api/gantt_min_duration_config.md config
- Fix the incorrect work of [link formatters](desktop/formatters_ext.md#linkformatter) with custom [instances of the gantt](desktop/multiple_gantts.md)

6.3.2
-----

<span class='release_date'>December 10, 2019. Bugfix release</span>

### Fixes

- Fix the script error which happened when [gantt.destructor](api/gantt_destructor.md) was called when the [click-drag feature](desktop/advanced_dnd.md) was enabled
- [gantt.parse](api/gantt_parse.md) no longer modifies data objects passed into arguments, deep copies are made instead

### Updates

- TypeScript type definitions were updated
- api/gantt_onbeforebranchloading_event.md and api/gantt_onafterbranchloading_event.md public events were added so it would be possible to modify the url or dynamic parameters of [dynamic loading](desktop/dynamic_loading.md) requests
- Added a public method for changing the url of the [dataProcessor](desktop/server_side.md) after its initialization

6.3.1
-----

<span class='release_date'>November 29, 2019. Bugfix release</span>

### Fixes

- Fix the regression in the [smart rendering](api/gantt_addtasklayer.md#smartrenderingforcustomlayers) which caused links not to be rendered in some cases
- Fix the bug that allowed modifying and creating new tasks with [keyboard navigation](desktop/keyboard_navigation.md) when the [read-only mode](desktop/readonly_mode.md) is activated
- Fix the display issue with [Fullscreen extension](desktop/fullscreen_mode.md) which allowed some page elements to be displayed over the gantt in the fullscreen mode
- Fix the bug that caused the [drag-timeline extension](desktop/extensions_list.md#dragtimeline) to reset the value of the [readonly config](desktop/readonly_mode.md)

6.3
-------

<span class='release_date'>November 14, 2019. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-gantt-chart-6-3-decimal-durations-link-formatting-drag-n-drop-multiple-tasks-even-smarter-rendering/)
### Breaking changes

The update brings multiple changes in the API methods. Check the [Migration](migrating.md#6263) article to keep in step with the latest version.

### New functionality

- [Ability to specify decimal units for the duration of tasks](desktop/working_time.md#taskdurationindecimalformat)
- [Ability to scroll the timeline via mouse click and drag](desktop/extensions_list.md#dragtimeline)
- [Ability to drag and drop multiple tasks horizontally](desktop/multiselection.md#multitaskselectionanddragndrop)


### Updates

- Ability to [display tasks](api/gantt_show_tasks_outside_timescale_config.md) outside the explicit api/gantt_start_date_config.md and api/gantt_end_date_config.md range of the [time scale](desktop/configuring_time_scale.md#range)
- Add a new api/gantt_task_end_date_template.md template for formatting end dates of tasks
- Ability to add custom actions to the [Undo](desktop/undo_redo.md#undoingredoingchangesmadefromcode) stack
- Ability to connect custom layers to [smart rendering](api/gantt_addtasklayer.md#smartrenderingforcustomlayers)
- [Inline editors](desktop/inline_editing.md) for **predecessors** now support formatted values of links
- Remove default limits for input values in date [inline editors](migrating.md#inline_editors)
- Ability to specify the root node for the [Fullscreen extension](desktop/fullscreen_mode.md)
- Ability either to change or disable [horizontal scroll](api/gantt_horizontal_scroll_key_config.md) by `shiftKey`+`mousewheel`
- Roboto font was removed from [Material skin](desktop/skins.md#materialskin) and has to be imported manually

### Fixes

- Fix crashes of the [resource histogram](desktop/resource_management.md#resourceviewpanel) when [smart rendering](desktop/performance.md#smartrendering) is switched off
- Fix compatibility with r.js compressor
- Fix various conflicts between [keyboard navigation](desktop/keyboard_navigation.md) and [inline editors](desktop/inline_editing.md)
- Fix the incorrect state of the [DataProcessor](desktop/server_side.md#customrouting) when tasks and links were modified sequentially from a [custom router](desktop/server_side.md#customrouting)
- A correct data object of Task/Link is now also passed into **delete** call of a [custom router](desktop/server_side.md#customrouting)

6.2.7
-----

<span class='release_date'>October 11, 2019. Bugfix release</span>

### Fixes

- Fix the issue with vertical resizing of [grids with horizontal scroll](desktop/specifying_columns.md#horizontalscrollbar) in [complex layouts](desktop/resource_management.md#resourceviewpanel)
- Fix the incorrect work of the [resource histogram](desktop/resource_management.md#resourceviewpanel) when the [scale step](desktop/configuring_time_scale.md#timestep) is greater than one
- Fix the reopened bug with collapsed branches after calling [gantt.parse](api/gantt_parse.md) from [v6.2.4](#624) bugfix


6.2.6
-----

<span class='release_date'>September 19, 2019. Bugfix release</span>

### Fixes

- Fix the regression in [v6.2 Smart Rendering](#62) which in some cases caused incorrect vertical positions of tasks after [re-initialization](api/gantt_init.md) of the Gantt
- Fix the issue with [QuickInfo popup](desktop/extensions_list.md#quickinfo) not being displayed for [unscheduled tasks](desktop/unscheduled_tasks.md)
- Fix incorrect work of extension files with the Ultimate build of Gantt

6.2.5
-----

<span class='release_date'>September 12, 2019. Bugfix release</span>

### Fixes

- Fix incorrect initial values of subtasks in the api/gantt_onbeforetaskchanged_event.md event handler after [dragging a project with subtasks](api/gantt_drag_project_config.md)
- Fix incorrect work of the [grouping](desktop/grouping.md) extension when [auto task types](api/gantt_auto_types_config.md) are enabled
- Fix the script error after returning the *false* value from the api/gantt_ontaskloading_event.md event handler
- Add clearer error messages for the exceptions that can be thrown from [gantt.load](api/gantt_load.md) and [gantt.parse](api/gantt_parse.md)

6.2.4
-----

<span class='release_date'>September 5, 2019. Bugfix release</span>

### Fixes

- Fix the issue with task branches being collapsed after updating data using the api/gantt_parse.md method
- Fix the incorrect work of [smart rendering](desktop/performance.md#smartrendering) in the [resource view](desktop/resource_management.md#resourceviewpanel)
- Fix the issue which caused the [Zoom module](desktop/zooming.md) to attach redundant DOM event handlers on each [re-initialization](api/gantt_init.md) of the Gantt


6.2.3
-----

<span class='release_date'>August 29, 2019. Bugfix release</span>

### Fixes

- Fix the incorrect work of the [Constraint control](desktop/auto_scheduling.md#timeconstraintsfortasks) in IE11 and MS Edge browsers
- Fix the size of the Gantt element in [Fullscreen mode](desktop/fullscreen_mode.md)
- Fix the issue with api/gantt_onexpand_event.md and api/gantt_oncollapse_event.md events not being called from [Fullscreen mode](desktop/fullscreen_mode.md)
- Correct the [Tooltip](desktop/tooltips.md) position when the mouse pointer is near the left/right edge of the screen
- The [Tooltip](desktop/tooltips.md) should now be hidden when the [Lightbox](desktop/default_edit_form.md) is opened
- The [Tooltip](desktop/tooltips.md) should now be hidden when the chart is scrolled
- Fix the incorrect work of [Tooltip](desktop/tooltips.md) which caused the tooltip not to be updated when mouse pointer moved between two elements matching the same selector
- Fix the incorrect work of api/gantt_gettaskby.md when `null` or `0` is provided as a second argument
- Fix the issue with [WBS](api/gantt_getwbscode.md) column not being updated after [sorting](desktop/sorting.md) the gantt
- Fix the incorrect display of api/gantt_static_background_config.md in [Material skin](desktop/skins.md#materialskin)

6.2.2
-----

<span class='release_date'>August 13, 2019. Bugfix release</span>

### Updates

- Add the [gantt.license](api/gantt_license_other.md) property
- Add the api/gantt_onlinkcreated_event.md API event for new links, similarly to the api/gantt_ontaskcreated_event.md functionality for new tasks
- api/gantt_movetask.md returns `false` when the action is prevented using api/gantt_onbeforetaskmove_event.md

### Fixes

- Fix the issue which caused a link line to disappear when the api/gantt_render.md method is called while a user creates [a new link](desktop/dependencies.md)
- Fix the issue when [markers](desktop/markers.md) were not displayed when their start date was set earlier than the minimal date of [the time scale](desktop/configuring_time_scale.md#range)
- Fix the issue when [markers](desktop/markers.md) were not displayed when gantt was initialized with the [gantt.config.show_chart = false](api/gantt_show_chart_config.md) config
- Fix a disappearing modal overlay of the [lightbox](desktop/default_edit_form.md) when a user changed the [type of a task](desktop/typeselect.md)
- Fix the [issue in keyboard navigation presets](https://docs.dhtmlx.com/gantt/desktop__keyboard_navigation.html#comment-4488512513), when api/gantt_onaftertaskupdate_event.md was fired after **Shift+left arrow** hotkey even if the action was canceled using api/gantt_onbeforetaskmove_event.md

6.2.1
-----

<span class='release_date'>August 7, 2019. Bugfix release</span>

### Fixes

- Fix IE11 compatibility of the [click-drag feature](desktop/advanced_dnd.md)
- Fix the script error which happened when the user tried to add a new task into an empty chart with the resource view
- Fix the incorrect behavior of the [grouping](desktop/grouping.md) extension which caused assigning an incorrect group value to new tasks
- Fix a script error in the [keyboard navigation](desktop/keyboard_navigation.md) extension thrown from the Alt+Arrow key shortcut
- Filtering in the [resource control](desktop/resource_management.md) is changed to ignore text case
- Task dragging and drag-and-drop may finish on mouseup on any gantt element
- Fix the script error which happened after saving an [unscheduled task](desktop/unscheduled_tasks.md)

6.2
-------

<span class='release_date'>July 16, 2019. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-6-2-minor-update-boosting-gantt-chart-performance-zooming-mouse-wheel-much/)

### Breaking changes

The update brings multiple changes in the API methods. Check the [Migration](migrating.md#6162) article to keep in step with the latest version.

### New functionality

- [Creating and selecting tasks by drag-n-drop](desktop/advanced_dnd.md)
- Smooth [zooming](desktop/zooming.md) by mouse wheel
- Ability to [expand/collapse split tasks](desktop/split_tasks.md#expandingcollapsingsplittasks) (PRO)

### Updates

- Major performance improvement for chart and resource panel
- Changing the start/end date of a task via [inline editors](desktop/inline_editing.md) modifies the duration of a task accordingly
- The process of [setting up the timeline scale](desktop/configuring_time_scale.md) is simplified
- New [zooming](desktop/zoom.md) and [scales](api/gantt_scales_config.md) API

### Fixes

- Multiple tasks highlighting resets after rendering
- Script error when destroying Gantt from data processor handler

6.1.7
-----

<span class='release_date'>June 27, 2019. Bugfix release</span>

### Fixes

- Fix incorrect behavior of api/gantt_getclosestworktime.md
- Fix issue with the api/gantt_autoscroll_config.md which happened after [toggling visibility](api/gantt_show_chart_config.md) of the timeline
- Fix bug in the [Multiselect extension](desktop/multiselection.md) which caused selected tasks to lose highlight after chart repaint
- Fix script error which happened after [vertical drag-and-drop](desktop/reordering_tasks.md) if [smart rendering](desktop/performance.md#smartrendering) and [keyboard navigation](desktop/keyboard_navigation.md) extensions were enabled
- Fix incorrect behavior which happened when users tried to switch between [inline editors](desktop/inline_editing.md) using the `Tab` key if some columns of the grid were [hidden](desktop/specifying_columns.md#visibility)
- Fix unexpected behavior which prevented the [lightbox](desktop/edit_form.md) and [inline editors](desktop/inline_editing.md) from overriding [constraint dates](desktop/auto_scheduling.md#timeconstraintsfortasks)

6.1.6
-----

<span class='release_date'>May 14, 2019. Bugfix release</span>

### Fixes

- Fix issue with not working [click handlers](api/gantt_quickinfo_buttons_config.md) of [QuickInfo popup](desktop/extensions_list.md#quickinfo) after a second api/gantt_init.md call
- Fix issue with [QuickInfo popup](desktop/extensions_list.md#quickinfo) not showing up if api/gantt_show_chart_config.md is set to false
- Fix incorrect `action` argument for [dataProcessor router](desktop/server_side.md#customrouting) after [vertical drag-and-drop](desktop/reordering_tasks.md)
- Fix issue when api/gantt_createtask.md ignores the `index` parameter


6.1.5
-----

<span class='release_date'>April 25, 2019. Bugfix release</span>

### Fixes

- Fix script error on a second api/gantt_init.md call when api/gantt_show_chart_config.md config is disabled
- Fix incorrect position of [vertical drag-and-drop](desktop/reordering_tasks.md) placeholder in the [marker mode](desktop/reordering_tasks.md#improvingperformanceforlargedatasets)


6.1.4
-----

<span class='release_date'>April 18, 2019. Bugfix release</span>

### Fixes

- Fix script error on [reinitialization](api/gantt_init.md) of gantt in the IE browser
- Fix incorrect behavior of the [Tooltip extension](desktop/tooltips.md) when [gantt.destructor](api/gantt_destructor.md) is called
- Fix incorrect work of [inline editors](desktop/inline_editing.md) in the [keyboard_navigation_cells](api/gantt_keyboard_navigation_cells_config.md) mode when grid contains
[hidden columns](desktop/specifying_columns.md#visibility)
- Fix bug in the [Undo](desktop/undo_redo.md) extension when Redo action for recreation of new tasks did not restore all properties
- Fix regression in GPL build which caused a script error on a second [gantt.init](api/gantt_init.md) call



6.1.3
-----

<span class='release_date'>April 15, 2019. Bugfix release</span>

### Fixes

- [gantt.createTask](api/gantt_createtask.md)/[gantt.addTask](api/gantt_addtask.md) should use [root_id](api/gantt_root_id_config.md) config value instead of hardcoded 0 id
- Performance increase for [worktime calculations](desktop/working_time.md) for `minute` and `hour` [duration units](api/gantt_duration_unit_config.md)
- Minor performance increase for rendering large lists of tasks in the [smart rendering](desktop/performance.md#smartrendering) mode
- Ensure [vertical drag-and-drop](desktop/reordering_tasks.md) doesn't start when the user selects text inside an [inline editor](desktop/inline_editing.md)
- Fix script error on [reinitialization](api/gantt_init.md) of gantt in the IE browser
- Fix script error from [keyboard navigation](desktop/keyboard_navigation.md) in the `cell` mode after deleting last tasks from the chart
- Ensure Gantt cleans up autogenerated [static background](api/gantt_static_background_config.md) style elements after destruction or reinitialization
- Ensure [inline editors](desktop/inline_editing.md) are not active when [read-only mode](desktop/readonly_mode.md) is enabled
- Fix incorrect selection of grid header cells in the `cell` mode of [keyboard navigation](desktop/keyboard_navigation.md) when the `sort` config is enabled
- Fix regression in the [auto_types](api/gantt_auto_types_config.md) config which prevented auto type change when new tasks are added
- Fix bug when returning `false` from [onTaskDblClick](api/gantt_ontaskdblclick_event.md) blocked [onLinkDblClick](api/gantt_onlinkdblclick_event.md) as well
- Fix script error when parsing [constraint dates](desktop/auto_scheduling.md#timeconstraintsfortasks) from JSON data
- Fix incorrect position of tasks and [markers](desktop/markers.md) with the [skip_off_time](api/gantt_skip_off_time_config.md) config
- Fix incorrect height of [markers](desktop/markers.md) after reordering tasks via [drag and drop](desktop/reordering_tasks.md)
- New tasks receive the initial value of the `progress` property
- Fix incorrect task position after vertical drag and drop in the [marker](desktop/reordering_tasks.md#improvingperformanceforlargedatasets) mode
- Fix script error from [gantt.destructor](api/gantt_destructor.md) when the [resource panel](desktop/resource_management.md#resourceviewpanel) is enabled
- Fix the bug which caused an empty line to be displayed in a [typeselect](desktop/typeselect.md) block
- Fix the bug which caused a task not to be recognized as a part of [critical path](desktop/critical_path.md) after [id change](api/gantt_changetaskid.md)


6.1.2
-----

<span class='release_date'>March 26, 2019. Bugfix release</span>

### Updates

- [Keyboard navigation](desktop/keyboard_navigation.md): add a method for getting the active cell

### Fixes

- Fix incorrect work of the [resource panel](desktop/resource_management.md#resourceviewpanel) after creating a new datastore to overwrite the previous one
- Fix incorrect values of query parameters in the POST mode of [dataProcessor](desktop/server_side.md)
- Fix incorrect result of [gantt.getClosestWorkTime](api/gantt_getclosestworktime.md) when called without specifying a direction
- Fix issue when the English locale couldn't override the previously added locale
- Fix script error with [gantt.undo](api/gantt_undo_config.md) and indent actions in the grid
- Fix SalesForce compatibility: new resize listener was broken in SF, fallback is added


6.1.1
-----

<span class='release_date'>March 5, 2019. Bugfix release</span>

### Fixes

- Add missing locale options for the [resource lightbox control](desktop/resources.md)
- Fix script error when using [gantt.destructor](api/gantt_destructor.md) together with the dataProcessor
- Fix script error when using [gantt.destructor](api/gantt_destructor.md) together with the [resource panel](desktop/resource_management.md#resourceviewpanel)
- Fix the filesize of the [tooltip extension](desktop/tooltips.md)
- Fix unexpected call of the api/gantt_ontaskdblclick_event.md event while double clicking on a link element
- Fix stuck [lightbox](api/gantt_lightbox_config.md) cover if [gantt.init](api/gantt_init.md) is called while lightbox is opened
- Fix issues with [lightbox](api/gantt_lightbox_config.md) and the [tooltip extension](desktop/tooltips.md) in the [full-screen mode](desktop/fullscreen_mode.md)


6.1
------

<span class='release_date'>February 21, 2019. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-6-1-time-constraints-backward-scheduling-s-curve/)

### New functionality

- [Ability to add an overlay for the Gantt Chart](desktop/baselines.md#extraoverlayforthechart) (PRO)
- [Time constraints for tasks](desktop/auto_scheduling.md#timeconstraintsfortasks) (PRO)
- [Backward scheduling](desktop/auto_scheduling.md#backwardscheduling) (PRO)
- TypeScript type definitions are added into the package

### Updates

- Ability to [create tooltips for all the elements](desktop/tooltips.md#tooltipsfordifferentelements) of dhtmlxGantt
- [Routing options for dataProcessor](desktop/server_side.md#customrouting)
- [Project-level working calendars](desktop/working_time.md#assigningcalendartoproject) (PRO)
- Ability to [import dhtmlxGantt as an ES6 module](desktop/initializing_gantt_chart.md#moduleimport)

6.0.7
-----

<span class='release_date'>January 16, 2019. Bugfix release</span>

### Fixes

- Reduced the number of redundant repaints of the [resource diagram](desktop/resource_management.md#resourceviewpanel)
- Fixed script error from the [resource diagram](desktop/resource_management.md#resourceviewpanel) after deleting a task
- Fixed script error from the [fullscreen extension](desktop/fullscreen_mode.md) after exiting fullscreen mode on the `Esc` key
- Fixed incorrect state of links drag and drop when dragging a link between multiple charts on the page. Creating links between gantts is not supported
- Fixed script error after deleting [multiple selected tasks](desktop/multiselection.md) using [keyboard navigation](desktop/keyboard_navigation.md)
- Fixed default mapping of [inline editors](desktop/inline_editing.md). Inline editors shouldn't block keyboard shortcuts on task cells

6.0.4
-----

<span class='release_date'>December 27, 2018. Bugfix release</span>

### Fixes

- Fixed incorrect task position after task vertical dnd in `order_branch='marker'` mode
- Fixed script error after deleting a sub-tree which contains selected task
- Fixed script error on Save/Cancel lightbox containing resource filters

6.0.2
-----

<span class='release_date'>December 6, 2018. Bugfix release</span>

### Fixes

- Fixed `ReferenceError: getResourceAssignments is not defined` when importing Gantt into Vue.js project
- Fixed script error on deleting task after assigning resource to it via resource form
- Fixed script error in resource diagram after second `gantt.init` call
- Fixed script error on toggle timeline visibility when marker extension is used
- Fixed page freeze on `gantt.parse` if tasks tree contains cyclic references, script error is thrown instead


<b>6.0</b>
----------

<span class='release_date'>November 5, 2018. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-6-0-major-update-advanced-resource-management/)

### Functionality

- [Assignment of several resources to a task](desktop/resource_management.md#assigningresources) (PRO version)
- [Grouping tasks by multiple resources](desktop/resource_management.md#balancingresourceload) (PRO version)
- [Resource histogram](desktop/resource_management.md#resourceviewpanel) in addition to the resource load diagram (PRO version)
- Ability to [get free/total slack of a task](desktop/critical_path.md#gettingfreeandtotalslack) while [calculating the critical path](desktop/critical_path.md) (PRO version)
- [Import of projects from Excel](desktop/excel.md#importfromexcel)
- [The "REST-JSON" DataProcessor mode](desktop/server_side.md#restjson) for processing complex records on any server-side platform
- Auto resize when container size changes


### Configuration

- The [Resources control](desktop/resources.md) in the lightbox for assigning resources to a task (PRO version)
- [Improved performance of tasks reordering](desktop/reordering_tasks.md#improvingperformanceforlargedatasets) in the "branch" mode
- Performance update for the api/gantt_auto_types_config.md configuration (PRO version)

### API

- The "marker" mode for the api/gantt_order_branch_config.md config to speed up tasks reordering within branch
- The [onBeforeRowDragMove](api/gantt_onbeforerowdragmove_event.md) event to work in tandem with the api/gantt_order_branch_config.md config in the "marker" mode
- The api/gantt_gettotalslack.md / api/gantt_getfreeslack.md methods for work with slack instead of the getSlack() method (PRO)
- The api/gantt_importfromexcel.md method
- The *delimiter* option in the [groupBy](api/gantt_groupby.md) method for grouping resources

5.2
--------------

<span class='release_date'>July 6, 2018. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-5-2/)

### Functionality

- [Inline editing in Grid](desktop/inline_editing.md)
- [Splitting tasks](desktop/split_tasks.md) (PRO version)
- Updated [keyboard navigation](desktop/keyboard_navigation.md#existingshortcuts)
- [Auto Scheduling](desktop/auto_scheduling.md) performance improvements

### Configuration

- Ability to [set task types automatically](api/gantt_auto_types_config.md) (PRO version)
- Ability to [use a placeholder row](api/gantt_placeholder_task_config.md) for creating new tasks
- [Checkbox](desktop/checkbox.md) and [radio button](desktop/radio.md) controls for lightbox
- Updated [Content Security Policy](desktop/content_security_policy.md) extension

### API

- New methods and events for [undo](desktop/undo_redo.md) and [autoscheduling](desktop/auto_scheduling.md) extensions.

5.1
----------

<span class='release_date'>February 27, 2018. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-5-1-resource-management-rtl-mode-and-more/)

### Functionality

- [Resource management](desktop/resource_management.md) (PRO version)
- [RTL mode](desktop/rtl_mode.md)
- [Horizontal scroll for Grid](desktop/specifying_columns.md#horizontalscrollbar) and [other layout improvements](desktop/layout_config.md)
- [Destructors for Gantt and DataProcessor instances](desktop/multiple_gantts.md#destructorofganttanddataprocessorinstances)


### Configuration

- [Ability to set min/max widths for Grid columns](desktop/specifying_columns.md#width)
- [Ability to drag and drop projects with their subtasks](desktop/dnd.md#draggingprojectswithsubtasks) (PRO version)
- [Extended parameters for the export methods](desktop/export_common.md)


### API

- [Updated API events](desktop/multiselection.md#apievents) for the [Multi-Task Selection](desktop/multiselection.md) extension


### Fixes

- Fixed issues with the keyboard navigation in the smart rendering mode


<b>5.0</b>
---------

<span class='release_date'>December 12, 2017. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/large-scale-update-dhtmlxgantt-version-5-0/)

### Functionality

- [Flexible Gantt layout](desktop/layout_config.md)
- [Server-side integration with REST API](desktop/server_side.md). Check also [tutorials for various server-side platforms](desktop/howtostart_guides.md)


### Styling

- New ["Material" skin](desktop/skins.md#materialskin)


4.2
------------

<span class='release_date'>August 17, 2017. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-4-2-manage-working-days-hours-individual-tasks/)

### Functionality

- [Work Time calendars at the task and resource levels](desktop/working_time.md#multipleworktimecalendars)
- [WBS code (outline numbers) calculation](desktop/specifying_columns.md#wbscode)
- [Autoscroll for drag and drop operations](desktop/dnd.md#autoscrollduringtasksdragging)
- [Persian (Farsi) locale is added](desktop/localization.md#predefinedlocales)

### Configuration

- [The getter function for key navigation shortcuts](api/gantt_getshortcuthandler.md) is added
- [The config for cascade deleting of nested tasks and links](api/gantt_cascade_delete_config.md) is added
- The ability to [scroll timeline horizontally on *Shift+a mouse wheel movement*](desktop/keyboard_navigation.md#builtinshortcutforhorizontaltimelinescrolling) is added
- German and Italian locales are updated
- GIF images in the Gantt skins are replaced with PNG


4.1
---------

<span class='release_date'>September 1, 2016. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxgantt-4-1-full-accessibility-support/)

### Functionality

- [Keyboard navigation](desktop/keyboard_navigation.md)
- [WAI-ARIA support](desktop/accessibility.md#waiariaattributes)
- [High-contrast themes](desktop/accessibility.md#highontrastthemes)
- Updated [Auto Scheduling](desktop/auto_scheduling.md) and [Critical Path](desktop/critical_path.md) calculations (PRO version)

### Configuration

- Performance improvements for [worktime calculation](desktop/working_time.md) and [timescale rendering](desktop/performance.md)
- [Public method for unsetting worktimes](api/gantt_unsetworktime.md) added
- [API events for QuickInfo popup](api/refs/gantt_events.md) added
- [Croatian locale](desktop/localization.md#predefinedlocales) added
- [Turkish locale](desktop/localization.md#predefinedlocales) updated


<b>4.0</b>
---------

<span class='release_date'>December 1, 2015. Major update</span>

### Functionality

- [Smart rendering](desktop/performance.md#smartrendering) for big datasets
- [Undo/redo](desktop/undo_redo.md) extensions

### Configuration

- [Critical path calculation](desktop/critical_path.md) - support for [lag/lead of links](desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks) added (PRO version)
- Spanish and Chinese [locales](desktop/localization.md#predefinedlocales) updated

### API

- Public API improvements - public helpers for [ajax](https://docs.dhtmlx.com/api__refs__dhtmlxajax.html), [environment variables](api/gantt_env_other.md)
- [Public API cleanup](migrating.md#3x40) - redundant global objects removed, conflicts with dhtmlxSuite resolved
- Public helpers for [popup messages](desktop/message_boxes.md) added



3.3
----------

<span class='release_date'>July 21, 2015. Minor update</span>

### Functionality

- Dependency [Auto Scheduling](desktop/auto_scheduling.md) feature (PRO version)
- [Fullscreen mode](desktop/fullscreen_mode.md)
- Support for [unscheduled tasks](desktop/crud_task.md#addingunscheduledtasks)
- [Backward planning](desktop/loading.md#loadingtaskdates)

### Configuration

- Initial support for [Content Security Policy](desktop/content_security_policy.md)
- A possibility of specifying [per column Grid sorting](desktop/sorting.md#percolumngridsorting) settings
- Improved branch ordering feature - [drag-n-drop between levels](desktop/reordering_tasks.md#dragndropwithinthewholeganttstructure)

### API

- [REST mode for ajax loading/saving](desktop/server_side.md#savingdatafromrestserver)



3.2
----------------

<span class='release_date'>March 18, 2015. Minor update</span>

### Functionality

- [Grouping tasks](desktop/grouping.md) (PRO version)
- [Multi-task selection](desktop/multiselection.md)
- [Data export to iCal and Excel formats](desktop/excel.md)
- [Major performance improvement of work time and critical path calculations](desktop/performance.md)


### Configuration

- [A possibility to set the range for the year selector in the lightbox](desktop/time.md#alistofproperties)


### API

- [Events for managing available target places while re-ordering tasks](desktop/reordering_tasks.md#denyingdroppingtospecificpositions)
- [Events for managing loading process](desktop/loading.md#eventsflow)
- New samples, methods, events




3.1
----------------

<span class='release_date'>October 25, 2014. Minor update</span>

### Functionality

- Ability to drag tasks on touch devices

### Configuration

- [Changed the default offset between the first and the last tasks on a scale](api/gantt_scale_offset_minimal_config.md)

### Bug Fixes

- Incorrect behavior of the tooltip on expanding/collapsing of task tree
- Order of API events during Gantt initialization
- Incorrect behavior of vertical markers when Gantt is cleared or reinitialized


<b>3.0</b>
----------------

<span class='release_date'>September 11, 2014. Major update</span>

### Configuration

- [Ability to map the 'Time' and 'Duration' controls to custom date properties](desktop/time.md#assigningcustomstartandenddatetimeproperties)

### Functionality

- [Dynamic loading](desktop/dynamic_loading.md) (PRO version)
- [A possibility to resize columns and the whole grid by drag-&-dropping](desktop/specifying_columns.md)
- [A possibility to hide/show columns dynamically](desktop/specifying_columns.md#hidingshowingcolumns) (PRO version)
- [A possibility to display additional elements in the timeline area](desktop/baselines.md) (PRO version)
- [Support for the critical path](desktop/critical_path.md) (PRO version)
- [New possibilities for the read-only mode](desktop/readonly_mode.md)
- [Today's and other vertical markers](desktop/markers.md)
- [A possibility to completely redefine rendering of different task types (projects, milestones, etc.)](desktop/baselines.md#definingacustomdisplayfordifferenttasktypes)(PRO version)
- [Styling tasks through special data properties](desktop/colouring_tasks.md#specifyingstyleinthepropertiesofthetaskobject)
- [Styling links through special data properties](desktop/colouring_lines.md#specifyingcolorinthepropertiesofthelinkobject)


### API

- [New tree-related methods](desktop/task_tree_operations.md)

2.1
-------------

<span class='release_date'>March 28, 2014. Minor update</span>

### Global

- Updated locales
- Many bugs have been fixed

### Configuration

- [Custom configuration of the lightbox for different task types](desktop/task_types.md#individuallightboxforeachtype)
- [Non-linear scales, ability to skip time from the scale](desktop/custom_scale.md) (PRO version)

### Functionality

- [Milestones](desktop/milestones.md) and [Projects](desktop/task_types.md#projecttasks) support  (PRO version)
- [A possibility  to calculate the tasks' duration in work days/hours instead of calendar time](desktop/working_time.md)
- [Support for multiple Gantt charts on the page](desktop/multiple_gantts.md) (PRO version)

### API

- Added more configurations, methods, events


<b>2.0</b>
-------------------------------------

<span class='release_date'>October 18, 2013. Major update</span>

### Global

- [jQuery integration](desktop/jquery_integration.md)
- Major performance improvements
- [Ready-to-use PHP integration](desktop/server_side.md)

### Configuration

- [Configurable multi-line scales](desktop/configuring_time_scale.md)
- [Configurable multi-column grid with optional sorting and Drag-n-Drop](desktop/reordering_tasks.md)
- [Configurable popup form for editing tasks](desktop/edit_form.md)
- [All text elements can be defined through templates](desktop/common_configuration.md#gantttemplatesobject)
- [All date strings can be configured](desktop/common_configuration.md#ganttconfigobject)
- [All text labels can be localized](desktop/localization.md)

### Styling

- [Default skin changed to "terrace"](desktop/skins.md#teraccedefaultskin)
- [3 new skins](desktop/skins.md)
- [Bars can have an optional inner resizer](api/gantt_drag_resize_config.md)
- [Optional UI for task creation](overview.md)
- [Vertical and horizontal lines can be colored based on custom rules](desktop/highlighting_time_slots.md)

### Functionality

- [Loading and serialization from JSON](desktop/supported_data_formats.md#json)
- [Loading and serialization with the simplified XML format](desktop/supported_data_formats.md#xmldhtmlxgantt20)
- [3 types of task linking](api/gantt_links_config.md)
- Gantt charts work on touch devices


### API

- [A lot of events added](api/refs/gantt.md#events)
- [Templates](api/refs/gantt.md#templates) and [configuration options](api/refs/gantt.md#properties) added
- [API simplified, it uses a single Gantt object instead of a bunch of different objects](migrating.md)
