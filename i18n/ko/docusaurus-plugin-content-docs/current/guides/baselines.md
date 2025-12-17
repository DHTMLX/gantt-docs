---
title: "타임라인 영역의 커스텀 요소"
sidebar_label: "타임라인 영역의 커스텀 요소"
---

타임라인 영역의 커스텀 요소
==========================================

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

dhtmlxGantt는 기본적으로 [내장 기능](guides/inbuilt-baselines.md)을 통해 베이스라인, 마감일, 작업 제약 조건과 같은 추가 요소들을 렌더링할 수 있습니다. 이러한 기능을 확장하거나 조정하고 싶다면, 아래 설명된 대로 타임라인에 커스텀 요소를 수동으로 추가할 수 있습니다.

추가 요소를 삽입하는 일반적인 방법은 표시 레이어를 만들고, 해당 작업과 정렬되도록 절대 위치 지정을 사용하여 커스텀 요소를 배치하는 것입니다.

**타임라인 영역에 추가 레이어를 삽입하려면** [addTaskLayer](api/method/addtasklayer.md) 메서드를 사용하세요. 이 메서드는 함수를 매개변수로 받으며, 이 함수는 다음을 수행합니다:

- 작업 객체를 인수로 받습니다;
- 표시할 DOM 요소를 반환하거나, 작업에 대한 요소를 숨기려면 *false*를 반환합니다.

~~~js
gantt.addTaskLayer(function myNewElement(task) {
    var el = document.createElement('div');
    // your code
    return el;
});
~~~

[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


참고:

1. 메서드를 호출하면 dhtmlxGantt가 타임라인 영역에 컨테이너를 추가합니다.
2. 데이터를 렌더링할 때, [addTaskLayer](api/method/addtasklayer.md) 메서드는 각 작업마다 호출되고, 반환된 DOM 요소가 컨테이너에 추가됩니다.
3. 요소를 배치할 때 표준 절대 위치 지정을 사용할 수 있습니다.
4. Gantt 작업이 업데이트되면 모든 레이어(커스텀 레이어 포함)가 업데이트됩니다(업데이트된 작업에 대해 함수가 호출되고 관련 DOM 요소가 교체됨).
5. dhtmlxGantt는 작업의 위치와 크기를 계산하는 메서드([getTaskPosition](api/method/gettaskposition.md))를 제공합니다. 이 메서드를 사용하여 커스텀 요소의 위치와 크기를 결정할 수 있습니다.

*커스텀 요소의 렌더링 성능을 향상시키는 팁은 [addTaskLayer](api/method/addtasklayer.md#smartrenderingforcustomlayers) 문서를 참고하세요.*

:::note
모든 타임라인 셀에 커스텀 콘텐츠를 표시하려면, [timeline_cell_content](api/template/timeline_cell_content.md) 템플릿을 사용하여 셀에 HTML을 직접 삽입하는 것이 더 쉽고 빠릅니다.
:::

사용 예시
--------------------------

이 기능의 사용 예시를 살펴보겠습니다. 예를 들어, 각 작업에 대해 계획 시간과 실제 시간이 모두 있고, 이를 모두 표시하고 싶다고 가정합니다.

![baselines](/img/baselines.png)

### 1단계. 작업 높이 줄이고 작업 라인을 위로 이동하기

초기에는 작업이 다음과 같이 보입니다:

![baselines_start](/img/baselines_start.png)

작업 아래에 베이스라인을 표시할 공간을 만들기 위해, 작업 바의 높이를 행 높이의 절반 정도로 줄입니다:

~~~js
gantt.config.bar_height = 16;
gantt.config.row_height = 40;
~~~

그런 다음, 다음 CSS를 사용하여 작업 라인을 행의 맨 위로 이동시킵니다:

~~~css
.gantt_task_line, .gantt_line_wrapper {
    margin-top: -9px;
}
.gantt_side_content {
    margin-bottom: 7px;
}
.gantt_task_link .gantt_link_arrow {
    margin-top: -12px
}
.gantt_side_content.gantt_right {
    bottom: 0;
}
~~~

결과는 다음과 같습니다:

![baselines_task_height](/img/baselines_task_height.png)

### 2단계. 추가 데이터 속성 삽입

다음으로, 작업 객체에 'planned_start'와 'planned_end'와 같은 추가 데이터 속성을 추가합니다.

![baseline_task_object](/img/baseline_task_object.png)

### 3단계. 추가된 데이터 속성을 Date 객체로 변환

dhtmlxGantt는 'start_date'와 'end_date'는 자동으로 Date 객체로 인식하고 파싱합니다. 그 외의 날짜 속성은 수동으로 파싱해야 합니다. 


'planned_start'와 'planned_end'를 dhtmlxGantt에서 사용할 수 있도록, [onTaskLoading](api/event/ontaskloading.md) 이벤트 핸들러 내에서 parseDate() 메서드를 사용해 Date 객체로 변환하세요.

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
    task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
    return true;
});
~~~

