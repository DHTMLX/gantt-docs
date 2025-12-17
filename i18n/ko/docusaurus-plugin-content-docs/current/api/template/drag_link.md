---
sidebar_label: drag_link
title: drag_link template
description: "새로운 의존성 링크가 생성될 때 표시되는 tooltip 텍스트를 정의합니다."
---

# drag_link

### Description

@short: 새로운 의존성 링크가 생성될 때 표시되는 tooltip 텍스트를 정의합니다.

@signature: drag_link: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string;

### Parameters

- `from` - (required) *string | number* - 출발 작업의 ID
- `from_start` - (required) *boolean* - 출발 작업의 시작 부분에서 링크가 드래그된 경우 <i>true</i>, 끝 부분에서 드래그된 경우 <i>false</i>
- `to` - (required) *string | number* - 목표 작업의 ID (목표 작업이 아직 지정되지 않은 경우 'null' 또는 'undefined')
- `to_start` - (required) *boolean* - 목표 작업의 시작 부분으로 링크가 드래그된 경우 <i>true</i>, 끝 부분으로 드래그된 경우 <i>false</i>

### Returns
- ` text` - (string) - gantt에 표시될 html 텍스트

### Example

~~~jsx
gantt.templates.drag_link = function(from, from_start, to, to_start) {
    const sourceTask = gantt.getTask(from);

    let text = `From:<b> ${sourceTask.text}</b> ${(from_start?"Start":"End")}<br/>`;
    if(to){
        const targetTask = gantt.getTask(to);
        text += `To:<b> ${targetTask.text}</b> ${(to_start?"Start":"End")}<br/>`;
    }
    return text;
};
~~~

### Related Guides
- [의존성 링크 템플릿](guides/dependency-templates.md)
