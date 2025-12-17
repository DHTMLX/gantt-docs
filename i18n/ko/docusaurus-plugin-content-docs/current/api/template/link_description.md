---
sidebar_label: link_description
title: link_description template
description: "링크의 '삭제' 확인 창 헤더에 표시될 텍스트를 설정합니다."
---

# link_description

### Description

@short: 링크의 "삭제" 확인 창 헤더에 표시될 텍스트를 설정합니다.

@signature: link_description: (link: any) =\> string;

### Parameters

- `link` - (required) *object* - 링크 객체

### Returns
- ` text` - (string) - gantt에 렌더링될 html 텍스트

### Example

~~~jsx
gantt.templates.link_description = function(link){
    const from = gantt.getTask(link.source);
    const to = gantt.getTask(link.target);
    const types = gantt.config.links;

    const from_start = link.type == types.start_to_start;
    const to_start = link.type == types.finish_to_start ||  
                    link.type == types.start_to_start;
    return `From <b>${from.text}</b> ${(from_start?"Start":"End")}<br/>
To <b>${to.text}</b> ${(to_start ? "Start" : "End")}<br/>`;
};
~~~

### Related Guides
- [의존성 링크 템플릿](guides/dependency-templates.md)
