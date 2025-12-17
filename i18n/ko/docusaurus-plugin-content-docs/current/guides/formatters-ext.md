---
title: "Formatters Extension"
sidebar_label: "Formatters Extension"
---

Formatters Extension
========================

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

**gantt.ext.formatters** 확장 기능은 값을 포맷팅하는 두 가지 방법을 제공합니다:

- [durationFormatter()](guides/formatters-ext.md#durationformatter)
- [linkFormatter()](guides/formatters-ext.md#linkformatter)

또한 기존 포매터를 기반으로 [사용자 지정 포매터](#customformatter)를 생성할 수도 있습니다.

## Duration Formatter {#durationformatter}
----------------------

**gantt.ext.formatters.durationFormatter(config)** 메서드는 새로운 *DurationFormatter* 인스턴스를 생성합니다.

###**설정**

- <span class="submethod">**durationFormatter (config): DurationFormatter**</span> - Duration Formatter를 생성합니다.
    - **_config?_** - (*object*) - 선택적 설정 객체로, 다음과 같은 옵션을 가질 수 있습니다:
        - **_enter?_** - (*string*) - 입력값에 단위가 없을 때 **parse** 메서드에서 사용할 기본 포맷을 지정합니다. 기본값은 "day"입니다.
        - **_store?_** - (*string*) - gantt에 duration 값을 저장할 때 사용할 포맷을 정의합니다. 이는 **parse** 메서드의 출력에 영향을 줍니다. 기본값은 "hour"입니다.
        - **_format?_** - (*string | Array &lt;string&gt;*) - 출력 포맷을 지정합니다. 지원되는 값은 "auto", "minute", "hour", "day", "week", "month", "year" 또는 이들의 배열입니다. "auto"는 값의 크기에 따라 가장 적합한 단위를 자동으로 선택합니다(큰 값은 day/month/year, 작은 값은 minute/hour).
        - **_short?_** - (*boolean*) - 시간 단위에 대한 축약 라벨(약어)을 사용할지 여부를 설정합니다. 기본값은 *false*입니다.
        - **_minutesPerHour?_** - (*number*) - 분과 시간 간의 변환 기준을 지정합니다. 기본값은 60입니다.
        - **_hoursPerDay?_** - (*number*) - 시간과 일 간의 변환 기준을 지정합니다. 기본값은 8입니다.
        - **_hoursPerWeek?_** - (*number*) - 시간과 주 간의 변환 기준을 지정합니다. 기본값은 40입니다.
        - **_daysPerMonth?_** - (*number*) - 일과 월 간의 변환 기준을 지정합니다. 기본값은 30입니다.
        - **_daysPerYear?_** - (*number*) - 일과 연 간의 변환 기준을 지정합니다. 기본값은 365입니다.
        - **_labels?_** - (*object*) - 파싱 및 포맷팅에 사용될 다양한 시간 단위의 텍스트 라벨을 지정합니다:
            - **_minute?_** - (*object*) - 분에 대한 라벨
                - **_full?_** - (*string*) - 분의 전체 라벨
                - **_plural?_** - (*string*) - 분의 복수형 라벨
                - **_short?_** - (*string*) - 분의 축약 라벨
            - **_hour?_** - (*object*) - 시간에 대한 라벨
                - **_full?_** - (*string*) - 시간의 전체 라벨
                - **_plural?_** - (*string*) - 시간의 복수형 라벨
                - **_short?_** - (*string*) - 시간의 축약 라벨
            - **_day?_** - (*object*) - 일에 대한 라벨
                - **_full?_** - (*string*) - 일의 전체 라벨
                - **_plural?_** - (*string*) - 일의 복수형 라벨
                - **_short?_** - (*string*) - 일의 축약 라벨
            - **_week?_** - (*object*) - 주에 대한 라벨
                - **_full?_** - (*string*) - 주의 전체 라벨
                - **_plural?_** - (*string*) - 주의 복수형 라벨
                - **_short?_** - (*string*) - 주의 축약 라벨
            - **_month?_** - (*object*) - 월에 대한 라벨
                - **_full?_** - (*string*) - 월의 전체 라벨
                - **_plural?_** - (*string*) - 월의 복수형 라벨
                - **_short?_** - (*string*) - 월의 축약 라벨
            - **_year?_** - (*object*) - 년에 대한 라벨
                - **_full?_** - (*string*) - 년의 전체 라벨
                - **_plural?_** - (*string*) - 년의 복수형 라벨
                - **_short?_** - (*string*) - 년의 축약 라벨

**예시:**

기본 설정으로 Duration Formatter 생성:
~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// 팩토리 메서드를 통해 포매터 인스턴스가 생성됩니다.
~~~

- **_enter_**:
~~~js
formatter.parse("1"); // enter:"day"(기본값)이면 1일로 해석
formatter.parse("1"); // enter:"hour"이면 1시간으로 해석
~~~

- **_store_**:

~~~js
formatter.parse("1 day"); // store:"hour"이면 8로 저장
formatter.parse("1 day"); // store:"minute"이면 480으로 저장 
~~~

- **_format_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["hour", "minute"], /*!*/
    store:"minute"
}).format(260); // "4 hours 20 minutes" 출력

gantt.ext.formatters.durationFormatter({
    format: "hour", /*!*/
    store:"minute"    
}).format(260);// "4.33 hours" 출력
~~~

- **_short_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: false /*!*/    
}).format(10021); //"4 weeks 7 hours 1 minute"
 
