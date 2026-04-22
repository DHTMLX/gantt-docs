---
title: "라이트박스 요소 다루기"
sidebar_label: "라이트박스 요소 다루기"
---

# 라이트박스 요소 다루기

## 제어 값 가져오기/설정하기

라이트박스 컨트롤의 값을 가져오거나 설정하려면 [getLightboxSection](api/method/getlightboxsection.md) 메서드를 아래와 같이 사용합니다:

~~~js
//값을 가져오려면
var value = gantt.getLightboxSection('description').getValue();

//값을 설정하려면
gantt.getLightboxSection('description').setValue('abc');
~~~

## 라이트박스가 열려 있는지 확인하기

라이트박스가 현재 열려 있는지 닫혀 있는지 확인하려면, [getState](api/method/getstate.md) 메서드가 반환하는 상태 객체의 **lightbox** 속성을 사용합니다.

 라이트박스가 열려 있다면 - 메서드는 열린 작업의 ID를 반환하고, 그렇지 않으면 'null' 또는 'undefined'가 반환됩니다.

~~~js
if (gantt.getState().lightbox){
    //열린 lighbox에 대한 코드
} else {
    //닫힌 lighbox에 대한 코드
}
~~~

## 데이터 속성을 라이트박스 섹션에 매핑하기

데이터 속성을 라이트박스 섹션에 매핑하려면 섹션 객체의 **map_to** 속성을 사용합니다:

~~~js
//"holders" 섹션을 "holder"라는 이름의 데이터 속성에 매핑
gantt.config.lightbox.sections = [
    {name:"description",height:38, type:"textarea", map_to:"text", focus:true},
    {name:"holders",     height:22, type:"textarea", map_to:"holder"},      /*!*/                                                                
    {name:"time",         height:72, type:"duration", map_to:"auto"}
];
~~~

## 라이트박스의 컨트롤 기본값 설정

라이트박스 섹션의 기본값을 설정하려면 섹션 객체의 **default_value** 속성을 사용합니다.

예를 들어, 라이트박스에 우선순위를 표시하는 사용자 정의 섹션인 "Priority"를 추가했다고 가정합니다. 사용자가 새 이벤트를 만들 때 해당 필드는 비어 있습니다. 이러한 동작을 수정하고 기본값으로 예를 들어 낮은 우선순위를 설정하려면, 아래와 같이 라이트박스를 지정합니다:

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
**default_value** 속성은 새 이벤트의 기본값이 아니라 라이트박스 섹션의 기본값을 설정합니다. 즉, 새 이벤트는 사용자가 라이트박스를 열고 이벤트를 저장한 후에야 지정된 값을 받습니다.
:::

새 이벤트에 직접 기본값을 설정하려면 [onTaskCreated](api/event/ontaskcreated.md) 이벤트를 사용합니다:

~~~js
gantt.attachEvent("onTaskCreated", function(id, task){
    task.priority = "Low";
    return true;
});
~~~

## 특정 이벤트에서 섹션 숨기기

특정 이벤트에서 섹션을 숨기려면 아래와 같이 **set_value** 메서드를 재정의합니다:

~~~js
gantt.form_blocks.textarea.set_value="function(node,value,ev){"
    node.firstChild.value="value||""";
    var style = ev.some_property?"":"none";
    node.style.display="style;" // 에디터 영역
    node.previousSibling.style.display="style;" //섹션 헤더
    gantt.resizeLightbox(); // 라이트박스의 올바른 크기 조정
}
~~~

## 섹션과 레이블을 같은 줄에 배치하기

섹션의 레이블과 같은 줄에 배치하려면 [wide_form](api/config/wide_form.md) 구성 옵션을 *true*로 설정합니다:

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

관련 샘플 [Aligning Lightbox](https://snippet.dhtmlx.com/hf45hvr3)

## 섹션 헤더의 버튼

섹션 헤더에 커스텀 버튼을 넣는 것이 가능합니다. 헤더에 버튼을 추가하려면 아래 단계를 수행합니다:

- 섹션 객체에서 **button** 속성을 지정합니다:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~
- 버튼의 레이블을 설정합니다:

~~~js
//'help'는 button 속성의 값입니다
gantt.locale.labels.button_help="Help label";
~~~

- 버튼 클릭 처리기를 지정합니다:

~~~
gantt.form_blocks.textarea.button_click = function(index,button,shead,sbody){
    // 사용자 정의 로직
}
~~~
다음과 같이 정의됩니다:

- **index** - (*number*) 섹션 인덱스. 0부터 시작하는 번호 매김
- **button** - (*HTMLElement*) 버튼의 HTML 요소
- **shead** - (*HTMLElement*) 섹션 헤더의 HTML 요소
- **sbody** - (*HTMLElement*) 섹션 본문의 HTML 요소

버튼에 사용할 이미지는 아래 CSS 클래스로 정의할 수 있습니다:

~~~js
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~