---
sidebar_label: drag_link_class
title: drag_link_class 템플릿
description: "사용자가 링크를 드래그할 때 표시되는 팝업에 적용될 CSS 클래스를 지정합니다."
---

# drag_link_class

### Description

@short: 사용자가 링크를 드래그할 때 표시되는 팝업에 적용될 CSS 클래스를 지정합니다.

@signature: drag_link_class: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) => string | void;

### Parameters

- `from` - (필수) *string | number* - 소스 태스크의 ID
- `from_start` - (필수) *boolean* - <i>true</i>, 소스 태스크의 시작점에서 링크가 드래그되는 경우, <i>false</i> - <br/> 소스 태스크의 끝에서의 경우
- `to` - (필수) *string | number* - 대상 태스크의 ID( 'null' atau 'undefined', 대상 태스크가 아직 지정되지 않은 경우)
- `to_start` - (필수) *boolean* - <i>true</i>, 대상 태스크의 시작점으로 링크가 드래그되는 경우, <i>false</i> - <br/> 대상 태스크의 끝에서의 경우

### Returns
- `text` - (string | void) - 해당 항목에 대한 CSS 클래스

### Example

~~~jsx
gantt.templates.drag_link_class = function(from, from_start, to, to_start) {
    let add = "";
    if(from && to){
        const allowed = gantt.isLinkAllowed(from, to, from_start, to_start);
        add = (allowed ? "gantt_link_allow" : "gantt_link_deny");
    }
    return `gantt_link_tooltip ${add}`;
};
~~~

### Related Guides
- [의존성 링크 템플릿들](guides/dependency-templates.md)