---
sidebar_label: scroll_size
title: scroll_size 설정
description: "세로(너비) 및 가로(높이) 스크롤의 크기를 설정합니다"
---

# scroll_size

### Description

@short: 세로(너비) 및 가로(높이) 스크롤의 크기를 설정합니다

@signature: scroll_size: number

### Example

~~~jsx
gantt.config.scroll_size = 20;

gantt.init("gantt_here");
~~~

**기본값:** 15

### Details

지정하지 않으면 Gantt는 브라우저마다 스크롤바 요소의 스타일이 다르기 때문에 기본 스크롤바 너비를 사용합니다.