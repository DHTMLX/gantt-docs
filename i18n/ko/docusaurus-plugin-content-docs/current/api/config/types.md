---
sidebar_label: types
title: types config
description: "라이트박스 구조의 이름을 저장합니다 (다양한 유형의 작업에 사용됨)"
---

# types
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 라이트박스 구조의 이름을 저장합니다 (다양한 유형의 작업에 사용됨)

@signature: types: \{ task?: string | number; project?: string | number; milestone?: string | number; placeholder?: string | number; [typeName: string]: string | number | undefined; \}

### Example

~~~jsx
var type1 = gantt.config.types.task;
~~~

**Default value:** types : \{task:'task',project:'project',milestone:'milestone', placeholder: "placeholder"\}

### Related samples
- [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

### Details

'types' 객체는 **"프로그램 내 타입 이름"**과 **"타입 식별자"** 쌍으로 구성되어 있습니다:

- 프로그램 내 이름은 주로 명확성을 위해 사용되며, 타입 작업을 더 쉽게 만듭니다.
- 타입 식별자는 데이터베이스에 저장되는 값입니다. types 객체 내에서 고유해야 하며, 필요에 따라 식별자를 원하는 값으로 변경할 수 있습니다:
~~~js
{"task":0,"project":1,"milestone":2}
~~~


일반적으로 사용되는 타입은 다음과 같습니다:

- **task** - (*string | number*) - 작업 타입의 식별자입니다.
- **project** - (*string | number*) - 프로젝트 타입의 식별자입니다.
- **milestone** - (*string | number*) - 마일스톤 타입의 식별자입니다.
- **placeholder** - (*string | number*) - 플레이스홀더 타입의 식별자입니다.
- **[typeName: string]** - (*string | number | undefined*) - 사용자 정의 타입의 식별자입니다.

Gantt는 작업 타입에 따라 라이트박스를 선택합니다:

~~~js
types: {
    'task':'task',            // 일반 작업용 라이트박스
    'project':'project',      // 프로젝트 작업용 라이트박스
    'milestone':'milestone'   // 마일스톤용 라이트박스
}
~~~

### Related Guides
- [작업 유형](guides/task-types.md)
