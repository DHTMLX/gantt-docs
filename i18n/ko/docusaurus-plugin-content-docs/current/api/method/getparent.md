---
sidebar_label: getParent
title: getParent method
description: "부모 작업의 id를 가져옵니다"
---

# getParent

### Description

@short: 부모 작업의 id를 가져옵니다

@signature: getParent: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    작업의 id

### Returns
- ` id` - (string | number) - 부모 작업의 id를 반환합니다. 지정한 작업에 부모가 없으면 루트의 id를 반환합니다

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

gantt.getParent("t_1"); //-> "p_1" /*!*/
gantt.getParent("p_1"); //-> 0 (기본 루트 id) /*!*/
~~~

### Related API
- [root_id](api/config/root_id.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)
- [getSiblings](api/method/getsiblings.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)

