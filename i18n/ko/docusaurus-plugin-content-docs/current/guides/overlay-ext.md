---
title: "오버레이 확장"
sidebar_label: "오버레이 확장"
---

# 오버레이 확장

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

**오버레이** 확장은 오버레이 작업을 단순화하기 위한 API 메서드 모음을 포함합니다. 오버레이 확장에 대한 자세한 내용은 [타임라인 영역의 사용자 정의 요소](guides/baselines.md#extra-overlay-for-the-chart) 문서를 참조하세요.

## 메서드

다음 메서드는 **gantt.ext.overlay** 객체를 통해 사용할 수 있습니다:

### addOverlay

- <span class="submethod">**addOverlay (render, id): string | number**</span> - Gantt 차트에 새 오버레이를 추가하고 그 ID를 반환합니다
    - **_render_** - (*Function*): HTMLElement - 렌더 함수. 커스텀 콘텐츠가 담긴 컨테이너를 매개변수로 받습니다.
        - **_container_** - (*HTMLElement*) - 오버레이 컨테이너
    - **_id?_** - (*number | string*) - 선택적, 오버레이의 ID

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container) {});
~~~

### deleteOverlay

- <span class="submethod">**deleteOverlay (id): boolean**</span> - 주어진 ID를 가진 오버레이를 삭제합니다
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

### getOverlaysIds 

- <span class="submethod">**getOverlaysIds (): Array&lt;string&gt;**</span> - 차트에 추가된 오버레이의 ID가 담긴 배열을 반환합니다

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

### refreshOverlay

- <span class="submethod">**refreshOverlay (id): void**</span> - 지정된 오버레이를 다시 그립니다.
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

### showOverlay

- <span class="submethod">**showOverlay (id): void**</span> - 주어진 ID로 오버레이를 표시합니다.
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

### hideOverlay

- <span class="submethod">**hideOverlay (id): void**</span> - 주어진 ID로 오버레이를 숨깁니다.
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

### isOverlayVisible

- <span class="submethod">**isOverlayVisible (id): boolean**</span> - 지정된 오버레이의 가시성을 확인합니다. 오버레이가 보이면 true를 반환합니다.
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~