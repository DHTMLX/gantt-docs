---
title: "Aufgaben aufteilen"
sidebar_label: "Aufgaben aufteilen"
---

# Aufgaben aufteilen

:::note
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Falls Sie eine große Aufgabe haben, die nicht kontinuierlich ist und unterbrochen werden kann, können Sie sie in mehrere Teile aufteilen. Es können so viele Teile entstehen, wie benötigt.

Auf Datenspeicher-Ebene können solche Aufgaben als Summenaufgabe (Projekt) mit Unteraufgaben dargestellt werden, wobei jede Unteraufgabe einen isolierten Teil der Hauptaufgabe definiert.

![Summenaufgabe](/img/split_task_inside.png)

Die können Sie in einer Zeile als eine einzige Aufgabe anzeigen:

![Geteilte Aufgabe](/img/split_task.png)

Um ein Projekt als geteilte Aufgabe anzuzeigen, müssen Sie seine Eigenschaft `render` auf `split` setzen:

~~~js
const tasks = [
    { id: 1, text: "Task #2", start_date: "03-04-2027 00:00", type: "project", render: "split" },
    { id: 2, text: "Stage #1", start_date: "03-04-2027 00:00", duration: 1, parent: 1 },
    { id: 3, text: "Stage #2", start_date: "05-04-2027 00:00", duration: 2, parent: 1 },
    { id: 4, text: "Stage #3", start_date: "08-04-2027 00:00", duration: 1, parent: 1 }
];
~~~

Die Aufgabe "Task #2" wird gesplittet und als Gruppe von Aufgaben gerendert: "Stage #1", "Stage #2" und "Stage #3", die vollständig interaktiv sind.

