---
sidebar_label: form_blocks
title: form_blocks Konfiguration
description: "ein Objekt der Lightbox-Steuerungen"
---

# form_blocks

### Description

@short: Ein Objekt, das die Lightbox-Steuerelemente enthält

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

Das Objekt hat die folgenden Typen:

- **checkbox** - (*LightboxControl*) - die [Checkbox](guides/checkbox.md) Steuerung
- **constraint** - (*LightboxControl*) - die [Constraint](guides/constraint.md) Steuerung
- **duration** - (*LightboxControl*) - die [Duration](guides/duration.md) Steuerung
- **duration_optional** - (*LightboxControl*) - die [Duration](guides/duration.md) Steuerung, die die [Abschnittssichtbarkeit](guides/duration.md#switching-section-visibility) ändern lässt
- **parent** - (*LightboxControl*) - die [Parent](guides/parent.md) Steuerung
- **radio** - (*LightboxControl*) - die [Radio button](guides/radio.md) Steuerung
- **resources** - (*LightboxControl*) - die [Resources](guides/resources.md) Steuerung
- **select** - (*LightboxControl*) - die [Select](guides/select.md) Steuerung
- **template** - (*LightboxControl*) - die [Template](guides/template.md) Steuerung
- **textarea** - (*LightboxControl*) - die [Textarea](guides/textarea.md) Steuerung
- **time** - (*LightboxControl*) - die [Time](guides/time.md) Steuerung
- **time_optional** - (*LightboxControl*) - die [Time](guides/time.md) Steuerung, die die [Abschnittssichtbarkeit](guides/time.md#switching-section-visibility) ändern lässt
- **typeselect** - (*LightboxControl*) - die [Typeselect](guides/typeselect.md) Steuerung
- **[ControlName: string]** - (*LightboxControl | undefined*) - eine benutzerdefinierte Steuerung