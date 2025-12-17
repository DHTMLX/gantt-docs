---
sidebar_label: getSiblings
title: getSiblings method
description: "주어진 작업과 그 작업 자체를 포함하는 형제 작업들을 제공합니다."
---

# getSiblings

### Description

@short: 주어진 작업과 그 작업 자체를 포함하는 형제 작업들을 제공합니다.

@signature: getSiblings: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -    작업 ID

### Returns
- ` siblings` - (array) - 작업의 형제 작업 ID들을 포함하는 배열

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

형제 작업들은 작업 계층 구조에서 동일한 레벨을 공유하는 작업들입니다.

### Related API
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [getParent](api/method/getparent.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

