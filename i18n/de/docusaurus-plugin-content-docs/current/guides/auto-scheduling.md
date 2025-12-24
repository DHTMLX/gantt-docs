---
title: "Auto Scheduling"
sidebar_label: "Auto Scheduling"
---

# Auto Scheduling


:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

Die Bibliothek enthält die **auto_scheduling**-Erweiterung, mit der Gantt Aufgaben automatisch basierend auf deren Beziehungen planen kann.

![auto_scheduling](/img/auto_scheduling.png)

Beispielsweise nehmen wir zwei Aufgaben, die durch eine Abhängigkeit verbunden sind, wobei die zweite Aufgabe direkt nach Abschluss der ersten beginnt. Wenn sich der Zeitplan der ersten Aufgabe ändert, aktualisiert die automatische Planung das Startdatum der zweiten Aufgabe entsprechend. Dies hilft, den Projektzeitplan einzuhalten, indem Aufgabenbeziehungen definiert werden, ohne dass die Daten jeder Aufgabe manuell angepasst werden müssen.

## Verwendung


Um die automatische Planung zu aktivieren, aktivieren Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin mit der [gantt.plugins](api/method/plugins.md)-Methode:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

Setzen Sie anschließend die **auto_scheduling**-Eigenschaft auf *true*:

~~~js
gantt.config.auto_scheduling = true;
~~~


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


Auch bei aktivierter automatischer Planung können Aufgaben bei Bedarf weiterhin manuell geplant werden.

## Vorwärts-/Rückwärtsplanung


### Projektplanungsstrategien

Die Aufgabenplanung kann zwei Ansätze verfolgen: Vorwärts- und Rückwärtsplanung. Diese hängen von bestimmten Konfigurationseinstellungen ab:

- [schedule_from_end](api/config/schedule_from_end.md) - (*boolean*) bestimmt den Planungstyp
- [project_start](api/config/project_start.md) - (*Date*) legt das Projektstartdatum fest; wird als Standardstartdatum bei Vorwärtsplanung verwendet, Standardwert ist *null*
- [project_end](api/config/project_end.md) - (*Date*) legt das Projektendedatum fest; wird als Standardaufgabenzeit bei Rückwärtsplanung verwendet, Standardwert ist *null*

### Vorwärtsplanung

Die Vorwärtsplanung ist der Standardmodus, mit **gantt.config.schedule_from_end** auf *false* gesetzt.

~~~js
// Vorwärtsplanung ist aktiv
gantt.config.schedule_from_end = false;
~~~

In diesem Modus werden Aufgaben ab dem Projektstartdatum oder dem frühesten Aufgabenbeginn geplant, mit dem Ziel, Aufgaben so früh wie möglich zu beginnen, sofern keine anderen Einschränkungen bestehen.

Optional können Sie das Projektstartdatum mit **gantt.config.project_start** definieren:

~~~js
gantt.config.project_start = new Date(2019, 2, 1);
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### Rückwärtsplanung

Bei der Rückwärtsplanung werden Aufgaben ab dem Projektendedatum geplant. Um dies zu nutzen, setzen Sie **gantt.config.schedule_from_end** auf *true* und geben Sie das Projektendedatum mit **gantt.config.project_end** an:

~~~js
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2019, 4, 1);
~~~

Hier werden Aufgaben so spät wie möglich geplant, wobei die letzte Aufgabe am Projektendedatum endet.


[Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)


## Zeitliche Einschränkungen für Aufgaben {#timeconstraintsfortasks}

Mit dhtmlxGantt können Sie zusätzliche zeitliche Einschränkungen für Aufgaben anwenden.

:::note
Zeitliche Einschränkungen gelten nur für Aufgaben und [Meilensteine](guides/milestones.md). Projekte sind davon nicht betroffen.
:::

### Hinzufügen von Einschränkungen über die Lightbox

Einschränkungen können über das [**Constraint**-Steuerelement](guides/constraint.md) in der Lightbox einer Aufgabe gesetzt werden.

