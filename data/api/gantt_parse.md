parse
=============
@short:loads data from a client-side resource
	

@params:
- data		string | DataToLoad	 a string or object which represents <a href="https://docs.dhtmlx.com/gantt/desktop__loading.html#dataproperties">data</a>
* type		string	 		 optional, (<i>'json', 'xml'</i>) the data type. The default value - <i>'json'</i>


@example:
gantt.parse({
	tasks: [
		{ id: 1, text: "Project #2", start_date: "01-04-2026", duration: 18 },
		{ id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, progress: 0.6,
			parent: 1 },
		{ id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, progress: 0.6,
			parent: 1 }
	],
	links: [
		{ id: 1, source: 1, target: 2, type: 1 },
		{ id: 2, source: 2, target: 3, type: 0 }
	]
});

@template:	api_method
@relatedapi:
	api/gantt_load.md
@relatedsample:
	01_initialization/01_basic_init.html
@related:
    desktop/loading.md
    desktop/supported_data_formats.md
    desktop/supported_data_formats.md#jsonwithcollections (read how to load JSON with Collections)
@descr:
Gantt expects that *an array with tasks* will be named either **tasks** or **data** whereas *an array with links* will be named **links**.

This is the list of expected properties:

- <span class=subproperty>**tasks**</span> - (*[] | NewTask[]*) - the array with the task data
- <span class=subproperty>**links?**</span> - (*Link[]*) - the array with the link data
- <span class=subproperty>**resources?**</span> - (*NewResourceItem[]*) - the array with the resource data
- <span class=subproperty>**assignments?**</span> - (*NewAssignmentItem[]*) - the array with the assignment data
- <span class=subproperty>**collections?**</span> - (*Collections*) - the object that has the arrays with the custom data

~~~js
gantt.parse({
	tasks: [
		{ id: 1, start_date: "2026-09-23", duration: 42, text: "House Construction" },
		{ id: 2, start_date: "2026-12-02", duration: 60, text: "House Construction" }
	],
	links: [
		{ id: 1, source: 1, target: 2, type: 0 }
	],
	resources: [
		{ id: 1, text: "Anna, Architect", unit: "hours/day", default_value: 8,
			type: "work" }
	],
	assignments: [
		{ task_id: 1, resource_id: 1, value: "8" },
		{ task_id: 2, resource_id: 1, value: "8", mode: "fixedDates",
			start_date: "2026-09-23", end_date: "2026-09-25", duration: 4, delay: 2 },
		{ task_id: 2, resource_id: 1, value: "8",
			start_date: new Date("2026-09-23T00:00:00"),
			end_date: new Date("2026-09-26T00:00:00") }
	]
});
~~~


The **tasks** or **data** array expects the **NewTask** object that is different from the **Task** object. It can be a string, an empty object.
It can have the same properties as the [**Task** object](desktop/task_properties.md), and you can add any custom properties there. 
The difference is that some properties of the **Task** object that start from the *$* sign are ignored and the dates can have the *string* type. 
Here is the type description:

- <span class=subproperty>**NewTask**</span> - (*string | {} | object*) - the task object that will be added to Gantt. It can have the following properties:
    - **_id?_** - (*string | number*) - optional, the task ID, auto-generated if not set.
    - **_start_date?_** - (*string | Date*) - optional, the date when a task is scheduled to begin.
    - **_duration?_** - (*number*) - optional, the task duration.
    - **_end_date?_** - (*string | Date*) - optional, the date when a task is scheduled to be completed.
    - **_text?_** - (*string*) - optional, the task name.
    - **_open?_** - (*boolean*) - optional, specifies if the task will be opened on load (to show child tasks).
    - **_parent?_** - (*string | number*) - optional, the ID of the parent task.
    - **_constraint_date?_** - (*string | Date*) - optional, the date of the task constraint.
    - **_[customProperty: string]_** - (*any*) - any other property you want to add, including the ones from the [**Task** object](desktop/task_properties.md)

This is not the full list of possible task properties. For that, please refer to [this article](desktop/task_properties.md).

~~~js
gantt.parse({
	tasks: [
		{ id: 1, text: "House Construction", start_date: "2026-09-23", duration: 42 },
	]
})
~~~
---


The **links** array expects the [**Link** objects](desktop/link_properties.md).

~~~js
gantt.parse({
	tasks: [],
	links: [
		{ id: "1", source: "1", target: "2", type: "0" },
	]
})
~~~
---


The **resources** array expects the **NewResourceItem** object that may have the properties below:

