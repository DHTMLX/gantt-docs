---
title: "Kritischer Pfad"
sidebar_label: "Kritischer Pfad"
---

# Kritischer Pfad

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar
:::

Ein kritischer Pfad ist eine Abfolge von Aufgaben, die nicht verzögert werden kann. Andernfalls würde das gesamte Projekt verzögert werden.

Der kritische Pfad bestimmt auch die kürzeste Zeit, die das Projekt benötigen kann.

Eine Aufgabe gilt als kritisch, wenn sie keinen Puffer (Slack) hat und jede Verzögerung sich direkt auf das Fertigstellungsdatum des Projekts auswirken würde. Die detaillierte Erklärung, wie die Berechnung des kritischen Pfads funktioniert, finden Sie im Abschnitt [Critical path logic](#critical-path-logic).

Slack-Zeit ist die Zeit, um die eine Aufgabe verschoben werden kann, ohne andere Aufgaben oder den Abschluss des Projekts zu beeinflussen.

<div style="text-align:center;">![kritischer_pfad](/img/critical_path.png)</div>

:::note
Um die Erweiterung zu verwenden, aktivieren Sie sie mit der Methode [gantt.plugins](api/method/plugins.md).
:::

Um den kritischen Pfad im Gantt-Diagramm anzuzeigen, setzen Sie die Eigenschaft [highlight_critical_path](api/config/highlight_critical_path.md) auf 'true':

(Damit das Gantt-Diagramm den kritischen Pfad anzeigt)
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
    //your code will be here
</body>
</html>
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


Beachten Sie, dass dhtmlxGantt automatisch den Status der Aufgaben prüft und den kritischen Pfad aktualisiert, wenn die Eigenschaft aktiviert ist. 
Kritische Aufgaben und Verknüpfungen erhalten entsprechend die zusätzlichen CSS-Klassen *'critical_task'* und *'critical_link'*.

Jedes Mal, wenn eine Aufgabe geändert wird, wird dhtmlxGantt die Daten vollständig neu zeichnen, um den kritischen Pfad neu zu berechnen. 
Manchmal kann dies zu Leistungsproblemen führen. Für diesen Fall stellt die Komponente öffentliche Methoden bereit, mit denen Sie eine bestimmte Aufgabe oder eine Verknüpfung überprüfen und eine leistungsschonendere Strategie zur Darstellung des kritischen Pfads implementieren können.


## Logik des kritischen Pfads

Gantt betrachtet eine Aufgabe in den folgenden Fällen als kritisch:

1. Die Aufgabe hat das späteste Enddatum im gesamten Gantt-Diagramm.

![critical_tasks](/img/critical_tasks.png)

2. Die Aufgabe ist mit einer kritischen Aufgabe verbunden, und der Lag zwischen ihnen beträgt 0.

Der Lag hängt vom Wert des Parameters **gantt.config.duration_unit** ab. Wenn der **duration_unit** auf *'day'* gesetzt ist und die Dauer zwischen Aufgaben mehrere Stunden beträgt, rundet Gantt die Dauer nach den folgenden Regeln:

- Rundet die Dauer ab, wenn sie größer oder gleich 12 Stunden ist
- Rundet die Dauer auf, wenn sie weniger als 12 Stunden beträgt

Wenn das Link-Objekt den Lag-Parameter enthält, ermöglicht er das Ändern der Dauer zwischen den Aufgaben. Zum Beispiel wird eine Lag von 1 kritisch, wenn die Dauer zwischen Aufgaben 1 beträgt. 
  
Hier sind einige Beispiele mit unterschiedlichen Werten von **link.lag**:

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

![Verzögerung0](/img/lag0.png)

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

![Verzögerung1](/img/lag1.png)

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

![Lag_-1](/img/lag_1.png)

3. Der Parameter **gantt.config.project_end** ist festgelegt und die Aufgaben-Daten liegen größer als das Datum **gantt.config.project_end**.

Leider gibt es keine Möglichkeit, die integrierte Logik zu ändern, die den kritischen Pfad definiert.
Sie können jedoch das Verhalten des kritischen Pfads anpassen, siehe unten.


## Prüfen, ob eine Aufgabe kritisch ist 

Um zu prüfen, ob eine bestimmte Aufgabe kritisch ist, verwenden Sie die Methode [isCriticalTask](api/method/iscriticaltask.md):

~~~js
gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask("task3"));// ->'true' /*!*/
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## Prüfen, ob ein Link kritisch ist 

