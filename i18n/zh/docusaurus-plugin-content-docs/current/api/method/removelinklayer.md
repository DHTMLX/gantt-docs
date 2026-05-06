---
sidebar_label: removeLinkLayer
title: removeLinkLayer method
description: "移除与链接相关的指定图层"
---

# removeLinkLayer

:::info
此功能仅在 PRO 版本中可用。
:::

### Description

@short: 删除与链接相关的指定层

@signature: removeLinkLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (必填) *string | number* -      将在该层中显示的 DOM 元素

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