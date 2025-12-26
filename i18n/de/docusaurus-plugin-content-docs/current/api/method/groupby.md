---
sidebar_label: groupBy
title: groupBy method
description: "organisiert Aufgaben basierend auf einem bestimmten Aufgabenattribut"
---

# groupBy
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Organisiert Aufgaben basierend auf einem bestimmten Aufgabenattribut

@signature: groupBy: (config: GroupConfig | boolean) =\> void

### Parameters

- `config` - (required) *GroupConfig | boolean* -        Das Konfigurationsobjekt für die Gruppierung oder false, um die Gruppierung zu entfernen

### Example

~~~jsx
// Gruppierung auf einer Ebene
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
    ],
    group_id: "key",
    group_text: "label",
    save_tree_structure: true
});

// mehrstufige Gruppierung
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        // verschachtelte Gruppen
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});

// Verwendung vordefinierter Collections
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

// Gruppierung entfernen
gantt.groupBy(false);
~~~

### Related samples
- [Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

### Details

:::note
 Diese Methode ist Teil der **grouping**-Erweiterung, daher muss das [grouping](guides/extensions-list.md#grouping) Plugin aktiviert sein. Weitere Details finden Sie im Artikel ["Gruppierung von Aufgaben"](guides/grouping.md). 
:::


Das Gruppierungskonfigurationsobjekt enthält folgende Eigenschaften:

- **relation_property** - (*string*) - das Aufgabenattribut, das zur Gruppierung verwendet wird.
- **groups** - (*СollectionItem[]*) - ein Array von Gruppen-(Summary-)Elementen. Jedes Element sollte die durch **group_id** und **group_text** definierten Eigenschaften enthalten (Standard sind *key* und *label*).
- **group_id?** - (*string*) - optional, der Bezeichner für Gruppen. Standard ist 'key'.
- **group_text?** - (*string*) - optional, das Label für Gruppen. Standard ist 'label'.
- **delimiter?** - (*string*) - optional, wird verwendet, um automatisch Gruppen für Aufgaben mit mehreren Ressourcen zu erstellen. Standard ist ",".
- **default_group_label?** - (*string*) - optional, das Label für die Standardgruppe. Standard ist 'None'.
- **save_tree_structure?** - (*boolean*) - optional, bestimmt, ob der Gantt die ursprüngliche Baumstruktur innerhalb der Gruppen beibehält. Wenn ausgelassen oder auf *false* gesetzt, werden Aufgaben als flache Liste angezeigt.


Bitte beachten Sie:

- Jedes Gruppenobjekt muss mindestens zwei Eigenschaften haben: eine ID und ein Text-Label, definiert durch 'group_id' und 'group_text'. Standardmäßig sind dies *key* und *label*. Sie können andere Namen verwenden, außer "id", solange diese im Gruppenarray vorhanden sind.  
:::note
 Die Eigenschaft "id" ist nicht erlaubt, da Gantt virtuelle Gruppentasks erstellt und die Eigenschaften 'group_id' und 'group_text' in diese einfügt. Das bedeutet, dass gruppierte Aufgaben standardmäßig die Eigenschaften 'key' und 'value' haben. Da jede Aufgabe bereits eine 'id'-Eigenschaft besitzt, könnte eine Änderung dieser Standard-IDs die Baumstruktur beschädigen. 
:::
- Ursprüngliche 'project'-Aufgaben werden im Gruppierungsmodus nicht angezeigt, bleiben aber über die API zugänglich.
- Gruppen-Elemente werden als Aufgaben vom Typ 'project' mit dem gesetzten 'readonly'-Flag hinzugefügt. Sie können durch die Eigenschaft '$virtual' identifiziert und wie reguläre Aufgaben behandelt werden:

~~~js
gantt.templates.task_class=function(start, end, task){
  if(task.$virtual)
    return "summary-bar";
};
~~~

- Die Standardgruppe enthält Aufgaben, die keiner anderen Gruppe zugeordnet sind. Sie schließt Aufgaben aus, die eine **relation_property** mit einem <i>string|number</i>-Wert besitzen.<br> 

:::note
sample [Save tree structure when grouping tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html) 
:::

### Related Guides
- ["Gruppierung von Aufgaben"](guides/grouping.md)

### Change log
- Die Option **save_tree_structure** wurde in Version 8.0 eingeführt
