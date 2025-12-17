---
sidebar_label: prevent_default_scroll
title: prevent_default_scroll config
description: "간트 컨테이너가 마우스휠 이벤트를 차단할지 아니면 윈도우 요소로 전파할지 제어합니다."
---

# prevent_default_scroll

### Description

@short: 간트 컨테이너가 마우스휠 이벤트를 차단할지 아니면 윈도우 요소로 전파할지 제어합니다.

### Example

~~~jsx
gantt.config.prevent_default_scroll = false;
gantt.init('gantt_here');
~~~

**Default value:** false

### Details

:::note
note 이 속성은 더 이상 사용되지 않습니다. 
:::

이 설정은 간트가 페이지 중간 어딘가에 배치되어 있고 그 주변에 다른 콘텐츠가 있을 때 유용합니다.

비활성화하면 간트 내부의 스크롤 바가 계속 표시됩니다. 페이지의 다른 부분을 스크롤하려면 사용자가 간트 영역 밖을 클릭해야 합니다.

### Change log
- v5.0부터 deprecated 되었습니다.
