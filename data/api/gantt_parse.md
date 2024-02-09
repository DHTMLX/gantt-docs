parse
=============
@short:loads data from a client-side resource
	

@params:
- data		string,object	 a string or object which represents <a href="https://docs.dhtmlx.com/gantt/desktop__loading.html#dataproperties">data</a>
* type		string	 		 optional, (<i>'json', 'xml'</i>) the data type. The default value - <i>'json'</i>


@example:
gantt.parse({
	data:[
        {id:1, text:"Project #2", start_date:"01-04-2023", duration:18},
        {id:2, text:"Task #1",    start_date:"02-04-2023", duration:8,
    		progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2023", duration:8,
    		progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
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
Gantt expects that *an array with tasks* will be named either **data** or **tasks** whereas *an array with links* will be named **links**.

If you want to load data which doesn't contain tasks, you still need to define an array of tasks in the object with data but it can be empty:

~~~js
gantt.parse({
    tasks:[],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
    ]
});
~~~

<br>
From v8.0, besides tasks and links, you can load resources and resource assignments into the gantt via the **parse()** method:

~~~js
gantt.parse({
    tasks: [
        ...,
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            owner: [
                {
                    resource_id: "6",
                    value: 3,
                    start_date: "03-04-2024 00:00",
                    end_date: "05-04-2024 00:00",
                }
            ]
        },
        ...
    ],
    links: [],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        {id: 8, text: "Anna", unit: "hours/day" },
        {id: 9, text: "Bill", unit: "hours/day" },
        {id: 10, text: "Floe", unit: "hours/day" }
    ]
});
~~~

You can read more [here](desktop/resource_management.md#loadingresourcesandresourceassignments).
