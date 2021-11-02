process_resource_assignments
=============


@short: enables/disables parsing of the resource assignments
	

@type: boolean
@default: true
@example:
gantt.config.process_resource_assignments = false;


@template:	api_config
@descr:
When you [assign resources to the specific time of a task](desktop/resource_management.md#resourceassignmenttime), the functionality requires the **process_resource_assignments** property to be enabled.
This is related to the fact, that the property provides parsing of the values from [gantt.config.resource_property](api/gantt_resource_property_config.md) of tasks into the internal resource assignment objects. 

As a result, you are be able to manipulate the resource assignments via the DataStore object, for instance to get the necessary assignment object or update it.


But if you only need to assign resources to the tasks without specifying time or duration of the assignment, you can disable parsing of the assignments using the config:

~~~js
gantt.config.process_resource_assignments = false;
~~~


@changelog: added in v7.1

@relatedsample: 11_resources/13_resource_assignments_for_days.html

@related: desktop/resource_management.md#managingresourceassignments