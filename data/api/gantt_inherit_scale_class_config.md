inherit_scale_class
=============
@short:specifies whether sub-scales shall use the scale_cell_class template by default
	

@type: boolean
@example:
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");

@default:false
@template:	api_config
@descr:
The option is added in the version 3.2.  <br>
In the earlier versions, sub-scales always used the api/gantt_scale_cell_class_template.md template by default. Setting the option to 'true' will return the old behaviour.

@relatedapi:
	api/gantt_scale_cell_class_template.md