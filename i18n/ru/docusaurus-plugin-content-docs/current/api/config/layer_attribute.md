---
sidebar_label: layer_attribute
title: layer_attribute конфигурация
description: "устанавливает имя атрибута элемента DOM слоя задач"
---

# layer_attribute

:::info
Эта функциональность доступна только в версии PRO.
:::

### Description

@short: Устанавливает имя атрибута элемента DOM слоя задач

@signature: layer_attribute: string

### Example

~~~jsx
gantt.config.layer_attribute = "tasklayer";
~~~

**Значение по умолчанию:** "data-layer"

### Related samples
- [Отображение дедлайнов](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Отображение базовых линий](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


### Related API
- [addTaskLayer](api/method/addtasklayer.md)