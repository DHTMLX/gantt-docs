--- 
title: "타임라인 영역의 커스텀 요소"
sidebar_label: "타임라인 영역의 커스텀 요소"
---

# 타임라인 영역의 커스텀 요소

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

dhtmlxGantt는 기본적으로 baselines(기준선), deadlines(마감 기한) 및 작업 제약과 같은 이러한 추가 요소를 렌더링할 수 있는 빌트인 기능을 제공합니다.
기본 기능을 확장하거나 수정해야 하는 경우 아래에 설명된 대로 타임라인에 커스텀 요소를 수동으로 추가할 수 있습니다.

추가 요소의 표시은 보통 표시 가능한 레이어를 생성하고 그 안에 커스텀 요소를 배치하는 방식으로 이루어지며
(관련 작업 옆에 커스텀 요소를 배치하기 위해 절대 위치 지정을 사용합니다).

**타임라인 영역에 레이어를 하나 더 추가하려면**, [`addTaskLayer()`] 메서드를 사용합니다. 매개변수로는 다음을 수행하는 함수를 받습니다:

- 작업 객체를 받습니다;
- 표시될 DOM 요소를 반환하거나 *false*를 반환합니다(작업에 대한 요소를 숨겨야 하는 경우).

~~~js
gantt.addTaskLayer((task) => {
    const layerElement = document.createElement('div');
    // your code
    return layerElement;
});
~~~

**관련 샘플**: [마감일 표시](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

참고:

1. 메서드를 호출하면 dhtmlxGantt가 타임라인 영역에 컨테이너를 추가합니다.
2. dhtmlxGantt가 데이터를 렌더링할 때, [`addTaskLayer()`](api/method/addtasklayer.md) 메서드가 각 작업에 대해 호출되며 반환된 DOM 요소가 컨테이너에 추가됩니다.
3. 요소를 배치할 때 일반적인 절대 위치를 사용할 수 있습니다.
4. Gantt의 작업이 업데이트되면 커스텀 레이어를 포함한 모든 레이어에서 업데이트되며(업데이트된 작업에 대해 함수가 호출되고 관련 DOM 요소가 교체됩니다).
5. 작업의 위치와 크기를 계산하는 메서드 - [`getTaskPosition()`](api/method/gettaskposition.md) 를 제공합니다. 이를 사용해 커스텀 요소의 위치와 크기도 계산할 수 있습니다.

*커스텀 요소 렌더링 속도(perfomance)를 높이는 방법을 배우려면 [`addTaskLayer()`](api/method/addtasklayer.md#smart-rendering-for-custom-layers) 기사를 읽으세요.*

:::note
타임라인의 모든 셀에 커스텀 콘텐츠를 표시해야 하는 경우, 셀에 직접 HTML을 배치하려면 [`timeline_cell_content`](api/template/timeline_cell_content.md) 템플릿을 사용하세요. 이 방법이 구현하기 쉽고 성능도 더 빠릅니다.
:::

## 사용 예 제시

이 기능을 어떻게 적용하는지 이해하기 위해 예를 하나 살펴보겠습니다: 작업에 대해 계획된 시간과 실제 시간이 있고, 두 시간을 모두 표시해야 합니다.

![baselines](/img/baselines.png)

### 1단계. 작업 높이를 줄이고 작업 선을 위로 올리기

초기 상태에서 작업은 아래처럼 보입니다:

![baselines_start](/img/baselines_start.png)

먼저 작업 아래의 기준선을 위한 공간을 확보해야 합니다.
이를 위해 작업 막대의 높이를 `gantt.config.bar_height`로 줄이고, 이를 `gantt.config.row_height`로 정의된 행 높이의 대략 절반과 같도록 만듭니다:

~~~js
gantt.config.bar_height = 16;
gantt.config.row_height = 40;
~~~

그리고 아래의 CSS를 적용하여 작업 선을 행의 맨 위로 옮깁니다:

~~~css
.gantt_task_line,
.gantt_line_wrapper {
    margin-top: -9px;
}

.gantt_task_link .gantt_link_arrow {
    margin-top: -10px;
}

.gantt_task_link .gantt_link_corner {
    margin-top: -9px;
}
~~~

그 결과는 다음과 같습니다:

![baselines_task_height](/img/baselines_task_height.png)

### 2단계. 추가 데이터 속성 추가

그다음 작업 객체에 추가 데이터 속성을 더합니다. 이름은 예를 들어: `planned_start` 와 `planned_end` 로 합시다.

![baseline_task_object](/img/baseline_task_object.png)

### 3단계. 추가된 데이터 속성을 Date 객체로 변환

dhtmlxGantt는 `start_date`와 `end_date` 데이터 속성만 자동으로 Date 객체로 파싱합니다.
다른 모든 날짜 속성은 추가 처리가 필요합니다.
추가된 `planned_start`와 `planned_end` 속성을 dhtmlxGantt에서 인식 가능하게 만들려면,
[`onTaskLoading`](api/event/ontaskloading.md) 이벤트 핸들러에서 `parseDate()` 메서드를 사용해 Date 객체로 파싱합니다.

~~~js
gantt.attachEvent("onTaskLoading", (task) => {
    task.planned_start = gantt.date.parseDate(task.planned_start, gantt.config.date_format);
    task.planned_end = gantt.date.parseDate(task.planned_end, gantt.config.date_format);
    return true;
});
~~~

### 4단계. 계획된 시간에 대해 커스텀 요소 표시

그다음, `planned_start`와 `planned_end` 속성으로 정의된 작업의 계획된 시간을 표시하기 위해 [`addTaskLayer()`](api/method/addtasklayer.md) 메서드를 호출합니다.

~~~js
gantt.addTaskLayer((task) => {
    if (task.planned_start && task.planned_end) {
        const taskPosition = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
        const baselineElement = document.createElement('div');
        baselineElement.className = 'baseline';
        baselineElement.style.left = taskPosition.left + 'px';
        baselineElement.style.width = taskPosition.width + 'px';
        baselineElement.style.top = taskPosition.top + gantt.config.task_height + 13 + 'px';
        return baselineElement;
    }
    return false;
});
~~~

### 5단계. 추가 요소에 대한 CSS 규칙 지정

다음으로 새 요소를 위한 스타일을 추가합니다:

~~~css
.baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255, 153, 0);
}
~~~

