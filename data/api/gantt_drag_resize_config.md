drag_resize
=============
@short:enables the possibility to resize tasks by drag-and-drop
	


@type: boolean
@default:true

@example:
gantt.config.drag_resize = false;
gantt.init("gantt_here");

@template:	api_config
@descr:
<img src="api/property_drag_resize.png"/>

Check the [related section in the CSS Documentation](desktop/css_overview.md#resizer) article to know how to disable resize handles for all tasks.

Check the [Dragging Tasks within the Timeline](desktop/dnd.md) article for details on the finer control of resizing operations, namely:

- [Disabling resize of specific tasks](desktop/dnd.md#disablingresizeofspecifictasks)
- [Which side of a task is being resized](desktop/dnd.md#whichsideofataskisbeingresized)
- [Disabling resize of the start or the end date of a task](desktop/dnd.md#disablingresizeofthestartortheenddateofatask)


@related:
    api/gantt_drag_lightbox_config.md
	api/gantt_drag_links_config.md
    api/gantt_drag_mode_config.md
    api/gantt_drag_move_config.md
    api/gantt_drag_progress_config.md

