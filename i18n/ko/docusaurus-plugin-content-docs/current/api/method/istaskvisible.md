---
sidebar_label: isTaskVisible
title: isTaskVisible method
description: "지정된 작업이 현재 간트 차트에 표시되고 있는지 여부를 결정합니다."
---

# isTaskVisible

### Description

@short: 지정된 작업이 현재 간트 차트에 표시되고 있는지 여부를 결정합니다.

@signature: isTaskVisible: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -       작업의 고유 식별자

### Returns
- ` isvisible` - (boolean) - <i>true</i> 작업이 현재 간트 차트에 표시되고 있으면; 그렇지 않으면 <i>false</i>

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
 
gantt.isTaskVisible("t_1"); // ->true  /*!*/
~~~
