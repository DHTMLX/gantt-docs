---
sidebar_label: inherit_scale_class
title: inherit_scale_class config
description: "서브 스케일이 기본적으로 scale_cell_class 템플릿을 사용할지 여부를 제어합니다"
---

# inherit_scale_class

### Description

@short: 서브 스케일이 기본적으로 scale_cell_class 템플릿을 사용할지 여부를 제어합니다

@signature: inherit_scale_class: boolean

### Example

~~~jsx
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

이 옵션은 버전 3.2에서 도입되었습니다. <br>
이전에는 서브 스케일이 항상 [scale_cell_class](api/template/scale_cell_class.md) 템플릿을 기본으로 적용했습니다. 이 옵션을 'true'로 설정하면 이전 동작이 복원됩니다.

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)

