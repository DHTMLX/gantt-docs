---
sidebar_label: form_blocks
title: form_blocks config
description: "an object of the lightbox controls"
---

# form_blocks

### Description

@short: An object of the lightbox controls

@signature: form_blocks: \{ checkbox?: LightboxControl; constraint?: LightboxControl; duration?: LightboxControl; duration_optional?: LightboxControl; parent?: LightboxControl; radio?: LightboxControl; resources?: LightboxControl; select?: LightboxControl; template?: LightboxControl; textarea?: LightboxControl; time?: LightboxControl; time_optional?: LightboxControl; typeselect?: LightboxControl; [ControlName: string]: LightboxControl | undefined \}

### Example

~~~jsx
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
~~~

### Details

The object has the following types:

- **checkbox** - (*LightboxControl*) - the [Checkbox](guides/checkbox.md) control
- **constraint** - (*LightboxControl*) - the [Constraint](guides/constraint.md) control
- **duration** - (*LightboxControl*) - the [Duration](guides/duration.md) control
- **duration_optional** - (*LightboxControl*) - the [Duration](guides/duration.md) control that allows changing the [section visibility](guides/duration.md#switching-section-visibility)
- **parent** - (*LightboxControl*) - the [Parent](guides/parent.md) control
- **radio** - (*LightboxControl*) - the [Radio button](guides/radio.md) control
- **resources** - (*LightboxControl*) - the [Resources](guides/resources.md) control
- **select** - (*LightboxControl*) - the [Select](guides/select.md) control
- **template** - (*LightboxControl*) - the [Template](guides/template.md) control
- **textarea** - (*LightboxControl*) - the [Textarea](guides/textarea.md) control
- **time** - (*LightboxControl*) - the [Time](guides/time.md) control
- **time_optional** - (*LightboxControl*) - the [Time](guides/time.md) control that allows changing the [section visibility](guides/time.md#switching-section-visibility)
- **typeselect** - (*LightboxControl*) - the [Typeselect](guides/typeselect.md) control
- **[ControlName: string]** - (*LightboxControl | undefined*) - a custom control
