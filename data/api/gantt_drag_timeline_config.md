drag_timeline
=============

@short: 
configures the behavior of the drag_timeline extension
	

@type: null | object

@default:{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" }

@example:

gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false,
    render: false
};


@template:	api_config

@descr:

{{note This option is defined in the **drag_timeline** extension, so you need to activate the [drag_timeline](desktop/extensions_list.md#dragtimeline) plugin.}}

The config value can be either an object or the **null** value, the **null** value disables the extension.

~~~js
gantt.config.drag_timeline = null; // disables the extension
~~~

The **drag_timeline** object includes the following properties:



- <span class=subproperty>**ignore**</span> - (*string*) - CSS selector. Scrolling the timeline won't be activated for the elements that match the selector

- <span class=subproperty>**useKey**</span> - (*string | boolean*) - if the property is specified, scrolling the timeline will be activated only when the specified modifier key is pressed. The supported values are: "ctrlKey", "shiftKey", "metaKey", "altKey"

- <span class=subproperty>**render**</span> - (*boolean*) - if the property is enabled, scrolling the timeline will be rerendered when the scroll is started and when it is ended


@relatedsample:
	02_extensions/27_drag_timeline.html