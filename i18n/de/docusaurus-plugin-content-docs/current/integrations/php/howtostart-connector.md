---
title: "dhtmlxGantt mit dhtmlxConnector"
sidebar_label: "dhtmlxConnector"
---

# dhtmlxGantt mit dhtmlxConnector

Dieses Tutorial erklärt, wie Sie ein einfaches Gantt-Diagramm auf einer Webseite einrichten, das Aufgaben in einer Datenbank (auf dem Server) speichern und aktualisieren kann.


Der Fokus liegt hier auf dem Aufbau eines Gantt-Diagramms mit [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html).
Wenn Sie eine andere serverseitige Technologie bevorzugen, finden Sie unten Tutorials für verschiedene Integrationsoptionen:

- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim3](integrations/php/howtostart-php.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

![gantt_basic](/img/gantt_basic.png)


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Schritt 1. Herunterladen des dhtmlxGantt-Pakets

<div>


Laden Sie zunächst das Bibliothekspaket auf Ihren Computer herunter.

<div>![finger](/img/finger.png) <span>Folgen Sie diesen Schritten:</span></div>

<ul><li>Laden Sie das dhtmlxGantt-Paket <a href='https://github.com/DHTMLX/connector-php' title='dhtmlxConnector for PHP repository' target='_blank'>hier</a> herunter, falls Sie dies noch nicht getan haben. </li><li>Entpacken Sie das Paket in das Stammverzeichnis Ihres lokalen Webservers. Die entpackten Dateien werden in einem Ordner mit dem Namen des Paketarchivs - dhtmlxGantt - abgelegt.</li></ul>

</div>

## Schritt 2. Einbinden der dhtmlxGantt-Code-Dateien

<div>

Als Nächstes binden Sie die dhtmlxGantt-Code-Dateien in Ihre HTML-Datei ein, damit Sie die Funktionen der Bibliothek nutzen können.

Die benötigten dhtmlxGantt-Dateien sind:

<ul>
  <li>dhtmlxgantt.js</li>
  <li>dhtmlxgantt.css</li>
</ul> 

<div>![finger](/img/finger.png) <span>Folgen Sie diesen Schritten:</span></div>

- Erstellen Sie eine HTML-Datei im 'dhtmlxGantt'-Ordner (wo sich die dhtmlxGantt-Dateien befinden). Sie können sie z.B. 'myGantt.html' nennen.
- Binden Sie die dhtmlxGantt-Code-Dateien in <b>myGantt.html</b> ein (beide Dateien befinden sich im 'codebase'-Ordner).
  
~~~js
<!DOCTYPE html>
<html>
<head>
   <title>How to Start with dhtmlxGantt</title>
   <script src="codebase/dhtmlxgantt.js"></script> /*!*/  
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet"> /*!*/  
</head>
<body>
       //your code will be here
</body>
</html>
~~~


</div>

## Schritt 3. Initialisieren von dhtmlxGantt

<div>


Erstellen Sie anschließend einen DIV-Container und initialisieren Sie dhtmlxGantt darin.

 Beachten Sie, dass dhtmlxGantt ein statisches Objekt ist und nur einmal pro Seite instanziiert werden kann.
Sie können auf die dhtmlxGantt-Instanz mit <b>dhtmlxGantt</b> oder einfach <b>gantt</b> zugreifen.

<div>![finger](/img/finger.png) <span>Folgen Sie diesen Schritten:</span></div>


- Fügen Sie einen DIV-Container in die Datei <b>myGantt.html</b> ein.
- Initialisieren Sie dhtmlxGantt mit dem Befehl <code>gantt.init("gantt_here")</code>. Diese Methode erwartet die ID des HTML-Containers, in dem das Gantt-Diagramm angezeigt werden soll.
  
~~~html
<!DOCTYPE html>
<html>
<head>
   <title>How to Start with dhtmlxGantt</title>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
    <div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript">
        gantt.init("gantt_here"); /*!*/  
    </script>
</body>
</html>
~~~    


</div>

Wenn Sie den Vollbildmodus verwenden, fügen Sie dieses CSS hinzu, um eine korrekte Darstellung sicherzustellen:

~~~html
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

## Schritt 4. Laden von Daten in das Gantt-Diagramm

<div>


Jetzt füllen wir das Gantt-Diagramm mit Daten aus einer Beispiel-Datenquelle. Wir halten es einfach und verwenden ein Inline-Objekt als Datenquelle.

 Zum Laden der Daten verwenden wir die 
[parse](api/method/parse.md)-Methode, die die Datenquelle als Parameter erhält. 


Die Objekt-Eigenschaften sind:

<ul>
  <li><b>data</b> - enthält die Gantt-Aufgaben</li>
  <ul>
  <li><b>id</b> - (<i>string, number</i>) eindeutige Aufgaben-ID.</li>
  <li><b>start_date</b> - (<i>Date</i>) Startdatum der Aufgabe. </li>
  <li><b>text</b> - (<i>string</i>) Beschreibung der Aufgabe.</li>
  <li><b>progress</b> - (<i>number</i>) Wert zwischen 0 und 1, der den Fertigstellungsgrad angibt. </li>
  <li><b>duration</b> - (<i>number</i>) Dauer der Aufgabe in Einheiten der aktuellen Zeitskala. </li>
  <li><b>parent</b> - (<i>number</i>) ID der übergeordneten Aufgabe, falls vorhanden. </li>
  </ul>
  <li><b>links</b> - definiert Abhängigkeiten zwischen Aufgaben</li>
  <ul>
  <li><b>id</b>-(<i>string, number</i>) eindeutige Link-ID.</li>
  <li><b>source</b>-(<i>number</i>) ID der Quellaufgabe. </li>
  <li><b>target</b>-(<i>number</i>) ID der Zielaufgabe. </li>
  <li><b>type</b>-(<i>string</i>) Abhängigkeitstyp: 0 - 'Ende zu Anfang', 1 - 'Anfang zu Anfang', 2 - 'Ende zu Ende'. </li>
  </ul>
</ul> 

<div>![finger](/img/finger.png) <span>Folgen Sie diesen Schritten:</span></div>

<ul>

- Deklarieren Sie die Variable 'tasks' in der Datei <b>myGantt.html</b>: 

~~~js
var tasks = {
    data:[
        {id:1, text:"Project #1",start_date:"01-04-2013", duration:11,
        progress: 0.6, open: true},
        {id:2, text:"Task #1",     start_date:"03-04-2013", duration:5, 
        progress: 1,   open: true, parent:1},
        {id:3, text:"Task #2",   start_date:"02-04-2013", duration:7, 
        progress: 0.5, open: true, parent:1},
        {id:4, text:"Task #2.1", start_date:"03-04-2013", duration:2, 
        progress: 1,   open: true, parent:3},
        {id:5, text:"Task #2.2", start_date:"04-04-2013", duration:3, 
        progress: 0.8, open: true, parent:3},
        {id:6, text:"Task #2.3", start_date:"05-04-2013", duration:4, 
        progress: 0.2, open: true, parent:3}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:1, target:3, type:"1"},
        {id:3, source:3, target:4, type:"1"},
        {id:4, source:4, target:5, type:"0"},
        {id:5, source:5, target:6, type:"0"}
    ]
};
~~~
- Fügen Sie den Befehl <code>gantt.parse(tasks)</code> direkt nach <code>gantt.init("gantt_here")</code> hinzu:
~~~js
gantt.init("gantt_here"); 
gantt.parse (tasks);/*!*/  
~~~

