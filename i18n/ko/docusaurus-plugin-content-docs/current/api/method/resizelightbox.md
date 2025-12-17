---
sidebar_label: resizeLightbox
title: resizeLightbox method
description: "라이트박스 크기를 강제로 조정합니다"
---

# resizeLightbox

### Description

@short: 라이트박스 크기를 강제로 조정합니다

@signature: resizeLightbox: () =\> void

### Example

~~~jsx
var control = gantt.getLightboxSection("description");
control.header.style.display = "none";
 
gantt.resizeLightbox();
~~~

### Details

이 메서드는 섹션의 가시성을 변경할 때마다 라이트박스 크기를 업데이트합니다.

### Related API
- [wide_form](api/config/wide_form.md)

