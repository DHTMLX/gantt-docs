---
title: "Lightbox 요소 작업하기"
sidebar_label: "Lightbox 요소 작업하기"
---

# Lightbox 요소 작업하기

## 컨트롤 값 가져오기/설정하기

Lightbox 컨트롤의 값을 가져오거나 업데이트하려면 다음과 같이 [getLightboxSection](api/method/getlightboxsection.md) 메서드를 사용하세요:

~~~js
// 값을 가져오기
var value = gantt.getLightboxSection('description').getValue();

// 값을 설정하기
gantt.getLightboxSection('description').setValue('abc');
~~~

## Lightbox가 열려있는지 확인하기

현재 lightbox가 열려있는지 또는 닫혀있는지 확인하려면 [getState](api/method/getstate.md) 메서드가 반환하는 state 객체의 **lightbox** 속성을 확인하세요.

 lightbox가 열려 있다면, 이 메서드는 열려있는 태스크의 id를 반환합니다. 그렇지 않으면 'null' 또는 'undefined'를 반환합니다.

~~~js
if (gantt.getState().lightbox){
    // lightbox가 열려있을 때의 코드
} else {
    // lightbox가 닫혀있을 때의 코드
}
~~~

## 데이터 속성을 lightbox 섹션에 매핑하기

데이터 속성을 lightbox 섹션에 연결하려면, 섹션 객체의 **map_to** 속성을 사용하세요:

~~~js
// "holders" 섹션을 "holder"라는 데이터 속성에 할당
gantt.config.lightbox.sections = [
    {name:"description", height:38, type:"textarea", map_to:"text", focus:true},
    {name:"holders",     height:22, type:"textarea", map_to:"holder"},      /*!*/                                                                
    {name:"time",         height:72, type:"duration", map_to:"auto"}
];
~~~

## Lightbox 컨트롤의 기본값 설정하기

Lightbox 섹션에 기본값을 지정하려면, 섹션 객체의 **default_value** 속성을 사용하세요.

예를 들어, 작업의 우선순위를 표시하는 커스텀 "Priority" 섹션을 lightbox에 추가하면, 새 이벤트를 생성할 때 해당 필드는 비어 있습니다. 낮은 우선순위와 같은 기본값을 설정하려면 아래와 같이 lightbox를 구성하세요:

~~~js
var opts = [
    { key:1, label: "High" },                                            
    { key:2, label: "Normal" },                                         
    { key:3, label: "Low" }                                            
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, type:"textarea", map_to:"text",    focus:true},
    {name:"priority",      height:22, type:"select",      map_to:"priority",  /*!*/  
    options:opts, default_value:3},      /*!*/                                                                
    {name:"time",          height:72, type:"duration", map_to:"auto"}
];
~~~

:::note
**default_value** 속성은 lightbox 섹션의 초기값만 설정합니다. 즉, 새 이벤트는 사용자가 lightbox를 열고 이벤트를 저장한 후에만 이 값을 받습니다.
:::

새 이벤트가 생성될 때 바로 기본값을 할당하고 싶다면, [onTaskCreated](api/event/ontaskcreated.md) 이벤트를 사용하세요:

~~~js
gantt.attachEvent("onTaskCreated", function(id, task){
    task.priority = "Low";
    return true;
});
~~~

## 일부 이벤트에 대해 섹션 숨기기

특정 이벤트에 대해 섹션을 숨기려면, 다음과 같이 **set_value** 메서드를 오버라이드하세요:



~~~js
gantt.form_blocks.textarea.set_value = function(node, value, ev){
    node.firstChild.value = value || "";
    var style = ev.some_property ? "" : "none";
    node.style.display = style; // 에디터 영역
    node.previousSibling.style.display = style; // 섹션 헤더
    gantt.resizeLightbox(); // lightbox 크기 조정
}
~~~

## 섹션과 라벨을 한 줄에 표시하기

[wide_form](api/config/wide_form.md) 옵션을 활성화하면 섹션과 해당 라벨을 한 줄에 배치할 수 있습니다:

~~~js
gantt.config.wide_form = true; /*!*/

gantt.locale.labels.section_priority = "Priority";
gantt.locale.labels.section_status = "Status";


gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "status", height:22, map_to: "status", type: "select", options: [         
        {key:1, label: "New"},                                                       
          {key:2, label: "Open"},                                                     
          {key:3, label: "Done"}                                                      
    ]},                                                                            
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
~~~


**Related example:** [Aligning Lightbox](https://snippet.dhtmlx.com/hf45hvr3)


## 섹션 헤더에 버튼 추가하기

다음 단계를 따르면 섹션 헤더에 커스텀 버튼을 추가할 수 있습니다:

- 섹션 객체에 **button** 속성을 추가하세요:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~
- 버튼의 라벨을 정의하세요:

~~~js
//'help'는 'button' 속성 값과 일치해야 합니다.
gantt.locale.labels.button_help = "Help label";
~~~

- 버튼 클릭 핸들러를 구현하세요:

~~~
gantt.form_blocks.textarea.button_click = function(index, button, shead, sbody){
    // 커스텀 로직 작성
}
~~~
파라미터:

- **index** - (*number*) 섹션의 0부터 시작하는 인덱스
- **button** - (*HTMLElement*) 버튼 엘리먼트 자체
- **shead** - (*HTMLElement*) 섹션 헤더 엘리먼트
- **sbody** - (*HTMLElement*) 섹션 바디 엘리먼트

버튼의 이미지를 지정하려면 다음 CSS 클래스를 사용하세요:

~~~js
.dhx_custom_button_help{
    background-image: url(imgs/but_help.gif);
}
~~~

