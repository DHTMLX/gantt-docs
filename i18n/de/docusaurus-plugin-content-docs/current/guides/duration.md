---
title: "Dauersteuerung"
sidebar_label: "Dauersteuerung"
---

# Dauersteuerung


In diesem Abschnitt wird eine Gruppe von Selektoren vorgestellt, mit denen Sie die Dauer einer Aufgabe festlegen können, indem Sie das Startdatum und die Anzahl der Tage angeben.

![duration_control](/img/duration_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"} /*!*/
];
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Initialisierung


Standardmäßig enthält das Lightbox-Formular ein **duration**-Steuerelement. Um weitere hinzuzufügen, gehen Sie wie folgt vor:

1) Fügen Sie eine neue Section zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"time2",       height:72, map_to:"auto", type:"duration"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~
  
2) Definieren Sie ein Label für die neue Section:

~~~js
gantt.locale.labels.section_time2 = "Tatsächliche Dauer";
~~~


## Eigenschaften


Hier sind die wichtigsten Eigenschaften, die häufig mit dem **time**-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) der Bezeichner der Section
- **height** - (*number*) die Höhe der Section
- **map_to** - (*string,object*) entweder "auto" oder ein Objekt, das die zugeordnete(n) Dateneigenschaft(en) angibt
- **formatter** - (object) eine Instanz des [durationFormatter](guides/working-time.md#taskdurationindecimalformat)
- **type** - (*string*) der Typ des [Section-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält die Section den Fokus beim Öffnen des Lightbox-Formulars
- **readonly** - (*boolean*) wenn auf *true* gesetzt, ist die Section nur lesbar
- **year_range** - (*array,number*) definiert den Bereich des Jahresauswahlfeldes, möglich sind:
    - *year_range: [2005, 2025]* - von 2005 bis 2025
    - *year_range: 10*  - von aktuellem Jahr minus 10 bis aktuellem Jahr plus 10
- **single_date** - (*boolean*) wenn auf *true* gesetzt, wird nur der *Startdatum*-Selektor angezeigt. Bearbeitete Aufgaben werden ausschließlich durch das Startdatum definiert und haben eine Dauer von null. Dies ist hauptsächlich für [Meilensteine](guides/task-types.md#milestones) nützlich.
- **time_format** - (*string*) bestimmt die Anordnung der Datums-/Zeitselektoren

  

## Konfiguration der Datums-/Zeitselektoren


Die Selektoren im Abschnitt "Zeitspanne" können mit der Eigenschaft [time_format](api/config/lightbox.md) angepasst werden (siehe auch [Date Format Specification](guides/date-format.md)):

**Adding the time selector to the 'Time period' section**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

Die erlaubten Elemente im [time_format](api/config/lightbox.md)-Array sind:

- *"%d"* - Tagesauswahl 
- *"%m"* - Monatsauswahl
- *"%Y"* - Jahresauswahl
- *"%H:%i"* - Zeitauswahl (Format wird durch die [time_picker](api/template/time_picker.md)-Vorlage gesteuert)

Sie können diese Elemente im Array neu anordnen oder weglassen, das Datenformat selbst kann jedoch nicht verändert werden.

 Hier sind einige Varianten:

~~~js
// Zeit zuerst
time_format:["%H:%i", "%m", "%d", "%Y"] 
// Monat zuerst
time_format:["%m","%d", "%Y", "%H:%i"]
// Jahresauswahl weggelassen
time_format:["%H:%i", "%m", "%d"]
// Falsche Verwendung
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" durch "%M" ersetzt
~~~

## Zuordnung zu benutzerdefinierten Start-/Enddatumseigenschaften


### Standardzuordnung

Normalerweise sind die Zeit- und Dauer-Steuerelemente mit den erforderlichen 'start_date'- und 'end_date'-Eigenschaften verbunden, indem **map_to** auf "auto" gesetzt wird (**map_to:"auto"**).

### Benutzerdefinierte Zuordnung

Um die Steuerelemente mit benutzerdefinierten Datumseigenschaften anstelle von 'start_date' und 'end_date' zu verknüpfen, verwenden Sie ein Objekt für die **map_to**-Eigenschaft:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "baseline",    height: 72, type: "duration", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


Das **map_to**-Objekt unterstützt diese Eigenschaften: 

1. **start_date** - die Dateneigenschaft, die das Startdatum aus der Eingabe speichert
2. **end_date** - optional, die Dateneigenschaft, die das Enddatum aus der Eingabe speichert 
3. **duration** - optional, die Dateneigenschaft, die die durch die Eingabe definierte Dauer speichert

:::note
Wenn eine Eigenschaft ausgelassen wird, verwendet das Steuerelement die zugehörige obligatorische Datumseigenschaft.
:::


## Sichtbarkeit der Section umschalten


Sie können die Sichtbarkeit der Dauer-Section umschalten, indem Sie **type:"duration_optional"** und **button: true** in der Lightbox-Section-Konfiguration setzen:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "duration_optional"} /*!*/
];
~~~

Definieren Sie außerdem die Labels für die beiden Zustände des Umschaltknopfes:

~~~js
gantt.locale.labels.time_enable_button = 'Planen';
gantt.locale.labels.time_disable_button = 'Nicht planen';
~~~

Ein Umschaltknopf erscheint neben der Section und ermöglicht das Umschalten der Sichtbarkeit. Ist die Section sichtbar, verhält sie sich wie eine mit **type:"duration"**.

![](/img/duration_optional.png)

Wenn Sie den Knopf deaktivieren, verschwindet die Section ohne sofortige Auswirkung. Nach dem Speichern werden die über **map_to** zugeordneten Eigenschaften der Aufgabe auf `null` gesetzt.

~~~js
gantt.getTask(1);

// Beispiel Rückgabewert
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

Diese Funktion ist nützlich, um Aufgaben als nicht geplant zu markieren oder Aufgaben ohne Baselines direkt über die Benutzeroberfläche zu verwalten. Siehe dazu die folgenden Beispiele:

**Related example:** [Nicht geplante Aufgaben](https://snippet.dhtmlx.com/5/81f51a96d)

**Related example:** [Baselines](https://snippet.dhtmlx.com/6qvjoa7i)

