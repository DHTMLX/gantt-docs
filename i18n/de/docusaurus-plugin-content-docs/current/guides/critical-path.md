---
title: "Kritischer Pfad"
sidebar_label: "Kritischer Pfad"
---

# Kritischer Pfad


:::info
Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

Der kritische Pfad stellt eine Abfolge von Aufgaben dar, die nicht verschoben werden können, ohne das gesamte Projekt zu verzögern.


Er definiert außerdem die minimale Dauer, die zur Fertigstellung des Projekts erforderlich ist.


Eine Aufgabe gilt als kritisch, wenn sie keinen Puffer (Slack Time) hat, d.h. jede Verzögerung dieser Aufgabe wirkt sich direkt auf das Projekt-Enddatum aus. Weitere Details zur Berechnung des kritischen Pfads finden Sie im Abschnitt [Logik des kritischen Pfads](#criticalpathlogic).


Pufferzeit bezeichnet die Zeitspanne, um die eine Aufgabe verzögert werden kann, ohne nachfolgende Aufgaben oder den gesamten Projekttermin zu beeinflussen.

<div style="text-align:center;">![critical_path](/img/critical_path.png)</div>

:::note
Um diese Erweiterung zu nutzen, aktivieren Sie sie über die Methode [gantt.plugins](api/method/plugins.md).
:::

Um den kritischen Pfad im Gantt-Diagramm anzuzeigen, setzen Sie die Eigenschaft [highlight_critical_path](api/config/highlight_critical_path.md) auf 'true':

**Aktivierung der Anzeige des kritischen Pfads im Gantt-Diagramm**
~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        critical_path: true /*!*/
    }); /*!*/
    gantt.config.highlight_critical_path = true;
    //Ihr Code kommt hier hin
</body>
</html>
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


Wenn diese Eigenschaft aktiviert ist, überwacht dhtmlxGantt automatisch den Aufgabenstatus und aktualisiert entsprechend den kritischen Pfad. 
Kritische Aufgaben und Verbindungen erhalten zusätzliche CSS-Klassen mit den Namen *'critical_task'* bzw. *'critical_link'*. 

Jedes Mal, wenn eine Aufgabe aktualisiert wird, zeichnet dhtmlxGantt die Daten vollständig neu, um den kritischen Pfad neu zu berechnen. 
Dieser Vorgang kann gelegentlich die Leistung beeinträchtigen. Um dem entgegenzuwirken, stellt die Komponente öffentliche Methoden zur Verfügung, mit denen gezielt bestimmte Aufgaben oder Verbindungen überprüft werden können, um den kritischen Pfad ressourcenschonender anzuzeigen.

## Logik des kritischen Pfads


Gantt markiert eine Aufgabe unter folgenden Bedingungen als kritisch:

1. Die Aufgabe hat das späteste Enddatum im gesamten Diagramm.

![](/img/critical_tasks.png)

2. Die Aufgabe ist mit einer kritischen Aufgabe ohne Verzögerung (Lag) verbunden.

Die Verzögerung (Lag) hängt von der Einstellung **gantt.config.duration_unit** ab. Wenn **duration_unit** auf *'day'* gesetzt ist und die Aufgabendauer mehrere Stunden umfasst, rundet Gantt die Dauer wie folgt:

- ab, wenn die Dauer 12 Stunden oder mehr beträgt
- auf, wenn sie weniger als 12 Stunden beträgt

Wenn ein Verbindungsobjekt einen Lag-Parameter enthält, modifiziert dieser die Dauer zwischen Aufgaben. Beispielsweise bedeutet ein *Lag* von 1, dass die Aufgabe dann kritisch wird, wenn die Dauer zwischen Aufgaben 1 beträgt.

Hier Beispiele mit unterschiedlichen **link.lag**-Werten:

- link.lag ist 0

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 0, "type": "0" },
        
    ]
}
~~~

![](/img/lag0.png)

- link.lag ist 1

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 1, "type": "0" }, 
        
    ]
}
~~~

![](/img/lag1.png)

- link.lag ist -1

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": -1, "type": "0" },
        
    ]
}
~~~

![](/img/lag_1.png)

3. Der Parameter **gantt.config.project_end** ist gesetzt und die Aufgabendaten gehen über dieses Datum hinaus.

Die eingebaute Logik des kritischen Pfads kann derzeit nicht angepasst werden.
Sie können jedoch das [Verhalten des kritischen Pfads anpassen](#customizingthecriticalpathbehaviour).

## Überprüfen, ob eine Aufgabe kritisch ist 

Um zu bestimmen, ob eine Aufgabe kritisch ist, verwenden Sie die Methode [isCriticalTask](api/method/iscriticaltask.md):

~~~js
gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask("task3"));// ->'true' /*!*/
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## Überprüfen, ob eine Verbindung kritisch ist 


