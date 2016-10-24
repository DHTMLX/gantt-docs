smart_scales
=============

@short:
	specifies that only visible part of the time scale is rendered on the screen

@type: boolean
@example:

gantt.config.smart_scales = true;

@default: true

@template:	api_config
@descr:
added in version 4.1

Usage of this config significantly speeds up chart rendering if you have a very long time scale.  

@related:
desktop/performance.md#commontechniques