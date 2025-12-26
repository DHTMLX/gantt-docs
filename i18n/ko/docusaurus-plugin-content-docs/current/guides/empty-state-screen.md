---
title: "Empty State Screen"
sidebar_label: "Empty State Screen"
---

# Empty State Screen  

버전 8.0부터, 라이브러리는 간트 차트에 데이터가 로드되지 않았을 때 그리드에 플레이스홀더 요소가 포함된 빈 화면("empty state")을 표시하는 기능을 지원합니다.

![empty screen tip](/img/empty_screen.png)

기본적으로, 플레이스홀더 요소는 숨겨져 있습니다. 이를 활성화하려면 다음과 같이 설정합니다:

~~~js
gantt.config.show_empty_state = true;
~~~


[Show empty state screen](https://docs.dhtmlx.com/gantt/samples/08_api/24_empty_state_screen.html)



## EmptyStateElement 객체

"empty state" 기능은 [emptyStateElement](guides/empty-state-element-ext.md) 익스텐션을 통해 다양한 API 메서드를 제공합니다.

빈 상태는 간트에 작업이 전혀 로드되지 않았을 때뿐만 아니라, 작업이 로드되어 있지만 필터링되어 페이지에 보이지 않을 때도 표시될 수 있습니다. 이러한 경우를 처리하려면 **isEnabled()** 메서드를 사용하세요:

~~~js
gantt.ext.emptyStateElement.isEnabled = function (){
    return !gantt.getVisibleTaskCount().length;
}
~~~

빈 상태를 그리드 대신 타임라인 영역에 표시하려면 **getContainer()** 메서드를 사용하세요:

~~~js
gantt.ext.emptyStateElement.getContainer = function() {
    return gantt.$task_data.closest(".gantt_layout_content");
};
~~~

빈 상태에 표시되는 콘텐츠를 사용자 정의하려면 **renderContent()** 메서드를 오버라이드하세요:

~~~js
gantt.ext.emptyStateElement.renderContent = function (container) {
    const placeholderTextElement = `<div class='gantt_empty_state_text'>
    <div class='gantt_empty_state_text_link' data-empty-state-create-task>
       ${gantt.locale.labels.empty_state_text_link}</div>
    <div class='gantt_empty_state_text_description'>
       ${gantt.locale.labels.empty_state_text_description}</div>
    </div>`;
    const placeholderImageElement = "<div class='gantt_empty_state_image'></div>";

    const placeholderContainer = `<div class='gantt_empty_state'>
       ${placeholderImageElement}${placeholderTextElement}</div>`;
    container.innerHTML = placeholderContainer;
}
~~~
