---
sidebar_label: editor_types
title: editor_types config
description: "인라인 에디터 정의를 담고 있는 객체"
---

# editor_types

### Description

@short: 인라인 에디터 정의를 담고 있는 객체

@signature: editor_types: \{ text?: InlineEditor; number?: InlineEditor; duration?: InlineEditor; date?: InlineEditor; select?: InlineEditor; predecessor?: InlineEditor; [customEditorName: string]: InlineEditor | undefined; \}

### Example

~~~jsx
gantt.config.editor_types.custom_editor = {// custom editor logic}
~~~

### Details

이 설정은 사용자 정의 에디터를 생성하는 데 사용됩니다(위 예제 참조).

다음과 같은 여러 내장 인라인 에디터가 제공됩니다:

- **text** - (*InlineEditor*) - 작업 이름과 같은 텍스트 필드를 편집할 때 사용
- **number** - (*InlineEditor*) - 작업 기간이나 순서와 같은 숫자 필드를 편집할 때 사용
- **duration** - (*InlineEditor*) - 작업 기간 등 기간 필드를 편집할 때 사용.
  이는 ***map_to:"duration"*** 설정이 적용되고 [editor type](guides/inline-editing.md#typesofeditors)이 **"duration"**으로 설정된 경우에만 작동합니다.
- **date** - (*InlineEditor*) - 작업 시작일 및 종료일과 같은 날짜 필드를 편집할 때 사용
- **select** - (*InlineEditor*) - 드롭다운 목록에서 옵션을 선택할 때 사용
- **predecessor** - (*InlineEditor*) - 현재 작업에 선행 작업을 지정할 때 사용. 이 에디터는 선행 작업을 연결하기 위해 [WBS 코드](guides/specifying-columns.md#wbscode)를 사용합니다.
- **[customEditorName: string]** - (*InlineEditor | undefined*) - 사용자 정의 인라인 에디터를 정의할 때 사용

여기서 정의된 에디터는 gantt 컬럼에 할당할 수 있습니다:

~~~js
const textEditor = {type: "text", map_to: "text"};
const dateEditor =  {type: "date", map_to: "start_date",
    min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)};

gantt.config.columns = [
    {name: "text", label: "Task name", tree: true, width: "*", editor: textEditor},
    {name: "start_date", label: "Start time", align: "center", editor: dateEditor}
];

~~~

### Related Guides
- [그리드에서 인라인 편집](guides/inline-editing.md#typesofeditors)
