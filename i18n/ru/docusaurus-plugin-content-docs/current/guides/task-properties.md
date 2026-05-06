---
title: "Свойства задачи"
sidebar_label: "Свойства задачи"
---

# Свойства задачи

На этой странице приведён полный список свойств, которые может включать объект задачи.

Полный список свойств объекта ссылки приведён в статье [Свойства ссылки](guides/link-properties.md).


## Обязательные свойства

Эти свойства будут всегда определены на клиенте. Gantt ожидает, что свойства будут заданы в объекте задачи при загрузке данных, но если они не заданы, Gantt добавит их сам.  
Если вы удалите одно из этих свойств у загруженных задач, Gantt начнёт выдавать ошибки.

<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>Идентификатор задачи, автоматически генерируется, если не установлен</td>
  </tr>
  <tr>
  <td><b class="subproperty">start_date</b></td>
  <td><i>Date</i></td>
  <td>Дата начала задачи. [Data Loading](guides/loading.md#loadingtaskdates) Если не указана, Gantt рассчитает её на основе свойств <b>end_date</b> и <b>duration</b>. Свойство становится необязательным при установке <b>unscheduled: true</b>.</td>
  </tr>
  <tr>
  <td><b class="subproperty">end_date</b></td>
  <td><i>Date</i></td>
  <td>Дата завершения задачи. [Data Loading](guides/loading.md#loadingtaskdates) Если не указана, Gantt рассчитает её на основе свойств <b>start_date</b> и <b>duration</b>. Свойство становится необязательным при установке <b>unscheduled: true</b>.</td>
  </tr>
  <tr>
  <td><b class="subproperty">duration</b></td>
  <td><i>number</i></td>
  <td>Длительность задачи. [Data Loading](guides/loading.md#loadingtaskdates) Если не указана, Gantt рассчитает её на основе свойств <b>start_date</b> и <b>end_date</b>.</td>
  </tr>
  </tbody>
</table>


## Необязательные свойства

Эти свойства могут быть определены, а могут и отсутствовать. По умолчанию Gantt будет использовать эти свойства, если они заданы.

<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">auto_scheduling</b></td>
  <td><i>boolean</i></td>
  <td>Определяет, следует ли Gantt выполнять авто-планирование задачи (<i>true</i> или не указано) или нет (<i>false</i>)</td>
  </tr>
  <tr>
  <td><b class="subproperty">bar_height</b></td>
  <td><i>number</i></td>
  <td>Устанавливает высоту DOM-элемента задачи в области таймлайна</td>
  </tr>
  <tr>
  <td><b class="subproperty">baselines</b></td>
  <td><i>Baseline[]</i></td>
  <td>Массив базовых линий</td>
  </tr>
  <tr>
  <td><b class="subproperty">calendar_id</b></td>
  <td><i>number | string</i></td>
  <td>Задает id пользовательского календаря, который будет присвоен задаче. Имя свойства зависит от значения параметра [calendar_property](api/config/calendar_property.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">color</b></td>
  <td><i>string</i></td>
  <td>Задает цвет задачи в области таймлайна (то есть устанавливает <b>background-color</b> для элемента <b>gantt_task_line</b> задачи)</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_date</b></td>
  <td><i>Date</i></td>
  <td>Дата ограничения задачи. Добавляется в объект задачи при включённом [auto-scheduling with time constraints](api/config/auto_scheduling.md). Свойство не используется, если включено [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_type</b></td>
  <td><i>string</i></td>
  <td>[Тип ограничения задачи ("asap", "alap", "snet", "snlt", "fnet", "fnlt", "mso", "mfo")](guides/auto-scheduling.md#timeconstraintsfortasks). Добавляется в объект задачи при включённом авто-планировании с временными ограничениями. Свойство не используется, если включено [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">deadline</b></td>
  <td><i>Date</i></td>
  <td>Задает крайний срок выполнения задачи. В таймлайне отображается визуальный индикатор при установке этого свойства.</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>Определяет, может ли задача быть [редактируемой](guides/readonly-mode.md#readonlymodefortheentiregantt) в режиме только для чтения Gantt. Имя свойства зависит от значения опции [editable_property](api/config/editable_property.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">group_id</b></td>
  <td><i>string | number</i></td>
  <td>Идентификатор группы. Добавляется к задачам, сгруппированным по некоторому критерию, если свойство, используемое для группировки задач ([relation_property](guides/grouping.md#groupingtasks) в методе groupBy()) задано как объект.</td>
  </tr>
  <tr>
  <td><b class="subproperty">hide_bar</b></td>
  <td><i>boolean</i></td>
  <td>Задаёт, следует ли скрывать задачу (type:"task") или веху (type:"milestone") в области таймлайна.</td>
  </tr>
  <tr>
  <td><b class="subproperty">key</b></td>
  <td><i>string | number</i></td>
  <td>Ключ группы. Добавляется к задачам, сгруппированным по некоторому критерию, если свойство, используемое для группировки задач ([relation_property](guides/grouping.md#groupingtasks) в методе groupBy()), задано как массив. Также добавляется к задачам с названием группы (например, к задачам с названиями "High", "Normal", "Low", если вы группировали задачи по приоритету. [Пример](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)).</td>
  </tr>
  <tr>
  <td><b class="subproperty">label</b></td>
  <td><i>string</i></td>
  <td>Метка группы. Добавляется к задачам с названием группы (например, если вы группировали задачи по приоритету, свойство будет добавлено к задачам с названиями "High", "Normal", "Low". [Пример](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)).</td>
  </tr>
  <tr>
  <td><b class="subproperty">open</b></td>
  <td><i>boolean</i></td>
  <td>Задает, будет ли ветка задачи открыта по умолчанию (для показа дочерних задач). Чтобы закрыть/открыть ветку после инициализации Gantt, используйте соответствующие методы: [close()](api/method/close.md) и [open()](api/method/open.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">parent</b></td>
  <td><i>number | string</i></td>
  <td>Идентификатор родительской задачи. Если указанный родитель не существует, задача не будет отрисована в Gantt. Идентификатор корневой задачи задаётся конфигурацией [root_id](api/config/root_id.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">progress</b></td>
  <td><i>number</i></td>
  <td>Прогресс задачи (от 0 до 1)</td>
  </tr>
  <tr>
  <td><b class="subproperty">progressColor</b></td>
  <td><i>string</i></td>
  <td>Цвет прогресса задачи на таймлайне (то есть устанавливает <b>background-color</b> для элемента <b>gantt_task_progress</b> прогресса задачи)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>Определяет, должна ли задача быть [readonly](guides/readonly-mode.md#readonlymodeforspecifictaskslinks) в режиме только для чтения Gantt. Имя свойства зависит от значения опции [readonly_property](api/config/readonly_property.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">render</b></td>
  <td><i>string</i></td>
  <td>Определяет, как должны отображаться подпроекты задачи. Значения: <i>"split" | ""</i>. Если установить <i>"split"</i>, подпроекты будут отображаться в одной строке. Также, если включено свойство [open_split_tasks](api/config/open_split_tasks.md), подпроекты будут отрисованы в одной строке только если задача свернута.</td>
  </tr>
  <tr>
  <td><b class="subproperty">resource</b></td>
  <td><i>Array &lt;string&gt;</i></td>
  <td>Массив ресурсов, назначенных задаче. Добавляется к объекту задачи при импорте данных из MS Project/Primavera</td>
  </tr>
  <tr>
  <td><b class="subproperty">rollup</b></td>
  <td><i>boolean</i></td>
  <td>Указывает, должна ли задача (type:"task") или веха (type:"milestone") «появляться» на родительских проектах [should appear on the parent projects](guides/milestones.md#rolluptasksandmilestones).</td>
  </tr>
  <tr>
  <td><b class="subproperty">row_height</b></td>
  <td><i>number</i></td>
  <td>Устанавливает высоту строки задачи</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string</i></td>
  <td>Идентификатор целевой задачи. Свойство отображает такое же значение, как и свойство <b>$drop_target</b>. Свойство добавляется к объекту задачи только если включён Data Processor, после обновления задачи и отправки данных на сервер.</td>
  </tr>
  <tr>
  <td><b class="subproperty">text</b></td>
  <td><i>any</i></td>
  <td>Название задачи. При необходимости можно использовать любое другое имя для этого свойства. Свойство используется в конфигурациях по умолчанию различных частей Gantt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">textColor</b></td>
  <td><i>string</i></td>
  <td>Цвет текста задачи в области таймлайна (то есть устанавливает <b>color</b> для элемента <b>gantt_task_line</b> задачи)</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>Тип задачи. Доступные значения хранятся в объекте [types](api/config/types.md): <ul> <li>["task"](guides/task-types.md#regular-tasks) — обычная задача (<i>по умолчанию</i>).</li> <li>["project"](guides/task-types.md#project-tasks) — задача, которая начинается, когда начинается её самая ранняя подпро/tasks, и заканчивается, когда заканчивается её самая поздняя подпроекта. <i>Свойства start_date, end_date, duration игнорируются для таких задач.</i> </li> <li>["milestone"](guides/task-types.md#milestones) — задача нулевой продолжительности, используемая для пометки важных дат проекта. <i>Свойства duration, progress, end_date игнорируются для таких задач.</i> </li> </ul></td>
  </tr>
  <tr>
  <td><b class="subproperty">unscheduled</b></td>
  <td><i>boolean</i></td>
  <td>Определяет, должна ли задача быть [unscheduled](guides/unscheduled-tasks.md). По умолчанию несвоевременная задача не отображается в области таймлайна, в гриде вместо дат начала и конца отображаются пустые значения.</td>
  </tr>
  </tbody>
</table>


## Динамические свойства

Динамические свойства создаются на клиенте и представляют текущее состояние задачи или ссылки. Их не следует сохранять в базе данных, Gantt игнорирует эти свойства, если они указаны в вашем JSON/XML.


<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">[resource_property]</b></td>
  <td><i>string | Array &lt;any&gt;</i></td>
  <td>[resource_property](api/config/resource_property.md) Свойство может иметь любое другое имя. Это свойство хранит идентификатор ресурса, связанный с <i>resourceGrid/Timeline/Histogram/Calendar.</i></td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_end_date</b></td>
  <td><i>Date</i></td>
  <td>Вычисляемая дата окончания проекта из его подпроектов. Добавляется и обновляется, когда <i>auto_scheduling</i> отключено.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_start_date</b></td>
  <td><i>Date</i></td>
  <td>Вычисляемая дата начала проекта из его подпроектов. Добавляется и обновляется, когда <i>auto_scheduling</i> отключено.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$calculate_duration</b></td>
  <td><i>boolean</i></td>
  <td>Системное свойство, которое используется во внутренних расчётах.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$custom_data</b></td>
  <td><i>object</i></td>
  <td>Объект, содержащий пользовательские свойства задачи, определённые в методах [importFromMSProject()](api/method/importfrommsproject.md) и [importFromPrimaveraP6()](api/method/importfromprimaverap6.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$dataprocessor_class</b></td>
  <td><i>string</i></td>
  <td>Системное свойство, которое определяет, была ли задача обновлена. Добавляется к объекту задачи при включённом Data Processor. Если значение свойства равно <i>"updated"</i>, текст задачи будет жирным в гриде, но можно задать свои стили через CSS.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$drop_target</b></td>
  <td><i>string</i></td>
  <td>Идентификатор целевой задачи. Временное свойство, которое добавляется к объекту задачи при вертикальном перетаскивании задачи.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$effective_calendar</b></td>
  <td><i>string</i></td>
  <td>Идентификатор календаря (или календаря ресурса), назначенного задаче. Системное свойство, используемое в внутренних расчётах.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$expanded_branch</b></td>
  <td><i>boolean</i></td>
  <td>Системное свойство, показывающее, видима ли задача в зависимости от того, раскрыты ли её родительские элементы. Если хотя бы один родитель свернут, задача не будет видима. Исключение составляют только разделённые задачи (subtasks).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$has_child</b></td>
  <td><i>boolean</i></td>
  <td>Задает, должен ли Gantt отправлять запрос на сервер для загрузки задач первого уровня дочерних. Свойство используется, когда включено свойство [branch_loading](api/config/branch_loading.md). Имя свойства зависит от значения опции [branch_loading_property](api/config/branch_loading_property.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$index</b></td>
  <td><i>number</i></td>
  <td>Глобальная вертикальная позиция задачи. Связывается с задачей и меняется, если открыты или закрыты задачи ниже или выше. Если родитель задачи свернут, свойство не показывает фактическую позицию задачи.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$level</b></td>
  <td><i>number</i></td>
  <td>Уровень задачи в иерархии задач (ноль-базовая нумерация)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$local_index</b></td>
  <td><i>number</i></td>
  <td>Вертикальная позиция задачи в ветке (под родителем). Это свойство не привязано к задаче и не меняется, если задачи ниже или выше открыты или закрыты как внутри ветки, так и глобально. Если родитель задачи свернут, свойство не показывает фактическую позицию задачи.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$new</b></td>
  <td><i>boolean</i></td>
  <td>Добавляется к новой задаче при создании через метод [createTask](api/method/createtask.md) или через кнопку "+". Свойство добавляется к объекту задачи, когда вы открываете лайтбокс, и удаляется после сохранения задачи.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_end</b></td>
  <td><i>boolean</i></td>
  <td><b>Обязательно</b>, системное свойство, которое добавляется в объект задачи. <i>True</i>, если свойство <b>end_date</b> не могло быть рассчитано (когда загружено свойство <b>start_date</b>, но нет <b>duration</b> или <b>end_date</b>). В таком случае переместить или изменить размер задачи невозможно. Свойство <b>end_date</b> будет зависеть от даты окончания её подпроектов (если они есть). Свойство <b>start_date</b> будет зафиксировано и не изменится. Автопланирование не работает для такой задачи. Если включено свойство <b>$no_start</b>, задача полностью будет зависеть от дат её подпроектов или от даты первого задания.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_start</b></td>
  <td><i>boolean</i></td>
  <td><b>Обязательно</b>, системное свойство, которое добавляется в объект задачи. <i>True</i>, если свойство <b>start_date</b> не может быть рассчитано (когда загружено <b>end_date</b>, но нет <b>duration</b> или <b>start_date</b>). Свойство <b>start_date</b> будет зависеть от <b>start_date</b> подпроектов (если таковые имеются) или от даты начала первого задания. Свойство <b>end_date</b> будет зафиксировано и будет меняться только если дата начала подпроектов/первого задания больше даты окончания задачи. Автопланирование не работает для такой задачи. Если включено свойство <b>$no_end</b>, задача полностью будет зависеть от дат её подпроектов или от даты первого задания.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$open</b></td>
  <td><i>boolean</i></td>
  <td>Системное свойство, которое задаёт, открыта ли задача в данный момент (<i>true</i>). Если изменить значение свойства и перерасчёть Gantt, задача откроется или закроется. Чтобы изменить состояние задачи, можно также применить методы [open](api/method/open.md) или [close](api/method/close.md).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$raw</b></td>
  <td><i>object</i></td>
  <td>Объект с оригинальными именами свойств задачи, которые были импортированы из [MS Project](guides/export-msproject.md) / [Primavera](guides/export-primavera.md) в модуль экспорта (export сервер). Свойства появляются в объекте <b>$raw</b> во время конвертации файла в формат JSON, но до того, как они будут преобразованы в имена и формат, ожидаемые Gantt.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_at</b></td>
  <td><i>string | number</i></td>
  <td>Идентификатор строки, на которой отрисован элемент <i>rollup</i> / задача <i>split</i>. Это временное свойство, которое появляется в объекте задачи-роллапа/разделённой задачи только тогда, когда она отрисовывается на странице.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_parent</b></td>
  <td><i>number | string</i></td>
  <td>Идентификатор родителя, под которым задача отрисована (не идентификатор реального родителя задачи). Свойство используется во внутренних расчётах и при группировке задач.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_type</b></td>
  <td><i>string</i></td>
  <td>Тип отрисованной задачи (временное свойство).</td>
  </tr>
  <tr>
  <td><b class="subproperty">$resourceAssignments</b></td>
  <td><i>Array &lt;any&gt;</i></td>
  <td>Массив идентификаторов ресурсов, назначенных задаче (временное свойство). Но фактические данные чаще всего хранятся в хранилище назначений ресурсов, а не в этом свойстве.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rollup</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td>Массив идентификаторов задач и вех, которые appeared on the current task</td>
  </tr>
  <tr>
  <td><b class="subproperty">$source</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>Required</b>, массив с [id всех связей, выходящих из задачи](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$split_subtask</b></td>
  <td><i>boolean</i></td>
  <td>Появляется, если задача является подпроектом разделённой задачи (то есть расположена в одной строке с другими подпроектами)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$target</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>Required</b>, массив с [id связей, входящих в задачу](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$transparent</b></td>
  <td><i>boolean</i></td>
  <td>Временное свойство, добавляемое к объекту задачи при вертикальном перетаскивании. Задача выглядит немного полупрозрачной в гриде при вертикальном перетаскивании из-за этого свойства.</td>
  </tr>
  <tr>
  <td><b class="subproperty">$virtual</b></td>
  <td><i>boolean</i></td>
  <td>Оно добавляется к задачам, сгруппированным по какому-либо критерию. После сброса группировки задачи с <b>$virtual: true</b> удаляются</td>
  </tr>
  <tr>
  <td><b class="subproperty">$wbs</b></td>
  <td><i>string</i></td>
  <td>Код WBS задачи (временное свойство). Он добавляется к объекту задачи после применения метода <b>getWBSCode</b>. Если значение кода изменилось (родитель или положение задачи поменялось), нужно снова вызвать метод <b>getWBSCode</b> для получения обновленного значения кода.</td>
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