Um zu prüfen, ob ein Link kritisch ist (verbindet zwei kritische Aufgaben), verwenden Sie die Methode [isCriticalLink](api/method/iscriticallink.md):

~~~js
gantt.isCriticalLink(gantt.getLink("link1"));
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## Freier und Gesamter Puffer {#gettingfreeandtotalslack}

**Freier Puffer** - ein Zeitraum, der verwendet werden kann, um die Dauer einer Aufgabe zu erhöhen oder sie im Zeitplan zu verschieben, ohne die nächste damit verbundene Aufgabe zu beeinflussen.

Freier Puffer kann für die Typen **'task'** und **'milestone'** von Aufgaben berechnet werden.

Um den freien Puffer einer Aufgabe zu erhalten, verwenden Sie die Methode [getFreeSlack](api/method/getfreeslack.md). Sie nimmt das Aufgaben-Objekt als Parameter:

~~~js
var task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~


[Zeige Pufferzeit](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


**Gesamter Puffer** - ein Zeitraum, der genutzt werden kann, um die Dauer einer Aufgabe zu erhöhen oder sie im Zeitplan zu verschieben, ohne die Endzeit des gesamten Projekts zu beeinflussen.

Der Gesamte Puffer kann für alle Aufgabentypen berechnet werden, einschließlich Projekten.

Um den Gesamten Puffer einer Aufgabe zu erhalten, verwenden Sie die Methode [getTotalSlack](api/method/gettotalslack.md). Sie nimmt ebenfalls das Aufgaben-Objekt als Parameter:

~~~js
var task = gantt.getTask(7);
gantt.getTotalSlack(task);
~~~


[Zeige Pufferzeit](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


![Slack](/img/show_slack.png)


## Anpassung des Verhaltens des kritischen Pfads

Standardmäßig wendet der Gantt-Plot das Default-Verhalten auf den kritischen Pfad an, z. B. den Standardstil für die Hervorhebung, sowie die Neuberechnung des kritischen Pfads bei jeder Datenaktualisierung.

Um die Sichtbarkeit des kritischen Pfads zu steuern, verwenden Sie den folgenden Ansatz:

~~~js
var isEnabled = false
function updateCriticalPath(){
    isEnabled = !isEnabled;
    
    gantt.config.highlight_critical_path = isEnabled;
    
    gantt.render();
}
~~~

Es kann nützlich sein, wenn Sie eine große Anzahl von Aufgaben haben und die Neuberechnung des kritischen Pfads die Leistung beeinträchtigen könnte.

Um den kritischen Pfad manuell neu zu berechnen und die zugehörige Formatierung anzuwenden, verwenden Sie den folgenden Ansatz:

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


Es ist auch möglich, Aufgaben und Verknüpfungen manuell hervorzuheben:

- Wenn Sie in der [task_class](api/template/task_class.md) Vorlage **gantt_critical_task** zurückgeben, wird die Aufgabe als kritisch hervorgehoben.
- Wenn Sie in der [link_class](api/template/link_class.md) Vorlage **gantt_critical_link** zurückgeben, wird der Link als kritisch hervorgehoben.

**Zugehöriges Beispiel:** [Custom critical path per project](https://snippet.dhtmlx.com/jd4dyc5p)


## Festlegung von Lag- und Lead-Zeiten zwischen Aufgaben

Es ist möglich, Lag- und Lead-Zeiten zwischen Aufgaben des kritischen Pfads festzulegen. Die Details finden Sie [hier](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks).


## Planung abgeschlossener Aufgaben

Standardmäßig gibt es keinen Unterschied darin, wie der kritische Pfad-Algorithmus abgeschlossene Aufgaben (Aufgaben mit einem Fortschritt von 1) und unvollständige Aufgaben verarbeitet.

Optional können Sie die Konfiguration [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) aktivieren, um dieses Verhalten zu ändern:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

Wenn die Konfiguration aktiviert ist, werden abgeschlossene Aufgaben aus dem kritischen Pfad und der automatischen Planung ausgeschlossen.

Weitere Details finden Sie auf der [API-Seite](api/config/auto_scheduling_use_progress.md).