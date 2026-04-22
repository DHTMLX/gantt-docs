---
sidebar_label: getColumnIndex
title: getColumnIndex 메서드
description: "열의 이름으로 열의 인덱스를 반환합니다"
---

# getColumnIndex

### Description

@short: 열의 이름으로 열의 인덱스를 반환합니다

@signature: getColumnIndex: (name: string | number, excludeHidden?: boolean) =\> number

### Parameters

- `name` - (필수) *string | number* - 열의 이름
- `excludeHidden` - (선택적) *boolean* - 숨겨진 열의 인덱스를 건너뜁니다

### Returns
- ` index` - (숫자) - 열의 인덱스

### Example

~~~jsx
var index = gantt.getColumnIndex("start_date"); // => 1
~~~

### Details

`excludeHidden` 매개변수가 *true*로 설정되면, 이 메서드는 설정에서 *hide:true*로 [숨겨진](guides/specifying-columns.md#visibility) 컬럼을 건너뜁니다:

~~~js
gantt.config.columns = [
    {name: "text", label: "Task name", width: "*", tree: true, resize: true },
    {name: "start_date", label: "Start time" },
    {name: "duration", label: "Duration", width: 60, hide:true  }, /*!*/
    {name: "planned_start", label: "Planned start", hide:true  },  /*!*/
    {name: "planned_end", label: "Planned end", width:80, hide:true  }, /*!*/
    {name: "add", label: "", width: 36 }
];
 
gantt.init("gantt_here");

gantt.getColumnIndex("add"); // => 5 /*!*/
gantt.getColumnIndex("add", true); // => 2 /*!*/
~~~