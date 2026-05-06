---
title: "전체 화면 확장" 
sidebar_label: "전체 화면 확장" 
---

# 전체 화면 확장

전체 화면 확장에 대한 자세한 내용은 [전체 화면 모드](guides/fullscreen-mode.md#fullscreen-api) 기사에서 확인하십시오.

 The *fullscreen* 객체는 아래 API를 제공합니다:

## 메서드

- <span class="submethod">**expand (): void**</span> - Gantt 차트를 전체 화면 모드로 확장합니다

~~~js
gantt.ext.fullscreen.expand();
~~~

- <span class="submethod">**collapse (): void**</span> - Gantt 차트를 전체 화면 모드에서 일반 모드로 축소합니다

~~~js
gantt.ext.fullscreen.collapse();
~~~

- <span class="submethod">**toggle (): void**</span> - Gantt가 전체 화면으로 확장되어 있을 때는 **collapse()** 메서드를, 그렇지 않으면 **expand()** 메서드를 호출합니다

~~~js
gantt.ext.fullscreen.toggle();
~~~

- <span class="submethod">**getFullscreenElement (): HTMLElement**</span> - **expand()** 메서드에 의해 전체 화면으로 확장될 DOM 요소를 반환합니다

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

기본적으로 **getFullscreenElement()** 메서드는 Gantt 차트의 HTML 컨테이너를 반환합니다.