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

**Default value:** \{
  "finish_to_start":"0",
  "start_to_start":"1",
  "finish_to_finish":"2",
  "start_to_finish":"3"
\}

### Details

- **finish_to_start** - (*string | number*) - 대상 작업은 소스 작업이 완료되기 전에는 시작할 수 없지만, 완료 후 언제든지 시작할 수 있습니다.
- **start_to_start** - (*string | number*) - 대상 작업은 소스 작업이 시작되기 전에는 시작할 수 없지만, 이후에 시작할 수 있습니다.
- **finish_to_finish** - (*string | number*) - 대상 작업은 소스 작업이 완료되기 전에는 완료할 수 없지만, 이후에 완료할 수 있습니다.
- **start_to_finish** - (*string | number*) - 대상 작업은 소스 작업이 시작되기 전에는 완료할 수 없지만, 이후에 완료할 수 있습니다.

### Related Guides
- [데이터 로딩](guides/loading.md#dataproperties)
