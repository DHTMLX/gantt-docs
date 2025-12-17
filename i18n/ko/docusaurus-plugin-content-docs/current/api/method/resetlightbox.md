---
sidebar_label: resetLightbox
title: resetLightbox method
description: "현재 라이트박스의 HTML 객체 요소를 제거합니다."
---

# resetLightbox

### Description

@short: 현재 라이트박스의 HTML 객체 요소를 제거합니다.

@signature: resetLightbox: () =\> void

### Example

~~~jsx
var full_lightbox =[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",          height:72, map_to:"auto", type:"duration"}
];
var restricted_lightbox = [
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true}
];

gantt.attachEvent("onBeforeLightbox", function(task_id) {
    gantt.resetLightbox(); /*!*/
    var task = gantt.getTask(task_id);  
    if (task.restricted ==true){
        gantt.config.lightbox.sections = restricted_lightbox;
    } else {
        gantt.config.lightbox.sections = full_lightbox;
    };   
    return true;
});
~~~

### Details

이 메서드는 라이트박스 설정을 동적으로 업데이트할 때 유용합니다. 기존 라이트박스 HTML 요소를 제거하여, 현재 구성에 따라 새 라이트박스를 생성할 수 있도록 합니다.
