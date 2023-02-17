isSplitTask
=============

@short:
	checks whether the specified task is split

@params:

- task		Task			the object of a task

@returns:
- isSplit		boolean			true, if the task is split, false otherwise

@example:

var task = gantt.getTask(13);
// --> { id: 13, render:"split", text: "Task #2", ...}

if(gantt.isSplitTask(task)){
  // do something
}


@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}


@related:
desktop/split_tasks.md

@edition:pro