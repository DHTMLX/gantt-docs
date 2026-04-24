---
title: "Daten in XML und JSON serialisieren"
sidebar_label: "Daten in XML und JSON serialisieren"
---

# Daten in XML und JSON serialisieren

## JSON-Format

Um Daten aus einem Gantt-Diagramm in ein JSON-Objekt zu serialisieren, verwenden Sie die [serialize](api/method/serialize.md) Methode wie folgt:

~~~js
const json = gantt.serialize();
~~~

Als Ergebnis wird die Variable **json** aus dem obigen Code ungefähr so aussehen:

~~~js
{
    "data": [{ "id": "1", "text": "Project #1", "start_date": "01-04-2026 00:00", ...}, ...], 
    "links":[{ "id": "1", "source": "1", "target": "2", "type": "1" }, ...]
}
~~~

## XML-Format

Um Daten aus einem Gantt-Diagramm in eine XML-Zeichenfolge zu serialisieren, verwenden Sie die [serialize](api/method/serialize.md) Methode wie folgt:

~~~js
const xml = gantt.serialize("xml");
~~~

Als Ergebnis sieht die Variable **xml** aus dem obigen Code ungefähr so aus:

~~~html
<data>
    <task id='11' parent=''   start_date='01-04-2026 00:00' duration='11' 
     open='true' progress='0.6' end_date='12-04-2026 00:00'>
        <![CDATA[Project #1]]>
    </task>
    <task id='12' parent='11' start_date='03-04-2026 00:00' duration='5' 
     open='true' progress='1' end_date='08-04-2026 00:00'>
        <![CDATA[Task #1]]>
    </task>
</data>
~~~

:::note
Die Serialisierung in das alte (dhtmlxGantt \<2.0) XML-Format ist nicht verfügbar
:::