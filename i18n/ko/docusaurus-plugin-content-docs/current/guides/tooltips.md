---
title: "Gantt 요소의 툴팁"
sidebar_label: "Gantt 요소의 툴팁"
---

# Gantt 요소의 툴팁


툴팁은 화면에 너무 많은 텍스트를 표시하지 않고도 추가 정보를 보여주는 방법을 제공합니다. 기본적으로 툴팁은 Gantt 작업(task)에 표시됩니다.

![task_tooltip](/img/task_tooltip.png)

적절한 API를 사용하여 [Gantt의 모든 요소에 툴팁을 추가](#tooltipsfordifferentelements)할 수 있습니다.



## 활성화


작업에 대한 툴팁을 활성화하려면, [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 **tooltip** 플러그인을 켜기만 하면 됩니다:

~~~js
<script>
    gantt.plugins({ /*!*/
        tooltip: true /*!*/
    }); /*!*/

    gantt.init("gantt_here");
</script>
~~~


[Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)


확장 기능이 활성화되면, 기본 설정으로 툴팁이 자동으로 표시됩니다.



## 사용자 정의 텍스트 


기본적으로 툴팁에는 작업의 세 가지 속성이 표시됩니다:

1. 작업의 시작 날짜
2. 작업의 종료 날짜
3. 작업의 이름

툴팁에 표시되는 텍스트를 사용자 정의하려면, [tooltip_text](api/template/tooltip_text.md) 템플릿을 다음과 같이 사용하세요:

~~~js
gantt.templates.tooltip_text = (start, end, task) => 
    `<b>Task:</b> ${task.text}

<b>Duration:</b> ${task.duration}`;
~~~



## 툴팁 API {#tooltipapi}


### Tooltip 객체

툴팁 객체는 **gantt.ext.tooltips.tooltip**으로 접근할 수 있습니다. 이 객체는 툴팁의 위치, 내용, 표시 여부를 제어하는 여러 메서드를 제공합니다:

- **getNode()** - 툴팁의 HTML 요소를 반환합니다  
- **setViewport()** - 툴팁이 특정 HTML 요소의 경계 내에만 표시되도록 제한합니다
    - **node** - (*HTMLElement*) 툴팁이 표시될 영역의 요소
- **show()** - 지정한 좌표(문서 body 기준)에서 툴팁을 표시합니다. 툴팁 위치 지정 방식에 따라 파라미터가 다릅니다:
    - 특정 좌표에 툴팁을 표시하려면:
        - **left** - (*number*) X 좌표
        - **top** - (*number*) Y 좌표 
    - 마우스 이벤트 좌표에 툴팁을 표시하려면(*tooltip_offset_x/y* 및 viewport를 고려):
        - **event** - (*Event*) 마우스 이벤트 객체  
- **hide()** - 툴팁을 숨깁니다
- **setContent()** - 툴팁 내부의 HTML 콘텐츠를 설정합니다. 파라미터:
    - **html** - (*string*) HTML 문자열



### 메서드

DOM 요소 위에 마우스를 올렸을 때 툴팁 동작을 제어하는 여러 메서드가 있습니다.

#### gantt.ext.tooltips.attach() {#attach}

확장된 설정으로 툴팁을 추가합니다. 다음과 같은 설정이 포함된 객체를 받습니다:

- **selector** - (*string*) 마우스 이벤트를 감지할 요소의 CSS 선택자
- **onmouseenter** - (*function*) 마우스가 요소에 진입할 때 호출, 파라미터:
     - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) 해당 요소
- **onmousemove** - (*function*) 요소 내에서 마우스가 움직일 때 호출, 파라미터:
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) 해당 요소
- **onmouseleave** - (*function*) 마우스가 요소를 벗어날 때 호출, 파라미터:    
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) 해당 요소
- **global** - (*boolean*) 전체 페이지에서 마우스 이벤트를 감지할지(*true*) 또는 gantt 요소 내부에서만 감지할지(*false*) 여부. 기본값은 *false*입니다.

#### gantt.ext.tooltips.tooltipFor() {#tooltipfor}

특정 Gantt 요소에 툴팁을 추가합니다. **attach()**의 간단한 버전입니다. 다음과 같은 속성을 가진 객체를 받습니다:

