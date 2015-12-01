auto_scheduling_descendant_links
=============


@short: allows or forbids creation of links from parent tasks (projects) to their children
	

@type: boolean
@default: false
@example:
gantt.config.auto_scheduling_descendant_links = true;
 
gantt.init("gantt_here");


@template:	api_config
@descr:
By default, links from parent tasks (projects) to their children can't be created.

@changelog:
added in version 4.0