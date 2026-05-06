---
sidebar_label: link_class
title: link_class 템플릿
description: "링크에 적용될 CSS 클래스를 지정합니다"
---

# link_class

### Description

@short: 링크가 적용될 CSS 클래스를 지정합니다

@signature: link_class: (link: Link) => string | void;

### Parameters

- `link` - (required) *Link* - 링크 객체

### Returns
- ` text` - (string | void) - 해당 항목의 CSS 클래스

### Example

~~~jsx
gantt.templates.link_class = function(link){
    return "";
};
~~~

### Related Guides
- [의존 링크 템플릿](guides/dependency-templates.md)