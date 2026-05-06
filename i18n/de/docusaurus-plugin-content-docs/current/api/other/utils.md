---
sidebar_label: utils
title: Utils-Konfiguration
description: "Verschiedene Hilfsfunktionen"
---

# utils

### Description

@short: Verschiedene Hilfsmodule

@signature: utils: \{ dom: DomHelpers \}

### Example

~~~jsx
var tooltips = gantt.ext.tooltips;
tooltips.tooltipFor({
    selector: ".gantt_scale_cell",
    html: function (event, node) {
        const domHelper = gantt.utils.dom;
        const pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);
        return gantt.templates.task_date(gantt.dateFromPos(pos.x));
}
});
~~~

### Details

Derzeit enthält das Modul nur den Helfer für DOM-Operationen, verfügbar unter **gantt.utils.dom**


~~~js
var domHelpers = gantt.utils.dom;
~~~


Welche folgenden Methoden besitzt:

- **getNodePosition (node): object** - gibt die Position des Elements auf dem Bildschirm im Format `{x:number, y:number,width:number, height:number}`-Objekt zurück
  - **_node_** - (*HTMLElement*) - DOM-Element, das überprüft wird

- **getRelativeEventPosition (e, node): object** - gibt die Mauskoordinaten relativ zum DOM-Element im Format von `{x:number, y:number}`-Objekt zurück
  - **_e_** - (*Event*) - Ereignis, das aufgetreten ist
  - **_node_** - (*HTMLElement*) - DOM-Element, das überprüft wird


~~~js
gantt.message({
    expire: -1,
    text: ""
});

const formatDate = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.attachEvent("onMouseMove", function (id, e){
    const helper = gantt.utils.dom;
    if(helper.isChildOf(e.target, gantt.$task_data)){
        const textContainer = document.querySelector("#pointer-date");
        const pos = helper.getRelativeEventPosition(e, gantt.$task_data);
        const pointerDate = gantt.dateFromPos(pos.x);
        textContainer.innerText = formatDate(pointerDate);
    }
});
~~~


- **isChildOf (child, parent): boolean** - gibt `true` zurück, wenn der als erstes Argument übergebene Knoten ein DOM-Kind des Knotens ist, der als zweites Argument übergeben wird
  - **_child_** - (*HTMLElement*) - Kindknoten, der geprüft wird
  - **_parent_** - (*HTMLElement*) - Elternknoten, der geprüft wird

- **hasClass (node, className): boolean** - gibt `true` zurück, wenn die Klassenliste des übergebenen `node` eine angegebene CSS-Klasse enthält 
  - **_node_** - (*HTMLElement*) - DOM-Element, das geprüft wird
  - **_className_** - (*string*) - Klassenname, der geprüft wird

- **closest (node, cssSelector): HTMLElement** - gibt den ersten Knoten zurück, der dem angegebenen CSS-Selektor entspricht, beginnend beim `node`-Element bis zum Zweig der DOM-Elternteile
  - **_node_** - (*HTMLElement*) - DOM-Element, das geprüft wird
  - **_cssSelector_** - (*string*) - CSS-Selektor für das Zielknoten

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  const domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, `[${gantt.config.link_attribute}]`)){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~


### Related samples
- [Benutzerdefinierte Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)