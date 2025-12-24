---
title: "Свойства связей"
sidebar_label: "Свойства связей"
---

# Свойства связей


На этой странице перечислены все свойства, которые может иметь объект связи.

Для полного обзора свойств объекта задачи ознакомьтесь со статьёй [Task Properties](guides/task-properties.md).


## Обязательные свойства


<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>уникальный идентификатор связи</td>
  </tr>
  <tr>
  <td><b class="subproperty">source</b></td>
  <td><i>string | number</i></td>
  <td>id задачи, с которой начинается зависимость</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string | number</i></td>
  <td>id задачи, на которой заканчивается зависимость</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>тип зависимости. Доступные варианты определяются в объекте [links](api/config/links.md). По умолчанию используются следующие значения: <ul> <li><b>"0"</b> - 'finish_to_start'.</li> <li><b>"1"</b> - 'start_to_start'.</li> <li><b>"2"</b> - 'finish_to_finish'.</li> <li><b>"3"</b> - 'start_to_finish'.</li> </ul></td>
  </tr>
  </tbody>
</table>

Если вы хотите использовать другие значения для типов зависимостей вместо стандартных ('0','1','2'), вы можете настроить их, изменив соответствующие свойства в объекте [links](api/config/links.md). Например:

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

Обратите внимание, что это изменение влияет только на то, как тип зависимости сохраняется, а не на его отображение.


## Необязательные свойства


<table>
  <tbody>
  <tr>
  <th>Имя</th><th>Тип</th><th>Описание</th>
  </tr>
  <tr>
  <td><b class="subproperty">lag</b></td>
  <td><i>number</i></td>
  <td>[время задержки между задачами](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>отмечает связь как [только для чтения](guides/readonly-mode.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>отмечает связь как [редактируемую](guides/readonly-mode.md)</td>
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