- **selector** - (*string*) 툴팁을 추가할 Gantt 요소의 CSS 선택자
- **html** - (*function*) 툴팁의 템플릿 함수. 다음을 파라미터로 받습니다:
    - **event** - (*Event*) 네이티브 마우스 이벤트
    - **node** -  (*HTMLElement*) 해당 요소
    그리고 툴팁에 표시할 HTML 문자열을 반환
- **global** - (*boolean*) 선택 사항, 전체 페이지에서 감지할지(*true*) 또는 gantt 내부에서만 감지할지(*false*). 기본값은 *false*입니다. 

#### gantt.ext.tooltips.detach() {#detach} 

툴팁을 제거합니다. 다음을 파라미터로 받습니다:

- **selector** - (*string*) Gantt 요소의 CSS 선택자



## 다양한 요소에 툴팁 추가


기본적으로 툴팁은 Gantt 작업에만 추가되지만, 리소스 마커와 같은 다른 Gantt 요소에도 적용할 수 있습니다:

![Resource marker tooltip](/img/resource_marker_tooltip.png)


여기서 [툴팁 API](#tooltipapi)의 두 가지 메서드가 유용합니다:

- [**gantt.ext.tooltips.tooltipFor()**](#tooltipfor) 메서드

예를 들어, 타임라인 스케일 셀에 툴팁을 추가하려면:

~~~js
const domHelper = gantt.utils.dom;
const pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);
return gantt.templates.task_date(gantt.dateFromPos(pos.x));
~~~

반드시 Gantt가 초기화된 후에 [gantt.ext.tooltips.tooltipFor()](#tooltipfor)를 호출해야 합니다. 예를 들어, [onGanttReady](api/event/onganttready.md) 이벤트 핸들러 내부에서 사용할 수 있습니다:

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


또는 다음과 같이 사용할 수 있습니다:

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


**Related example:** [Gantt. Custom tooltips for cells](https://snippet.dhtmlx.com/6kb5gm39)


이렇게 추가된 툴팁은 마우스 포인터를 따라다니며 *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)*, *[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)* 설정을 따릅니다.

- [**gantt.ext.tooltips.attach()**](#attach) 메서드

이 메서드를 사용하면 마우스 이동에 따라 툴팁 동작을 더 세밀하게 제어할 수 있도록 상세 설정으로 툴팁을 추가할 수 있습니다.



## 툴팁 동작 커스터마이징


기본 툴팁 동작을 제거하고 직접 정의할 수 있습니다:

- [**gantt.ext.tooltips.detach**](#detach)로 작업에 대한 기본 툴팁 핸들러를 제거합니다:

~~~js
// 작업에 대한 내장 툴팁 핸들러 제거
gantt.ext.tooltips.detach(`[${gantt.config.task_attribute}]:not(.gantt_task_row)`);
~~~

- [**gantt.ext.tooltips.attach()**](#attach)로 사용자 정의 툴팁 동작을 추가합니다. 예를 들어, 아래는 테이블 위에서만 툴팁을 표시하는 예시입니다:

~~~js
gantt.ext.tooltips.tooltipFor({
    selector: `.gantt_grid [${gantt.config.task_attribute}]`,
    html: (event: MouseEvent) => {
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



## 타임아웃


툴팁 표시 및 숨김 타이밍은 관련 설정을 통해 조정할 수 있습니다.

작업에 대한 툴팁이 나타나기까지의 시간(밀리초 단위)을 설정하려면 [tooltip_timeout](api/config/tooltip_timeout.md)를 사용하세요:

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~


커서가 툴팁 영역을 벗어난 후 툴팁이 유지되는 시간(밀리초 단위)을 제어하려면 [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)를 사용하세요:

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~



## 위치


툴팁의 위치는 다음 설정을 통해 수평/수직 오프셋을 조정할 수 있습니다:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - 수평 오프셋 설정
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - 수직 오프셋 설정

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~



## 표시 영역


버전 6.1 이전에는 툴팁이 타임라인 영역 내에서만 표시되었습니다. v6.1부터는 툴팁이 어디서든 나타나며 마우스 포인터를 따라갑니다.

이전 동작으로 되돌리고 싶다면, Gantt 초기화 전에 다음 코드를 사용하세요:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;
    tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

