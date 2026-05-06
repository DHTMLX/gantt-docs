---
title: "quickInfo 확장"
sidebar_label: "quickInfo 확장"
---

# quickInfo 확장

quickInfo 확장에 대한 자세한 내용은 [빠른 정보(터치 지원)](guides/quick-info.md) 문서를 참조하십시오.

The *quickInfo* 객체는 다음 API를 제공합니다:

## 메서드

- <span class="submethod">**show (id): void**</span> - 지정된 요소에 대해 빠른 정보 팝업을 표시합니다
    - **_id_** - (*number | string*) - 작업 ID
 
~~~js
gantt.ext.quickInfo.show("1");
~~~

- <span class="submethod">**show (x, y): void**</span>  - 특정 좌표에서 빠른 정보 팝업을 표시합니다
    - **_x_** - (*number | string*) - 수평 좌표
    - **_y_** - (*number | string*) - 수직 좌표

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- <span class="submethod">**hide (force): HTMLElement**</span> - 빠른 정보 팝업을 숨깁니다. **gantt.config.quick_info_detached**가 *false*로 설정된 경우, 빠른 정보는 즉시 사라지지 않고 짧은 애니메이션 후에 사라집니다. 인수로 *true* 값을 제공하면 애니메이션이 취소되고 팝업이 즉시 제거됩니다.
    - **_force?_** - (*boolean*) - 애니메이션 없이 즉시 빠른 정보 팝업을 숨길지 여부를 정의합니다


~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// 짧은 애니메이션 후에 팝업 숨김
gantt.ext.quickInfo.hide();
 
// 팝업 즉시 숨김
gantt.ext.quickInfo.hide(true);
~~~

- <span class="submethod">**setContainer (container): void**</span> - 빠른 정보가 표시될 컨테이너를 설정합니다. 사용자 정의 컨테이너가 지정되지 않으면, 발견된 노드 중 첫 번째에 QuickInfo가 배치됩니다: **gantt.$task, gantt.$grid, gantt.$root**
    - **_container_** - (*HTMLElement | string*) - 컨테이너 요소 또는 그 ID

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);

~~~

- <span class="submethod">**getNode (): HTMLElement | null**</span> - 빠른 정보 팝업의 HTMLElement를 반환합니다. 초기화되지 않았다면 *null*을 반환합니다

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

표시된 빠른 정보의 반환된 DOM 요소는 다음과 같이 보입니다:

![quick_node](/img/quick_node.png)

- <span class="submethod">**setContent (config): void**</span> - 빠른 정보에 내용을 넣습니다
    - **_config?_** - (*object*) - 선택 사항, 빠른 정보의 구성 객체로 다음 속성을 포함할 수 있습니다:
        - **_taskId?_** - (*string | number*) - 선택 사항, 빠른 정보의 작업 버튼이 연결될 작업의 ID
        - **_header?_** - (*object*) - 선택 사항, 팝업 편집 양식의 머리글로 포함될 수 있는 항목:
            - **_title?_** - (*string*) - 선택 사항, 팝업 편집 양식의 제목
            - **_date?_** - (*string*) - 선택 사항, 팝업 편집 양식의 날짜
        - **_content?_** - (*string*) - 선택 사항, 팝업 편집 양식의 내용
        - **_buttons?_** - (*string[]*) - 선택 사항, 팝업 편집 양식에 배치될 버튼
  


헤더와 버튼이 모두 지정되지 않으면, 빠른 정보 팝업의 관련 영역은 숨겨집니다.

다음은 **setContent** 메서드의 구성 객체가 어떻게 보일 수 있는 예시입니다:

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

또는

헤더와 버튼 없이 커스텀 팝업을 생성할 수 있습니다:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
    content: "my custom html",
    buttons: []
});
~~~