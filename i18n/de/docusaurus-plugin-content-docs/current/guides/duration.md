--- 
title: "Dauersteuerung" 
sidebar_label: "Dauersteuerung" 
---

# Dauersteuerung

Eine Sammlung von Selektoren zur Festlegung der Aufgabendauer, indem das Startdatum einer Aufgabe und die Anzahl der Tage angegeben wird.

![duration_control](/img/duration_control.png)

~~~js
gantt.config.lightbox.sections="[" 
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true}, 
    {name:"time",        height:72, map_to:"auto", type:"duration"} /*!*/ 
];
~~~


[Grundlegende Initialisierung](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Initialisierung

Standardmäßig wird eine einzelne **duration**-Steuerung dem Lightbox hinzugefügt. Um eine weitere hinzuzufügen, folgen Sie den untenstehenden Schritten:

1) Fügen Sie der Lightbox-Konfiguration einen Abschnitt hinzu:

~~~js
gantt.config.lightbox.sections="[" 
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true}, 
    {name:"time2",       height:72, map_to:"auto", type:"duration"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"} 
];
~~~  

2) Legen Sie eine Bezeichnung für den Abschnitt fest:

~~~js
gantt.locale.labels.section_time2 = "Actual duration";
~~~


## Eigenschaften

Die folgenden Eigenschaften sind größtenteils wichtig und werden üblicherweise für die **time**-Steuerung festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname 
- **height** - (*number*) die Abschnittshöhe
- **map_to** - (*string,object*) "auto" oder Objekt, definiert die(n) Daten-Eigenschaft(en), die dem Abschnitt zugeordnet werden
- **formatter** - (Objekt) eine Instanz des [durationFormatter](guides/working-time.md#taskdurationindecimalformat) Objekts
- **type** - (*string*) der Typ der [Abschnittsteuerung](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen der Lightbox den Fokus
- **readonly** - (*boolean*) wenn Sie den Wert "true" setzen, wird der Abschnitt schreibgeschützt
- **year_range** - (*array,number*) legt einen Bereich für den Jahr-Auswahl fest. Der Bereich kann auf zwei Arten festgelegt werden: 
    - *year_range: [2005, 2025]* - Zeitraum von 2005 bis 2025
    - *year_range: 10*  - Zeitraum [aktuelles Jahr - 10 Jahre; aktuelles Jahr + 10 Jahre]
- **single_date** - (*boolean*) wenn Sie den Wert "true" setzen, wird im Abschnitt nur der *Startdatum*-Selektor angezeigt. Bearbeitete Aufgaben werden nur durch das Startdatum angegeben und haben eine Dauer von Null. Sinnvoll nur für [Milestones](guides/task-types.md#milestones)
- **time_format** - (*string*) legt die Reihenfolge der Datum-Uhrzeit-Auswahlen fest

  

## Konfiguration der Datum-Uhrzeit-Auswahlen 

Um die Selektoren im Abschnitt "Time period" zu konfigurieren, verwenden Sie die Eigenschaft **time_format** (siehe [Date Format Specification](guides/date-format.md)):

**Hinzufügen des Zeit-Auswahlfelds zum Abschnitt 'Time period'**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

Beachten Sie, dass die zulässigen Elemente des [time_format](api/config/lightbox.md) Arrays Folgendes umfassen:

- *"%d"* - die Tagesauswahl 
- *"%m"* - die Monatsauswahl
- *"%Y"* - die Jahresauswahl
- *"%H:%i"* - die Zeit-Auswahl (das Format wird mit der Vorlage [time_picker](api/template/time_picker.md) festgelegt)

Sie können lediglich die Reihenfolge und die Anzahl dieser Elemente im Array ändern, aber nicht das Darstellungsformat der Daten.

 Zum Beispiel können Sie das Format wie folgt ändern:

~~~js
// time geht zuerst
time_format:["%H:%i", "%m", "%d", "%Y"] 
// Monat geht zuerst
time_format:["%m","%d", "%Y", "%H:%i"]
// der Jahresauswahl wird entfernt
time_format:["%H:%i", "%m", "%d"]
// falsch
time_format:["%H:%i", "%M", "%d", "%Y"] //"%m" wurde zu "%M" geändert
~~~

## Zuordnung zu benutzerdefinierten Start-/Ende-Datum-Zeit-Eigenschaften

### Standardzuordnung

Im Allgemeinen werden die Zeit- und Dauer-Kontrollen auf die obligatorischen Eigenschaften 'start_date', 'end_date' abgebildet, indem die **map_to**-Eigenschaft auf den Wert "auto" gesetzt wird (**map_to:"auto"**).

### Benutzerdefinierte Zuordnung

Um Steuerelemente auf benutzerdefinierte Datumseigenschaften abzubilden (anstatt von 'start_date', 'end_date'), verwenden Sie die Objekt-Notation der **map_to**-Eigenschaft:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "baseline",    height: 72, type: "duration", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


Als Objekt hat **map_to** 3 Eigenschaften: 

1. **start_date**- der Name einer Daten-Eigenschaft, in der das im Eingabefeld festgelegte Startdatum gespeichert wird
2. **end_date** - optional, der Name einer Daten-Eigenschaft, in der das im Eingabefeld festgelegte Enddatum gespeichert wird 
3. **duration** - optional, der Name einer Daten-Eigenschaft, in der die durch die Eingabe definierte Dauer gespeichert wird

:::note
Wenn eine Eigenschaft nicht angegeben ist, übernimmt das Steuerelement den Wert der entsprechenden obligatorischen Datumseigenschaft.
:::

## Sichtbarkeit des Abschnitts umschalten

Es ist möglich, die Sichtbarkeit des Dauer-Abschnitts zu steuern, wenn Sie beim Konfigurieren des Abschnitts für die Lightbox den Typ auf **type:"duration_optional"** und **button: true** setzen:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "duration_optional"} /*!*/
];
~~~

und legen Sie Bezeichnungen für zwei Zustände des Buttons fest:

~~~js
gantt.locale.labels.time_enable_button = 'Planen';
gantt.locale.labels.time_disable_button = 'Nicht planen';
~~~

Der Umschaltknopf, der Ihnen erlaubt, die Sichtbarkeit des Abschnitts zu wechseln, erscheint in der Nähe des Abschnitts. Wenn der Abschnitt sichtbar ist, verhält es sich, als wäre **type:"duration"** angegeben.

![duration_optional](/img/duration_optional.png)

Wenn Sie den Knopf ausschalten, wird der Abschnitt unsichtbar, aber es passiert nichts. Nachdem Sie auf die Schaltfläche „Speichern“ klicken, werden die Werte der durch die **map_to**-Eigenschaft des Abschnitts auf das Dauer-Steuerelement abgebildeten Aufgaben-Eigenschaften auf `null` gesetzt.

~~~js
gantt.getTask(1);

// Rückgabewert
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

Diese Funktionalität kann hilfreich sein, wenn Sie eine Aufgabe als ungeplant kennzeichnen oder Aufgaben definieren müssen, bei denen Baselines direkt aus der Benutzeroberfläche nicht angezeigt werden sollen. Prüfen Sie die verwandten Beispiele:

**Verwandtes Beispiel** [Ungeplante Aufgaben](https://snippet.dhtmlx.com/5/81f51a96d)

**Verwandtes Beispiel** [Baselines](https://snippet.dhtmlx.com/6qvjoa7i)