---
title: "Export nach iCal"
sidebar_label: "iCal"
---

# Export nach iCal

Die dhtmlxGantt-Bibliothek ermöglicht das Exportieren von Daten aus dem Gantt-Diagramm in das iCal-Format. Der Export erfolgt über einen Exportdienst: den Online-Exportdienst oder das [Exportmodul](guides/export-modules.md) für PDF, PNG und Excel.

Um Daten aus dem Gantt-Diagramm in eine iCal-Zeichenfolge zu exportieren, führen Sie Folgendes aus:

- Um den Online-Exportdienst zu verwenden, aktivieren Sie das <b>export_api</b>-Plugin über die [plugins](api/method/plugins.md) Methode:

~~~js
gantt.plugins({
    export_api: true
});
~~~

- Rufen Sie die [exportToICal](api/method/exporttoical.md) Methode auf, um Daten aus dem Gantt-Diagramm zu exportieren: 

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**Related sample**: [Export data: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**Related sample**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


## Parameter der Export-Methode

Die [exportToICal()](api/method/exporttoical.md) Methode nimmt als Parameter ein Objekt mit den folgenden Eigenschaften (optional):

- **server** - (*string*) setzt den API-Endpunkt für die Anfrage. Kann mit der lokalen Installation des Exportdienstes verwendet werden. Der Standardwert ist `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) ermöglicht die Angabe eines benutzerdefinierten Namens und einer Erweiterung für die Datei, aber die Datei wird weiterhin im iCal-Format exportiert.
  
~~~jsx title="Aufruf der Export-Methode mit optionalen Eigenschaften"
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~
