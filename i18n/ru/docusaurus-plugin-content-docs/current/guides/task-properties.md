---
title: "Свойства задачи"
sidebar_label: "Свойства задачи"
---

# Свойства задачи 


На этой странице представлен полный перечень свойств, которые может содержать объект задачи.

Полный список свойств объекта связи смотрите в статье [Link Properties](guides/link-properties.md).


## Обязательные свойства


Эти свойства всегда определяются на стороне клиента. Gantt ожидает наличие этих свойств в объекте задачи при загрузке данных. Если они отсутствуют, Gantt добавит их автоматически. Удаление любого из этих свойств из загруженных задач приведет к ошибкам.

<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>Идентификатор задачи, автоматически генерируется, если не указан</td>
  </tr>
  <tr>
  <td><b class="subproperty">start_date</b></td>
  <td><i>Date</i></td>
  <td>Запланированная дата начала задачи. [Если не указана, Gantt вычисляет ее на основе свойств end_date и duration.](guides/loading.md#loadingtaskdates) Это свойство становится необязательным, если установлено <b>unscheduled: true</b>.</td>
  </tr>
  <tr>
  <td><b class="subproperty">end_date</b></td>
  <td><i>Date</i></td>
  <td>Запланированная дата завершения задачи. [Если не указана, Gantt вычисляет ее на основе свойств start_date и duration.](guides/loading.md#loadingtaskdates) Это свойство становится необязательным, если установлено <b>unscheduled: true</b>.</td>
  </tr>
  <tr>
  <td><b class="subproperty">duration</b></td>
  <td><i>number</i></td>
  <td>Длительность задачи. [Если не указана, Gantt вычисляет ее на основе свойств start_date и end_date.](guides/loading.md#loadingtaskdates)</td>
  </tr>
  </tbody>
</table>


## Необязательные свойства


Эти свойства могут присутствовать или отсутствовать. Стандартная логика и шаблоны в Gantt будут использовать эти свойства, если они доступны.

<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">auto_scheduling</b></td>
  <td><i>boolean</i></td>
  <td>Определяет, должен ли Gantt выполнять авто-планирование для задачи (<i>true</i> или не указано), либо нет (<i>false</i>)</td>
  </tr>
  <tr>
  <td><b class="subproperty">bar_height</b></td>
  <td><i>number</i></td>
  <td>Задает высоту DOM-элемента задачи на временной шкале</td>
  </tr>
  <tr>
  <td><b class="subproperty">baselines</b></td>
  <td><i>Baseline[]</i></td>
  <td>Массив, содержащий базовые планы</td>
  </tr>
  <tr>
  <td><b class="subproperty">calendar_id</b></td>
  <td><i>number | string</i></td>
  <td>Присваивает задаче id пользовательского календаря. Имя свойства зависит от опции [calendar_property](https://docs.dhtmlx.com/gantt/api/config/calendar_property)</td>
  </tr>
  <tr>
  <td><b class="subproperty">color</b></td>
  <td><i>string</i></td>
  <td>Устанавливает цвет задачи на временной шкале (применяется к <b>background-color</b> элемента <b>gantt_task_line</b>)</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_date</b></td>
  <td><i>Date</i></td>
  <td>Дата ограничения задачи, добавляется при [авто-планировании с временными ограничениями](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html). Не используется, если включен [auto_scheduling_compatibility](https://docs.dhtmlx.com/gantt/api/config/auto_scheduling_compatibility).</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_type</b></td>
  <td><i>string</i></td>
  <td>[Определяет тип ограничения задачи ("asap", "alap", "snet", "snlt", "fnet", "fnlt", "mso", "mfo")](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html#timeconstraintsfortasks). Добавляется при [авто-планировании с временными ограничениями](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html). Не используется, если включен [auto_scheduling_compatibility](https://docs.dhtmlx.com/gantt/api/config/auto_scheduling_compatibility).</td>
  </tr>
  <tr>
  <td><b class="subproperty">deadline</b></td>
  <td><i>Date</i></td>
  <td>Устанавливает дату дедлайна для задачи. Временная шкала отображает [визуальный индикатор](guides/inbuilt-baselines.md#deadlinesandconstraints), если это свойство задано.</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>Определяет, может ли задача быть [отредактирована](guides/readonly-mode.md#readonlymodefortheentiregantt) в режиме только для чтения. Имя свойства зависит от опции [editable_property](https://docs.dhtmlx.com/gantt/api/config/editable_property)</td>
  </tr>
  <tr>
  <td><b class="subproperty">group_id</b></td>
  <td><i>string | number</i></td>
  <td>Идентификатор группы, к которой принадлежит задача. Добавляется при группировке задач по свойству, указанному в [relation_property](guides/grouping.md#groupingtasks) метода groupBy().</td>
  </tr>
  <tr>
  <td><b class="subproperty">hide_bar</b></td>
  <td><i>boolean</i></td>
  <td>Определяет, [должна ли задача (type:"task") или веха (type:"milestone") быть скрыта на временной шкале](guides/milestones.md#hidingtasksandmilestones)</td>
  </tr>
  <tr>
  <td><b class="subproperty">key</b></td>
  <td><i>string | number</i></td>
  <td>Ключ группы, добавляется при группировке задач по массивному свойству в [relation_property](guides/grouping.md#groupingtasks) метода groupBy(). Также добавляется к задачам с именем группы (например, "High", "Normal", "Low" при группировке по приоритету). [См. пример](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html).</td>
  </tr>
  <tr>
  <td><b class="subproperty">label</b></td>
  <td><i>string</i></td>
  <td>Метка группы, добавляется к задачам с именем группы (например, "High", "Normal", "Low" при группировке по приоритету). [См. пример](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html).</td>
  </tr>
  <tr>
  <td><b class="subproperty">open</b></td>
  <td><i>boolean</i></td>
  <td>Показывает, открыта ли ветка задачи для отображения дочерних задач при инициализации. Для изменения состояния после инициализации используйте методы [close()](api/method/close.md) и [open()](api/method/open.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">parent</b></td>
  <td><i>number | string</i></td>
  <td>Идентификатор родительской задачи. Задачи с несуществующими родителями не будут отображаться. Идентификатор корневой задачи задается через конфиг [root_id](api/config/root_id.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">progress</b></td>
  <td><i>number</i></td>
  <td>Значение прогресса выполнения задачи (от 0 до 1)</td>
  </tr>
  <tr>
  <td><b class="subproperty">progressColor</b></td>
  <td><i>string</i></td>
  <td>Устанавливает цвет полосы прогресса задачи на временной шкале (применяется к <b>background-color</b> элемента <b>gantt_task_progress</b>)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>Определяет, должна ли задача быть [только для чтения](guides/readonly-mode.md#readonlymodeforspecifictaskslinks). Имя свойства зависит от опции [readonly_property](api/config/readonly_property.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">render</b></td>
  <td><i>string</i></td>
  <td>Управляет отображением подзадач. Возможные значения: <i>"split" | ""</i>. Если указано ["split"](guides/split-tasks.md), подзадачи отображаются в одной строке. При включенном свойстве [open_split_tasks](api/config/open_split_tasks.md) подзадачи отображаются в одной строке только если задача свернута.</td>
  </tr>
  <tr>
  <td><b class="subproperty">resource</b></td>
  <td><i>Array &lt;string&gt;</i></td>
  <td>Массив ресурсов, назначенных задаче. Добавляется при импорте данных из MS Project или Primavera</td>
  </tr>
  <tr>
  <td><b class="subproperty">rollup</b></td>
  <td><i>boolean</i></td>
  <td>Определяет, должна ли задача (type:"task") или веха (type:"milestone") [отображаться на родительских проектах](guides/milestones.md#rolluptasksandmilestones).</td>
  </tr>
  <tr>
  <td><b class="subproperty">row_height</b></td>
  <td><i>number</i></td>
  <td>Задает высоту строки задачи</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string</i></td>
  <td>Идентификатор целевой задачи. Это свойство соответствует свойству <b>$drop_target</b>. Добавляется к объекту задачи только при включенном Data Processor, после обновления задачи и связи с сервером.</td>
  </tr>
  <tr>
  <td><b class="subproperty">text</b></td>
  <td><i>any</i></td>
  <td>Название задачи. При необходимости можно использовать другое имя свойства. Это свойство используется в стандартных настройках Gantt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">textColor</b></td>
  <td><i>string</i></td>
  <td>Устанавливает цвет текста задачи на временной шкале (применяется к <b>color</b> элемента <b>gantt_task_line</b>)</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>Тип задачи. Доступные значения определяются в объекте [types](api/config/types.md): <ul> <li>["task"](guides/task-types.md#regulartasks) - обычная задача (<i>по умолчанию</i>).</li> <li>["project"](guides/task-types.md#projecttasks) - задача, которая начинается с самой ранней дочерней задачи и заканчивается самой поздней дочерней задачей. <i>Свойства <b>start_date</b>, <b>end_date</b> и <b>duration</b> для этого типа игнорируются.</i> </li> <li>["milestone"](guides/task-types.md#milestones) - задача нулевой длительности, отмечающая важные даты проекта. <i>Свойства <b>duration</b>, <b>progress</b> и <b>end_date</b> для этого типа игнорируются.</i></li> </ul></td>
  </tr>
  <tr>
  <td><b class="subproperty">unscheduled</b></td>
  <td><i>boolean</i></td>
  <td>Показывает, является ли задача [незапланированной](guides/unscheduled-tasks.md). По умолчанию незапланированные задачи не отображаются на временной шкале, а в гриде для дат начала и окончания выводятся пустые значения.</td>
  </tr>
  </tbody>
</table>


## Динамические свойства


Динамические свойства создаются на стороне клиента для отображения текущего состояния задачи или связи. Они не предназначены для сохранения в базе данных, и Gantt проигнорирует их, если они будут включены в ваш JSON или XML.


<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">[resource_property]</b></td>
  <td><i>string | Array &lt;any&gt;</i></td>
  <td>[Это свойство может иметь любое имя](api/config/resource_property.md). Хранит идентификатор ресурса, связанного с <i>resourceGrid/Timeline/Histogram/Calendar.</i></td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_end_date</b></td>
  <td><i>Date</i></td>
  <td>Вычисленная дата окончания для проектной задачи на основе ее подзадач. Добавляется и обновляется, когда "auto_scheduling" выключен.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_start_date</b></td>
  <td><i>Date</i></td>
  <td>Вычисленная дата начала для проектной задачи на основе ее подзадач. Добавляется и обновляется, когда "auto_scheduling" выключен.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$calculate_duration</b></td>
  <td><i>boolean</i></td>
  <td>Системное свойство, используемое для внутренних вычислений.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$custom_data</b></td>
  <td><i>object</i></td>
  <td>Содержит пользовательские свойства задачи, определенные при [importFromMSProject()](api/method/importfrommsproject.md) и [importFromPrimaveraP6()](api/method/importfromprimaverap6.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$dataprocessor_class</b></td>
  <td><i>string</i></td>
  <td>Системное свойство, указывающее, была ли задача обновлена. Добавляется при включенном Data Processor. Если установлено значение <i>"updated"</i>, текст задачи отображается жирным в гриде, хотя могут применяться свои CSS-стили.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$drop_target</b></td>
  <td><i>string</i></td>
  <td>Идентификатор целевой задачи при вертикальном перетаскивании. Это временное свойство добавляется во время перетаскивания задачи.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$effective_calendar</b></td>
  <td><i>string</i></td>
  <td>Идентификатор календаря (или календаря ресурса), назначенного задаче. Используется для внутренних вычислений.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$expanded_branch</b></td>
  <td><i>boolean</i></td>
  <td>Показывает, видна ли задача в зависимости от того, развернуты ли родительские ветки. Если хотя бы один родитель свернут, задача скрыта, кроме случаев split-задач (подзадач).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$has_child</b></td>
  <td><i>boolean</i></td>
  <td>Показывает, должен ли Gantt запрашивать загрузку подзадач первого уровня с сервера. Используется при включенном [branch_loading](api/config/branch_loading.md). Имя свойства зависит от опции [branch_loading_property](api/config/branch_loading_property.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$index</b></td>
  <td><i>number</i></td>
  <td>Глобальная вертикальная позиция задачи. Это значение обновляется при открытии или закрытии задач выше или ниже. Если родитель свернут, значение не отражает фактическое положение.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$level</b></td>
  <td><i>number</i></td>
  <td>Уровень вложенности задачи в иерархии (начиная с нуля)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$local_index</b></td>
  <td><i>number</i></td>
  <td>Вертикальная позиция задачи внутри родительской ветки. Это значение не обновляется при глобальных изменениях открытия/закрытия. Если родитель свернут, значение не отражает фактическое положение.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$new</b></td>
  <td><i>boolean</i></td>
  <td>Добавляется при создании новой задачи через [createTask()](api/method/createtask.md) или кнопку "+". Присутствует, пока открыт lightbox, и удаляется после сохранения.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_end</b></td>
  <td><i>boolean</i></td>
  <td><b>Обязательное</b> системное свойство, добавляется, если <b>end_date</b> невозможно вычислить (указан start_date, но нет duration или end_date). В этом случае задачу нельзя перемещать или изменять размер. <b>end_date</b> зависит от дат окончания подзадач, <b>start_date</b> фиксирован. Авто-планирование отключено. Если также установлено <b>$no_start</b>, задача полностью зависит от дат подзадач или первой задачи.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_start</b></td>
  <td><i>boolean</i></td>
  <td><b>Обязательное</b> системное свойство, добавляется, если <b>start_date</b> невозможно вычислить (указан end_date, но нет duration или start_date). <b>start_date</b> зависит от подзадач или первой задачи. <b>end_date</b> остается фиксированным, если только дата начала подзадач/первой задачи не превышает его. Авто-планирование отключено. Если также установлено <b>$no_end</b>, задача полностью зависит от дат подзадач или первой задачи.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$open</b></td>
  <td><i>boolean</i></td>
  <td>Системное свойство, отражающее, открыта ли задача в данный момент (<i>true</i>). Изменение этого свойства и перерисовка Gantt открывает или закрывает задачу. Альтернативно используйте [open()](api/method/open.md) или [close()](api/method/close.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$raw</b></td>
  <td><i>object</i></td>
  <td>Содержит оригинальные имена свойств задачи, импортированные из [MS Project](guides/export-msproject.md) или [Primavera](guides/export-primavera.md) при экспорте. Эти данные появляются до преобразования в формат, ожидаемый Gantt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_at</b></td>
  <td><i>string | number</i></td>
  <td>Идентификатор строки, в которой отображается [rollup-элемент](https://docs.dhtmlx.com/gantt/desktop__milestones.html#rolluptasksandmilestones) или [split](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html)-задача. Это временное свойство появляется только во время отображения rollup/split задачи.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_parent</b></td>
  <td><i>number | string</i></td>
  <td>Идентификатор родителя, под которым отображается задача (не фактический родитель). Используется внутренне и для группировки задач.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_type</b></td>
  <td><i>string</i></td>
  <td>Временное свойство, указывающее тип отображаемой задачи.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$resourceAssignments</b></td>
  <td><i>Array &lt;any&gt;</i></td>
  <td>Массив идентификаторов ресурсов, назначенных задаче (временное). Наиболее точные данные хранятся в хранилище назначений ресурсов.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rollup</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td>Массив идентификаторов задач и вех, которые [отображаются на этой задаче](guides/milestones.md#rolluptasksandmilestones)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$source</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>Обязательное</b> - массив [идентификаторов всех связей, исходящих из задачи](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$split_subtask</b></td>
  <td><i>boolean</i></td>
  <td>Присутствует, если задача является подзадачей split-задачи (отображается в одной строке с другими подзадачами)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$target</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>Обязательное</b> - массив [идентификаторов связей, направленных на задачу](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$transparent</b></td>
  <td><i>boolean</i></td>
  <td>Временное свойство, добавляемое при вертикальном перетаскивании, делает задачу полупрозрачной в гриде.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$virtual</b></td>
  <td><i>boolean</i></td>
  <td>Добавляется для задач, сгруппированных по определенному критерию. Задачи с <b>$virtual: true</b> удаляются при сбросе группировки.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$wbs</b></td>
  <td><i>string</i></td>
  <td>WBS-код задачи (временный). Добавляется после вызова [getWBSCode()](api/method/getwbscode.md). Если код меняется из-за изменений родителя или позиции, вызовите [getWBSCode()](api/method/getwbscode.md) повторно для обновления.</td>
  </tr>
  </tbody>
</table>

## Пример

~~~js
const data = {
  tasks: [
    { id: 1, text: "Project #1", start_date: "01-04-2025", duration: 18 },
    { id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8, parent: 1 },
    { id: 3, text: "Task #2", start_date: "11-04-2025", duration: 8, parent: 1 }
  ],
  links: []
};
~~~

