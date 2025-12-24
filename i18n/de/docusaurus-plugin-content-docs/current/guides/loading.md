---
title: "Datenladen"
sidebar_label: "Datenladen"
---

# Datenladen 


dhtmlxGantt unterstützt zwei Datenformate zum Laden von Informationen:

- [XML](guides/supported-data-formats.md#xmldhtmlxgantt20);
- [JSON](guides/supported-data-formats.md#json).

Um ein Gantt-Diagramm mit Daten zu füllen, können Sie entweder die Methoden [parse](api/method/parse.md) oder [load](api/method/load.md) verwenden.

~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); 
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
Wenn Sie dem Gantt-Diagramm fehlerhafte Daten bereitstellen, kann dessen baumartige Struktur zyklisch werden, was zum [cyclic reference error](faq.md#cyclicreferenceerror) führt.
:::

## Laden aus einem Objekt {#loadingfromobject}


Wenn Sie Daten direkt aus einem Objekt laden möchten, verwenden Sie die Methode [parse](api/method/parse.md):

**Loading from an inline data source**
~~~js
var data = {
  tasks:[
     {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(data); /*!*/   
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
Wenn Ihre Datenobjekte sowohl "start_date" als auch "end_date" enthalten, die Datumswerte jedoch nur das Datum (z. B. 01-12-2021, ohne Zeit) beinhalten, kann eine zusätzliche Konfiguration notwendig sein. Weitere Informationen finden Sie unter [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).
:::

## Laden vom Server {#loadingfromserver}


### Client-Seite

Um Daten von einem Server zu laden, können Sie die Methode [load](api/method/load.md) verwenden:

**gantt.html**
~~~js
gantt.init("gantt_here");
gantt.load("data.json"); /*!*/   
~~~

Die *load*-Methode sendet eine AJAX-Anfrage an die angegebene URL und erwartet eine Antwort in [einem der unterstützten Formate](guides/supported-data-formats.md).
Zum Beispiel:

**data.json**
~~~js
{
  "tasks":[
     {"id":1, "text":"Project #1", "start_date":"01-04-2020", "duration":18},
     {"id":2, "text":"Task #1", "start_date":"02-04-2020","duration":8, "parent":1},
     {"id":3, "text":"Task #2", "start_date":"11-04-2020","duration":8, "parent":1}
  ],
  "links":[
     {"id":1, "source":1, "target":2, "type":"1"},
     {"id":2, "source":2, "target":3, "type":"0"}
  ]
}
~~~

Sie können das Format im zweiten Argument der Methode angeben: "json", "xml" oder "oldxml".

~~~js
gantt.load("data.xml", "xml");
~~~

### Server-Seite

Auf dem Server können Sie entweder eine statische Datei mit Daten oder ein Skript haben, das Daten aus einer Quelle abruft und als Antwort zurückgibt.
Die serverseitige Konfiguration hängt vom verwendeten Framework ab.

:::note
Ausführliche Anleitungen und Codebeispiele für verschiedene Plattformen finden Sie unter [Server-Side Integration](guides/server-side.md#loadserverside).
:::

Zum Beispiel richten Sie mit Node.js eine Server-Route ein, die die URL verarbeitet, an die Gantt seine AJAX-Datenanfrage sendet.

~~~js
gantt.load("/data"); 
~~~

Diese Route gibt eine JSON-Antwort wie folgt zurück:

~~~js
app.get("/data", function(req, res){
    db.query("SELECT * FROM gantt_tasks", function(err, rows){
        if (err) console.log(err);
        db.query("SELECT * FROM gantt_links", function(err, links){
            if (err) console.log(err);
            for (var i = 0; i < rows.length; i++){
                rows[i].start_date = rows[i].start_date.format("YYYY-MM-DD");
                rows[i].open = true;
            }
 
            res.send({ tasks:rows, links : links });
        });
    });
});
~~~

:::note
Alle unterstützten Datenformate finden Sie in [Supported Data Formats](guides/supported-data-formats.md).
::: 


## Laden von Aufgabendaten {#loadingtaskdates}


### Festlegen des Aufgabenzeitplans

Es gibt drei Möglichkeiten, den Zeitplan einer Aufgabe in den Daten anzugeben:

- start_date + duration
- start_date + end_date
- duration + end_date

Die nicht angegebene Eigenschaft wird aus den beiden anderen berechnet.


[Backward planning](https://docs.dhtmlx.com/gantt/samples/01_initialization/18_backward_planning.html)


Die **end_date** hat Vorrang vor der **duration**. Wenn alle drei Parameter vorhanden sind, ignoriert Gantt die **duration** und berechnet sie anhand von Start- und Enddatum. Zum Beispiel:

~~~js
{
    "id":"20", "text":"Project #2", 
    "start_date":"01-04-2025", 
    "duration":3, 
    "end_date":"05-04-2025", 
    "order":10,"progress":0.4, 
    "type": "project", "open": true
}

// Die obenstehende Aufgabe wird tatsächlich mit einer anhand von Start- und Enddatum berechneten Dauer geladen:
{
    "id":"20", "text":"Project #2", 
    "start_date":"01-04-2025", 
    "duration":4, 
    "end_date":"05-04-2025", 
    "order":10,"progress":0.4, 
    "type": "project", "open": true
}
~~~

## Verwendung des ISO-Datumsformats {#loadingdatesinisoformat}

Gantt unterstützt das ISO-Datumsformat. Um es zu aktivieren, müssen Sie die Funktionen zum Parsen und Formatieren von Daten überschreiben:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## Dynamisches Ändern des Datumsformats {#changingthedateformatdynamically}

Wenn Sie das [Datumsformat](api/config/date_format.md) zur Laufzeit ändern möchten, sollten Sie das [parse_date](api/template/parse_date.md) Template wie folgt aktualisieren:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

## Anzeige des Aufgaben-Enddatums & inklusive Enddaten {#taskenddatedisplayampinclusiveenddates}

Dieser Abschnitt erklärt, wie Sie das Enddatum einer Aufgabe korrekt speichern und anzeigen.

Zunächst zwei häufige Szenarien beim Arbeiten mit Aufgabendaten:

#### Szenario 1

- Die Aufgabendauer wird in ganzen Tagen gemessen (duration_unit="day")
- Die Aufgabendaten enthalten Start- und Enddaten im Format "%Y-%m-%d" oder "%d-%m-%Y" (ohne Zeitangabe)

Aufgrund der Art und Weise, wie dhtmlxGantt Aufgabendaten interpretiert und speichert, können die Ergebnisse von den Erwartungen abweichen.

Hier ein Beispiel:

~~~js
gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "22-12-2021",
        end_date: "22-12-2021"
    }
]}, links:[]);

console.log(gantt.getTask(1).end_date);
// 22. Dezember 2021 00:00:00

console.log(gantt.getTask(1).duration);
// 0
~~~

In diesem Fall zeigen Start- und Enddatum auf denselben Moment, sodass die Aufgabendauer null ist.

#### Szenario 2

- Das Enddatum wird im Grid angezeigt
- Das Enddatum ist ohne Zeitangabe formatiert

~~~js
gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", resize: true},
    {name: "start_date", label: "Start", width:80, align: "center", resize: true},
    {name: "end_date", label: "Finish", width:80, align: "center", resize: true}
];

gantt.init("gantt_here");

gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "02-04-2020",
        end_date: "02-04-2020"
    }
]}, links:[]);
~~~

