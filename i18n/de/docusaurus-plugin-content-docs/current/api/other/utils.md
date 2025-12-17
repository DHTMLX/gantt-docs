---
sidebar_label: utils
title: utils config
description: "verschiedene Hilfsmodule"
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

Derzeit bietet dieses Modul hauptsächlich Helfer für DOM-Operationen über **gantt.utils.dom** an.


~~~js
var domHelpers = gantt.utils.dom;
~~~

Es stellt folgende Methoden bereit:

- **getNodePosition (node): object** - ermittelt die Position eines Elements auf dem Bildschirm und gibt ein Objekt wie `{x:number, y:number,width:number, height:number}` zurück
  - **_node_** - (*HTMLElement*) - das zu prüfende DOM-Element

- **getRelativeEventPosition (e, node): object** - ermittelt die Mauskoordinaten relativ zu einem angegebenen DOM-Element, zurückgegeben als `{x:number, y:number}`
  - **_e_** - (*Event*) - das ausgelöste Event
  - **_node_** - (*HTMLElement*) - das Referenz-DOM-Element


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

- **isChildOf (child, parent): boolean** - prüft, ob der erste Knoten ein DOM-Kind des zweiten Knotens ist, gibt `true` zurück, wenn ja
  - **_child_** - (*HTMLElement*) - das zu überprüfende Kind-Element
  - **_parent_** - (*HTMLElement*) - das zu überprüfende Eltern-Element

- **hasClass (node, className): boolean** - bestimmt, ob das angegebene `node` eine bestimmte CSS-Klasse enthält, gibt `true` zurück, wenn dies der Fall ist
  - **_node_** - (*HTMLElement*) - das zu überprüfende DOM-Element
  - **_className_** - (*string*) - der zu suchende CSS-Klassenname

- **closest (node, cssSelector): HTMLElement** - findet den nächsten Vorfahrenknoten (einschließlich des Knotens selbst), der dem angegebenen CSS-Selektor entspricht
  - **_node_** - (*HTMLElement*) - das Start-DOM-Element
  - **_cssSelector_** - (*string*) - der CSS-Selektor zum Abgleich

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
- [Custom Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)
