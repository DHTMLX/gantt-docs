---
title: "툴팁(Tooltips) 확장 기능"
sidebar_label: "툴팁(Tooltips) 확장 기능"
---

툴팁(Tooltips) 확장 기능
======================

Tooltips 확장 기능에 대한 자세한 내용은 [Gantt 요소의 툴팁](guides/tooltips.md) 문서를 참고하세요.

## Tooltip 객체

툴팁 객체는 **gantt.ext.tooltips.tooltip**을 통해 접근할 수 있습니다. 이 객체는 툴팁의 위치, 내용, 표시 여부를 제어하는 메서드를 제공합니다:

- <span class="submethod">**getNode (): HTMLElement**</span> - 툴팁의 HTML 요소를 반환합니다  
- <span class="submethod">**setViewport (node): object**</span> - 지정한 HTML 요소의 경계 내에서 툴팁의 위치를 제한합니다  
    - **_node_** - (*HTMLElement*) - 툴팁의 위치를 제한할 HTML 요소  
- <span class="submethod">**show (config, top): object**</span> - 지정한 좌표(document.body 기준)에서 툴팁을 표시합니다. 이 메서드는 원하는 위치에 따라 다양한 파라미터를 받을 수 있습니다. 특정 좌표에 툴팁을 표시하려면 x, y 값을 전달하고, 마우스 이벤트 위치에 표시하려면 Event 객체를 전달합니다. *tooltip_offset_x/y* 및 viewport 설정은 자동으로 적용됩니다.  
    - **_config?_** - (*number | Event*) - x 좌표값 또는 마우스 이벤트 객체  
    - **_top?_** - (*number*) - y 좌표값  
- <span class="submethod">**hide (): object**</span> - 툴팁을 숨깁니다  
- <span class="submethod">**setContent (html): object**</span> - 툴팁 안의 HTML 내용을 설정합니다  
    - **_html_** - (*string*) - 툴팁에 표시할 HTML 문자열  

## 메서드

DOM 요소에 마우스를 올렸을 때 툴팁 동작을 제어하는 여러 메서드를 제공합니다.

### gantt.ext.tooltips.attach()

- <span class="submethod">**attach (config): void**</span> - 상세 설정으로 툴팁을 연결합니다. 하나의 파라미터를 받습니다:  
    - **_config_** - (*object*) - 툴팁 설정 객체, 포함 항목:  
        - **_selector_** - (*string*) - 마우스 이벤트를 추적할 요소의 CSS 선택자  
        - **_onmouseenter_** - (*Function*): void - 마우스가 요소에 진입할 때 호출, 파라미터:  
            - **_event_** - (*MouseEvent*) - 네이티브 마우스 이벤트  
            - **_node_** - (*HTMLElement*) - 타겟 HTML 노드  
        - **_onmousemove?_** - (*Function*): void - (선택 사항) 요소 내에서 마우스가 움직일 때 호출, 파라미터:  
            - **_event_** - (*MouseEvent*) - 네이티브 마우스 이벤트  
            - **_node_** - (*HTMLElement*) - 타겟 HTML 노드  
        - **_onmouseleave_** - (*Function*): void - 마우스가 요소에서 나갈 때 호출, 파라미터:  
            - **_event_** - (*MouseEvent*) - 네이티브 마우스 이벤트  
            - **_node_** - (*HTMLElement*) - 타겟 HTML 노드  
        - **_global?_** - (*boolean*) - (선택 사항) true이면 전체 페이지에서 마우스 이벤트를 감지하고, false이면 gantt 요소 내부에서만 감지합니다. 기본값은 *false*입니다.  
        
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

- <span class="submethod">**tooltipFor (config): void**</span> - 특정 Gantt 요소에 툴팁을 추가합니다. **attach()**의 간단한 대안입니다. 하나의 파라미터를 받습니다:  
    - **_config_** - (*object*) - 설정 객체, 포함 항목:  
        - **_selector_** - (*string*) - 툴팁을 연결할 Gantt 요소의 CSS 선택자  
        - **_html_** - (*Function*): HTMLElement | string | number | void - 툴팁 내용을 반환하는 함수. 다음을 파라미터로 받습니다:  
            - **_event_** - (*Event*) - 네이티브 마우스 이벤트  
            - **_node_** - (*HTMLElement*) - HTML 노드, 함수는 툴팁 내용 문자열을 반환  
        - **_global?_** - (*boolean*) - (선택 사항) true이면 전체 페이지에서 감지, false이면 gantt 요소 내부에서만 감지. 기본값은 *false*입니다.  
        
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

- <span class="submethod">**detach (selector): void**</span> - 지정한 요소에 대한 툴팁을 제거합니다. 하나의 파라미터를 받습니다:  
    - **_selector_** - (*string*) - Gantt 요소의 CSS 선택자
