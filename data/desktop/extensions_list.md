Full List of Extensions
=========================

dhtmlxGantt includes a set of extensions which add extra functionality to the standard behavior.

To use an extension, you should include the extension code file on the page. Code files of extensions reside in the **ext** folder of the gantt codebase.

Advanced drag-n-drop
----------------------

Provides the possibility to create and select tasks with drag-n-drop.

~~~html
<script src="../codebase/ext/dhtmlxgantt_click_drag.js"></script>
~~~

####Related resources

Article: desktop/advanced_dnd.md<br>
API: api/gantt_click_drag_config.md<br>

{{sample 02_extensions/24_click_drag.html}}

Auto scheduling
----------------

{{note This extension is available in PRO version only}}

Allows you to schedule tasks automatically depending on relations between them.

~~~html
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

####Related resources

Article: desktop/auto_scheduling.md<br>
API: api/gantt_auto_scheduling_config.md<br>

{{sample  02_extensions/12_auto_scheduling.html}}


Critical path
-------------

{{note This extension is available in PRO version only}}

Presents a sequence of tasks that can't be delayed without affecting the whole project's deadline.
The critical path also determines the shortest time the project can take.

~~~html
<script src="../codebase/ext/dhtmlxgantt_critical_path.js"></script>
~~~

####Related resources

Article: desktop/critical_path.md<br>
API: api/gantt_highlight_critical_path_config.md<br>

{{sample  02_extensions/03_critical_path.html}}


Drag Timeline
-------------

Allows scrolling timeline views by mouse-drag.

~~~html
<script src="../codebase/ext/dhtmlxgantt_drag_timeline.js"></script>
~~~

####Related resources

API: api/gantt_drag_timeline_config.md<br>

{{sample  02_extensions/27_drag_timeline.html}}


Extra overlay
--------------

Provides the possibility to add an extra layer over the Gantt Chart for placing some custom content into it.

~~~html
<script src="../codebase/ext/dhtmlxgantt_overlay.js"></script>
~~~

####Related resources

Article: desktop/baselines.md#extraoverlayforthechart

{{sample 02_extensions/21_overlay.html}}

Full screen
-----------

Displays Gantt in the full screen mode.

~~~html
<script src="../codebase/ext/dhtmlxgantt_fullscreen.js"></script>
~~~

####Related resources

Article: desktop/fullscreen_mode.md <br>

{{sample 02_extensions/11_full_screen.html}}

Grouping
------------

{{note This extension is available in PRO version only}}

Allows you to group tasks by any of task attributes.

~~~html
<script src="../codebase/ext/dhtmlxgantt_grouping.js"></script>
~~~

####Related resources

Article: desktop/grouping.md<br>
API: api/gantt_groupby.md<br>

{{sample  02_extensions/08_tasks_grouping.html}}

Keyboard navigation
------------------
Allows navigating the gantt chart with the help of the keyboard.

~~~html
<script src="../codebase/ext/dhtmlxgantt_keyboard_navigation.js"></script>
~~~

####Related resources

Article: desktop/accessibility.md#keyboardnavigation<br>
API: api/gantt_keyboard_navigation_config.md,api/gantt_keyboard_navigation_cells_config.md<br>



Multitask selection
-------------------

Allows selecting multiple tasks in Gantt chart at once.

~~~html
<script src="../codebase/ext/dhtmlxgantt_multiselect.js"></script>
~~~

####Related resources

Article: desktop/multiselection.md<br>
API: api/gantt_multiselect_config.md<br>

{{sample  02_extensions/09_multiselection.html}}


Quick info
-----------

Provides a popup with a task details.

~~~html
<script src="../codebase/ext/dhtmlxgantt_quick_info.js"></script>
~~~

####Related resources

Article: desktop/touch_templates.md<br>

{{sample 02_extensions/01_quickinfo.html}}


Tooltip
---------
Gives the possibility to add extra information for users without overflowing the screen with the text.

~~~html
<script src="../codebase/ext/dhtmlxgantt_tooltip.js"></script>
~~~

####Related resources

Article: desktop/tooltips.md<br>

{{sample 02_extensions/02_tooltip.html}}

Undo
------

Allows you to undo/redo the made changes.

~~~html
<script src="../codebase/ext/dhtmlxgantt_undo.js"></script>
~~~

####Related resources

Article: desktop/undo_redo.md<br>
API: api/gantt_undo_config.md, api/gantt_redo_config.md<br>

{{sample 02_extensions/14_undo.html}}

Vertical marker
---------

Highlights certain dates or date ranges.

~~~html
<script src="../codebase/ext/dhtmlxgantt_marker.js"></script>
~~~

####Related resources

Article: desktop/markers.md<br>
API: api/gantt_addmarker.md,api/gantt_show_markers_config.md<br>

{{sample  02_extensions/05_today_line.html}}

