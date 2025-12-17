---
sidebar_label: $click
title: $click config
description: "ändert die Standard-Klickaktionen für Buttons im Gantt-Diagramm"
---

# $click

### Description

@short: Ändert die Standard-Klickaktionen für Buttons im Gantt-Diagramm

@signature: $click: any

### Example

~~~jsx
gantt.config.quickinfo_icons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.advanced_details_button=function(e, id, trg){
    gantt.message("These are advanced details"); 
    return false; //verhindert das Standardverhalten
};
~~~

### Details

:::note
 Das Verhalten des Buttons wird sowohl für die Lightbox als auch für das Quickinfo-Popup aktualisiert. 
:::

Das $click-Objekt im Standard-Gantt-Diagramm sieht folgendermaßen aus:

~~~js
{
    buttons: {
        delete: function (id){...},
        edit: function (id){...},
    }
}
~~~
