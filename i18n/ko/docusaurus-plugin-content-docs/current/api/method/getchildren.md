---
sidebar_label: getChildren
title: getChildren method
description: "주어진 부모 브랜치의 직속 자식 작업들을 가져옵니다."
---

# getChildren

### Description

@short: 주어진 부모 브랜치의 직속 자식 작업들을 가져옵니다.

@signature: getChildren: (id: string | number) =\> any[]

### Parameters

- `id` - (required) *string | number* -        부모 브랜치의 id

### Returns
- ` ids` - (array) - 자식 작업들의 id를 담고 있는 배열

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

gantt.getChildren("p_1");//->["t_1", "t_2"] /*!*/
~~~

### Related samples
- [Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

특정 작업의 자식 작업들을 순회하는 또 다른 방법은 [eachTask](api/method/eachtask.md)를 사용하는 것입니다.

### Related API
- [hasChild](api/method/haschild.md)
- [getNext](api/method/getnext.md)
- [getPrev](api/method/getprev.md)
- [getSiblings](api/method/getsiblings.md)
- [getNextSibling](api/method/getnextsibling.md)
- [getPrevSibling](api/method/getprevsibling.md)
- [eachTask](api/method/eachtask.md)

### Related Guides
- [트리 컬럼 구성하기](guides/tree-column.md)

