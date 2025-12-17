---
sidebar_label: removeLinkLayer
title: removeLinkLayer method
description: "링크와 관련된 지정된 레이어를 제거합니다"
---

# removeLinkLayer
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 링크와 관련된 지정된 레이어를 제거합니다

@signature: removeLinkLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* -    레이어에 표시될 DOM 요소

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

