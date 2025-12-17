---
sidebar_label: removeLinkLayer
title: removeLinkLayer method
description: "removes the specified layer related to a link"
---

# removeLinkLayer

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Removes the specified layer related to a link

@signature: removeLinkLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* -      a DOM element that will be displayed in the layer

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

