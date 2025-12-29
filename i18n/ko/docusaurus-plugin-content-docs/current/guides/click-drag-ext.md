---
title: "clickDrag 확장 기능"
sidebar_label: "clickDrag 확장 기능"
---

# clickDrag 확장 기능

clickDrag 확장 기능에 대한 자세한 내용은 [DnD로 작업 생성/선택하기](guides/advanced-dnd.md) 문서에서 확인할 수 있습니다.

## 설정 객체

고급 드래그 앤 드롭 기능을 활성화하려면 [click_drag](api/config/click_drag.md) 설정 옵션을 지정하고, 아래 목록에서 원하는 속성을 객체 내에 포함시키세요:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- <span class="subproperty">**className?**</span> -  (*string*) - 선택된 요소에 사용자 지정 CSS 클래스를 적용합니다
- <span class="subproperty">**viewPort?**</span> - (*HTMLElement*) - 이벤트가 바인딩되고 선택이 발생하는 요소입니다
- <span class="subproperty">**useRequestAnimationFrame?**</span> - (*boolean*) - 렌더링 중 requestAnimationFrame 사용 여부를 결정합니다
- <span class="submethod">**callback? (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows): any**</span> - 마우스 버튼이 놓일 때 호출되는 함수입니다. 6개의 파라미터를 받습니다:
    - **_startPoint?_** - (*object*) - 다음과 같은 속성을 포함합니다:
        - **_absolute_** - (*object*) - 문서의 좌상단 기준 좌표
            - **_left_** - (*number*) - 수평 위치
            - **_top_** - (*number*) - 수직 위치
        - **_relative_** - (*object*) - viewPort 요소의 좌상단 기준 좌표
            - **_left_** - (*number*) - 수평 위치
            - **_top_** - (*number*) - 수직 위치
    - **_endPoint?_** - (*object*) - startPoint와 동일한 구조로, 드래그 종료 위치를 나타냅니다
        - **_absolute_** - (*object*) - 문서의 좌상단 기준 좌표
            - **_left_** - (*number*) - 수평 위치
            - **_top_** - (*number*) - 수직 위치
        - **_relative_** - (*object*) - viewPort 요소의 좌상단 기준 좌표
            - **_left_** - (*number*) - 수평 위치
            - **_top_** - (*number*) - 수직 위치
    - **_startDate?_** - (*Date*) - startPoint에 해당하는 날짜
    - **_endDate?_** - (*Date*) - endPoint에 해당하는 날짜
    - **_tasksBetweenDates?_** - (*Array&lt;Task&gt;*) - 시작 및 종료 날짜 사이에 위치한 작업 목록
    - **_tasksInRows?_** - (*Array&lt;Task&gt;*) - 시작 및 종료 좌표 사이에서 수직으로 선택된 작업 목록
- <span class="subproperty">**singleRow?**</span> - (*boolean*) - true로 설정하면 선택이 작업 높이에 맞는 단일 행으로 제한됩니다
- <span class="subproperty">**ignore?**</span> - (*string*) - 드래그 앤 드롭이 활성화되지 않아야 하는 요소의 CSS 선택자
- <span class="subproperty">**useKey?**</span> - (*string | boolean*) - 지정된 수정 키를 누르고 있을 때만 드래그 앤 드롭이 활성화됩니다. 지원하는 키: "ctrlKey", "shiftKey", "metaKey", "altKey"
- <span class="submethod">**render? (startPoint, endPoint): any**</span> - 드래그 중에 표시되는 요소를 반환하는 함수입니다. 두 개의 파라미터를 받습니다:
    - **_startPoint?_** - (*object*) - 다음을 포함합니다:
        - **_absolute_** - (*object*) - 문서의 좌상단 기준 좌표
            - **_left_** - (*number*) - 수평 위치
            - **_top_** - (*number*) - 수직 위치
        - **_relative_** - (*object*) - viewPort 요소의 좌상단 기준 좌표
            - **_left_** - (*number*) - 수평 위치
            - **_top_** - (*number*) - 수직 위치
    - **_endPoint?_** - (*object*) - startPoint와 동일한 구조로, 현재 드래그 위치를 나타냅니다
        - **_absolute_** - (*object*) - 문서 기준 좌표
            - **_left_** - (*number*) - 수평 위치
            - **_top_** - (*number*) - 수직 위치
        - **_relative_** - (*object*) - viewPort 요소 기준 좌표
            - **_left_** - (*number*) - 수평 위치
            - **_top_** - (*number*) - 수직 위치


## 이벤트

아래 이벤트들은 viewPort로 사용되는 요소에 바인딩할 수 있습니다 (기본값은 gantt.$task_data이며, 작업 바가 포함된 타임라인 영역입니다):

- **onBeforeDrag** - 마우스 버튼이 눌린 직후, 드래그가 시작되기 전에 발생합니다
- **onDrag** - 드래그 중 반복적으로 발생하며, 마우스 버튼이 놓이기 전까지 계속됩니다
- **onBeforeDragEnd** - 마우스 버튼이 놓인 후, 드래그로 렌더된 요소가 제거되고 선택된 작업이 식별되기 전에 발생합니다
- **onDragEnd** - 드래그 요소가 제거되고 선택 영역 내 작업이 찾아진 후, callback 함수가 호출되기 전에 발생합니다 (callback이 제공된 경우)

