---
sidebar_label: links
title: links config
description: "링크 의존성 유형을 저장합니다"
---

# links

### Description

@short: 링크 의존성 유형을 저장합니다

@signature: links: \{ finish_to_start?: string | number; start_to_start?: string | number; finish_to_finish?: string | number; start_to_finish?: string | number; \}

### Example

~~~jsx
var type1 = gantt.config.links.finish_to_start;
~~~

**Default value:**\{ "finish_to_start":"0", "start_to_start":"1", "finish_to_finish":"2", "start_to_finish":"3" \}

### Details

- **finish_to_start** - (*string | number*) - 대상 작업은 소스 작업이 끝나기 전에 시작할 수 없지만 더 늦게 시작할 수 있습니다.
- **start_to_start** - (*string | number*) - 대상 작업은 소스 작업이 시작될 때까지 시작할 수 없지만 더 늦게 시작할 수 있습니다.
- **finish_to_finish** - (*string | number*) - 대상 작업은 소스 작업이 끝나기 전에 끝낼 수 없지만 더 늦게 끝낼 수 있습니다.
- **start_to_finish** - (*string | number*) - 대상 작업은 소스 작업이 시작되기 전에 끝낼 수 없지만 더 늦게 끝낼 수 있습니다.

### Related Guides
- [Data Loading](guides/loading.md#dataproperties)