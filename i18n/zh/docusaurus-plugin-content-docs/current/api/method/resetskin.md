---
sidebar_label: resetSkin
title: resetSkin 方法
description: "根据相关附带的皮肤 CSS 文件重新计算皮肤设置"
---

# resetSkin

### Description

@short: 根据相关附带的 skin CSS 文件重新计算皮肤设置

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
- [动态更改皮肤](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)

### Details

:::note
仅在动态更改皮肤时使用
:::