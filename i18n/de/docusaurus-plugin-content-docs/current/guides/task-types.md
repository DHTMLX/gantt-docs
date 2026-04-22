--- 
title: "Aufgabentypen"
sidebar_label: "Aufgabentypen"
---

# Aufgabentypen

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Es gibt drei vordefinierte Aufgabentypen, die Sie in einem Gantt-Diagramm darstellen können (Sie können auch einen benutzerdefinierten Typ hinzufügen):

1. [Eine reguläre Aufgabe (Standard)](guides/task-types.md#regular-tasks).
2. [Eine Projektaufgabe](guides/task-types.md#project-tasks).
3. [Ein Meilenstein](guides/task-types.md#milestones).

![task_types](/img/task_types.png)

Um den Typ einer Aufgabe festzulegen, verwenden Sie die [type](guides/loading.md#dataproperties) Eigenschaft eines Datenelements (*Werte werden im [`types`](api/config/types.md) Objekt gespeichert*):

~~~jsx title="Specifying the type of a task in the data set"
const data = {
    tasks: [
        { id: 1, text: "Project #1", type: "project", open: true },
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 },
        { id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", parent: 1 },
        { id: 4, text: "Task #2", start_date: "17-04-2025", duration: 3, parent: 1 },
    ],
    links: [
        { id: 1, source: "1", target: "2", type: "1" },
        { id: 2, source: "2", target: "3", type: "0" },
        { id: 3, source: "3", target: "4", type: "0" },
    ],
};
~~~

**Related sample**: [Projekte und Meilensteine](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Reguläre Aufgaben

Standardmäßig bietet dhtmlxGantt die Erstellung regulärer Aufgaben (Aufgaben mit **type="task"**).

![type_task](/img/type_task.png)

~~~jsx title="Specifying regular tasks"
const data = { 
    tasks: [
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 }, 
    ],
    links: [],
};
//or
const data = {
    tasks: [
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1, type: "task" }, 
    ],
    links: [],
};
~~~

**Related sample**: [Projekte und Meilensteine](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Aufgaben mit **type="task"** können wie folgt charakterisiert werden:

- Können 1 Elternteil und beliebig viele Unteraufgaben haben.
- Können gezogen und in der Größe verändert werden. 
- Hängen nicht von Unteraufgaben ab, d. h. wenn der Benutzer eine Unteraufgabe einer regulären Aufgabe zieht, ändert sich die Dauer bzw. der Fortschritt der Hauptaufgabe entsprechend nicht.
- Können auf den übergeordneten Projekten erscheinen. Siehe Details.
- Können in der Timeline ausgeblendet werden.


## Projektaufgaben

Projektaufgabe ist eine Aufgabe, die beginnt, wenn ihre früheste Unteraufgabe beginnt, und endet, wenn ihre späteste Unteraufgabe endet.

:::note
Der Unterschied zwischen Projekt- und Regulären Aufgaben besteht darin, dass die Dauer einer Projektaufgabe von ihren Kindern abhängt und entsprechend angepasst wird.
:::

![type_project](/img/type_project.png)

~~~jsx title="Specifying project tasks"
const data = {
    tasks: [
        { id: 1, text: "Project #1", type: "project", open: true }, 
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 },
        { id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", parent: 1 },
        { id: 4, text: "Task #2", start_date: "17-04-2025", duration: 3, parent: 1 },
    ],
    links: [],
};
~~~

**Related sample**: [Projekte und Meilensteine](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Aufgaben mit **type="project"** können wie folgt charakterisiert werden:

- Können 1 Elternteil und beliebig viele Unteraufgaben haben.
- Können nicht gezogen und in der Größe verändert werden, es sei denn Drag-and-Drop ist explizit über die Konfiguration [drag_project](api/config/drag_project.md) aktiviert.
- Hängen von Unteraufgaben ab, d. h. wenn der Benutzer eine Unteraufgabe einer Projektaufgabe verschiebt, ändert sich deren Dauer.
- Ignorieren die Eigenschaften **start_date**, **end_date**, **duration**.
- Können nicht gezogen werden, wenn sie keine Unteraufgaben haben.
- Der Fortschritt des Projekts wird standardmäßig explizit festgelegt und hängt nicht von Unteraufgaben ab. Wenn Sie möchten, dass er automatisch berechnet wird, müssen Sie Code dafür schreiben. [Siehe Beispiele](guides/how-to.md#how-to-calculate-task-progress-depending-on-child-tasks).

:::note
Um die Möglichkeit zu bieten, Projektaufgaben hinzuzufügen, lesen Sie den Artikel [Milestone](guides/milestones.md). Eine Möglichkeit, Meilensteine hinzuzufügen, garantiert, dass Ihre Endbenutzer auch Projektaufgaben hinzufügen können.
:::

## Meilensteine {#milestones}

[Meilenstein](guides/milestones.md) ist eine Aufgabe mit null Dauer, die verwendet wird, um wichtige Termine des Projekts zu markieren ([mehr Details](guides/milestones.md)).

![type_milestone](/img/type_milestone.png)

~~~jsx title="Specifying milestones"
const data = {
    tasks: [
        { id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", parent: 1 }, 
    ],
    links: [],
};
~~~

**Related sample**: [Projekte und Meilensteine](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Aufgaben mit **type="milestone"** können wie folgt charakterisiert werden:

- Können 1 Elternteil und beliebig viele Unteraufgaben haben.
- Können nicht gezogen oder in der Größe verändert werden.
- Haben null Dauer und behalten diese die ganze Zeit bei.
- Ignorieren die Eigenschaften **end_date**, **duration**, **progress**.
- Können auf den übergeordneten Projekten erscheinen. Siehe Details.
- Können in der Timeline ausgeblendet werden.

:::note
Um die Möglichkeit zu bieten, Meilensteine hinzuzufügen, lesen Sie den Artikel [Milestone](guides/milestones.md).
:::

## Spezifische Lightbox pro Aufgabentyp {#specificlightboxpertasktype}

Jeder Aufgabentyp hat seine eigenen Eigenschaften. Deshalb kann eine individuelle Konfiguration des Detailformulars (Lightbox) für jeden Typ definiert werden.
Alle Konfigurationen werden im [Lightbox-Objekt](api/config/lightbox.md) gespeichert.

Sie sind:

- **gantt.config.lightbox.sections** - für reguläre Aufgaben.
- **gantt.config.lightbox.project_sections** - für Projektaufgaben.
- **gantt.config.lightbox.milestone_sections** - für Meilensteine.

Die Standardkonfiguration lautet:

~~~jsx
gantt.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
    { name: "time", type: "duration", map_to: "auto" }
];

gantt.config.lightbox.project_sections = [
    { name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
    { name: "type", type: "typeselect", map_to: "type" },
    { name: "time", type: "duration", map_to: "auto", readonly: true }
];

gantt.config.lightbox.milestone_sections = [
    { name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
    { name: "type", type: "typeselect", map_to: "type" },
    { name: "time", type: "duration", map_to: "auto", single_date: true }
];
~~~

Wenn der Benutzer den Typ einer Aufgabe in der zugehörigen Auswahl ändert, wird die entsprechende Konfiguration auf das Lightbox-Popup angewendet und dynamisch aktualisiert.

Sie können auch [einen benutzerdefinierten Typ hinzufügen](guides/task-types.md#creating-a-custom-type) und ebenfalls eine entsprechende Struktur der Lightbox dafür festlegen.

Um ins Detail über eine Lightbox-Konfiguration zu gehen, können Sie das Kapitel [Configuring Edit Form](guides/edit-form.md) lesen.

## Erstellen eines benutzerdefinierten Typs

Alle Aufgabentypen werden im [types](api/config/types.md) Objekt definiert.

Im Allgemeinen müssen Sie, um einen benutzerdefinierten Aufgabentyp hinzuzufügen, Folgendes tun:

1. Einen neuen Wert zum [types](api/config/types.md) Objekt hinzufügen.
2. Einzelne Einstellungen für den neuen Typ definieren.

Nehmen wir an, Sie möchten einen neuen Aufgabentyp - **meeting** - hinzufügen.
**Meeting** wird eine gewöhnliche Aufgabe sein, aber in einer anderen Farbe und mit anderen Eingaben im Lightbox.

![custom_task_type](/img/custom_task_type.png)

Um einen neuen Typ mit dem Namen **meeting** zu definieren und eine individuelle Lightbox dafür anzugeben, verwenden Sie die folgende Technik:

Fügen Sie einen neuen Typ zum [types](api/config/types.md) Objekt hinzu:

~~~jsx
gantt.config.types.meeting = "type_id";
~~~

wobei "meeting" der programmatische Name des Typs ist. Das hat keinerlei Auswirkungen. Der einzige Zweck des programmatischen Typs ist es, die Arbeit mit Typen lesbarer zu machen.
"type_id" ist der Typ-Bezeichner, der in der Datenbank gespeichert wird. Der Typ-Bezeichner muss innerhalb des [types](api/config/types.md) Objekts eindeutig sein.

Setzen Sie das Label für den neuen Typ im "typeselect" Steuerelement:

~~~jsx
gantt.locale.labels.type_meeting = "Meeting";
~~~

Geben Sie eine neue Struktur der Lightbox für den neu-erstellten Typ an:

~~~jsx
gantt.config.lightbox.meeting_sections = [
    { name: "title", type: "textarea", map_to: "text", height: 20, focus: true },
    { name: "details", type: "textarea", map_to: "details", height: 70 },
    { name: "type", type: "typeselect", map_to: "type" },
    { name: "time", type: "time", map_to: "auto", height: 72 }
];

gantt.locale.labels.section_title = "Subject";
gantt.locale.labels.section_details = "Details";
~~~

Geben Sie einen Stil für den neuen Typ an und wenden Sie ihn über das [task_class](api/template/task_class.md) Template an:

~~~css
.meeting_task{
    border:2px solid #BFC518;
    color:#6ba8e3;
    background: #F2F67E;
}

.meeting_task .gantt_task_progress{
    background:#D9DF29;
}
~~~

~~~jsx
gantt.templates.task_class = (start, end, task) => {
    return task.type === gantt.config.types.meeting 
        ? "meeting_task" 
        : "";
};
~~~

Setzen Sie das Template für den Text der "meeting" Aufgaben mit dem [task_text](api/template/task_text.md) Template:

~~~jsx
gantt.templates.task_text = (start, end, task) =>
    task.type === gantt.config.types.meeting
        ? `Meeting: <b>${task.text}</b>`
        : task.text;
~~~

**Related sample**: [Custom task type](https://docs.dhtmlx.com/gantt/samples/04_customization/12_custom_task_type.html)


## Benutzerdefinierte Darstellung von Aufgabentypen

Um das Aussehen vorhandener Aufgabentypen anzupassen, verwenden Sie die [type_renderers](api/config/type_renderers.md) Option. Die Optionen ermöglichen es, Funktionen neu zu definieren, die für die Anzeige verschiedener Aufgabentypen auf der Seite verantwortlich sind.

![custom_look](/img/custom_look.png)

~~~jsx
gantt.config.type_renderers["project"] = (task, defaultRender) => {
    const taskBar = document.createElement("div");
    taskBar.setAttribute(gantt.config.task_attribute, task.id);
    taskBar.className = "custom-project";

    const taskSize = gantt.getTaskPosition(task);
    taskBar.innerHTML = [
        "<div class='project-left'></div>",
        "<div class='project-right'></div>"
    ].join('');

    taskBar.style.left = `${taskSize.left}px`;
    taskBar.style.top = `${taskSize.top + 7}px`;
    taskBar.style.width = `${taskSize.width}px`;

    return taskBar;
};
~~~

**Related sample**: [Klassischer Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)