Um zu prüfen, ob eine Verbindung zwei kritische Aufgaben verbindet, verwenden Sie die Methode [isCriticalLink](api/method/iscriticallink.md):

~~~js
gantt.isCriticalLink(gantt.getLink("link1"));
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## Freien und gesamten Puffer ermitteln


**Freier Puffer** ist die Zeitspanne, um die eine Aufgabe oder ein Meilenstein verlängert oder verschoben werden kann, ohne die nächste verbundene Aufgabe zu verzögern.

Freier Puffer gilt für die Typen 'task' und 'milestone'.

Um den freien Puffer einer Aufgabe zu ermitteln, verwenden Sie die Methode [getFreeSlack](api/method/getfreeslack.md) und übergeben das Aufgabenobjekt:

~~~js
var task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~


[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


**Gesamter Puffer** bezeichnet die Zeit, um die eine Aufgabe verzögert werden kann, ohne das gesamte Projektende zu beeinflussen.

Der gesamte Puffer kann für alle Aufgabentypen, einschließlich Projekte, berechnet werden.

Um den gesamten Puffer einer Aufgabe zu erhalten, verwenden Sie die Methode [getTotalSlack](api/method/gettotalslack.md) mit dem Aufgabenobjekt:

~~~js
var task = gantt.getTask(7);
gantt.getTotalSlack(task);
~~~


[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


![Slack](/img/show_slack.png)

## Anpassen des Verhaltens des kritischen Pfads

Standardmäßig verwendet gantt das Standardverhalten für den kritischen Pfad, einschließlich der Standard-Hervorhebungsstile und der Neuberechnung des Pfads bei jeder Datenänderung.

Um die Sichtbarkeit des kritischen Pfads zu steuern, können Sie diese Methode verwenden:

~~~js
var isEnabled = false
function updateCriticalPath(){
    isEnabled = !isEnabled;
    
    gantt.config.highlight_critical_path = isEnabled;
    
    gantt.render();
}
~~~

Dieser Ansatz ist hilfreich, wenn viele Aufgaben verwaltet werden, da das häufige Neuberechnen des kritischen Pfads die Leistung beeinträchtigen kann.

Um den kritischen Pfad und die Hervorhebung manuell zu aktualisieren, verwenden Sie folgenden Ansatz:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(gantt.isCriticalTask(task))
        return "critical_task";
      return "";
};

gantt.templates.link_class = function(link){
    if(gantt.isCriticalLink(link))
        return "critical_link";
      return "";
};

var data = {
    tasks: [
        { id: 1, text: "Office itinerancy", open:true, type:"project" },
        { id: 2, text: "Office facing", start_date: "21-07-2020", 
            duration: "20", parent: "1" },
        { id: 3, text: "Furniture installation", start_date: "21-07-2020", 
            duration: "5", parent: "1" },
        { id: 4, text: "The employee relocation", start_date: "28-07-2020", 
            duration: "15", parent: "1" },
        { id: 5, text: "Interior office", start_date: "28-07-2020", 
            duration: "15", parent: "1" }
    ],
    links: [
        { id: "1", source: "2", target: "3", type: "0" },
        { id: "2", source: "3", target: "4", type: "0" },
        { id: "3", source: "4", target: "5", type: "0" }
    ]
};
gantt.init("gantt_here");

gantt.parse(data);
~~~


Sie können Aufgaben und Verbindungen auch manuell hervorheben:

- Die Rückgabe von "gantt_critical_task" im [task_class](api/template/task_class.md)-Template hebt die Aufgabe als kritisch hervor.
- Die Rückgabe von "gantt_critical_link" im [link_class](api/template/link_class.md)-Template hebt die Verbindung als kritisch hervor.

**Beispiel:** [Custom critical path per project](https://snippet.dhtmlx.com/jd4dyc5p)

## Festlegen von Lag- und Leadzeiten zwischen Aufgaben


Lag- und Leadzeiten zwischen Aufgaben des kritischen Pfads können konfiguriert werden. Details finden Sie [hier](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks).

## Planung abgeschlossener Aufgaben


Standardmäßig behandelt der Algorithmus des kritischen Pfads abgeschlossene Aufgaben (mit Fortschrittswert 1) genauso wie unvollständige Aufgaben.

Optional können Sie die Konfiguration [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) aktivieren, um dieses Verhalten zu ändern:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

Mit dieser Einstellung werden abgeschlossene Aufgaben vom kritischen Pfad und der automatischen Planung ausgeschlossen.

Weitere Informationen finden Sie auf der [API-Seite](api/config/auto_scheduling_use_progress.md).

