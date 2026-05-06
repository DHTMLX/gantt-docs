---
title: "간트 차트 요소의 툴팁"
sidebar_label: "간트 차트 요소의 툴팁"
---

# 간트 차트 요소의 툴팁

툴팁은 화면이 텍스트로 넘치지 않도록 사용자에게 추가 정보를 제공하는 데 사용됩니다. 기본적으로 툴팁은 간트 차트의 작업에 추가됩니다.

![작업 툴팁](/img/task_tooltip.png)

다음 API를 통해 [원하는 간트 차트 요소에 툴팁을 추가할 수 있습니다](#tooltipsfordifferentelements). 


## 활성화

작업에 대한 툴팁을 활성화하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 **tooltip** 플러그인을 활성화합니다:

~~~js
<script>
    gantt.plugins({ /*!*/
        tooltip: true /*!*/
    }); /*!*/

    gantt.init("gantt_here");
</script>
~~~


[툴팁](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)


확장 기능이 활성화되면 기본 설정으로 툴팁이 자동으로 표시됩니다.


## 사용자 정의 텍스트 

기본적으로 툴팁은 작업의 3가지 속성을 표시합니다:

1. 작업의 시작 날짜.
2. 작업의 종료 날짜.
3. 작업 이름.

툴팁에 사용할 사용자 정의 텍스트를 설정하려면 [tooltip_text](api/template/tooltip_text.md) 템플릿을 사용하십시오:

~~~js
gantt.templates.tooltip_text = (start, end, task) => 
    `<b>Task:</b> ${task.text}

<b>Duration:</b> ${task.duration}`;
~~~


## Tooltip API {#tooltipapi}

### Tooltip 객체

툴팁 객체에 접근하려면 **gantt.ext.tooltips.tooltip** 을 사용합니다. 이 객체는 일련의 메서드를 통해 툴팁의 위치, 내용 및 가시성을 제어할 수 있습니다:

- **getNode()** - 툴팁의 HTML 요소를 반환합니다  
- **setViewport()** - 지정된 HTML 요소의 경계에 툴팁의 위치를 고정합니다
    - **node** - (*HTMLElement*) 질의 대상이 되는 HTML 요소
- **show()** - 문서의 바디(document.body)를 기준으로 특정 좌표에 툴팁을 표시합니다. 위치에 따라 서로 다른 매개변수를 받을 수 있습니다:
    - 특정 좌표에 표시하려면 (document.body를 기준으로)
        - **left** - (*number*) X 좌표
        - **top** - (*number*) Y 좌표 
    - 마우스 이벤트 좌표에 표시하려면 (*tooltip_offset_x/y* 및 뷰포트가 반영됩니다) 다음을 전달합니다:
        - **event** - (*Event*) 마우스 이벤트 객체  
- **hide()** - 툴팁 요소를 숨깁니다
- **setContent()**- 툴팁에 HTML 내용을 넣습니다. 매개변수:
    - **html** - (*string*) 툴팁의 HTML 콘텐츠 문자열


### 메서드

DOM 요소 위에 마우스를 올릴 때 툴팁의 동작을 제어할 수 있는 여러 메서드가 있습니다.

#### gantt.ext.tooltips.attach() {#attach}

확장 구성으로 툴팁을 추가합니다. 이 메서드는 툴팁 설정이 포함된 객체를 매개변수로 받습니다. 메서드를 통해 조정할 수 있는 설정은 다음과 같습니다:

- **selector** - (*string*) 마우스 이벤트를 수신할 요소의 CSS 선택자를 정의합니다
- **onmouseenter** - (*function*) 마우스 포인터가 요소에 진입할 때 호출되는 핸들러. 매개변수:
     - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) HTML 노드
- **onmousemove** - (*function*) 마우스 포인터가 요소 내부를 움직일 때 호출되는 핸들러. 매개변수:
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) HTML 노드
- **onmouseleave** - (*function*) 마우스 포인터가 요소를 벗어날 때 호출되는 핸들러. 매개변수:    
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) HTML 노드
- **global** - (*boolean*) 모듈이 페이지 전체에서 마우스 이벤트를 수신하는지 여부를 정의합니다 (*true*) 또는 간트 요소 내부에서만 수신합니다 (*false*). 기본값은 *false* 입니다.

#### gantt.ext.tooltips.tooltipFor() {#tooltipfor}

지정된 Gantt 요소에 대한 툴팁을 추가합니다. 이는 **attach()** 메서드의 더 간단한 버전입니다. 이 메서드는 매개변수로 *툴팁 상세 정보가 담긴 객체*를 받습니다. 이 객체는 다음 속성을 가집니다:

- **selector** - (*string*) 툴팁을 추가할 Gantt 요소의 CSS 선택자
- **html** - (*function*) 툴팁의 템플릿. 템플릿 함수는 차례로 두 개의 매개변수를 받습니다:
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) HTML 노드
  그리고 템플릿 문자열을 반환합니다.
- **global** - (*boolean*) 선택적으로, 모듈이 페이지 전체에서 마우스 이벤트를 수신하는지 여부를 정의합니다. 기본값은 *false* 입니다. 

#### gantt.ext.tooltips.detach() {#detach} 

툴팁을 제거합니다. 매개변수로는:

- **selector** - (*string*) Gantt 요소의 CSS 선택자

#### gantt.ext.tooltips.delayShow() {#delayShow} 

툴팁을 표시하는 지연 시간은 [tooltip_timeout](api/config/tooltip_timeout.md) 설정으로 지정합니다. 설정이 없으면 짧은 기본 지연이 사용됩니다.

