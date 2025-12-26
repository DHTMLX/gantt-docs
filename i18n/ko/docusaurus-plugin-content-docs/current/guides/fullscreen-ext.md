---
title: "Fullscreen Extension"
sidebar_label: "Fullscreen Extension"
---

# Fullscreen Extension

Fullscreen 확장에 대한 자세한 정보는 [전체 화면 모드](guides/fullscreen-mode.md#fullscreenapi) 문서에서 확인할 수 있습니다. 

 *fullscreen* 객체는 다음과 같은 API를 포함합니다:

## Methods

- <span class="submethod">**expand (): void**</span> - gantt를 전체 화면 모드로 전환합니다.

~~~js
gantt.ext.fullscreen.expand();
~~~

- <span class="submethod">**collapse (): void**</span> - 전체 화면 모드에서 종료하고 gantt를 원래 크기로 되돌립니다.

~~~js
gantt.ext.fullscreen.collapse();
~~~

- <span class="submethod">**toggle (): void**</span> - gantt가 현재 전체 화면 상태라면 **collapse()** 메서드를, 전체 화면이 아니라면 **expand()** 메서드를 실행합니다.

~~~js
gantt.ext.fullscreen.toggle();
~~~

- <span class="submethod">**getFullscreenElement (): HTMLElement**</span> - **expand()** 메서드 호출 시 전체 화면으로 표시될 DOM 요소를 반환합니다.

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

기본적으로 **getFullscreenElement()** 메서드는 Gantt 차트를 포함하는 HTML 컨테이너를 반환합니다.
