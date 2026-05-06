---
sidebar_label: auto_scheduling
title: конфигурация auto_scheduling
description: "включает автопланирование"
---

# auto_scheduling

:::info
Эта функциональность доступна только в версии PRO. 
:::

### Description

@short: Включает автопланирование

@signature: auto_scheduling: AutoSchedulingConfig | boolean

### Example

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    gap_behavior: "compress"
};

gantt.init("gantt_here");
~~~

**Default value:** `false`

### Related samples
- [Расширение Auto Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Эта конфигурация определяется в расширении **auto_scheduling**, поэтому необходимо активировать плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробности читайте в статье [Auto Scheduling](guides/auto-scheduling.md). 
:::

Хотя конфигурацию `auto_scheduling` можно задать как булево значение, предпочтительным является использование объектного определения для настройки автопланирования.


#### enabled

**Тип**: boolean

**По умолчанию**: `false`

Включает или выключает автоматическое планирование (то же самое, что и прямое использование булевого значения).

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

#### apply_constraints

**Тип**: boolean

**По умолчанию**: `true`

Включает или отключает использование временных ограничений для авто планирования.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

Установка значения в `false` переводит автоматическое планирование в режим, который игнорирует ограничения, связанные с задачами (например, ASAP, ALAP, SNET и т. д.), и расписание зависит исключительно от зависимостей между задачами.

Это свойство заменяет устаревшую настройку [](api/config/auto_scheduling_compatibility.md).

- [Базовое планирование](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)
- [Планирование с ограничениями](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

<span id="gapbehavior"></span>

#### gap_behavior

**Тип**: String

**Разрешённые значения**: `"preserve"`|`"compress"`

**По умолчанию**: `"preserve"`


Определяет, как Gantt обрабатывает пропуски между зависимыми задачами во время планирования.

- **"preserve"** — сохраняет задачи на их текущих позициях, если конфликтов нет
- **"compress"** — перемещает задачи к самой ранней допустимой дате (или к поздней, если включено `schedule_from_end`)

По умолчанию задачи перепланируются только если их текущая дата нарушает ограничение или зависимость. 

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

<span id="descendantlinks"></span>

#### descendant_links

**Тип**: boolean

**По умолчанию**: `false`

Разрешает или запрещает создание связей между родительскими задачами (проектами) и их подзадачами.

По умолчанию такие связи создавать нельзя.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    descendant_links: true
};
~~~

#### schedule_on_parse

**Тип**: boolean

**По умолчанию**: `true`

Определяет, будет ли Gantt выполнять авто планирование при загрузке/разборе данных.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: false
};
~~~

#### move_projects

**Тип**: boolean

**По умолчанию**: `true`

По умолчанию (когда свойство установлено в *true*) всё 프로젝트 перемещается во время авто планирования. Это означает, что все задачи проекта сохраняют свои позиции относительно друг друга и начала проекта.

![moving_project_true](/img/moving_project_true.png)


Если свойство *move_projects* установлено в *false*, авто планирование будет перемещать отдельные задачи внутри проекта. Таким образом, часть задач будет перемещена, другие останутся на своих местах.

![moving_project_false](/img/moving_project_false.png)


:::note
Если вы используете планирование с ограничениями (apply_constraints: true), конфигурация *move_projects* будет активна только когда свойство `gap_behavior` задано в значение "preserve":

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: true,
    move_projects: true,
    gap_behavior: "preserve"
};
~~~
:::

#### use_progress

**Тип**: boolean

**По умолчанию**: `false`

Указывает, должны ли завершённые задачи влиять на планирование и расчеты критического пути.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
~~~

Когда данное свойство включено, критический путь, запас и алгоритмы авто планирования учитывают значение прогресса задачи, подобно тому, как эти методы работают в MS Project, а именно:

1) Завершённые задачи (задачи с 100% прогресса) всегда имеют нулевой запас;

2) Завершённые задачи исключаются из расчётов авто планирования. Связи, которые соединяют предшественники с завершёнными задачами, игнорируются;

3) Завершённые задачи не могут быть критическими.

- [Use progress for auto-scheduling, critical path and slack calculations](https://snippet.dhtmlx.com/ju3km1uy)

#### schedule_from_end

**Тип**: boolean

**По умолчанию**: `false`

Включает обратное планирование.

Установка этого параметра в `true` переведёт авто планирование в режим «как можно позднее».

Значение будет применяться только если также указан `project_end` (см. [](api/config/project_end.md)).

~~~jsx
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

- [Backward Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

#### project_constraint

**Тип**: boolean

**По умолчанию**: `false`

Определяет, должны ли задачи наследовать тип ограничения от родительского проекта.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

По умолчанию тип ограничения родительского проекта не влияет на тип ограничения вложенных задач.

Если установить конфигурацию в *true*, дочерние задачи (за исключением задач со своим собственным типом ограничения) будут иметь тот же тип ограничения, что и их родительский проект (например, **finish no later than**).

- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

#### show_constraints

**Тип**: boolean

**По умолчанию**: `false`

Контролирует отображение ограничений задач на диаграмме Ганта.
Установите значение `true`, чтобы отображать ограничения, или `false`, чтобы скрыть их.

Например, чтобы включить авто планирование, но отключить отображение ограничений задач:

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    show_constraints: false
};
gantt.init("gantt_here");
~~~

- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Related API
- [project_start](api/config/project_start.md)
- [project_end](api/config/project_end.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [constraint_types](api/config/constraint_types.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- начиная с v9.1 рекомендуется использование объектной конфигурации для `auto_scheduling`
- может быть задан как объект начиная с v9.0