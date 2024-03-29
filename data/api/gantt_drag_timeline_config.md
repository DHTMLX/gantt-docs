drag_timeline
=============

@todo:
	check the autogenerated stub


@short: 
configures the behavior of the drag_timeline extension
	

@type: object

@default:{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" }

@example:

gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false
};


@template:	api_config

@descr:

{{note This option is defined in the **drag_timeline** extension, so you need to activate the [drag_timeline](desktop/extensions_list.md#dragtimeline) plugin.}}

The config value can be either an object or **null** value, **null** value disables the extension.
~~~js
gantt.config.drag_timeline = null;// disables the extension
~~~

The **drag_timeline** object includes two properties:

- **ignore** - (string) CSS selector. Scrolling the timeline won't be activated for the elements that match the selector.

~~~
gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false
};
~~~

- **useKey** - (string|boolean) if the property is specified, scrolling the timeline will be activated only when the specified modifier key is pressed. Supported values: "ctrlKey", "shiftKey", "metaKey", "altKey".


@relatedsample:
	02_extensions/27_drag_timeline.html