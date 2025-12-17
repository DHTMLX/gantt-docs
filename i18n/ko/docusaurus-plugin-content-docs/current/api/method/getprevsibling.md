---
sidebar_label: getPrevSibling
title: getPrevSibling method
description: "같은 레벨에 있는 이전 작업의 id를 가져옵니다"
---

# getPrevSibling

### Description

@short: 같은 레벨에 있는 이전 작업의 id를 가져옵니다

@signature: getPrevSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (required) *string | number* -    작업의 id

### Returns
- ` prevSibling` - (string, number) - 이전 형제 작업의 id

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
 
gantt.getPrevSibling("t_2"); ->  "t_1" /*!*/
gantt.getPrevSibling("t_1"); ->  null (이전 형제 작업이 없을 경우) /*!*/
~~~

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getSiblings](api/method/getsiblings.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)