Hier wird das Fertigstellungsdatum (end_date) als 3. April angezeigt, obwohl die Aufgabe tatsächlich am Ende des 2. April endet.

![end_date](/img/end_date.png)

Im Folgenden wird erläutert, wie Gantt Enddaten speichert.

### Wie Gantt Enddaten speichert

Auch wenn der Zeitanteil nicht angegeben ist (duration_unit = "day"), speichert dhtmlxGantt Daten immer als JavaScript Date-Objekte, die Zeitkomponenten enthalten.

Das Format für Enddaten ist wie folgt:

- Sekunden und Millisekunden sind immer null, da Gantt keine Einheiten kleiner als eine Minute unterstützt
- Das Enddatum repräsentiert den Beginn des Tages (oder der Stunde) unmittelbar nach dem letzten aktiven Tag (oder der Stunde). Zum Beispiel:
  - Eine Aufgabe, die am 2. April beginnt und 1 Tag dauert, hat Start- und Enddatum: "02-04-2022 00:00:00 - 03-04-2022 00:00:00". Das Enddatum zeigt auf den Beginn des 3. April.
  - Eine Aufgabe, die am 2. April um 13:00 Uhr beginnt und 1 Stunde dauert, hat Start- und Enddatum: "02-04-2022 13:00:00 - 02-04-2022 14:00:00". Das Enddatum zeigt auf den Beginn der nächsten Stunde.

