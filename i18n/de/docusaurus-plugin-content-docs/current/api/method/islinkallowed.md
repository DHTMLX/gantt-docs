---
sidebar_label: isLinkAllowed
title: isLinkAllowed method
description: "prüft, ob der angegebene Link gültig ist"
---

# isLinkAllowed

### Description

@short: Prüft, ob der angegebene Link gültig ist

@signature: isLinkAllowed: (linkOrFrom: string | number | LinkForValidation, from_start?: boolean, to?: string | number | null | undefined, to_start?: boolean) =\> boolean

### Parameters

- `linkOrFrom` - (required) *string | number | LinkForValidation* - kann entweder die ID der Quell-(Vorgänger-)Aufgabe oder ein Link-Objekt mit folgenden Eigenschaften sein:
- `from_start` - (optional) *boolean* - gibt an, ob der Link vom Anfang der Quell-(Vorgänger-)Aufgabe (*true*) oder ihrem Ende (*false*) gezogen wird. Nicht erforderlich, wenn der erste Parameter ein Objekt ist
- `to` - (optional) *string | number | null | undefined* - die ID der Ziel-(Nachfolger-)Aufgabe. Kann *null* oder *undefined* sein, falls die Zielaufgabe noch nicht angegeben wurde. Nicht erforderlich, wenn der erste Parameter ein Objekt ist
- `to_start` - (optional) *boolean* - gibt an, ob der Link zum Anfang der Ziel-(Nachfolger-)Aufgabe (*true*) oder zu ihrem Ende (*false*) gezogen wird. Nicht erforderlich, wenn der erste Parameter ein Objekt ist

### Returns
- ` value` - (boolean) - <i>true</i>, wenn der Link gültig ist. Andernfalls <i>false</i>

### Example

~~~jsx
const link = {
    source:2,
    target:2,
    type:gantt.config.link.start_to_start
};
if(gantt.isLinkAllowed(link))// -> false (weil source==target)
    gantt.addLink(link);
~~~

### Details

Das Link-Objekt hier unterscheidet sich vom [Link](guides/link-properties.md) Objekt und enthält nur 3 Eigenschaften:

- **source** - (*string | number*) - die ID der Quell-(Vorgänger-)Aufgabe.
- **target** - (*string | number*) - die ID der Ziel-(Nachfolger-)Aufgabe.
- **type** - (*string*) - der Link-Typ.

Ein Link gilt in folgenden Fällen als ungültig:

1. Die ID der Quellaufgabe ist dieselbe wie die der Zielaufgabe.
2. Der Typ ist auf einen Wert gesetzt, der nicht 0, 1, 2 oder 3 ist.
3. Der Link besteht die Validierung nicht.
4. Der Link wird von einer Projektaufgabe zu ihrer Unteraufgabe erstellt, da die Datumsangaben der Projektaufgabe von ihren Kindern abhängen.

:::note

Diese Methode löst das Event [onLinkValidation](api/event/onlinkvalidation.md) aus. Wenn dieses Event `false` zurückgibt, wird der Link ebenfalls als ungültig betrachtet.
 
:::

<br/>

Alternativ kann die Methode auch so aufgerufen werden:

~~~js
gantt.isLinkAllowed(from, from_start, to, to_start )
~~~

Die Argumente bedeuten:

- **from** - (*string | number | object*) - entweder die ID der Quell-(Vorgänger-)Aufgabe oder ein Link-Objekt mit diesen Eigenschaften:
- **from_start?** - (*boolean*) - optional, gibt an, ob der Link vom Anfang der Quellaufgabe (*true*) oder deren Ende (*false*) gezogen wird. Nicht erforderlich, wenn der erste Parameter ein Objekt ist
- **to?** - (*string | number | null | undefined*) - optional, die ID der Ziel-(Nachfolger-)Aufgabe. Kann *null* oder *undefined* sein, wenn noch nicht angegeben. Nicht erforderlich, wenn der erste Parameter ein Objekt ist
- **to_start?** - (*boolean*) - optional, gibt an, ob der Link zum Anfang der Zielaufgabe (*true*) oder zu deren Ende (*false*) gezogen wird. Nicht erforderlich, wenn der erste Parameter ein Objekt ist

Zum Beispiel kann das obige Beispiel so umgeschrieben werden:

~~~js
//var link = {
//    source:2,
//    target:2,
//    type:gantt.config.link.start_to_start
//};

if(gantt.isLinkAllowed(2, true, 2, true))// -> false (weil source==target)
    //etwas tun
    
~~~

