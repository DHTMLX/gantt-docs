---
sidebar_label: inline_editors_multiselect_open
title: inline_editors_multiselect_open 구성
description: "멀티 태스크 선택이 활성화된 상태에서 한 번 클릭으로 작업의 인라인 에디터를 열어야 하는지 여부를 정의합니다"
---

# inline_editors_multiselect_open

### Description

@short: 멀티 태스크 선택이 활성화된 상태에서 작업을 한 번 클릭했을 때 인라인 에디터를 열어야 하는지 여부를 정의합니다

@signature: inline_editors_multiselect_open: boolean | undefined

### Example

~~~jsx
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");
~~~

**Default value:** undefined

### Details

단일 선택 모드에서는 작업을 클릭하면 Gantt가 인라인 에디터를 엽니다.

다중 선택 모드에서는 선택되지 않은 작업을 처음 클릭하면 해당 작업이 선택되고, 두 번째 클릭에서 인라인 에디터가 열립니다.
첫 클릭 후에 Gantt가 인라인 에디터를 열도록 하려면 **inline_editors_multiselect_open** 구성을 활성화하십시오.

### Related Guides
- [Inline Editing in Grid](guides/inline-editing.md)
- [Multi-Task Selection](guides/multiselection.md)

### Change log
- v7.1.13에서 추가됨