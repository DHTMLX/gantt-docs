---
sidebar_label: groupBy
title: groupBy Methode
description: "Gruppiert Aufgaben nach dem Attribut des angegebenen Tasks"
---

# groupBy

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Gruppiert Aufgaben nach dem Attribut des angegebenen Tasks

@signature: groupBy: (config: GroupConfig | boolean) => void

### Parameter

- `config` - (erforderlich) *GroupConfig | boolean* - das Gruppierungskonfigurationsobjekt, oder false, um Aufgaben zu gruppieren/entschpliessen? (Bitte beachten: "ungroupping" ist hier gemeint) 
Wait: This line previously: "or false to ungroup tasks" I must ensure the correct translation: The correct phrase is "... oder false, um Aufgaben zu entgruppieren." Let's fix:

Correct translation below:

- `config` - (erforderlich) *GroupConfig | boolean* - das Gruppierungskonfigurationsobjekt, oder false, um Aufgaben zu entgruppieren

### Beispiel

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
Diese Methode ist in der **grouping**-Erweiterung definiert, daher müssen Sie das [grouping](guides/extensions-list.md#grouping) Plugin aktivieren. Lesen Sie die Details im Artikel [Grouping Tasks](guides/grouping.md). 
:::

Das Gruppierungskonfigurationsobjekt hat die folgenden Eigenschaften:

- **relation_property** - (*string*) - eine Eigenschaft eines Aufgabenobjekts, die verwendet wird, um Elemente zu gruppieren.
- **groups** - (*СollectionItem[]*) - ein Array der Gruppen-(Summen-)Elemente. Jedes Element sollte die Eigenschaften enthalten, die in den Parametern **group_id** und **group_text** festgelegt sind (standardmäßig *key* und *label*).
- **group_id?** - (*string*) - optional, die Gruppen-ID. Der Standardwert ist 'key'.
- **group_text?** - (*string*) - optional, der Gruppen-Label. Der Standardwert ist 'label'.
- **delimiter?** - (*string*) - optional, der Delimiter wird für die automatische Erstellung von Gruppen für Aufgaben mit mehreren Ressourcen verwendet. Der Standardwert ist ",".
- **default_group_label?** - (*string*) - optional, der Name der Standardgruppe. Optional. Der Standardwert ist 'None'.
- **save_tree_structure?** - (*boolean*) - optional, definiert, ob das Gantt seine Baumstruktur innerhalb der Gruppen speichern soll. Falls nicht angegeben oder auf *false* gesetzt, werden Gantt-Aufgaben in einer flachen Listenansicht angezeigt.

Bitte beachten:

- Jedes 'group'-Objekt muss mindestens 2 Eigenschaften enthalten (aber beliebig viele zusätzliche): die ID und die Textbeschreibung, wie durch die Parameter **group_id** und **group_text** festgelegt. Standardmäßig haben diese Parameter die Werte *key* und *label* bzw. entsprechend. Sie können andere Werte für diese Parameter verwenden (außer für "id"), vorausgesetzt, sie sind im Gruppen-Array angegeben.

:::note
Die Verwendung des Werts "id" ist nicht erlaubt, da Gantt beim Gruppieren von Aufgaben virtuelle Gruppierungsaufgaben erstellt und die Parameter 'group_id' und 'group_text' in diese Aufgaben übernimmt. Das bedeutet, dass standardmäßig die gruppierten Aufgaben die Eigenschaften 'key' und 'value' besitzen. Gleichzeitig verfügt jede Aufgabe bereits über die Eigenschaft 'id', und das Ändern der Standard-IDs der Aufgaben führt zu einer Zerstörung der Baumstruktur.
:::

- Die ursprünglichen Dataset-Aufgaben des Projekts werden im Gruppierungsmodus nicht angezeigt, stehen jedoch über die API zur Verfügung.
- Gruppierungselemente werden in den Datensatz als Elemente mit dem Typ 'project' und aktivierter Eigenschaft 'readonly' eingefügt. Sie können anhand der '$virtual'-Eigenschaft erkannt und als reguläre Datenelemente behandelt werden:

~~~js
gantt.templates.task_class=function(start, end, task){
  if(task.$virtual)
    return "summary-bar";
};
~~~

- Der Standardgruppe werden Aufgaben zugeordnet, die in die anderen Gruppen nicht aufgenommen werden. Die Standardgruppe schließt Aufgaben nicht ein, wenn sie den **relation_property** als String- oder Zahlenwert angegeben haben.

:::note
[Speichern der Baumstruktur beim Gruppieren von Aufgaben](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html) 
:::

### Related Guides
- [Gruppierung von Aufgaben](guides/grouping.md)

### Change log
- Die Option **save_tree_structure** wurde in Version 8.0 eingeführt
