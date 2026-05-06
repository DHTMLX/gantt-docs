--- 
sidebar_label: isCriticalLink
title: isCriticalLink method
description: "지정된 링크가 중요한지 확인합니다"
---

# isCriticalLink

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### Description

@short: 지정된 링크가 중요한지 확인합니다

@signature: isCriticalLink: (link: Link) =\> boolean

### Parameters

- `link` - (필수) *Link* - 링크 객체

### Returns
- ` value` - (boolean) - 'true'이면 지정된 링크가 중요한 경우, 그렇지 않으면 'false'입니다

### Example

~~~jsx
const tasks = {
    data:[
      {id:1, text:"Project #1", start_date:"01-04-2023", duration:18, type:"project"},
      {id:2, text:"Task #1", start_date:"02-04-2023", duration:8, parent:1},
      {id:3, text:"Task #2", start_date:"13-04-2023", duration:8, parent:1}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
    ]
};

gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalLink(gantt.getLink(2));// ->'false' /*!*/
~~~

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
이 메서드는 **critical_path** 확장에 정의되어 있으므로 [critical_path](guides/extensions-list.md#critical-path) 플러그인을 활성화해야 합니다. 자세한 내용은 [크리티컬 경로](guides/critical-path.md) 기사에서 확인하십시오.
:::

### Related API
- [highlight_critical_path](api/config/highlight_critical_path.md)
- [isCriticalTask](api/method/iscriticaltask.md)

### Related Guides
- [크리티컬 경로](guides/critical-path.md)