**Zugehöriges Beispiel**: [Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

Um eine Split-Aufgabe im typischen Baum-Modus anzuzeigen, d. h. als Projekt mit Unteraufgaben, müssen Sie einfach den Wert der Eigenschaft `task.render` ändern und Gantt neu rendern:

~~~js
const task = gantt.getTask(1);

// repaint task in the 'split' mode
task.render = "split";
gantt.render();

// repaint task in the regular (tree) mode
task.render = "";
gantt.render();
~~~

Zum Beispiel ist es möglich, eine Steuerung, die der Eigenschaft `task.render` zugeordnet ist, in den Lightbox einzufügen, um dynamisch zwischen den Ansichten Split und Hierarchie zu wechseln. Siehe ein Beispiel im untenstehenden Abschnitt.

### Dynamisches Umschalten des Split-Modus

Sie können die Lightbox so konfigurieren, dass das Umschalten des Split-Modus für die Aufgabe ein- und ausgeschaltet werden kann. Dazu können Sie dem Lightbox eine neue Sektion mit einem Kontrollkästchen hinzufügen, indem Sie die Konfigurations-Einstellungen für Projekttypen von Aufgaben ändern – [`gantt.config.lightbox.project_sections`](guides/task-types.md#specificlightboxpertasktype) – und eine Bezeichnung für die neue Sektion festlegen:

~~~js
gantt.locale.labels.section_split = "Display";
gantt.config.lightbox.project_sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    {
        name: "split",
        type: "checkbox",
        map_to: "render",
        options: [
            { key: "split", label: "Split Task" }
        ]
    },
    { name: "time", type: "duration", readonly: true, map_to: "auto" }
];
~~~

Das Ergebnis sieht dann so aus:

![Split task checkbox](/img/split_task_checkbox.png)

Wenn das Kontrollkästchen deaktiviert ist, wird eine Split-Aufgabe als Projekt mit Unteraufgaben gerendert.

**Zugehöriges Beispiel**: [Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

## Prüfen, ob eine Aufgabe gesplittet ist

Sie können prüfen, ob eine Aufgabe gesplittet ist, mithilfe der Methode [`isSplitTask()`](api/method/issplittask.md). Sie nimmt das Aufgabenobjekt als Argument entgegen und gibt `true` zurück, wenn die Aufgabe gesplittet ist.

~~~js
const task = gantt.getTask(1);

if (gantt.isSplitTask(task)) {
    // ...
}
~~~

## Erweitern/einklappen geteilte Aufgaben {#expandingcollapsingsplittasks}

Falls Sie eine geteilte Aufgabe direkt über die Tabellenoberfläche erweitern bzw. einklappen möchten, gibt es eine spezielle Konfigurationsoption, die Ihnen dabei hilft. Sie heißt [`open_split_tasks`](api/config/open_split_tasks.md) und nimmt einen Boolean-Wert entgegen, um eine geteilte Aufgabe erweiterbar zu machen oder zu verhindern.

~~~js
gantt.config.open_split_tasks = true;
~~~

![Ausklappen geteilte Aufgabe](/img/expand_split_task.png)

## Platzierung der Unteraufgaben eines Splits pro Kind

Standardmäßig werden geteilte Unteraufgaben inline in der Zeile des Elternteils gerendert, wenn die Elternzeile zusammengeklappt ist, und bei Erweiterung der Elternzeile in Unterzeilen verschoben.
Sie können dieses Verhalten pro Kind steuern, indem Sie die Eigenschaft `split_placement` eines Aufgabenobjekts verwenden und je nach Zustand der Elternzeile den entsprechenden Modus der Aufgabenteilung anwenden:

- wenn die Elternzeile zusammengeklappt ist:
    - `split_placement: "auto" (default)` - eine Unteraufgabe wird in der Elternzeile gerendert
    - `split_placement: "inline"` - eine Unteraufgabe wird in der Elternzeile gerendert
    - `split_placement: "subrow"` - eine Unteraufgabe ist nicht sichtbar
- wenn die Elternzeile erweitert ist:
    - `split_placement: "auto" (default)` - eine Unteraufgabe wird als Unterzeile gerendert
    - `split_placement: "inline"` - eine Unteraufgabe wird in der Elternzeile gerendert
    - `split_placement: "subrow"` - eine Unteraufgabe wird als Unterzeile gerendert

~~~js
const tasks = [
    // die Elternzeile ist beim Rendern erweitert
    { id: 10, text: "Creative Production", start_date: "01-04-2027", render: "split", duration: 35, parent: 1 },
    // die Unteraufgabe wird in der Elternzeile gerendert
    { id: 11, text: "Photo Shoot", start_date: "03-04-2027", split_placement: "inline", duration: 3, parent: 10 },
    // die Unteraufgabe wird als Unterzeile gerendert
    { id: 12, text: "Video Editing", start_date: "08-04-2027", split_placement: "subrow", duration: 10, parent: 10 },
    // die Unteraufgabe wird in der Elternzeile gerendert (Standard)
    { id: 13, text: "Copywriting", start_date: "04-04-2027", duration: 7, parent: 10 }
];
~~~

**Zugehöriges Beispiel**: [Per-child placement of split subtasks](https://docs.dhtmlx.com/gantt/samples/04_customization/26_custom_child_split_tasks.html)

## Filtern split Task

Um die Unteraufgaben der im Gantt-Diagramm dargestellten Split-Aufgabe zu filtern, verwenden Sie das Event [`onBeforeSplitTaskDisplay`](api/event/onbeforesplittaskdisplay.md) und geben Sie zurück:

- *true*, für eine Unteraufgabe, die Sie anzeigen möchten
- *false*, für eine Unteraufgabe, die nicht angezeigt werden soll

~~~js
gantt.attachEvent("onBeforeSplitTaskDisplay", (id, task, parent) => {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

## Styling

Split-Aufgaben sind als Unteraufgaben eines Eltern-Elements definiert, und der hellgrüne Balken im Hintergrund ist der Balken dieses Eltern-Elements mit zusätzlichen Styles.

Wenn Split-Aufgaben zusammengeklappt sind und in einer einzigen Zeile angezeigt werden, wird der hellgrüne Balken des übergeordneten Elements weiterhin an derselben Position gerendert, jedoch mit geänderter Transparenz (Opacity) und Z-Index-Werten.

![](/img/split_task_style.png)

**Zugehöriges Beispiel**: [Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)

Sie können die Farbe des Balkens des übergeordneten Elements auf dieselbe Weise ändern, wie Sie alle Balken im [Timeline](guides/css-overview.md#styling-timeline) stylen oder ihn vollständig per CSS ausblenden:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~

**Zugehöriges Beispiel**: [Hide transparent parent bar of the split tasks](https://snippet.dhtmlx.com/svgo5vfn)

Wenn Sie nur eine einzige Split-Aufgabe haben, wird der Summen-Eintrag (`type="project"`) unsichtbar, weil er vollständig von der Split-Aufgabe überdeckt wird. Falls es keine Split-Unteraufgaben gibt, hat der Summen-Eintrag ein Standarddatum und eine Standarddauer.

### Styling separater Split-Aufgaben

Seit Version 8.0 kommen Split-Aufgaben in Template-Funktionen mit der Eigenschaft `task.$rendered_at`, die die ID einer Zeile enthält, in der die Split-Aufgabe gerendert wird. Um bestimmte Split-Aufgaben basierend auf der Zeile, in der sie angezeigt werden, zu stylen, können Sie das Template [`task_class`](api/template/task_class.md) verwenden:

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.$rendered_at) {
        if (gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-split-task";
        }
    }
    return "";
};
~~~