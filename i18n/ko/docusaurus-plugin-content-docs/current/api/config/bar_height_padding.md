---
sidebar_label: bar_height_padding
title: bar_height_padding config
description: "`bar_height`가 'full'로 설정된 타임라인에서 작업 바 주변의 패딩을 제어합니다."
---

# bar_height_padding

### Description

@short: `bar_height`가 "full"로 설정된 타임라인에서 작업 바 주변의 패딩을 제어합니다.

@signature: bar_height_padding: number

### Example

~~~jsx
gantt.config.bar_height_padding = 5;
gantt.init("gantt_here");
~~~

**Default value:** 9

### Details

`bar_height_padding` 설정은 `gantt.config.bar_height`가 "full"로 설정된 경우 타임라인에서 작업 바 주변의 수직 공간을 조절합니다. 각 작업 바의 높이는 `gantt.config.row_height - gantt.config.bar_height_padding`으로 계산됩니다.

- 값을 `0`으로 설정하면 작업 바가 행의 전체 높이를 채우게 됩니다.
- 값을 증가시키면 작업 바 위아래에 더 많은 여백이 추가됩니다.

아래 예제는 더 작은 padding 값을 사용하여 작업 바 주변의 공간이 줄어든 모습을 보여줍니다:

~~~js
gantt.config.bar_height_padding = 3;
~~~

![bar_height_padding_small](/img/bar_height_padding_small.png)

다음 예제에서는 더 큰 padding 값을 사용하여 작업 바 위아래에 더 많은 빈 공간이 생성됩니다:

~~~js
gantt.config.bar_height_padding = 14;
~~~

![bar_height_padding_large](/img/bar_height_padding_large.png)

### Related API
- [bar_height](api/config/bar_height.md)
- [row_height](api/config/row_height.md)

### Change log
- v9.0에 추가됨

