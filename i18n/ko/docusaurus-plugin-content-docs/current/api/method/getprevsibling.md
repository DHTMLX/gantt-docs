---
sidebar_label: getPrevSibling
title: getPrevSibling method
description: "동일 레벨의 이전 작업의 ID를 반환합니다"
---

# getPrevSibling

### Description

@short: 같은 레벨의 이전 작업의 ID를 반환합니다

@signature: getPrevSibling: (id: string | number) =\> string | number

### Parameters

- `id` - (필수) *string | number* -  작업의 ID

### Returns
- ` prevSibling` - (string, number) - 이전 형제의 ID

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
gantt.getPrevSibling("t_1"); ->  null (if no previous sibling) /*!*/
~~~

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getSiblings](api/method/getsiblings.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

### Related Guides
- [Task Parent/Child](guides/task-tree-operations.md)