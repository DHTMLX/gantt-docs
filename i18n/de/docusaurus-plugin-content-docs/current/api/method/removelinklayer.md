---
sidebar_label: removeLinkLayer
title: removeLinkLayer Methode
description: "entfernt die dem Link zugeordnete Layer"
---

# removeLinkLayer

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Entfernt die dem Link zugeordnete Layer

@signature: removeLinkLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (erforderlich) *string | number* - ein DOM-Element, das im Layer angezeigt wird

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