### 4단계. 계획 시간에 대한 커스텀 요소 표시

그런 다음, [addTaskLayer](api/method/addtasklayer.md) 메서드를 사용하여 각 작업의 계획 시간('planned_start'에서 'planned_end'까지)을 표시합니다.

~~~js
gantt.addTaskLayer(function draw_planned(task) {
    if (task.planned_start && task.planned_end) {
        var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
        var el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.width = sizes.width + 'px';
        el.style.top = sizes.top + gantt.config.task_height  + 13 + 'px';
        return el;
    }
    return false;
});
~~~

### 5단계. 추가 요소에 대한 CSS 규칙 지정

마지막으로, 새로 추가한 요소에 대한 CSS 스타일을 추가합니다:

~~~css
.baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255,153,0);
}
~~~

### 6단계. 라이트박스에서 추가된 데이터 속성 편집 활성화

사용자가 UI를 통해 새로 추가된 속성을 편집할 수 있도록 하려면, 라이트박스 구조를 그에 맞게 재정의해야 합니다.

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "time", height: 72, map_to: "auto", type: "duration"},
    {name: "baseline", height: 72, map_to: { 
        start_date: "planned_start", end_date: "planned_end"}, type: "duration"}
];
gantt.locale.labels.section_baseline = "Planned";
~~~

관련 샘플에서 전체 코드 예제를 확인할 수 있습니다.


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


커스텀 콘텐츠 샘플
----------------

다음은 [addTaskLayer()](api/method/addtasklayer.md) 메서드를 사용하여 Gantt 차트 타임라인에 다양한 커스텀 요소를 추가하는 예시입니다:

