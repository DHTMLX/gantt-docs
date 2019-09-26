inline_editors_date_processing
=============

@short: keeps the duration of a task unchanged during editing of the start/end of a task 

@default: undefined

@values: undefined,"keepDuration","keepDates"
@type: string
@example:
gantt.config.inline_editors_date_processing = "keepDuration";

@template:	api_config
@descr:
Affects the behavior of inline editors for start and end dates of tasks.
When the config is undefined (default):

- When a user changes the start date of a task, task duration will remain unchanged and the whole task will be rescheduled to the specified time.
- When a user changes the end date of a task, task start date will remain unchanged, task duration will be updated in order to reflect the change.

This is different from the default logic in versions before 6.2.

In order to revert to v6.1 behavior, use the **"keepDuration"** value:

~~~js
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

Which will have the following effect:

- When a user changes the start date of a task, task duration will remain unchanged and the whole task will be rescheduled to the specified time.
- When a user changes the end date of a task, task duration will remain unchanged and the whole task will be rescheduled to end at the specified time.

An alternative value is **"keepDates"**:

~~~js
gantt.config.inline_editors_date_processing = "keepDates";
~~~

It has the following effect:

- When a user changes the start date of a task, task end_date will remain unchanged, task duration will be updated in order to reflect the change.
- When a user changes the end date of a task, task start_date will remain unchanged, task duration will be updated in order to reflect the change.

@changelog:
added in v6.2 for compatibility with previous versions