이 메서드는 **디바운스(debounced)** 로 동작합니다. 즉, 지연 창 내에서 반복 호출이 있을 경우 타이머가 재설정되고 툴팁은 한 번만 표시됩니다.

매개변수로 받는 것은:

- **event** - (*Event*) 툴팁 위치를 지정하는 네이티브 마우스 이벤트
- **tooltipText** - (*string*) innerHTML로 렌더링되는 툴팁 텍스트

#### gantt.ext.tooltips.delayHide() {#delayHide} 

현재 표시 중인 툴팁을 [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 설정으로 지연 후 숨깁니다. 설정이 없으면 짧은 기본 지연이 사용됩니다.

## 서로 다른 요소용 툴팁 {#tooltipsfordifferentelements}

기본적으로 툴팁은 간트 차트 작업에만 추가되지만, 다른 Gantt 요소에도 툴팁을 설정할 수 있습니다. 예를 들어 자원 마커에 대해:

![자원 마커 툴팁](/img/resource_marker_tooltip.png)


이를 위해 [tooltip API](#tooltipapi) 에는 두 가지 해당 메서드가 있습니다:

- [**gantt.ext.tooltips.tooltipFor()**](#tooltipfor) 메서드 

예를 들어 타임라인 스케일의 셀에 툴팁을 추가하는 방법은 다음과 같습니다:

~~~js
const domHelper = gantt.utils.dom;
const pos = domHelper .getRelativeEventPosition(event, gantt.$task_scale);
return gantt.templates.task_date(gantt.dateFromPos(pos.x));
~~~

참고로 [gantt.ext.tooltips.tooltipFor()](#tooltipfor) 메서드는 Gantt 초기화가 완료된 후에 호출되어야 합니다. 예를 들어 [onGanttReady](api/event/onganttready.md) 이벤트 핸들러 안에 이 메서드를 지정할 수 있습니다. 아래와 같이 구성합니다:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;

    tooltips.tooltipFor({
        selector: ".gantt_task_link",
        html: (event, node) => {
            // ...
        }
    });

    gantt.init("gantt_here");
});
~~~


[Custom Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)


또는 아래와 같이 사용할 수도 있습니다:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.ext.tooltips.tooltipFor({
    selector: ".gantt_task_cell",
    html: (event, domElement) => {
        const id = event.target.parentNode.getAttribute("task_id");
        const task = gantt.getTask(id);
        return task.text;
    }
});
~~~

**관련 샘플** [Gantt. 커스텀 툴팁 for 셀s](https://snippet.dhtmlx.com/6kb5gm39)

이 방식으로 추가된 툴팁은 마우스 포인터를 따라가며 설정인 *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)*,
[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 를 사용합니다.

- **gantt.ext.tooltips.attach()** 메서드 

이 메서드는 마우스 포인터의 움직임에 맞춰 툴팁 동작을 조정하기 위한 확장 구성의 툴팁을 추가할 수 있게 합니다.


## 툴팁 동작의 사용자 정의

툴팁의 기본 동작을 수정할 수 있는 방법이 있습니다. 기본 툴팁 핸들러를 제거하고 사용자 정의 핸들러를 추가하면 됩니다:

- Tasks 의 내장 툴팁 핸들러를 제거하려면 [gantt.ext.tooltips.detach](#detach) 메서드를 사용합니다:

~~~js
// remove the built-in tooltip handler from tasks
gantt.ext.tooltips.detach(`[${gantt.config.task_attribute}]:not(.gantt_task_row)`);
~~~

- 원하는 툴팁 동작을 [gantt.ext.tooltips.attach()](#attach) 메서드를 통해 추가합니다. 아래 예제에서는 툴팁이 표 위에만 표시되도록 합니다:

~~~js
gantt.ext.tooltips.tooltipFor({
    selector: `.gantt_grid [${gantt.config.task_attribute}]`,
    html: (event) => {
        if (gantt.config.touch && !gantt.config.touch_tooltip) {
            return;
        }

        const targetTaskId = gantt.locate(event);
        if (gantt.isTaskExists(targetTaskId)) {
            const task = gantt.getTask(targetTaskId);
            return gantt.templates.tooltip_text(task.start_date, task.end_date, task);
        }

        return null;
    },
    global: false
});
~~~


## Timeout

툴팁 표시 및 숨김 시간은 관련 설정으로 구성할 수 있습니다.

작업에 대한 툴팁이 나타나기 전의 시간 간격을 밀리초 단위로 지정하려면 [tooltip_timeout](api/config/tooltip_timeout.md) 를 사용하십시오:

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~


사용자가 커서를 다른 위치로 이동한 후 툴팁이 표시되는 시간(밀리초)을 정의하려면 [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md) 속성을 사용하십시오:

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~


## 위치

툴팁의 위치는 기본 위치의 오프셋을 바꿔 구성할 수 있습니다. 두 가지 구성 속성은 다음과 같습니다:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - 툴팁 위치의 수평 오프셋을 설정
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - 툴팁 위치의 수직 오프셋을 설정

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~


## 표시 영역

버전 6.1 이전에는 툴팁이 타임라인 영역 안에서만 표시되었습니다. 버전 6.1 이후에는 툴팁 표시가 제한되지 않으며 마우스 포인터의 움직임을 따라갑니다.

필요한 경우 Gantt 초기화 전에 아래 코드를 사용하여 이전 동작을 복원할 수 있습니다:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;
    tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~