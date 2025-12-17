---
sidebar_label: removeLinkLayer
title: removeLinkLayer method
description: "удаляет указанный слой, связанный с линком"
---

# removeLinkLayer
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Удаляет указанный слой, связанный с линком

@signature: removeLinkLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* -        элемент DOM, который будет отображаться в слое

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


### Related API
- [addLinkLayer](api/method/addlinklayer.md)

