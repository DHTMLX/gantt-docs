---
title: "키보드 네비게이션 확장"
sidebar_label: "키보드 네비게이션 확장"
---

키보드 네비게이션 확장
==========================

키보드 네비게이션 확장에 대한 자세한 정보는 [키보드 내비게이션](guides/keyboard-navigation.md) 문서에서 확인할 수 있습니다. 


*keyboardNavigation* 객체는 다음과 같은 API를 제공합니다:

메서드
----------

- <span class="submethod">**focus (config): void**</span> - 그리드 내의 임의의 셀을 선택할 수 있도록 해줍니다. 이 기능은 Grid에 이미 포커스가 있을 때만 동작합니다.

    - **_config_** - (*object*) - 설정 객체
        - **_id_** - (*number | string*) - 편집 중인 작업의 ID
        - **_column_** - (*string*) - 컬럼 이름
        - **_type_** - (*string*) - 범위 타입을 정의합니다. 사용 가능한 값: "gantt", "taskRow", "taskCell", "headerCell"

~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~


**Related example:** [Selecting a grid cell](https://snippet.dhtmlx.com/v5ffah8w)


- <span class="submethod">**getActiveNode (): boolean | void**</span> - 현재 활성화된 셀에 대한 정보를 반환합니다.

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~


**Related example:** [Getting the active cell](https://snippet.dhtmlx.com/dznf7xjw)

