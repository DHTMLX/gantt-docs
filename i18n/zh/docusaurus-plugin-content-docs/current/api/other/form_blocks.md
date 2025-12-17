---
sidebar_label: form_blocks
title: form_blocks config
description: "一个包含 lightbox 控件的对象"
---

# form_blocks

### Description

@short: 一个包含 lightbox 控件的对象

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

该对象包含多种类型的控件:

- **checkbox** - (*LightboxControl*) - [Checkbox](guides/checkbox.md) 控件
- **constraint** - (*LightboxControl*) - [Constraint](guides/constraint.md) 控件
- **duration** - (*LightboxControl*) - [Duration](guides/duration.md) 控件
- **duration_optional** - (*LightboxControl*) - 支持切换 [section visibility](guides/duration.md) 的 [Duration](guides/duration.md) 控件
- **parent** - (*LightboxControl*) - [Parent](guides/parent.md) 控件
- **radio** - (*LightboxControl*) - [Radio button](guides/radio.md) 控件
- **resources** - (*LightboxControl*) - [Resources](guides/resources.md) 控件
- **select** - (*LightboxControl*) - [Select](guides/select.md) 控件
- **template** - (*LightboxControl*) - [Template](guides/template.md) 控件
- **textarea** - (*LightboxControl*) - [Textarea](guides/textarea.md) 控件
- **time** - (*LightboxControl*) - [Time](guides/time.md) 控件
- **time_optional** - (*LightboxControl*) - 支持切换 [section visibility](guides/time.md) 的 [Time](guides/time.md) 控件
- **typeselect** - (*LightboxControl*) - [Typeselect](guides/typeselect.md) 控件
- **[ControlName: string]** - (*LightboxControl | undefined*) - 自定义控件选项
