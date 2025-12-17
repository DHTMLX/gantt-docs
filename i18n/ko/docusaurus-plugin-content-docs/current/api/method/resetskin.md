---
sidebar_label: resetSkin
title: resetSkin method
description: "연결된 skin CSS 파일을 기반으로 skin 설정을 재계산합니다."
---

# resetSkin

### Description

@short: 연결된 skin CSS 파일을 기반으로 skin 설정을 재계산합니다.

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

이 메서드는 skin이 동적으로 변경될 때 사용하도록 설계되었습니다.
 
:::
