---
sidebar_label: form_blocks
title: form_blocks config
description: "объект, содержащий элементы управления лайтбоксом"
---

# form_blocks

### Description

@short: Объект, содержащий элементы управления лайтбоксом

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

Этот объект включает несколько типов элементов управления:

- **checkbox** - (*LightboxControl*) - элемент управления [Checkbox](guides/checkbox.md)
- **constraint** - (*LightboxControl*) - элемент управления [Constraint](guides/constraint.md)
- **duration** - (*LightboxControl*) - элемент управления [Duration](guides/duration.md)
- **duration_optional** - (*LightboxControl*) - элемент управления [Duration](guides/duration.md), поддерживающий переключение [видимости секции](guides/duration.md#switchingsectionvisibility)
- **parent** - (*LightboxControl*) - элемент управления [Parent](guides/parent.md)
- **radio** - (*LightboxControl*) - элемент управления [Radio button](guides/radio.md)
- **resources** - (*LightboxControl*) - элемент управления [Resources](guides/resources.md)
- **select** - (*LightboxControl*) - элемент управления [Select](guides/select.md)
- **template** - (*LightboxControl*) - элемент управления [Template](guides/template.md)
- **textarea** - (*LightboxControl*) - элемент управления [Textarea](guides/textarea.md)
- **time** - (*LightboxControl*) - элемент управления [Time](guides/time.md)
- **time_optional** - (*LightboxControl*) - элемент управления [Time](guides/time.md), поддерживающий переключение [видимости секции](guides/time.md#switchingsectionvisibility)
- **typeselect** - (*LightboxControl*) - элемент управления [Typeselect](guides/typeselect.md)
- **[ControlName: string]** - (*LightboxControl | undefined*) - опция для кастомного элемента управления
