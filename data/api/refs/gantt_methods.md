
Methods
=======

{{api
- api/gantt_promise.md - Promise object constructor
- api/gantt_addcalendar.md - adds a calendar into Gantt
- api/gantt_addlink.md - adds a new dependency link
- api/gantt_addlinklayer.md - displays an additional layer with custom elements for a link in the timeline area
- api/gantt_addmarker.md - adds a marker to the timeline area
- api/gantt_addshortcut.md - adds a new keyboard shortcut
- api/gantt_addtask.md - adds a new task
- api/gantt_addtasklayer.md - displays an additional layer with custom elements for a task in the timeline area
- api/gantt_adjusttaskheightforbaselines.md - adjusts the task's row height for proper display of baseline elements
- api/gantt_alert.md - calls an alert message box
- api/gantt_assert.md - if the specified expression is false, an errorMessage is shown in the red popup at the top right corner of the screen
- api/gantt_attachevent.md - attaches the handler to an inner event of dhtmlxGantt
- api/gantt_autoschedule.md - recalculates the schedule of the project
- api/gantt_batchupdate.md - updates multiple tasks/links at once
- api/gantt_bind.md - creates a new function that, when called, has its <i>this</i> keyword set to the provided value
- api/gantt_calculateduration.md - calculates the duration of a task
- api/gantt_calculateenddate.md - calculates the end date of a task
- api/gantt_calculatetasklevel.md - calculates the level of nesting of a task
- api/gantt_callevent.md - calls an inner event
- api/gantt_changelightboxtype.md - repaints the lighbox for the task according to its type
- api/gantt_changelinkid.md - changes the link's id
- api/gantt_changetaskid.md - changes the task's id
- api/gantt_checkevent.md - checks whether an event has some handler(s) specified
- api/gantt_clearall.md - removes all tasks and additional elements (including markers) from the Gantt chart
- api/gantt_clearredostack.md - clears the stack of stored redo commands
- api/gantt_clearundostack.md - clears the stack of stored undo commands
- api/gantt_close.md - closes the branch with the specified id
- api/gantt_collapse.md - collapses gantt from the full screen mode to the normal mode
- api/gantt_columnindexbydate.md - returns the index of the column by the date
- api/gantt_confirm.md - calls a confirm message box
- api/gantt_copy.md - creates a deep copy of provided object
- api/gantt_correcttaskworktime.md - recalculates the task duration in the work time
- api/gantt_createcalendar.md - creates a working calendar
- api/gantt_createdataprocessor.md - creates a new dataProcessor instance and attaches it to gantt
- api/gantt_createdatastore.md - creates a datastore according to the provided configuration
- api/gantt_createtask.md - adds a new task and opens the lightbox to confirm
- api/gantt_dataprocessor.md - dataProcessor constructor
- api/gantt_datefrompos.md - gets the date of the specified horizontal  position in the chart area
- api/gantt_defined.md - returns false if the provided argument is undefined, otherwise true
- api/gantt_deletecalendar.md - deletes a task calendar by its id
- api/gantt_deletelink.md - deletes the specified dependency link
- api/gantt_deletemarker.md - deletes the specified marker
- api/gantt_deletetask.md - deletes the specified  task
- api/gantt_destructor.md - destroys the gantt instance
- api/gantt_detachallevents.md - detaches all events from dhtmlxGantt (both custom and inner ones)
- api/gantt_detachevent.md - detaches a handler from an event (which was attached before by the attachEvent() method)
- api/gantt_eachparent.md - iterates over all parent tasks of the specified task in the Gantt chart
- api/gantt_eachselectedtask.md - iterates over all selected tasks in the Gantt chart
- api/gantt_eachtask.md - iterates over all child tasks of a specific task or the of whole Gantt chart
- api/gantt_event.md - attaches an event handler to an HTML element
- api/gantt_eventremove.md - removes an event handler from an HTML element
- api/gantt_expand.md - expands gantt to the full screen mode
- api/gantt_exporttoexcel.md - exports data from the Gantt chart to an Excel document
- api/gantt_exporttoical.md - exports data from the Gantt chart to an iCal string
- api/gantt_exporttojson.md - exports the structure and data of a Gantt chart into a JSON object
- api/gantt_exporttomsproject.md - exports data from the Gantt chart to MS Project
- api/gantt_exporttopdf.md - exports a Gantt chart into the PDF format
- api/gantt_exporttopng.md - exports a Gantt chart into the PNG format
- api/gantt_exporttoprimaverap6.md - exports data from the Gantt chart to Primavera P6
- api/gantt_findcycles.md - returns all dependency loops in the chart
- api/gantt_focus.md - sets focus on the gantt
- api/gantt_getcalendar.md - gets worktime calendar by id
- api/gantt_getcalendars.md - gets all the calendars added into Gantt
- api/gantt_getchildren.md - returns the 1st-level child tasks of the specified parent branch
- api/gantt_getclosestworktime.md - returns the closest working time
- api/gantt_getcolumnindex.md - returns the index of the column by its name
- api/gantt_getconnectedgroup.md - returns all tasks and links that a task is connected with
- api/gantt_getconstraintlimitations.md - returns the earliest and latest dates allowed by the constraint applied to a task
- api/gantt_getconstrainttype.md - returns the constraint type applied to the task
- api/gantt_getdatastore.md - returns the configuration object of a datastore
- api/gantt_getfreeslack.md - returns the free slack of a task
- api/gantt_getglobaltaskindex.md - gets the index of a task in the tree
- api/gantt_getgridcolumn.md - gets the configuration object of a column
- api/gantt_getgridcolumns.md - gets columns of the Gantt chart
- api/gantt_getlabel.md - gets the label of a select control in the lightbox
- api/gantt_getlastselectedtask.md - returns the id of the last selected task
- api/gantt_getlayoutview.md - returns the object of the layout view by its name
- api/gantt_getlightbox.md - gets the lightbox's HTML object element
- api/gantt_getlightboxsection.md - returns the object of the lightbox's section
- api/gantt_getlightboxtype.md - returns the name of the active lighbox's structure
- api/gantt_getlightboxvalues.md - returns values of the lightbox's sections
- api/gantt_getlink.md - returns the dependency link object by the specified id
- api/gantt_getlinkcount.md - returns the number of all dependency links presented in the Gantt chart
- api/gantt_getlinknode.md - returns the HTML element of the specified dependency link
- api/gantt_getlinks.md - returns all links presented in the Gantt chart
- api/gantt_getmarker.md - gets the marker's object
- api/gantt_getnext.md - returns the id of the next item (no matter what the level of nesting is: the same or different)
- api/gantt_getnextsibling.md - returns the id of the next task of the same level
- api/gantt_getparent.md - returns the id of the parent task
- api/gantt_getprev.md - returns the id of the previous item (no matter what the level of nesting is: the same or different)
- api/gantt_getprevsibling.md - returns the id of the previous task of the same level
- api/gantt_getredostack.md - returns the stack of stored redo user actions
- api/gantt_getresourceassignments.md - returns all tasks assigned to the resource
- api/gantt_getresourcecalendar.md - returns a calendar which the resource is assigned to
- api/gantt_getscale.md - returns the configuration of the time scale
- api/gantt_getscrollstate.md - returns the scroll position
- api/gantt_getselectedid.md - returns the id of the selected task
- api/gantt_getselectedtasks.md - returns an array of the currently selected tasks
- api/gantt_getshortcuthandler.md - gets a key navigation shortcut handler
- api/gantt_getsiblings.md - returns siblings of the specified  task (including itself)
- api/gantt_getslack.md - checks how much time (in the current duration unit) a task has before it starts to affect other tasks
- api/gantt_getstate.md - gets the current state of the Gantt chart
- api/gantt_getsubtaskdates.md - calculates the combined start/end dates of tasks nested in a project or another task
- api/gantt_getsubtaskduration.md - calculates the combined duration of tasks nested in a project or another task.
- api/gantt_gettask.md - returns the task object
- api/gantt_gettaskassignments.md - returns the parsed resource assignments of a specific task from the datastore
- api/gantt_gettaskbarheight.md - returns the height (in pixels) of the DOM element of the task
- api/gantt_gettaskbaselines.md - returns an array of baselines of a specific task from the datastore
- api/gantt_gettaskby.md - finds a task by the specified criteria
- api/gantt_gettaskbyindex.md - returns a task by its global task index
- api/gantt_gettaskbytime.md - returns a collection of tasks which occur during the specified period
- api/gantt_gettaskbywbscode.md - returns a task by its WBS code
- api/gantt_gettaskcalendar.md - gets a calendar assigned to the specified task (a task level calendar)
- api/gantt_gettaskcount.md - gets the number of tasks that are currently loaded in the gantt
- api/gantt_gettaskheight.md - returns the visible height of a task
- api/gantt_gettaskindex.md - gets the index of a task in the branch
- api/gantt_gettasknode.md - returns the HTML element of the task bar
- api/gantt_gettaskposition.md - calculates the position and size of the task's DOM element in the timeline area
- api/gantt_gettaskresources.md - returns the array of unique resources assigned to a specific task from the datastore
- api/gantt_gettaskrownode.md - returns the HTML element of the task row in the table
- api/gantt_gettasktop.md - gets the top position of the task's DOM element in the timeline area
- api/gantt_gettasktype.md - returns the type of a task
- api/gantt_gettotalslack.md - returns the total slack of a task
- api/gantt_getundostack.md - returns the stack of stored undo user actions
- api/gantt_getvisibletaskcount.md - gets the number of tasks visible on the screen (those that are not collapsed)
- api/gantt_getwbscode.md - returns the WBS code (the outline number) of a task
- api/gantt_getworkhours.md - returns the working hours of the specified date
- api/gantt_groupby.md - groups tasks by the specified task's attribute
- api/gantt_haschild.md - returns the number of child task(s)
- api/gantt_hidecover.md - hides the lightbox modal overlay that blocks interactions with the remaining screen
- api/gantt_hidelightbox.md - closes the lightbox if it's currently active
- api/gantt_hidequickinfo.md - hides the pop-up task form (if it's currently active)
- api/gantt_importfromexcel.md - converts an Excel file to JSON
- api/gantt_importfrommsproject.md - converts an XML or MPP MS Project file to JSON
- api/gantt_importfromprimaverap6.md - converts an XML or XER Primavera P6 file to JSON
- api/gantt_init.md - initializes a dhtmlxGantt inside a container
- api/gantt_ischildof.md - checks whether a task is a child of a different task
- api/gantt_iscircularlink.md - checks whether the link is circular
- api/gantt_iscriticallink.md - checks whether the specified link is critical
- api/gantt_iscriticaltask.md - checks whether the specified task is critical
- api/gantt_islinkallowed.md - checks whether the specified link is correct
- api/gantt_islinkexists.md - checks whether the specified link exists
- api/gantt_isreadonly.md - checks whether the specified task/link, or the whole Gantt is read-only
- api/gantt_isselectedtask.md - checks whether the specified task is currently selected
- api/gantt_issplittask.md - checks whether the specified task is split
- api/gantt_issummarytask.md - checks whether the specified task is summary
- api/gantt_istaskexists.md - checks whether the specified task exists
- api/gantt_istaskvisible.md - checks whether the specifies task is currently rendered in the Gantt chart
- api/gantt_isunscheduledtask.md - checks if the task is unscheduled
- api/gantt_isworktime.md - checks whether the specified date is working or not
- api/gantt_load.md - loads data to the gantt from an external data source
- api/gantt_locate.md - gets the id of a task from the specified HTML event
- api/gantt_mergecalendars.md - merges several working calendars into one
- api/gantt_message.md - calls a message box of the specified type
- api/gantt_mixin.md - adds properties of the 'source' object into the 'target' object
- api/gantt_modalbox.md - calls a modalbox
- api/gantt_movetask.md - moves a task to a new position
- api/gantt_open.md - opens the branch with the specified id
- api/gantt_parse.md - loads data from a client-side resource
- api/gantt_plugins.md - activates the specified extensions
- api/gantt_posfromdate.md - gets the relative horizontal position of the specified date in the chart area
- api/gantt_redo.md - applies the reverted changes to the gantt once again
- api/gantt_refreshdata.md - refreshes data in the Gantt chart
- api/gantt_refreshlink.md - refreshes the specifies link
- api/gantt_refreshtask.md - refreshes the task and its related links
- api/gantt_removelinklayer.md - removes the specified layer related to a link
- api/gantt_removeshortcut.md - removes a keyboard shortcut
- api/gantt_removetasklayer.md - removes the specified layer related to a task
- api/gantt_render.md - renders the whole Gantt chart
- api/gantt_rendermarkers.md - updates all markers on the page
- api/gantt_resetlayout.md - rebuilds the Gantt layout using the current value of the layout config
- api/gantt_resetlightbox.md - removes the current lightbox's HTML object element
- api/gantt_resetprojectdates.md - re-calculates the duration of a project task depending on the dates of its children
- api/gantt_resetskin.md - re-calculates the skin's settings from the related attached skin CSS file
- api/gantt_resizelightbox.md - forces the lightbox to resize
- api/gantt_rounddate.md - rounds the specified date to the nearest date in the time scale
- api/gantt_roundtaskdates.md - rounds the start and end task's dates to the nearest dates in the time scale
- api/gantt_scrolllayoutcell.md - scrolls the layout view to the specified position
- api/gantt_scrollto.md - scrolls the Gantt container to the specified position
- api/gantt_selecttask.md - selects the specified task
- api/gantt_serialize.md - serializes the data into JSON or XML format
- api/gantt_serverlist.md - returns a list of options
- api/gantt_setparent.md - set the parent for a task
- api/gantt_setsizes.md - resizes the Gantt chart
- api/gantt_setskin.md - sets the active skin
- api/gantt_setworktime.md - sets the working time for the Gantt chart
- api/gantt_showcover.md - shows the lightbox modal overlay that blocks interactions with the remaining screen
- api/gantt_showdate.md - scrolls the chart area to makes the specified date visible
- api/gantt_showlightbox.md - opens the lightbox for the specified task
- api/gantt_showquickinfo.md - displays the pop-up task form for the specified task
- api/gantt_showtask.md - makes the specified task visible on the screen
- api/gantt_silent.md - makes all code inside it not to trigger internal events or server-side calls
- api/gantt_sort.md - sorts tasks in the grid
- api/gantt_toggletaskselection.md - selects the specified task if it was unselected and vice versa
- api/gantt_uid.md - returns a unique id
- api/gantt_undo.md - reverts the changes made in the gantt
- api/gantt_unselecttask.md - removes selection from the selected task
- api/gantt_unsetworktime.md - unsets a working time in the Gantt Chart
- api/gantt_updatecollection.md - updates the specified collection with new options
- api/gantt_updatelink.md - updates the specified dependency link
- api/gantt_updatemarker.md - updates the specified marker
- api/gantt_updatetask.md - updates the specified task
- api/gantt_updatetaskassignments.md - updates the resource property of the task object with the values of the resource assignments from the datastore
}}

@index:
- api/gantt_promise.md
- api/gantt_addcalendar.md
- api/gantt_addlink.md
- api/gantt_addlinklayer.md
- api/gantt_addmarker.md
- api/gantt_addshortcut.md
- api/gantt_addtask.md
- api/gantt_addtasklayer.md
- api/gantt_adjusttaskheightforbaselines.md
- api/gantt_alert.md
- api/gantt_assert.md
- api/gantt_attachevent.md
- api/gantt_autoschedule.md
- api/gantt_batchupdate.md
- api/gantt_bind.md
- api/gantt_calculateduration.md
- api/gantt_calculateenddate.md
- api/gantt_calculatetasklevel.md
- api/gantt_callevent.md
- api/gantt_changelightboxtype.md
- api/gantt_changelinkid.md
- api/gantt_changetaskid.md
- api/gantt_checkevent.md
- api/gantt_clearall.md
- api/gantt_clearredostack.md
- api/gantt_clearundostack.md
- api/gantt_close.md
- api/gantt_collapse.md
- api/gantt_columnindexbydate.md
- api/gantt_confirm.md
- api/gantt_copy.md
- api/gantt_correcttaskworktime.md
- api/gantt_createcalendar.md
- api/gantt_createdataprocessor.md
- api/gantt_createdatastore.md
- api/gantt_createtask.md
- api/gantt_dataprocessor.md
- api/gantt_datefrompos.md
- api/gantt_defined.md
- api/gantt_deletecalendar.md
- api/gantt_deletelink.md
- api/gantt_deletemarker.md
- api/gantt_deletetask.md
- api/gantt_destructor.md
- api/gantt_detachallevents.md
- api/gantt_detachevent.md
- api/gantt_eachparent.md
- api/gantt_eachselectedtask.md
- api/gantt_eachtask.md
- api/gantt_event.md
- api/gantt_eventremove.md
- api/gantt_expand.md
- api/gantt_exporttoexcel.md
- api/gantt_exporttoical.md
- api/gantt_exporttojson.md
- api/gantt_exporttomsproject.md
- api/gantt_exporttopdf.md
- api/gantt_exporttopng.md
- api/gantt_exporttoprimaverap6.md
- api/gantt_findcycles.md
- api/gantt_focus.md
- api/gantt_getcalendar.md
- api/gantt_getcalendars.md
- api/gantt_getchildren.md
- api/gantt_getclosestworktime.md
- api/gantt_getcolumnindex.md
- api/gantt_getconnectedgroup.md
- api/gantt_getconstraintlimitations.md
- api/gantt_getconstrainttype.md
- api/gantt_getdatastore.md
- api/gantt_getfreeslack.md
- api/gantt_getglobaltaskindex.md
- api/gantt_getgridcolumn.md
- api/gantt_getgridcolumns.md
- api/gantt_getlabel.md
- api/gantt_getlastselectedtask.md
- api/gantt_getlayoutview.md
- api/gantt_getlightbox.md
- api/gantt_getlightboxsection.md
- api/gantt_getlightboxtype.md
- api/gantt_getlightboxvalues.md
- api/gantt_getlink.md
- api/gantt_getlinkcount.md
- api/gantt_getlinknode.md
- api/gantt_getlinks.md
- api/gantt_getmarker.md
- api/gantt_getnext.md
- api/gantt_getnextsibling.md
- api/gantt_getparent.md
- api/gantt_getprev.md
- api/gantt_getprevsibling.md
- api/gantt_getredostack.md
- api/gantt_getresourceassignments.md
- api/gantt_getresourcecalendar.md
- api/gantt_getscale.md
- api/gantt_getscrollstate.md
- api/gantt_getselectedid.md
- api/gantt_getselectedtasks.md
- api/gantt_getshortcuthandler.md
- api/gantt_getsiblings.md
- api/gantt_getslack.md
- api/gantt_getstate.md
- api/gantt_getsubtaskdates.md
- api/gantt_getsubtaskduration.md
- api/gantt_gettask.md
- api/gantt_gettaskassignments.md
- api/gantt_gettaskbarheight.md
- api/gantt_gettaskbaselines.md
- api/gantt_gettaskby.md
- api/gantt_gettaskbyindex.md
- api/gantt_gettaskbytime.md
- api/gantt_gettaskbywbscode.md
- api/gantt_gettaskcalendar.md
- api/gantt_gettaskcount.md
- api/gantt_gettaskheight.md
- api/gantt_gettaskindex.md
- api/gantt_gettasknode.md
- api/gantt_gettaskposition.md
- api/gantt_gettaskresources.md
- api/gantt_gettaskrownode.md
- api/gantt_gettasktop.md
- api/gantt_gettasktype.md
- api/gantt_gettotalslack.md
- api/gantt_getundostack.md
- api/gantt_getvisibletaskcount.md
- api/gantt_getwbscode.md
- api/gantt_getworkhours.md
- api/gantt_groupby.md
- api/gantt_haschild.md
- api/gantt_hidecover.md
- api/gantt_hidelightbox.md
- api/gantt_hidequickinfo.md
- api/gantt_importfromexcel.md
- api/gantt_importfrommsproject.md
- api/gantt_importfromprimaverap6.md
- api/gantt_init.md
- api/gantt_ischildof.md
- api/gantt_iscircularlink.md
- api/gantt_iscriticallink.md
- api/gantt_iscriticaltask.md
- api/gantt_islinkallowed.md
- api/gantt_islinkexists.md
- api/gantt_isreadonly.md
- api/gantt_isselectedtask.md
- api/gantt_issplittask.md
- api/gantt_issummarytask.md
- api/gantt_istaskexists.md
- api/gantt_istaskvisible.md
- api/gantt_isunscheduledtask.md
- api/gantt_isworktime.md
- api/gantt_load.md
- api/gantt_locate.md
- api/gantt_mergecalendars.md
- api/gantt_message.md
- api/gantt_mixin.md
- api/gantt_modalbox.md
- api/gantt_movetask.md
- api/gantt_open.md
- api/gantt_parse.md
- api/gantt_plugins.md
- api/gantt_posfromdate.md
- api/gantt_redo.md
- api/gantt_refreshdata.md
- api/gantt_refreshlink.md
- api/gantt_refreshtask.md
- api/gantt_removelinklayer.md
- api/gantt_removeshortcut.md
- api/gantt_removetasklayer.md
- api/gantt_render.md
- api/gantt_rendermarkers.md
- api/gantt_resetlayout.md
- api/gantt_resetlightbox.md
- api/gantt_resetprojectdates.md
- api/gantt_resetskin.md
- api/gantt_resizelightbox.md
- api/gantt_rounddate.md
- api/gantt_roundtaskdates.md
- api/gantt_scrolllayoutcell.md
- api/gantt_scrollto.md
- api/gantt_selecttask.md
- api/gantt_serialize.md
- api/gantt_serverlist.md
- api/gantt_setparent.md
- api/gantt_setsizes.md
- api/gantt_setskin.md
- api/gantt_setworktime.md
- api/gantt_showcover.md
- api/gantt_showdate.md
- api/gantt_showlightbox.md
- api/gantt_showquickinfo.md
- api/gantt_showtask.md
- api/gantt_silent.md
- api/gantt_sort.md
- api/gantt_toggletaskselection.md
- api/gantt_uid.md
- api/gantt_undo.md
- api/gantt_unselecttask.md
- api/gantt_unsetworktime.md
- api/gantt_updatecollection.md
- api/gantt_updatelink.md
- api/gantt_updatemarker.md
- api/gantt_updatetask.md
- api/gantt_updatetaskassignments.md


