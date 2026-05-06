---
sidebar_label: editor_types
title: editor_types 구성
description: "인라인 에디터 정의를 포함하는 객체"
---

# editor_types

### Description

@short: 인라인 에디터 정의를 포함하는 객체

@signature: editor_types: \{ text?: InlineEditor; number?: InlineEditor; duration?: InlineEditor; date?: InlineEditor; select?: InlineEditor; predecessor?: InlineEditor; [customEditorName: string]: InlineEditor | undefined; \}

### Example

~~~jsx
gantt.config.editor_types.custom_editor = {// custom editor logic}
~~~

### Details

이 구성을 사용하여 커스텀 에디터를 생성할 수 있습니다(위 예제를 참조하십시오).

다음은 미리 정의된 여러 개의 Inline Editor입니다:

- **text** - (*InlineEditor*) - 텍스트 열 편집 용 에디터, 예: 작업 이름
- **number** - (*InlineEditor*) - 숫자 열 편집 용 에디터, 예: 작업 지속 시간, 순서 등
- **duration** - (*InlineEditor*) - 지속 시간 열 편집에 사용되는 에디터. 즉 map_to:"duration" 구성에서 사용되고 [에디터 타입](guides/inline-editing.md#types-of-editors)이 **"duration"** 타입으로 설정된 경우에만 작동
- **date** - (*InlineEditor*) - 날짜 열 편집에 사용되는 에디터. 예: 작업의 시작일과 종료일
- **select** - (*InlineEditor*) - 목록에서 옵션 하나를 선택하기 위한 에디터
- **predecessor** - (*InlineEditor*) - 현재 편집 중인 작업의 선행 작업을 설정하기 위한 에디터. 이 에디터는 선행 작업과의 연결을 설정하기 위해 [작업의 WBS 코드](guides/specifying-columns.md#wbscode)를 가져옵니다
- **[customEditorName: string]** - (*InlineEditor | undefined*) - 커스텀 Inline Editor


편집기는 이 객체에 정의된 것은 간트 차트 열에 연결할 수 있습니다:

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
- [그리드에서의 인라인 편집](guides/inline-editing.md#types-of-editors)