---
sidebar_label: getScrollState
title: getScrollState method
description: "получает текущую позицию скролла"
---

# getScrollState

### Description

@short: Получает текущую позицию скролла

@signature: getScrollState: () =\> \{ x: number, y: number \}

### Returns
- `ScrollState` - (ScrollState) - объект, представляющий позицию скролла

### Example

~~~jsx
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;
~~~

### Details

Этот метод возвращает объект, содержащий следующие данные:

- **y** - вертикальный сдвиг скролла в пикселях
- **x** - горизонтальный сдвиг скролла в пикселях
- **inner_width** - ширина видимой части timeline
- **inner_height** - высота видимой части timeline
- **width** - общая прокручиваемая ширина timeline
- **height** - общая прокручиваемая высота timeline

### Related API
- [scrollTo](api/method/scrollto.md)
- [onGanttScroll](api/event/onganttscroll.md)
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)

