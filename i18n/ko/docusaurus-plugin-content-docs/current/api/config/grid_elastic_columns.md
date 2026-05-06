---
sidebar_label: grid_elastic_columns
title: grid_elastic_columns 설정
description: "스크롤 가능한 그리드 안의 열 너비를 조정합니다"
---

# grid_elastic_columns

### Description

@short: 스크롤 가능한 그리드 내부의 열 너비를 조정합니다

@signature: grid_elastic_columns: boolean | string

### Example

~~~jsx
gantt.config.grid_elastic_columns = true;
...
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

:::note
이 속성은 [가로 스크롤이 있는 그리드](guides/specifying-columns.md#horizontal-scrollbar)에서만 작동합니다. 
:::

기본적으로, dhtmlxGantt은 전체 그리드를 크기 조정할 때 열의 크기를 자동으로 조정하지 않습니다. 

따라서 그리드의 너비가 증가하면 열의 너비는 변하지 않습니다. 그 결과 그리드의 오른쪽에 빈 공간이 생깁니다. 
그리드의 너비가 감소하면 그리드에 수평 스크롤이 표시됩니다.

![elastic_false](/img/elastic_false.png)

열이 그리드 크기에 의존하도록 만들려면 **grid_elastic_columns**를 *true*로 설정합니다:

~~~js
gantt.config.grid_elastic_columns = true;
~~~

:::note
샘플: [Elastic columns of Grid](https://snippet.dhtmlx.com/k0qqj5w5)
:::

이제 그리드의 너비가 변경되면 열의 너비도 함께 조정되며, 반대로도 마찬가지입니다:

- 그리드의 너비를 확장하면 열이 그리드의 크기에 맞게 확장되어 남은 모든 공간을 차지합니다
- 열 너비를 확장하면 그리드의 크기가 증가합니다(수평 스크롤이 나타날 수 있지만 다른 열의 크기는 변하지 않습니다)
- 열 너비를 축소하면 그리드의 크기가 감소합니다(수평 스크롤이 사라질 수 있지만 다른 열의 크기가 커질 수 있습니다)

![elastic_true](/img/elastic_true.png)

또 다른 옵션으로 속성 값을 "min_width"로 설정할 수 있습니다:

~~~js
gantt.config.grid_elastic_columns = "min_width";
~~~

이 경우:

- 그리드의 너비를 확장하면 열이 그리드의 크기에 맞게 확장되어 남은 모든 공간을 차지합니다
- 그리드의 너비를 축소하면 열은 최소 너비에 도달할 때까지 축소됩니다. 모든 열이 최소 크기에 도달하면 그리드에 수평 스크롤이 나타납니다.

### Change log
- added in v7.0