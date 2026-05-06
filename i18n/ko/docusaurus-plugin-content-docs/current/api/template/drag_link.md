---
sidebar_label: drag_link
title: drag_link template
description: "사용자가 새로운 의존성 링크를 생성할 때 표시되는 툴팁의 텍스트를 지정합니다"
---

# drag_link

### Description

@short: 사용자가 새로운 의존성 링크를 만들 때 표시되는 툴팁의 텍스트를 지정합니다

@signature: drag_link: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string;

### Parameters

- `from` - (required) *string | number* - 원본 작업의 ID
- `from_start` - (required) *boolean* - <i>true</i>, 소스 작업의 시작 부분에서 드래그 중인 경우, <i>false</i> - 소스 작업의 끝에서 드래그 중인 경우
- `to` - (required) *string | number* - 타깃 작업의 ID( 아직 타깃 작업이 지정되지 않은 경우 'null' 또는 'undefined')
- `to_start` - (required) *boolean* - <i>true</i>, 타깃 작업의 시작 부분으로 링크가 드래그될 때, <i>false</i> - 타깃 작업의 끝으로 드래그될 때 <br/>

### Returns
- ` text` - (string) - 간트 차트에 렌더링될 HTML 텍스트

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