gantt.ext.formatters.durationFormatter({
    format: ["week", "hour", "minute"],
    store:"minute",
    short: true     /*!*/
}).format(10021); //"4wk 7h 1min"
~~~

전체 설정 예시:
~~~js
const formatter = gantt.ext.formatters.durationFormatter({
    // 기본값
    enter: "day",
    store: "hour",
    format: "auto",
    short: false,
    minutesPerHour: 60,
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30,
    daysPerYear: 365,
    labels: {
        minute: {
            full: "minute",
            plural: "minutes",
            short: "min"
        },
        hour: {
            full: "hour",
            plural: "hours",
            short: "h"
        },
        day: {
            full: "day",
            plural: "days",
            short: "d"
        },
        week: {
            full: "week",
            plural: "weeks",
            short: "wk"
        },
        month: {
            full: "month",
            plural: "months",
            short: "mon"
        },
        year: {
            full: "year",
            plural: "years",
            short: "y"
        }
    }
});
~~~

###**API**

*DurationFormatter* 인스턴스는 다음과 같은 메서드를 제공합니다:

- <span class="submethod">**canParse (value): boolean**</span> - 문자열이 duration 값으로 파싱 가능한지 확인합니다. 가능하면 *true*, 아니면 *false*를 반환합니다.
    - **_value_** - (*string*) - 확인할 문자열

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (value): string**</span> - duration 값을 포맷된 문자열로 변환합니다.
    - **_value_** - (*number*) - 변환할 duration 값

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// 출력: 3 days
~~~

- <span class="submethod">**parse (value): number**</span> - 문자열을 duration 값으로 파싱하거나, 파싱할 수 없으면 ‘null’을 반환합니다.
    - **_value_** - (*string*) - 파싱할 문자열

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// 출력: 8
~~~

