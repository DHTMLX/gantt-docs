---
title: "dhtmlxGantt mit dhtmlxConnector"
sidebar_label: "dhtmlxGantt mit dhtmlxConnector"
---

# dhtmlxGantt mit dhtmlxConnector 

Dieses Tutorial zeigt dir, wie man ein grundlegendes Gantt-Diagramm auf einer Seite erstellt, das Aufgaben in der Datenbank (also auf dem Server) speichern und aktualisieren kann.

Derzeitige Tutorial richtet sich darauf, Gantt mit [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) zu erstellen.
Wenn du stattdessen eine serverseitige Technologie verwenden möchtest, schau dir unten die Liste der Tutorials an, die verfügbare Integrationsvarianten beschreiben:

- [dhtmlxGantt mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt mit Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt mit PHP:Slim3](integrations/php/howtostart-php.md)
- [dhtmlxGantt mit PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt mit Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt mit Ruby on Rails](integrations/other/howtostart-ruby.md)

![gantt_basic](/img/gantt_basic.png)


**Verwandtes Beispiel**: [Grundlegende Initialisierung](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


### Schritt 1. Herunterladen des dhtmlxGantt-Pakets

Lass uns das Tutorial damit beginnen, die Bibliotheksdateien auf deinen Computer zu holen.

**Folgendes tun:**

<ul>
  <li>Lade das dhtmlxGantt-Paket <a href='https://github.com/DHTMLX/connector-php' title='dhtmlxConnector for PHP repository' target='_blank'>hier</a> herunter, falls du das noch nicht getan hast.</li>
  <li>Extrahiere das Paket in das Stammverzeichnis deines lokalen Webservers. Die extrahierten Dateien werden in einem Ordner mit dem gleichen Namen wie die Paketdatei – dhtmlxGantt – gespeichert.</li>
</ul>


## Schritt 2. Einbinden der dhtmlxGantt-Code-Dateien

Dann müssen die dhtmlxGantt-Code-Dateien in deine HTML-Datei eingebunden werden (um die Funktionalität der Bibliothek nutzen zu können). 
Die dhtmlxGantt-Code-Dateien sind:

- `dhtmlxgantt.js`
- `dhtmlxgantt.css`

**Folgendes tun:**

1. Erstelle eine HTML-Datei im Ordner `dhtmlxGantt` (dem Ordner mit den dhtmlxGantt-Dateien). Benenne sie zum Beispiel `myGantt.html`.
2. Binde die dhtmlxGantt-Code-Dateien in **myGantt.html** ein (beide Dateien befinden sich im Ordner `codebase`). Siehe myGantt.html:

~~~html
<!DOCTYPE html>
<html>
<head>
  <title>How to Start with dhtmlxGantt</title>
  <script src="codebase/dhtmlxgantt.js"></script> <!-- important -->
  <link href="codebase/dhtmlxgantt.css" rel="stylesheet"> <!-- important -->
</head>
<body>
  <!-- dein Code wird hier stehen -->
</body>
</html>
~~~

## Schritt 3. Initialisierung von dhtmlxGantt

<div>

Dann müssen wir einen DIV-Container erstellen und dhtmlxGantt dort initialisieren.

Beachte, dass dhtmlxGantt ein statisches Objekt ist und nur einmal pro Seite instanziiert werden kann. 
Um sich auf die Instanz von dhtmlxGantt zu beziehen, kannst du **dhtmlxGantt** oder einfach **gantt** verwenden.

<div>
  <span>Folgendes tun:</span>
</div>

- Definiere einen DIV-Container in der Datei **myGantt.html**.
- Initialisiere dhtmlxGantt mit dem Befehl <code>gantt.init("gantt_here")</code>.  
  Als Parameter wird ein HTML-Container übergeben, in dem ein Gantt-Diagramm platziert wird.

~~~html title="myGantt.html"
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
Hinweis: Wenn du den Vollbildmodus verwendest, gib den aktuellen Stil an, um das korrekte Verhalten zu gewährleisten:

~~~js
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

Dann müssen wir das Gantt-Diagramm mit Daten aus einer Beispiel-Datenquelle füllen. Wir verwenden den einfachsten Weg und geben die Datenquelle als Inline-Objekt an. 
Um Daten zu laden, verwenden wir die [parse](api/method/parse.md) Methode, die den Namen der Datenquelle als Parameter nimmt. 
Die Eigenschaften des Objekts sind:
<ul>
  <li><b>data</b> - legt die Gantt-Aufgaben fest</li>
  <ul>
  <li><b>id</b> - (<i>string, number</i>) die Ereignis-ID.</li>
  <li><b>start_date</b> - (<i>Date</i>) das Datum, an dem ein Ereignis beginnen soll. </li>
  <li><b>text</b> - (<i>string</i>) die Aufgabenbeschreibung.</li>
  <li><b>progress</b> - (<i>number</i>) eine Zahl von 0 bis 1, die angibt, wie viel Prozent der Aufgabe abgeschlossen ist. </li>
  <li><b>duration</b> - (<i>number</i>) die Aufgaben-Dauer in den Einheiten der aktuellen Zeitachse. </li>
  <li><b>parent</b> - (<i>number</i>) die ID der übergeordneten Aufgabe. </li>
  </ul>
  <li><b>links</b> - gibt die Abhängigkeitslinks des gantt an</li>
  <ul>
  <li><b>id</b>-(<i>string, number</i>) die Ereignis-ID.</li>
  <li><b>source</b>-(<i>number</i>) die ID der Quaufgabe. </li>
  <li><b>target</b>-(<i>number</i>) die ID der Zielaufgabe. </li>
  <li><b>type</b>-(<i>string</i>) der Typ der Abhängigkeit: 0 - 'finish to start', 1 - 'start to start', 2 - 'finish to finish'. </li>
  </ul>
</ul> 

<div> <span>Folgendes tun:</span></div>


Deklariere die Variable 'tasks' in der Datei <b>myGantt.html</b>:

~~~js title="myGantt.html"
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

Rufe den Befehl <code>gantt.parse(tasks)</code> nach der Zeile <code>gantt.init("gantt_here")</code> auf:

~~~js title="myGantt.html"
gantt.init("gantt_here"); 
gantt.parse (tasks);/*!*/  
~~~

**Verwandtes Beispiel**: [Grundlegende Initialisierung](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Schritt 5. Erstellen einer Datenbank

:::note
Lies dies und die weiteren Schritte, wenn du Daten aus einer Datenbank statt aus einem Inline-Objekt laden möchtest.
:::

Dann müssen wir eine Datenbank mit 2 Tabellen erstellen, um Aufgaben und Abhängigkeiten zu speichern. 
<i><b>sortorder</b> ist eine Eigenschaft, die nur beim Laden von Daten aus einer Datenbank verwendet wird. Die Eigenschaft legt den Index einer Aufgabe unter Geschwistern fest.</i>
<span>Folgendes tun:</span>
Erstelle eine neue Datenbank mit dem Namen - <i>gantt</i>.
Führe den folgenden Code aus, um 2 Tabellen darin zu erstellen: <i>gantt_tasks</i> und <i>gantt_links</i>.

~~~sql
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


Um Aufgaben in der Datenbank zu speichern, wenn eine Spalte einen leeren Wert hat, füge den folgenden Code in die **myGantt.html** Datei ein:

~~~js title="myGantt.html"
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    task.sortorder = 0;
    return true;
});
~~~

