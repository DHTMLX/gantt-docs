---
title: "템플릿 컨트롤"
sidebar_label: "템플릿 컨트롤"
---

템플릿 컨트롤
=====================================

이 컨트롤은 일부 HTML 콘텐츠를 내부에 포함하는 컨테이너입니다.

![template_control](/img/template_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_template = "Details";

gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~

[Template control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)



초기화
-----------------

**template** 컨트롤을 라이트박스에 포함하려면 다음 단계를 따라야 합니다:

1) 라이트박스 설정에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) 섹션에 대한 라벨을 정의합니다:

~~~js
gantt.locale.labels.section_template = "Details";
~~~

3) [onBeforeLightbox](api/event/onbeforelightbox.md) 이벤트와 같은 이벤트를 사용하여 컨트롤의 콘텐츠를 채웁니다:

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~


속성
--------------

**template** 컨트롤에서 자주 사용되는 주요 속성은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)를 참고하세요):

- **name** - (*string*) 섹션의 이름을 지정합니다
- **height** - (*number*) 섹션의 높이를 설정합니다
- **map_to** - (*string*) 섹션이 매핑되는 데이터 속성입니다
- **type** - (*string*) [섹션 컨트롤](guides/default-edit-form.md#lightboxcontrols)의 타입을 정의합니다
- **focus** - (*boolean*) *true*로 설정 시, 라이트박스가 열릴 때 해당 섹션에 포커스가 이동합니다

