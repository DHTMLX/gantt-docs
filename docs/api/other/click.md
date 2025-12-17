---
sidebar_label: $click
title: $click config
description: "redefines the default click behavior for buttons of the Gantt chart"
---

# $click

### Description

@short: Redefines the default click behavior for buttons of the Gantt chart

@signature: $click: any

### Example

~~~jsx
gantt.config.quickinfo_icons=["icon_delete","icon_edit","advanced_details_button"]; 
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.advanced_details_button=function(e, id, trg){
    gantt.message("These are advanced details"); 
    return false; //blocks the default behavior
};
~~~

### Details

:::note
The behavior of the button will be redefined for both the lightbox and quick info popup. 
:::

The $click object of the default Gantt chart is:

~~~js
{
    buttons: {
        delete: function (id){...},
        edit: function (id){...},
    }
}
~~~
