---
sidebar_label: moveTask
title: moveTask 메서드
description: "작업을 새로운 위치로 이동"
---

# moveTask

### Description

@short: 작업을 새로운 위치로 이동

@signature: moveTask: (sid: string | number, tindex: number, parent?: string | number) =\> boolean | void

### Parameters

- `sid` - (required) *string | number* - 이동할 작업의 ID
- `tindex` - (required) *number* - 이동될 위치의 인덱스 <br/> (브랜치 내의 인덱스)
- `parent`	- (optional) *string | number*		- 부모 ID. 지정되면, <b>tindex</b>는 <br/> <b>'parent'</b> 분기의 인덱스를 참조합니다

### Returns
- `result` - (boolean | void) - 동작이 [onBeforeTaskMove](api/event/onbeforetaskmove.md)에 의해 취소된 경우 `false`를 반환하고, 그렇지 않으면 `undefined`를 반환합니다

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2023", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2023", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.moveTask("t_1", 1); /*!*/
//-> 이러한 이동 후에, 태스크 "t_1"은 루트 레벨을 가집니다
~~~

### Related API
- [getTaskIndex](api/method/gettaskindex.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)