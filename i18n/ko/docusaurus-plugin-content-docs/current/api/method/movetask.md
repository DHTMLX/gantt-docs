---
sidebar_label: moveTask
title: moveTask method
description: "작업을 다른 위치로 이동합니다."
---

# moveTask

### Description

@short: 작업을 다른 위치로 이동합니다.

@signature: moveTask: (sid: string | number, tindex: number, parent?: string | number) =\> boolean | void

### Parameters

- `sid` - (required) *string | number* -            이동할 작업의 식별자
- `tindex` - (required) *number* - 작업이 배치될 대상 위치 인덱스 <br> (브랜치 내의 인덱스)
- `parent` - (optional) *string | number* -            부모 ID. 제공되는 경우 <b>tindex</b>는 <br> <b>'parent'</b> 브랜치 내의 인덱스를 의미합니다.

### Returns
- ` result` - (boolean | void) - [onBeforeTaskMove](api/event/onbeforetaskmove.md)에서 이동이 취소되면 `false`를 반환하며, 그렇지 않으면 `undefined`를 반환합니다.

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
//-> 이 코드는 "t_1" 작업을 루트 레벨로 이동합니다.
~~~

### Related API
- [getTaskIndex](api/method/gettaskindex.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)

