---
sidebar_label: auto_scheduling
title: auto_scheduling Konfiguration
description: "ermöglicht automatische Terminplanung"
---

# auto_scheduling

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar. 
:::

### Description

@short: Aktiviert die automatische Terminplanung

@signature: auto_scheduling: AutoSchedulingConfig | boolean

### Example

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    gap_behavior: "compress"
};

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Diese Konfiguration wird in der **auto_scheduling**-Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im Artikel [Auto Scheduling](guides/auto-scheduling.md). 
:::

Während die `auto_scheduling`-Konfiguration auch als Boolean gesetzt werden kann, ist die Verwendung der Objekt-Definition der empfohlene Ansatz zur Konfiguration des Auto-Scheduling-Verhaltens. 


Wenn sie als Objekt gesetzt wird, stehen folgende Optionen zur Verfügung:


#### enabled

**Type**: boolean

**Default**: `false`

Schaltet das Auto Scheduling ein oder aus (gleichbedeutend mit der direkten Verwendung eines Boolean-Werts).

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

#### apply_constraints

**Type**: boolean

**Default**: `true`

Aktiviert bzw. deaktiviert die Nutzung von Zeitbeschränkungen für Auto Scheduling.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

Wird der Wert auf `false` gesetzt, wechselt Auto Scheduling in den Modus, der Beschränkungen, die mit Aufgaben verbunden sind, ignoriert (z. B. ASAP, ALAP, SNET usw.) und die Terminplanung hängt ausschließlich von den Abhängigkeiten der Aufgaben ab.

Diese Eigenschaft ersetzt die veraltete [](api/config/auto_scheduling_compatibility.md) Einstellung.

- [Basic Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)
- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

<span id="gapbehavior"></span>

#### gap_behavior

**Type**: String

**Allowed values**: `"preserve"`|`"compress"`

**Default**: `"preserve"`


Definiert, wie Gantt Lücken zwischen abhängigen Aufgaben während der Terminplanung behandelt.

- **"preserve"** - Aufgaben an ihren aktuellen Positionen belassen, wenn es keine Konflikte gibt
- **"compress"** - Aufgaben auf das frühestmögliche Datum verschieben (oder spätestes Datum, falls `schedule_from_end` aktiviert ist)

Standardmäßig werden Aufgaben nur dann neu geplant, wenn ihr aktuelles Datum eine Beschränkung oder Abhängigkeit verletzt. 

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

<span id="descendantlinks"></span>

#### descendant_links

**Type**: boolean

**Default**: `false`

Erlaubt oder verbietet das Erzeugen von Verknüpfungen zwischen übergeordneten Aufgaben (Projekten) und deren Unteraufgaben.

Standardmäßig können solche Verknüpfungen nicht erstellt werden.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    descendant_links: true
};
~~~


#### schedule_on_parse

**Type**: boolean

**Default**: `true`

Bestimmt, ob Gantt beim Laden/Parsen von Daten automatisch plant.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: false
};
~~~

#### move_projects

**Type**: boolean

**Default**: `true`

Standardmäßig (wenn die Eigenschaft auf *true* gesetzt ist) wird das gesamte Projekt während der automatischen Terminplanung verschoben. Das bedeutet, dass alle Aufgaben im Projekt relativ zueinander und zum Beginn des Projekts an ihren Plätzen bleiben.

![moving_project_true](/img/moving_project_true.png)


Wird die Eigenschaft *move_projects* auf *false* gesetzt, verschiebt Auto Scheduling einzelne Aufgaben innerhalb des Projekts. Folglich werden einige Aufgaben verschoben, andere bleiben an ihrem Platz.

![moving_project_false](/img/moving_project_false.png)


:::note
Wenn Sie die Constraint Scheduling verwenden (apply_constraints: true), ist die *move_projects*-Konfiguration nur aktiv, wenn die Eigenschaft `gap_behavior` auf "preserve" gesetzt ist:

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: true,
    move_projects: true,
    gap_behavior: "preserve"
};
~~~
:::

#### use_progress

**Type**: boolean

**Default**: `false`

Gibt an, ob abgeschlossene Aufgaben die Planung und die Berechnung des kritischen Pfads beeinflussen sollen.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
~~~

Wenn diese Eigenschaft aktiviert ist, berücksichtigen der kritische Pfad, der Puffer und die Auto-Scheduling-Algorithmen den Fortschritt der Aufgabe, ähnlich wie diese Methoden in MS Project funktionieren, nämlich:

1) Abgeschlossene Aufgaben (Aufgaben mit 100% Fortschritt) haben immer null Puffer;

2) Abgeschlossene Aufgaben werden von den Auto-Scheduling-Berechnungen ausgeschlossen. Beziehungen, die Vorgänger mit abgeschlossenen Aufgaben verbinden, werden ignoriert;

3) Abgeschlossene Aufgaben können nicht kritisch sein.

- [Use progress for auto-scheduling, critical path and slack calculations](https://snippet.dhtmlx.com/ju3km1uy)

#### schedule_from_end

**Type**: boolean

**Default**: `false`

Aktiviert die Rückwärtsplanung.

Wenn diese Konfiguration auf `true` gesetzt wird, wechselt Auto Scheduling in den Modus „as late as possible“.

Der Wert wird nur angewendet, wenn [](api/config/project_end.md) ebenfalls angegeben ist. 

~~~jsx
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

- [Backward Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

#### project_constraint

**Type**: boolean

**Default**: `false`

Definiert, ob Aufgaben den Beschränkungstyp von ihrem übergeordneten Projekt erben sollen.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

Standardmäßig hat der Beschränkungstyp des übergeordneten Projekts keinen Einfluss auf den Beschränkungstyp der verschachtelten Aufgaben.

Wenn Sie die Konfiguration auf *true* setzen, erhalten die einzelnen Aufgaben (außer Aufgaben mit eigenem Beschränkungstyp) denselben Beschränkungstyp wie ihr übergeordnetes Projekt (zum Beispiel, **finish no later than**).

- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

#### show_constraints

**Type**: boolean

**Default**: `false`

Steuert die Anzeige von Aufgabenbeschränkungen im Gantt-Diagramm.
Auf true setzen, um Beschränkungen anzuzeigen, oder auf false, um sie auszublenden.

Beispiel: Auto-Scheduling aktivieren, aber die Anzeige der Aufgabenbeschränkungen deaktivieren:

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    show_constraints: false
};
gantt.init("gantt_here");
~~~

- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Related API
- [project_start](api/config/project_start.md)
- [project_end](api/config/project_end.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [constraint_types](api/config/constraint_types.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- since v9.1, using the object configuration for `auto_scheduling` is the recommended approach
- Can be set as an object since v9.0