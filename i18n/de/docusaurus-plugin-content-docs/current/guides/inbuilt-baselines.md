---
title: "Zusätzliche Elemente in der Zeitleiste"
sidebar_label: "Zusätzliche Elemente in der Zeitleiste"
---

# Zusätzliche Elemente in der Zeitleiste


:::info
Dieses Feature ist ausschließlich in der PRO-Edition verfügbar
:::


Standardmäßig rendert dhtmlxGantt die Elemente der Zeitleiste als Ebenen in folgender Reihenfolge:

1. Grid der Zeitleiste
2. Verknüpfungen (Links)
3. Aufgaben (Tasks)
4. Zusätzliche Elemente

Gantt enthält eingebaute Elemente wie Basispläne (Baselines), Deadlines und Zeitbeschränkungen. Neben den standardmäßigen zusätzlichen Elementen können Sie auch [eigene Elemente als zusätzliche Ebenen erstellen](guides/baselines.md).

## Basispläne (Baselines)


Basispläne spielen eine entscheidende Rolle in Projektmanagement-Tools wie Gantt-Diagrammen, da sie den Vergleich zwischen dem geplanten Zeitplan und dem tatsächlichen Fortschritt ermöglichen. Die Gantt-API bietet integrierte Unterstützung für Baselines, was die Arbeit mit dieser wichtigen Funktion erleichtert.

![Integrierte Baselines](/img/inbuilt_baselines.png)


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


### Baselines anpassen

Falls die Standardoptionen für Baselines nicht zu den Anforderungen Ihres Projekts passen, können Sie sie mit der Option [baselines](api/config/baselines.md) deaktivieren.

~~~js
gantt.config.baselines = false;
~~~

Nach dem Deaktivieren können Sie das Erscheinungsbild der Baselines auf eine der folgenden Arten anpassen:

1. Verwendung des **gantt.config.baselines** Konfigurationsobjekts

Mit diesem Objekt können Sie einstellen, wie Baselines gerendert werden, wenn es als Objekt gesetzt ist. Es umfasst folgende Eigenschaften:

- **datastore** (*string*) - der Name des Datenspeichers für Baseline-Einträge. Weitere Informationen finden Sie in der Methode `getDatastore`.
- **render_mode** (*boolean | string*) - steuert die Darstellung der Baselines:
    - `false` - Baselines werden ausgeblendet.
    - `"taskRow"` - Baselines erscheinen in derselben Zeile wie die Aufgabenleiste.
    - `"separateRow"` - Baselines werden in einer separaten Unterzeile angezeigt, wodurch die Aufgabenzeile höher wird.
    - `"individualRow"` - Jede Baseline erhält eine eigene Unterzeile unterhalb der Aufgabe.
- **dataprocessor_baselines** (*boolean*) - gibt an, ob Aktualisierungen der Baselines den DataProcessor einzeln auslösen.
- **row_height** (*number*) - Höhe der Unterzeile für Baselines; nur relevant bei `render_mode` `"separateRow"` oder `"individualRow"`.
- **bar_height** (*number*) - Höhe der Baseline-Leiste.

Beispiel:

~~~js
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");
~~~

Wenn Sie die Anzeigeeinstellungen von **gantt.config.baselines** dynamisch ändern, wird empfohlen, die Methode [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) zu verwenden, um eine korrekte Darstellung der Baselines sicherzustellen.

~~~js
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task); /*!*/
gantt.render();
~~~

2. [Erstellen eines eigenen Baseline-Elements](guides/baselines.md), das in die Zeitleiste eingefügt wird.

### Baselines mit Aufgaben laden

Baselines können zusammen mit Aufgaben wie folgt geladen werden:

~~~js
gantt.parse({
  tasks: [
    {
      id: 2,
      start_date: "2025-04-04 00:00:00",
      duration: 2,
      text: "Task #1",
      progress: 0.5,
      parent: 0,
      open: true,
      end_date: "2025-04-06 00:00:00",
    },
    // Weitere Aufgaben...
  ],
  links: [],
  baselines: [ /*!*/
    { /*!*/
      id: 2, /*!*/
      task_id: 2, /*!*/
      start_date: "2025-04-03 00:00:00", /*!*/
      duration: 2, /*!*/
      end_date: "2025-04-05 00:00:00", /*!*/
    }, /*!*/
    // Weitere Baselines... /*!*/
  ], /*!*/
});
~~~

Nach dem Laden werden die Baselines automatisch in der Zeitleiste angezeigt, ohne dass weitere Einstellungen nötig sind.

### Baselines einer Aufgabe abrufen