</ul>

</div>

[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Schritt 5. Erstellen einer Datenbank

:::note
Dieser und die folgenden Schritte gelten, wenn Sie Daten aus einer Datenbank laden möchten, anstatt Inline-Daten zu verwenden.
:::
<div>


Erstellen Sie als Nächstes eine Datenbank mit zwei Tabellen zur Speicherung von Aufgaben und Abhängigkeiten. 

![tutorial_db_tables](/img/tutorial_db_tables.png)

<i><b>sortorder</b> ist eine Eigenschaft, die nur beim Laden von Daten aus der Datenbank verwendet wird. Sie legt die Reihenfolge der Aufgaben unter Geschwistern fest.</i>

<div>![finger](/img/finger.png) <span>Folgen Sie diesen Schritten:</span></div>

<ul>

- Erstellen Sie eine neue Datenbank namens <i>gantt</i>.
- Führen Sie den folgenden SQL-Code aus, um die Tabellen <i>gantt_tasks</i> und <i>gantt_links</i> zu erstellen:

~~~js
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL DEFAULT 0,
  `progress` float NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~
</ul>

</div>

Damit Aufgaben auch dann korrekt gespeichert werden, wenn einige Felder leer sind, fügen Sie diesen Code in Ihre **myGantt.html** ein:


~~~js 
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    task.sortorder = 0;
    return true;
});
~~~

## Schritt 6. Laden von Daten aus der Datenbank

:::note
In den nächsten beiden Schritten wird PHP für die Server-Client-Integration verwendet.

 Wenn Sie eine andere Plattform nutzen, lesen Sie den Artikel [Data Loading](guides/loading.md), um zu erfahren, wie Sie Ihr eigenes Serverskript implementieren.
:::

<div>


Jetzt aktivieren wir das Laden von Daten aus der Datenbank in das Diagramm. Dies geschieht mit der [load](api/method/load.md)-Methode, die eine URL zur Datenquelle erwartet. 
Für den Datenbankzugriff verweist diese URL auf eine PHP-Datei, die die Serverlogik übernimmt.


Wir verwenden PHP und die [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html)-Bibliothek, die die serverseitige Integration für dhtmlxGantt vereinfacht.

<div>![finger](/img/finger.png) <span>Folgen Sie diesen Schritten:</span></div>

<ul>

- Erstellen Sie eine PHP-Datei im 'dhtmlxGantt'-Ordner, z.B. <b>data.php</b>.
- Bearbeiten Sie <b>data.php</b> und fügen Sie folgenden serverseitigen Code ein:

~~~php
<?php

include ('codebase/connector/gantt_connector.php');

