---
title: "키보드 네비게이션 확장"
sidebar_label: "키보드 네비게이션 확장"
---

# 키보드 네비게이션 확장

다음 기사 [키보드 내비게이션](guides/keyboard-navigation.md)에서 키보드 네비게이션 확장에 대한 자세한 내용을 확인하십시오.

*keyboardNavigation* 객체는 아래 API를 가지고 있습니다:

## 메서드

- <span class="submethod">**focus (config): void**</span> - 그리드의 어떤 셀이라도 선택할 수 있게 해줍니다. 그리드에 이미 포커스가 있는 경우에만 작동합니다

    - **_config_** - (*object*) - 설정 객체
        - **_id_** - (*number | string*) - 편집된 작업의 ID
        - **_column_** - (*string*) - 열 이름
        - **_type_** - (*string*) - 범위의 유형. 가능한 값: "gantt", "taskRow", "taskCell", "headerCell"


~~~js
gantt.ext.keyboardNavigation.focus({type:"taskCell",id:"taskId",column:"columnName"});
~~~

**Related sample** [그리드 셀 선택하기](https://snippet.dhtmlx.com/v5ffah8w)

- <span class="submethod">**getActiveNode (): boolean | void**</span> - 활성 셀에 대한 정보를 얻을 수 있습니다

~~~js
var active_node = gantt.ext.keyboardNavigation.getActiveNode();
// -> {type: "taskCell", id: "10", column: "text"}
~~~

**Related sample** [활성 셀 얻기](https://snippet.dhtmlx.com/dznf7xjw)