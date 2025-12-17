---
sidebar_label: resetSkin
title: resetSkin method
description: "Berechnet die Einstellungen des Skins basierend auf der verknüpften Skin-CSS-Datei neu"
---

# resetSkin

### Description

@short: Berechnet die Einstellungen des Skins basierend auf der verknüpften Skin-CSS-Datei neu

@signature: resetSkin: () =\> void

### Example

~~~jsx
function changeSkin(name){
    var file = name != "terrace" ? ('_' + name) : "";
    var link = document.createElement("link");
    link.onload = function(){
        gantt.resetSkin();   /*!*/
    };

    link.rel="stylesheet";
    link.type="text/css";
    link.id = "skin";
    link.href = "../../codebase/dhtmlxgantt"+file+".css";
    document.head.replaceChild(link, document.querySelector("#skin"));
}

changeSkin('meadow');
~~~

### Related samples
- [Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)

### Details

:::note

Diese Methode ist dafür vorgesehen, wenn der Skin dynamisch geändert wird
 
:::
