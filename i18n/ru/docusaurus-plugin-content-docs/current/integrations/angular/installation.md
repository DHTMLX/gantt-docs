---
title: Установка Angular Gantt
sidebar_label: Установка
description: "Как установить пробную или профессиональную версию Angular Gantt и подключить импорты в проектах Angular."
---

# Установка Angular Gantt

Angular Gantt доступен в двух дистрибутивах:

1. **Пробная версия** общедоступна в npm, включает водяной знак пробной версии и может дополнительно сопровождаться бесплатным периодом оценки, который предоставляет доступ к технической поддержке.
2. **Профессиональная (коммерческая) версия** доступна из приватного репозитория DHTMLX в npm и предназначена для использования в продакшн.
 
Оба пакета содержат один и тот же API.

## Установка пакета для оценки (Public npm)

Пробная сборка доступна в npm как [@dhtmlx/trial-angular-gantt](https://www.npmjs.com/package/@dhtmlx/trial-angular-gantt):

- npm:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

Эта сборка полностью функциональна, но отображает сообщение о том, что библиотека работает в режиме оценки.

### Опционально: начать полный период оценки (рекомендуется)

Хотя пробный пакет устанавливается без ограничений, вы также можете начать официальную оценку через сайт по адресу
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml).

Начало формальной оценки даёт вам бесплатную техническую поддержку в течение пробного периода.

**Загрузка офлайн-примеров (zip)**

Форма для оценки также включает ZIP-файл с офлайн-готовыми примерами.

Вы также можете просмотреть дополнительные примеры и демонстрационные проекты на официальном GitHub, посмотрев [Angular Gantt Demos на GitHub](https://github.com/DHTMLX/?q=angular-gantt&type=all&language=&sort=).

## Установка Professional-пакета (Private npm)

Профессиональная версия предназначена для production-приложений и включает коммерческую лицензию и полный доступ к технической поддержке.

После получения коммерческой лицензии вы сможете генерировать ваши приватные учетные данные npm в [Client's Area](https://dhtmlx.com/clients/).

После генерации логина/пароля настройте npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Затем установите Professional-пакет:

- npm:

~~~bash
npm install @dhx/angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhx/angular-gantt
~~~

## Требования к проекту Angular

 wrapper-пери зависимостей на данный момент требуют:

- `@angular/common >= 19.0.0`
- `@angular/core >= 19.0.0`
- `rxjs >= 6.0.0`


## Матрица импортов (Import Matrix)

Используйте импорты, соответствующие каналу пакета, который вы установили.

| Пакет | Импорт обертки | Импорт CSS |
| --- | --- | --- |
| `@dhtmlx/trial-angular-gantt` | `import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";` | `@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";` |
| `@dhx/angular-gantt` | `import { DhxGanttComponent } from "@dhx/angular-gantt";` | `@import "@dhx/angular-gantt/dist/angular-gantt.css";` |

Добавьте импорт CSS в ваши глобальные стили Angular (например, в `src/styles.css`).

Это рекомендуемое значение по умолчанию для приложений Angular, потому что стили Gantt являются стилями на уровне всей библиотеки и не требуют области видимости компонентов Angular.

## Глобальный vs компонентный импорт CSS

- **Глобальный импорт:** импортируйте путь к CSS обертки из приведённой выше матрицы в `src/styles.css` (или зарегистрируйте его в `angular.json` в секции `styles`). Специальные настройки инкапсуляции компонентов не требуются.
- **Импорт CSS в stylesheet компонента:** вы можете импортировать тот же CSS в стиль-компонента (`styleUrls`), но тогда Angular по умолчанию применит `ViewEncapsulation.Emulated`, что ограничит селекторы и может помешать правильному применению внутренних стилей `.dhx-*` Gantt.

Если импортируете CSS Gantt в stylesheet компонента или определяете переопределения для внутренних классов Gantt (например, `.dhx-gantt-root`) в этом stylesheet, задайте:

~~~ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.None,
})
export class GanttPageComponent {}
~~~

Используйте этот подход в основном для самодостаточных демо/примеров. Для продакшн-приложений предпочитайте глобальный импорт.

## Standalone vs NgModule Projects

 wrapper поддерживает оба стиля Angular:

- **Standalone-компоненты**: импортируйте `DhxGanttComponent` в массив `imports` компонента.
- **NgModule-проекты**: импортируйте `DhxGanttModule` в ваш Angular-модуль.

Standalone-пример:

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks = [];
  links = [];
}
~~~

NgModule-пример:

~~~ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DhxGanttModule } from '@dhtmlx/trial-angular-gantt';

@NgModule({
  imports: [BrowserModule, DhxGanttModule],
})
export class AppModule {}
~~~

## Переход с пробной версии к коммерческой

Большинство проектов начинают с пробной версии и переключаются позже, после утверждения прототипа и оформления коммерческой лицензии. Оба пакета имеют один и тот же API, поэтому переход в основном механический: заменить имя пакета, заменить импорт CSS и переустановить.

После настройки приватного реестра, как показано выше, обновите каждый импорт в коде:

~~~ts
// до
import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";

// после
import { DhxGanttComponent } from "@dhx/angular-gantt";
~~~

И обновите импорт CSS в `src/styles.css`:

~~~css
/* до */
@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";

/* после */
@import "@dhx/angular-gantt/dist/angular-gantt.css";
~~~

Поиск по проекту любых оставшихся упоминаний `@dhtmlx/trial-angular-gantt`, включая путь импорта CSS — этот момент проще всего забыть. Замените зависимость в `package.json`, затем выполните `npm install` и запустите приложение. Если водяной знак исчезнет, а остальная часть UI будет работать идентично, переход завершён.

### Использование реестра в CI или общих средах сборки

`npm login` работает на машине разработчика, но CI-раннеры и другие общие среды сборки обычно не поддерживают интерактивный вход. Для таких случаев создайте неинтерактивный токен доступа с машины с входом в систему:

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

Токен будет выведен один раз в терминальном выводе — скопируйте его перед закрытием сессии, так как повторно получить его позже не получится. Затем поместите его в файл `.npmrc`, который сборка сможет прочитать:

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

Укажите `DHTMLX_NPM_TOKEN` как секрет в вашем CI-провайдере (GitHub Actions, GitLab и т. д.), чтобы токен никогда не попадал в репозиторий. Такой же подход подходит и для сборок Docker — внедряйте токен во время сборки, а не в образ. Если `npm install` терпит неудачу в CI с кодами 401 или 403 к `npm.dhtmlx.com`, секрет может отсутствовать, истечь срок или файл `.npmrc` не находиться в ожидаемом месте (наиболее надёжное место — корень проекта).

## Что читать дальше

- [Быстрый старт с Angular Gantt](integrations/angular/quick-start.md)
- [Обзор Angular Gantt](integrations/angular/overview.md)
- [Справочник по конфигурации](integrations/angular/configuration-props.md)