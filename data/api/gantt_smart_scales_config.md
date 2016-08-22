smart_scales
=============

@todo:
	check 


@short:
	specifies that only visible part of the scale is rendered 

@type: boolean
@example:

gantt.config.smart_scales = true;

@default: true

@template:	api_config
@descr:
added in version 4.1

Usage of this config significantly speeds up chart rendering if you have a very long scale.  

@related:
desktop/performance.md#commontechniques