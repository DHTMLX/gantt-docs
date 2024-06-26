types
=============

@short:stores the names of lightbox's structures (used for different types of tasks) 
	
@edition: pro
@type: object
@example:
var type1 = gantt.config.types.task;

@default: types : {task:'task',project:'project',milestone:'milestone', placeholder: "placeholder"}

@template:	api_config
@descr:
{{pronote This functionality is available in the PRO edition only.}}

The 'types' object consists of the **"type programmatic name"**: **"type identifier"** pairs:

<ul>
	<li>The type programmatic name doesn't affect anything. The only purpose of it is to make the work with types more readable.</li>
	<li>The type identifier is stored in the database. It must be unique within the types' object. If required, the type identifier can be changed to any desirable value:
~~~js
{"task":0,"project":1,"milestone":2}
~~~
	</li>
</ul>


The expected types are:

- <span class=subproperty>**task**</span> - (*string | number*) - the name of the task type.
- <span class=subproperty>**project**</span> - (*string | number*) - the name of the project type.
- <span class=subproperty>**milestone**</span> - (*string | number*) - the name of the milestone type.
- <span class=subproperty>**placeholder**</span> - (*string | number*) - the name of the placeholder type.
- <span class=subproperty>**[typeName: string]**</span> - (*string | number | undefined*) - name of the custom type.




Gantt will use the lightbox depending on the task type:

~~~js
types: {
	'task':'task',            // a lightbox for reqular tasks
    'project':'project',      // a lightbox for project tasks
    'milestone':'milestone'   // a lightbox for milestones
}
~~~



@related:
	desktop/task_types.md
@relatedsample:
	01_initialization/16_projects_and_milestones.html
    
    
    
