---
title: "Zeitsteuerung"
sidebar_label: "Zeitsteuerung"
---

# Zeitsteuerung


Dieses Steuerelement bietet zwei Auswahlfelder, mit denen die Dauer einer Aufgabe durch Festlegen von Start- und Enddatum bestimmt werden kann.

![time_control](/img/time_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"time"} /*!*/
];
~~~


[Time control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/07_time.html)


## Initialisierung


Um das **time**-Steuerelement im Lightbox-Dialog einzubinden, gehen Sie wie folgt vor:

1) Fügen Sie einen Abschnitt in der Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"period",      height:72, map_to:"auto", type:"time"}, /*!*/
];
~~~

2) Weisen Sie dem Abschnitt eine Beschriftung zu:

~~~js
gantt.locale.labels.section_period = "Time period";
~~~


## Eigenschaften


Hier sind einige wichtige Eigenschaften, die häufig mit dem 'time'-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) der Name des Abschnitts 
- **height** - (*number*) die Höhe des Abschnitts
- **map_to** - (*string,object*) entweder "auto" oder ein Objekt, das die verknüpften Dateneigenschaften angibt
- **type** - (*string*) der Typ des [Abschnitt-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen des Lightbox-Dialogs den Fokus
- **readonly** - (*boolean*) wenn auf *true* gesetzt, wird der Abschnitt schreibgeschützt
- **year_range** - (*array,number*) legt den Bereich des Jahresauswahlfelds fest. Es kann auf zwei Arten definiert werden: 
    - *year_range: [2005, 2025]* - von 2005 bis 2025
    - *year_range: 10*  - von (aktuelles Jahr - 10) bis (aktuelles Jahr + 10)
- **single_date** - (*boolean*) wenn auf *true* gesetzt, wird nur das *Startdatum*-Auswahlfeld angezeigt. Bearbeitete Aufgaben haben dann lediglich ein Startdatum und eine Dauer von null, was für [Meilensteine](guides/task-types.md#milestones) nützlich ist
- **time_format** - (*string*) steuert die Reihenfolge der Datums- und Zeitauswahlfelder
- **autofix_end** - (*boolean*) legt fest, ob das Enddatum automatisch angepasst wird, wenn das Startdatum darüber hinausgeht. Standardmäßig ist dies *true*. Wenn deaktiviert, ist eine Datumvalidierung möglich. Ist es aktiviert, aber ohne Validierung, kann es vorkommen, dass Aufgaben eine Dauer von null erhalten, wenn das *start_date* nach dem *end_date* liegt.
 
## Konfiguration der Datums- und Zeitauswahlfelder 


Um die Auswahlfelder im Abschnitt "duration" oder "time" anzupassen, verwenden Sie die Eigenschaft [time_format](api/config/lightbox.md) (siehe [Date Format Specification](guides/date-format.md)):

**Hinzufügen des Zeitauswahlfelds zum Abschnitt 'Time period'**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"time", map_to:"auto", time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

Erlaubte Elemente des [time_format](api/config/lightbox.md)-Arrays sind:

- *"%d"* - Tagesauswahl 
- *"%m"* - Monatsauswahl
- *"%Y"* - Jahresauswahl
- *"%H:%i"* - Zeitauswahl (formatiert gemäß der [time_picker](api/template/time_picker.md)-Vorlage) 

Sie können diese Elemente im Array umsortieren oder weglassen, jedoch nicht das Format selbst ändern.

 Zum Beispiel:

~~~js
// Zeit zuerst
time_format:["%H:%i", "%m", "%d", "%Y"] 
// Monat zuerst
time_format:["%m","%d", "%Y", "%H:%i"]
// ohne Jahresauswahl
time_format:["%H:%i", "%m", "%d"]
// ungültiges Beispiel
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" durch "%M" ersetzt
~~~


## Zuordnung zu benutzerdefinierten Start-/Enddatum-Eigenschaften


### Standardzuordnung

Standardmäßig werden Zeit- und Dauerelemente mit den erforderlichen Eigenschaften 'start_date' und 'end_date' verknüpft, indem **map_to** auf "auto" gesetzt wird (**map_to:"auto"**).

### Benutzerdefinierte Zuordnung

Um Steuerelemente mit benutzerdefinierten Datumseigenschaften anstelle von 'start_date' und 'end_date' zu verbinden, verwenden Sie ein Objekt für **map_to**:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "deadline",    height: 72, type: "time", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


Die Objektform von **map_to** unterstützt:

1. **start_date** - die Dateneigenschaft, in der das Startdatum aus der Eingabe gespeichert wird
2. **end_date** - (optional) die Dateneigenschaft, in der das Enddatum aus der Eingabe gespeichert wird 
3. **duration** - (optional) die Dateneigenschaft, in der die Dauer aus der Eingabe gespeichert wird 

:::note
Wenn eine Eigenschaft ausgelassen wird, verwendet das Steuerelement die entsprechende obligatorische Datumseigenschaft.
:::


## Sichtbarkeit des Abschnitts umschalten


Sie können die Sichtbarkeit des Zeitabschnitts steuern, indem Sie **type:"time_optional"** mit **button: true** in der Lightbox-Abschnittskonfiguration setzen:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "time_optional"} /*!*/
];
~~~

Definieren Sie außerdem Beschriftungen für die Zustände des Umschaltknopfs:

~~~js
gantt.locale.labels.time_enable_button = 'Schedule';
gantt.locale.labels.time_disable_button = 'Unschedule';
~~~

Ein Umschaltknopf erscheint neben dem Abschnitt und ermöglicht das Ein- oder Ausblenden. Ist der Abschnitt sichtbar, verhält er sich wie **type:"time"**.

![](/img/time_optional.png)

Wenn der Knopf deaktiviert wird, wird der Abschnitt ausgeblendet, aber es erfolgen keine sofortigen Änderungen. Erst beim Klick auf "Save" werden die mit dem Zeit-Steuerelement über **map_to** verknüpften Eigenschaften der Aufgabe auf `null` gesetzt.

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

Diese Funktion ist nützlich, um Aufgaben als nicht geplant zu kennzeichnen. Siehe das zugehörige Beispiel:

**Related example:** [Unscheduled tasks](https://snippet.dhtmlx.com/5/81f51a96d)

