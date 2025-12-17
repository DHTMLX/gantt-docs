---
sidebar_label: isLinkAllowed
title: isLinkAllowed method
description: "检查指定的链接是否有效"
---

# isLinkAllowed

### Description

@short: 检查指定的链接是否有效

@signature: isLinkAllowed: (linkOrFrom: string | number | LinkForValidation, from_start?: boolean, to?: string | number | null | undefined, to_start?: boolean) =\> boolean

### Parameters

- `linkOrFrom` - (required) *string | number | LinkForValidation* -         可以是源任务（前置任务）的ID，或者包含以下属性的链接对象:
- `from_start` - (optional) *boolean* - 可选，指示链接是否从源任务（前置任务）的开始处拖动（*true*）或其结束处（*false*）。如果第一个参数是对象，则不需要此参数
- `to` - (optional) *string | number | null | undefined* -         可选，目标任务（后续任务）的ID。如果目标任务尚未指定，可以是 *null* 或 *undefined*。如果第一个参数是对象，则不需要此参数
- `to_start` - (optional) *boolean* - 可选，指示链接是否拖动到目标任务（后续任务）的开始处（*true*）或其结束处（*false*）。如果第一个参数是对象，则不需要此参数

### Returns
- ` value` - (boolean) - <i>true</i>，如果链接有效。否则，<i>false</i>

### Example

~~~jsx
const link = {
    source:2,
    target:2,
    type:gantt.config.link.start_to_start
};
if(gantt.isLinkAllowed(link))// -> false（因为 source==target）
    gantt.addLink(link);
~~~

### Details

这里的链接对象与[Link](guides/link-properties.md)对象不同，仅包含3个属性:

- **source** - (*string | number*) - 源任务（前置任务）的ID。
- **target** - (*string | number*) - 目标任务（后续任务）的ID。
- **type** - (*string*) - 链接类型。

链接在以下情况下被视为无效:

1. 源任务ID与目标任务ID相同。
2. type 设置为除 0、1、2 或 3 以外的值。
3. 链接未通过验证。
4. 链接是从项目任务到其子任务创建的，因为项目任务的日期依赖于其子任务。

:::note

此方法会触发 [onLinkValidation](api/event/onlinkvalidation.md) 事件。如果该事件返回 `false`，链接也会被视为无效。
 
:::

<br>

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

