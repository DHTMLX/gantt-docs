---
sidebar_label: static_background_cells
title: static_background_cells config
description: "позволяет отображать выделенные ячейки при использовании режима static_background"
---

# static_background_cells
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Позволяет отображать выделенные ячейки при использовании режима static_background

@signature: static_background_cells: boolean

### Example

~~~jsx
gantt.config.static_background_cells = false;
~~~

**Default value:** true

### Details

Этот параметр работает совместно с конфигурацией из [static_background](api/config/static_background.md).
Когда одновременно включены **static background** и **static_background_cells**, 
и при этом gantt.config.static_background_cells установлен в true (значение по умолчанию), gantt отрисовывает как PNG сетку, так и выделенные ячейки (те, которым назначен CSS класс из шаблона timeline_cell_class).

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = true; // включено по умолчанию
~~~

Если **static_background** включён, а **static_background_cells** выключен, gantt отрисует только PNG сетку, как это было до версии 6.2.

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = false;
~~~

Если **static_background** выключен, настройка **static_background_cells** не влияет на отображение.

~~~js
gantt.config.static_background = false;
~~~

Эта опция позволяет вернуть поведение **static_background** к тому, как оно было в версии 6.1.

### Related API
- [static_background](api/config/static_background.md)

### Change log
- добавлено в версии 6.2 для сохранения совместимости с версией 6.1

