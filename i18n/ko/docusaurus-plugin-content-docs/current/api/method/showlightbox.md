---
sidebar_label: showLightbox
title: showLightbox method
description: "지정된 작업에 대해 라이트박스를 엽니다"
---

# showLightbox

### Description

@short: 지정된 작업에 대해 라이트박스를 엽니다

@signature: showLightbox: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        작업 ID

### Example

~~~jsx
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
~~~

### Details

이 메서드는 [onBeforeLightbox](api/event/onbeforelightbox.md) 및 [onLightbox](api/event/onlightbox.md) 이벤트를 트리거합니다.

### Related API
- [hideLightbox](api/method/hidelightbox.md)

