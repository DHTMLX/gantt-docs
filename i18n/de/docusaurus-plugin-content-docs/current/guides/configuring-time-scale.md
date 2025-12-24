---
title: "Einrichten der Skala"
sidebar_label: "Einrichten der Skala"
---

# Einrichten der Skala


![gantt_dates](/img/gantt_dates.png)

Sie können Skalen über die Eigenschaft [scales](api/config/scales.md) konfigurieren. Es ist möglich, mehrere Skalen zu definieren, indem Sie Skalenobjekte zum **scales**-Array in der Konfiguration hinzufügen:

~~~js
// eine einzelne Tagesskala
gantt.config.scales = [
    {unit: "day", step: 1, format: "%j, %D"}
];

// mehrere Skalen gleichzeitig
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step:1, format: "%D", css:daysStyle }
];
~~~

Sie können folgende Aspekte der Zeitskala (X-Achse) anpassen:

1. [Einheit](#timeunits)
2. [Bereich](#range)
3. [Schritt](#timestep)
4. [Höhe](#height)
5. [Format](#dateformat)
6. [Stil](#styling)

Es besteht außerdem die Möglichkeit, eine [benutzerdefinierte Skala](#customtimeunits) hinzuzufügen.


## Zeiteinheiten {#timeunits}


![month_day_scale_units](/img/month_day_scale_units.png)

Um die Einheit für die Skala festzulegen, verwenden Sie die Eigenschaft **unit** im Skalenobjekt:

Verfügbare Werte sind: "minute", "hour", "day" (Standard), "week", "quarter", "month" und "year".

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "day", step: 1, format: "%j, %D"}
];

gantt.init("gantt_here");
~~~


[Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


## Bereich {#range}


![day_scale_unit](/img/day_scale_unit.png)

### Standardmäßige Bereichseinstellungen

Wenn der Datumsbereich nicht explizit angegeben wird, übernimmt Gantt die Daten aus den geladenen Aufgaben und fügt vor der ersten und nach der letzten Aufgabe im Zeitmaßstab einige Offsets hinzu. Diese Offsets hängen von den Einstellungen des Zeitmaßstabs ab. 
Basierend auf dem Wert von [scale_offset_minimal](api/config/scale_offset_minimal.md) ist das Offset entweder die Zeiteinheit, die durch das **unit**-Attribut in der Option [scales](api/config/scales.md) definiert ist, oder die kleinste Einheit des Zeitmaßstabs.

Den aktuell angezeigten Datumsbereich können Sie programmatisch mit der Methode [getState](api/method/getstate.md) abrufen.

~~~js
var state = gantt.getState();

console.log(state.min_date);
// -> Mon Jan 01 2018 00:00:00

console.log(state.max_date);
// -> Tue Jan 01 2019 00:00:00
~~~

Der Maßstabsbereich wird beim [Gantt-Rendering](api/method/render.md) neu berechnet. Wenn ein Benutzer eine Aufgabe außerhalb des sichtbaren Zeitbereichs verschiebt, bleibt die Aufgabenzeile sichtbar, aber das Balkenelement wird erst wieder angezeigt, wenn das gesamte Diagramm neu gerendert wird.

Um den Maßstab automatisch anpassen zu lassen, aktivieren Sie die Option [fit_tasks](api/config/fit_tasks.md).

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~


[Auto resize scale](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)


### Datumsbereich explizit festlegen {#explicit_date_range}

Alternativ können Sie den Datumsbereich explizit über die Optionen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) definieren:

~~~js
gantt.config.start_date = new Date(2018, 02, 31);
gantt.config.end_date = new Date(2018, 03, 09);
 
gantt.init("gantt_here");
~~~

Diese Daten können auch direkt während der [Gantt-Initialisierung](api/method/init.md) gesetzt werden:

~~~js
gantt.init("gantt_here", new Date(2018, 02, 31), new Date(2018, 03, 09));
~~~


[Define displayed date range](https://docs.dhtmlx.com/gantt/samples/01_initialization/08_explicit_time_range.html)


Aufgaben, die außerhalb des definierten Intervalls liegen, werden im Gantt-Diagramm nicht angezeigt, es sei denn, sie sind [als nicht geplant markiert](guides/unscheduled-tasks.md).


[Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)


#### Hinweis {#note}

Wenn sowohl **start_date** als auch **end_date** gesetzt sind und Sie eine Aufgabe außerhalb dieses Bereichs hinzufügen, ist die Aufgabe im Diagramm nicht sichtbar. 
Um solche Aufgaben anzuzeigen, aktivieren Sie die Option [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md).

~~~js
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

Wenn Sie diese Option nicht verwenden, können Sie den Datumsbereich dynamisch erweitern:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 var taskStart = task.start_date;
 var taskEnd = task.end_date;
 var scaleStart = gantt.config.start_date;
 var scaleEnd = gantt.config.end_date;

 // falls die Aufgabe außerhalb des Bereichs liegt
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // Zeitbereich aktualisieren
  gantt.config.end_date = new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date = new Date(Math.min(taskStart.valueOf(), scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

Alternativ können Sie eine Validierung im Lightbox hinzufügen, um das Speichern von Aufgaben außerhalb des Bereichs zu verhindern:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
     var taskStart = task.start_date;
     var taskEnd = task.end_date;
     var scaleStart = gantt.config.start_date;
     var scaleEnd = gantt.config.end_date;

    // prüfen, ob die Aufgabe außerhalb des Bereichs liegt
    if(scaleStart > taskEnd || scaleEnd < taskStart ){
        gantt.message({
            type: "warning", 
            text: "Warnung! Die Aufgabe liegt außerhalb des Datumsbereichs!",
            expire: 5000
        });
        return false;
    } 
    return true;
});
~~~

### Angezeigten Bereich dynamisch ändern {#dynamic_scale}

Es gibt verschiedene Möglichkeiten, den angezeigten Datumsbereich dynamisch zu aktualisieren:

- Steuern Sie den Zeitbereich mit den **start_date**- und **end_date**-Konfigurationen und aktualisieren Sie diese dynamisch basierend auf den geladenen Aufgaben.  
Dies kann durch [Neuberechnung des Maßstabsbereichs](api/method/getsubtaskdates.md) und Aktualisierung von **start_date** und **end_date** vor jedem Rendern des Gantt-Diagramms erfolgen:

~~~js
gantt.attachEvent("onBeforeGanttRender", function(){
   var range = gantt.getSubtaskDates();
   var scaleUnit = gantt.getState().scale_unit;
   if(range.start_date && range.end_date){
     gantt.config.start_date = gantt.calculateEndDate(range.start_date, -4, scaleUnit);
     gantt.config.end_date = gantt.calculateEndDate(range.end_date, 5, scaleUnit);
   }
});

gantt.init("gantt_here");
~~~

- Um den Maßstab jedes Mal neu zu rendern, wenn eine Aufgabe außerhalb des aktuellen Maßstabsintervalls liegt, setzen Sie die Eigenschaft [fit_tasks](api/config/fit_tasks.md) auf *true*:

~~~js
gantt.config.fit_tasks = true; 
gantt.init("gantt_here");
~~~

Wenn sowohl **start_date** als auch **end_date** gesetzt sind, denken Sie daran, eine der oben beschriebenen Methoden zu verwenden, damit die **fit_tasks**-Option korrekt funktioniert.

- Sie können den Maßstab auch dynamisch während des Ziehens einer Aufgabe aktualisieren, indem Sie Logik im [onTaskDrag](api/event/ontaskdrag.md) Event-Handler hinzufügen:

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
 var state = gantt.getState();
 var minDate = state.min_date,
       maxDate = state.max_date;
  
 var scaleStep = gantt.date.add(new Date(), state.scale_step, state.scale_unit) - new Date();
  
 var showDate,
  repaint = false;
  if(mode == "resize" || mode == "move"){
    if(Math.abs(task.start_date - minDate) < scaleStep){
      showDate = task.start_date;
      repaint = true;
      
    } else if(Math.abs(task.end_date - maxDate) < scaleStep){
      showDate = task.end_date;
      repaint = true;
    }
    
    if(repaint){
      gantt.render();
      gantt.showDate(showDate);
    }
  }
});
~~~

**Related example:** [Re-Rendering des Maßstabs beim Ziehen von Aufgaben](https://snippet.dhtmlx.com/o2bgk6uf)

### Anzeigen von Aufgaben außerhalb des expliziten Datumsbereichs {#tasksoutsidetimescale}

Sie können Aufgaben anzeigen, die außerhalb des [festgelegten Datumsbereichs](guides/configuring-time-scale.md#explicit_date_range) im Gantt-Diagramm liegen.

![tasks_outside_timescale](/img/tasks_outside_timescale.png) 

Um dies zu aktivieren, setzen Sie die Option [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md) auf *true*:

~~~js
var data = {
  "tasks": [
    {"id":1, "text":"Project #1", "start_date": "01-09-2018", "end_date": "02-09-2018"},
    {"id":2, "text":"Project #2", "start_date": "01-09-2021", "end_date": "02-09-2021"},
    {"id":3, "text":"Task #1", "start_date": "03-02-2020", "end_date": "05-02-2020"},
    ],
    "links":[]
};

gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here", new Date(2020, 1, 1), new Date(2020, 2, 1));
~~~


[Tasks outside timescale](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)


Als Ergebnis erscheinen Aufgaben mit den IDs "1" und "2" als leere Zeilen im Zeitachsenbereich, wobei ihre Namen und Startdaten im Grid angezeigt werden.

## Zeitintervall {#timestep}


![scale_step](/img/scale_step.png)

Um die Schrittweite des Zeitmaßstabs festzulegen, verwenden Sie die **step**-Eigenschaft im Konfigurationsobjekt des Maßstabs:

~~~js
var monthScaleTemplate = function (date) {
    var dateToStr = gantt.date.date_to_str("%M");
    var endDate = gantt.date.add(date, 2, "month");
    return dateToStr(date) + " - " + dateToStr(endDate);
};

gantt.config.scales = [
    {unit: "year", step: 1, format: "%Y"},
    {unit: "month", step: 3, format: monthScaleTemplate},
    {unit: "month", step: 1, format: "%M"}
];

gantt.init("gantt_here");
~~~


[Step config for the Quarter scale](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)


## Höhe {#height}


![scale_height](/img/scale_height.png)

Um die Höhe des Maßstabs anzupassen, verwenden Sie die Eigenschaft [scale_height](api/config/scale_height.md):

~~~js
gantt.config.scale_height = 54; /*!*/

gantt.init("gantt_here");
~~~


[Day hours](https://docs.dhtmlx.com/gantt/samples/03_scales/04_days.html)


Wenn mehrere Maßstäbe verwendet werden, wird die angegebene Höhe gleichmäßig aufgeteilt. Beispielsweise erhält bei **scale_height** von 60 Pixeln und 3 Maßstäben jeder Maßstab 20 Pixel Höhe.

## Datumsformat {#dateformat}


:::note
Siehe den Artikel [Date Format Specification](guides/date-format.md) für verfügbare Formatzeichen
:::

Das Datumsformat für den Maßstab können Sie über die **format**-Eigenschaft in jedem Maßstabsobjekt festlegen. Dies kann ein String sein:

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css: daysStyle }
];

gantt.init("gantt_here");
~~~


[Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)


![multiple_scales](/img/multiple_scales.png)

Oder eine Funktion, die ein Date-Objekt entgegennimmt und einen formatierten String zurückgibt:

~~~js
gantt.config.scales = [
  { unit: "day", step: 1, format: function(date){
    return "<strong>Tag " + dayNumber(date) + "</strong>

" + dateFormat(date);
  }}
]
~~~


[Custom scales](https://docs.dhtmlx.com/gantt/samples/03_scales/06_custom_scales.html)


![scale_template](/img/scale_template.png)

## Styling {#styling}


![css_styling](/img/css_styling.png)

Um die Zellen des Zeitmaßstabs zu gestalten, verwenden Sie das **css**-Attribut im Maßstabsobjekt.

~~~js
function getWeekOfMonthNumber(date){
    let adjustedDate = date.getDate() + date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
} 

gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function(date){
       return "Woche #" + getWeekOfMonthNumber(date);
    }},
    {unit: "day", step: 1, format: "%j %D", css: function(date) { /*!*/
         if(!gantt.isWorkTime(date)){ 
             return "week-end"; 
         } 
    }} 
];
~~~

**Related example:** [Zellen-Styling des Zeitmaßstabs](https://snippet.dhtmlx.com/tadcjjk4)

Wenn die **css**-Eigenschaft in den Maßstabskonfigurationen nicht gesetzt ist, können Sie das Template [scale_cell_class](api/template/scale_cell_class.md) verwenden, um CSS-Klassen auf den ersten Zeitmaßstab im **scales**-Array anzuwenden.

~~~js
function getWeekOfMonthNumber(date){
    let adjustedDate = date.getDate() + date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
} 

gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function(date){
       return "Woche #" + getWeekOfMonthNumber(date);
    }},
    {unit: "day", step: 1, format: "%j %D"}
];

gantt.templates.scale_cell_class = function(date) {
         if(!gantt.isWorkTime(date)){
             return "week-end";
         }
};
~~~

**Related example:** [Styling des ersten Zeitmaßstabs](https://snippet.dhtmlx.com/vovv2wde)

Um das Template [scale_cell_class](api/template/scale_cell_class.md) auf alle Maßstäbe anzuwenden, setzen Sie die Option [inherit_scale_class](api/config/inherit_scale_class.md) auf *true*.

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function(date){
       return "Woche #" + getWeekOfMonthNumber(date);
    }},
    {unit: "day", step: 1, format: "%j %D"}
];

gantt.templates.scale_cell_class = function(date) {
         if(!gantt.isWorkTime(date)){
             return "week-end";
         }
};
gantt.config.inherit_scale_class = true; /*!*/
~~~

**Related example:** [Styling aller Maßstäbe](https://snippet.dhtmlx.com/v6p55wdz)

Bei der Arbeit mit [Berechnungen der Arbeitszeit](guides/working-time.md) empfiehlt es sich, [isWorkTime](api/method/isworktime.md) anstelle von fest codierten Werten zu verwenden:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
   if(!gantt.isWorkTime(date)){
      return "weekend";
   }
};
~~~

Weitere Informationen zur Anpassung des Stils des Zeitachsenbereichs finden Sie im Artikel [Highlighting Time Slots](guides/highlighting-time-slots.md).

## Benutzerdefinierte Zeiteinheiten {#customtimeunits}


dhtmlxGantt ermöglicht es Ihnen, benutzerdefinierte Zeiteinheiten zu erstellen und Vorlagen für Beschriftungen in der Maßstabskonfiguration zu definieren.

Um eine benutzerdefinierte Einheit zu definieren, implementieren Sie zwei Funktionen am [Date-Objekt](api/other/date.md):

~~~js
Date gantt.date.<unit>_start(Date date);
Date gantt.date.add_<unit>(Date date, Integer increment);
~~~

- Die erste Funktion gibt den Beginn der Zeiteinheit für ein gegebenes Datum zurück (z. B. für month_start gibt der 14. Februar den 1. Februar zurück).  
- Die zweite Funktion addiert eine angegebene Anzahl von Einheiten zu einem Datum (z. B. das Subtrahieren von 2 Tagen).

:::note
In der Regel sind Inkremente positiv, da Maßstabszellen von links nach rechts erstellt werden. Die erste Zelle wird jedoch von rechts nach links erstellt, daher verwendet Gantt in diesem Fall einen negativen Inkrementwert.
:::

### Beispiel 1

So definieren Sie eine "fiscal_year"-Einheit, wobei das Geschäftsjahr am 31. Januar endet. So können Sie die neue Einheit angeben:

~~~js
var firstMonth = 1,
    firstDay = 1;

gantt.date.fiscal_year_start = function(date){       /*!*/
   var next = new Date(date);
   if(next.getMonth() < firstMonth || 
      (next.getMonth() === firstMonth && next.getDate() < firstDay)){
      next = gantt.date.add(next, -1, "year"); 
   }
  
  next = gantt.date.year_start(next);
  next.setMonth(firstMonth);
  next.setDate(firstDay);
 
  return next;
}; 

gantt.date.add_fiscal_year = function(date, inc){    /*!*/
   return gantt.date.add(date, inc, "year");
};
~~~

Danach kann die Einheit wie folgt im Code verwendet werden:

~~~js
var dateToStr = gantt.date.date_to_str("%Y");
function fiscalYearLabel(date){
    return dateToStr(gantt.date.fiscal_year_start(date));
};

gantt.config.scales = [
  {unit:"year", step:1, format:"Calendar year %Y"},
  {unit:"fiscal_year", step:1, format:fiscalYearLabel},
  {unit:"month", step: 1, format: "%M %Y"},
  {unit:"day", step: 1, format:"%d %M"}
];
~~~

### Beispiel 2

Es ist möglich, jede "day"-Zelle in drei "hour"-Zellen mit den Bezeichnungen 00, 08 und 16 zu unterteilen. Die Logik sieht folgendermaßen aus:

~~~js
gantt.date.hour_custom_start = function (date) {
    return date;
};

gantt.date.add_hour_custom = function (date, inc) { // inc hängt vom "step" ab
    const nextDate = new Date(date);
    if (nextDate.getHours() % 8 != 0) { // der Stundenwert ist nicht 0, 8 oder 16 /*!*/
        const diff = Math.abs(8 - nextDate.getHours()); /*!*/
        return gantt.date.add(nextDate, diff * inc, "hour"); /*!*/
    } /*!*/
    return gantt.date.add(date, 8 * inc, "hour"); /*!*/
};

gantt.config.scales = [
    { unit: "day", step: 1, date: "%d %F" },
    { unit: "hour_custom", step: 1, date: "%H" },
];

gantt.config.date_grid = "%Y-%m-%d %H:%i"
~~~

**Related example:** [Custom hours on the scale](https://snippet.dhtmlx.com/59qgh9vr)

![custom_scale](/img/custom_scale.png)

Um zu verstehen, wie Gantt die erste "hour"-Zelle bestimmt, nehmen wir an, dass die früheste Aufgabe um 07:00 Uhr beginnt. Da 7 kein Vielfaches von acht ist, wendet Gantt folgende Regel an:

~~~js
if (nextDate.getHours() % 8 != 0) {
    const diff = Math.abs(8 - nextDate.getHours());  // 8 - 7 = 1
    return gantt.date.add(nextDate, diff * inc, "hour"); // 7 - 1 = 6
} 
~~~

- Gantt berechnet die Zeitdifferenz zwischen 8:00 und 7:00: 

*diff = 08:00 - 07:00 = 1 Stunde*

- Dann multipliziert es diese Differenz mit dem Inkrement: 

 *diff * inc = 1 Stunde * (-1) = -1 Stunde* 

 Hier ist *inc* der negative Wert des Zeitschritts (*-1*).

- Schließlich wird dieser Wert zur Startzeit der frühesten Aufgabe addiert: 

 *07:00 + (- 1 Stunde) = 06:00*  


Der Wert der ersten Zelle ist somit **06**.

Für die zweite "hour"-Zelle gilt die gleiche Logik, jedoch mit einem positiven Inkrement:

- *diff = 08:00 - 06:00 = 2 Stunden*

- *diff * inc = 2 Stunden * 1 = 2 Stunden*

- *06:00 + 2 Stunden = 08:00*  


Die zweite Zelle zeigt **08** an.

Da 8 ein Vielfaches von acht ist, wird die nächste Zelle einfach als *08:00 + 8 Stunden = **16:00*** berechnet und dieses Muster setzt sich für die folgenden Zellen fort.

:::note
Dieses Vorgehen funktioniert, da der [Datumsbereich nicht explizit festgelegt ist](#explicit_date_range).
:::

Weitere Beispiele finden Sie im Artikel [How to add a custom scale](guides/how-to.md#howtoaddacustomscale).

## Benutzerdefinierte Zeitspannen {#customtimespans}


In diesem Abschnitt finden Sie Beispiele dafür, wie Sie die Zeitskala anpassen können, um arbeitsfreie Zeiträume anzuzeigen oder auszublenden. Außerdem wird gezeigt, wie Zellen mit arbeitsfreien Stunden am Anfang der Skala ausgeblendet werden können, selbst wenn der **skip_off_time**-Modus aktiv ist.

Hier ein Beispiel für eine benutzerdefinierte Skala mit typischen Arbeitszeiten von 08:00 bis 12:00 und 13:00 bis 17:00:

~~~js
gantt.date.day_custom_start = function (date) {
    return date;
};

gantt.date.add_day_custom = function (date, inc) { /*!*/
    const nextDate = new Date(date); /*!*/
    if (nextDate.getHours() < 8) { /*!*/ // Anweisung 1
        const diff = 8 - nextDate.getHours(); /*!*/
        return gantt.date.add(nextDate, diff * inc, "hour"); /*!*/
    } /*!*/
    if (nextDate.getHours() == 8) { /*!*/ // Anweisung 2
        return gantt.date.add(nextDate, 9 * inc, "hour"); /*!*/
    } /*!*/
    if (nextDate.getHours() == 17) { /*!*/ // Anweisung 3
        return gantt.date.add(nextDate, 15 * inc, "hour"); /*!*/
    } /*!*/

    return gantt.date.add(date, 8 * inc, "hour"); /*!*/
};

gantt.config.scales = [
    { unit: "day_custom", step: 1, date: "%d %H:00" },
];

// gantt.config.skip_off_time = true;
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
gantt.plugins({
    auto_scheduling: true,
});
gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-17:00"] }); /*!*/

gantt.config.duration_unit = "minute";
gantt.config.duration_step = 1;
gantt.config.time_step = 1;
gantt.config.round_dnd_dates = false;
~~~

**Related example:** [Custom time spans](https://snippet.dhtmlx.com/9s4u81c3)

Angenommen, die früheste Aufgabe beginnt am 1. April 2025 um 08:00 Uhr. Sehen wir uns an, wie Gantt die Offsets vor dieser Aufgabe berechnet, abhängig von der Einstellung [gantt.config.skip_off_time](api/config/skip_off_time.md).

Beginnen wir mit der Konfiguration, bei der arbeitsfreie Stunden ausgeblendet werden:

~~~js
gantt.config.skip_off_time = true;
~~~

In diesem Fall subtrahiert Gantt zur Erzeugung der ersten "hour"-Zelle Stunden von der Zeit der frühesten Aufgabe, bis es die Arbeitszeit des Vortages erreicht.

- Zuerst werden 9 Stunden von 08:00 Uhr am 1. April 2025 abgezogen (Anweisung 2): 


*08:00 - 9 Stunden = 23:00*


- Da 23:00 Uhr arbeitsfrei ist und keine Bedingung erfüllt wird, zieht Gantt weitere 8 Stunden ab:


*23:00 - 8 Stunden = 15:00*
- Die resultierende Zeit, 15:00 Uhr am 31. März 2025, liegt innerhalb der Arbeitszeit.

Die erste Zelle zeigt also **31 15:00** an.

![](/img/with_skip_off_time.png)

Um die Berechnung weiterer Zellen zu verstehen, deaktivieren Sie **gantt.config.skip_off_time**:

~~~js
gantt.config.skip_off_time = false;
~~~

Wie bereits erwähnt, bleibt die erste Zelle **31 15:00**, aber nun erscheinen vor der frühesten Aufgabe mehr leere Zellen, da auch arbeitsfreie Stunden angezeigt werden.

Für diese Zellen gilt folgende Logik:

- 15:00 Uhr am 31. März 2025 ist Arbeitszeit ohne besondere Bedingungen, daher wird die zweite Zelle durch Addition von 8 Stunden berechnet:


*15:00 + 8 Stunden = 23:00* 
- 23:00 Uhr am 31. März 2025 ist arbeitsfrei und erfüllt keine Bedingung, daher ist die dritte Zelle:


*23:00 + 8 Stunden = 7:00*
- 7:00 Uhr am 1. April 2025 ist arbeitsfrei und kleiner als 8:00 (Anweisung 3). Die nächste Zelle wird wie folgt berechnet:


    - *diff = 08:00 - 07:00 = 1 Stunde*
    - *diff * inc = 1 Stunde * 1 = 1 Stunde*
    - *07:00 + 1 Stunde = **08:00***


08:00 Uhr am 1. April 2025 entspricht dem Startzeitpunkt der frühesten Aufgabe.

![](/img/without_skip_off_time.png)

:::note
Die weiteren Zellen werden nach demselben Prinzip erstellt.
:::


Wenn **skip_off_time** deaktiviert ist, kann Gantt mehr als eine leere Zelle vor der frühesten Aufgabe hinzufügen. Um sicherzustellen, dass unabhängig von dieser Einstellung immer nur eine Zelle erscheint, kann folgende Logik verwendet werden:

~~~js
gantt.date.add_day_custom = function (date, inc) {
    // Wenn work_time aktiviert ist und Aufgaben geladen sind,
    // berechne das Datum der ersten Zelle.
    // Starte beim Minimaldatum, gehe rückwärts,
    // finde das nächstgelegene Datum innerhalb der Arbeitszeit,
    // dann ziehe 1 Stunde davon ab
    if (inc < 0 && gantt.getTaskByTime().length) {
        return gantt.calculateEndDate({ 
            start_date: date, duration: -1, unit: gantt.config._duration_unit 
        })
    }

    // Beginn der Arbeitszeit (Arbeitstag);
    // berechne, wann der Arbeitstag endet
    if (date.getHours() == 8) {
        return gantt.calculateEndDate(date, 8);
    }
    // Ende der Arbeitszeit (Arbeitstag);
    // berechne, wann der nächste Arbeitstag beginnt
    if (date.getHours() == 17) {
        return gantt.date.add(date, 15 * inc, "hour");
    }

    // Wenn Aufgaben geladen sind, berechne Arbeitsdaten für die zweite Skalen-Zelle
    // Wenn keine Aufgaben, berechne Daten für alle Skalen-Zellen
    date = gantt.date.add(date, 1 * inc, "day");
    gantt.date.day_start(date);
    date = gantt.getClosestWorkTime({ date, dir: "future" })
    return date
};

gantt.config.scales = [
    { unit: "day_custom", step: 1, date: "%d %H:%i" },
];
gantt.config.work_time = true;

gantt.config.skip_off_time = false; /*!*/
~~~

**Related example:** [Equal offset for custom scales](https://snippet.dhtmlx.com/wmj92ys5)

So sieht die Skala aus, wenn arbeitsfreie Stunden ausgeblendet werden:

![custom_first_scale_cell](/img/custom_first_scale_cell.png)

Und so sieht die Ansicht aus, wenn arbeitsfreie Stunden angezeigt werden (**gantt.config.skip_off_time** deaktiviert):

![first_scale_cell_without_skip_off_time](/img/disable_skip_off_time.png)

## Unendliches Scrollen {#infinitescroll}

Detaillierte Beispiele zur Implementierung des unendlichen Scrollens in der Timeline finden Sie im [zugehörigen](guides/how-to.md#howtohaveaninfinitescrollinthetimeline) Artikel.

## Feste (Sticky) Beschriftungen {#stickylabels}

Ab Version 9.0 sind Zeitskalen-Beschriftungen standardmäßig sticky. Das bedeutet, dass eine Beschriftung sichtbar bleibt, wenn eine Zelle wesentlich breiter als ihr Label ist, und beim Scrollen am Viewport "klebt", bis sie natürlich verschwindet. So bleiben Skalenbeschriftungen immer sichtbar, insbesondere beim Zoomen.

Wenn Sie das frühere Verhalten bevorzugen, bei dem die Beschriftungen zentriert sind und beim Scrollen nicht sichtbar bleiben, können Sie sticky labels deaktivieren, indem Sie die Eigenschaft `sticky` der Skala auf `false` setzen:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: false},
  {unit: "month", step: 1, format: "%F", sticky: false},
  {unit: "day", step: 1, format: "%j", sticky: false}
];
gantt.init("gantt_here");
~~~

Alternativ können Sie für eine bestimmte Skala sticky labels erzwingen, indem Sie `sticky: true` setzen. Dadurch bleiben die Labels auch dann sticky, wenn ihre Breite kleiner als die Zelle ist:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: true},
  {unit: "month", step: 1, format: "%F", sticky: true},
  {unit: "day", step: 1, format: "%j", sticky: true}
];
gantt.init("gantt_here");
~~~

