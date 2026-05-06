---
sidebar_label: resetSkin
title: resetSkin 메서드
description: "연관된 첨부 스킨 CSS 파일의 설정을 다시 계산합니다"
---

# resetSkin

### Description

@short: 관련 첨부 스킨 CSS 파일의 설정을 재계산합니다

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
- [스킨을 동적으로 변경하기](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)

### Details

:::note
스킨을 동적으로 변경할 때에만 사용됩니다
:::