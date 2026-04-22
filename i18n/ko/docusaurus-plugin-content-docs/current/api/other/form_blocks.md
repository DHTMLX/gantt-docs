---
sidebar_label: form_blocks
title: form_blocks 구성
description: "Lightbox 컨트롤의 객체"
---

# form_blocks

### Description

@short: Lightbox 컨트롤의 객체

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

- **checkbox** - (*LightboxControl*) - the [Checkbox](guides/checkbox.md) 컨트롤
- **constraint** - (*LightboxControl*) - the [Constraint](guides/constraint.md) 컨트롤
- **duration** - (*LightboxControl*) - the [Duration](guides/duration.md) 컨트롤
- **duration_optional** - (*LightboxControl*) - the [Duration](guides/duration.md) 컨트롤 that allows changing the [section visibility](guides/duration.md#switching-section-visibility)
- **parent** - (*LightboxControl*) - the [Parent](guides/parent.md) 컨트롤
- **radio** - (*LightboxControl*) - the [Radio 버튼](guides/radio.md) 컨트롤
- **resources** - (*LightboxControl*) - the [Resources](guides/resources.md) 컨트롤
- **select** - (*LightboxControl*) - the [Select](guides/select.md) 컨트롤
- **template** - (*LightboxControl*) - the [Template](guides/template.md) 컨트롤
- **textarea** - (*LightboxControl*) - the [Textarea](guides/textarea.md) 컨트롤
- **time** - (*LightboxControl*) - the [Time](guides/time.md) 컨트롤
- **time_optional** - (*LightboxControl*) - the [Time](guides/time.md) 컨트롤 that allows changing the [section visibility](guides/time.md#switching-section-visibility)
- **typeselect** - (*LightboxControl*) - the [Typeselect](guides/typeselect.md) 컨트롤
- **[ControlName: string]** - (*LightboxControl | undefined*) - 사용자 정의 컨트롤