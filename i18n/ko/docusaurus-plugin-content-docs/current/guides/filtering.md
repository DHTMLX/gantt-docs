---
title: "필터링 작업"
sidebar_label: "필터링 작업"
---

# 필터링 작업

필터링은 간트 차트에 렌더링되는 작업의 수와 특성을 관리할 수 있게 해줍니다. 예를 들어 특정 작업자에게 할당된 작업이나 긴급 우선순위를 가진 작업을 표시하기 위해 필터링을 사용할 수 있습니다.

참고: dhtmlxGantt는 클라이언트 측 필터링을 지원합니다.

![filtering](/img/filtering.png)

데이터를 필터링하려면 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 이벤트를 사용하고 다음을 반환합니다:

- *true*, 표시하려는 작업의 경우
- *false*, 표시하지 않으려는 작업의 경우

**우선 순위가 높은 작업만 표시하기**

~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~

[기본 필터링](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

분할 작업의 데이터를 필터링하려면 [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 이벤트를 적용하세요.

필터링 작업 구현 방법을 보여주는 비디오 가이드를 확인해 보세요.

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>