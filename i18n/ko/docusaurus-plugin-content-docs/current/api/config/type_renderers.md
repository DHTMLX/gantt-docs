---
sidebar_label: type_renderers
title: type_renderers config
description: "다양한 유형의 작업을 표시하는 함수를 재정의합니다"
---

# type_renderers
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 다양한 유형의 작업을 표시하는 함수를 재정의합니다

@signature: type_renderers: CustomTypeRenderers["type_renderers"]

### Example

~~~jsx
gantt.config.type_renderers[gantt.config.types.project] = function(task,defaultRender){
    var main_el = document.createElement("div");
      var size = gantt.getTaskPosition(task);
      main_el.innerHTML = [
        "<div class='project-left'></div>",
        "<div class='project-right'></div>"
      ].join('');
      main_el.className = "custom-project";

      main_el.style.left = size.left + "px";
      main_el.style.top = size.top + 7 + "px";
      main_el.style.width = size.width + "px";

      return main_el;
};
~~~

**Default value:** \{\}

### Related samples
- [Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)

### Details


이 기능을 사용하면 작업 유형별로 표시 방식을 사용자 정의 렌더링 함수로 정의할 수 있습니다.

렌더링 함수는 두 개의 인수를 받습니다:

- **typeRenderer (task, defaultRender): HTMLElement | boolean | void | undefined** - 작업 객체를 받아 기본 작업 바를 대체할 DOM 요소를 반환하는 함수입니다.
    - **_task_** - (*Task*) - 작업 객체
    - **_defaultRender?_** - (*TaskLayerRender*) - 선택 사항, dhtmlxGantt에서 제공하는 기본 렌더링 함수

사용 가능한 type_renderers는 다음과 같습니다:

- **type_renderers** - (*object*) - 다양한 작업 유형에 대한 사용자 정의 렌더 함수
    - **_task?_** - (*typeRenderer*) - 선택 사항, 일반 작업에 대한 사용자 정의 렌더 함수
    - **_project?_** - (*typeRenderer*) - 선택 사항, 프로젝트 작업에 대한 사용자 정의 렌더 함수
    - **_milestone?_** - (*typeRenderer*) - 선택 사항, 마일스톤에 대한 사용자 정의 렌더 함수
    - **_[typeName: string]_** - (*typeRenderer | undefined*) - 선택 사항, 사용자 정의 작업 유형에 대한 렌더 함수


이 옵션을 사용하면 특정 작업 유형에 맞춘 맞춤형 디자인을 만들 수 있습니다. 예를 들어, 프로젝트나 요약 작업에 대해 보다 전통적인 외관을 설계할 수 있습니다.


![custom_look](/img/custom_look.png)


:::note
sample
[Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)
 
:::

### Related API
- [getTaskPosition](api/method/gettaskposition.md)

