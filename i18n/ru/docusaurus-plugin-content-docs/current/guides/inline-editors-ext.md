---
title: "Inline Editors Extension"
sidebar_label: "Inline Editors Extension"
---

Inline Editors Extension
========================

Более подробную информацию о расширении Inline editors вы можете найти в статье [Редактирование 'на месте' в гриде](guides/inline-editing.md). 

 Объект *inlineEditors* предоставляет следующий API:

## Методы

### Действия:

- <span class="submethod">**startEdit (taskId, columnName): void**</span> - открывает редактор для указанной задачи и ячейки, заполняет его сопоставленным значением и устанавливает фокус на редактор
    - **_taskId_** - (*number | string*) - ID задачи
    - **_columnName_** - (*string*) - имя колонки
- <span class="submethod">**show (taskId, columnName): void**</span> - открывает пустой редактор в указанной задаче и ячейке
    - **_taskId_** - (*number | string*) - ID задачи
    - **_columnName_** - (*string*) - имя колонки
- <span class="submethod">**setValue (): void**</span> - заполняет открытый редактор значениями из задачи
- <span class="submethod">**save (): void**</span> - сохраняет изменения и закрывает редактор
- <span class="submethod">**hide (): void**</span> - закрывает редактор без сохранения изменений
- <span class="submethod">**focus (): void**</span> - устанавливает фокус на редактор 
- <span class="submethod">**getState (): object**</span> - возвращает объект состояния редактора (id: taskId, columnName: columnName, placeholder: HTMLElement)
- <span class="submethod">**getValue (): string**</span> - возвращает текущее значение редактора

### Состояние: 

- <span class="submethod">**isChanged (): boolean**</span> - определяет, отличается ли текущее значение редактора от начального
- <span class="submethod">**isVisible (): boolean**</span> - определяет, открыт ли редактор в данный момент

### События:

- <span class="submethod">**attachEvent (name, handler): string**</span> - добавляет обработчик события к объекту inlineEditors
    - **_name_** - (*string*) - имя события
    - **_handler_** - (*Function*) - функция-обработчик, вызываемая при наступлении события
- <span class="submethod">**detachEvent (id): void**</span> - удаляет ранее добавленный обработчик события 
    - **_id_** - (*string*) - ID обработчика события


### Навигация:

- <span class="submethod">**editNextCell (canChangeRow): void**</span> - сохраняет текущий редактор и переходит к следующей ячейке 
    - **_canChangeRow?_**  - (*boolean*) - определяет, может ли редактор перейти к первой ячейке следующей строки после последней ячейки текущей строки
- <span class="submethod">**editNextRow (skipReadonly): void**</span> - сохраняет текущий редактор и открывает редактор в той же ячейке задачи ниже
    - **_skipReadonly?_**  - (*boolean*) - если true, пропускает только для чтения задачи и открывает редактор в первой доступной для редактирования задаче ниже; если false (по умолчанию), закрывает редактор при попытке перейти к задаче только для чтения
- <span class="submethod">**editPrevCell (canChangeRow): void**</span> - сохраняет текущий редактор и переходит к предыдущей ячейке 
    - **_canChangeRow?_**  - (*boolean*) - определяет, может ли редактор перейти к последней ячейке предыдущей строки после первой ячейки текущей строки
- <span class="submethod">**editPrevRow (skipReadonly): void**</span> - сохраняет текущий редактор и открывает редактор в той же ячейке задачи выше
    - **_skipReadonly?_**  - (*boolean*) - если true, пропускает только для чтения задачи и открывает редактор в первой доступной для редактирования задаче выше; если false (по умолчанию), закрывает редактор при попытке перейти к задаче только для чтения
- <span class="submethod">**getFirstCell (): string**</span> - возвращает имя первой доступной для редактирования колонки в гриде
- <span class="submethod">**getLastCell (): string**</span> - возвращает имя последней доступной для редактирования колонки в гриде
- <span class="submethod">**getNextCell (direction): string | null**</span> - возвращает имя следующей доступной для редактирования колонки
    - **_direction_**  - (*number*) - направление движения: `1` - вправо, `-1` - влево


### Вспомогательные функции:

- <span class="submethod">**locateCell (node): object | null**</span> - проверяет, является ли указанный DOM-элемент ячейкой задачи, и возвращает объект состояния редактора, если это так: (id: taskId, columnName: columnName)
    - **_node_** - (*HTMLElement*) - HTML-элемент


### Маппинг мыши/клавиатуры:

- <span class="submethod">**setMapping (mapping): void**</span> - задаёт объект конфигурации маппинга
    - **_mapping_** - (*object*) - объект, определяющий маппинг:
        - **_init_** - (*Function*): void - инициализирует маппинг
            - **_inlineEditors_** - (*InlineEditorMethods*) - объект inlineEditors
            - **_grid_** - (*any*) - представление грида
        - **_onShow_** - (*Function*): void - вызывается при открытии inline редактора
            - **_inlineEditors_** - (*InlineEditorMethods*) - объект inlineEditors
            - **_node_** - (*HTMLElement*) - HTML-элемент
            - **_grid_** - (*any*) - представление грида
        - **_onHide_** - (*Function*): void - вызывается при закрытии inline редактора
            - **_inlineEditors_** - (*InlineEditorMethods*) - объект inlineEditors
            - **_node_** - (*HTMLElement*) - HTML-элемент
            - **_grid_** - (*any*) - представление грида
        - **_destroy_** - (*Function*): void - очищает маппинг
- <span class="submethod">**getMapping (): object**</span> - возвращает текущий применённый объект маппинга


## События

### <span class="eventname">onBeforeEditStart</span>

Аргументы:
<span class="eventarguments">

- **_state_** - (*object*) - объект состояния редактора
    - **_id_** - (*number | string*) - ID редактируемой задачи
    - **_columnName_** - (*string*) - имя колонки
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
    - **_id_** - (*number | string*) - ID редактируемой задачи
    - **_columnName_** - (*string*) - имя колонки
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~

### <span class="eventname">onBeforeSave</span>

Вызывается, когда редактор собирается закрыться и сохранить изменения

Аргументы:
<span class="eventarguments">

- **_state_** - (*object*) - объект состояния редактора
    - **_id_** - (*number | string*) - ID редактируемой задачи
    - **_columnName_** - (*string*) - имя колонки
    - **_oldValue_** - (*any*) - исходное значение в редакторе
    - **_newValue_** - (*any*) - текущее значение в редакторе, может быть изменено
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

Вызывается после того, как задача была обновлена из редактора

Аргументы:
<span class="eventarguments">

- **_state_** - (*object*) - объект состояния редактора
    - **_id_** - (*number | string*) - ID редактируемой задачи
    - **_columnName_** - (*string*) - имя колонки
    - **_oldValue_** - (*any*) - исходное значение в редакторе
    - **_newValue_** - (*any*) - текущее значение в редакторе
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

Вызывается после закрытия inline редактора

Аргументы:
<span class="eventarguments">

- **_state_** - (*object*) - объект состояния редактора
    - **_id_** - (*number | string*) - ID редактируемой задачи
    - **_columnName_** - (*string*) - имя колонки
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~