Wenn das Enddatum ohne Zeitangabe angezeigt wird, kann dies irreführend sein. Im Beispiel aus **Szenario 2** erscheinen die Daten als "02-04-2022 - 03-04-2022", was als 2-tägige Aufgabe interpretiert werden könnte, obwohl es tatsächlich nur 1 Tag ist.

Dies ist das Standardverhalten. Obwohl es verwirrend sein kann, gibt es Konfigurationsoptionen, um dies anzupassen, die in den folgenden Abschnitten behandelt werden.

### **Wie kann das Standardverhalten angepasst werden?**

**1)** Das Wichtigste ist, die tatsächlichen Aufgabendaten, die im Gantt gespeichert sind, nicht zu verändern.

Man könnte in Erwägung ziehen, die Aufgabendaten beim Laden in das Gantt zu modifizieren, zum Beispiel das Enddatum auf 02-04-2022 23:59:59 zu setzen. Von diesem Ansatz raten wir jedoch ab, da dies zu Konflikten bei der Berechnung der Aufgabendauer und beim automatischen Planen führen kann.

**Stattdessen empfehlen wir folgende Methoden:**

**2a)** Um das Format der Enddaten von Aufgaben im Gantt anzupassen (zum Beispiel, um das Enddatum in die Aufgabendauer einzubeziehen), können Sie das Template [task_end_date](api/template/task_end_date.md) neu definieren.

Betrachten wir eine Aufgabe, die am 2. April 2020 beginnt und einen Tag dauert. Schauen wir, wie sich das Template auf das Enddatum auswirkt.

Standardmäßig erscheint das Enddatum der Aufgabe als 3. April 2020 (`03-04-2020 00:00:00`):

- [Live-Demo: Standardformat](https://snippet.dhtmlx.com/5/24f73d6ec)

![task_end_date_template_default](/img/task_end_date_template_default.png)

Wenn Sie jedoch das Template [task_end_date](api/template/task_end_date.md) verwenden, wird dieselbe Aufgabe als am 2. April 2020 endend angezeigt:

- [Live-Demo: Inklusives Enddatenformat](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)

So sieht der Code aus:

~~~js
// override the columns config
gantt.config.columns = [
  {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
  {name: "text", label: "Name", tree: true, width: 200, resize: true},
  {name: "start_date", label: "Start", width:80, align: "center", resize: true},
  {name: "end_date", label: "Finish", width:80, align: "center", resize: true}, 
  {name:"add"}
];

// redefine the template
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};
 
var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
   if(column === "end_date"){
     return gridDateToStr(new Date(date.valueOf() - 1)); 
   }else{
     return gridDateToStr(date); 
   }
}
gantt.init("gantt_here");
~~~

Mit dieser Methode wird das Enddatum der Aufgabe im Grid, im Lightbox-Header und an allen anderen Stellen, an denen das Enddatum angezeigt wird, verändert.

