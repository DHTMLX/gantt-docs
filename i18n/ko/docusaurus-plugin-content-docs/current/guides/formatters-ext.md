---
title: "포맷터 확장"
sidebar_label: "포맷터 확장"
---

# 포맷터 확장

:::note
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

**gantt.ext.formatters** 확장은 두 가지 포맷팅 메서드를 제공합니다:

- [durationFormatter()](guides/formatters-ext.md#durationformatter)
- [linkFormatter()](guides/formatters-ext.md#linkformatter)

또한 기존 포맷터를 기반으로 한 [커스텀 포맷터](#customformatter) 를 지정할 수 있습니다.

## Duration Formatter {#durationformatter}

**gantt.ext.formatters.durationFormatter(config)** 메서드는 새로운 *DurationFormatter* 인스턴스를 반환합니다.

### **구성(Configuration)**

- <span class="submethod">**durationFormatter (config): DurationFormatter**</span> - Duration Formatter를 생성합니다
    - **_config?_** - (*object*) - 선택사항으로, 아래 속성을 포함할 수 있는 구성 객체입니다:
        - **_enter?_** - (*string*) - **parse** 메서드의 기본 형식을 지정합니다. 단위가 없는 입력 값이 들어올 때 사용됩니다. 기본값: "day".
        - **_store?_** - (*string*) - gantt에서 지속 시간 값 저장 형식을 지정합니다. 이 속성은 **parse** 메서드의 출력 값에 영향을 줍니다. 기본값: "hour".
        - **_format?_** - (*string | Array &lt;string&gt;*) - 출력 값의 형식을 지정합니다. 지원되는 값: "auto", "minute", "hour", "day", "week", "month", "year", 또는 이 값들 중 하나를 포함하는 배열. "auto" 값은 제공된 값에 따라 적절한 단위를 선택하도록 포맷터가 시도합니다(예: 더 큰 값은 days/months/years로 포맷되고, 더 작은 값은 minutes/hours로 포맷됩니다).
        - **_short?_** - (*boolean*) - 시간 단위의 짧은 레이블(약어)을 설정합니다. 기본값: *false*
        - **_minutesPerHour?_** - (*number*) - 분에서 시로, 시에서 분으로의 변환 방식을 정의합니다. 기본값: 60
        - **_hoursPerDay?_** - (*number*) - 시에서 일로, 일에서 시로의 변환 방식을 정의합니다. 기본값: 8
        - **_hoursPerWeek?_** - (*number*) - 시에서 주로의 변환 방식을 정의합니다. 기본값: 40
        - **_daysPerMonth?_** - (*number*) - 일에서 달로, 달에서 일로의 변환 방식을 정의합니다. 기본값: 30
        - **_daysPerYear?_** - (*number*) - 일에서 해로, 해에서 일로의 변환 방식을 정의합니다. 기본값: 365
        - **_labels?_** - (*object*) - 다양한 시간 단위에 대한 텍스트 레이블을 정의합니다. 이 레이블은 구문 분석된 값과 포맷된 값 모두에 사용됩니다.
            - **_minute?_** - (*object*) - 분에 대한 구성
                - **_full?_** - (*string*) - 분에 대한 전체 텍스트 레이블
                - **_plural?_** - (*string*) - 분의 복수형 레이블
                - **_short?_** - (*string*) - 분의 짧은 레이블
            - **_hour?_** - (*object*) - 시에 대한 구성
                - **_full?_** - (*string*) - 시의 전체 텍스트 레이블
                - **_plural?_** - (*string*) - 시의 복수형 레이블
                - **_short?_** - (*string*) - 시의 짧은 레이블
            - **_day?_** - (*object*) - 일에 대한 구성
                - **_full?_** - (*string*) - 일의 전체 텍스트 레이블
                - **_plural?_** - (*string*) - 일의 복수형 레이블
                - **_short?_** - (*string*) - 일의 짧은 레이블
            - **_week?_** - (*object*) - 주에 대한 구성
                - **_full?_** - (*string*) - 주의 전체 텍스트 레이블
                - **_plural?_** - (*string*) - 주의 복수형 레이블
                - **_short?_** - (*string*) - 주의 짧은 레이블
            - **_month?_** - (*object*) - 달에 대한 구성
                - **_full?_** - (*string*) - 달의 전체 텍스트 레이블
                - **_plural?_** - (*string*) - 달의 복수형 레이블
                - **_short?_** - (*string*) - 달의 짧은 레이블
            - **_year?_** - (*object*) - 해에 대한 구성
                - **_full?_** - (*string*) - 해의 전체 텍스트 레이블
                - **_plural?_** - (*string*) - 해의 복수형 레이블
                - **_short?_** - (*string*) - 해의 짧은 레이블


**예제:**

기본 설정으로 Duration Formatter 초기화:
~~~js
const formatter = gantt.ext.formatters.durationFormatter();
// 팩토리 메서드를 사용해 포맷터 객체의 인스턴스를 생성
~~~

- **_enter_**:
~~~js
formatter.parse("1"); // entered value: 1 day - if enter:"day" (default)
formatter.parse("1"); // entered value: 1 hour - if enter:"hour"
~~~

- **_store_**:

~~~js
formatter.parse("1 day"); // stored value: 8 - if store:"hour"
formatter.parse("1 day"); // stored value: 480 - store:"minute" 
~~~


- **_format_**
~~~js
gantt.ext.formatters.durationFormatter({
    format: ["hour", "minute"], /*!*/
    store:"minute"
}).format(260); // 4 hours 20 minutes

gantt.ext.formatters.durationFormatter({
    format: "hour", /*!*/
    store:"minute"    
}).format(260);// 4.33 hours
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


전체 구성의 예:
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

### **API**

생성된 *DurationFormatter* 인스턴스는 아래 메서드를 제공합니다:

- <span class="submethod">**canParse (value): boolean**</span> - 주어진 문자열을 지속 시간 값으로 파싱할 수 있으면 *true*를 반환하고, 그렇지 않으면 *false*를 반환합니다
    - **_value_** - (*string*) - 확인할 문자열


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.canParse("1 day"));
// true

console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (value): string**</span> - 주어진 지속 기간 값을 지속 시간 문자열로 변환합니다
    - **_value_** - (*number*) - 변환될 지속 시간 값

~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.format(24));
// 3 days
~~~

- <span class="submethod">**parse (value): number**</span> - 주어진 문자열을 지속 시간 값으로 파싱합니다. 파싱할 수 없으면 'null'이 반환됩니다
    - **_value_** - (*string*) - 변환될 문자열


~~~js
const formatter = gantt.ext.formatters.durationFormatter();
console.log(formatter.parse("1 day"));
// 8
~~~

작업 시간 계산에 대한 자세한 내용은 [Work Time Calculation](guides/working-time.md#taskdurationindecimalformat) 문서를 참조하십시오.

## Link Formatter {#linkformatter}

**gantt.ext.formatters.linkFormatter(config)** 메서드는 새로운 *LinkFormatter* 인스턴스를 반환합니다. 이 인스턴스는 Duration Formatter의 일부 메서드와 구성(configuration)을 재사용합니다.

### **구성(Configuration)**

- <span class="submethod">**linkFormatter (config): LinkFormatter**</span> - Link Formatter를 생성합니다
    - **_config?_** - (*object*) - 선택사항으로, 아래 속성을 포함할 수 있는 구성 객체입니다:
        - **_durationFormatter?_** - (*DurationFormatter*) - **gantt.ext.formatters.durationFormatter()** 로 생성된 *DurationFormatter*의 인스턴스입니다. 링크의 지연(lag) 및 선행(lead) 값을 구문 분석하고 형식화하는 방식에 영향을 줍니다:
        - **_labels?_** - (*object*) - 서로 다른 유형의 링크에 대한 지역화 문자열(레이블)
            - **_finish_to_start?_** - (*string*) - Finish to Start 링크의 레이블
            - **_start_to_start?_** - (*string*) - Start to Start 링크의 레이블
            - **_finish_to_finish?_** - (*string*) - Finish to Finish 링크의 레이블
            - **_start_to_finish?_** - (*string*) - Start to Finish 링크의 레이블

**예제:**

기본 설정으로 Link Formatter 초기화:

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
// 포맷터 객체의 인스턴스가 팩토리 메서드를 사용해 생성됩니다
~~~


- **_short_**:

~~~js
gantt.ext.formatters.linkFormatter()
   .format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
 
var durationFormatter = gantt.ext.formatters.durationFormatter({
    short: true
});
gantt.ext.formatters.linkFormatter({durationFormatter: durationFormatter})
    .format({id:1, type:"2", source: 1, target: 2, lag: -1});
//"1FF-1d"
~~~


- **_labels_**:
~~~js
const formatter = gantt.ext.formatters.linkFormatter({
    //default values
    durationFormatter: gantt.ext.formatters.durationFormatter(),
    labels: {
        finish_to_start: "FS",
        start_to_start: "SS",
        finish_to_finish: "FF",
        start_to_finish: "SF"
    }
});
~~~


### **API**

생성된 *LinkFormatter* 인스턴스는 아래 메서드를 제공합니다:

- <span class="submethod">**canParse (value): boolean**</span> - 주어진 문자열을 링크 객체로 파싱할 수 있으면 *true*를 반환하고, 그렇지 않으면 *false*를 반환합니다
    - **_value_** - (*string*) - 확인할 문자열

~~~js
const formatter = gantt.ext.formatters.linkFormatter();
console.log(formatter.canParse("1FS + 1 day"));
// true
 
console.log(formatter.canParse("abc"));
// false
~~~

- <span class="submethod">**format (link): string**</span> - 주어진 링크 값을 문자열로 변환합니다
    - **_value_** - (*Link*) - 변환될 링크 객체

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.format({id:1, type:"1", source: 1, target: 2, lag: 5});
//"1SS+5 days"
~~~

- <span class="submethod">**parse (value): object**</span> - 주어진 문자열을 링크 객체로 파싱합니다. 파싱할 수 없으면 'null'이 반환됩니다. 주어진 링크의 *link.target* 값은 항상 "null" 값이 될 수 있습니다.
    - **_value_** - (*string*) - 변환될 문자열

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

formatter.parse("1SS+5 days");
// {id:1, type:"1", source: 1, target: null, lag: 5}
~~~

### **Format info**

*LinkFormatter*는 두 가지 형식의 링크를 지원합니다:

 - **$(WBS)** - 축약 형식
   - **$(WBS)** - [작업 WBS 코드](api/method/getwbscode.md)

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1"));
// {id:1, type:"0", source: 2, target: 3, lag: 0}

console.log(formatter.format({id:2, type:"0", source: 1, target: 3, lag: 0}));
// 1.1
~~~

 - **$(WBS)$(TYPE)$(LAG)** - 전체 형식
   - **$(WBS)** - [작업 WBS 코드](api/method/getwbscode.md)
   - **$(TYPE)** - [링크 유형](api/config/links.md). 지원 값: 'FF', 'FS', 'SS', 'SF', 또는 *LinkFormatter*의 구성의 **labels** 로 정의된 값
   - **$(LAG)** - [링크 지연(lag)](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks). 값은 양수 또는 음수가 될 수 있습니다 - **+1 day**, **-1 day**. 지원 형식은 생성자에 전달된 **durationFormatter** 매개변수에 의해 정의됩니다.

~~~js
const formatter = gantt.ext.formatters.linkFormatter();

console.log(formatter.parse("1.1SS + 1 day"));
// {id:1, type:"1", source: 2, target: null, lag: 1}

console.log(formatter.format({id:1, type:"1", source: 2, target: 3, lag: 1}));
// 1.1SS + 1 day
~~~

종료-시작(Finish-To-Start) 링크 중 지연/선도 없이 포맷된 항목은 축약 형식을 사용하여 포맷되고, 다른 링크들은 전체 형식으로 포맷됩니다. 또한, 만약 **parse** 메서드에 작업의 WBS 코드만 제공되면, 포맷터는 Finish-to-Start 유형과 0 지연 시간을 가정합니다.

LinkFormatter 메서드에 대한 자세한 내용은 [Inline Editing in Grid](guides/inline-editing.md#linkformatter) 문서를 참조하십시오.

## Custom Formatter {#customformatter}

Gantt 기능은 기존 Gantt 포맷터를 기반으로 커스텀 포맷터를 생성할 수 있도록 합니다. 인라인 에디터에 커스텀 포맷터를 추가할 수 있습니다. 내부적으로 Gantt는 기대하는 형식으로 데이터를 저장하고, 사용자가 인라인 에디터를 열 때 사용자가 필요한 값을 표시합니다.

커스텀 포맷터는 두 개의 함수: **format()** 와 **parse()** 를 가진 객체입니다.

- **format()** 함수는 숫자(커스텀 지속 시간 포맷터) 또는 링크(커스텀 링크 포맷터) 중 하나를 필요한 값으로 변환합니다. **parse()** 함수는 포맷된 값을 숫자(커스텀 지속 시간 포맷터) 또는 링크(커스텀 링크 포맷터)로 변환합니다.

다음은 커스텀 포맷터의 예시입니다:

~~~js
const customDurationFormatter = {
    format: function (duration) {
        let formattedDuration;
        // 숫자에서 원하는 값으로 변환하는 코드
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
        // 링크 객체에서 원하는 값으로 변환하는 코드
        return formattedLink;
    },
    parse: function (formattedValue) {
        let link;
        // 원하는 값에서 `link` 객체로 변환하는 코드
        return link
    }
};
~~~

커스텀 포맷터의 값은 기존 포맷터를 사용하고 그 반환 값을 수정하는 방식으로 사용할 수 있습니다.

커스텀 포맷터는 일반 포맷터와 동일하게 인라인 에디터에 지정됩니다. 예를 들면:

~~~js
const durationEditor = { 
    type: "duration", map_to: "duration", formatter: customDurationFormatter 
};
~~~

다음은 커스텀 지속 시간 포맷터와 커스텀 링크 포맷터의 예시입니다:

관련 샘플 [Custom duration and link formatters](https://snippet.dhtmlx.com/gcvw2a6c)

## 커스텀 복수형 규칙(Plural forms) 

기본 [Duration Formatter](guides/formatters-ext.md#durationformatter)의 구성은 명사에 대한 복수형을 하나의 형태로 사용하는 것을 허용합니다. 영어의 경우 복수형은 접미사를 추가하거나 명사를 바꾸는 방식으로 형성됩니다.

다른 언어에서는 복수형에 여러 변형이 있을 수 있으며, 서로 다른 복수형 규칙이 적용될 수 있습니다. 필요에 따라 언어에 맞춘 규칙을 지정하는 커스텀 포맷터를 사용할 수 있습니다. 아래 예시는 일본어 로케일에 적합한 필요한 규칙을 적용하는 방법을 보여줍니다:

관련 샘플 [Custom duration formatter with different plural values for Japanese locale](https://snippet.dhtmlx.com/jyvsiqop)