title: "Данные и управление состоянием"
description: "Как выбрать и реализовать управляемый Angular поток данных или управляемый Gantt поток данных в Angular Gantt."

This section explains how to keep Angular Gantt data consistent with your Angular UI, RxJS stores, and backend behavior.

## Начало работы

Сначала прочитайте [Основы привязки данных и управления состоянием](integrations/angular/state/state-management-basics.md).

В той статье объясняется:

- Angular state/store как источник истины,
- Gantt как источник истины,
- контракты обратных вызовов `data.save` и `data.batchSave`.

## Выберите модель владения данными

Используйте **Angular-состояние или хранение как источник истины** когда:

- окружающий Angular UI должен всегда отображать состояние графика,
- вы используете сервис/хранилище RxJS или централизованный слой состояния,
- предсказуемые односторонние обновления важнее пропускной способности редактирования.

Используйте **Gantt как источник истины** когда:

- страница ориентирована на график,
- объем обновлений высокий,
- вы хотите снизить текучесть хранилища приложения из-за частых изменений на стороне графика.

## Урок RxJS

Используйте [Урок RxJS в связке с Angular Gantt](integrations/angular/state/rxjs.md) для практической реализации, управляемой хранилищем, построенной вокруг `BehaviorSubject`, `AsyncPipe`, undo/redo и `data.batchSave`.

## Минимальный стартовый образец

~~~ts
readonly dataConfig: AngularGanttDataConfig = {
  batchSave: (changes) => this.ganttState.applyBatch(changes),
};
~~~

Где `ganttState` — внедрённый сервис `GanttStateService` (см. [Урок RxJS](integrations/angular/state/rxjs.md) для примера формы сервиса). Используйте этот образец, когда одно действие пользователя может привести к множеству обновлений задач/связей.

## Примечание по производительности

Для операций, таких как автоматическое планирование, предпочтительнее использовать `data.batchSave` вместо по‑изменению `data.save`, чтобы обновления состояния Angular происходили группами.

Форма обратных вызовов и компромиссы задокументированы в [Основы](integrations/angular/state/state-management-basics.md#callback-contracts).