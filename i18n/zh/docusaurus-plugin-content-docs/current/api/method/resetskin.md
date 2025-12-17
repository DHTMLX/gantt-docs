---
sidebar_label: resetSkin
title: resetSkin method
description: "根据关联的 skin CSS 文件重新计算皮肤的设置"
---

# resetSkin

### Description

@short: 根据关联的 skin CSS 文件重新计算皮肤的设置

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
此方法适用于动态更换 skin 时使用
:::
