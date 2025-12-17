---
sidebar_label: removeLinkLayer
title: removeLinkLayer method
description: "entfernt die angegebene Ebene, die mit einem Link verbunden ist"
---

# removeLinkLayer
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Entfernt die angegebene Ebene, die mit einem Link verbunden ist

@signature: removeLinkLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* -        ein DOM-Element, das in der Ebene angezeigt wird

### Example

~~~jsx
let linkLayer = null;  
gantt.attachEvent("onGanttReady", function () {  
    const link_types = ["FS", "SS", "FF", "SF"]  
    linkLayer = gantt.addLinkLayer(function (link) {  
        const node = gantt.getLinkNode(link.id);  
        if (node){  
            const el = document.createElement('div');  
            el.className = 'link_layer';  
            el.style.left = (node.childNodes[2].offsetLeft + 20) + 'px'  
            el.style.top = (node.childNodes[2].offsetTop - 6) + 'px'  
            el.innerHTML = link_types[link.type];  
            return el;  
        }  
        return false;  
    });  
});  

gantt.removeLinkLayer(linkLayer);
~~~

### Details

:::note
 Dieses Feature ist ausschließlich in der PRO-Edition verfügbar. 
:::

### Related API
- [addLinkLayer](api/method/addlinklayer.md)

