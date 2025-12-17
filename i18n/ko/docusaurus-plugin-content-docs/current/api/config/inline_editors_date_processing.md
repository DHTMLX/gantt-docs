---
sidebar_label: inline_editors_date_processing
title: inline_editors_date_processing config
description: "작업의 시작일 또는 종료일을 편집할 때 작업 기간을 유지합니다."
---

# inline_editors_date_processing

### Description

@short: 작업의 시작일 또는 종료일을 편집할 때 작업 기간을 유지합니다.

@signature: inline_editors_date_processing: string | undefined

### Example

~~~jsx
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

**Default value:** undefined

### Details

inline editors가 작업의 시작일과 종료일 변경을 처리하는 방식을 제어합니다.
설정이 undefined(기본값)일 때:

- 작업의 시작일을 조정하면 작업 기간은 동일하게 유지되며, 작업 전체가 새로운 시작 시간으로 이동합니다.
- 종료일을 변경하면 시작일은 고정되고, 종료일에 맞춰 기간이 업데이트됩니다.

이 동작은 6.2 이전 버전과 다릅니다.

버전 6.1의 동작을 복원하려면 옵션을 **"keepDuration"** 으로 설정하세요:

~~~js
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

이 설정은 다음과 같습니다:

- 시작일 변경 시 기간은 변하지 않고 작업이 적절히 이동합니다.
- 종료일 변경 시 기간은 변하지 않고 작업이 새로운 종료일에 맞게 이동합니다.

또 다른 옵션은 **"keepDates"** 입니다:

~~~js
gantt.config.inline_editors_date_processing = "keepDates";
~~~

이 설정은 다음을 의미합니다:

- 시작일 변경 시 종료일은 고정되고, 기간이 조정됩니다.
- 종료일 변경 시 시작일은 고정되고, 기간이 조정됩니다.

### Change log
- v6.2에 이전 버전과의 호환성을 위해 추가됨
