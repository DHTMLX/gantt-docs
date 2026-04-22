---
title: "Расширение встроенных редакторов"
sidebar_label: "Расширение встроенных редакторов"
---

# Расширение встроенных редакторов

Подробнее об расширении встроенных редакторов читайте в статье [Встроенное редактирование в грид](guides/inline-editing.md).

Объект *inlineEditors* обладает следующим API:

## Методы

### Действия:

- <span class="submethod">**startEdit (taskId, columnName): void**</span> - открывает редактор в указанной задаче/ячейке, устанавливает сопоставленное значение и устанавливает фокус на редактор
    - **_taskId_** - (*number | string*) - идентификатор задачи
    - **_columnName_** - (*string*) - имя столбца
- <span class="submethod">**show (taskId, columnName): void**</span> - открывает пустой редактор в указанной задаче/ячейке
    - **_taskId_** - (*number | string*) - идентификатор задачи
    - **_columnName_** - (*string*) - имя столбца
- <span class="submethod">**setValue (): void**</span> - заполняет открытый редактор значениями из задачи
- <span class="submethod">**save (): void**</span> - сохраняет изменения и скрывает редактор
- <span class="submethod">**hide (): void**</span> - скрывает редактор без сохранения изменений
- <span class="submethod">**focus (): void**</span> - устанавливает фокус на редактор
- <span class="submethod">**getState (): object**</span> - получает объект состояния (id: taskId, columnName: columnName, placeholder: HTMLElement)
- <span class="submethod">**getValue (): string**</span> - получает текущее значение редактора

### Состояние:

- <span class="submethod">**isChanged (): boolean**</span> - проверяет, отличается ли текущее значение редактора от исходного значения
- <span class="submethod">**isVisible (): boolean**</span> - проверяет, открыт ли редактор

### События:

- <span class="submethod">**attachEvent (name, handler): string**</span> - прикрепляет обработчик события к объекту inlineEditors
    - **_name_** - (*string*) - имя обработчика события
    - **_handler_** - (*Function*) - функция, которая будет вызвана при срабатывании события
- <span class="submethod">**detachEvent (id): void**</span> - отсоединяет обработчик от события (который был прикреплён ранее методом attachEvent())
    - **_id_** - (*string*) - идентификатор прикрепленного обработчика события


### Навигация:

- <span class="submethod">**editNextCell (canChangeRow): void**</span> - сохраняет текущий редактор и перемещает редактор к следующей ячейке
    - **_canChangeRow?_**  - (*boolean*) - параметр задаёт, может ли редактор перейти к первой ячейке следующей строки после последней ячейки текущей
- <span class="submethod">**editNextRow (skipReadonly): void**</span> - сохраняет текущий редактор и открывает редактор в той же ячейке задачи ниже
    - **_skipReadonly?_**  - (*boolean*) - параметр задаёт, может ли пропустить задачу только для чтения и открыть редактор в ячейке первой редактируемой задачи. Значение по умолчанию *false* закрывает редактор, если следующая задача является задачей только для чтения.
- <span class="submethod">**editPrevCell (canChangeRow): void**</span> - сохраняет текущий редактор и перемещает редактор к предыдущей ячейке
    - **_canChangeRow?_**  - (*boolean*) - параметр задаёт, может ли редактор переместиться к последней ячейке строки над текущей после достижения первой ячейки текущей строки
- <span class="submethod">**editPrevRow (skipReadonly): void**</span> - сохраняет текущий редактор и открывает редактор в той же ячейке задачи сверху
    - **_skipReadonly?_**  - (*boolean*) - параметр задаёт, может ли пропустить задачу только для чтения и открыть редактор в ячейке первой редактируемой задачи. Значение по умолчанию *false* закрывает редактор, если предыдущая задача является задачей только для чтения.
- <span class="submethod">**getFirstCell (): string**</span> - получает имя первой редактируемой колонки в гриде
- <span class="submethod">**getLastCell (): string**</span> - получает имя последней редактируемой колонки в гриде
- <span class="submethod">**getNextCell (direction): string | null**</span> - возвращает имя следующей редактируемой колонки
    - **_direction_**  - (*number*) - параметр задаёт направление, в котором следует перебирать следующую ячейку. `1` - вправо, `-1` - влево.


### Помощники:

- <span class="submethod">**locateCell (node): object | null**</span> - проверяет, является ли данный DOM-элемент объектом ячейки задачи и возвращает объект состояния редактора, если это так: (id: taskId, columnName: columnName)
    - **_node_** - (*HTMLElement*) - HTML-элемент


### Маппинг мыши/клавиатуры:

- <span class="submethod">**setMapping (mapping): void**</span> - устанавливает объект отображения
    - **_mapping_** - (*object*) - объект с конфигурацией отображения:
        - **_init_** - (*Function*): void - метод инициализации отображения
            - **_inlineEditors_** - (*InlineEditorMethods*) - объект inlineEditors
            - **_grid_** - (*any*) - представление макета Grid
        - **_onShow_** - (*Function*): void - метод, который будет вызван, когда встроенный редактор откроется
            - **_inlineEditors_** - (*InlineEditorMethods*) - объект inlineEditors
            - **_node_** - (*HTMLElement*) - HTML-элемент
            - **_grid_** - (*any*) - представление макета Grid
        - **_onHide_** - (*Function*): void - метод, который будет вызван, когда встроенный редактор закроется
            - **_inlineEditors_** - (*InlineEditorMethods*) - объект inlineEditors
            - **_node_** - (*HTMLElement*) - HTML-элемент
            - **_grid_** - (*any*) - представление макета Grid
        - **_destroy_** - (*Function*): void - метод уничтожения отображения
- <span class="submethod">**getMapping (): object**</span> - возвращает текущий применённый объект отображения


## События

### <span class="eventname">onBeforeEditStart</span>

Аргументы:
<span class="eventarguments">

- **_state_** - (*object*) - объект состояния редактора
    - **_id_** - (*number | string*) - идентификатор редактируемой задачи
    - **_columnName_** - (*string*) - имя столбца
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
   return true;
});
~~~


### <span class="eventname">onEditStart</span>

Аргументы:
<span class="eventarguments">

- **_state_** - (*object*) - объект состояния редактора
    - **_id_** - (*number | string*) - идентификатор редактируемой задачи
    - **_columnName_** - (*string*) - имя столбца
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~


### <span class="eventname">onBeforeSave</span>

срабатывает, когда редактор собирается закрыться и сохранить изменения

Аргументы:
<span class="eventarguments">

- **_state_** - (*object*) - объект состояния редактора
    - **_id_** - (*number | string*) - идентификатор редактируемой задачи
    - **_columnName_** - (*string*) - имя столбца
    - **_oldValue_** - (*any*) - исходное значение редактора
    - **_newValue_** - (*any*) - текущее значение редактора, может быть изменено
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
   return true;
});
~~~


### <span class="eventname">onSave</span>

срабатывает после того, как задача обновлена редактором

Аргументы:
<span class="eventarguments">

- **_state_** - (*object*) - объект состояния редактора
    - **_id_** - (*number | string*) - идентификатор редактируемой задачи
    - **_columnName_** - (*string*) - имя столбца
    - **_oldValue_** - (*any*) - исходное значение редактора
    - **_newValue_** - (*any*) - текущее значение редактора
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
});
~~~


### <span class="eventname">onEditEnd</span>

вызывает после скрытия встроенного редактора


Аргументы:
<span class="eventarguments">

- **_state_** - (*object*) - объект состояния редактора
    - **_id_** - (*number | string*) - идентификатор редактируемой задачи
    - **_columnName_** - (*string*) - имя столбца
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~