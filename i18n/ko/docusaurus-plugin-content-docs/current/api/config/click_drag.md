---
sidebar_label: click_drag
title: click_drag config
description: "고급 드래그 앤 드롭 활성화"
---

# click_drag

### Description

@short: 고급 드래그 앤 드롭 활성화

@signature: click_drag: undefined | ClickDrag

### Example

~~~jsx
gantt.config.click_drag = {
    callback: function(
        startPosition,
        endPosition,
        startDate,
        endDate,
        tasksBetween,
        rowsBetween
    ){
        var parentId = gantt.config.root_id;
        if(rowsBetween.length){
            parentId = rowsBetween[0].id;
        }

        gantt.createTask({
            text: "New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parentId);

    },
    singleRow: true
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Details

:::note
 이 설정은 **click_drag** 확장의 일부이므로, 반드시 [gantt.plugins](api/method/plugins.md) 메서드를 통해 [click_drag](guides/extensions-list.md#advanceddragndrop) 플러그인을 활성화해야 합니다. 자세한 내용은 [DnD로 작업 생성/선택하기](guides/advanced-dnd.md) 문서를 참고하세요. 
:::

**click_drag** 확장은 다음 기능을 제공합니다:

- 드래그 앤 드롭을 통한 작업 생성
- 드래그 앤 드롭을 이용한 미할당 작업의 시간 설정
- 드래그 앤 드롭을 통한 작업 선택
- 드래그 앤 드롭으로 분할 작업의 일부 생성 (PRO 버전)

**gantt.config.click_drag** 객체는 다음 속성을 가집니다:

- **className** -  (*string*) 선택된 요소에 적용할 사용자 정의 CSS 클래스 지정
- **viewPort** - (*HTMLElement*) 이벤트가 연결되고 선택이 발생하는 요소 정의
- **useRequestAnimationFrame** - (*boolean*) 렌더링 시 requestAnimationFrame 사용 여부 결정
- **callback** - (*function*) 마우스 버튼을 놓을 때 호출됩니다. 6개의 파라미터를 받습니다:
    - **startPoint** - (*object*) 다음과 같은 구조의 객체: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
  여기서 absolute는 문서의 좌상단을 기준으로 한 좌표이며, relative는 viewPort 요소를 기준으로 한 좌표입니다.
    - **endPoint** - (*object*) startPoint와 동일한 형식의 객체
     - **startDate** - (*Date*) 드래그 시작 위치에 해당하는 날짜
    - **endDate** - (*Date*) 드래그 종료 위치에 해당하는 날짜
    - **tasksBetweenDates** - (*array*) 시작일과 종료일 사이에 있는 작업들
    - **tasksInRows** - (*array*) 시작과 종료의 세로 좌표 사이에서 선택된 작업들
- **singleRow** - (*boolean*) true면 선택이 작업 높이에 맞는 단일 행으로 제한됨
- **ignore** - (*string*) 드래그 앤 드롭이 비활성화될 요소에 대한 CSS 선택자
- **useKey** - (*string|boolean*) 설정 시 지정된 수정키가 눌렸을 때만 드래그 앤 드롭이 활성화됩니다. 지원 키는 "ctrlKey", "shiftKey", "metaKey", "altKey" 입니다.

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    ignore: ".gantt_task_line, .gantt_marker_content, .gantt_task_link",
    useKey: "ctrlKey"
};
~~~

- **render** - (*function*) 드래그 중 표시할 요소를 생성합니다. 두 개의 인자를 받습니다:
    - **startPoint** - (*object*) 다음과 같은 구조:<br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
  absolute와 relative는 위에서 설명한 좌표입니다.
    - **endPoint** - (*object*) startPoint와 동일한 형식

**render** 함수의 예시 구현:

~~~js
var node;
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true,
    render: function(start, end){
        if(!(node && node.parentNode)){
            node = document.createElement("div");
        }
        var left = Math.min(start.relative.left, end.relative.left);

        node.style.top = (start.relative.top - gantt.config.row_height) + "px";
        node.style.left = left + "px";
        node.style.width = Math.abs(start.relative.left - end.relative.left) + "px";
        node.style.height = gantt.config.row_height + "px";
        node.style.position = "absolute";
        return node;
    }
};
~~~

### Related Guides
- [DnD로 작업 생성/선택하기](guides/advanced-dnd.md)

