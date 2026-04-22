---
sidebar_label: isLinkAllowed
title: isLinkAllowed 方法
description: "检查指定链接是否正确"
---

# isLinkAllowed

### Description

@short: 检查指定的链接是否正确

@signature: isLinkAllowed: (linkOrFrom: string | number | LinkForValidation, from_start?: boolean, to?: string | number | null | undefined, to_start?: boolean) =\> boolean

### Parameters

- `linkOrFrom` - (必填) *string | number | LinkForValidation* -  源任务（前驱）的 ID，或具有以下属性的链接对象：
- `from_start` -	(optional) *boolean* 	-	可选，指示链接是否从源任务（前驱）的起始位置拖动（*true*）还是从末端拖动（*false*）。当第一个参数作为对象指定时，此项完全不需要。
- `to`	 - (optional) *string | number | null | undefined* 	-	可选，目标（后继）任务的 ID。若目标任务尚未指定时，可以为 *null* 或 *undefined*。当第一个参数作为对象指定时，此项完全不需要
- `to_start` -	(optional) *boolean* 	-	可选，指示链接是否被拖动到目标（后继）任务的起始处（*true*）还是从末端拖动（*false*）。当第一个参数作为对象指定时，此项完全不需要

### Returns
- ` value` - (boolean) - <i>true</i>，如果链接正确。否则，<i>false</i>

### Example

~~~jsx
const link = {
    source:2,
    target:2,
    type:gantt.config.link.start_to_start
};
if(gantt.isLinkAllowed(link))// -> false (because source==target)
    gantt.addLink(link);
~~~

### Details

这里的链接对象与[Link](guides/link-properties.md)对象不同，仅包含3个属性:

- **source** - (*string | number*) - 源任务的 ID。
- **target** - (*string | number*) - 目标任务的 ID。
- **type** - (*string*) - 链接类型。

链接在以下情况下被视为无效:

1. 源任务ID与目标任务ID相同。
2. type 设置为除 0、1、2 或 3 以外的值。
3. 链接未通过验证。
4. 链接是从项目任务到其子任务创建的，因为项目任务的日期依赖于其子任务。

:::note

此方法会触发 [onLinkValidation](api/event/onlinkvalidation.md) 事件。如果该事件返回 `false`，链接也会被视为无效。
 
:::


此外，此方法也可以这样调用:

~~~js
gantt.isLinkAllowed(from, from_start, to, to_start )
~~~

参数说明:

- **from** - (*string | number | object*) - 源任务（前置任务）的ID，或包含以下属性的链接对象:
- **from_start?** - (*boolean*) - 可选，指定链接是否从源任务开始处拖动（*true*）或结束处（*false*）。如果第一个参数是对象，则不需要此参数
- **to?** - (*string | number | null | undefined*) - 可选，目标任务（后续任务）的ID。如果尚未指定，可以是 *null* 或 *undefined*。如果第一个参数是对象，则不需要此参数
- **to_start?** - (*boolean*) - 可选，指定链接是否拖动到目标任务开始处（*true*）或结束处（*false*）。如果第一个参数是对象，则不需要此参数

例如，上述示例可以重写为:

~~~js
//var link = {
//    source:2,
//    target:2,
//    type:gantt.config.link.start_to_start
//};

if(gantt.isLinkAllowed(2, true, 2, true))// -> false（因为 source==target）
    //执行某些操作
    
~~~