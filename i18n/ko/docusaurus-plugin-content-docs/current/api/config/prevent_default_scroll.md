---
sidebar_label: prevent_default_scroll
title: prevent_default_scroll 설정
description: "gantt 컨테이너가 마우스휠 이벤트를 차단해야 하는지, 아니면 윈도우 요소로 상위로 전파되어야 하는지 여부를 지정합니다."
---

# prevent_default_scroll

:::warning
이 속성은 더 이상 사용되지 않습니다.
:::

### Description

@short: gantt 컨테이너가 마우스휠 이벤트를 차단해야 하는지, 아니면 윈도우 요소로 상위로 전파되어야 하는지 여부를 지정합니다.

### Example

~~~jsx
gantt.config.prevent_default_scroll = false;
gantt.init('gantt_here');
~~~

**기본값:** false

### Details

옵션은 페이지의 중앙에 gantt가 삽입되고 바깥에 콘텐츠가 있을 때 유용합니다.

옵션이 비활성화되면, gantt에 한 번 나타난 스크롤은 그 상태로 남아 있습니다.
페이지의 다른 부분을 스크롤하려면 사용자가 gantt 밖을 클릭해야 합니다.

### Change log
- v5.0부터 더 이상 사용되지 않음