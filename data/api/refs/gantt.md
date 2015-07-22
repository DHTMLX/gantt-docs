Gantt API 
=============




<div class='h2'>Methods</div>

{{api
- api/gantt_addlink.md - adds a new dependency link
- api/gantt_addlinklayer.md - displayes an additional layer with custom elements for a link in the timeline area
- api/gantt_addmarker.md - adds a marker to the timeline area
- api/gantt_addtask.md - adds a new task
- api/gantt_addtasklayer.md - displayes an additional layer with custom elements for a task in the timeline area
- api/gantt_attachevent.md - attaches the handler to an inner event of dhtmlxGantt
- api/gantt_autoschedule.md - recalculates the schedule of the project
- api/gantt_batchupdate.md - updates multiple tasks/links at once
- api/gantt_calculateduration.md - calculates the duration of a task
- api/gantt_calculateenddate.md - calculates the end date of a task
- api/gantt_calculatetasklevel.md - calculates the level of a task
- api/gantt_callevent.md - calls an inner event
- api/gantt_changelightboxtype.md - changes the name of the lighbox's structure defined for  of the task
- api/gantt_changelinkid.md - changes the link's id
- api/gantt_changetaskid.md - changes the task's id
- api/gantt_checkevent.md - checks whether an event has some handler(s) specified
- api/gantt_clearall.md - removes all tasks from the Gantt chart
- api/gantt_close.md - closes the branch with the specified id
- api/gantt_collapse.md - collapses gantt from the full screen mode to the normal mode
- api/gantt_correcttaskworktime.md - recalculates the task duration in the work time
- api/gantt_createtask.md - adds a new task and opens the lightbox to confirm
- api/gantt_datefrompos.md - gets the date of the specified horizontal  position in the chart area
- api/gantt_deletelink.md - deletes the specified dependency link
- api/gantt_deletemarker.md - deletes the specified marker
- api/gantt_deletetask.md - deletes the specified  task
- api/gantt_detachallevents.md - detaches all events from dhtmlxGantt (both custom and inner)
- api/gantt_detachevent.md - detaches a handler from an event (which was attached before by the attachEvent() method)
- api/gantt_eachselectedtask.md - iterates over all selected tasks in the Gantt chart
- api/gantt_eachtask.md - iterates over specified tasks in the Gantt chart
- api/gantt_expand.md - expands gantt to the full screen mode
- api/gantt_getchildren.md - returns the 1st-level child tasks of the specified parent branch
- api/gantt_getclosestworktime.md - returns the closest working time
- api/gantt_getglobaltaskindex.md - get the index of a task in the tree
- api/gantt_getgridcolumn.md - gets the configuration object of a column
- api/gantt_getgridcolumns.md - gets columns of the Gantt chart
- api/gantt_getlabel.md - gets the label of a select control in the lightbox
- api/gantt_getlastselectedtask.md - returns the id of the last selected task
- api/gantt_getlightbox.md - gets the lightbox's HTML object element
- api/gantt_getlightboxsection.md - returns the object of the lightbox's section
- api/gantt_getlightboxtype.md - returns the name of the active lighbox's structure
- api/gantt_getlightboxvalues.md - returns values of the lightbox's sections
- api/gantt_getlink.md - returns the dependency link object by the specified id
- api/gantt_getlinknode.md - returns the HTML element of the specified dependency link
- api/gantt_getlinks.md - returns all links presented in the Gantt chart
- api/gantt_getmarker.md - gets the marker's object
- api/gantt_getnext.md - returns the id of the next item (no matter what the level of nesting is: the same or different)
- api/gantt_getnextsibling.md - returns the id of the next task of the same level
- api/gantt_getparent.md - returns the id of the parent task
- api/gantt_getprev.md - returns the id of the previous item (no matter what the level of nesting is: the same or different)
- api/gantt_getprevsibling.md - returns the id of the previous task of the same level
- api/gantt_getscrollstate.md - returns the scroll position
- api/gantt_getselectedid.md - returns the id of the selected task
- api/gantt_getselectedtasks.md - returns an array of the currently selected tasks
- api/gantt_getsiblings.md - returns siblings of the specified  task (including itself)
- api/gantt_getslack.md - checks how much time (in the current duration unit) a task has before it starts to affect other tasks
- api/gantt_getstate.md - gets the current state of the Gantt chart
- api/gantt_getsubtaskdates.md - calculates the combined start/end dates of tasks nested in a project or another task
- api/gantt_gettask.md - returns the task object
- api/gantt_gettaskbytime.md - returns a collection of tasks which occur during the specified period
- api/gantt_gettaskcount.md - gets the number of tasks that are currently loaded in the gantt
- api/gantt_gettaskindex.md - get the index of a task in the branch
- api/gantt_gettasknode.md - returns the HTML element of the task bar
- api/gantt_gettaskposition.md - calculates the position and size of the task's DOM element in the timeline area
- api/gantt_gettaskrownode.md - returns the HTML element of the task row in the table
- api/gantt_gettasktop.md - gets the top position of the task's DOM element in the timeline area
- api/gantt_getvisibletaskcount.md - gets the number of tasks visible on the screen (those that are not collapsed)
- api/gantt_getworkhours.md - returns the working hours of the specified date
- api/gantt_groupby.md - groups tasks by the specified task's attribute
- api/gantt_haschild.md - checks whether the specified item has child tasks
- api/gantt_hidecover.md - hides the lightbox modal overlay that blocks interactions with the remaining screen
- api/gantt_hidelightbox.md - closes the lightbox if it's currently active
- api/gantt_hidequickinfo.md - hides the pop-up task form (if it's currently active)
- api/gantt_init.md - constructor. Initializes a dhtmlxGantt object
- api/gantt_ischildof.md - checks whether a task is a child of other task
- api/gantt_iscriticallink.md - checks whether the specified link is critical
- api/gantt_iscriticaltask.md - checks whether the specified task is critical
- api/gantt_islinkallowed.md - checks whether the specified link is correct
- api/gantt_islinkexists.md - checks whether the specified link exists
- api/gantt_isselectedtask.md - checks whether the specified task is currently selected
- api/gantt_istaskexists.md - checks whether the specified task exists
- api/gantt_istaskvisible.md - checks whether the specifies task is currently rendered in the Gantt chart
- api/gantt_isunscheduledtask.md - checks if the task is unscheduled
- api/gantt_isworktime.md - checks whether the specified date is working or not
- api/gantt_load.md - loads data to the gantt from an external data source
- api/gantt_locate.md - gets the id of a task from the specified HTML event
- api/gantt_movetask.md - moves a task to a new position
- api/gantt_open.md - opens the branch with the specified id
- api/gantt_parse.md - loads data from a client-side resource
- api/gantt_posfromdate.md - gets the relative horizontal position of the specified date in the chart area
- api/gantt_refreshdata.md - refreshes data in the Gantt chart
- api/gantt_refreshlink.md - refreshes the specifies link
- api/gantt_refreshtask.md - refreshes the task and its related links
- api/gantt_removelinklayer.md - removes the specified layer related to a link
- api/gantt_removetasklayer.md - removes the specified layer related to a task
- api/gantt_render.md - renders the whole Gantt chart
- api/gantt_rendermarkers.md - updates all markers on the page
- api/gantt_resetlightbox.md - removes the current lightbox's HTML object element
- api/gantt_resetprojectdates.md - re-calculates the duration of a project task depending on dates its childs
- api/gantt_resetskin.md - re-calculates the skin's settings from the related attached skin CSS file
- api/gantt_resizelightbox.md - forces the lightbox to resize
- api/gantt_rounddate.md - rounds the specified date to the nearest date in the time scale
- api/gantt_roundtaskdates.md - rounds the start and end task's dates to the nearest dates in the time scale
- api/gantt_scrollto.md - scrolls the Gantt container to the specified position
- api/gantt_selecttask.md - selects the specified task
- api/gantt_serialize.md - serializes the data into JSON or XML format
- api/gantt_serverlist.md - returns a list of options
- api/gantt_setparent.md - set the parent for a task
- api/gantt_setsizes.md - resizes the Gantt chart
- api/gantt_setworktime.md - sets the working time for the Gantt chart
- api/gantt_showcover.md - shows the lightbox modal overlay that blocks interactions with the remaining screen
- api/gantt_showdate.md - scrolls the chart area to makes the specified date visible
- api/gantt_showlightbox.md - opens the lightbox for the specified task
- api/gantt_showquickinfo.md - displays the pop-up task form for the specified task
- api/gantt_showtask.md - makes the specified task visible on the screen
- api/gantt_sort.md - sorts the tasks in the grid
- api/gantt_toggletaskselection.md - selects the specified task if it was unselected and vice versa
- api/gantt_unselecttask.md - removes selection from the selected task
- api/gantt_updatecollection.md - updates the specified collection with new options
- api/gantt_updatelink.md - updates the specified dependency link
- api/gantt_updatemarker.md - updates the specified marker
- api/gantt_updatetask.md - updates the specified task
}}


<div class='h2'>Events</div>


{{api
- api/gantt_onafterautoschedule_event.md - fires when autoscheduling is done
- api/gantt_onafterlightbox_event.md - fires after the user has closed the lightbox (edit form)
- api/gantt_onafterlinkadd_event.md - fires after a new link is added to the Gantt chart
- api/gantt_onafterlinkdelete_event.md - fires after the user deletes a link
- api/gantt_onafterlinkupdate_event.md - fires after the user updates a link
- api/gantt_onaftertaskadd_event.md - fires after the user adds a task to the Gantt chart
- api/gantt_onaftertaskautoschedule_event.md - fires for each task which has been autoscheduled
- api/gantt_onaftertaskdelete_event.md - fires after the user deletes a task
- api/gantt_onaftertaskdrag_event.md - fires after the user has finished to drag and released the mouse button
- api/gantt_onaftertaskmove_event.md - fires after a task was moved to a new position
- api/gantt_onaftertaskupdate_event.md - fires after the user updates a task
- api/gantt_onajaxerror_event.md - fires if the server returns an error
- api/gantt_onbeforeautoschedule_event.md - fires before auto scheduling
- api/gantt_onbeforecollapse_event.md - before gantt exits the fullscreen mode and goes back to normal mode
- api/gantt_onbeforedatarender_event.md - fires before data is rendered on the page
- api/gantt_onbeforeexpand_event.md - fires before gantt is expanded to full screen
- api/gantt_onbeforeganttready_event.md - fires before the dhtmlxGantt initialization is started
- api/gantt_onbeforeganttrender_event.md - fires before the Gantt chart is rendered on the page
- api/gantt_onbeforelightbox_event.md - fires immediately before the user opens the lightbox (edit form)
- api/gantt_onbeforelinkadd_event.md - fires before a new link is added to the Gantt chart
- api/gantt_onbeforelinkdelete_event.md - fires before the user deletes a link
- api/gantt_onbeforelinkdisplay_event.md - fires after the links have been loaded to the Gantt chart but before they are displayed
- api/gantt_onbeforelinkupdate_event.md - fires before a link is updated
- api/gantt_onbeforeparse_event.md - fires before data started to be parsed
- api/gantt_onbeforerowdragend_event.md - fires before the user drops a row in  the grid
- api/gantt_onbeforetaskadd_event.md - fires before a new task is added to the Gantt chart
- api/gantt_onbeforetaskautoschedule_event.md - fires for each task which is rescheduled
- api/gantt_onbeforetaskchanged_event.md - fires after the user has finished dragging and released the mouse button but before the changes are applied
- api/gantt_onbeforetaskdelete_event.md - fires before the user deletes a task
- api/gantt_onbeforetaskdisplay_event.md - fires after the tasks have been loaded to the Gantt chart but before they are displayed
- api/gantt_onbeforetaskdrag_event.md - fires after the user has pressed the mouse button and started dragging, but before dhtmlxGantt starts the drag-and-drop operation
- api/gantt_onbeforetaskmove_event.md - fires before a task is moved to a new position
- api/gantt_onbeforetaskselected_event.md - fires before the user selects a task
- api/gantt_onbeforetaskupdate_event.md - fires before the user updates a task
- api/gantt_oncircularlinkerror_event.md - fires when the circular reference has been detected and auto scheduling is not possible
- api/gantt_onclear_event.md - fires after all tasks were removed from the Gantt chart
- api/gantt_oncollapse_event.md - fires when gantt went back to normal mode from the full screen mode
- api/gantt_oncolumnresize_event.md - fires when the user is dragging the column's border to resize the column
- api/gantt_oncolumnresizeend_event.md - fires after the user finished dragging the column's border to resize the column
- api/gantt_oncolumnresizestart_event.md - fires before the user starts to drag the column's border to resize the column
- api/gantt_oncontextmenu_event.md - occurs when the user clicks the right mouse button inside the Gantt chart
- api/gantt_ondatarender_event.md - fires after data was rendered on the page
- api/gantt_onemptyclick_event.md - fires when the user clicks on an empty space in the Gantt chart (not on tasks)
- api/gantt_onexpand_event.md - fires when gantt is expended to full screen
- api/gantt_onganttready_event.md - fires after the dhtmlxGantt initialization is complete but the Gantt chart is not rendered on the page yet.
- api/gantt_onganttrender_event.md - fires after the Gantt chart was rendered on the page
- api/gantt_onganttscroll_event.md - fires when the Gantt chart is scrolled to a particular point
- api/gantt_ongridheaderclick_event.md - fires when the user clicks on the grid's header
- api/gantt_ongridresize_event.md - fires when the user is dragging the grid's border to resize the grid
- api/gantt_ongridresizeend_event.md - fires after the user finished dragging the grid's border to resize the grid
- api/gantt_ongridresizestart_event.md - fires before the user starts to drag the grid's border to resize the grid
- api/gantt_onlightbox_event.md - fires after the user has opened the lightbox (edit form)
- api/gantt_onlightboxbutton_event.md - fires when the user clicks on a custom button in the lightbox
- api/gantt_onlightboxcancel_event.md - fires when the user clicks on the 'Cancel' button in the lightbox
- api/gantt_onlightboxchange_event.md - fires when the structure of the lightbox is changed
- api/gantt_onlightboxdelete_event.md - fires when the user clicks on the 'Delete' button in the lightbox
- api/gantt_onlightboxsave_event.md - fires when the user clicks on the 'Save' button in the lightbox
- api/gantt_onlinkclick_event.md - fires when the user clicks on a link
- api/gantt_onlinkdblclick_event.md - fires when the user double clicks on a link
- api/gantt_onlinkidchange_event.md - fires when the id of a link is changed
- api/gantt_onlinkvalidation_event.md - fires when the user adds a new link and dhtmlxGantt checks whether the link is valid
- api/gantt_onloadend_event.md - fires after loading data from the data source has been complete
- api/gantt_onloadstart_event.md - fires immediately before loading data from the data source has been started
- api/gantt_onmousemove_event.md - fires when the mouse is moved over a task bar
- api/gantt_onoptionsload_event.md - fires after a collection of options has been loaded from the server, but isn't parsed yet
- api/gantt_onparse_event.md - fires after data was parsed (became available for API) but before it was rendered in the Gantt chart
- api/gantt_onrowdragend_event.md - fires after the user drops a row in the grid
- api/gantt_onrowdragstart_event.md - fires before the user drags a row of the grid
- api/gantt_onscaleadjusted_event.md - fires when the scale is re-rendered in order to display all tasks completely
- api/gantt_onscaleclick_event.md - fires when the user clicks on the cell in the time scale
- api/gantt_ontaskclick_event.md - fires when the user clicks on a task row in the  grid area (including the 'expand/collapse' and 'add task' buttons) or on a task bar in the timeline area
- api/gantt_ontaskclosed_event.md - fires when a branch has been closed
- api/gantt_ontaskcreated_event.md - fires when user creates a new task by pressing '+' button in a grid, and also when the api/gantt_createtask.md method is called
- api/gantt_ontaskdblclick_event.md - fires when the user double clicks on a task
- api/gantt_ontaskdrag_event.md - fires when the user drags a task
- api/gantt_ontaskidchange_event.md - fires when the id of a task is changed
- api/gantt_ontaskloading_event.md - fires when a task is being loaded from the data source
- api/gantt_ontaskopened_event.md - fires when a branch has been opened
- api/gantt_ontaskrowclick_event.md - fires when the user clicks on a row in the table
- api/gantt_ontaskselected_event.md - fires when the user selects a task
- api/gantt_ontaskunselected_event.md - fires when the user unselects a task by selecting some other task
- api/gantt_ontemplatesready_event.md - fires when the dhtmlxGantt templates are initialized
}}


<div class='h2'>Properties</div>

{{api
- api/gantt_api_date_config.md - sets the date format for addTask() method to
- api/gantt_auto_scheduling_config.md - enables auto scheduling
- api/gantt_auto_scheduling_initial_config.md - defines whether gantt will do autoscheduling on data loading
- api/gantt_auto_scheduling_strict_config.md - enables the auto scheduling mode, in which tasks will always be rescheduled to the earliest possible date
- api/gantt_autofit_config.md - enables automatic adjusting of the grid's columns to the grid's width
- api/gantt_autosize_config.md - forces the Gantt chart to automatically change its size to show all tasks without scrolling
- api/gantt_autosize_min_width_config.md - sets the minimum width (in pixels) that the Gantt chart can take in the horizontal 'autosize' mode
- api/gantt_branch_loading_config.md - enables the dynamic loading in the Gantt chart
- api/gantt_buttons_left_config.md - stores a collection of buttons resided in the left bottom corner of the lightbox
- api/gantt_buttons_right_config.md - stores a collection of buttons resided in the right bottom corner of the lightbox
- api/gantt_columns_config.md - configures the columns of the table
- api/gantt_correct_work_time_config.md - enables adjusting the task's start and end dates to the work time (while dragging)
- api/gantt_date_grid_config.md - sets the format of dates in the "Start time" column of the table
- api/gantt_date_scale_config.md - sets the format of the time scale (X-Axis)
- api/gantt_details_on_create_config.md - 'says' to open the lightbox while creating new events by clicking on the '+' button
- api/gantt_details_on_dblclick_config.md - 'says' to open the lightbox after double clicking on a task
- api/gantt_drag_lightbox_config.md - enables the possibility to drag the lightbox by the header
- api/gantt_drag_links_config.md - enables creating dependency links by drag-and-drop
- api/gantt_drag_mode_config.md - stores the types of available drag-and-drop modes
- api/gantt_drag_move_config.md - enables the possibility to move tasks by drag-and-drop
- api/gantt_drag_progress_config.md - enables the possibility to change the task progress by dragging the progress knob
- api/gantt_drag_resize_config.md - enables the possibility to resize tasks by drag-and-drop
- api/gantt_duration_step_config.md - sets the number of 'gantt.config.duration_unit' units that will correspond to one  unit of the 'duration' data property.
- api/gantt_duration_unit_config.md - sets the duration unit
- api/gantt_editable_property_config.md - changes the name of a property that affects the editing ability  of tasks/links in the read-only Gantt chart
- api/gantt_end_date_config.md - sets the  end value of the time scale
- api/gantt_fit_tasks_config.md - 'says' the Gantt chart to re-render the scale each time a task doesn't fit into the existing scale interval
- api/gantt_grid_resize_config.md - makes the grid resizable by dragging the right grid's border
- api/gantt_grid_resizer_attribute_config.md - sets the name of the attribute  of the grid resizer's  DOM element
- api/gantt_grid_resizer_column_attribute_config.md - sets the name of the attribute  of the column resizer's  DOM element. The attribute presents the column's index
- api/gantt_grid_width_config.md - sets the maximum width of the grid
- api/gantt_highlight_critical_path_config.md - shows the critical path in the chart
- api/gantt_inherit_scale_class_config.md - specifies whether sub-scales shall use the scale_cell_class template by default
- api/gantt_initial_scroll_config.md - sets whether the timeline area will be initially scrolled to display the earliest task
- api/gantt_keep_grid_width_config.md - 'says' to preserve the initial grid's width during resizing the columns within
- api/gantt_layer_attribute_config.md - sets the name of the attribute of the task layer's DOM element
- api/gantt_lightbox_config.md - specifies the lightbox object
- api/gantt_lightbox_additional_height_config.md - increases the height of the lightbox
- api/gantt_link_arrow_size_config.md - sets the size of the link arrow
- api/gantt_link_attribute_config.md - sets the name of the attribute that will specify the id of the link's HTML element
- api/gantt_link_line_width_config.md - sets the width of dependency links in the timeline area
- api/gantt_link_wrapper_width_config.md - sets the width of the area (over the link) sensitive to clicks
- api/gantt_links_config.md - stores the types of links dependencies
- api/gantt_min_column_width_config.md - sets the minimum width for a column in the timeline area
- api/gantt_min_duration_config.md - sets the minimum step (in milliseconds) for task's time values
- api/gantt_min_grid_column_width_config.md - sets the minumum width for the grid (in pixels) while being resized
- api/gantt_multiselect_config.md - enables/disables multi-task selection in the Gantt chart
- api/gantt_multiselect_one_level_config.md - specifies whether multi-task selection will be available within one or any level
- api/gantt_open_tree_initially_config.md - openes all branches initially
- api/gantt_order_branch_config.md - activates the 'branch' mode that allows dragging tasks only within the parent branch
- api/gantt_order_branch_free_config.md - activates the 'branch' mode that allows dragging tasks within the whole gantt
- api/gantt_preserve_scroll_config.md - preserves the current position of the vertical and horizontal scrolls while re-drawing the gantt chart
- api/gantt_prevent_default_scroll_config.md - specifies whether the gantt container should block the mousewheel event, or should it be propagated up to the window element
- api/gantt_quick_info_detached_config.md - defines whether the task form will appear from the left/right side of the screen or near the selected task
- api/gantt_quickinfo_buttons_config.md - stores a collection of buttons resided in the pop-up task's details form
- api/gantt_readonly_config.md - activates the read-only mode for the Gantt chart
- api/gantt_readonly_property_config.md - changes the name of a property that affects the read-only behaviour of tasks/links
- api/gantt_root_id_config.md - sets the id of the virtual root element
- api/gantt_round_dnd_dates_config.md - enables rounding the task's start and end dates to the nearest scale marks
- api/gantt_row_height_config.md - sets the default height for rows of the table
- api/gantt_scale_height_config.md - sets the height of the time scale and the header of the grid
- api/gantt_scale_offset_minimal_config.md - sets the minimal scale unit (in case multiple scales are used) as the interval of leading/closing empty space
- api/gantt_scale_unit_config.md - sets the unit of the time scale (X-Axis)
- api/gantt_scroll_on_click_config.md - specifies whether the timeline area shall be scrolled while selecting to display the selected task
- api/gantt_select_task_config.md - enables selection of tasks in the Gantt chart
- api/gantt_server_utc_config.md - enables converting server-side dates from UTC to a local time zone (and backward) while sending data to the server
- api/gantt_show_chart_config.md - shows the chart (timeline) area of the Gantt chart
- api/gantt_show_errors_config.md - enables showing error alerts in case of unexpected behavior
- api/gantt_show_grid_config.md - shows the grid area of the Gantt chart
- api/gantt_show_links_config.md - enables/disables displaying links in the Gantt chart
- api/gantt_show_markers_config.md - shows/hides markers on the page
- api/gantt_show_progress_config.md - enables showing a progress/spinner while data is loading
- api/gantt_show_quick_info_config.md - activates/disables the 'quick_info' extension (pop-up task's details form)
- api/gantt_show_task_cells_config.md - enables/disables displaying column borders in the chart area
- api/gantt_show_unscheduled_config.md - enables showing unscheduled tasks
- api/gantt_skip_off_time_config.md - hides non-working time from the time scale
- api/gantt_sort_config.md - enables sorting in the table
- api/gantt_start_date_config.md - sets the start value of the time scale
- api/gantt_start_on_monday_config.md - sets the start day of weeks
- api/gantt_static_background_config.md - generates a background image for the timeline area instead of rendering actual columns' and rows' lines
- api/gantt_step_config.md - sets the step of the time scale (X-Axis)
- api/gantt_subscales_config.md - specifies the second time scale(s)
- api/gantt_task_attribute_config.md - sets the name of the attribute that will specify the id of the task's HTML element
- api/gantt_task_date_config.md - sets the format of the date label in the 'Time period' section of the lightbox
- api/gantt_task_height_config.md - sets the height of task bars in the timeline area
- api/gantt_task_scroll_offset_config.md - sets the offset (in pixels) of the nearest task from the left border in the timeline
- api/gantt_time_picker_config.md - sets the format of the time drop-down selector in the lightbox
- api/gantt_time_step_config.md - sets the minimum step (in minutes) for the task's time values
- api/gantt_tooltip_hide_timeout_config.md - sets the length of time, in milliseconds, before the tooltip hides
- api/gantt_tooltip_offset_x_config.md - sets the  the right (if positive) offset of the tooltip's position
- api/gantt_tooltip_offset_y_config.md - sets the  the top (if positive) offset of the tooltip's position
- api/gantt_tooltip_timeout_config.md - sets the timeout in milliseconds before the tooltip is displayed for a task
- api/gantt_touch_config.md - enables/disables the touch support for the Gantt chart
- api/gantt_touch_drag_config.md - defines the time period in milliseconds that is used to differ the long touch gesture from the scroll gesture
- api/gantt_touch_feedback_config.md - enables/disables vibration while moving tasks on touch devices
- api/gantt_type_renderers_config.md - redefines functions responsible for displaying different types of tasks
- api/gantt_types_config.md - stores the names of lightbox's structures (used for different types of tasks)
- api/gantt_work_time_config.md - enables calculating the duration of tasks in working time instead of calendar time
- api/gantt_xml_date_config.md - sets the date format that is used to parse data from the data set
}}



<div class='h2'>Templates</div>

{{api
- api/gantt_api_date_template.md - specifies the format of dates that are set by means of API methods. Used to parse incoming dates
- api/gantt_date_grid_template.md - specifies the template of start date or end date columns in grid
- api/gantt_date_scale_template.md - specifies the date format of the time scale (X-Axis)
- api/gantt_drag_link_template.md - specifies the text of tooltips that are displayed when the user creates a new dependency link
- api/gantt_drag_link_class_template.md - specifies the CSS class that will be applied to the link receiver (pop-up circle near the task bar)
- api/gantt_grid_blank_template.md - specifies the custom content inserted before the labels of child items in the tree column
- api/gantt_grid_date_format_template.md - specifies the format of dates in the "Start time" column
- api/gantt_grid_file_template.md - specifies the icon of child items in the tree column
- api/gantt_grid_folder_template.md - specifies the icon of parent items in the tree column
- api/gantt_grid_header_class_template.md - specifies the CSS class that will be applied to the headers of the table's columns
- api/gantt_grid_indent_template.md - specifies the indent  of the child items in a branch (in the tree column)
- api/gantt_grid_open_template.md - specifies the icon of the open/close sign in the tree column
- api/gantt_grid_row_class_template.md - specifies the CSS class that will be applied to a grid row
- api/gantt_link_class_template.md - specifies the CSS class that will be applied to a link
- api/gantt_link_description_template.md - specifies the text in the header of the link's "delete" confirm window
- api/gantt_progress_text_template.md - specifies the text in the completed part of the task bar
- api/gantt_quick_info_class_template.md - specifies the CSS class that will be applied to  the pop-up edit form
- api/gantt_quick_info_content_template.md - specifies the content of the pop-up edit form
- api/gantt_quick_info_date_template.md - specifies the date of the pop-up edit form
- api/gantt_quick_info_title_template.md - specifies the title of the pop-up edit form
- api/gantt_scale_cell_class_template.md - specifies the CSS class that will be applied to cells of the time scale of the timeline area
- api/gantt_scale_row_class_template.md - specifies the CSS class that will be applied to the time scale
- api/gantt_task_cell_class_template.md - specifies the CSS class that will be applied to the cells of the timeline area
- api/gantt_task_class_template.md - specifies the CSS class that will be applied to task bars
- api/gantt_task_date_template.md - specifies the date format of the label in the 'Time period' section of the lightbox
- api/gantt_task_row_class_template.md - specifies the CSS class that will be applied to the row of the timeline area
- api/gantt_task_text_template.md - specifies the text in the task bars and the header of the lightbox
- api/gantt_task_time_template.md - specifies the date period in the header of the lightbox
- api/gantt_task_unscheduled_time_template.md - specifies the dates of unscheduled tasks
- api/gantt_time_picker_template.md - specifies the format of the drop-down time selector in the lightbox
- api/gantt_tooltip_date_format_template.md - specifies the format of start and end dates displayed in the tooltip
- api/gantt_tooltip_text_template.md - specifies the text of tooltips
- api/gantt_xml_date_template.md - a string from an XML file is converted into a date object in conformity with this template
- api/gantt_xml_format_template.md - a date object is converted into a string in conformity with this template. Used to send data back to the server
- api/gantt_rightside_text_template.md - specifies the text assigned to tasks bars on the right side
- api/gantt_leftside_text_template.md - specifies the text assigned to tasks bars on the left side
- api/gantt_lightbox_header_template.md - specifies the lightbox's header
}}




<div class='h2'>Other</div>


{{api
- api/gantt_$click_other.md - redefines the default click behavior for buttons of the Gantt chart
- api/gantt_config_other.md - defines configuration options for dates, scale, controls
- api/gantt_date_other.md - a set of date formatting methods
- api/gantt_json_other.md - specifies JSON serialization and parsing
- api/gantt_keys_other.md - defines the hot keys for the Gantt chart
- api/gantt_locale_other.md - a locale object (region-specific labels) of the Gantt chart
- api/gantt_oldxml_other.md - specifies serialization and parsing in the XML format of dhtmlxGantt 1.0
- api/gantt_skin_other.md - returns the current skin of the Gantt chart
- api/gantt_skins_other.md - returns objects of the available skins
- api/gantt_templates_other.md - defines formatting templates for dates, titles, tooltips in the Gantt chart
- api/gantt_version_other.md - returns the version of dhtmlxGantt
- api/gantt_xml_other.md - specifies XML serialization and parsing
}}


@index:
- api/refs/gantt_methods.md
- api/refs/gantt_props.md
- api/refs/gantt_events.md
- api/refs/gantt_templates.md
- api/refs/gantt_others.md