## Schritt 6. Laden von Daten aus der Datenbank

:::note
In den nächsten 2 Schritten verwenden wir die PHP-Plattform, um die Server-Client-Integration zu implementieren.

 Falls du eine andere Plattform verwendest, lies bitte den Artikel [](guides/loading.md), um zu erfahren, wie du dein Serverskript selbst implementierst.
:::


Dann müssen wir die Möglichkeit bereitstellen, Daten aus der Datenbank im Diagramm anzuzeigen. Wir tun das mit der [load](api/method/load.md) Methode, die die URL zur Datenquelle als Parameter nimmt. 
Im Falle einer Datenbank ist es eine PHP-Datei, die die Verbindung zur Serverseite realisiert. 
Wir werden die PHP-Plattform und die <a href="https://docs.dhtmlx.com/connector__php__index.html">dhtmlxConnector</a> Bibliothek verwenden, 
da dies der einfachste Weg ist, die serverseitige Logik für dhtmlxGantt zu implementieren.
<span>Folgendes tun:</span>
Erstelle eine PHP-Datei im Ordner 'dhtmlxGantt' und benenne sie z. B. <b>data.php</b>.
Öffne die <b>data.php</b> Datei und füge den folgenden serverseitigen Code hinzu:

~~~php title="data.php"
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

Wechsle zur <b>myGantt.html</b> Datei und setze die Eigenschaft <code>gantt.config.date_format</code> auf <i> "%Y-%m-%d %H:%i"</i>, um das Ausgabeformat kompatibel mit dem Format von dhtmlxGantt zu machen.

~~~js title="myGantt.html"
gantt.config.date_format = "%Y-%m-%d %H:%i";/*!*/ 
gantt.init("gantt_here");
~~~

