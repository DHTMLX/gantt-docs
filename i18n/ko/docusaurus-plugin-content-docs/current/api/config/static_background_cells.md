---
sidebar_label: static_background_cells
title: static_background_cells config
description: "static_background 모드를 사용할 때 하이라이트된 셀을 렌더링할 수 있게 해줍니다."
---

# static_background_cells
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Static_background 모드를 사용할 때 하이라이트된 셀을 렌더링할 수 있게 해줍니다.

@signature: static_background_cells: boolean

### Example

~~~jsx
gantt.config.static_background_cells = false;
~~~

**Default value:** true

### Details

이 설정은 [static_background](api/config/static_background.md) 설정과 함께 작동합니다.
**static background**와 **static_background_cells**가 모두 활성화되어 있고, gantt.config.static_background_cells가 기본값인 true로 설정되어 있을 때,
gantt는 PNG 그리드와 하이라이트된 셀(타임라인_cell_class 템플릿에서 CSS 클래스를 할당받은 셀)을 모두 렌더링합니다.

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = true; // 기본값으로 활성화됨
~~~

만약 **static_background**는 활성화되어 있지만 **static_background_cells**가 비활성화되어 있다면, gantt는 버전 6.2 이전처럼 PNG 그리드만 렌더링합니다.

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = false;
~~~

**static_background**가 비활성화된 경우, **static_background_cells** 설정은 아무런 영향을 미치지 않습니다.

~~~js
gantt.config.static_background = false;
~~~

이 옵션은 **static_background** 동작을 버전 6.1과 동일하게 되돌리는 데 사용할 수 있습니다.

### Related API
- [static_background](api/config/static_background.md)

### Change log
- v6.2에서 추가되어 v6.1과의 호환성을 유지합니다.

