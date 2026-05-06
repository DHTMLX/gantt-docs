---
sidebar_label: getSiblings
title: getSiblings 메서드
description: "지정된 작업의 형제 노드(자신 포함)를 반환합니다"
---

# getSiblings

### Description

@short: 지정된 작업의 형제 노드(자신 포함)를 반환합니다

@signature: getSiblings: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -    작업 ID

### Returns
- ` siblings` - (배열) - 해당 작업의 형제 노드의 ID들

### Example

~~~jsx
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2] /*!*/
~~~

### Details

형제 노드란 같은 트리 레벨에 속한 작업들입니다.

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)