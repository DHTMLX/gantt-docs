---
sidebar_label: isLinkAllowed
title: isLinkAllowed method
description: "Prüft, ob der angegebene Link korrekt ist"
---

# isLinkAllowed

### Description

@short: Prüft, ob der angegebene Link korrekt ist

@signature: isLinkAllowed: (linkOrFrom: string | number | LinkForValidation, from_start?: boolean, to?: string | number | null | undefined, to_start?: boolean) =\> boolean

### Parameters

- `linkOrFrom` - (erforderlich) *string | number | LinkForValidation* - entweder die ID der Quell- (Vorgänger-)Aufgabe oder ein Link-Objekt mit den folgenden Eigenschaften:
- `from_start` - (optional) *boolean* - optional, gibt an, ob der Link vom Anfang der Quell- (Vorgänger-)Aufgabe gezogen wird (*true*) oder von deren Ende (*false*). Nicht erforderlich, wenn der erste Parameter als Objekt angegeben wird
- `to` - (optional) *string | number | null | undefined* - optional, die ID der Ziel- (Nachfolger-)Aufgabe. Kann den Wert *null* oder *undefined* haben, wenn die Ziel-Aufgabe noch nicht festgelegt ist. Nicht erforderlich, wenn der erste Parameter als Objekt angegeben wird
- `to_start` - (optional) *boolean* - optional, gibt an, ob der Link vom Anfang der Ziel- (Nachfolger-)Aufgabe gezogen wird (*true*) oder von deren Ende (*false*). Nicht erforderlich, wenn der erste Parameter als Objekt angegeben wird

### Returns
- ` value` - (boolean) - <i>true</i>, wenn der Link korrekt ist. Andernfalls <i>false</i>

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

Das Link-Objekt unterscheidet sich vom [Link](guides/link-properties.md) Objekt und besitzt nur 3 Eigenschaften:

- **source** - (*string | number*) - die ID der Quell- (Vorgänger-)Aufgabe.
- **target** - (*string | number*) - die ID der Ziel- (Nachfolger-)Aufgabe.
- **type** - (*string*) - der Link-Typ.


Die Fälle, in denen ein Link als inkorrekt angesehen wird:

1. Die ID der Quellaufgabe ist gleich der ID der Zielaufgabe.
2. Wenn der Typ auf einen Wert gesetzt ist, der nicht 0, 1, 2 oder 3 ist.
3. Wenn der Link die Validierung nicht besteht.
4. Wenn der Link von der Projekt-Aufgabe zu ihrer Unteraufgabe erstellt wird. Die Termine der Projektaufgabe hängen von den Terminen der untergeordneten Aufgaben ab.

:::note
Die Methode löst das Event [onLinkValidation](api/event/onlinkvalidation.md) aus. Daher wird ein Link auch dann als inkorrekt betrachtet, wenn das Event [onLinkValidation](api/event/onlinkvalidation.md) `false` zurückgibt.
 
:::

Hinweis, es gibt eine zweite Möglichkeit, die Methode aufzurufen:

~~~js
gantt.isLinkAllowed(from, from_start, to, to_start )
~~~

Hier ist die Typbeschreibung der Argumente:

- **from** - (*string | number | object*) - entweder die ID der Quell- (Vorgänger-)Aufgabe oder ein Link-Objekt mit den folgenden Eigenschaften:
- **from_start?** - (*boolean*) - optional, gibt an, ob der Link vom Anfang der Quell- (Vorgänger-)Aufgabe gezogen wird (*true*) oder von deren Ende (*false*). Nicht erforderlich, wenn der erste Parameter als Objekt angegeben wird
- **to?** - (*string | number | null | undefined*) - optional, die ID der Ziel- (Nachfolger-)Aufgabe. Kann den Wert *null* oder *undefined* haben, wenn die Zielaufgabe noch nicht festgelegt ist. Nicht erforderlich, wenn der erste Parameter als Objekt angegeben wird
- **to_start?** - (*boolean*) - optional, gibt an, ob der Link zum Anfang der Ziel- (Nachfolger-)Aufgabe gezogen wird (*true*) oder vom Ende (*false*). Nicht erforderlich, wenn der erste Parameter als Objekt angegeben wird


Beispiel, der obige Code kann wie folgt angepasst werden:

~~~js
//var link = {
//    source:2,
//    target:2,
//    type:gantt.config.link.start_to_start
//};

if(gantt.isLinkAllowed(2, true, 2, true))// -> false (weil source==target)
    //etwas tun
    
~~~