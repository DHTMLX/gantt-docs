---
sidebar_label: inherit_scale_class
title: inherit_scale_class 설정
description: "서브 스케일이 기본적으로 scale_cell_class 템플릿을 사용할지 여부를 지정합니다"
---

# inherit_scale_class

### Description

@short: 하위 스케일이 기본적으로 scale_cell_class 템플릿을 사용할지 여부를 지정합니다

@signature: inherit_scale_class: boolean

### Example

~~~jsx
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");
~~~

**기본값:** false

### Details

이 옵션은 버전 3.2에서 추가되었습니다.
이전 버전에서는 하위 스케일이 기본적으로 항상 [scale_cell_class](api/template/scale_cell_class.md) 템플릿을 사용했습니다. 옵션을 'true'로 설정하면 예전 동작으로 돌아갑니다.

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)