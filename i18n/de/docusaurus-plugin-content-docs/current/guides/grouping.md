---  
title: "Aufgaben gruppieren"  
sidebar_label: "Aufgaben gruppieren"  
---  

# Aufgaben gruppieren

:::info  
Diese Funktion ist nur in der PRO-Edition verfügbar  
:::  

Die Bibliothek bietet die **Gruppierungs**-Erweiterung, mit der Sie Aufgaben nach beliebigen Attributen einer Aufgabe gruppieren können.

<div style="text-align:center;">![grouping_tasks](/img/grouping_tasks.png)</div>

:::note  
Um die Erweiterung zu verwenden, aktivieren Sie sie mit der Methode [gantt.plugins](api/method/plugins.md).  
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
    //your code will be here
</body>
</html>
~~~  

[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

## Aufgaben gruppieren {#groupingtasks}

Um Aufgaben nach einem Kriterium zu gruppieren, verwenden Sie die Methode [groupBy](api/method/groupby.md): 

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

wo:

- **relation_property** - (*verpflichtend*) eine Eigenschaft eines Task-Objekts, die verwendet wird, um Elemente zu gruppieren. Zum Beispiel:

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
    relation_property: "priority", /*!<*/
    ...
});
~~~  

Die Eigenschaft kann auch verwendet werden, Gruppen in einer mehrstufigen Struktur zu organisieren:

~~~js
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        //multi level groups
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});
~~~  

- **groups** - (*verpflichtend*) ein Array der Gruppen- (Zusammenfassungs-)Elemente. 

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

Bitte beachten:

1. Jedes 'group'-Objekt muss mindestens 2 Eigenschaften enthalten (aber beliebig viele zusätzliche): die ID und die Textbeschreibung, angegeben durch die Parameter 'group_id', 'group_text' entsprechend. Standardmäßig haben diese Parameter die Werte *key* und *label* respectively. Sie können beliebige andere Werte für diese Parameter verwenden (**ausgenommen "id"**), vorausgesetzt, sie sind im Gruppen-Array angegeben.  
:::note  
Der Wert "id" ist nicht erlaubt, da Gantt beim Gruppieren von Aufgaben virtuelle Gruppenkarten erstellt und die Parameter 'group_id' und 'group_text' in diese Aufgaben einfügt.  
Das bedeutet, dass standardmäßig die gruppierten Aufgaben die Eigenschaften 'key' und 'value' haben. Gleichzeitig besitzt jede Aufgabe bereits die Eigenschaft 'id', und das Ändern der Standard-IDs der Aufgaben führt zur Zerstörung der Baumstruktur.  
:::  

2. Gruppenelemente werden in den Datensatz als Elemente vom Typ 'project' mit aktivierter 'readonly'-Eigenschaft eingefügt. Sie können am '$virtual'-Eigenschaft erkannt und wie reguläre Datenelemente behandelt werden:

~~~js
gantt.templates.task_class="function(start," end, task){
    if(task.$virtual)
    return "summary-bar";
};
~~~  

3. Die 'project'-Aufgaben aus dem Originaldatensatz werden im Gruppierungsmodus nicht angezeigt, sie stehen jedoch über die API zur Verfügung.


- **group_id** - (*optional*) die Gruppen-ID. Der Standardwert ist 'key'.  
- **group_text** - (*optional*) die Gruppenbezeichnung. Der Standardwert ist 'label'.  
- **delimiter** - (*optional*) der Trennzeichner wird für die automatische Erstellung von Gruppen für Aufgaben mit mehreren Ressourcen verwendet. Standardmäßig ','.
- **default_group_label** - (<i>string</i>) der Name der Standardgruppe. Optional. Der Standardwert ist 'None'.  
- **save_tree_structure** - (<i>boolean</i>) definiert, ob Gantt seine Baumstruktur innerhalb der Gruppen speichern soll. Wenn nicht angegeben oder auf *false* gesetzt, werden die Aufgaben in einer flachen Listenansicht angezeigt.

Beachten Sie, dass die Standardgruppe Aufgaben enthält, die nicht in den anderen Gruppen enthalten sind. Die Standardgruppe schließt Aufgaben nicht ein, wenn sie eine Eigenschaft **relation_property** angegeben als einen <i>string|number</i>-Wert hat.

  

## Aufgaben entgruppieren

Um die Gruppierung zurückzusetzen, rufen Sie die Methode [groupBy](api/method/groupby.md) auf und übergeben Sie *false* als Parameter:

**Zurücksetzen der aktuellen Gruppierung**  
~~~js
gantt.groupBy(false);
~~~

## Verwendung von Sammlungen zur Angabe von Gruppen

In der Regel werden Gruppen von mehreren Elementen auf der Seite verwendet, und um Wiederholungen zu vermeiden, können Sie Gruppen als benannte Sammlung darstellen.

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

Im Gruppierungsmodus wird die ursprüngliche Struktur des Gantt-Baums standardmäßig nicht angezeigt, und alle Aufgaben erscheinen als Erstebene-Kinder ihrer jeweiligen Gruppen.

Um die ursprüngliche Unteraufgaben-Struktur innerhalb der Gruppen beizubehalten, verwenden Sie die Einstellung **save_tree_structure**:

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

[Baumstruktur speichern beim Gruppieren von Aufgaben](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)