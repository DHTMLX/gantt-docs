---
sidebar_label: autosize
title: autosize config
description: "Gantt 차트 크기를 자동으로 조절하여 스크롤 없이 모든 작업을 표시합니다."
---

# autosize

### Description

@short: Gantt 차트 크기를 자동으로 조절하여 스크롤 없이 모든 작업을 표시합니다.

@signature: autosize: boolean | string

### Example

~~~jsx
gantt.config.autosize = "xy";

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

'autosize' 설정은 Gantt 차트가 내부 스크롤바를 사용하여 컨테이너 크기에 데이터를 맞출지, 아니면 내부 스크롤 없이 모든 데이터를 표시하도록 컨테이너 크기를 조절할지를 결정합니다.

- [CSS로 Gantt div 크기를 설정한 예제](https://snippet.dhtmlx.com/5/b4d4d1b80) - 필요할 때 내부 스크롤바가 나타납니다.
- [컴포넌트가 Gantt div 크기를 계산하는 예제](https://snippet.dhtmlx.com/5/c278b3859) - 내부 스크롤바가 비활성화됩니다.

Gantt가 페이지 내 특정 영역에 맞춰져야 할 경우, 컨테이너 크기는 수동으로 관리해야 합니다.

- autosize는 꺼야 합니다.
- div의 너비와 높이는 반응형 레이아웃 솔루션을 사용하는 경우 HTML 레이아웃이나, 또는 커스텀 코드로 결정되어야 합니다.

## 숨겨진 요소로 스크롤하기

기본적으로 Gantt는 [showTask](api/method/showtask.md) 또는 [showDate](api/method/showdate.md) 메서드 사용 시 자동으로 스크롤합니다.
하지만 **autosize**가 활성화된 경우, Gantt는 스크롤 대신 컨테이너 크기를 확장하여 해당 요소가 페이지에 보이도록 합니다.

이 문제에 대한 범용적인 해결책은 없습니다. 페이지에 스크롤이 필요한 다른 요소들이 있을 수 있기 때문입니다. 따라서 해결 방법은 특정 페이지나 애플리케이션 설정에 따라 달라집니다.

*간단한* 설정에서는 Gantt가 다른 요소들 앞이나 뒤에 위치하고, 페이지 스크롤이 정상 작동합니다.

*복잡한* 설정에서는 Gantt 컨테이너가 여러 중첩된 컨테이너 안에 있을 수 있습니다.
이 경우 관련 요소만 수동으로 스크롤해야 합니다.

페이지를 필요한 요소로 스크롤하는 한 가지 방법은 **element.scrollIntoView** 메서드를 사용하는 것입니다:

~~~js
var attr = gantt.config.task_attribute;
var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
~~~

여기서 `id`는 표시할 작업 ID를 의미합니다.

또 다른 방법은 Gantt의 [showTask](api/method/showtask.md) 또는 [showDate](api/method/showdate.md) 메서드를 오버라이드하는 것입니다:

~~~js
var showTask = gantt.showTask;

gantt.showTask = function(id){
  showTask.apply(this, [id]);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
  if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
};
~~~

또는 작업을 표시하는 커스텀 함수를 만들어 사용할 수도 있습니다:

~~~js
function showTask(id){
  gantt.showTask(id);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
    if(timelineElement)
      timelineElement.scrollIntoView({block:"center"});
}
~~~

:::note

**Related example:** [지정한 요소로 스크롤하기](https://snippet.dhtmlx.com/or73u6a5)

:::

### Related API
- [autosize_min_width](api/config/autosize_min_width.md)

