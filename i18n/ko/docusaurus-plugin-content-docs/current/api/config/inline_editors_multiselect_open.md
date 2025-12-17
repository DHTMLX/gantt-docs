---
sidebar_label: inline_editors_multiselect_open
title: inline_editors_multiselect_open config
description: "멀티 태스크 선택이 활성화된 상태에서 작업을 단일 클릭할 때 인라인 에디터가 열리는지 여부를 제어합니다."
---

# inline_editors_multiselect_open

### Description

@short: 멀티 태스크 선택이 활성화된 상태에서 작업을 단일 클릭할 때 인라인 에디터가 열리는지 여부를 제어합니다.

@signature: inline_editors_multiselect_open: boolean | undefined

### Example

~~~jsx
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");
~~~

**Default value:** undefined

### Details

단일 선택 모드를 사용할 때는 작업을 클릭하면 바로 인라인 에디터가 나타납니다.

멀티 선택이 활성화된 경우, 선택되지 않은 작업을 처음 클릭하면 해당 작업이 선택되고, 두 번째 클릭 시 인라인 에디터가 열립니다.
멀티 선택 모드에서도 첫 번째 클릭 시 인라인 에디터가 열리도록 하려면 **inline_editors_multiselect_open** 옵션을 true로 설정하세요.

### Related Guides
- [그리드에서 인라인 편집](guides/inline-editing.md)
- [멀티 태스크 선택](guides/multiselection.md)

### Change log
- v7.1.13에 추가됨
