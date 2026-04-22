---
title: "Daten laden"
sidebar_label: "Daten laden"
---

# Daten laden

dhtmlxGantt kann Daten in zwei Formaten verarbeiten:

- [XML](guides/supported-data-formats.md#xmldhtmlxgantt20);
- [JSON](guides/supported-data-formats.md).

Um ein Gantt-Diagramm mit Daten zu belegen, verwenden Sie entweder die [parse](api/method/parse.md) oder die [load](api/method/load.md) Methode.

~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); 
~~~


**Zugehöriges Beispiel**: [Grundlegende Initialisierung](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
Wenn Sie dem Gantt falsche Daten übergeben, wird seine baumartige Struktur zyklisch, was den [zyklischen Referenzfehler](faq.md#cyclic-reference-error) verursacht.
:::

## Laden aus Objekt

Um Daten aus einem Objekt zu laden, verwenden Sie die [parse](api/method/parse.md) Methode:

~~~jsx title="Laden aus einer Inline-Datenquelle"
const data = {
    tasks: [
        { id: 1, text: "Projekt #1", start_date: "01-12-2025", duration: 18 },
        { id: 2, text: "Aufgabe #1",    start_date: "02-12-2025", duration: 8, parent: 1 },
        { id: 3, text: "Aufgabe #2",    start_date: "11-12-2025", duration: 8, parent: 1 }
    ]
};

gantt.init("gantt_here");
gantt.parse(data); /*!*/ 
~~~


**Zugehöriges Beispiel**: [Grundlegende Initialisierung](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
Wenn Ihre Datenobjekte sowohl "start_date" als auch "end_date" Werte enthalten und Datumswerte nur den Datumsanteil (z. B. 01-12-2025 und nicht 01-12-2025 00:00) umfassen, benötigen Sie möglicherweise eine zusätzliche Konfiguration. Bitte lesen Sie diesen Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).
:::

## Laden vom Server

### Client-seitig

Um Daten von einem Server zu laden, verwenden Sie die [](api/method/load.md) Methode:

~~~jsx title="gantt.html"
gantt.init("gantt_here");
gantt.load("data.json"); /*!*/   
~~~

Die *load*-Methode sendet eine AJAX-Anfrage an die angegebene URL und erwartet eine Antwort mit Daten in einem der unterstützten Formate ([Supported Data Formats](guides/supported-data-formats.md)).
Zum Beispiel:

~~~jsx title="data.json"
{
    "tasks": [
        { "id": 1, "text": "Projekt #1", "start_date": "01-12-2025", "duration": 18 },
        { "id": 2, "text": "Aufgabe #1", "start_date": "02-12-2025", "duration": 8,"parent": 1 },
        { "id": 3, "text": "Aufgabe #2", "start_date": "11-12-2025", "duration": 8, "parent": 1 }
    ],
    "links": [
        { "id": 1, "source": 1, "target": 2, "type": "1" },
        { "id": 2, "source": 2, "target": 3, "type": "0" }
    ]
}
~~~

Das Format wird im zweiten Argument der Methode angegeben: "json", "xml" oder "oldxml".

~~~js
gantt.load("data.xml", "xml");
~~~

### Serverseitig

Auf dem Server können Sie entweder eine statische Datei mit Daten haben oder ein Skript, das Daten aus der Datenquelle sammelt und in die Antwort schreibt.
Die serverseitige Implementierung hängt davon ab, welches Framework Sie verwenden möchten. 

:::note
Siehe detaillierte Anleitungen und Code-Beispiele für verschiedene Plattformen in dem Artikel [](guides/server-side.md#loadserverside).
:::

Zum Beispiel sollten Sie im Falle von Node.js eine Server-Route für die URL hinzufügen, über die Gantt eine AJAX-Anfrage nach Daten senden wird.

~~~js
gantt.load("/data"); 
~~~

Es wird eine entsprechende Antwort im JSON-Format erzeugt. 

~~~js
app.get("/data", (req, res) => {
    db.query("SELECT * FROM gantt_tasks", (err, tasks) => {
        if (err) console.log(err);

        db.query("SELECT * FROM gantt_links", (err, links) => {
            if (err) console.log(err);

            tasks.forEach((task) => {
                task.start_date = task.start_date.format("YYYY-MM-DD");
                task.open = true;
            });

            res.send({ tasks, links });
        });
    });
});
~~~

:::note
Siehe alle unterstützten Datenformate im Artikel [Supported Data Formats](guides/supported-data-formats.md).
:::


## Laden von Aufgaben-Daten {#loadingtaskdates}

### Festlegung des Aufgabenplans

Es gibt drei Möglichkeiten, einen Zeitplan für eine Aufgabe im Dateneintrag zu definieren:

- start_date + duration
- start_date + end_date
- duration + end_date

Die nicht angegebene Eigenschaft wird basierend auf den in dem Datenobjekt definierten Eigenschaften berechnet.


**Zugehöriges Beispiel**: [Backward planning](https://docs.dhtmlx.com/gantt/samples/01_initialization/18_backward_planning.html)


Der **end_date** hat eine höhere Priorität als der **duration**-Parameter. Wenn im Aufgabenobjekt 3 Parameter angegeben sind, wird der **duration**-Parameter ignoriert und die Aufgabe mit einem anderen Dauerwert geladen. Zum Beispiel:

~~~js {4,13}
{
    "id": "20", "text": "Projekt #2",
    "start_date": "01-12-2025",
    "duration": 3, 
    "end_date": "05-12-2025",
}

// die oben gezeigte Aufgabe wird mit dem aus Start- und Enddatum berechneten Dauerwert geladen
{
    "id": "20", "text": "Projekt #2",
    "start_date": "01-12-2025",
    "duration": 4, 
    "end_date": "05-12-2025",
}
~~~

## Laden von Daten im ISO-Format

Seit v9.1.3 erkennt und parst Gantt automatisch ISO-8601-Datumsstrings. Keine zusätzliche Konfiguration erforderlich.

Unterstützte Formate:

- `2026-01-06` - Datum nur
- `2026-01-06T10:30:00` - Datum und Uhrzeit
- `2026-01-06T10:30:00.000` - Datum und Uhrzeit mit Millisekunden
- `2026-01-06T10:30:00.000Z` - UTC
- `2026-01-06T10:30:00+02:00` - mit Zeitzonen-Offset

~~~js
gantt.parse({
    tasks: [
        { id: 2, text: "Task #1", start_date: "2026-01-06T10:30:00Z", duration: 3 }
    ],
    links: []
});
// ISO-Daten werden automatisch geparst - keine Template-Überschreibungen nötig
~~~

Wenn ISO-Daten in der Eingabe erkannt werden, werden sie automatisch wieder als ISO-Zeichenketten serialisiert, wenn sie an den [DataProcessor](guides/server-side.md) übergeben werden. Datums-Strings ohne Zeitangabe (z. B. `"2026-01-06"`) werden wieder als Strings mit Datum ohne Uhrzeit serialisiert, wobei das ursprüngliche Format erhalten bleibt. Enthält die Eingabe eine Mischung aus Datum-ohne-Uhrzeit und vollständigen Datum/Uhrzeit-Strings, werden alle Daten als vollständige Datum/Uhrzeit serialisiert.

:::note
Datum-Strings ohne Uhrzeit (z. B. `"2026-01-06"`) werden als lokales Mitternachtsdatum geparst, wenn `server_utc` auf `false` gesetzt ist (Standard).
:::

:::note
Wenn Sie explizit `gantt.templates.parse_date` oder `gantt.templates.format_date` überschreiben, erhalten Ihre Funktionen Vorrang vor der ISO-Automatik-Erkennung und der automatischen Serialisierung.
:::

:::tip Gantt v9.1.2 und älter
In Versionen vor v9.1.3 wurden ISO-Daten nicht automatisch erkannt. Wenn Sie eine ältere Version verwenden, müssen Sie die Vorlagen `parse_date` und `format_date` überschreiben, um ISO-Strings zu behandeln:

~~~js
gantt.templates.parse_date = (date) => {
    return new Date(date);
};

gantt.templates.format_date = (date) => {
    return date.toISOString();
};
~~~

In v9.1.3+ werden diese Vorlagen weiterhin als Fallback für NICHT-ISO-Datumsstrings verwendet. Siehe [gantt.date.parseDate()](api/other/date.md#parsedatedate-format) für die vollständige Parsing-Pipeline.
:::

## Dynamische Änderung des Datumsformats

Wenn Sie das [date format](api/config/date_format.md) dynamisch ändern müssen, muss die [parse_date](api/template/parse_date.md) Vorlage wie folgt angepasst werden:

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = (date) => {
    return strToDate(date);
};
~~~

## Task-Enddatum-Anzeige & Inklusive Enddaten {#taskenddatedisplayampinclusiveenddates}

Dieser Abschnitt gibt Ihnen eine Antwort auf die Frage: „Wie speichert und zeigt man das Enddatum der Aufgabe korrekt an?“.

Zunächst betrachten wir zwei mögliche Szenarien, die Sie beim Arbeiten mit Aufgaben-Daten begegnen können:

#### Szenario 1

- Wenn die Aufgabendauer in ganzen Tagen gemessen wird (duration_unit="day")
- Wenn Aufgaben-Datenobjekte Start- und Enddaten im Format "%Y-%m-%d" oder "%d-%m-%Y" enthalten (d. h. ohne Stunden-Minuten-Teilstücke)

Aufgrund der Details, wie dhtmlxGantt Enddaten von Aufgaben interpretiert und speichert, können die Ergebnisdaten Werte haben, die nicht erwartet werden.

Schauen Sie sich das folgende Beispiel an:

~~~js
gantt.parse({
    tasks: [
        { 
            id: 1,
            text: "Aufgabe 1",
            start_date: "22-12-2025",
            end_date: "22-12-2025"
        }
    ],
    links: []
});

console.log(gantt.getTask(1).end_date);
// 22 December 2025 00:00:00

console.log(gantt.getTask(1).duration);
// 0
~~~

In diesem Beispiel beziehen sich sowohl Start- als auch Enddatum auf denselben Zeitpunkt und die Aufgabenlaufzeit beträgt 0.

#### Szenario 2

- Wenn das Enddatum einer Aufgabe in der Gantt-Tabelle angezeigt wird
- Und das Format des Enddatums keine Stunden-Minuten-Teile enthält

~~~js
gantt.config.columns = [
    { name: "text", label: "Name", tree: true, width: 200, resize: true },
    { name: "duration", label: "Dauer", width: 80, align: "center", resize: true },
    { name: "start_date", label: "Start", width: 80, align: "center", resize: true },
    { name: "end_date", label: "Finish", width: 80, align: "center", resize: true }
];

gantt.init("gantt_here");

gantt.parse({
    tasks: [
        { 
            id: 1,
            text: "Aufgabe 1",
            start_date: "22-12-2025",
            end_date: "23-12-2025"
        }
    ],
    links: []
});
~~~

In diesem Beispiel ist das Finish-Datum (end_date der Aufgabe) als 23. Dezember angegeben, während die Aufgabe selbst am Ende des 22. Dezember endet.

![end_date](/img/end_date.png)

Wir erklären im Folgenden, wie Gantt Enddaten speichert.

### Wie Gantt Enddaten speichert

Auch wenn Sie die Stunden-Minuten-Teile für das Datum der Aufgabe nicht spezifizieren (duration_unit = "day"), speichert dhtmlxGantt sie immer als JS Date, das Stunden-Minuten-Sekunden-Millisekunden-Teil enthält, auf der Client-Seite.

Das aktuelle Format der Enddaten ist wie folgt:

- Die Sekund- und Millisekunden-Teile des Datums sind immer 0, Gantt unterstützt keine Einheiten kleiner als 1 Minute
- Das Enddatum der Aufgabe wird als Beginn des Tages ("day-hour-minute") angegeben, gefolgt vom letzten vollen Tag ("day-hour-minute"). Das heißt:
  - *Die Aufgabe, die am 22. Dezember beginnt und 1 Tag dauert*, hat die folgenden Start- und Enddaten: *"22-12-2025 00:00:00 - 23-12-2025 00:00:00"*. Das Enddatum entspricht dem Beginn des Tages nach dem 22. Dezember
  - *Die Aufgabe, die am 22. Dezember um 13:00 Uhr beginnt und 1 Stunde dauert*, hat die folgenden Start- und Enddaten: *"22-12-2025 13:00:00 - 22-12-2025 14:00:00"*. Das Enddatum entspricht dem Beginn der nächsten Stunde

Wenn wir das Enddatum der Aufgabe ohne Angabe von Stunden-Minuten auf dem Bildschirm anzeigen, kann das Ergebnis irreführend sein. Im Beispiel aus Szenario 2 sehen Start- und Enddatum möglicherweise so aus: *"22-12-2025 - 23-12-2025"*. Das mag den Eindruck erwecken, dass die Aufgabe nicht 1 Tag, sondern 2 Tage dauert (vom 22. bis 23. Dezember).

Dies ist das Standardverhalten und es kann verwirrend sein, aber es gibt die Möglichkeit, es über eine Konfiguration zu korrigieren. Im folgenden Abschnitt zeigen wir Ihnen mehrere Wege, wie Sie damit umgehen können.

### Wie man das Standardverhalten ändert

1) Das erste, was Sie *nicht tun sollten*, ist, die tatsächlichen Datumswerte der Aufgaben, die im Gantt gespeichert sind, zu verändern.

Sie möchten möglicherweise auch die Aufgaben-Daten ändern, die in das Gantt geladen werden, z. B. Enddaten als 22-12-2025 23:59:59 zu setzen. Aber *das sollten Sie besser nicht tun*, weil diese Entscheidung mit der Berechnung der Aufgaben-Dauer und der automatischen Planung in Konflikt geraten kann.

Stattdessen empfehlen wir, die folgenden Methoden zu verwenden:

2a) Um das Format der Enddaten von Aufgaben im Gantt zu ändern (d. h. das Enddatum in die Dauer der Aufgaben einzubeziehen), können Sie die [task_end_date](api/template/task_end_date.md) Vorlage neu definieren.

Nehmen wir eine Aufgabe, die am 22. Dezember 2025 beginnt und einen Tag dauert, und betrachten, wie die Vorlage das Enddatum ändern kann.

Standardmäßig sollte das Enddatum dieser Aufgabe als Dezember 23, 2025 angezeigt werden (`23-12-2025 00:00:00`):

- [Live-Demo: Default format](https://snippet.dhtmlx.com/kht2sx3z)

![task_end_date_template_default](/img/task_end_date_template_default.png)

Aber wenn Sie die [task_end_date](api/template/task_end_date.md) und [grid_date_format](api/template/grid_date_format.md) Vorlagen anwenden, wird dieselbe Aufgabe am 22. Dezember 2025 beendet:

- [Live-Demo: Inclusive end date format](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)

Der Code sieht so aus:

~~~js
// Vorlage neu definieren
gantt.templates.task_end_date = (date) => {
    return gantt.templates.task_date(new Date(date.valueOf() - 1));
};

const gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");

gantt.templates.grid_date_format = (date, column) =>  {
    if (column === "end_date") {
        return gridDateToStr(new Date(date.valueOf() - 1));
    } else {
        return gridDateToStr(date);
    }
};

gantt.init("gantt_here");
~~~

Auf diese Weise lässt sich das im Grid, in der Kopfzeile des Lightbox-Dialogs und an allen anderen Stellen, an denen das Enddatum angezeigt wird, gezeigte Enddatum ändern.

Wenn Sie die [format for inclusive end dates](api/template/task_end_date.md) von Aufgaben verwenden und möchten, dass dies mit der [Inline Editing](guides/inline-editing.md) in der Grid korrekt funktioniert, müssen Sie einen speziellen Editor zum Bearbeiten inklusiver Enddaten der Aufgaben erstellen, wie hier:

~~~js
// Inklusiver Editor für Enddaten
// Verwende den Standard-Editor, überschreibe jedoch die Methoden set_value/get_value
const dateEditor = gantt.config.editor_types.date;

gantt.config.editor_types.end_date = gantt.mixin(
    {
        set_value: (value, id, column, node) => {
            const correctedValue = gantt.date.add(value, -1, "day");
            return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
        },
        get_value: (id, column, node) => {
            const selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
            return gantt.date.add(selectedValue, 1, "day");
        },
    },
    dateEditor
);

const textEditor = { type: "text", map_to: "text" };
const startDateEditor = { type: "date", map_to: "start_date" };
const endDateEditor = { type: "end_date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };

gantt.config.columns = [
    { name: "text", label: "Name", tree: true, width: 200, editor: textEditor, resize: true },
    { name: "duration", label: "Duration", width: 80, align: "center", editor: durationEditor, resize: true },
    { name: "start_date", label: "Start", width: 140, align: "center", editor: startDateEditor, resize: true },
    { name: "end_date", label: "Finish", width: 140, align: "center", editor: endDateEditor, resize: true }
];

// Lightbox- und Grid-Vorlagen anpassen, um Enddaten der Aufgaben im inklusiven Format anzuzeigen
gantt.templates.task_end_date = (date) => {
    return gantt.templates.task_date(new Date(date.valueOf() - 1));
};

const gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");

gantt.templates.grid_date_format = (date, column) => {
    if (column === "end_date") {
        return gridDateToStr(new Date(date.valueOf() - 1));
    } else {
        return gridDateToStr(date);
    }
};
~~~

**Zugehöriges Beispiel**: [Inclusive end date editor](https://snippet.dhtmlx.com/ds28tk3c)

2b) Wenn andere Teile der Anwendung die Enddaten im „inklusive“ Format speichern müssen — d. h. eine Aufgabe, die am 22. Dezember 2025 beginnt und einen Tag dauert, muss mit start_date: "22-12-2025", end_date: "22-12-2025" gespeichert werden — müssen Sie zusätzlich eine Verarbeitung der Enddaten implementieren, nämlich:

- einen Tag zu den Enddaten hinzufügen, bevor die Daten in das Gantt geladen werden
- einen Tag von den Enddaten subtrahieren, bevor die Änderungen, die vom Gantt empfangen wurden, wieder in die Datenspeicherung zurückgeschrieben werden

## Daten-Eigenschaften {#dataproperties}

Eine Datenquelle für das Gantt-Diagramm ist ein Objekt, das 2 Arten von Informationen speichert:

- **tasks** - die Elemente der Aufgaben.
- **links** - die Elemente der Abhängigkeitsverbindungen.


### Eigenschaften eines Aufgabenobjekts {#task_properties}

:::note
Die vollständige Liste der Eigenschaften eines Aufgabenobjekts ist im Artikel [Task properties](guides/task-properties.md) angegeben.
:::

Das Standard-Datumsformat für JSON- und XML-Daten ist **"%d-%m-%Y %H:%i"** (siehe die [Datumsformat-Spezifikation](/guides/date-format/)).


Um es zu ändern, verwenden Sie die Konfigurationsoption [date_format](api/config/date_format.md).

~~~js
gantt.config.date_format="%Y-%m-%d";
gantt.init("gantt_here");
~~~

Sobald in Gantt geladen, werden die Eigenschaften **start_date** und **end_date** in den Date-Typ geparst. 

Datumsformate, die von der [date_format](api/config/date_format.md) Konfiguration nicht unterstützt werden, können manuell über die [parse_date](api/template/parse_date.md) Vorlage geparst werden.

### Eigenschaften eines Link-Objekts {#link_properties}

:::note
Die vollständige Liste der Eigenschaften eines Link-Objekts ist im Artikel [Link properties](guides/link-properties.md) angegeben.
:::

### Benutzerdefinierte Eigenschaften

Sie sind nicht auf die oben aufgeführten Pflicht-Eigenschaften beschränkt und können jedem Dateneintrag beliebige eigene hinzufügen. 
Zusätzliche Dateneigenschaften werden als Strings geparst und auf der Client-Seite geladen, wo Sie sie nach Bedarf verwenden können.

Siehe Beispiele von Daten mit benutzerdefinierten Eigenschaften [hier](/guides/supported-data-formats#custom-properties-in-data).


## Datenbankstruktur {#databasestructure}

Wenn Sie eine Datenbank verwenden, empfehlen wir zwei separate Tabellen zur Speicherung der Daten: eine für Aufgaben und eine für Links. 

![tutorial_db_tables](/img/tutorial_db_tables.png)

Die Struktur einer Standarddatenbank zum Laden von Aufgaben und Links in das Gantt-Diagramm ist:

<ul>
  <li><b>gantt_tasks</b> Tabelle - gibt die Gantt-Aufgaben an</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) die Ereignis-ID.</li>
  <li><b>start_date</b> - (<i>Date</i>) das Datum, an dem eine Aufgabe beginnen soll. </li>
  <li><b>text</b> - (<i>string</i>) die Beschreibung der Aufgabe.</li>
  <li><b>progress</b> - (<i>number</i>) eine Zahl von 0 bis 1, die angibt, welcher Prozentsatz der Aufgabe abgeschlossen ist. </li>
  <li><b>duration</b> - (<i>number</i>) die Dauer der Aufgabe in den Einheiten des aktuellen Zeitplans. </li>
  <li><b>parent</b> - (<i>number</i>) die ID der übergeordneten Aufgabe. </li>
  <li><b>type</b> - (<i>string</i>) optional, der [Typ](guides/task-types.md) der Aufgabe. </li>
  <li><b>readonly</b> - (<i>boolean</i>) optional, kann Aufgabe als [readonly](guides/readonly-mode.md#readonlymodeforspecifictaskslinks) markieren. </li>
  <li><b>editable</b> - (<i>boolean</i>) optional, kann Aufgabe als [editable](guides/readonly-mode.md#readonlymodeforspecifictaskslinks) markieren. </li>
  </ul>
  <li><b>gantt_links</b> Tabelle - gibt die Gantt-Abhängigkeitsverbindungen an</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) die Ereignis-ID.</li>
  <li><b>source</b> - (<i>number</i>) die ID der Quellaufgabe. </li>
  <li><b>target</b> - (<i>number</i>) die ID der Zielaufgabe. </li>
  <li><b>type</b> - (<i>string</i>) der Typ der Abhängigkeit:<ul><li>0 - 'finish_to_start'</li><li>1 - 'start_to_start'</li> <li>2 - 'finish_to_finish'</li><li>3 - 'start_to_finish'</li></ul> </li> 
  <li><b>lag</b> - (<i>number</i>) optional, [Task-Lag](/guides/auto-scheduling#settinglagandleadtimesbetweentasks). </li>
  <li><b>readonly</b> - (<i>boolean</i>) optional, kann Link als [readonly](guides/readonly-mode.md) markieren. </li>
  <li><b>editable</b> - (<i>boolean</i>) optional, kann Link als [editable](guides/readonly-mode.md) markieren. </li>
  </ul>
</ul> 

Verwenden Sie die folgende SQL-Anweisung, um eine Datenbank mit den beiden genannten Tabellen zu erstellen:

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


## Events-Fluss {#eventsflow}

Lade-bezogene Methoden haben den folgenden Ereignisfluss:

#### [gantt.parse()](api/method/parse.md):

- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [render](api/method/render.md)

#### [gantt.load()](api/method/load.md):

- [onLoadStart](api/event/onloadstart.md)
- [parse](api/method/parse.md)
- [onLoadEnd](api/event/onloadend.md)

#### [gantt.refreshData()](api/method/refreshdata.md):

- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)
- [onDataRender](api/event/ondatarender.md)

#### [gantt.render()](api/method/render.md):

- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [refreshData](api/method/refreshdata.md)
- [onGanttRender](api/event/onganttrender.md)