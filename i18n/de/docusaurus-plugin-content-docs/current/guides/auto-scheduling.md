---
title: "Automatische Terminplanung"
sidebar_label: "Automatische Terminplanung"
---

# Automatische Terminplanung

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Die Bibliothek bietet die Erweiterung **auto_scheduling**, die Gantt die Fähigkeit gibt, Aufgaben automatisch basierend auf den Relationen zwischen ihnen zu planen.

![auto_scheduling](/img/auto_scheduling.png)

Stellen Sie sich zum Beispiel vor, Sie haben zwei Aufgaben, die durch eine Abhängigkeit verbunden sind und die zweite Aufgabe beginnt, sobald die erste endet, und
Sie müssen den Zeitplan der ersten Aufgabe durch Verschieben auf ein neues Datum ändern.

Die automatische Terminplanung aktualisiert das Startdatum der zweiten Aufgabe jedes Mal in Abhängigkeit vom Enddatum der ersten Aufgabe, wenn dieses sich ändert.
Diese Funktion ermöglicht es Ihnen, den Projektzeitplan zu erzeugen und zu pflegen, indem Sie Beziehungen zwischen Aufgaben festlegen, ohne die Termine jeder Aufgabe manuell festlegen zu müssen.

## Verwendung

Um die Auto Scheduling-Funktionalität zu verwenden, sollten Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin mit der [gantt.plugins](api/method/plugins.md) Methode aktivieren:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

Und setzen Sie die **enabled**-Eigenschaft der **auto_scheduling**-Konfiguration auf *true*:

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


Wenn Auto Scheduling aktiviert ist, können einzelne Aufgaben weiterhin manuell geplant werden. 

## Forward/backward planning {#forwardbackwardplanning}

### Strategien der Projektplanung

Es gibt zwei Strategien der Planung von Aufgaben innerhalb eines Projekts: Vorwärtsplanung und Rückwärtsplanung. Sie werden durch Kombinationen von Konfigurationseinstellungen definiert:

- [gantt.config.auto_scheduling.schedule_from_end](api/config/auto_scheduling.md#schedule_from_end) - (*boolean*) definiert den Typ der Planungsstrategie
- [project_start](api/config/project_start.md) - (*Date*) das Startdatum eines Projekts; wird standardmäßig als Startdatum der Aufgaben verwendet, falls Vorwärtsplanung angewendet wird, *null* standardmäßig
- [project_end](api/config/project_end.md) - (*Date*) das Enddatum eines Projekts; wird standardmäßig als Defaultzeit der Aufgaben verwendet, falls Rückwärtsplanung verwendet wird, *null* standardmäßig

### Vorwärtsplanung

Die Vorwärtsplanung der Aufgaben wird standardmäßig verwendet, d. h. **gantt.config.auto_scheduling.schedule_from_end** ist auf *false* gesetzt.

~~~js
// forward planning of tasks is used
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: false
};
~~~

In diesem Fall wird die Planung der Aufgaben ab dem Startdatum oder vom Datum der frühesten Aufgabe umgesetzt. Aufgaben werden *so früh wie möglich* geplant, sofern keine anderen Einschränkungen auf sie angewendet werden.

Das Startdatum des Projekts kann optional über die **gantt.config.project_start**-Konfiguration festgelegt werden:

~~~js
gantt.config.project_start = new Date(2025, 2, 1);
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### Rückwärtsplanung {#backwardscheduling}

Es ist auch möglich, Aufgaben vom Ende des Projekts aus zu planen, d. h. Rückwärtsplanung anzuwenden. Dazu müssen Sie die Eigenschaft **gantt.config.auto_scheduling.schedule_from_end** auf *true* setzen und das Enddatum des Projekts
über die Konfigurationsoption **gantt.config.project_end** angeben:

~~~js
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

In diesem Fall werden Aufgaben so spät wie möglich geplant. Die letzte Aufgabe sollte am Enddatum des Projekts enden.


[Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)


## Zeitbeschränkungen für Aufgaben {#timeconstraintsfortasks}

dhtmlxGantt bietet die Möglichkeit, zusätzliche Zeitbeschränkungen für Aufgaben festzulegen.

:::note
Zeitbeschränkungen gelten nur für Aufgaben und [Meilensteine](guides/milestones.md). Projekte sind davon nicht betroffen.
:::

### Festlegen von Beschränkungen über Lightbox

Sie können Beschränkungen für eine Aufgabe über die [**Constraint**-Steuerung](guides/constraint.md) in der Lightbox der Aufgabe festlegen.

