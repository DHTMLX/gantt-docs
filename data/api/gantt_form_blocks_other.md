form_blocks
=============
@short: an object of the lightbox controls
	

@type:object

@example:
gantt.form_blocks["date_local_editor"] = {
    render: function (sns) {
        return "<input class='custom_section' type='datetime-local' name='1'>"
    },
    set_value: function (node, value, task) {
        if (task.start_date) {
            const dateValue = gantt.date.date_to_str("%Y-%m-%d")(value);
            const timeValue = gantt.date.date_to_str("%H:%i")(value);
            const dateLocalValue = dateValue + "T" + timeValue;
            node.value = dateLocalValue;
        }
    },
    get_value: function (node, task) {
        task.start_date = new Date(node.value)
        task.end_date = gantt.calculateEndDate(task)
        return task.start_date;
    },
    focus: function (node) {
        const a = node;
        a.select();
        a.focus();
    }
};


@template:	api_config
@descr:
The object has the following types:

- <span class=subproperty>**checkbox**</span> - (*LightboxControl*) - the [Checkbox](desktop/checkbox.md) control
- <span class=subproperty>**constraint**</span> - (*LightboxControl*) - the [Constraint](desktop/constraint.md) control
- <span class=subproperty>**duration**</span> - (*LightboxControl*) - the [Duration](desktop/duration.md) control
- <span class=subproperty>**duration_optional**</span> - (*LightboxControl*) - the [Duration](desktop/duration.md) control that allows changing the [section visibility](desktop/duration.md#switchingsectionvisibility)
- <span class=subproperty>**parent**</span> - (*LightboxControl*) - the [Parent](desktop/parent.md) control
- <span class=subproperty>**radio**</span> - (*LightboxControl*) - the [Radio button](desktop/radio.md) control
- <span class=subproperty>**resources**</span> - (*LightboxControl*) - the [Resources](desktop/resources.md) control
- <span class=subproperty>**select**</span> - (*LightboxControl*) - the [Select](desktop/select.md) control
- <span class=subproperty>**template**</span> - (*LightboxControl*) - the [Template](desktop/template.md) control
- <span class=subproperty>**textarea**</span> - (*LightboxControl*) - the [Textarea](desktop/textarea.md) control
- <span class=subproperty>**time**</span> - (*LightboxControl*) - the [Time](desktop/time.md) control
- <span class=subproperty>**time_optional**</span> - (*LightboxControl*) - the [Time](desktop/time.md) control that allows changing the [section visibility](desktop/time.md#switchingsectionvisibility)
- <span class=subproperty>**typeselect**</span> - (*LightboxControl*) - the [Typeselect](desktop/typeselect.md) control
- <span class=subproperty>**[ControlName: string]**</span> - (*LightboxControl | undefined*) - a custom control