$res = new PDO("mysql:host=localhost;dbname=gantt", "root", "");

$gantt = new JSONGanttConnector($res);
$gantt->render_links("gantt_links","id","source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,sortorder,parent"
);
?>
~~~
- Setzen Sie in der Datei <b>myGantt.html</b> die Eigenschaft <code>gantt.config.date_format</code> auf <i> "%Y-%m-%d %H:%i"</i>, damit das Datumsformat mit den Erwartungen von dhtmlxGantt übereinstimmt.


~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";/*!*/ 
gantt.init("gantt_here");
~~~

- Rufen Sie <code>gantt.load('data.php')</code> auf, um die Daten aus der Datenbank in das Gantt-Diagramm zu laden.

**myGantt.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
gantt.init("gantt_here");
gantt.load('data.php');//lädt Daten aus der Datenbank in das Gantt-Diagramm  /*!*/  
~~~
</ul>

</div>

### Zuordnung von Datenbankspalten

Beachten Sie, dass die Reihenfolge der Spalten in **$connector->render_table** wichtig ist. Die ersten drei Spalten in der Liste entsprechen immer den Eigenschaften *start_date/duration/text* oder *start_date/end_date/text* des clientseitigen Task-Objekts, unabhängig davon, welche Spaltennamen Sie verwenden. Die Zuordnungslogik wird im Folgenden erläutert.

Die zweite Spalte wird der Eigenschaft *task.duration* zugewiesen, wenn 'duration' in der Konfiguration angegeben ist:

~~~js
$gantt->render_table("gantt_tasks","id","Start,duration,Name,progress,parent","");
~~~

Alternativ mit einem Alias:

~~~js
$gantt->render_table("gantt_tasks","id","Start,Length(duration),Name,progress,parent","");
// JS: task.start_date, task.duration, task.text, task.progress, task.parent
~~~

Wird ein anderer Spaltenname verwendet, wird die zweite Spalte mit der Eigenschaft *end_date* verknüpft:

~~~js
$gantt->render_table("gantt_tasks","id","Start,End,Name,progress,parent","");
// JS: task.start_date, task.end_date, task.text, task.progress, task.parent
~~~

#### Zuordnung weiterer Spalten

Alle weiteren Spalten werden direkt anhand ihres Namens ohne Änderungen zugeordnet:

~~~js
$gantt->render_table("gantt_tasks","id","start_date,duration,text,custom,parent","");
// JS: task.start_date, task.duration, task.text, task.custom, task.parent
~~~

Auch für andere Spalten können Aliase verwendet werden:

~~~js
$gantt->render_table("gantt_tasks","id",
    "start_date,duration,text,custom_column(customProperty),parent","");
// JS: task.start_date, task.duration, task.text, task.customProperty, task.parent
~~~


## Schritt 7. Aktualisierung der Datenbankdaten

<div>
Als nächstes ist es wichtig, das Speichern von Änderungen, die im Gantt-Diagramm vorgenommen wurden, zurück in die Datenbank zu ermöglichen. Hierzu wird die Hilfsbibliothek [dataProcessor](api/method/dataprocessor.md) verwendet. Der Vorgang umfasst die Initialisierung des DataProcessor und die Verknüpfung mit der dhtmlxGantt-Instanz.

<div>![finger](/img/finger.png) <span>So gehen Sie vor:</span></div>

<ul>

- Öffnen Sie die Datei <b>myGantt.html</b> und erstellen Sie eine neue dhtmlxDataProcessor-Instanz mit dem Befehl <code>dataProcessor("data.php")</code>.
- Verbinden Sie das dhtmlxDataProcessor-Objekt mit der dhtmlxGantt-Instanz über <code>dp.init(gantt)</code>.


**myGantt.html**
~~~js
gantt.init("gantt_here");
gantt.load('data.php');
        
var dp="new" gantt.dataProcessor("data.php"); /*!*/ 
dp.init(gantt); /*!*/ 
~~~
</ul>
</div>

## Protokollierung von Fehlern

Wenn alles eingerichtet ist, aber weiterhin Probleme auftreten, kann das Aktivieren der Protokollierung in Gantt bei der Fehlersuche helfen.

Überprüfen Sie zunächst, ob das Verzeichnis, das die HTML-Datei enthält, über Schreibrechte verfügt. Fügen Sie dann diese Zeile in die Datei **data.php** ein:

**data.php**
~~~php
$gantt = new JSONGanttConnector($res);

$gantt->enable_log("log.txt"); /*!*/
~~~

Sie können anschließend die Datei **log.txt** überprüfen, um die protokollierten Informationen einzusehen.

## Wie geht es weiter?

Das war's! Ein grundlegendes Gantt-Diagramm, das Daten aus der Datenbank laden und Änderungen zurückspeichern kann, ist nun eingerichtet.
Ab jetzt können Sie es weiter anpassen und erweitern, um Ihre spezifischen Anforderungen zu erfüllen.

Für weitere Hinweise empfehlen wir folgende Artikel:

- [Configuration](guides/common-configuration.md)
- [Event Handling](guides/handling-events.md)
- [Data Loading](guides/loading.md)

