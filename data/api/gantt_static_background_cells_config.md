static_background_cells
=============

@short:enables rendering of highlighted cells in the static_background mode
	
@default:true
@type: boolean
@example:
gantt.config.static_background_cells = false;

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

This config is used in conjunction with the api/gantt_static_background_config.md config.
When both **static background** and **static_background_cells** are enabled, 
gantt.config.static_background_cells = true(default), gantt will render both PNG grid and highlighted cells (ones that have CSS class assigned to them from timeline_cell_class template)

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = true;// enabled by default
~~~

If **static_background** is enabled and **static_background_cells** is disabled, gantt will render only PNG grid, as it worked in versions before 6.2.

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = false;
~~~

If **static_background** is disabled, **static_background_cells** has no effect at all.

~~~js
gantt.config.static_background = false;
~~~

This config can be used to revert **static_background** to v6.1.

@changelog:
added in v6.2 for compatibility with v6.1


@relatedapi:
api/gantt_static_background_config.md

