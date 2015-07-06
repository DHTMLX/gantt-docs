multiselect_one_level
=============
@short:specifies whether multi-task selection will be available within one or any level
	

@type: boolean
@default:false
@example:
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');

//INCORRECT
gantt.config.multiselect = false;  /*!*/ //multiselection is disabled
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');

@template:	api_config
@relatedapi:
	api/gantt_eachselectedtask.md
    api/gantt_getlastselectedtask.md
    api/gantt_getselectedtasks.md
    api/gantt_multiselect_config.md
    api/gantt_isselectedtask.md
    api/gantt_toggletaskselection.md
@related:
	desktop/multiselection.md
    
@descr:


{{note
The option makes sense only when the api/gantt_multiselect_config.md option is enabled.
}}