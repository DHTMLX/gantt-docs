---
title: "Serialisierung von Daten in XML und JSON"
sidebar_label: "Serialisierung von Daten in XML und JSON"
---

# Serialisierung von Daten in XML und JSON

## JSON-Format

Um Daten aus einem Gantt-Diagramm in ein JSON-Objekt zu konvertieren, kann die Methode [serialize](api/method/serialize.md) wie folgt verwendet werden:

~~~js
var json = gantt.serialize();
~~~

Die **json**-Variable im obigen Beispiel enthält Daten ähnlich dem folgenden:

~~~js
{
 "data": [{"id":"1", "text":"Project #1", "start_date":"01-04-2013 00:00", ...}, ...], 
 "links":[{"id":"1", "source":"1", "target":"2", "type": "1"}, ...]
}
~~~

## XML-Format

Um Daten aus einem Gantt-Diagramm in einen XML-String zu konvertieren, wird die Methode [serialize](api/method/serialize.md) wie folgt verwendet:

~~~js
var xml = gantt.serialize("xml");
~~~

Die **xml**-Variable aus dem obigen Beispiel enthält Daten ähnlich wie diese:

~~~html
"<data>
    <task id='11' parent=''   start_date='01-04-2013 00:00' duration='11' 
     open='true' progress='0.6' end_date='12-04-2013 00:00'>
        <![CDATA[Project #1]]>
    </task>
    <task id='12' parent='11' start_date='03-04-2013 00:00' duration='5' 
     open='true' progress='1' end_date='08-04-2013 00:00'>
        <![CDATA[Task #1]]>
    </task>
</data>"
~~~

:::note
Die Serialisierung in das alte (dhtmlxGantt \<2.0) XML-Format ist nicht verfügbar
:::

