---
sidebar_label: getSelectedId
title: getSelectedId method
description: "현재 선택된 작업의 id를 제공합니다"
---

# getSelectedId

### Description

@short: 현재 선택된 작업의 id를 제공합니다

@signature: getSelectedId: () =\> string

### Returns
- ` id` - (string) - 선택된 작업의 id를 반환하며, Gantt 차트에서 작업이 선택되지 않은 경우 <i>null</i>을 반환합니다

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8, parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8, parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); 
gantt.getSelectedId(); // -> "t_1" /*!*/
~~~

### Related API
- [selectTask](api/method/selecttask.md)
- [unselectTask](api/method/unselecttask.md)