**durationFormatter**에 대한 자세한 내용은 [작업 시간 계산](guides/working-time.md#taskdurationindecimalformat) 문서에서 확인할 수 있습니다.

## Link Formatter {#linkformatter}
----------------------

**gantt.ext.formatters.linkFormatter(config)** 메서드는 새로운 *LinkFormatter* 인스턴스를 생성합니다. 일부 메서드 및 설정은 Duration Formatter와 공유합니다.

###**설정**

- <span class="submethod">**linkFormatter (config): LinkFormatter**</span> - Link Formatter를 생성합니다.
    - **_config?_** - (*object*) - 선택적 설정 객체로, 다음과 같은 옵션을 가질 수 있습니다:
        - **_durationFormatter?_** - (*DurationFormatter*) - *gantt.ext.formatters.durationFormatter()*로 생성된 인스턴스이며, lag/lead 값의 파싱 및 포맷팅 방식에 영향을 줍니다.
        - **_labels?_** - (*object*) - 다양한 링크 유형에 대한 라벨:
            - **_finish_to_start?_** - (*string*) - Finish to Start 링크에 대한 라벨
            - **_start_to_start?_** - (*string*) - Start to Start 링크에 대한 라벨
            - **_finish_to_finish?_** - (*string*) - Finish to Finish 링크에 대한 라벨
            - **_start_to_finish?_** - (*string*) - Start to Finish 링크에 대한 라벨

**예시:**

기본 설정으로 Link Formatter 생성:

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// 팩토리 메서드를 통해 포매터 인스턴스가 생성됩니다.
~~~

- **_short_**:

~~~js
gantt.ext.formatters.linkFormatter()
   .format({id:1, type:"1", source: 1, target: 2, lag: 5});
// 출력: "1SS+5 days"
 
var durationFormatter = gantt.ext.formatters.durationFormatter({
    short: true
});
gantt.ext.formatters.linkFormatter({durationFormatter: durationFormatter})
    .format({id:1, type:"2", source: 1, target: 2, lag: -1});
// 출력: "1FF-1d"
~~~

- **_labels_**:
~~~js
const formatter = gantt.ext.formatters.linkFormatter({
    //기본값
    durationFormatter: gantt.ext.formatters.durationFormatter(),
    labels: {
        finish_to_start: "FS",
        start_to_start: "SS",
        finish_to_finish: "FF",
        start_to_finish: "SF"
    }
});
~~~

###**API**

*LinkFormatter* 인스턴스는 다음과 같은 메서드를 제공합니다:

- <span class="submethod">**canParse (value): boolean**</span> - 문자열이 링크 객체로 파싱 가능한지 확인합니다. 가능하면 *true*, 아니면 *false*를 반환합니다.
    - **_value_** - (*string*) - 확인할 문자열

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (link): string**</span> - 링크 객체를 문자열로 변환합니다.
    - **_link_** - (*Link*) - 변환할 링크 객체

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
// 출력: "1SS+5 days"
~~~

- <span class="submethod">**parse (value): object**</span> - 문자열을 링크 객체로 파싱하거나, 파싱에 실패하면 ‘null’을 반환합니다. 파싱된 객체에서 *link.target*은 "null"로 설정됩니다.
    - **_value_** - (*string*) - 파싱할 문자열

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.parse("1SS+5 days");
// 출력: {id:1, type:"1", source: 1, target: null, lag: 5}
~~~


###**포맷 정보**

*LinkFormatter*는 두 가지 링크 포맷을 지원합니다:

 - **$(WBS)** - 단축 포맷
   - **$(WBS)** - [작업 WBS 코드](api/method/getwbscode.md)

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1"));
// {id:1, type:"0", source: 2, target: 3, lag: 0}

console.log(formatter.format({id:2, type:"0", source: 1, target: 3, lag: 0}));
// 1.1
~~~

 - **$(WBS)$(TYPE)$(LAG)** - 전체 포맷
   - **$(WBS)** - [작업 WBS 코드](api/method/getwbscode.md)
   - **$(TYPE)** - [링크 타입](api/config/links.md). **지원 값:** 'FF', 'FS', 'SS', 'SF', 또는 *LinkFormatter*의 **labels** 설정에 정의된 값.
   - **$(LAG)** - [링크 래그](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks). 이 값은 **+1 day** 또는 **-1 day**와 같이 양수 또는 음수일 수 있습니다. 지원되는 형식은 *LinkFormatter* 생성자에 전달된 **durationFormatter** 파라미터에 따라 달라집니다.

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

래그 또는 리드가 없는 Finish-To-Start 링크는 단축 포맷으로 표시되고, 그 외의 링크는 전체 포맷을 사용합니다. 마찬가지로 **parse** 메서드에 작업의 WBS 코드만 제공하면, 포매터는 래그가 0인 Finish-to-Start 타입으로 간주합니다.

linkFormatter 메서드에 대한 자세한 내용은 [그리드에서 인라인 편집](guides/inline-editing.md#linkformatter) 문서를 참고하세요.


## 커스텀 포매터 {#customformatter}
-------------------

Gantt 도구는 내장 포매터를 기반으로 커스텀 포매터를 만들 수 있습니다. 이러한 커스텀 포매터는 인라인 에디터에 추가할 수 있습니다. 내부적으로 Gantt는 데이터를 기대하는 형식으로 유지하지만, 사용자가 인라인 에디터를 열면 원하는 포맷으로 값을 보여줍니다.

커스텀 포매터는 **format()** 함수와 **parse()** 함수 두 가지로 구성된 객체입니다.

**format()** 함수는 (커스텀 duration 포매터의 경우) 숫자나 (커스텀 링크 포매터의 경우) 링크를 원하는 표시값으로 변환합니다. **parse()** 함수는 그 포맷된 값을 다시 숫자나 링크 객체로 변환합니다.

일반적인 커스텀 포매터 예시는 다음과 같습니다:

~~~js
const customDurationFormatter = {
    format: function (duration) {
        let formattedDuration;
        // 숫자를 원하는 값으로 변환하는 코드
        return formattedDuration;
    },
    parse: function (formattedValue) {
        let duration;
        // 원하는 값에서 숫자로 변환하는 코드
        return duration;
    }
};

const customLinkFormatter = {
    format: function (link) {
        let formattedLink;
        // 링크 객체를 원하는 값으로 변환하는 코드
        return formattedLink;
    },
    parse: function (formattedValue) {
        let link;
        // 원하는 값에서 `link` 객체로 변환하는 코드
        return link
    }
};
~~~

기존 포매터를 커스텀 포매터 안에서 사용하고, 결과를 필요에 맞게 조정할 수도 있습니다.

커스텀 포매터를 인라인 에디터에 기본 포매터와 동일하게 할당할 수 있습니다. 예를 들면:

~~~js
const durationEditor = { 
    type: "duration", map_to: "duration", formatter: customDurationFormatter 
};
~~~

아래는 커스텀 duration 및 링크 포매터를 구현하는 예시입니다:


**Related example:** [Custom duration and link formatters](https://snippet.dhtmlx.com/gcvw2a6c)


## 복수형 규칙 커스터마이징 {#customrulesforpluralforms}

기본 [Duration Formatter](guides/formatters-ext.md#durationformatter)는 영어 복수형 규칙(주로 접미사 추가 또는 명사 일부 변경)을 처리하도록 설계되어 있습니다.

다른 언어는 여러 복수형이 존재하거나 적용 규칙이 다를 수 있습니다. 이런 경우, 해당 언어에 맞는 규칙을 적용하는 커스텀 포매터를 만들 수 있습니다. 아래 예시는 일본어에 맞는 복수형 규칙을 구현하는 방법을 보여줍니다:


**Related example:** [Custom duration formatter with different plural values for Japanese locale](https://snippet.dhtmlx.com/jyvsiqop)


