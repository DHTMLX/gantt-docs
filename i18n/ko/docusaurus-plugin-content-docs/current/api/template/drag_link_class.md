---
sidebar_label: drag_link_class
title: drag_link_class template
description: "사용자가 링크를 드래그할 때 표시되는 팝업에 적용되는 CSS 클래스를 정의합니다."
---

# drag_link_class

### Description

@short: 사용자가 링크를 드래그할 때 표시되는 팝업에 적용되는 CSS 클래스를 정의합니다.

@signature: drag_link_class: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string | void;

### Parameters

- `from` - (required) *string | number* - 소스 작업의 ID
- `from_start` - (required) *boolean* - 소스 작업의 시작 부분에서 링크가 드래그되는 경우 <i>true</i>, 끝 부분에서인 경우 <i>false</i>
- `to` - (required) *string | number* - 대상 작업의 ID (대상 작업이 아직 설정되지 않은 경우 'null' 또는 'undefined')
- `to_start` - (required) *boolean* - 대상 작업의 시작 부분으로 링크가 드래그되는 경우 <i>true</i>, 끝 부분으로인 경우 <i>false</i>

### Returns
- ` text` - (string | void) - 해당 항목에 적용할 CSS 클래스

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
- [의존성 링크 템플릿](guides/dependency-templates.md)
