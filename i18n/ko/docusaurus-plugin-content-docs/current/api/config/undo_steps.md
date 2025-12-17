---
sidebar_label: undo_steps
title: undo_steps config
description: "undo 메서드가 몇 단계까지 롤백할지 지정합니다."
---

# undo_steps

### Description

@short: Undo 메서드가 몇 단계까지 롤백할지 지정합니다.

@signature: undo_steps: number

### Example

~~~jsx
gantt.config.undo_steps = 10;

gantt.init("gantt_here");
~~~

**Default value:** 10

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 설정은 **undo** 확장의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요. 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가됨

