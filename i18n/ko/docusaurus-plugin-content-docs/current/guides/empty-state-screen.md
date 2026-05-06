---
title: "빈 상태 화면"
sidebar_label: "빈 상태 화면"
---

# 빈 상태 화면

버전 8.0부터 라이브러리에는 로드된 데이터가 없을 경우 Gantt 차트의 그리드에 자리 표시 요소를 포함한 빈 화면("empty state")을 표시하는 기능이 포함되어 있습니다.

![빈 화면 팁](/img/empty_screen.png)

기본적으로 자리 표시 요소는 숨겨져 있습니다. 표시하려면 [show_empty_state](api/config/show_empty_state.md) 구성을 사용하십시오:

~~~js
gantt.config.show_empty_state = true;
~~~

[빈 상태 화면 보기](https://docs.dhtmlx.com/gantt/samples/08_api/24_empty_state_screen.html)

## EmptyStateElement 객체

"empty state"는 [emptyStateElement](guides/empty-state-element-ext.md) 확장에서 제공하는 API 메서드 세트를 포함합니다.

"empty state"의 표시가 가능하다는 것은 Gantt 차트에 로드된 작업이 전혀 없을 때뿐만 아니라 작업이 로드되었지만 필터링되어 페이지에 보이지 않는 경우에도 표시할 수 있음을 의미합니다. 이를 위해 **isEnabled()** 메서드를 사용하세요:

~~~js
gantt.ext.emptyStateElement.isEnabled = function (){
    return !gantt.getVisibleTaskCount().length;
}
~~~

그리드가 아닌 타임라인 영역에 "empty state"를 표시하려면 **getContainer()** 메서드를 사용하십시오:

~~~js
gantt.ext.emptyStateElement.getContainer = function() {
    return gantt.$task_data.closest(".gantt_layout_content");
};
~~~

"empty state"에서 렌더링되는 내용을 변경하려면 **renderContent()** 메서드를 적용하십시오:

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