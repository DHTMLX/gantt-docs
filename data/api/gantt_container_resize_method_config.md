container_resize_method
=============

@short: defines whether the gantt should track resizing of the container at time intervals
	

@type: string | undefined
@default: undefined
@values: "timeout", undefined
@example:
gantt.config.container_resize_method = "timeout";

@template:	api_config
@descr:
By default, Gantt listens to the "resize" event for the window and for the iframe element placed inside the gantt. Sometimes these events can't be fired (for example, in Salesforce).

If you need Gantt to track resizing of the container at time intervals, set **container_resize_method** to *"timeout"*:

~~~js
gantt.config.container_resize_method = "timeout";
~~~

@changelog: Added in v7.1

@relatedapi: api/gantt_container_resize_timeout_config.md
