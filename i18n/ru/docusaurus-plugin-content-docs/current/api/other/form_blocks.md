---
sidebar_label: form_blocks
title: конфигурация form_blocks
description: "объект элементов управления lightbox"
---

# form_blocks

### Description

@short: Объект элементов управления lightbox

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

- **checkbox** - (*LightboxControl*) - контрол [Checkbox](guides/checkbox.md) 
- **constraint** - (*LightboxControl*) - контрол [Constraint](guides/constraint.md)
- **duration** - (*LightboxControl*) - контрол [Duration](guides/duration.md)
- **duration_optional** - (*LightboxControl*) - контрол [Duration](guides/duration.md), который позволяет изменять [видимость раздела](guides/duration.md#switching-section-visibility)
- **parent** - (*LightboxControl*) - контрол [Parent](guides/parent.md)
- **radio** - (*LightboxControl*) - контрол [Radio button](guides/radio.md)
- **resources** - (*LightboxControl*) - контрол [Resources](guides/resources.md)
- **select** - (*LightboxControl*) - контрол [Select](guides/select.md)
- **template** - (*LightboxControl*) - контрол [Template](guides/template.md)
- **textarea** - (*LightboxControl*) - контрол [Textarea](guides/textarea.md)
- **time** - (*LightboxControl*) - контрол [Time](guides/time.md)
- **time_optional** - (*LightboxControl*) - контрол [Time](guides/time.md), который позволяет изменять [видимость раздела](guides/time.md#switching-section-visibility)
- **typeselect** - (*LightboxControl*) - контрол [Typeselect](guides/typeselect.md)
- **[ControlName: string]** - (*LightboxControl | undefined*) - пользовательский контроль