---
sidebar_label: form_blocks
title: form_blocks config
description: "라이트박스 컨트롤을 포함하는 객체"
---

# form_blocks

### Description

@short: 라이트박스 컨트롤을 포함하는 객체

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

이 객체는 여러 종류의 컨트롤을 포함합니다:

- **checkbox** - (*LightboxControl*) - [Checkbox](guides/checkbox.md) 컨트롤
- **constraint** - (*LightboxControl*) - [Constraint](guides/constraint.md) 컨트롤
- **duration** - (*LightboxControl*) - [Duration](guides/duration.md) 컨트롤
- **duration_optional** - (*LightboxControl*) - [Duration](guides/duration.md) 컨트롤로, [section visibility 토글](guides/duration.md#switchingsectionvisibility)을 지원
- **parent** - (*LightboxControl*) - [Parent](guides/parent.md) 컨트롤
- **radio** - (*LightboxControl*) - [Radio button](guides/radio.md) 컨트롤
- **resources** - (*LightboxControl*) - [Resources](guides/resources.md) 컨트롤
- **select** - (*LightboxControl*) - [Select](guides/select.md) 컨트롤
- **template** - (*LightboxControl*) - [Template](guides/template.md) 컨트롤
- **textarea** - (*LightboxControl*) - [Textarea](guides/textarea.md) 컨트롤
- **time** - (*LightboxControl*) - [Time](guides/time.md) 컨트롤
- **time_optional** - (*LightboxControl*) - [Time](guides/time.md) 컨트롤로, [section visibility 토글](guides/time.md#switchingsectionvisibility)을 지원
- **typeselect** - (*LightboxControl*) - [Typeselect](guides/typeselect.md) 컨트롤
- **[ControlName: string]** - (*LightboxControl | undefined*) - 커스텀 컨트롤 옵션