Wenn Sie das [inklusive Enddatenformat](api/template/task_end_date.md) verwenden und möchten, dass es reibungslos mit [Inline-Bearbeitung](guides/inline-editing.md) im Grid funktioniert, müssen Sie einen eigenen Editor für die Bearbeitung von inklusiven Enddaten erstellen, wie folgt:

~~~js
// inclusive editor for end dates
// use the default editor, but override the set_value/get_value methods
var dateEditor = gantt.config.editor_types.date;
gantt.config.editor_types.end_date = gantt.mixin({
    set_value: function(value, id, column, node){
        var correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
    },
    get_value: function(id, column, node) {
        var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
    },
}, dateEditor);

var textEditor = {type: "text", map_to: "text"};
var startDateEditor = {type: "date", map_to: "start_date"};
var endDateEditor = {type: "end_date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};

gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", 
        editor: durationEditor, resize: true},
    {name: "start_date", label: "Start", width:140, align: "center", 
        editor: startDateEditor, resize: true},
    {name: "end_date", label: "Finish", width:140, align: "center", 
        editor: endDateEditor, resize: true}
];

// change lightbox and grid templates to display dates of tasks in an inclusive format
gantt.templates.task_end_date = function(date){
    return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
    if(column === "end_date"){
        return gridDateToStr(new Date(date.valueOf() - 1)); 
    }else{
        return gridDateToStr(date); 
    }
}
~~~

Sample: [Inklusiver Enddatum-Editor](https://snippet.dhtmlx.com/ds28tk3c)

**2b)** Wenn andere Teile Ihrer Anwendung Enddaten im "inklusiven" Format benötigen - das heißt, eine Aufgabe, die am 2. April 2020 beginnt und einen Tag dauert, wird gespeichert mit start_date: "02-04-2022", end_date: "02-04-2022" - müssen Sie die Enddaten mit zusätzlicher Logik behandeln:

- Einen Tag zu den Enddaten hinzufügen, bevor die Daten ins Gantt geladen werden
- Einen Tag von den Enddaten abziehen, bevor Änderungen vom Gantt zurück ins Datenspeicher geschrieben werden

## Daten-Eigenschaften {#dataproperties}


Die Datenquelle für das Gantt-Diagramm ist ein Objekt mit zwei Hauptinformationsarten:

- **tasks** - die Aufgabenobjekte
- **links** - die Abhängigkeitsverbindungen

### Eigenschaften des Aufgabenobjekts {#task_properties}

:::note
Die vollständige Liste der Eigenschaften von Aufgabenobjekten finden Sie im Artikel [Task properties](guides/task-properties.md).
:::

Das Standard-Datenformat für JSON- und XML-Daten ist **"%d-%m-%Y %H:%i"** (siehe [Date format specification](guides/date-format.md)).


Um es zu ändern, verwenden Sie die Konfigurationsoption [date_format](api/config/date_format.md).

~~~js
gantt.config.date_format="%Y-%m-%d";
gantt.init("gantt_here");
~~~

Nach dem Laden ins Gantt werden die Eigenschaften **start_date** und **end_date** als Date-Objekte geparst.

Falls Ihre Datumsformate nicht von der [date_format](api/config/date_format.md)-Konfiguration unterstützt werden, können Sie sie manuell mit dem Template [parse_date](api/template/parse_date.md) parsen.

### Eigenschaften des Link-Objekts {#link_properties}

:::note
Die vollständige Liste der Eigenschaften von Link-Objekten finden Sie im Artikel [Link properties](guides/link-properties.md).
:::

### Benutzerdefinierte Eigenschaften

Sie sind nicht auf die Pflichtfelder beschränkt und können beliebige benutzerdefinierte Eigenschaften zu Ihren Datenobjekten hinzufügen. Zusätzliche Eigenschaften werden als Strings geparst und an die Client-Seite übergeben, wo Sie sie nach Bedarf verwenden können.

