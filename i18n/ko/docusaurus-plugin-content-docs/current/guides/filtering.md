---
title: "작업 필터링"
sidebar_label: "작업 필터링"
---

# 작업 필터링

필터링은 간트 차트에 표시되는 작업의 수와 유형을 제한하여 어떤 작업이 나타나는지 제어하는 데 도움이 됩니다. 예를 들어, 특정 작업자에게 할당된 작업이나 긴급으로 표시된 작업만 표시하도록 사용할 수 있습니다.

참고로, dhtmlxGantt는 클라이언트 측 필터링을 지원합니다.

![filtering](/img/filtering.png)

필터링을 적용하려면, @[onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 이벤트를 사용하고 다음과 같이 반환합니다:

- *true* : 작업을 표시
- *false* : 작업을 숨김

**우선순위가 높은 작업만 표시하기**
~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~


[Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)


분할 작업의 일부만 필터링하려면 @[onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 이벤트를 사용하세요.

작업 필터링 설정 방법을 보여주는 동영상 가이드도 제공됩니다.

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

