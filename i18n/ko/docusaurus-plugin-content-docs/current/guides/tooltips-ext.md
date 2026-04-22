---
title: "툴팁 확장"
sidebar_label: "툴팁 확장"
---

# 툴팁 확장

도구 팁 확장에 대한 자세한 내용은 [Tooltips for Gantt Elements](guides/tooltips.md) 기사에서 확인하십시오.

## Tooltip 객체

툴팁 객체에 접근하려면 **gantt.ext.tooltips.tooltip**으로 접근합니다. 이 객체는 툴팁의 위치, 내용 및 가시성을 여러 메서드로 조작할 수 있습니다:

- <span class="submethod">**getNode (): HTMLElement**</span> - 툴팁의 HTML 요소를 반환합니다  
- <span class="submethod">**setViewport (node): object**</span> - 툴팁의 위치를 지정된 HTML 요소의 경계에 고정합니다
    - **_node_** - (*HTMLElement*) - 질의 대상이 되는 HTML 요소
- <span class="submethod">**show (config, top): object**</span> - 문서의 document.body를 기준으로 특정 좌표에 툴팁을 표시합니다. 위치에 따라 서로 다른 매개변수를 받을 수 있습니다. 문서를 기준으로 특정 좌표에서 툴팁을 표시하려면 x,y 좌표를 전달합니다. 마우스 이벤트 좌표에서 표시하려면 Event 객체를 전달합니다. *tooltip_offset_x/y* 및 viewport는 고려됩니다.
    - **_config?_** - (*number | Event*) - X 좌표 또는 마우스 이벤트 객체
    - **_top?_** - (*number*) - Y 좌표 
- <span class="submethod">**hide (): object**</span> - 툴팁 요소를 숨깁니다
- <span class="submethod">**setContent (html): object**</span> - 툴팁에 HTML 콘텐츠를 넣습니다. 매개변수:
    - **_html_** - (*string*) - 툴팁용 HTML 콘텐츠 문자열

## 메서드

DOM 요소 위에 마우스를 올리는 동안 툴팁의 동작을 제어할 수 있는 여러 메서드가 있습니다.

### gantt.ext.tooltips.attach()

- <span class="submethod">**attach (config): void**</span> - 확장 구성으로 툴팁을 추가합니다. 이 메서드는 하나의 매개변수를 받습니다:
    - **_config_** - (*object*) - 툴팁 설정 객체. 설정은 다음과 같습니다:
        - **_selector_** - (*string*) - 마우스 이벤트를 수신할 요소의 CSS 선택자
        - **_onmouseenter_** - (*Function*): void - 마우스 포인터가 요소에 들어갈 때 호출되는 핸들러. 매개변수는:
            - **_event_** - (*MouseEvent*) - 네이티브 마우스 이벤트
            - **_node_** -  (*HTMLElement*) - HTML 노드
        - **_onmousemove?_** - (*Function*): void - 선택적, 요소 내부에서 마우스 포인터가 이동할 때 호출되는 핸들러. 매개변수는:
            - **_event_** - (*MouseEvent*) - 네이티브 마우스 이벤트
            - **_node_** -  (*HTMLElement*) - HTML 노드
        - **_onmouseleave_** - (*Function*): void - 마우스 포인터가 요소를 벗어날 때 호출되는 핸들러. 매개변수는:    
            - **_event_** - (*MouseEvent*) - 네이티브 마우스 이벤트
            - **_node_** -  (*HTMLElement*) - HTML 노드
        - **_global?_** - (*boolean*) - 선택적이며, 모듈이 페이지 전체의 마우스 이벤트를 수신하도록(true) 설정할지 여부 또는 gantt 요소 내부에서만 수신하도록(false) 설정할지 정의합니다. 기본값은 *false*입니다.
  
~~~js
gantt.ext.tooltips.attach({
    selector: ".gantt_task_cell",
    onmouseenter: function (e, node) {
        const id = node.parentNode.attributes['task_id'].nodeValue;
        const task = gantt.getTask(id);

        if (typeof task.text == "string") {
            gantt.ext.tooltips.tooltip.setContent(task.text);
            gantt.ext.tooltips.tooltip.show(e.clientX + 20, e.clientY + 20)
        }
    },
    onmousemove: function (e, node) {
        gantt.ext.tooltips.tooltip.show(e.clientX + 20, e.clientY + 20)
    },
    onmouseleave: function (e, node) {
        gantt.ext.tooltips.tooltip.hide()
    },
})
~~~

### gantt.ext.tooltips.tooltipFor()

- <span class="submethod">**tooltipFor (config): void**</span> - 지정된 Gantt 요소에 툴팁을 추가합니다. 이는 **attach()** 메서드의 더 단순한 버전입니다. 이 메서드는 하나의 매개변수를 받습니다:
    - **_config_** - (*object*) - 툴팁 설정이 담긴 객체. 설정은 다음과 같습니다:
        - **_selector_** - (*string*) - 툴팁을 추가할 Gantt 요소의 CSS 선택자
        - **_html_** - (*Function*): HTMLElement | string | number | void - 툴팁의 템플릿. 템플릿 함수는 차례로 두 매개변수를 받습니다:
            - **_event_** - (*Event*) - 네이티브 마우스 이벤트
            - **_node_** -  (*HTMLElement*) - HTML 노드 및 템플릿 문자열을 반환합니다.
        - **_global?_** - (*boolean*) - 선택적이며, 모듈이 전체 페이지에서 마우스 이벤트를 수신할지 여부를 정의합니다. 기본값은 *false*입니다. 
  
~~~js
gantt.ext.tooltips.tooltipFor({
    selector: ".gantt_task_cell",
    html: function (e, domElement) {
        const id = domElement.parentNode.attributes['task_id'].nodeValue;
        const task = gantt.getTask(id);
        return task.text;
    }
});
~~~  

### gantt.ext.tooltips.detach()

- <span class="submethod">**detach (selector): void**</span> - 툴팁을 제거합니다. 매개변수로는:
    - **_selector_** - (*string*) - Gantt 요소의 CSS 선택자