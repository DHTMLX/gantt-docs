---
sidebar_label: showLightbox
title: showLightbox 메서드
description: "지정된 작업의 라이트박스를 엽니다"
---

# showLightbox

### Description

@short: 지정된 작업의 라이트박스를 엽니다

@signature: showLightbox: (id: string | number) =\> void

### Parameters

- `id` - (필수) *string | number* -        작업 ID

### Example

~~~jsx
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
~~~

### Details

이 메서드는 [onBeforeLightbox](api/event/onbeforelightbox.md) 및 [onLightbox](api/event/onlightbox.md) 이벤트를 트리거합니다.

### Related API
- [hideLightbox](api/method/hidelightbox.md)