Sie können die Baselines für eine bestimmte Aufgabe mit der Methode [getTaskBaselines](api/method/gettaskbaselines.md) abrufen.

~~~js
gantt.getTaskBaselines(5);
~~~

Dies gibt ein Array von Baseline-Objekten zurück, die mit der Aufgabe aus dem Datastore verknüpft sind.

~~~js
[
    {
        task_id: 5,
        id: 1, 
        duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00"
    },
    {
        task_id: 5,
        id: 2, 
        duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00"
    }
]
~~~

### Baselines im Lightbox

Baselines können direkt über das Lightbox-Steuerelement verwaltet werden, sodass Sie sie innerhalb der Aufgabendetails hinzufügen, bearbeiten und löschen können.

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

![Baseline Lightbox](/img/baselines_lightbox.png)

### Baseline-Anzeigemodi

Es gibt drei Möglichkeiten, Baselines anzuzeigen, die über die Option **gantt.config.baselines.render_mode** ausgewählt werden können:

- In derselben Zeile wie die Aufgabe ("taskRow")

Baselines erscheinen direkt neben den Aufgabenbalken:

~~~js
gantt.config.baselines.render_mode = "taskRow";
~~~

![Task Row Modus](/img/baselines_task_row.png)

- In einer separaten Unterzeile unter der Aufgabe ("separateRow")

Alle Baselines werden in einer Unterzeile unter jeder Aufgabe angezeigt:

~~~js
gantt.config.baselines.render_mode = "separateRow";
~~~

![Subrow Modus](/img/baselines_subrow.png)

- In einer eigenen Unterzeile ("individualRow")

Jede Baseline erhält zur besseren Übersicht eine eigene Unterzeile:

~~~js
gantt.config.baselines.render_mode = "individualRow";
~~~

![Individual Row Modus](/img/baselines_individual_row.png)

### Baseline-Text festlegen

Um individuellen Text innerhalb von Baseline-Elementen anzuzeigen, verwenden Sie das Template [baseline_text](api/template/baseline_text.md):

~~~js
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

## Deadlines und Einschränkungen


Das Verfolgen von Deadlines und Aufgabenbeschränkungen ist entscheidend für eine erfolgreiche Projektdurchführung. DHTMLX Gantt enthält integrierte Visualisierungen für Deadlines und Einschränkungen, um das Management der Projektzeitleiste zu verbessern.

![Deadlines](/img/deadlines.png)


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


### Visualisierung von Deadlines

Gantt unterstützt das Feld **task.deadline**. Wenn dieses gesetzt ist, wird ein visueller Marker im Diagramm angezeigt, um Deadlines zu überwachen.

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Task with Deadline",
      start_date: "2025-04-04",
      duration: 5,
      deadline: new Date(2025, 3, 10), // 10. April 2025 /*!*/
    },
    // Weitere Aufgaben...
  ],
});
~~~

### Deadlines anpassen

Falls das Standard-Deadline-Feature nicht Ihren Anforderungen entspricht, können Sie es mit der Option [deadlines](api/config/deadlines.md) deaktivieren.

~~~js
gantt.config.deadlines = false;
~~~

Nach dem Deaktivieren können Sie das Erscheinungsbild der Deadlines anpassen, indem Sie [ein eigenes Deadline-Element erstellen](guides/baselines.md) und zur Zeitleiste hinzufügen.

Die Einstellung **gantt.config.deadlines** steuert die Anzeige von Deadline-Elementen. Ist sie aktiviert, prüft Gantt die Eigenschaft **task.deadline** und zeigt bei gültigem Datum den Deadline-Marker in der Zeitleiste an.

### Aufgabenbeschränkungen (#taskconstraints)

Ab Version 9.0 zeigt Gantt automatisch Beschränkungsdaten im Diagramm an, wenn [Auto Scheduling](guides/auto-scheduling.md) aktiviert ist und im Constraint-Modus arbeitet (mit [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) auf *false* gesetzt).

~~~js
gantt.parse({
  data: [
    { 
      id: 1, 
      text: "Task #1", 
      start_date: "2025-04-04", 
      duration: 4, 
      constraint_date: "2025-04-04", 
      constraint_type: "snet", 
      parent: 0
    },
    // Weitere Aufgaben
  ]
})
~~~

Sie können die Anzeige von Einschränkungen über die Option `show_constraints` in der [auto_scheduling](api/config/auto_scheduling.md) Konfiguration steuern. Standardmäßig sind Einschränkungen sichtbar, Sie können sie aber durch Setzen von `show_constraints` auf `false` ausblenden:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

