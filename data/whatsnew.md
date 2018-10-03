What's New
==========

If your current version of dhtmlxGantt is older than 2.0, check migrating.md for details of updating.

6.0 
----------

####Global

- Improved performance during [tasks reordering](desktop/reodering_tasks.md)
- Updated TypeScript definitions

####Functionality

- [Assignment of several resources to a task](desktop/resource_management.md#assigningresources) (PRO version)
- [Grouping resources in the Resource views](desktop/resource_management.md#resourceloaddiagram) (PRO version)
- Ability to get free/total slack while [calculating the critical path](desktop/critical_path.md) (PRO version)
- [Import of projects from Excel](desktop/excel.md)

#### Configuration

- [**Resources** multiselect control](desktop/resources.md) in the Lightbox for assigning resources to a task (PRO version)


####API

- New options for the [groupBy](api/gantt_groupby.md) method
- API for work with slack (free, total)
- importFromExcel()

5.2
--------------

####Functionality

- [Inline editing in Grid](desktop/inline_editing.md)
- [Splitting tasks](desktop/split_tasks.md) (PRO version)
- Updated [keyboard navigation](desktop/keyboard_navigation.md#existingshortcuts)
- [Auto Scheduling](desktop/auto_scheduling.md) performance improvements

####Configuration

- Ability to [set task types automatically](api/gantt_auto_types_config.md) (PRO version)
- Ability to [use a placeholder row](api/gantt_placeholder_task_config.md) for creating new tasks
- [Checkbox](desktop/checkbox.md) and [radio button](desktop/radio.md) controls for lightbox  
- Updated [Content Security Policy](desktop/content_security_policy.md) extension

####API

- New methods and events for [undo](desktop/undo_redo.md) and [autoscheduling](desktop/auto_scheduling.md) extensions.

5.1
----------

####Functionality

- [Resource management](desktop/resource_management.md) (PRO version)
- [RTL mode](desktop/rtl_mode.md)
- [Horizontal scroll for Grid](desktop/specifying_columns.md#horizontalscrollbar) and [other layout improvements](desktop/layout_config.md)
- [Destructors for Gantt and DataProcessor instances](desktop/multiple_gantts.md#destructorofganttanddataprocessorinstances)


####Configuration

- [Ability to set min/max widths for Grid columns](desktop/specifying_columns.md#width)
- [Ability to drag and drop projects with their subtasks](desktop/dnd.md#draggingprojectswithsubtasks) (PRO version) 
- [Extended parameters for the export methods](desktop/export_common.md)


#### API

- [Updated API events](desktop/multiselection.md#apievents) for the [Multi-Task Selection](desktop/multiselection.md) extension


#### Fixes

- Fixed issues with the keyboard navigation in the smart rendering mode


5.0
---------

####Functionality

- [Flexible Gantt layout](desktop/layout_config.md)
- [Server-side integration with REST API](desktop/server_side.md). Check also [tutorials for various server-side platforms](desktop/howtostart_guides.md)


####Styling

- New ["Material" skin](desktop/skins.md#materialskin)


4.2
------------

####Functionality

- [Work Time calendars at the task and resource levels](desktop/working_time.md#multipleworktimecalendars)
- [WBS code (outline numbers) calculation](desktop/specifying_columns.md#wbscode)
- [Autoscroll for drag and drop operations](desktop/dnd.md#autoscrollduringtasksdragging)
- [Persian (Farsi) locale is added](desktop/localization.md#predefinedlocales)

####Configuration

- [The getter function for key navigation shortcuts](api/gantt_getshortcuthandler.md) is added
- [The config for cascade deleting of nested tasks and links](api/gantt_cascade_delete_config.md) is added
- The ability to [scroll timeline horizontally on *Shift+a mouse wheel movement*](desktop/keyboard_navigation.md#builtinshortcutforhorizontaltimelinescrolling) is added
- German and Italian locales are updated
- GIF images in the Gantt skins are replaced with PNG


4.1
---------

#### Functionality

- [Keyboard navigation](desktop/keyboard_navigation.md)
- [WAI-ARIA support](desktop/accessibility.md#waiariaattributes)
- [High-contrast themes](desktop/accessibility.md#highontrastthemes)
- Updated [Auto Scheduling](desktop/auto_scheduling.md) and [Critical Path](desktop/critical_path.md) calculations (PRO version)

####Configuration

- Performance improvements for [worktime calculation](desktop/working_time.md) and [timescale rendering](desktop/performance.md)
- [Public method for unsetting worktimes](api/gantt_unsetworktime.md) added
- [API events for QuickInfo popup](api/refs/gantt_events.md) added
- [Croatian locale](desktop/localization.md#predefinedlocales) added
- [Turkish locale](desktop/localization.md#predefinedlocales) updated


4.0
---------

#### Functionality

- [Smart rendering](desktop/performance.md#smartrendering) for big datasets 
- [Undo/redo](desktop/undo_redo.md) extensions

####Configuration

- [Critical path calculation](desktop/critical_path.md) - support for [lag/lead of links](desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks) added (PRO version)
- Spanish and Chinese [locales](desktop/localization.md#predefinedlocales) updated

####API

- Public API improvements - public helpers for [ajax](http://docs.dhtmlx.com/api__refs__dhtmlxajax.html), [environment variables](api/gantt_env_other.md)  
- [Public API cleanup](migrating.md#3x40) - redundant global objects removed, conflicts with dhtmlxSuite resolved
- Public helpers for [popup messages](desktop/message_boxes.md) added



3.3
----------

#### Functionality

- Dependency [Auto Scheduling](desktop/auto_scheduling.md) feature (PRO version)
- [Fullscreen mode](desktop/fullscreen_mode.md)
- Support for [unscheduled tasks](desktop/crud_task.md#addingunscheduledtasks)
- [Backward planning](desktop/loading.md#loadingtaskdates)

#### Configuration

- Initial support for [Content Security Policy](desktop/content_security_policy.md)
- A possibility of specifying [per column Grid sorting](desktop/sorting.md#percolumngridsorting) settings
- Improved branch ordering feature - [drag-n-drop between levels](desktop/reodering_tasks.md#dragndropwithinthewholeganttstructure) 

#### API

- [REST mode for ajax loading/saving](desktop/server_side.md#savingdatafromrestserver)



3.2
----------------

#### Functionality

- [Grouping tasks](desktop/grouping.md) (PRO version)
- [Multi-task selection](desktop/multiselection.md)
- [Data export to iCal and Excel formats](desktop/excel.md)
- [Major performance improvement of work time and critical path calculations](desktop/performance.md)


#### Configuration

- [A possibility to set the range for the year selector in the lightbox](desktop/time.md#alistofproperties)


#### API

- [Events for managing available target places while re-ordering tasks](desktop/reodering_tasks.md#denyingdroppingtospecificpositions)
- [Events for managing loading process](desktop/loading.md#eventsflow)
- New samples, methods, events




3.1
----------------

#### Functionality

- Ability to drag tasks on touch devices

#### Configuration

- [Changed the default offset between the first and the last tasks on a scale](api/gantt_scale_offset_minimal_config.md)

#### Bug Fixes

- Incorrect behavior of the tooltip on expanding/collapsing of task tree
- Order of API events during Gantt initialization
- Incorrect behavior of vertical markers when Gantt is cleared or reinitialized


3.0
----------------

#### Configuration

- [Ability to map the 'Time' and 'Duration' controls to custom date properties](desktop/time.md#assigningcustomstartandenddatetimeproperties)

#### Functionality

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


#### API

- [New tree-related methods](desktop/task_tree_operations.md)

2.1
-------------

#### Global

- Updated locales
- Many bugs have been fixed

#### Configuration

- [Custom configuration of the lightbox for different task types](desktop/task_types.md#individuallightboxforeachtype)
- [Non-linear scales, ability to skip time from the scale](desktop/custom_scale.md) (PRO version)

#### Functionality

- [Milestones](desktop/milestones.md) and [Projects](desktop/task_types.md#projecttasks) support  (PRO version)
- [A possibility  to calculate the tasks' duration in work days/hours instead of calendar time](desktop/working_time.md)
- [Support for multiple Gantt charts on the page](desktop/multiple_gantts.md) (PRO version)

#### API

- Added more configurations, methods, events


2.0
-------------------------------------

#### Global

- [jQuery integration](desktop/jquery_integration.md)
- Major performance improvements
- [Ready-to-use PHP integration](desktop/server_side.md)

#### Configuration

- [Configurable multi-line scales](desktop/configuring_time_scale.md)
- [Configurable multi-column grid with optional sorting and Drag-n-Drop](desktop/reodering_tasks.md) 
- [Configurable popup form for editing tasks](desktop/edit_form.md)
- [All text elements can be defined through templates](desktop/common_configuration.md#gantttemplatesobject)
- [All date strings can be configured](desktop/common_configuration.md#ganttconfigobject)
- [All text labels can be localized](desktop/localization.md)

#### Styling

- [Default skin changed to "terrace"](desktop/skins.md#teraccedefaultskin)
- [3 new skins](desktop/skins.md)
- [Bars can have an optional inner resizer](api/gantt_drag_resize_config.md)
- [Optional UI for task creation](overview.md)
- [Vertical and horizontal lines can be colored based on custom rules](desktop/highlighting_time_slots.md)

#### Functionality

- [Loading and serialization from JSON](desktop/supported_data_formats.md#json)
- [Loading and serialization with the simplified XML format](desktop/supported_data_formats.md#xmldhtmlxgantt20)
- [3 types of task linking](api/gantt_links_config.md)
- Gantt charts work on touch devices


#### API

- [A lot of events added](api/refs/gantt.md#events)
- [Templates](api/refs/gantt.md#templates) and [configuration options](api/refs/gantt.md#properties) added
- [API simplified, it uses a single Gantt object instead of a bunch of different objects](migrating.md)
