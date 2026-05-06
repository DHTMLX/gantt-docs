---
sidebar_label: click_drag
title: click_drag config
description: "고급 drag-n-drop 기능 활성화"
---

# click_drag

### Description

@short: 고급 drag-n-drop 기능 활성화

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

**Default value:** **기본값:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Details

:::note
이 설정은 **click_drag** 확장에 정의되어 있으므로 [click_drag](guides/extensions-list.md#advanced-drag-n-drop) 플러그인을 [gantt.plugins](api/method/plugins.md) 메서드를 사용해 활성화해야 합니다. 자세한 내용은 [DnD로 작업 생성/선택](guides/advanced-dnd.md) 문서를 참고하세요. 
:::

The **click_drag** extension allows:

- 드래그-앤-드롭으로 작업 생성
- 드래그-앤-드롭으로 미배정 작업의 시간 설정
- 드래그-앤-드롭으로 작업 선택
- 드래그-앤-드롭으로 분할 작업의 일부 생성 (PRO 버전)

The **gantt.config.click_drag** object includes the following properties:

- **className** -  (*string*) 선택된 요소에 대해 커스텀 CSS 클래스를 설정합니다
- **viewPort** - (*HTMLElement*) 이벤트를 연결하고 선택할 요소
- **useRequestAnimationFrame** - (*boolean*) 렌더링 중에 requestAnimationFrame을 사용할지 여부를 정의합니다
- **callback** - (*function*) - 마우스 버튼을 놓을 때 호출되는 함수. 6개의 매개변수를 받습니다:
    - **startPoint** - (*object*) - 다음 타입의 객체: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
      여기서 absolute 는 문서의 왼쪽 상단 모서리의 좌표이고, relative 는 뷰포트로 사용되는 왼쪽 상단 요소의 좌표입니다
    - **endPoint** - (*object*) - 다음 타입의 객체: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
      여기서 absolute 는 문서의 왼쪽 상단 모서리의 좌표이고, relative 는 뷰포트로 사용되는 왼쪽 상단 요소의 좌표입니다
     - **startDate** - (*Date*) 시작 지점에 해당하는 날짜
    - **endDate** - (*Date*) 종료 지점에 해당하는 날짜
    - **tasksBetweenDates** - (*array*) 시작 날짜와 종료 날짜 사이의 작업 배열
    - **tasksInRows** - (*array*) 시작 좌표와 종료 좌표 사이를 수직으로 선택된 작업 배열
- **singleRow** - (*boolean*) 작업 높이에 해당하는 한 행에만 선택을 추가하려면 true
- **ignore** - (*string*) CSS 선택자. 이 선택자와 일치하는 요소에 대해서는 Drag-n-drop이 활성화되지 않습니다
- **useKey** - (*string|boolean*) 속성이 지정되면, 지정된 수정 키가 눌려 있을 때만 Drag-n-drop이 활성화됩니다. 지원 값: "ctrlKey", "shiftKey", "metaKey", "altKey"

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    ignore: ".gantt_task_line, .gantt_marker_content, .gantt_task_link",
    useKey: "ctrlKey"
};
~~~

- **render** - (*function*) 드래그 중 렌더링될 요소를 생성하는 함수. 두 개의 매개변수를 받습니다: 
    - **startPoint** - (*object*) - 타입이 다음과 같은 객체: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  여기서 absolute 는 문서의 왼쪽 상단 모서리의 좌표이고, relative 는 뷰포트로 사용되는 왼쪽 상단 요소의 좌표
    - **endPoint** - (*object*) - 타입이 다음과 같은 객체: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  여기서 absolute 는 문서의 왼쪽 상단 모서리의 좌표이고, relative 는 뷰포트로 사용되는 왼쪽 상단 요소의 좌표

다음은 **render** 함수 사용 예시입니다:

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
- [드래그-앤-드롭으로 작업 생성/선택](guides/advanced-dnd.md)