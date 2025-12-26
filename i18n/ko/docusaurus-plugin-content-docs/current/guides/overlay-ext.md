---
title: "오버레이 확장"
sidebar_label: "오버레이 확장"
---

# 오버레이 확장

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

**overlay** 확장 기능은 오버레이 작업을 보다 쉽게 할 수 있도록 설계된 다양한 API 메서드를 제공합니다. 자세한 내용은 [타임라인 영역의 커스텀 요소](guides/baselines.md#extraoverlayforthechart) 문서를 참고하세요.

## 메서드

다음 메서드들은 **gantt.ext.overlay** 객체를 통해 사용할 수 있습니다:

### addOverlay

- <span class="submethod">**addOverlay (render, id): string | number**</span> - 새로운 오버레이를 Gantt 차트에 추가하고 그 id를 반환합니다.
    - **_render_** - (*Function*): HTMLElement - 렌더링을 담당하는 함수입니다. 사용자 지정 콘텐츠가 포함된 컨테이너를 매개변수로 받습니다.
        - **_container_** - (*HTMLElement*) - 오버레이의 컨테이너입니다.
    - **_id?_** - (*number | string*) - 선택 사항이며, 오버레이의 ID를 지정합니다.


~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

### deleteOverlay

- <span class="submethod">**deleteOverlay (id): boolean**</span> - 지정한 id의 오버레이를 삭제합니다.
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

### getOverlaysIds 

- <span class="submethod">**getOverlaysIds (): Array&lt;string&gt;**</span> - 차트에 추가된 오버레이의 id 목록을 배열로 반환합니다.

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

### refreshOverlay

- <span class="submethod">**refreshOverlay (id): void**</span> - 지정한 오버레이를 다시 그립니다.
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

### showOverlay

- <span class="submethod">**showOverlay (id): void**</span> - 지정한 id의 오버레이를 화면에 표시합니다.
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

### hideOverlay

- <span class="submethod">**hideOverlay (id): void**</span> - 지정한 id의 오버레이를 숨깁니다.
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

### isOverlayVisible

- <span class="submethod">**isOverlayVisible (id): boolean**</span> - 지정한 오버레이가 표시되고 있는지 확인합니다. 표시 중이면 *true*를 반환합니다.
    - **_id_** - (*number | string*) - 오버레이의 ID

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~