![Integrierter Datepicker für Einschränkungen](/img/inbuilt_constraint_datepicker.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" }, /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

### Hinzufügen von Einschränkungen über Inline-Editoren

Einschränkungen können auch über separate Spalten im Grid für Einschränkungstyp und -datum mit Inline-Editoren angegeben werden.

![Einschränkungs-Spalten](/img/constraints_columns.png)

Verwenden Sie entsprechend die Spaltennamen **constraint_type** und **constraint_date**.

~~~js
const constraintTypeEditor = {
    type: "select", map_to: "constraint_type", options: [
        { key: "asap", label: gantt.locale.labels.asap },
        { key: "alap", label: gantt.locale.labels.alap },
        { key: "snet", label: gantt.locale.labels.snet },
        // weitere Optionen
    ]
};

const constraintDateEditor = {
    type: "date",
    map_to: "constraint_date",
    min: new Date(2019, 0, 1),
    max: new Date(2020, 0, 1)
};

gantt.config.columns = [
    { // vorherige Spalte},
    {
        name:"constraint_type", align:"center", width:100, template:function (task){
            return gantt.locale.labels[gantt.getConstraintType(task)];
        }, resize: true, editor: constraintTypeEditor
    },
    {
        name:"constraint_date", align:"center", width:120, template:function (task) {
        //template logic
        },
        resize: true, editor: constraintDateEditor
    },
    { name: "add", width: 44 }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### Einschränkungstypen

Es stehen mehrere zeitliche Einschränkungen zur Auswahl:

1. **So früh wie möglich** - Für unabhängige Aufgaben mit aktiviertem **strict**-Modus startet die Aufgabe mit dem Projektbeginn. Ohne **strict**-Modus startet sie am angegebenen Datum. Bei abhängigen Aufgaben beginnt die Aufgabe, sobald alle Vorgänger abgeschlossen sind.

2. **So spät wie möglich** - Unabhängige Aufgaben enden mit dem Projektende. Abhängige Aufgaben enden, wenn ihr direkter Nachfolger beginnt.

Weitere Einschränkungen gelten unabhängig vom Aufgabentyp:

3. **Beginnt nicht vor** - Aufgabe beginnt am oder nach dem angegebenen Datum.

4. **Beginnt nicht nach** - Aufgabe beginnt am oder vor dem angegebenen Datum.

5. **Endet nicht vor** - Aufgabe endet am oder nach dem angegebenen Datum.

6. **Endet nicht nach** - Aufgabe endet am oder vor dem angegebenen Datum.

7. **Muss beginnen am** - Aufgabe beginnt genau am angegebenen Datum.

8. **Muss enden am** - Aufgabe endet genau am angegebenen Datum.

:::note
Unabhängige Aufgaben sind solche ohne Vorgänger oder Nachfolger - keine Verknüpfungen oder Beziehungen, die sie oder ihre übergeordneten Aufgaben mit anderen verbinden.
:::

## Festlegen von Pufferzeiten (Lag und Lead) zwischen Aufgaben {#settinglagandleadtimesbetweentasks}

Mit Lag- und Leadzeiten lassen sich komplexere Abhängigkeiten zwischen Aufgaben definieren.

Lag ist eine Verzögerung nach Abschluss eines Vorgängers, bevor der Nachfolger beginnt. Lead ist eine Überlappung, bei der der Nachfolger beginnt, bevor der Vorgänger abgeschlossen ist.

Es gibt zwei Arten von Nachfolger-Aufgaben:

- Aufgaben, die vor dem Ende ihres Vorgängers beginnen (Lead). Zum Beispiel bedeutet ein Lead von 1 Tag, dass der Nachfolger einen Tag vor dem Ende des Vorgängers beginnt.

- Aufgaben, die nach einer Verzögerung nach dem Abschluss des Vorgängers beginnen (Lag). Zum Beispiel bedeutet ein Lag von 1 Tag, dass der Nachfolger einen Tag nach dem Ende des Vorgängers beginnt.

Lag- und Leadwerte werden in der **link.lag**-Eigenschaft des Link-Objekts gesetzt:

- Lag: positive ganze Zahl
- Lead: negativer Lag-Wert

Standardmäßig haben Abhängigkeitsverknüpfungen einen Lag von 0.

### Bearbeiten von Link-Werten aus der UI

Gantt bietet keine integrierte Benutzeroberfläche zum Bearbeiten von Lag oder anderen Link-Eigenschaften, aber Sie können dies selbst implementieren, indem Sie den Hinweisen im
[verwandten Kapitel](guides/crud-dependency.md#editinglinkvaluesfromui) folgen.

**Related example:** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)

## Automatische Planung für bestimmte Aufgaben deaktivieren


Um die automatische Planung für eine bestimmte Aufgabe zu deaktivieren und sie manuell zu planen, setzen Sie die **auto_scheduling**-Eigenschaft der Aufgabe auf *false*:

~~~js
var task = gantt.getTask(id);
task.auto_scheduling = false;
~~~

Alternativ können Sie die automatische Planung für eine Aufgabe mit dem [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)-Event-Handler blockieren:

~~~js
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, start, link, predecessor){
    if(task.completed) {
        return false;
    }
    return true;
});
~~~

## Abgeschlossene Aufgaben planen


Standardmäßig behandelt die automatische Planung abgeschlossene Aufgaben (mit Fortschrittswert 1) genauso wie unvollständige Aufgaben.

Sie können dieses Verhalten ändern, indem Sie die Option [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) aktivieren:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

Mit dieser Einstellung werden abgeschlossene Aufgaben aus dem kritischen Pfad und der automatischen Planung ausgeschlossen.

Weitere Details finden Sie auf der [API-Seite](api/config/auto_scheduling_use_progress.md).


## API-Übersicht

Hier sind die verfügbaren Methoden und Eigenschaften:

- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [autoSchedule](api/method/autoschedule.md)
- [isUnscheduledTask](api/method/isunscheduledtask.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [getConnectedGroup](api/method/getconnectedgroup.md)

### Aktivierung

Aktivieren Sie die automatische Planung, indem Sie die Eigenschaft [auto_scheduling](api/config/auto_scheduling.md) auf true setzen:

~~~js
gantt.config.auto_scheduling = true;
~~~

### Strikter Modus

Standardmäßig werden Aufgaben nur neu geplant, wenn ein neues Datum eine Einschränkung verletzt. Um Aufgaben immer auf das frühestmögliche Datum zu verschieben, aktivieren Sie die Eigenschaft [auto_scheduling_strict](api/config/auto_scheduling_strict.md):

~~~js
gantt.config.auto_scheduling_strict = true;
~~~

:::note
Beachten Sie, dass diese Einstellung in den Versionen 6.1.0 - 7.1.3 nur funktioniert, wenn die Option [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) aktiviert ist.
:::

### Initiale automatische Planung

Die Eigenschaft [auto_scheduling_initial](api/config/auto_scheduling_initial.md) steuert, ob die automatische Planung beim Laden der Daten ausgeführt wird. Standardmäßig ist sie auf true gesetzt:

~~~js
gantt.config.auto_scheduling_initial = true;
~~~

### Vererbung von Projekteinschränkungen

Die Eigenschaft [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md) bestimmt, ob Aufgaben ohne eigene Einschränkung diese vom übergeordneten Projekt erben:

~~~js
gantt.config.auto_scheduling_project_constraint = true;
~~~

### Projekt neu berechnen

Um den gesamten Projektzeitplan neu zu berechnen, verwenden Sie die Methode [autoSchedule](api/method/autoschedule.md):

~~~js
gantt.autoSchedule();
~~~

Um ab einer bestimmten Aufgabe neu zu berechnen, übergeben Sie deren ID an dieselbe Methode:

~~~js
gantt.autoSchedule(taskId);
~~~

### Prüfen, ob eine Aufgabe ungeplant ist

Um zu prüfen, ob eine Aufgabe ungeplant ist, verwenden Sie die Methode [isUnscheduledTask](api/method/isunscheduledtask.md) mit dem Aufgabenobjekt:

~~~js
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Erkennung von zirkulären Referenzen

Um alle zirkulären Referenzen im Diagramm zu finden, verwenden Sie die Methode [findCycles](api/method/findcycles.md):

~~~js
gantt.findCycles();
~~~

### Prüfen, ob ein Link zirkulär ist

Um zu prüfen, ob eine Verknüpfung zirkulär ist, verwenden Sie die Methode [isCircularLink](api/method/iscircularlink.md):

~~~js
var isCircular = gantt.isCircularLink(link);
~~~

### Verbundene Aufgaben und Links abrufen

Um die Liste der Aufgaben und Links zu erhalten, die mit einer bestimmten Aufgabe verbunden sind, können Sie die Methode [getConnectedGroup](api/method/getconnectedgroup.md) verwenden:

~~~js
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~


## Liste der Events

Im Folgenden finden Sie die Liste der verfügbaren Events:

- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

~~~js
// bevor die automatische Planung startet
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
    // eigene Logik hier
    return true;
});

