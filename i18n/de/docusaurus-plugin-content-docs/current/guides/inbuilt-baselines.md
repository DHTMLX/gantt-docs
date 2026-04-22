---  
title: "Zusätzliche Elemente in der Zeitachse"  
sidebar_label: "Zusätzliche Elemente in der Zeitachse"  
---  

# Zusatzliche Elemente in der Zeitachse

:::info  
Diese Funktionalität ist nur in der PRO-Edition verfügbar.  
:::  


Standardmäßig rendert dhtmlxGantt Elemente des Zeitachsen-Bereichs als Ebenen (Schichten) und führt dies in der folgenden Reihenfolge aus:

1. Gitter der Zeitachse
2. Verknüpfungen
3. Aufgaben
4. Zusätzliche Elemente

Gantt enthält solche eingebauten Elemente wie Baselines, Fristen und zeitliche Beschränkungen. Anstelle der standardmäßigen zusätzlichen Elemente können Sie auch [benutzerdefinierte Elemente als zusätzliche Ebenen erstellen](guides/baselines.md).  

## Baselines

In Projektmanagement-Tools wie Gantt-Diagrammen sind Baselines wichtig, um den geplanten Projektzeitplan mit dem tatsächlichen Fortschritt zu vergleichen. Die Gantt-API bietet integrierte Unterstützung für Baseline-Entitäten und vereinfacht die Arbeit mit diesem wichtigen Element erheblich.

![Eingebaute Baselines](/img/inbuilt_baselines.png)

[Baselines anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Anpassen von Baselines

Falls die Standardfunktionalität für Baselines nicht Ihren Projektanforderungen entspricht, können Sie sie mit der Konfigurationsoption [baselines](api/config/baselines.md) deaktivieren.

~~~js
gantt.config.baselines = false;
~~~

Anschließend können Sie die Anzeige der Baselines auf eine der folgenden Arten anpassen:

1. Über das **gantt.config.baselines**-Konfigurationsobjekt

Die **baselines**-Konfigurationsoption ermöglicht die Anpassung der Rendering-Darstellung von Baselines im Gantt-Diagramm, wenn sie als Objekt festgelegt wird. Das Objekt enthält folgende Eigenschaften:

- **datastore** (*string*) - der Name des Datenspeichers, der zum Speichern von Baseline-Einträgen verwendet wird. Für verwandte Funktionen siehe die `getDatastore`-Methode.
- **render_mode** (*boolean | string*) - bestimmt, wie Baselines angezeigt werden:
    - `false` - Baselines werden nicht angezeigt.
    - `"taskRow"` - Baselines werden in derselben Zeile wie der Task-Leiste angezeigt.
    - `"separateRow"` - Baselines werden in einer separaten Unterzeile angezeigt, wodurch die Höhe der Task-Reihe vergrößert wird.
    - `"individualRow"` - jede Baseline wird in ihrer eigenen Unterzeile unterhalb der Aufgabe angezeigt.
- **dataprocessor_baselines** (*boolean*) - gibt an, ob Baseline-Aktualisierungen den DataProcessor als einzelne Einträge auslösen.
- **row_height** (*number*) - definiert die Höhe der Unterzeile für Baselines, gilt nur, wenn `render_mode` auf `"separateRow"` oder `"individualRow"` gesetzt ist.
- **bar_height** (*number*) - legt die Höhe der Baseline-Leiste fest.

Zum Beispiel:

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

Wenn Sie die Anzeigeeinstellungen der **gantt.config.baselines**-Konfiguration dynamisch ändern, sollten Sie die [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) Methode verwenden, um eine ordnungsgemäße Darstellung der Baseline-Elemente zu gewährleisten.

~~~js
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task); /*!*/
gantt.render();
~~~

2. [Erstellen eines benutzerdefinierten Baseline-Elements](guides/baselines.md) zum Hinzufügen in die Zeitachse.

### Baselines zusammen mit Aufgaben laden

Baselines können direkt zusammen mit Aufgaben geladen werden. Das folgende Beispiel zeigt dies:

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
    // Zusätzliche Aufgaben...
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
    // Zusätzliche Baselines... /*!*/
  ], /*!*/
});
~~~

Sobald Baselines geladen sind, zeigt Gantt sie automatisch in der Zeitachse an, ohne weitere Konfiguration.

### Baselines eines Tasks abrufen

