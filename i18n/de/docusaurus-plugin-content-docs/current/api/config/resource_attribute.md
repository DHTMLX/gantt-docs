---
sidebar_label: resource_attribute
title: resource_attribute Konfiguration
description: "Ändert den Namen des Attributs, das Gantt verwendet, um herauszufinden, auf welche Ressource sich die Aufgabenzeile in der Ressourcen-Gitter-/Timeline bezieht"
---

# resource_attribute
:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::
### Description

@short: Ändert den Namen des Attributs, das Gantt verwendet, um herauszufinden, auf welche Ressource sich die Aufgabenzeile in der Ressourcen-Gitter-/Timeline bezieht

@signature: resource_attribute: string

### Example

~~~jsx
gantt.config.resource_attribute = "data-resource-id";
~~~

**Standardwert:** data-resource-id

### Details

![resource_attribute](/img/resource_attribute.png)

:::note
Jedes Ressourcen-Element besitzt das Attribut *data-resource-id*, das verwendet wird, um herauszufinden, zu welcher Ressource das DOM-Element gehört.
:::


![resource_attribute](/img/resource_attribute.png)

:::note
Sample: [Resourse_attribute](https://snippet.dhtmlx.com/5/66401acf0) 
:::