---
title: "Zeitsteuerung"
sidebar_label: "Zeitsteuerung"
---

# Zeitsteuerung

Ein Paar Selektoren zur Festlegung der Aufgabenlaufzeit durch Angabe des Start- und Enddatums der Aufgabe.

![time_control](/img/time_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"time"} /*!*/
];
~~~


[Zeitsteuerung](https://docs.dhtmlx.com/gantt/samples/05_lightbox/07_time.html)


## Initialisierung

Um die **time**-Steuerung zur Lightbox hinzuzufügen, führen Sie die folgenden Schritte aus:

1) Fügen Sie eine Sektion zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"period",      height:72, map_to:"auto", type:"time"}, /*!*/
];
~~~

2) Legen Sie eine Bezeichnung für die Sektion fest:

~~~js
gantt.locale.labels.section_period = "Time period";
~~~


## Eigenschaften

Die folgenden Eigenschaften sind besonders wichtig und werden typischerweise für die 'time'-Steuerung festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname 
- **height** - (*number*) die Abschnittshöhe
- **map_to** - (*string,object*) "auto" oder Objekt, definiert die Daten-Eigenschaft(en), die dem Abschnitt zugeordnet werden
- **type** - (*string*) der Typ der [Abschnittskontrolle](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen der Lightbox den Fokus
- **readonly** - (*boolean*) wenn Sie den Wert "true" setzen, ist der Abschnitt schreibgeschützt
- **year_range** - (*array,number*) legt einen Bereich für den Jahresauswahl fest. Der Bereich kann auf zwei Arten festgelegt werden: 
    - *year_range: [2005, 2025]* - ein Zeitraum von 2005 bis 2025
    - *year_range: 10*  - ein Zeitraum [aktuelles Jahr - 10 Jahre; aktuelles Jahr + 10 Jahre]
- **single_date** - (*boolean*) wenn Sie den Wert "true" setzen, wird nur der *Startdatum*-Auswahl im Abschnitt angezeigt. 
Bearbeitete Aufgaben werden nur durch das Startdatum festgelegt und haben eine Dauer von 0. Sinnvoll nur für [Meilensteine](guides/task-types.md#milestones)
- **time_format** - (*string*) legt die Reihenfolge der Datum-Uhrzeit-Auswahlen fest
- **autofix_end** - (*boolean*) definiert, ob das Enddatum automatisch korrigiert wird, wenn das ausgewählte Startdatum größer als das Enddatum ist, standardmäßig *true*. Der deaktivierte Modus erlaubt das Validieren der Daten, aber wenn Sie den Modus aktivieren und die Daten nicht validieren, können Aufgaben mit 0 Dauer entstehen, wenn *start_date* größer als *end_date* ist.
 
## Konfiguration der Datum-Uhrzeit-Auswahlen 

Zur Konfiguration der Selektoren des Abschnitts "Dauer" oder "Zeit" verwenden Sie die [time_format](api/config/lightbox.md)-Eigenschaft (siehe [Date Format Specification](guides/date-format.md)):

**Hinzufügen des Zeit-Auswahlfelds zum Abschnitt 'Time period'**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"time", map_to:"auto", time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

Beachten Sie, dass die zulässigen Elemente des [time_format](api/config/lightbox.md)-Arrays wie folgt sind:

- *"%d"* - der Tag-Auswahl 
- *"%m"* - die Monatsauswahl
- *"%Y"* - die Jahresauswahl
- *"%H:%i"* - die Zeit-Auswahl (das Format wird mit der [time_picker](api/template/time_picker.md) Vorlage festgelegt) 

Sie können nur die Reihenfolge und die Anzahl dieser Elemente im Array ändern, das Datenanzeigeformat selbst dürfen Sie aber nicht verändern.

 Beispielsweise können Sie das Format wie folgt ändern:

~~~js
// time goes first
time_format:["%H:%i", "%m", "%d", "%Y"] 
// month goes first
time_format:["%m","%d", "%Y", "%H:%i"]
// the year selector is removed
time_format:["%H:%i", "%m", "%d"]
// incorrect
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" wurde zu "%M" geändert
~~~


## Zuordnung zu benutzerdefinierten Start-/End-Datum-Zeit-Eigenschaften {#mapping}

### Standardzuordnung

In der Regel werden die Zeit- und Dauer-Steuerungen den obligatorischen Daten-Eigenschaften 'start_date', 'end_date' zugeordnet, indem die Eigenschaft **map_to** auf den Wert "auto" gesetzt wird (**map_to:"auto"**).

### Benutzerdefinierte Zuordnung

Um Steuerelemente auf benutzerdefinierte Datumseigenschaften abzubilden (statt 'start_date', 'end_date'), verwenden Sie die Objektnotation der Eigenschaft **map_to**:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "deadline",    height: 72, type: "time", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Fristen anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


Als Objekt besitzt **map_to** 3 Eigenschaften: 

1. **start_date**- der Name einer Dateneigenschaft, die das Startdatum speichert, das im Eingabefeld festgelegt wird
2. **end_date** - optional, der Name einer Dateneigenschaft, die das Enddatum speichert, das im Eingabefeld festgelegt wird
3. **duration** - optional, der Name einer Dateneigenschaft, die die durch die Eingabe definierte Dauer speichert

:::note
Wenn eine Eigenschaft nicht angegeben wird, übernimmt die Steuerung den Wert der entsprechenden Pflicht-Datumseigenschaft.
:::


## Sichtbarkeit der Sektion umschalten

Es ist möglich, die Sichtbarkeit des Zeit-Abschnitts zu steuern, wenn Sie beim Konfigurieren der Lightbox-Sektion den Typ **type:"time_optional"** und **button: true** angeben:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "time_optional"} /*!*/
];
~~~

und die Beschriftungen für zwei Zustände des Buttons festlegen:

~~~js
gantt.locale.labels.time_enable_button = 'Zeit planen';
gantt.locale.labels.time_disable_button = 'Zeitplanung rückgängig';
~~~

Der Umschalt-Button, mit dem Sie die Sichtbarkeit der Sektion steuern können, erscheint in der Nähe der Sektion. Wenn die Sektion sichtbar ist, funktioniert alles so, als wäre **type:"time"** angegeben.

![](/img/time_optional.png)

Wenn Sie den Button ausschalten, wird die Sektion unsichtbar, aber es passiert nichts. Nachdem Sie die Schaltfläche „Speichern“ gedrückt haben, werden die Werte der Aufgaben-Eigenschaften, die über die Eigenschaft **map_to** der Sektion dem Zeitsteuerung zugeordnet sind, auf `null` gesetzt.

~~~js
gantt.getTask(1);

// return value
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

Diese Funktionalität kann hilfreich sein, wenn Sie die Aufgabe als ungeplant kennzeichnen müssen. Prüfen Sie das verwandte Beispiel:

Verwandtes Beispiel [Ungeplante Aufgaben](https://snippet.dhtmlx.com/5/81f51a96d)