// nachdem die automatische Planung abgeschlossen ist
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
    // eigene Logik hier
});

// bevor eine bestimmte Aufgabe neu geplant wird
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task,start,link,predecessor){
    // eigene Logik hier
    return true;
});

// nachdem eine bestimmte Aufgabe neu geplant wurde
gantt.attachEvent("onAfterTaskAutoSchedule",function(task,start,link,predecessor){
    // eigene Logik hier
});

// wenn eine zirkuläre Referenz erkannt wird und die automatische Planung nicht fortgesetzt werden kann
gantt.attachEvent("onCircularLinkError",function(link, group){
    // eigene Logik hier
});

// wenn während der automatischen Planung zirkuläre Verknüpfungen gefunden werden
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // eigene Logik hier
});
~~~

## Versionskompatibilität {#versioncompatibility}

Wenn das Datum einer Aufgabe durch Ziehen mit der Maus oder über das Lightbox geändert wird, erhält die Aufgabe automatisch einen von zwei Einschränkungstypen: entweder **start no earlier than+%start date%** oder **finish no later than+%end date%**, abhängig vom gewählten Planungsansatz.

Das bedeutet, dass eine Aufgabe nicht früher als das über die Benutzeroberfläche festgelegte späteste Datum geplant wird. Dieses Verhalten kann für Benutzer, die mit Einschränkungen nicht vertraut sind, unerwartet sein, insbesondere da Einschränkungen standardmäßig nicht im Diagramm angezeigt werden.

Um Einschränkungen anzuzeigen, können Sie deren Anzeige mit der Methode [addTaskLayer](api/method/addtasklayer.md) aktivieren.


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


Dieses Verhalten unterscheidet sich von der automatischen Planungslogik in Gantt-Versionen vor **v6.1** und gilt als korrekt, da es der automatischen Planung in MS Project entspricht.

Wenn Sie das frühere Verhalten bevorzugen, können Sie zur automatischen Planung vor Version 6.1 zurückkehren, indem Sie Einschränkungen deaktivieren:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)