Sie können die Baselines eines bestimmten Tasks mit der [getTaskBaselines](api/method/gettaskbaselines.md) Methode abrufen. 

~~~js
gantt.getTaskBaselines(5);
~~~

Die Methode gibt ein Array von Baseline-Objekten des angegebenen Tasks aus dem Datastore zurück.

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

Sie können Baselines über die Lightbox-Steuerung verwalten. Baselines hinzufügen, bearbeiten und löschen ist direkt aus den Task-Details möglich.

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

![Baseline Lightbox](/img/baselines_lightbox.png)

### Baselines-Darstellungsmodi

Gantt bietet drei Modi zur Anzeige von Baselines. Sie können den Darstellungsmodus wählen, der am besten zu Ihren Anforderungen passt, indem Sie die Konfigurationsoption **gantt.config.baselines.render_mode** auf den entsprechenden Wert setzen. Es stehen drei Modi zur Verfügung:

- In derselben Zeile wie der Task-Leiste ("taskRow")

Baselines werden direkt in derselben Zeile mit den Task-Bars angezeigt:

~~~js
gantt.config.baselines.render_mode = "taskRow";
~~~

![Task row mode](/img/baselines_task_row.png)

- In einer separaten Unterzeile unter dem Task ("separateRow")

Alle Baselines werden in einer einzigen Unterzeile unter jedem Task gerendert:

~~~js
gantt.config.baselines.render_mode = "separateRow";
~~~

![Subrow mode](/img/baselines_subrow.png)

- In einer einzelnen Unterzeile ("individualRow")

Jede Baseline wird in ihrer eigenen Unterzeile zur maximalen Übersicht angezeigt:

~~~js
gantt.config.baselines.render_mode = "individualRow";
~~~

![Individual row mode](/img/baselines_individual_row.png)

### Baseline-Text festlegen

Um einen Text festzulegen, der innerhalb des Baseline-Elements angezeigt werden soll, verwenden Sie die [baseline_text](api/template/baseline_text.md) Vorlage:

~~~js
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

## Fristen und Beschränkungen

Im Projektmanagement ist das Verfolgen von Fristen und das Verstehen von Beschränkungen von entscheidender Bedeutung für eine rechtzeitige Lieferung. DHTMLX Gantt bietet eine integrierte Visualisierung für Fristen und Beschränkungen, wodurch die Verwaltung von Projektzeitplänen effektiver wird.

![Deadlines](/img/deadlines.png)

[Fristen anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Visualisierung von Fristen

Gantt unterstützt das Feld **task.deadline**. Wenn es angegeben ist, wird ein visueller Indikator im Diagramm angezeigt, wodurch die Verfolgung von Aufgabenfristen vereinfacht wird.

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Task with Deadline",
      start_date: "2025-04-04",
      duration: 5,
      deadline: new Date(2025, 3, 10), // April 10, 2025 /*!*/
    },
    // Zusätzliche Aufgaben...
  ],
});
~~~

### Anpassen von Fristen

Falls die Standard-Fristen-Funktionalität nicht Ihren Projektanforderungen entspricht, können Sie sie über die [deadlines](api/config/deadlines.md) Konfigurationsoption deaktivieren.

~~~js
gantt.config.deadlines = false;
~~~

Danach können Sie die Anzeige von Fristen anpassen, indem Sie [ein benutzerdefiniertes Deadline-Element erstellen](guides/baselines.md) und in die Timeline aufnehmen.

Die **gantt.config.deadlines**-Konfiguration ermöglicht bzw. verhindert die Anzeige von Fristen-Elementen für Aufgaben. Falls aktiviert, prüft Gantt die Eigenschaft **task.deadline** und, falls sie ein gültiges Datum enthält, wird das Deadline-Element in der Zeitachse angezeigt.

### Task-Beschränkungen

Seit Version v9.0 zeigt Gantt automatisch Beschränkungsdaten in der Grafik an, wenn [Auto Scheduling](guides/auto-scheduling.md) aktiviert ist und im Constraint-Modus arbeitet ([auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) ist auf *false* gesetzt).

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
    // Zusätzliche Aufgaben
  ]
})
~~~

Die Anzeige von Beschränkungen kann über die `show_constraints`-Option in der [auto_scheduling](api/config/auto_scheduling.md)-Konfiguration gesteuert werden. Standardmäßig werden Beschränkungen angezeigt, aber Sie können sie deaktivieren, indem Sie `show_constraints` auf `false` setzen:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
~~~

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)