![Inbuilt datepicker for constraints](/img/inbuilt_constraint_datepicker.png)

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    { name: "constraint", type: "constraint" }, /*!*/
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

### Festlegen von Beschränkungen über Inline-Editoren

Es ist auch möglich, [getrennte Spalten für den Typ der Beschränkung und dessen Datum im Raster zu spezifizieren](guides/specifying-columns.md#timeconstraintsfortasks) und Inline-Editoren zu verwenden, um Beschränkungen für Aufgaben festzulegen.

![Constraints columns](/img/constraints_columns.png)

Verwenden Sie entsprechend die Spaltennamen **constraint_type** und **constraint_date**.

~~~js
const constraintTypeEditor = {
    type: "select", map_to: "constraint_type", options: [
        { key: "asap", label: gantt.locale.labels.asap },
        { key: "alap", label: gantt.locale.labels.alap },
        { key: "snet", label: gantt.locale.labels.snet },
        // more options
    ]
};

const constraintDateEditor = {
    type: "date",
    map_to: "constraint_date",
    min: new Date(2025, 0, 1),
    max: new Date(2026, 0, 1)
};

gantt.config.columns = [
    { // vorherige Spalte},
    {
        name: "constraint_type", align: "center", width: 100,
        template: task => gantt.locale.labels[gantt.getConstraintType(task)],
        resize: true, editor: constraintTypeEditor
    },
    {
        name: "constraint_date", align: "center", width: 120, template: (task) => {
            // template logic
        },
        resize: true, editor: constraintDateEditor
    },
    { name: "add", width: 44 }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### Arten von Beschränkungen

Es gibt mehrere Arten von Zeitbeschränkungen:

1. **So früh wie möglich** - Wenn diese Beschränkung einer unabhängigen Aufgabe zugeordnet ist und der **strikte** Modus aktiviert ist, beginnt die Aufgabe zur gleichen Zeit wie das Projekt. Falls der **strikte**-Modus deaktiviert ist, beginnt die Aufgabe am angegebenen Datum. 

Wenn diese Beschränkung einer abhängigen Aufgabe zugeordnet ist, beginnt die Aufgabe so früh wie möglich, sobald ihre Vorgängeraufgaben enden.

2. **So spät wie möglich** - Wenn diese Beschränkung einer unabhängigen Aufgabe zugeordnet ist, endet die Aufgabe zur gleichen Zeit wie das Projekt. Wenn diese Beschränkung einer abhängigen Aufgabe zugeordnet ist, endet die Aufgabe mit dem Start ihrer unmittelbaren Nachfolgeraufgabe.

Die übrigen Arten von Beschränkungen betreffen Aufgaben unabhängig von ihrem Typ (abhängig oder unabhängig):

3. **Beginn nicht früher als** - Die Aufgabe sollte am angegebenen Datum oder danach beginnen.

4. **Beginn spätestens** - Die Aufgabe sollte am angegebenen Datum oder davor beginnen.

5. **Ende nicht früher als** - Die Aufgabe sollte am angegebenen Datum oder danach enden.

6. **Ende spätestens** - Die Aufgabe sollte am angegebenen Datum oder davor enden.

7. **Muss beginnen bei** - Die Aufgabe sollte genau am angegebenen Datum beginnen.

8. **Muss enden bei** - Die Aufgabe sollte genau am angegebenen Datum enden.

:::note
Mit unabhängigen Aufgaben hier meinen wir Aufgaben, die keine Nachfolger oder Vorgänger haben. Mit anderen Worten, dies sind Aufgaben, die keine Verbindungen/Relationen zu anderen Aufgaben oder deren Eltern haben.
:::

## Festlegen von Verzögerungen (Lag) und Vorläufen (Lead) zwischen Aufgaben {#settinglagandleadtimesbetweentasks}

Lag und Lead sind spezielle Werte, die verwendet werden, um komplexe Beziehungen zwischen Aufgaben zu erstellen.

Lag ist eine Verzögerung zwischen Aufgaben, die durch eine Abhängigkeit verbunden sind. Lead ist eine Überlappung zwischen Aufgaben, die durch eine Abhängigkeit verbunden sind.

Es kann zwei Typen von Nachfolgeraufgaben geben:

- eine Aufgabe, die vor dem Ende ihrer Vorgängeraufgabe starten kann (Aufgabe B beginnt vor dem Ende von Aufgabe A)

Beispiel: Wenn wir dem Abhängigkeitslink einen Lead von 1 Tag zuweisen, beginnt Aufgabe B einen Tag bevor Aufgabe A endet;

- eine Aufgabe, die erst nach einer Verzögerung starten kann, die dem Ende ihrer Vorgängeraufgabe folgt (Aufgabe B startet zu einem späteren Zeitpunkt nach dem Ende von Aufgabe A)

Beispiel: Wenn wir dem Abhängigkeitslink eine Lag von 1 Tag zuweisen, beginnt Aufgabe B einen Tag nach dem Ende von Aufgabe A.

Lag- und Lead-Werte werden in der zusätzlichen Eigenschaft des Link-Objekts festgelegt - **link.lag**:

- lag - beliebiger positiver ganzzahliger Wert,
- lead - negativer Wert des Lag.

Standardmäßig gilt, dass der Lag-Wert jeder Abhängigkeitsverbindung auf 0 gesetzt ist.

### Bearbeiten von Link-Werten über die UI

Gantt bietet keine integrierte UI zum Bearbeiten von Lag oder anderen Eigenschaften des Links. Sie können dies jedoch manuell implementieren, indem Sie den Empfehlungen im
[verwandten Kapitel](guides/crud-dependency.md#editing-link-values-from-ui) folgen.

**Zugehöriges Beispiel** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)

## Deaktivieren von Auto Scheduling für bestimmte Aufgaben

Um Auto Scheduling für eine bestimmte Aufgabe zu deaktivieren und manuell zu planen, setzen Sie die **auto_scheduling**-Eigenschaft des Aufgabenobjekts auf *false*:

~~~js
const task = gantt.getTask(id);
task.auto_scheduling = false;
~~~

Sie können Auto Scheduling einer bestimmten Aufgabe auch verhindern, indem Sie den [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md) Handler verwenden:

~~~js
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    return !task.completed;
});
~~~

## Planung abgeschlossener Aufgaben

Standardmäßig gibt es keinen Unterschied darin, wie der Auto Scheduling-Algorithmus erledigte Aufgaben (Aufgaben mit einem Fortschritt von 1) und unvollständige Aufgaben verarbeitet.

Optional können Sie die [auto_scheduling.use_progress](api/config/auto_scheduling.md#use_progress) Konfiguration aktivieren, um dieses Verhalten zu ändern:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
 
gantt.init("gantt_here");
~~~

Wenn die Konfiguration aktiviert ist, werden erledigte Aufgaben vom kritischen Pfad und vom Auto Scheduling ausgeschlossen.

Weitere Details finden Sie auf der [API-Seite](api/config/auto_scheduling_use_progress.md).


## API-Übersicht

Die Liste verfügbarer Methoden und Eigenschaften:

- [auto_scheduling](api/config/auto_scheduling.md)
- [project_start](api/config/project_start.md)
- [project_end](api/config/project_end.md)
- [autoSchedule](api/method/autoschedule.md)
- [isUnscheduledTask](api/method/isunscheduledtask.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [getConnectedGroup](api/method/getconnectedgroup.md)

### Activation

Um Auto Scheduling im Gantt-Diagramm zu aktivieren, setzen Sie die **enabled**-Eigenschaft der **auto_scheduling**-Konfiguration auf *true*:

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

### Strikter Modus

Standardmäßig werden Aufgaben nur neu geplant, wenn ein neues Datum die Beschränkung verletzt.
Um Aufgaben stets zum frühestmöglichen Datum neu zu planen, verwenden Sie die Eigenschaft [auto_scheduling.gap_behavior](api/config/auto_scheduling.md#gap_behavior):

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

:::note
Beachten Sie, dass in Versionen 6.1.0 - 7.1.3 die Konfiguration nur funktioniert, wenn die Option [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) aktiviert ist.
:::

### Initiales Auto-Scheduling

Die Eigenschaft [auto_scheduling.schedule_on_parse](api/config/auto_scheduling.md#schedule_on_parse) gibt an, ob gantt Auto Scheduling beim Laden der Daten durchführen soll. Sie ist standardmäßig auf *true* gesetzt:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: true
};
~~~

### Vererbung von Projektbeschränkungen

Die Eigenschaft [auto_scheduling.project_constraint](api/config/auto_scheduling.md#project_constraint) definiert, ob Aufgaben ohne den angegebenen Beschränkungstyp die Beschränkung von ihrem Elternprojekt erben sollen:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

### Neuberechnung des Projekts

Um den Zeitplan des gesamten Projekts neu zu berechnen, verwenden Sie die Methode [autoSchedule](api/method/autoschedule.md):

~~~js
gantt.autoSchedule();
~~~

Wenn Sie den Zeitplan starting from einer bestimmten Aufgabe neu berechnen müssen, übergeben Sie die ID der Aufgabe als Argument an die [autoSchedule](api/method/autoschedule.md) Methode:

~~~js
gantt.autoSchedule(taskId);
~~~

### Überprüfung, ob eine Aufgabe ungeplant ist

Falls Sie prüfen müssen, ob eine Aufgabe ungeplant ist, verwenden Sie die Methode [isUnscheduledTask](api/method/isunscheduledtask.md) mit dem Aufgabenobjekt als Argument:

~~~js
const isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Suche nach zirkulären Referenzen

Um alle zirkulären Referenzen im Diagramm zu finden, verwenden Sie die Methode [findCycles](api/method/findcycles.md):

~~~js
gantt.findCycles();
~~~

### Überprüfung, ob ein Link zirkulär ist

Wenn Sie prüfen müssen, ob der Link zirkulär ist, können Sie die Methode [isCircularLink](api/method/iscircularlink.md) anwenden:

~~~js
const isCircular = gantt.isCircularLink(link);
~~~

### Abrufen verbundener Aufgaben und Links

Um die Liste der Aufgaben und Links zu erhalten, mit denen eine Aufgabe verbunden ist, verwenden Sie die Methode [getConnectedGroup](api/method/getconnectedgroup.md):

~~~js
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~


## Die Liste der Ereignisse

Die Liste der verfügbaren Ereignisse finden Sie unten:

- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

~~~js
// bevor das automatische Scheduling startet
gantt.attachEvent("onBeforeAutoSchedule", (taskId) => {
    // beliebige benutzerdefinierte Logik hier
    return true;
});

// nachdem das automatische Scheduling abgeschlossen ist
gantt.attachEvent("onAfterAutoSchedule", (taskId, updatedTasks) => {
    // beliebige benutzerdefinierte Logik hier
});

// bevor eine bestimmte Aufgabe neu geplant wird
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    // beliebige benutzerdefinierte Logik hier
    return true;
});

// nachdem eine bestimmte Aufgabe neu geplant wurde
gantt.attachEvent("onAfterTaskAutoSchedule", (task, start, link, predecessor) => {
    // beliebige benutzerdefinierte Logik hier
});

// wenn der zirkuläre Verweis erkannt wurde und automatisch geplant werden kann
gantt.attachEvent("onCircularLinkError", (link, group) => {
    // beliebige benutzerdefinierte Logik hier
});

// wenn während des automatischen Planens zirkuläre Verknüpfungen gefunden wurden
gantt.attachEvent("onAutoScheduleCircularLink", (groups) => {
    // beliebige benutzerdefinierte Logik hier
});
~~~

## Versionskompatibilität

Wenn ein Benutzer das Datum einer Aufgabe durch Verschieben mit der Maus oder über die Lightbox ändert, erhält die Aufgabe automatisch eine der beiden Beschränkungstypen: entweder **Beginn nicht früher als+%start date%** oder **Ende spätestens+%end date%**, abhängig von der gewählten Planungsstrategie.

So wird eine Aufgabe nicht zum frühesten Datum geplant, falls das spätere Datum aus der UI gesetzt wird. Das kann für nicht vorbereitete Benutzer verwirrend sein, insbesondere da Beschränkungen standardmäßig nicht im Diagramm angezeigt werden.

Ab **v9.1** können Sie das Anzeigen von Beschränkungen über die Eigenschaft [auto_scheduling.show_constraints](api/config/auto_scheduling.md#show_constraints) aktivieren. Ältere Versionen erfordern die Verwendung der [addTasklayer](api/method/addtasklayer.md)-Methode, um Beschränkungen dem Diagramm hinzuzufügen.

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


Dieses Verhalten unterscheidet sich von der Auto Scheduling-Logik von Gantt vor **v6.1** und gilt als korrekt, da es dieselbe Funktionsweise der automatischen Planung wie MS Project hat.

Wenn das nicht das ist, was Sie möchten, können Sie zur Pre-6.1-Auto Scheduling zurückkehren, indem Sie Beschränkungen wie folgt deaktivieren:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

### Verwandte API
- [auto_scheduling](api/config/auto_scheduling.md)