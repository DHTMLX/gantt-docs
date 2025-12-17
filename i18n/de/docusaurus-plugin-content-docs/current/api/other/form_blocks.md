---
sidebar_label: form_blocks
title: form_blocks config
description: "ein Objekt, das die Lightbox-Steuerelemente enthält"
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

Dieses Objekt enthält verschiedene Arten von Steuerelementen:

- **checkbox** - (*LightboxControl*) - das [Checkbox](guides/checkbox.md) Steuerelement
- **constraint** - (*LightboxControl*) - das [Constraint](guides/constraint.md) Steuerelement
- **duration** - (*LightboxControl*) - das [Duration](guides/duration.md) Steuerelement
- **duration_optional** - (*LightboxControl*) - das [Duration](guides/duration.md) Steuerelement, das das Umschalten der [Abschnittssichtbarkeit](guides/duration.md#switchingsectionvisibility) unterstützt
- **parent** - (*LightboxControl*) - das [Parent](guides/parent.md) Steuerelement
- **radio** - (*LightboxControl*) - das [Radio button](guides/radio.md) Steuerelement
- **resources** - (*LightboxControl*) - das [Resources](guides/resources.md) Steuerelement
- **select** - (*LightboxControl*) - das [Select](guides/select.md) Steuerelement
- **template** - (*LightboxControl*) - das [Template](guides/template.md) Steuerelement
- **textarea** - (*LightboxControl*) - das [Textarea](guides/textarea.md) Steuerelement
- **time** - (*LightboxControl*) - das [Time](guides/time.md) Steuerelement
- **time_optional** - (*LightboxControl*) - das [Time](guides/time.md) Steuerelement, das das Umschalten der [Abschnittssichtbarkeit](guides/time.md#switchingsectionvisibility) unterstützt
- **typeselect** - (*LightboxControl*) - das [Typeselect](guides/typeselect.md) Steuerelement
- **[ControlName: string]** - (*LightboxControl | undefined*) - eine benutzerdefinierte Steuerungsoption
