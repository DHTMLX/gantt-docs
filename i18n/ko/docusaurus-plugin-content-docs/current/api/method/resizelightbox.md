---
sidebar_label: resizeLightbox
title: resizeLightbox 메서드
description: "라이트박스의 크기를 강제로 재조정합니다"
---

# resizeLightbox

### Description

@short: 라이트박스의 크기를 재조정합니다

@signature: resizeLightbox: () => void

### Example

~~~jsx
var control = gantt.getLightboxSection("description");
control.header.style.display = "none";
 
gantt.resizeLightbox();
~~~

### Details

이 메서드는 일부 섹션을 숨기거나 표시한 후 라이트박스의 크기를 업데이트하는 데 사용할 수 있습니다.

### Related API
- [wide_form](api/config/wide_form.md)