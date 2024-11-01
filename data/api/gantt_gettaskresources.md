getTaskResources
=============


@short: returns the array of unique resources assigned to a specific task from the datastore
	

@params:
- taskId	string | number	the task id



@returns:
- param	ResourceItem[]	an array of resource objects

@example:
gantt.getTaskResources(5); // -> see details

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note The **getTaskResources** method is not available if api/gantt_process_resource_assignments_config.md is disabled.}}

The method returns an array with **resourceItem** objects that have the following properties:

- <span class=subproperty>**id**</span> - (*string | number*) - the ID of the resource item
- <span class=subproperty>**open?**</span> - (*boolean*) - indicates whether the resource item is expanded in the tree (*true*) or collapsed (*false*)
- <span class=subproperty>**parent?**</span> - (*string | number*) - the ID of the resource item's parent
- <span class=subproperty>**text?**</span> - (*string*) - the resource name
- <span class=subproperty>**unit?**</span> - (*string*) - the unit for the assignments
- <span class=subproperty>**[customProperty: string]**</span> - (*any*) - any custom property


~~~js
[
	{id: 6, text: "John", parent:1, unit: "hours/day" },
	{id: 7, text: "Mike", parent:2, unit: "hours/day" }
]
~~~


@relatedapi: 
api/gantt_getresourceassignments.md
api/gantt_process_resource_assignments_config.md

@related: desktop/resource_management.md#assigningresources

@relatedsample: 11_resources/13_resource_assignments_for_days.html

@changelog: added in v8.0

@edition: pro