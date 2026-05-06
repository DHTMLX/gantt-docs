---
sidebar_label: lightbox
title: Lightbox-Konfiguration
description: "legt das Lightbox-Objekt fest"
---

# lightbox

### Description

@short: Legt das Lightbox-Objekt fest

@signature: lightbox: LightboxSections

### Example

~~~jsx
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "priority", height: 22, map_to: "priority", type: "select", options: opts },
    { name: "time", height: 72, type: "duration", map_to: "auto" }
];

gantt.init("gantt_here");
~~~

### Details

Das Lightbox-Objekt hat 1 Eigenschaft:

- **sections** - (*array*) - spezifiziert Lightbox-Sektionen

~~~js
// Standard-Lightbox-Definition   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

Objekte im **sections**-Array können je nach [Typ eines Abschnitts](guides/default-edit-form.md#lightbox-structure) folgende Eigenschaften besitzen:

#### Common for all sections

- **name** - (*string*) - der Name des Abschnitts. dhtmlxGantt wird die Beschriftung des Abschnitts gemäß diesem Namen aus der *locale.labels*-Sammlung entnehmen. Zum Beispiel wird für den Abschnitt **time** das Label aus **gantt.locale.labels.section_time** entnommen. Wenn dem Abschnitt die **label**-Eigenschaft angegeben ist, wird das Label des Abschnitts stattdessen daraus genommen statt aus dem Locale. <br>Die **name**-Eigenschaft kann auch verwendet werden, um das Objekt der Steuerung über die Methode [](api/method/getlightboxsection.md) zu erhalten.
- **map_to** - (*string*) - der Name einer Dateneigenschaft, die dem Abschnitt zugeordnet wird
- **type** - (*string*) - der [Typ der Abschnitt-Steuerung](guides/default-edit-form.md#lightboxcontrols) (Editor).
- **label** - (*string*) - die Bezeichnung des Abschnitts.
- **height?** - (*number*) - optional, die Höhe des Abschnitts. Nicht verwendet bei den [Checkbox](guides/checkbox.md) und [Radio](guides/radio.md) Abschnitten.
- **focus?** - (*boolean*) - optional, wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen des Lightbox-Fensters den Fokus
- **formatter?** - (*DurationFormatter | LinkFormatter*) - optional, ein Formatter für den Abschnitt

#### Time and Duration controls

- **readonly?** - (*boolean*) - optional, wenn der Wert **true** gesetzt wird, ist der Abschnitt schreibgeschützt
- **year_range?** - (*number | number[]*) - optional, legt einen Bereich für die Jahresauswahl fest. Kann auf 2 Arten gesetzt werden:
    - *year_range: [2005, 2025]* - Zeitraum von 2005 bis 2025
    - *year_range: 10*  - Zeitraum [aktuelles Jahr - 10 Jahre; aktuelles Jahr + 10 Jahre]
- **single_date?** - (*boolean*) - optional, wenn der Wert **true** gesetzt ist, wird im Abschnitt nur der Startdatum-Auswahl angezeigt. Bearbeitete Aufgaben werden nur durch das Startdatum festgelegt und haben eine Dauer von 0. Sinnvoll nur für [Milestones](guides/task-types.md#milestones).
- **time_format?** - (*string[]*) - optional, bestimmt die Reihenfolge der Datum-Uhrzeit-Auswahlfelder
- **autofix_end?** - (*boolean*) - optional, definiert, ob das Enddatum automatisch korrigiert wird, wenn das ausgewählte Startdatum größer als das Enddatum ist, standardmäßig *true*. Der deaktivierte Modus erlaubt die Validierung der Daten, aber wenn Sie den Modus aktivieren und die Daten nicht validieren, können Aufgaben mit 0-Dauer entstehen, wenn das *start_date* größer als das *end_date* ist.

#### Select control

- **onchange? (*e*): any** - optional, bestimmt die Funktion als Event-Handler für das Change-Ereignis der Steuerung des Abschnitts
    - **_e_** - (*Event*) - ein natives Event-Objekt.

#### Select, Checkbox, Radio and Resources controls

- **options?** - (*object[]*) - optional, definiert die Auswahlmöglichkeiten der Steuerung. Jedes Objekt im Array definiert eine einzelne Option und besitzt folgende Eigenschaften:
    - **_key_** - (*number | string*) - die Option-ID. Dieses Attribut wird mit der Dateneigenschaft der Aufgabe verglichen, um Auswahloptionen Aufgaben zuzuordnen
    - **_label_** - (*string*) - die Bezeichnung der Option
    - **_unit?_** - (*string | number*) - optional, die Einheit der Messung der Ressource (für die Ressourcen-Steuerung)
- **default_value?** - (*any*) - optional, der Standardwert der Steuerung. Wird nur angewendet, wenn der Eingabewert undefiniert ist. Für die Ressourcensteuerung gilt dies, wenn der Wert der Ressource undefiniert ist.

#### Resource Assignments control

- **config** - (*object*) die Grid-Konfiguration der Ressourcen im Lightbox, um erforderliche Spalten anzuzeigen
- **templates** - (*object*) Vorlagen für das Ressourcen-Grid im Lightbox
- **resource_default_assignment** - (*object*) das Konfigurationsobjekt der Standardzuweisung (die durch den Button "Add Assignment" hinzugefügt wird)
    - **start_date** - (*Date | string | null*) das Datum, an dem die Zuordnung beginnen soll
    - **end_date** - (*Date | string | null*) das Datum, an dem die Zuordnung abgeschlossen sein soll
    - **value** - (*number | string*) die Menge der Ressource, die einer Aufgabe zugewiesen ist
    - **duration** - (*number | null*) die Dauer der Zuweisung
    - **mode** - (*string*) der Berechnungsmodus der Zeit der Ressourcenzuweisung: "default" | "fixedDates" | "fixedDuration"

#### Parent control

- **allow_root?** - (*boolean*) - optional, wenn auf "true" gesetzt, enthält die Optionenliste eine zusätzliche Option, die es Benutzern ermöglicht, die Wurzelebene als Elternteil für Aufgaben festzulegen. Wird in Kombination mit der Eigenschaft **root_label** verwendet
- **root_label?** - (*string*) - optional, legt eine Bezeichnung für den Elterneintrag auf Wurzelebene fest. Wird in Kombination mit der Eigenschaft **allow_root** verwendet
- **sort? (task1, task2): number** - optional, legt eine Sortierfunktion für die Auswahloptionen fest
    - **_task1_** - (*Task*) - ein Objekt der ersten Aufgabe, nach der sortiert wird
    - **_task2_** - (*Task*) - ein Objekt der zweiten Aufgabe, nach der sortiert wird
- **filter? (id, task): boolean** - optional, legt eine Filterfunktion für die Auswahloptionen fest. Nimmt die ID der Aufgabe und das Aufgaben-Objekt als Parameter
    - **_id_** - (*string | number*) - die ID des Aufgabenobjekts
    - **_task_** - (*Task*) - das Aufgaben-Objekt
- **template? (start_date, end_date, task): string|number** - optional, legt eine Vorlage für die Auswahloptionen fest
    - **_start_date_** - (*Date | number*) - das Startdatum des Aufgabenobjekts
    - **_end_date_** - (*Date | number*) - das Enddatum des Aufgabenobjekts
    - **_task_** - (*Task*) - das Aufgaben-Objekt

#### Typeselect control

- **filter** - (*function*) - legt eine Filterfunktion für die Typen von Aufgaben fest. Nimmt den Typ-Namen als Parameter

### Related API
- [wide_form](api/config/wide_form.md)

### Related Guides
- [Textbereich-Steuerung](guides/textarea.md)
- [Dauer-Steuerung](guides/duration.md)
- [Zeit-Steuerung](guides/time.md)
- [Auswahl-Steuerung](guides/select.md)
- [Typeselect Steuerung](guides/typeselect.md)
- [Elternsteuerung](guides/parent.md)
- [Vorlagensteuerung](guides/template.md)
- [Checkbox-Steuerung](guides/checkbox.md)
- [Options-Schaltfläche (Radio) Steuerung](guides/radio.md)
- [Konfiguration von Lightbox-Elementen](guides/default-edit-form.md)
- [Arbeiten mit Lightbox-Elementen](guides/lightbox-manipulations.md)
- [Benutzerdefiniertes Element erstellen](guides/custom-editor.md)
- [Benutzerdefinierte Lightbox](guides/custom-edit-form.md)
- [Buttons in der Lightbox ändern](guides/custom-button.md)

### Change log
- Falls entweder [gantt.config.csp](api/config/csp.md) auf true gesetzt ist oder Gantt in der Salesforce-Umgebung läuft, wird die Lightbox innerhalb des Gantt-Containers gerendert (ab v7.1.13)