- [커스텀 기준선](https://snippet.dhtmlx.com/wv23be05)
- [기한이 지난 셀 하이라이트](https://snippet.dhtmlx.com/bk5m6his)
- [기한이 지난 작업 하이라이트](https://snippet.dhtmlx.com/p74m3du2)
- [프로젝트 전체의 마감 미달 표시](https://snippet.dhtmlx.com/cuc7d4vn)
- [작업 진행률 값 표시](https://snippet.dhtmlx.com/bpupkrce)
- [작업에 커스텀 요소 추가](https://snippet.dhtmlx.com/quqe9s2o)
- [드래그 가능한 기준선](https://snippet.dhtmlx.com/pmuy0lj8)
- [드래그 가능한 진행 노브가 있는 기준선](https://snippet.dhtmlx.com/38h66bni)
- [커스텀 마일스톤](https://snippet.dhtmlx.com/70kqo4do)
- [반복 작업](https://snippet.dhtmlx.com/5/7faa7b03a) 


커스텀 요소의 드래그 앤 드롭
----------------------------------

커스텀 요소에 대해 드래그 앤 드롭을 활성화하려면, DHTMLX Gantt에서 기본적으로 제공하는 기능은 없지만 간단한 단계로 직접 구현할 수 있습니다.

이 방법은 세 가지 DOM 이벤트(**mousedown**, **mousemove**, **mouseup**)를 감지하고, 이들 이벤트 사이에서 드래그 상태를 추적하는 몇 가지 플래그를 유지하는 것입니다.

1. **mousedown** 이벤트는 드래그 앤 드롭의 시작을 나타냅니다. 하지만 일반 클릭의 시작일 수도 있으므로, 이 시점에서는 드래그 요청 플래그를 설정하고 마우스의 초기 위치 및 기타 관련 데이터를 저장합니다.

~~~js
var dndRequested = false;
var dndActivated = false;
var startPosition = null;
var startTimestamp = null
var taskId = null;
var domUtils = gantt.utils.dom;
// 이 샘플에서는 `gantt.$task_data` 컨테이너 내의 `.baseline` 요소를 드래그합니다.
gantt.event(gantt.$task_data, 'mousedown', function(e) {
  // element.closest 또는 gantt.utils.dom.closest를 사용하여 드래그 가능한 요소를 찾습니다.
  var draggableElement = domUtils.closest(e.target, '.baseline');
 
  if (draggableElement) {
    // 사용자가 요소를 드래그할지 단순 클릭할지 아직 모릅니다.
    // 이벤트 정보를 저장하고, 'mousemove'에서 확인합니다.
    dndRequested = true;
    startTimestamp = Date.now();
    startPosition = domUtils.getRelativeEventPosition(e, gantt.$task_data);
    taskId = draggableElement.getAttribute("data-task");
  }
});
~~~

이벤트 핸들러는 [gantt.event](api/method/event.md)를 사용해 연결됩니다. 이는 **gantt.destructor**로 Gantt 인스턴스를 파괴할 때 **gantt.event**로 연결된 모든 핸들러가 자동으로 해제되기 때문입니다. 네이티브 [Element.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)를 사용할 경우 메모리 누수를 방지하려면 수동으로 정리해야 합니다.

2. 실제 드래그 앤 드롭은 **mousemove** 이벤트에서 시작됩니다. 마우스 다운 시 바로 드래그를 시작하지 않고, 현재 마우스 위치와 저장된 초기 위치를 비교합니다. 이렇게 하면 커서가 일정 임계값 이상 이동할 때만 드래그가 시작됩니다. 또는 클릭보다 오래 마우스를 누르고 있는지도 체크할 수 있습니다.

드래그가 시작되면 **mousemove** 핸들러는 드래그 중인 요소의 위치를 업데이트합니다. `gantt.addTaskLayer`로 추가된 요소의 경우 DOM을 직접 조작하지 말고, 관련 작업 데이터를 업데이트하고 [gantt.refreshTask](api/method/refreshtask.md)로 작업을 새로고침하는 것이 좋습니다.

~~~js
gantt.event(window, 'mousemove', function(e) {
  if (dndRequested && gantt.isTaskExists(taskId)) {
    // 'mousedown' 이벤트 이후 'mousemove'를 감지함
    var currentPosition = domUtils.getRelativeEventPosition(e, gantt.$task_data);
    if (!dndActivated) {
      // 'mousemove'가 일반 클릭 과정의 일부일 수 있으므로
      // 일반 클릭일 때 드래그가 실행되지 않도록 함
      // 마우스 위치가 충분히 변경되었는지 또는 클릭보다 오래 눌렀는지 확인
      if(Math.abs(
          currentPosition.x - startPosition.x) > 5 || (Date.now() - startTimestamp
        ) > 500) {
          // 조건 충족 시 드래그 시작으로 간주
          dndActivated = true;
      }
    }
    if (dndActivated) {
      // 드래그 중인 요소의 위치를 업데이트
      // `gantt.addTaskLayer`로 추가된 경우
      // 작업 객체를 업데이트하고 `gantt.refreshTask`로 다시 그리는 것이 좋음
      // 타임스케일의 해당 날짜를 얻을 수도 있음:
      var pointerDate = gantt.dateFromPos(currentPosition.x);
      gantt.getTask(taskId).baseline_date = pointerDate;
      gantt.refreshTask(taskId);
    }
  }
 
});
~~~

3. 마지막으로 **mouseup** 이벤트를 감지합니다. 드래그가 진행되었다면 날짜를 반올림하고, 필요하다면 [gantt.updateTask](api/method/updatetask.md)를 호출하여 변경사항을 확정하고, 임시 플래그를 모두 초기화합니다.

~~~js
gantt.event(window, 'mouseup', function(e) {
  // 드래그 앤 드롭이 진행 중이었다면 변경사항 적용
  if (dndActivated) {
    // 필요시 변경사항 검증 및 확정
    var task = gantt.getTask(taskId);
    task.baseline_date = gantt.roundDate({
      date: task.baseline_date,
      unit: "hour",
      step: 1    
    });
    // gantt.updateTask 호출로 데이터 업데이트
    gantt.updateTask(taskId);
  }
  // 이전 단계에서 설정한 모든 플래그 초기화
  dndRequested = false;
  dndActivated = false;
  startPosition = null;
  startTimestamp = null;
  taskId = null;
});
~~~

차트용 추가 오버레이
----------------

dhtmlxGantt는 차트 위에 커스텀 콘텐츠를 배치할 수 있도록 추가 레이어(오버레이)를 추가할 수 있습니다. 이 오버레이는 div 컨테이너, HTML canvas, 기타 요소가 될 수 있습니다. 서드파티 라이브러리를 사용해 오버레이 내부에 콘텐츠를 렌더링할 수 있습니다.

예를 들어, 프로젝트의 비용 증가, 자재 소비, 전체 진행률 등을 시각화할 때 자주 사용하는 S-커브 오버레이를 추가할 수 있습니다.

오버레이를 추가하려면 다음 두 단계를 따르세요:

- [gantt.plugins](api/method/plugins.md) 메서드로 **overlay** 확장 기능을 활성화합니다:

~~~js
gantt.plugins({
    overlay: true
});
~~~

- **gantt.ext.overlay** 객체의 **addOverlay()** 메서드를 사용하여, 오버레이 컨테이너에 커스텀 콘텐츠를 추가하는 함수를 전달합니다. 이 함수는 컨테이너 요소를 파라미터로 받습니다. 아래 예시를 참고하세요.

아래는 [ChartJS](https://www.chartjs.org/) 라이브러리를 사용하여 목표 및 실제 프로젝트 진행률을 나타내는 S-커브가 있는 캔버스 오버레이를 추가하는 샘플입니다:

![Overlay with S-curve](/img/overlay_scurve.png)

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){
    var canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.style.height = container.offsetHeight + "px";
    canvas.style.width = container.offsetWidth + "px";

    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        // 전체 차트 설정
    });
});
~~~

**gantt.ext.overlay.addOverlay()** 메서드는 새 오버레이의 숫자 id를 반환합니다.


[Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)


### 오버레이 확장 API

**dhtmlxgantt_overlay** 확장은 오버레이를 다루는 일련의 API 메서드를 제공합니다. 이 메서드들은 **gantt.ext.overlay** 객체를 통해 접근할 수 있습니다.

#### addOverlay

Gantt 차트에 새 오버레이를 추가하고 그 id를 반환합니다. 커스텀 콘텐츠를 위한 컨테이너를 파라미터로 받는 함수를 전달합니다.

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

#### deleteOverlay

id로 오버레이를 제거합니다.

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

#### getOverlaysIds 

차트에 추가된 모든 오버레이의 id 배열을 반환합니다.

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

#### refreshOverlay

id로 지정된 오버레이를 다시 그립니다.

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

#### showOverlay

id로 오버레이를 표시합니다.

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

#### hideOverlay

id로 오버레이를 숨깁니다.

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

#### isOverlayVisible

지정한 오버레이가 표시 중인지 확인합니다. 표시 중이면 *true*를 반환합니다.

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~