### 6단계. 라이트박스에서 추가 데이터 속성 편집 기능 추가

마지막으로 UI에서 새로 추가된 속성을 편집할 수 있도록 `lightbox` 구조를 재정의합니다.

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, map_to: "auto", type: "duration" },
    {
        name: "baseline",
        height: 72,
        map_to: {
            start_date: "planned_start",
            end_date: "planned_end"
        },
        type: "duration"
    }
];
gantt.locale.labels.section_baseline = "Planned";
~~~

고려 중인 예제의 전체 코드는 관련 샘플에서 확인할 수 있습니다.

**관련 샘플**: [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

## 커스텀 콘텐츠 샘플

다음 샘플은 [`addTaskLayer()`](api/method/addtasklayer.md) 메서드를 적용해 Gantt 차트의 타임라인을 다양한 커스텀 요소로 확장하는 여러 방법을 보여줍니다:

- <a href="https://snippet.dhtmlx.com/wv23be05" target="_blank">맞춤 기준선</a>
- <a href="https://snippet.dhtmlx.com/bk5m6his" target="_blank">연체 시간으로 셀 강조</a>
- <a href="https://snippet.dhtmlx.com/p74m3du2" target="_blank">연체된 작업 강조</a>
- <a href="https://snippet.dhtmlx.com/cuc7d4vn" target="_blank">전체 프로젝트의 누락된 마감일 표시</a>
- <a href="https://snippet.dhtmlx.com/bpupkrce" target="_blank">작업 진행 값 표시</a>
- <a href="https://snippet.dhtmlx.com/quqe9s2o" target="_blank">작업에 대한 커스텀 요소 추가</a>
- <a href="https://snippet.dhtmlx.com/pmuy0lj8" target="_blank">드래그가능한 기준선</a>
- <a href="https://snippet.dhtmlx.com/38h66bni" target="_blank">드래그 가능한 진행 손잡이가 있는 기준선</a>
- <a href="https://snippet.dhtmlx.com/3oy6052q" target="_blank">맞춤 이정표</a>
- <a href="" target="_blank">반복 작업</a>

## 커스텀 엘리먼트의 드래그 앤 드롭

커스텀 엘리먼트에 대해 드래그 앤 드롭을 활성화하는 방법을 살펴보는 것이 유용할 수 있습니다. DHTMLX Gantt에는 커스텀 드래그 앤 드롭 구현을 위한 빌트인 기능이 없지만, 비교적 간단한 방식으로 수동으로 구현할 수 있습니다.

여기서는 세 가지 DOM 이벤트: `mousedown`, `mousemove`, `mouseup` 를 캡처하고 이 이벤트들 사이의 드래그 앤 드롭 상태를 저장하기 위한 플래그를 몇 개 정의해야 합니다.

1. `mousedown` 이벤트는 드래그 앤 드롭이 시작되었음을 신호합니다. 다만 이때가 일반적인 `click` 이벤트의 첫 단계일 수도 있어 드래그 앤 드롭을 활성화하지 않을 수도 있습니다. 이 단계에서 드래그 앤 드롭이 요청되었음을 나타내는 플래그를 설정하고 초기 마우스 위치와 이후에 필요할 수 있는 데이터를 기억합니다.

~~~js
let dndRequested = false;
let dndActivated = false;
let startPosition = null;
let startTimestamp = null;
let taskId = null;
const domUtils = gantt.utils.dom;
// 이 샘플에서는 `.baseline` 요소를 `gantt.$task_data` 컨테이너 내부에서 드래그합니다
gantt.event(gantt.$task_data, 'mousedown', (event) => {
    // 드래그 가능한 요소를 찾으려면 element.closest 혹은 gantt.utils.dom.closest를 사용하세요
    const draggableElement = domUtils.closest(event.target, '.baseline');

    if (draggableElement) {
        // 아직은 사용자가 요소를 드래그할지 단순 클릭할지 모릅니다
        // 이벤트 정보를 저장해두고, 'mousemove'에서 확인합니다
        dndRequested = true;
        startTimestamp = Date.now();
        startPosition = domUtils.getRelativeEventPosition(event, gantt.$task_data);
        taskId = draggableElement.getAttribute("data-task");
    }
});
~~~

참고로 이벤트 핸들러는 native [Element.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)가 아닌 [`gantt.event()`](api/method/event.md)로 추가됩니다. 이는 Gantt가 `gantt.destructor()` 메서드로 파괴될 수 있으며 `gantt.event()`를 통해 연결된 모든 이벤트가 자동으로 정리되기 때문입니다. 네이티브 메서드를 사용하고 `gantt.destructor()`를 호출하면 메모리 누수를 피하기 위해 이벤트 핸들러를 수동으로 정리해야 할 수 있습니다.

2. 실제 드래그 앤 드롭은 `mousemove` 핸들러에서 시작됩니다. 사용자가 마우스를 클릭했을 때 드래그 앤 드롭을 시작하는 대신, 현재 마우스 위치를 `mousedown`에서 저장한 초기 위치와 비교합니다. 이렇게 하면 초기 위치와 충분히 다를 때만 드래그 앤 드롭을 시작할 수 있습니다. 드래그 앤 드롭에 최소 임계값을 설정하고 싶지 않다면, `mousedown` 이후 경과한 시간도 추정할 수 있습니다.

실제로 드래그 앤 드롭이 시작되었다고 판단되면, 화면에서 드래그 중인 요소의 위치를 업데이트하기 위해 `mousemove` 이벤트 핸들러를 사용할 수 있습니다. 커스텀 레이어 요소를 드래그하는 경우, 이를 새로 고침하는 일반적인 방법은 DOM 요소를 직접 수정하기보다 기반 객체를 수정하고 Gantt API를 통해 다시 그리는 것(`gantt.refreshTask`)이 바람직합니다.

~~~js
gantt.event(window, 'mousemove', (event) => {
    if (dndRequested && gantt.isTaskExists(taskId)) {
        // 'mousedown' 이벤트 이후에 'mousemove'를 캡처했습니다
        const currentPosition = domUtils.getRelativeEventPosition(event, gantt.$task_data);
        if (!dndActivated) {
            // 'mousemove'는 일반 클릭 과정의 일부일 수 있습니다
            // 일반 클릭에서 dnd를 호출하고 싶지 않습니다
            // 마우스 위치가 충분히 변했는지 확인합니다
            // 또는 regular click보다 마우스가 더 오래 눌려 있는지 확인합니다
            if (Math.abs(currentPosition.x - startPosition.x) > 5 || (Date.now() - startTimestamp) > 500) {
                // 그렇다면 - dnd가 시작된 것으로 간주합니다
                dndActivated = true;
            }
        }
        if (dndActivated) {
            // 이제 드래그된 요소의 위치를 화면에서 업데이트할 수 있습니다
            // `gantt.addTaskLayer`를 통해 추가한 요소를 드래그하는 경우
            // 작업 객체를 업데이트하고
            // `gantt.refreshTask`를 통해 다시 그리는 것이 좋습니다
            // 시간 축의 해당 날짜도 얻을 수 있습니다:
            const pointerDate = gantt.dateFromPos(currentPosition.x);
            gantt.getTask(taskId).baseline_date = pointerDate;
            gantt.refreshTask(taskId);
        }
    }
});
~~~

3. 마지막으로 `mouseup` 이벤트를 캡처해야 합니다. 드래그 앤 드롭이 시작되었다면 이동된 객체에 변경 사항을 적용하고 필요하다면 [`gantt.updateTask()`](api/method/updatetask.md) 메서드를 호출한 뒤 모든 임시 플래그를 초기화합니다.

~~~js
gantt.event(window, 'mouseup', (event) => {
    // 드래그 앤 드롭이 진행 중이었다면 변경 사항 적용
    if (dndActivated) {
        // 필요 시 변경 사항 검증 및 확정
        const task = gantt.getTask(taskId);
        task.baseline_date = gantt.roundDate({
            date: task.baseline_date,
            unit: "hour",
            step: 1
        });
        // 데이터 업데이트를 트리거하기 위해 updateTask를 호출
        gantt.updateTask(taskId);
    }
    // 이전 단계에서 설정한 모든 플래그를 초기화
    dndRequested = false;
    dndActivated = false;
    startPosition = null;
    startTimestamp = null;
    taskId = null;
});
~~~

## 차트에 대한 추가 오버레이

dhtmlxGantt는 차트 위에 커스텀 콘텐츠를 배치하기 위한 추가 레이어를 제공하는 가능성을 제공합니다. 오버레이로 div 컨테이너, HTML 캔버스 등 어떤 것도 사용할 수 있습니다. 오버레이 콘텐츠를 그리려면 서드파티 라이브러리를 사용할 수 있습니다.

예를 들어 추가 오버레이에 S-curve를 추가할 수 있습니다. 일반적으로 S-curve는 비용 증가, 자재 공급 감소 등을 표시하며, 프로젝트의 작업 구현의 전반적인 진행 상황을 추적하는 데 사용됩니다.

Gantt에 오버레이를 추가하려면 두 가지를 완료해야 합니다:

- [`gantt.plugins()`](api/method/plugins.md) 메서드를 사용해 `overlay` 확장을 활성화합니다.

~~~js
gantt.plugins({
    overlay: true
});
~~~

- `gantt.ext.overlay` 객체의 `addOverlay()` 메서드를 사용하고, 그 안에 오버레이 콘텐츠를 추가하는 로직을 포함하는 함수를 전달합니다.
이 함수는 커스텀 콘텐츠가 포함된 컨테이너를 매개변수로 받습니다. 아래 예제를 참고하세요.

프로젝트의 목표 및 실제 진행률을 표시하기 위해 S-curve가 있는 캔버스 오버레이를 추가하는 예제는 (ChartJS 라이브러리를 사용하여 구현):

![Overlay with S-curve](/img/overlay_scurve.png)

~~~js
const overlayId = gantt.ext.overlay.addOverlay((container) => {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.style.height = container.offsetHeight + "px";
    canvas.style.width = container.offsetWidth + "px";

    const chartContext = canvas.getContext("2d");
    const progressChart = new Chart(chartContext, {
        type: "line",
        // 전체 차트 구성
    });
});
~~~

`gantt.ext.overlay.addOverlay()` 메서드는 새 오버레이의 ID를 숫자로 반환합니다.

**관련 샘플**: [Gantt 차트와 오버레이 및 확대/축소(S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)

### Overlay extension API

**dhtmlxgantt_overlay** 확장은 오버레이 작업을 위한 API 메서드 모음을 포함합니다. 이 메서드들은 `gantt.ext.overlay` 객체를 통해 사용할 수 있습니다.

#### `addOverlay()`

Gantt 차트에 새 오버레이를 추가하고 그 ID를 반환합니다. 커스텀 콘텐츠를 담은 컨테이너를 매개변수로 받습니다.

~~~js
const overlayId = gantt.ext.overlay.addOverlay((container) => {});
~~~

#### `deleteOverlay()`

오버레이를 해당 ID로 제거합니다.

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

#### `getOverlaysIds()`

차트에 추가된 오버레이의 ID 배열을 반환합니다.

~~~js
const overlayIds = gantt.ext.overlay.getOverlaysIds();
~~~

#### `refreshOverlay()`

지정된 오버레이를 다시 그립니다. 오버레이의 ID를 매개변수로 받습니다.

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

#### `showOverlay()`

ID로 오버레이를 표시합니다. 오버레이의 ID를 매개변수로 받습니다.

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

#### `hideOverlay()`

ID로 오버레이를 숨깁니다.

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

#### `isOverlayVisible()`

지정된 오버레이가 보이는지 확인합니다. 보이면 `true`를 반환합니다.

~~~js
const isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~