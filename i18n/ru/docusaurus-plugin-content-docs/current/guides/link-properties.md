---
title: "Свойства связей"
sidebar_label: "Свойства связей"
---

# Свойства связи

На этой странице представлен полный список свойств, которые может содержать объект связи.

Полный список свойств объекта задачи приведён в статье [Свойства задачи](guides/task-properties.md).

## Обязательные свойства

<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>идентификатор связи</td>
  </tr>
  <tr>
  <td><b class="subproperty">source</b></td>
  <td><i>string | number</i></td>
  <td>идентификатор задачи, с которого начинается зависимость</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string | number</i></td>
  <td>идентификатор задачи, к которой будет завершаться зависимость</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>тип зависимости. Доступные значения хранятся в объекте [links](api/config/links.md). По умолчанию они: <ul> <li><b>"0"</b> - 'finish_to_start'.</li> <li><b>"1"</b> - 'start_to_start'.</li> <li><b>"2"</b> - 'finish_to_finish'.</li> <li><b>"3"</b> - 'start_to_finish'.</li> </ul></td>
  </tr>
  </tbody>
</table>

Если вы хотите хранить типы зависимостей иным способом, чем значения по умолчанию ('0','1','2'), вы можете поменять значения соответствующих свойств объекта [links](api/config/links.md). Например:

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

Обратите внимание, эти значения влияют только на способ хранения типа зависимости, а не на поведение визуализации. 

## Необязательные свойства

<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">lag</b></td>
  <td><i>number</i></td>
  <td>[задержка задачи](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>можно пометить связь как [readonly](guides/readonly-mode.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>можно пометить связь как [editable](guides/readonly-mode.md#details-of-the-editable_property-config-option)</td>
  </tr>
  </tbody>
</table>

## Пример

~~~js
var data = {
    tasks: [
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
         {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
         {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
    ]
};
~~~