- <span class=subproperty>**NewResourceItem**</span> - (*object*) - the resource item object that will be added to Gantt. It can have the following properties:
    - **_id?_** - (*string | number*) - optional, the resource ID, auto-generated if not set
    - **_parent?_** - (*string | number*) - optional, the ID of the parent resource
    - **_text?_** - (*string*) - optional, the resource name
    - **_open?_** - (*boolean*) - optional, specifies if the resource will be opened on load (to show child items)
    - **_unit?_** - (*string | number*) - optional, the unit of the resource assignment
    - **_default_value?_** - (*string | number*) - optional, the value that is assigned by default when adding the assignment in the lightbox section
    - **_[customProperty: string]_** - (*any*) - any other property you want to add

~~~js
gantt.parse({
	tasks: [],
	resources: [
		{ id: 1, text: "Anna, Architect", unit: "hours/day", default_value: 8,
			type: "work" },
	]
})
~~~
---


The **assignments** array expects the **NewAssignmentItem** object that may have the properties below:

- <span class=subproperty>**NewAssignmentItem**</span> - (*object*) - the assignment item object that will be added to Gantt. It can have the following properties:
    - **_id?_** - (*string | number*) - optional, the assignment ID, auto-generated if not set
    - **_task_id_** - (*string | number*) - the ID of the task the resource is assigned to
    - **_resource_id_** - (*string | number*) - the ID of the resource that is assigned to the task
    - **_value_** - (*number | string*) - optional, the assignment value
    - **_mode?_** - (*string*) - optional, the calculation mode of the time of the resource assignment: "default"|"fixedDates"|"fixedDuration"
    - **_delay?_** - (*number*) - optional, the difference between the assignment start date and the task start date
    - **_start_date?_** - (*string | Date*) - optional, the date the assignment should start
    - **_duration?_** - (*number*) - optional, the assignment duration
    - **_end_date?_** - (*string | Date*) - optional, the date the assignment should end
    - **_[customProperty: string]_** - (*any*) - any other property you want to add


~~~js
gantt.parse({
	tasks: [],
	assignments: [
		{ task_id: "1", resource_id: "1", value: "8" },
	]
})
~~~
---


The **collections** object allows loading any custom data. The properties can have any name, and the value should be an array that contains the collection items:

- <span class=subproperty>**[collectionName: string]**</span> - (*[] | CollectionItem[]*) - an array that contains the collection items.

The **CollectionItem** is an object that can have any properties. It has the following types for its properties:

- <span class=subproperty>**[itemProperty: string]**</span> - (*any*) - any custom property of the collection item.


~~~js
gantt.parse({
	tasks: [
		{ id: "1", text: "Task #1", priority: 1, start_date: "02-04-2026", duration:1 },
		{ id: "2", text: "Task #2", priority: 2, start_date: "01-04-2026", duration:1 },
		{ id: "3", text: "Task #3", priority: 3, start_date: "02-04-2026", duration:1 },
		{ id: "4", text: "Task #4", priority: 1, start_date: "03-04-2026", duration:1 }
	],
	links: [],
	collections: {
		task_priority: [
			{ key: 1, label: "High" },
			{ key: 2, label: "Normal" },
			{ key: 3, label: "Low" }
		]
	}
});
~~~
---


If you want to load data which doesn't contain tasks, you still need to define an array of tasks in the object with data but it can be empty:

~~~js
gantt.parse({
	tasks: [],
	links: [
		{ id: 1, source: 1, target: 2, type: 1 },
		{ id: 2, source: 2, target: 3, type: 0 }
	]
});
~~~

<br>
From v8.0, besides tasks and links, you can load resources and resource assignments into the gantt via the **parse()** method:

~~~js
gantt.parse({
	tasks: [
		// ...
		{
			id: 5,
			text: "Interior office",
			type: "task",
			start_date: "03-04-2026 00:00",
			duration: 7,
			parent: "2",
			owner: [
				{ resource_id: "6", value: 3, start_date: "03-04-2026 00:00",
					end_date: "05-04-2026 00:00" }
			]
		},
		// ...
	],
	links: [],
	resources: [
		{ id: 6, text: "John", unit: "hours/day" },
		{ id: 7, text: "Mike", unit: "hours/day" },
		{ id: 8, text: "Anna", unit: "hours/day" },
		{ id: 9, text: "Bill", unit: "hours/day" },
		{ id: 10, text: "Floe", unit: "hours/day" }
	]
});
~~~

You can read more [here](desktop/resource_management.md#loadingresourcesandresourceassignments).
