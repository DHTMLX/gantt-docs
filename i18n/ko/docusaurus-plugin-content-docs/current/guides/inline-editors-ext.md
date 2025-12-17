---
title: "Inline Editors Extension"
sidebar_label: "Inline Editors Extension"
---

Inline Editors Extension
========================

Inline editors 확장에 대한 자세한 정보는 [그리드에서 인라인 편집](guides/inline-editing.md) 문서에서 확인하실 수 있습니다. 

 *inlineEditors* 객체는 다음과 같은 API를 제공합니다:

## 메서드

### 동작:

- <span class="submethod">**startEdit (taskId, columnName): void**</span> - 지정된 작업과 셀에 대한 에디터를 열고, 매핑된 값으로 채운 뒤 에디터에 포커스를 맞춥니다.
    - **_taskId_** - (*number | string*) - 작업 ID
    - **_columnName_** - (*string*) - 컬럼 이름
- <span class="submethod">**show (taskId, columnName): void**</span> - 지정된 작업과 셀에 빈 에디터를 엽니다.
    - **_taskId_** - (*number | string*) - 작업 ID
    - **_columnName_** - (*string*) - 컬럼 이름
- <span class="submethod">**setValue (): void**</span> - 열린 에디터를 작업의 값으로 채웁니다.
- <span class="submethod">**save (): void**</span> - 변경 사항을 저장하고 에디터를 닫습니다.
- <span class="submethod">**hide (): void**</span> - 변경 사항을 저장하지 않고 에디터를 닫습니다.
- <span class="submethod">**focus (): void**</span> - 에디터에 포커스를 맞춥니다.
- <span class="submethod">**getState (): object**</span> - 상태 객체를 반환합니다. (id: taskId, columnName: columnName, placeholder: HTMLElement)
- <span class="submethod">**getValue (): string**</span> - 에디터의 현재 값을 반환합니다.

### 상태:

- <span class="submethod">**isChanged (): boolean**</span> - 에디터의 현재 값이 초기 값과 다른지 여부를 확인합니다.
- <span class="submethod">**isVisible (): boolean**</span> - 에디터가 현재 열려있는지 여부를 확인합니다.

### 이벤트:

- <span class="submethod">**attachEvent (name, handler): string**</span> - inlineEditors 객체에 이벤트 핸들러를 추가합니다.
    - **_name_** - (*string*) - 이벤트 이름
    - **_handler_** - (*Function*) - 이벤트 발생 시 실행할 콜백 함수
- <span class="submethod">**detachEvent (id): void**</span> - 이전에 추가한 이벤트 핸들러를 제거합니다.
    - **_id_** - (*string*) - 이벤트 핸들러의 ID

### 네비게이션:

- <span class="submethod">**editNextCell (canChangeRow): void**</span> - 현재 에디터를 저장하고 다음 셀로 이동합니다.
    - **_canChangeRow?_**  - (*boolean*) - 현재 행의 마지막 셀 이후에 다음 행의 첫 번째 셀로 이동할 수 있는지 여부
- <span class="submethod">**editNextRow (skipReadonly): void**</span> - 현재 에디터를 저장하고 아래 작업의 같은 셀에 에디터를 엽니다.
    - **_skipReadonly?_**  - (*boolean*) - true일 경우 읽기 전용 작업을 건너뛰고 아래에서 첫 번째로 편집 가능한 작업에 에디터를 엽니다. false(기본값)이면 다음 작업이 읽기 전용일 때 에디터를 닫습니다.
- <span class="submethod">**editPrevCell (canChangeRow): void**</span> - 현재 에디터를 저장하고 이전 셀로 이동합니다.
    - **_canChangeRow?_**  - (*boolean*) - 현재 행의 첫 번째 셀 이후에 이전 행의 마지막 셀로 이동할 수 있는지 여부
- <span class="submethod">**editPrevRow (skipReadonly): void**</span> - 현재 에디터를 저장하고 위 작업의 같은 셀에 에디터를 엽니다.
    - **_skipReadonly?_**  - (*boolean*) - true일 경우 읽기 전용 작업을 건너뛰고 위에서 첫 번째로 편집 가능한 작업에 에디터를 엽니다. false(기본값)이면 이전 작업이 읽기 전용일 때 에디터를 닫습니다.
- <span class="submethod">**getFirstCell (): string**</span> - 그리드에서 첫 번째로 편집 가능한 컬럼의 이름을 반환합니다.
- <span class="submethod">**getLastCell (): string**</span> - 그리드에서 마지막으로 편집 가능한 컬럼의 이름을 반환합니다.
- <span class="submethod">**getNextCell (direction): string | null**</span> - 다음으로 편집 가능한 컬럼의 이름을 반환합니다.
    - **_direction_**  - (*number*) - 이동 방향: 오른쪽은 `1`, 왼쪽은 `-1`

### 헬퍼:

- <span class="submethod">**locateCell (node): object | null**</span> - 지정된 DOM 요소가 작업 셀인지 확인하고, 그렇다면 에디터 상태 객체를 반환합니다: (id: taskId, columnName: columnName)
    - **_node_** - (*HTMLElement*) - HTML 요소

### 마우스/키보드 매핑:

- <span class="submethod">**setMapping (mapping): void**</span> - 매핑 구성 객체를 설정합니다.
    - **_mapping_** - (*object*) - 매핑을 정의하는 객체:
        - **_init_** - (*Function*): void - 매핑을 초기화
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 객체
            - **_grid_** - (*any*) - Grid 레이아웃 뷰
        - **_onShow_** - (*Function*): void - 인라인 에디터가 열릴 때 호출
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 객체
            - **_node_** - (*HTMLElement*) - HTML 요소
            - **_grid_** - (*any*) - Grid 레이아웃 뷰
        - **_onHide_** - (*Function*): void - 인라인 에디터가 닫힐 때 호출
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 객체
            - **_node_** - (*HTMLElement*) - HTML 요소
            - **_grid_** - (*any*) - Grid 레이아웃 뷰
        - **_destroy_** - (*Function*): void - 매핑을 정리
- <span class="submethod">**getMapping (): object**</span> - 현재 적용된 매핑 객체를 반환합니다.

## 이벤트

### <span class="eventname">onBeforeEditStart</span>

인자:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집 중인 작업의 ID
    - **_columnName_** - (*string*) - 컬럼 이름
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
   return true;
});
~~~

### <span class="eventname">onEditStart</span>

인자:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집 중인 작업의 ID
    - **_columnName_** - (*string*) - 컬럼 이름
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~

### <span class="eventname">onBeforeSave</span>

에디터가 닫히고 변경 사항을 저장하기 직전에 발생합니다.

인자:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집 중인 작업의 ID
    - **_columnName_** - (*string*) - 컬럼 이름
    - **_oldValue_** - (*any*) - 에디터의 초기 값
    - **_newValue_** - (*any*) - 에디터의 현재 값(수정 가능)
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
   return true;
});
~~~

### <span class="eventname">onSave</span>

에디터에서 작업이 업데이트된 후 발생합니다.

인자:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집 중인 작업의 ID
    - **_columnName_** - (*string*) - 컬럼 이름
    - **_oldValue_** - (*any*) - 에디터의 초기 값
    - **_newValue_** - (*any*) - 에디터의 현재 값
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
});
~~~

### <span class="eventname">onEditEnd</span>

인라인 에디터가 닫힌 후 발생합니다.

인자:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집 중인 작업의 ID
    - **_columnName_** - (*string*) - 컬럼 이름
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~
