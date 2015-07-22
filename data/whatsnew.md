What's new
==========

If your current version of dhtmlxGantt is older than 2.0, check migrating.md for details of updating.

3.3
----------
#### Functionality
- Dependency [Auto Scheduling](desktop/auto_scheduling.md) feature *
- [Fullscreen mode](desktop/fullscreen_mode.md)
- Support for [unscheduled tasks](desktop/crud_task.md#addingunscheduledtasks)
- [Backward planning](desktop/loading.md#loadingtaskdates)

#### Configuration
- Initial support for [Content Security Policy](desktop/content_security_policy.md)
- A possibility of specifying [per column grid sorting](desktop/sorting.md#percolumngridsorting) settings
- Improved branch ordering feature - [D'n'D between levels](desktop/reodering_tasks.md#dragndropwithinthewholeganttstructure) 

#### API
- [REST mode for ajax loading/saving](desktop/server_side.md#savingdatafromrestserver)

&#42; The marked functionality requires Commercial or Enterprise license, and not provided under GPL


3.2
----------------

#### Functionality
- [Grouping tasks](desktop/grouping.md)
- [Multi-task selection](desktop/multiselection.md)
- [Data export to iCal and Excel formats](desktop/excel.md)
- [Major performance improvement of worktime and critical path calculations](desktop/performance.md)

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

#### Bug fixes
- Incorrect behavior of the tooltip on expanding/collapsing of task tree
- Order of API events during gantt initialization
- Incorrect behavior of vertical markers when gantt is cleared or reinitialized


3.0
----------------

#### Configuration
- [Ability to map the 'Time' and 'Duration' controls to custom date propeties](desktop/time.md#assigningcustomstartandenddatetimeproperties)
#### Functionality
- [Dynamic loading](desktop/performance.md)
- [A possibility to resize columns and the whole grid by drag-&-dropping](desktop/specifying_columns.md)
- [A possibility to hide/show columns dynamically](desktop/specifying_columns.md#hidingshowingcolumns)
- [A possibility to display additional elements in the timeline area](desktop/baselines.md)
- [Support for the critical path](desktop/critical_path.md)
- [New possibilities for the read-only mode](desktop/readonly_mode.md)
- [Today's and other vertical markers](desktop/markers.md)
- [A possibility to completely redefine rendering of different task types (projects, milestones, etc.)](desktop/baselines.md#definingacustomdisplayfordifferenttasktypes)
- [Styling tasks through special data properties](desktop/colouring_tasks.md#specifyingstyleinthepropertiesofthetaskobject) 
- [Styling links through special data properties](desktop/colouring_lines.md#specifyingcolorinthepropertiesofthelinkobject) 


#### API
- [New tree-related methods](desktop/task_tree_operations.md)

2.1
-------------

#### Global
- Updated locales.
- Many bugs has been fixed

#### Configuration
- [Custom configuration of the lightbox for different task types](desktop/task_types.md#individuallightboxforeachtype)
- [Non-linear scales, ability to skip time from the scale](desktop/custom_scale.md)

#### Functionality
- [Milestones](desktop/milestones.md) and [Projects](desktop/task_types.md#projecttasks) support
- [A possibility  to calculate the tasks' duration in work days/hours instead of calendar time](desktop/working_time.md)
- [Support for multiple Gantt charts on the page (requires PRO version)](desktop/multiple_gantts.md)

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

- [A LOT of events added](api/refs/gantt.md#events)
- [Templates](api/refs/gantt.md#templates) and [configuration options](api/refs/gantt.md#properties) added
- [API simplified, it uses a single gantt object instead of a bunch of different objects](migrating.md)
