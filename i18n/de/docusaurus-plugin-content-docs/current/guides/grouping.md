---
title: "Gruppierung von Aufgaben"
sidebar_label: "Gruppierung von Aufgaben"
---

# Gruppierung von Aufgaben

:::info
Diese Funktion ist ausschließlich in der PRO-Edition verfügbar
:::

Die Bibliothek enthält eine **Gruppierungs**-Erweiterung, mit der Sie Aufgaben nach jedem beliebigen Attribut der Aufgabe organisieren können.

<div style="text-align:center;">![grouping_tasks](/img/grouping_tasks.png)</div>

:::note
Um diese Erweiterung zu nutzen, aktivieren Sie sie mit der Methode [gantt.plugins](api/method/plugins.md).
:::

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({
        grouping: true
    });
    //Ihr Code kommt hier hin
</body>
</html>
~~~

[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## Gruppierung von Aufgaben  {#groupingtasks}

Um Aufgaben nach einem bestimmten Kriterium zu gruppieren, verwenden Sie die Methode [groupBy](api/method/groupby.md):

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] 
};

gantt.groupBy({
    relation_property: "priority",
    groups: [{key:1, label: "High"},{key:2, label: "Normal"},{key:3, label: "Low"}],
    group_id: "key",
    group_text: "label"
});
~~~

Details:

- **relation_property** - (*erforderlich*) die Eigenschaft des Aufgabenobjekts, nach der gruppiert werden soll. Zum Beispiel:

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
    relation_property: "priority", /*!*/
    ...
});
~~~

Diese Eigenschaft kann auch verwendet werden, um mehrstufige Gruppenstrukturen zu erstellen:

~~~js
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        //mehrstufige Gruppen
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});
~~~  

- **groups** - (*erforderlich*) ein Array von Gruppen- (Zusammenfassungs-) Objekten.

~~~js
gantt.groupBy({
    groups: [
        {key:1, label: "High"}, 
        {key:2, label: "Normal"},
        {key:3, label: "Low"}
    ],
    group_id: "key",
    group_text: "label"
});
~~~   

Wichtige Hinweise:

1. Jedes Gruppenobjekt muss mindestens zwei Eigenschaften enthalten (plus beliebige weitere): eine ID und eine Textbeschreibung, die durch die Parameter 'group_id' und 'group_text' definiert werden. Standardmäßig sind dies *key* und *label*. Sie können andere Werte für diese Parameter wählen (**außer "id"**), solange sie in den Gruppenobjekten existieren. 
:::note
Die Eigenschaft "id" ist nicht erlaubt, da Gantt während der Gruppierung virtuelle Gruppenaufgaben erstellt und ihnen die Eigenschaften 'group_id' und 'group_text' zuweist. Das bedeutet, dass gruppierte Aufgaben standardmäßig die Eigenschaften 'key' und 'label' haben. Da jede Aufgabe bereits eine 'id' besitzt, würde eine Änderung dies die Baumstruktur beeinträchtigen.
:::

2. Gruppenobjekte werden dem Datensatz als Elemente vom Typ 'project' mit aktiviertem 'readonly'-Flag hinzugefügt. Sie sind anhand der Eigenschaft '$virtual' erkennbar und können wie reguläre Datenobjekte behandelt werden:

~~~js
gantt.templates.task_class="function(start," end, task){
    if(task.$virtual)
    return "summary-bar";
};
~~~

3. Ursprüngliche 'project'-Aufgaben im Datensatz werden im Gruppierungsmodus nicht angezeigt, bleiben aber über die API zugänglich.

- **group_id** - (*optional*) die Eigenschaft, die für die ID der Gruppe verwendet wird. Standardmäßig 'key'.  
- **group_text** - (*optional*) die Eigenschaft, die für die Beschriftung der Gruppe verwendet wird. Standardmäßig 'label'.  
- **delimiter** - (*optional*) wird für die automatische Erstellung von Gruppen für Aufgaben mit mehreren Ressourcen verwendet. Standardmäßig ",".  
- **default_group_label** - (<i>string</i>) Beschriftung für die Standardgruppe. Optional, Standardwert ist 'None'.  
- **save_tree_structure** - (<i>boolean</i>) steuert, ob Gantt die ursprüngliche Baumstruktur innerhalb der Gruppen beibehält. Wenn nicht angegeben oder auf *false* gesetzt, werden Aufgaben als flache Liste angezeigt.

Beachten Sie, dass die Standardgruppe Aufgaben enthält, die zu keiner anderen Gruppe gehören. Aufgaben mit einer **relation_property**, die als <i>string|number</i>-Wert angegeben ist, werden nicht in die Standardgruppe aufgenommen.

 

## Aufgaben-Gruppierung aufheben

Um die Gruppierung aufzuheben, rufen Sie die Methode [groupBy](api/method/groupby.md) mit *false* als Argument auf:

**Aktuelle Gruppierung zurücksetzen**
~~~js
gantt.groupBy(false);
~~~

## Verwendung von Collections zur Gruppendefinition

Gruppen werden häufig von mehreren Komponenten auf einer Seite gemeinsam genutzt. Um Duplizierungen zu vermeiden, können Gruppen als benannte Collections definiert werden.

~~~js
gantt.serverList("priority", [
    {key:1, label: "High"},
    {key:2, label: "Normal"},
    {key:3, label: "Low"}
]);
gantt.groupBy({
    groups: gantt.serverList("priority"),
    relation_property: "priority",
    group_id: "key",
    group_text: "label"
});
~~~


## Beibehaltung der ursprünglichen Aufgabenhierarchie in Gruppen

Standardmäßig wird beim Aktivieren der Gruppierung die ursprüngliche Hierarchie des Gantt-Baums nicht angezeigt; alle Aufgaben erscheinen als direkte Kinder ihrer Gruppen.

Um die ursprüngliche Unteraufgabenstruktur innerhalb der Gruppen beizubehalten, setzen Sie **save_tree_structure** auf true:

~~~js
gantt.groupBy({
    groups: [
        { key: 1, label: "Ilona" },
        { key: 2, label: "John" },
        { key: 3, label: "Mike" }
    ],
    relation_property: "owner",
    group_id: "key",
    group_text: "label",
    default_group_label: "Not Assigned",
    save_tree_structure: true /* ! */
});
~~~


[Save tree structure when grouping tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)

