What's New
==========

<style>
.release_date{
	font-size: 13px;
	margin-left: 20px;
}
</style>

If your current version of dhtmlxGantt is older than 2.0, check migrating.md for details of updating.


7.1
----------

<span class='release_date'>April 7, 2021. Major update</span>

### Breaking changes

The update brings some changes in the API methods. Check the [Migration](migrating.md#7071) article to keep in step with the latest version.

### New functionality

- [The ability to set the height for a separate row in the grid](desktop/resizing_rows.md#settingtherowheight)
- [The ability to resize a row in the grid by drag-and-drop](desktop/resizing_rows.md#resizingrowsbydraganddrop)
- The ability to get the height of the DOM element of the task via the [getTaskBarHeight](api/gantt_gettaskbarheight.md) method
- New events: [onBeforeRowResize](api/gantt_onbeforerowresize_event.md), [onRowResize](api/gantt_onrowresize_event.md), [onBeforeRowResizeEnd](api/gantt_onbeforerowresizeend_event.md), [onAfterRowResize](api/gantt_onafterrowresize_event.md)
- [The **onrender** callback for rendering a grid cell into DOM](desktop/specifying_columns.md#modifyingcellsafterrendering) is added
- [The **onrender** callback for rendering a custom element of the task layer into DOM](api/gantt_addtasklayer.md) is added
- [The ability to set different working hours for different time spans](desktop/working_time.md#rules_for_periods)

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

### Functionality

- [Flexible Gantt layout](desktop/layout_config.md)
- [Server-side integration with REST API](desktop/server_side.md). Check also [tutorials for various server-side platforms](desktop/howtostart_guides.md)


### Styling

- New ["Material" skin](desktop/skins.md#materialskin)


4.2
------------

<span class='release_date'>August 17, 2017. Minor update</span>

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

- Public API improvements - public helpers for [ajax](http://docs.dhtmlx.com/api__refs__dhtmlxajax.html), [environment variables](api/gantt_env_other.md)
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
