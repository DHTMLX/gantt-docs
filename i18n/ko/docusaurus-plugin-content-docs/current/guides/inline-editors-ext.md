---
title: "Inline Editors Extension"
sidebar_label: "Inline Editors Extension"
---

# 인라인 에디터 확장

그리드의 인라인 편집에 대한 자세한 내용은 기사 [그리드의 인라인 편집](guides/inline-editing.md)에서 확인하십시오. 

 *inlineEditors* 객체는 다음 API를 제공합니다:

## 메서드

### 작업:

- <span class="submethod">**startEdit (taskId, columnName): void**</span> - 지정된 작업/셀에 에디터를 열고 매핑된 값을 설정하며 에디터에 포커스를 둡니다
    - **_taskId_** - (*number | string*) - 작업 ID
    - **_columnName_** - (*string*) - 열 이름
- <span class="submethod">**show (taskId, columnName): void**</span> - 지정된 작업/셀에 빈 에디터를 엽니다
    - **_taskId_** - (*number | string*) - 작업 ID
    - **_columnName_** - (*string*) - 열 이름
- <span class="submethod">**setValue (): void**</span> - 이미 열려 있는 에디터를 작업의 값으로 채웁니다
- <span class="submethod">**save (): void**</span> - 변경 내용을 저장하고 에디터를 숨깁니다
- <span class="submethod">**hide (): void**</span> - 변경 내용을 저장하지 않고 에디터를 숨깁니다
- <span class="submethod">**focus (): void**</span> - 에디터에 브라우저 포커스를 둡니다
- <span class="submethod">**getState (): object**</span> - 상태 객체를 가져옵니다 (id: taskId, columnName: columnName, placeholder: HTMLElement)
- <span class="submethod">**getValue (): string**</span> - 에디터의 현재 값을 가져옵니다

### 상태:

- <span class="submethod">**isChanged (): boolean**</span> - 에디터의 현재 값이 초기 값과 다른지 확인합니다
- <span class="submethod">**isVisible (): boolean**</span> - 에디터가 열려 있는지 확인합니다

### 이벤트:

- <span class="submethod">**attachEvent (name, handler): string**</span> - inlineEditors 객체에 이벤트 핸들러를 연결합니다
    - **_name_** - (*string*) - 이벤트 핸들러의 이름
    - **_handler_** - (*Function*) - 이벤트가 발생했을 때 호출될 함수
- <span class="submethod">**detachEvent (id): void**</span> - attachEvent() 메서드로 연결된 이벤트 핸들러를 제거합니다
    - **_id_** - (*string*) - 연결된 이벤트 핸들러의 ID


### 내비게이션:

- <span class="submethod">**editNextCell (canChangeRow): void**</span> - 현재 에디터를 저장하고 다음 셀로 에디터를 이동합니다 
    - **_canChangeRow?_**  - (*boolean*) - 마지막 셀 다음의 첫 번째 셀로 이동할 수 있는지 여부를 지정합니다
- <span class="submethod">**editNextRow (skipReadonly): void**</span> - 현재 에디터를 저장하고 아래 작업의 같은 셀에 에디터를 엽니다
    - **_skipReadonly?_**  - (*boolean*) - 읽기 전용 태스크를 건너뛰고 첫 번째 편집 가능한 태스크의 셀에 에디터를 열 수 있는지 여부를 지정합니다. 기본값은 *false*이며, 다음 태스크가 읽기 전용인 경우 에디터를 닫습니다.
- <span class="submethod">**editPrevCell (canChangeRow): void**</span> - 현재 에디터를 저장하고 이전 셀로 에디터를 이동합니다 
    - **_canChangeRow?_**  - (*boolean*) - 현재 행의 첫 셀에 도달한 후 위 행의 마지막 셀로 이동할 수 있는지 여부를 지정합니다
- <span class="submethod">**editPrevRow (skipReadonly): void**</span> - 현재 에디터를 저장하고 위 작업의 같은 셀에 에디터를 엽니다
    - **_skipReadonly?_**  - (*boolean*) - 읽기 전용 태스크를 건너뛰고 첫 번째 편집 가능한 태스크의 셀에 에디터를 열 수 있는지 여부를 지정합니다. 기본값은 *false*이며, 이전 태스크가 읽기 전용인 경우 에디터를 닫습니다.
- <span class="submethod">**getFirstCell (): string**</span> - 그리드에서 편집 가능한 첫 번째 열의 이름을 가져옵니다
- <span class="submethod">**getLastCell (): string**</span> - 그리드에서 편집 가능한 마지막 열의 이름을 가져옵니다
- <span class="submethod">**getNextCell (direction): string | null**</span> - 다음 편집 가능한 열의 이름을 반환합니다
    - **_direction_**  - (*number*) - 다음 셀을 어떤 방향으로 순회할지 지정합니다. `1` - 오른쪽, `-1` - 왼쪽


### 도우미:

- <span class="submethod">**locateCell (node): object | null**</span> - 제공된 DOM 요소가 태스크 셀 객체인지 확인하고, 그렇다면 에디터 상태 객체를 반환합니다: (id: taskId, columnName: columnName)
    - **_node_** - (*HTMLElement*) - HTML 요소


### 마우스/키보드 매핑:

- <span class="submethod">**setMapping (mapping): void**</span> - 매핑 객체를 설정합니다
    - **_mapping_** - (*object*) - 매핑 구성 객체:
        - **_init_** - (*Function*): void - 매핑을 초기화하는 메서드
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 객체
            - **_grid_** - (*any*) - 그리드 레이아웃 뷰
        - **_onShow_** - (*Function*): void - 인라인 에디터가 열릴 때 호출될 메서드
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 객체
            - **_node_** - (*HTMLElement*) - HTML 요소
            - **_grid_** - (*any*) - 그리드 레이아웃 뷰
        - **_onHide_** - (*Function*): void - 인라인 에디터가 닫힐 때 호출될 메서드
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 객체
            - **_node_** - (*HTMLElement*) - HTML 요소
            - **_grid_** - (*any*) - 그리드 레이아웃 뷰
        - **_destroy_** - (*Function*): void - 매핑을 파괴하는 메서드
- <span class="submethod">**getMapping (): object**</span> - 현재 적용된 매핑 객체를 반환합니다


## 이벤트

### <span class="eventname">onBeforeEditStart</span>

인수:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집된 작업의 id
    - **_columnName_** - (*string*) - 열 이름
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

인수:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집된 작업의 id
    - **_columnName_** - (*string*) - 열 이름
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~

### <span class="eventname">onBeforeSave</span>

에디터가 닫히고 변경 내용이 저장되기 직전에 발생

인수:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집된 작업의 id
    - **_columnName_** - (*string*) - 열 이름
    - **_oldValue_** - (*any*) - 에디터의 초기 값
    - **_newValue_** - (*any*) - 현재 에디터의 값, 수정 가능
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

에디터로부터 작업이 업데이트된 후에 발생

인수:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집된 작업의 id
    - **_columnName_** - (*string*) - 열 이름
    - **_oldValue_** - (*any*) - 에디터의 초기 값
    - **_newValue_** - (*any*) - 현재 에디터의 값
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

인라인 에디터가 숨겨진 직후에 발생

인수:
<span class="eventarguments">

- **_state_** - (*object*) - 에디터 상태 객체
    - **_id_** - (*number | string*) - 편집된 작업의 id
    - **_columnName_** - (*string*) - 열 이름
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~