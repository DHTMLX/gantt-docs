---
sidebar_label: link_class
title: link_class template
description: "링크에 할당되는 CSS 클래스를 정의합니다."
---

# link_class

### Description

@short: 링크에 할당되는 CSS 클래스를 정의합니다.

@signature: link_class: (link: Link) =\> string | void;

### Parameters

- `link` - (required) *Link* - 링크 객체

### Returns
- ` text` - (string | void) - 해당 항목에 적용할 CSS 클래스

### Example

~~~jsx
gantt.templates.link_class = function(link){
    return "";
};
~~~

### Related Guides
- [의존성 링크 템플릿](guides/dependency-templates.md)
