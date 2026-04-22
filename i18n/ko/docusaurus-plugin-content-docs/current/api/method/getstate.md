---
sidebar_label: getState
title: getState 메서드
description: "Gantt 차트의 현재 상태를 가져옵니다"
---

# getState

### Description

@short: Gantt 차트의 현재 상태를 가져옵니다

@signature: getState: () => GanttUIState

### Returns
- ` obj` - (GanttUIState) - 상태 객체

### Example

~~~jsx
const opened_task = gantt.getState().lightbox;
~~~

### Details
- **autoscroll** - (*boolean*) - Gantt 차트가 자동으로 스크롤되는지 여부를 나타냅니다 (*true*). [*click_drag* 확장이 활성화된 경우에만 추가됩니다]
- **batch_update** - (*boolean*) - 업데이트 모드. 이 메서드가 [*batchUpdate*](api/method/batchupdate.md) 메서드 안에서 호출되면 *true*입니다.
- **drag_from_start** - (*boolean | null*) - 작업의 리사이즈 모드. *true*는 시작점에서 리사이즈, *false*는 끝점에서 리사이즈를 의미합니다. 작업이 리사이즈되지 않으면 *null*입니다.
- **drag_id** - (*string | null | undefined*) - 사용자가 Gantt 차트에서 현재 드래그 중인 태스크의 id. Gantt 차트에서 드래그 중인 태스크가 없으면 *undefined* 또는 *null*입니다.
- **drag_mode** - (*string | null | undefined*) - 드래그 모드. 드래그 중일 때 값은 'move','resize','progress', 'ignore' 중 하나를 가집니다. 드래그가 없으면 *null* 또는 *undefined* 값을 가집니다.
- **fullscreen** - (*boolean*) - 전체 화면 모드의 플래그. Gantt 차트가 전체 화면 모드일 때는 *true*, 그렇지 않으면 *false*입니다.
- **lightbox** - (*string | null | undefined*) - 현재 lightbox에서 열려 있는 태스크의 id. lightbox에 열려 있는 태스크가 없으면 *undefined* 또는 *null*입니다.
- **link_from_start** - (*boolean | null*) - 새로운 링크 생성 상태. 선행 작업의 시작점에서 링크가 생성되면 *true*를 반환합니다.
- **link_landing_area** - (*boolean*) - 새로운 링크 생성 상태. 마우스가 링크 드래그 요소(버블) 위를 가리키면 *true*를 반환합니다.
- **link_source_id** - (*string | number | null*) - 새로운 링크 생성 상태. 출발지(선행) 태스크의 ID입니다.
- **link_target_id** - (*string | number | null*) - 새로운 링크 생성 상태. 타깃(후행) 태스크의 ID입니다.
- **link_to_start** - (*boolean*) - 새로운 링크 생성 상태. 후속 태스크의 시작점으로 링크가 생성되면 *true*를 반환합니다.
- **min_date** - (*Date*) - 차트에서 태스크가 표시되기 시작하는 날짜
- **max_date** - (*Date*) - 차트에서 태스크가 표시되는 끝 날짜까지
- **scale_unit** - (*string*) - 타임라인의 배경 격자 단위
- **scale_step** - (*number*) - 타임라인의 배경 격자 간격
- **selected_task** - (*string | null | undefined*) - 현재 선택된 태스크의 ID. Gantt 차트에서 선택된 태스크가 없으면 *undefined* 또는 *null*입니다.

:::note
참고: 이 객체를 수정해도 Gantt 차트의 동작은 바뀌지 않습니다.
:::