Rufe den <code>gantt.load('data.php')</code> Befehl auf, um Daten aus der Datenbank in das Gantt-Diagramm zu laden.

~~~js title="myGantt.html"
gantt.config.date_format = "%Y-%m-%d %H:%i";
gantt.init("gantt_here");
gantt.load('data.php');//loads data to Gantt from the database  /*!*/  
~~~

### Zuordnung der Spalten der Datenbank

Bitte beachte, dass die Reihenfolge der Spalten in **$connector->render_table** wichtig ist. Die ersten drei Spalten in der Spaltenliste werden entsprechend auf *start_date/duration/text* oder *start_date/end_date/text* Eigenschaften des client-side Task-Objekts gemappt, unabhängig davon, welche Spaltennamen du angibst. Die Zuordnung der Spalten wird unten beschrieben. 
 
Die zweite Spalte wird auf *task.duration* abgebildet, falls du `'duration'` in der Konfiguration angibst:

~~~js
$gantt->render_table("gantt_tasks","id","Start,duration,Name,progress,parent","");
~~~

oder mit Alias:

~~~js
$gantt->render_table("gantt_tasks","id","Start,Length(duration),Name,progress,parent","");
// JS: task.start_date, task.duration, task.text, task.progress, task.parent
~~~

Wenn irgendein anderer Spaltenname gesetzt wird, wird die zweite Spalte auf die Eigenschaft *end_date* abgebildet:

~~~js
$gantt->render_table("gantt_tasks","id","Start,End,Name,progress,parent","");
// JS: task.start_date, task.end_date, task.text, task.progress, task.parent
~~~

#### Mapping anderer Spalten

Alle anderen Spalten werden unverändert nach ihrem Namen gemappt:

~~~js
$gantt->render_table("gantt_tasks","id","start_date,duration,text,custom,parent","");
// JS: task.start_date, task.duration, task.text, task.custom, task.parent
~~~

Aliase können auch für andere Spalten verwendet werden:

~~~js
$gantt->render_table("gantt_tasks","id",
    "start_date,duration,text,custom_column(customProperty),parent","");
// JS: task.start_date, task.duration, task.text, task.customProperty, task.parent
~~~


## Schritt 7. Aktualisieren von Daten in der Datenbank

Dann müssen wir die Möglichkeit bereitstellen, die im Gantt-Diagramm geänderten Daten in der Datenbank zu speichern. Zu diesem Zweck verwenden wir die 
[](api/method/dataprocessor.md) Hilfsbibliothek DataProcessor. Alles, was zu tun ist, besteht darin, DataProcessor zu initialisieren und
das dhtmlxGantt-Objekt daran zu attachen.

<span>Folgendes tun:</span>

Öffne die <b>myGantt.html</b> Datei und initialisiere dhtmlxDataProcessor mit dem <code>dataProcessor("data.php")</code>-Befehl.
Verknüpfe das dhtmlxDataProcessor-Objekt mit dem dhtmlxGantt-Objekt mittels <code>dp.init(gantt)</code> Befehl.


~~~js title="myGantt.html"
gantt.init("gantt_here");
gantt.load('data.php');
        
var dp="new" gantt.dataProcessor("data.php"); /*!*/ 
dp.init(gantt); /*!*/ 
~~~

## Fehlerprotokollierung

Falls du die obigen Schritte durchgeführt hast, aber trotzdem etwas nicht funktioniert, aktiviere die Protokollierung in Gantt, um einen Fehler zu erkennen.

Zuerst stelle sicher, dass Schreibberechtigungen in dem Verzeichnis vorhanden sind, in dem sich die HTML-Datei befindet. Füge dann die folgende Zeile in die **data.php** Datei ein:


~~~php title="data.php"
$gantt = new JSONGanttConnector($res);

$gantt->enable_log("log.txt"); /*!*/
~~~

Danach kannst du Protokolle in der Datei **log.txt** einsehen.

## Was kommt als Nächstes?

Das ist alles. Ein grundlegendes, aber funktionsfähiges Gantt-Diagramm, das Daten aus der Datenbank laden und wieder speichern kann, ist bereit.
Nun kannst du es konfigurieren und an deine Bedürfnisse anpassen.

Wir empfehlen, als nächsten Schritt diese Artikel zu lesen:

- [Configuration](guides/common-configuration.md) -> [Konfiguration](guides/common-configuration.md)
- [Event handling](guides/handling-events.md) -> [Ereignisbehandlung](guides/handling-events.md)
- [Data loading](guides/loading.md) -> [Datenladen](guides/loading.md)