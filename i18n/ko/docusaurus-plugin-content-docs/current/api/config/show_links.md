---
sidebar_label: show_links
title: show_links config
description: "Gantt 차트에서 링크 표시를 활성화하거나 비활성화합니다"
---

# show_links

### Description

@short: Gantt 차트에서 링크 표시를 활성화/비활성화합니다

@signature: show_links: boolean

### Example

~~~jsx
// 간트 차트에서 모든 링크를 숨깁니다.
gantt.config.show_links = false;
 
gantt.init("gantt_here");
~~~

**기본값:** true