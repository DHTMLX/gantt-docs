---
sidebar_label: scroll_size
title: scroll_size config
description: "수직(너비) 및 수평(높이) 스크롤바의 크기를 지정합니다."
---

# scroll_size

### Description

@short: 수직(너비) 및 수평(높이) 스크롤바의 크기를 지정합니다.

@signature: scroll_size: number

### Example

~~~jsx
gantt.config.scroll_size = 20;

gantt.init("gantt_here");
~~~

**Default value:** 15

### Details

이 설정을 정의하지 않으면, Gantt는 브라우저 기본 스크롤바 너비를 사용합니다. 스크롤바 스타일은 브라우저마다 다를 수 있기 때문입니다.
