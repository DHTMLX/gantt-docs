---
title: "clickDrag 확장"
sidebar_label: "clickDrag 확장"
---

# clickDrag 확장

클릭드래그 확장에 대한 자세한 내용은 [Creating/Selecting Tasks with DnD](guides/advanced-dnd.md) 문서를 참조하세요.

## 구성 객체

고급 드래그 앤 드롭(Drag-and-Drop)을 사용하려면 [click_drag](api/config/click_drag.md) 구성 옵션을 지정하고 아래 목록의 필요한 속성들을 해당 객체 내부에 설정합니다: 

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- <span class="subproperty">**className?**</span> -  (*string*) - 선택된 요소에 대한 사용자 정의 CSS 클래스를 설정합니다
- <span class="subproperty">**viewPort?**</span> - (*HTMLElement*) - 이벤트를 바인딩하고 선택할 요소(viewPort)
- <span class="subproperty">**useRequestAnimationFrame?**</span> - (*boolean*) - 렌더링 중에 requestAnimationFrame을 사용할지 여부를 정의합니다
- <span class="submethod">**callback? (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows): any**</span> - 마우스 버튼을 놓을 때 호출되는 함수입니다. 6개의 매개변수를 받습니다:
    - **_startPoint?_** - (*object*) - 아래 속성을 가진 객체:
        - **_absolute_** - (*object*) - 문서의 좌상단 좌표
            - **_left_** - (*number*) - 좌측 좌표
            - **_top_** - (*number*) - 상단 좌표
        - **_relative_** - (*object*) - viewPort로 사용되는 왼쪽 상단 요소의 좌표
            - **_left_** - (*number*) - 좌측 좌표
            - **_top_** - (*number*) - 상단 좌표
    - **_endPoint?_** - (*object*) - 아래 속성을 가진 객체:
        - **_absolute_** - (*object*) - 문서의 좌상단 좌표
            - **_left_** - (*number*) - 좌측 좌표
            - **_top_** - (*number*) - 상단 좌표
        - **_relative_** - (*object*) - viewPort로 사용되는 왼쪽 상단 요소의 좌표
            - **_left_** - (*number*) - 좌측 좌표
            - **_top_** - (*number*) - 상단 좌표
    - **_startDate?_** - (*Date*) - 시작 지점에 해당하는 날짜
    - **_endDate?_** - (*Date*) - 종료 지점에 해당하는 날짜
    - **_tasksBetweenDates?_** - (*Array&lt;Task&gt;*) - 시작 날짜와 종료 날짜 사이의 작업 배열
    - **_tasksInRows?_** - (*Array&lt;Task&gt;*) - 시작 좌표와 종료 좌표 사이를 수직으로 선택한 작업 배열
- <span class="subproperty">**singleRow?**</span> - (*boolean*) - 작업 높이에 해당하는 하나의 행에만 선택을 추가하려면 true
- <span class="subproperty">**ignore?**</span> - (*string*) - CSS 셀렉터. 이 셀렉터와 일치하는 요소에 대해 Drag-n-Drop이 활성화되지 않습니다
- <span class="subproperty">**useKey?**</span> - (*string | boolean*) - 속성이 지정되면 지정된 수정 키를 누른 상태에서만 Drag-n-Drop이 활성화됩니다. 지원 값: "ctrlKey", "shiftKey", "metaKey", "altKey"
- <span class="submethod">**render? (startPoint, endPoint): any**</span> - 드래깅 중에 렌더링되는 요소를 생성하는 함수. 두 개의 매개변수를 받습니다:
    - **_startPoint?_** - (*object*) - 아래 속성을 가진 객체:
        - **_absolute_** - (*object*) - 문서의 좌상단 좌표
            - **_left_** - (*number*) - 좌측 좌표
            - **_top_** - (*number*) - 상단 좌표
        - **_relative_** - (*object*) - viewPort로 사용되는 왼쪽 상단 요소의 좌표
            - **_left_** - (*number*) - 좌측 좌표
            - **_top_** - (*number*) - 상단 좌표
    - **_endPoint?_** - (*object*) - 아래 속성을 가진 객체:
        - **_absolute_** - (*object*) - 문서의 좌상단 좌표
            - **_left_** - (*number*) - 좌측 좌표
            - **_top_** - (*number*) - 상단 좌표
        - **_relative_** - (*object*) - viewPort로 사용되는 왼쪽 상단 요소의 좌표
            - **_left_** - (*number*) - 좌측 좌표
            - **_top_** - (*number*) - 상단 좌표


## 이벤트

다음 이벤트를 viewPort로 전달된 요소에 연결할 수 있습니다(gantt.$task_data는 기본값으로 작업 막대가 있는 타임라인의 일부).

- **onBeforeDrag** - 마우스 버튼을 누른 직후 드래깅을 시작하기 전에 발생합니다
- **onDrag** - 드래그가 시작된 후 마우스 버튼을 놓기 전 매번 발생합니다
- **onBeforeDragEnd** - 마우스 버튼을 놓은 후 렌더링된 요소가 삭제되기 전 및 선택 영역에 들어오는 작업을 검색하기 전에 발생합니다
- **onDragEnd** - 렌더링된 요소를 제거하고 선택 영역에 들어오는 작업을 찾은 후 콜백 함수가 호출되기 전에 발생합니다(지정된 경우)