Beispiele für Daten mit benutzerdefinierten Eigenschaften finden Sie [hier](guides/supported-data-formats.md#custompropertiesindata).

## Datenbankstruktur {#databasestructure}


Für die Nutzung mit einer Datenbank empfiehlt es sich, zwei separate Tabellen zu verwenden: eine für Aufgaben und eine für Links.

![tutorial_db_tables](/img/tutorial_db_tables.png)

Eine typische Datenbankstruktur zum Laden von Aufgaben und Links ins Gantt-Diagramm sieht wie folgt aus:

<ul>
  <li><b>gantt_tasks</b> Tabelle - enthält die Gantt-Aufgaben</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) Aufgaben-ID.</li>
  <li><b>start_date</b> - (<i>Date</i>) geplanter Startzeitpunkt der Aufgabe.</li>
  <li><b>text</b> - (<i>string</i>) Aufgabenbeschreibung.</li>
  <li><b>progress</b> - (<i>number</i>) von 0 bis 1, Prozent der Aufgabenerledigung.</li>
  <li><b>duration</b> - (<i>number</i>) Aufgabendauer in aktuellen Zeiteinheiten.</li>
  <li><b>parent</b> - (<i>number</i>) ID der übergeordneten Aufgabe.</li>
  <li><b>type</b> - (<i>string</i>) optional, der [Aufgabentyp](guides/task-types.md).</li>
  <li><b>readonly</b> - (<i>boolean</i>) optional, markiert Aufgabe als [readonly](guides/readonly-mode.md#readonlymodeforspecifictaskslinks).</li>
  <li><b>editable</b> - (<i>boolean</i>) optional, markiert Aufgabe als [editable](guides/readonly-mode.md#readonlymodeforspecifictaskslinks).</li>
  </ul>
  <li><b>gantt_links</b> Tabelle - enthält die Abhängigkeits-Links</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) Link-ID.</li>
  <li><b>source</b> - (<i>number</i>) ID der Quellaufgabe.</li>
  <li><b>target</b> - (<i>number</i>) ID der Zielaufgabe.</li>
  <li><b>type</b> - (<i>string</i>) Art der Abhängigkeit:<ul><li>0 - 'finish_to_start'</li><li>1 - 'start_to_start'</li> <li>2 - 'finish_to_finish'</li><li>3 - 'start_to_finish'</li></ul></li> 
  <li><b>lag</b> - (<i>number</i>) optional, [Aufgabenverzögerung (Lag)](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks).</li>
  <li><b>readonly</b> - (<i>boolean</i>) optional, markiert Link als [readonly](guides/readonly-mode.md).</li>
  <li><b>editable</b> - (<i>boolean</i>) optional, markiert Link als [editable](guides/readonly-mode.md).</li>
  </ul>
</ul> 

Zum Erstellen der beiden Tabellen können Sie dieses SQL verwenden:

~~~js
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
)
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `sortorder` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~


## Ablauf der Events {#eventsflow}


Hier sehen Sie den Ablauf der Events im Zusammenhang mit den Lademethoden:


### [gantt.parse()](api/method/parse.md):

- event [onBeforeParse](api/event/onbeforeparse.md) 
- event [onTaskLoading](api/event/ontaskloading.md) 
- event [onParse](api/event/onparse.md)  
- [gantt.render()](api/method/render.md)

### [gantt.load()](api/method/load.md)

- event [onLoadStart](api/event/onloadstart.md) 
- [gantt.parse()](api/method/parse.md)
- event [onLoadEnd](api/event/onloadend.md) 

### [gantt.refreshData()](api/method/refreshdata.md):

- event [onBeforeDataRender](api/event/onbeforedatarender.md) 
- event [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 
- event [onDataRender](api/event/ondatarender.md) 

### [gantt.render()](api/method/render.md):

- event [onBeforeGanttRender](api/event/onbeforeganttrender.md) 
- [gantt.refreshData()](api/method/refreshdata.md)
- event [onGanttRender](api/event/onganttrender.md)

