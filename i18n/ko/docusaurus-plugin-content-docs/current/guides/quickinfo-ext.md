---
title: "quickInfo 확장 기능"
sidebar_label: "quickInfo 확장 기능"
---

quickInfo 확장 기능
=======================

quickInfo 확장 기능에 대한 자세한 내용은 [퀵 인포 (터치 지원)](guides/quick-info.md) 문서에서 확인할 수 있습니다.


*quickInfo* 객체는 다음과 같은 API를 제공합니다:

메서드
----------------

- <span class="submethod">**show (id): void**</span> - 지정된 엘리먼트에 대해 퀵 인포 팝업을 엽니다
    - **_id_** - (*number | string*) - 작업 ID
 
~~~js
gantt.ext.quickInfo.show("1");
~~~

- <span class="submethod">**show (x, y): void**</span>  - 지정된 좌표에 퀵 인포 팝업을 엽니다
    - **_x_** - (*number | string*) - 가로 좌표
    - **_y_** - (*number | string*) - 세로 좌표

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- <span class="submethod">**hide (force): HTMLElement**</span> - 퀵 인포 팝업을 닫습니다. **gantt.config.quick_info_detached**가 *false*로 설정되어 있으면, 팝업은 짧은 애니메이션 후에 사라집니다. 인자로 *true*를 전달하면 애니메이션 없이 즉시 팝업이 제거됩니다.
    - **_force?_** - (*boolean*) - 애니메이션 없이 즉시 팝업을 숨길지 여부


~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// 짧은 애니메이션과 함께 팝업 숨기기
gantt.ext.quickInfo.hide();
 
// 팝업 즉시 숨기기
gantt.ext.quickInfo.hide(true);
~~~

- <span class="submethod">**setContainer (container): void**</span> - 퀵 인포가 표시될 컨테이너를 지정합니다. 컨테이너가 지정되지 않으면, QuickInfo는 **gantt.$task, gantt.$grid, gantt.$root** 중 첫 번째 사용 가능한 노드에 삽입됩니다.
    - **_container_** - (*HTMLElement | string*) - 컨테이너 엘리먼트 또는 그 ID

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);

~~~

- <span class="submethod">**getNode (): HTMLElement | null**</span> - 퀵 인포 팝업의 HTMLElement를 반환합니다. 퀵 인포가 초기화되지 않았다면 *null*을 반환합니다.

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

표시된 퀵 인포의 DOM 엘리먼트는 다음과 같습니다:

![quick_node](/img/quick_node.png)

- <span class="submethod">**setContent (config): void**</span> - 퀵 인포에 내용을 채웁니다
    - **_config?_** - (*object*) - 퀵 인포에 대한 선택적 설정 객체로, 다음을 포함할 수 있습니다:
        - **_taskId?_** - (*string | number*) - 선택 사항, 퀵 인포의 액션 버튼과 연결된 작업의 id
        - **_header?_** - (*object*) - 선택 사항, 팝업 편집 폼의 헤더로 다음을 포함할 수 있습니다:
            - **_title?_** - (*string*) - 선택 사항, 팝업 편집 폼의 제목
            - **_date?_** - (*string*) - 선택 사항, 팝업 편집 폼의 날짜
        - **_content?_** - (*string*) - 선택 사항, 팝업 편집 폼의 내용
        - **_buttons?_** - (*string[]*) - 선택 사항, 팝업 편집 폼에 표시될 버튼들
    


header와 buttons가 모두 생략된 경우, 퀵 인포 팝업의 해당 섹션은 숨겨집니다.

**setContent** 메서드의 설정 객체 예시:

~~~js
const quickInfo = gantt.ext.quickInfo;
var task = gantt.getTask(10);
quickInfo.show(task.id);
quickInfo.setContent({
    taskId: task.id,
    header: {
        title: gantt.templates.quick_info_title(task.start_date, task.end_date, task),
        date: gantt.templates.quick_info_date(task.start_date, task.end_date, task)
    },
    content: gantt.templates.quick_info_content(task.start_date, task.end_date, task),
    buttons: gantt.config.quickinfo_buttons
});
~~~

또는,

헤더와 버튼 없이 커스텀 팝업을 생성할 수도 있습니다:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
    content: "my custom html",
    buttons: []
});
~~~
