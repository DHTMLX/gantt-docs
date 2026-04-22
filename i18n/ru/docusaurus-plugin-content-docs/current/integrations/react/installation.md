--- 
title: Установка React Gantt
sidebar_label: Установка
description: "Как установить версию для оценки или коммерческую версию React Gantt через npm."
---

# Установка React Gantt

React Gantt доступен в двух дистрибутивах:

1. **Версия для оценки** общедоступна на npm, включает водяной знак для оценки и может дополнительно сопровождаться бесплатным периодом оценки, который предоставляет доступ к технической поддержке.
2. **Профессиональная (коммерческая) версия** доступна из приватного npm-репозитория DHTMLX и предназначена для использования в продакшне.

Оба пакета содержат один и тот же API.

## Установка версии для оценки (публичный npm)

Сборка для оценки доступна на npm как [@dhtmlx/trial-react-gantt](https://www.npmjs.com/package/@dhtmlx/trial-react-gantt):

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

Или с Yarn:

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Эта сборка полностью функциональна, но выводит сообщение о том, что библиотека работает в режиме оценки.

### Необязательно: начать полный период оценки (рекомендуется)

Хотя пакет для пробной версии устанавливается без ограничений, вы также можете начать официальную оценку через сайт по адресу
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml).

Начало формальной оценки дает вам бесплатную техническую поддержку в течение пробного периода.

**Скачивание офлайн-примеров (zip)**

Форма для оценки также включает скачиваемый ZIP-архив, содержащий офлайн-готовые примеры.

Вы также можете увидеть дополнительные примеры и демо-проекты на официальном GitHub, проверив [Демо-проекты React Gantt на GitHub](https://github.com/DHTMLX/?q=react-gantt&type=all&language=&sort=).

## Профессиональная версия (приватный npm-репозиторий)

Профессиональная версия предназначена для продакшн-приложений и включает коммерческую лицензию и полный доступ к технической поддержке.

После получения коммерческой лицензии вы можете сгенерировать ваши приватные учетные данные npm в [Личный кабинет клиента](https://dhtmlx.com/clients/).

После генерации вашего логина и пароля настройте npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

Затем установите Professional пакет:

~~~bash
npm install @dhx/react-gantt
~~~

Или, с Yarn:

~~~bash
yarn add @dhx/react-gantt
~~~

## Следующие шаги

После установки продолжите с:

- [](integrations/react/quick-start.md)
- [](integrations/react/overview.md)
- [](integrations/react/state/state-management-basics.md)
- [Решения](/category/framework-integrations/)