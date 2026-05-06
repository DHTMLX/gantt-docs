---
title: "PDF 및 PNG로 내보내기"
sidebar_label: "PDF 및 PNG로 내보내기"
---

# PDF 및 PNG로 내보내기

dhtmlxGantt는 Gantt 차트를 [PDF](guides/export.md#export-to-pdf) 또는 [PNG](guides/export.md#export-to-png) 형식으로 내보낼 수 있는 온라인 내보내기 서비스를 제공합니다.

:::note
서비스는 무료이지만 출력되는 PDF/PNG 파일에는 GPL 라이선스 하의 라이브러리 워터마크가 포함됩니다. 라이선스를 구입하는 경우에는 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 워터마크 없이 내보내기 결과를 사용할 수 있습니다.
:::

Gantt 차트를 PDF 또는 PNG로 로컬에서 내보내기 위해 직접 설정할 수 있는 다양한 내보내기 서비스가 있습니다. 내보내기 서비스는 Gantt 패키지에 포함되어 있지 않으므로 각 서비스의 사용 조건에 대해서는 [관련 문서](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 참고하세요.

## 온라인 내보내기 서비스 제한

:::note
내보내기 서비스에는 시간 제한과 요청 크기 제한이 있습니다.
:::

### 시간 제한

과정이 20초를 넘길 경우 내보내기가 취소되고 다음 오류가 발생합니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

동시에 여러 사용자가 Gantt를 내보낼 경우 프로세스가 일반적으로 더 오래 걸릴 수 있습니다. 다만 특정 사용자의 내보내기 요청에 소요된 시간은 개별적으로 계산되므로 문제되지 않습니다.

### 요청 크기 제한

모든 내보내기 방법(exportToPDF, exportToPNG, exportToMSProject 등)에 사용되는 공통 API 엔드포인트 `https://export.dhtmlx.com/gantt`가 있습니다. **최대 요청 크기는 10 MB**입니다.

또한 MSProject 및 Primavera P6용 내보내기/가져오기 서비스에 특화된 별도의 API 엔드포인트 `https://export.dhtmlx.com/gantt/project`도 있습니다(exportToMSProject / importFromMSProject / exportToPrimaveraP6 / importFromPrimaveraP6에 한정). **최대 요청 크기: 40 MB**.

## export 모듈 사용하기

:::note
큰 차트를 내보내야 하는 경우, [독립 실행형 export 모듈](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)을 사용할 수 있습니다. 
export 모듈은 Gantt를 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 또는 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스로 얻은 경우 무료로 제공되며, 또는 모듈을 별도로 구입할 수 있습니다(https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[PDF용 export 모듈 사용법 자세히 보기](guides/pdf-export-module.md).

## PDF로 내보내기

Gantt 차트를 PDF 문서로 내보내려면 아래의 단계를 수행합니다:

- 내보내기/가져오기 기능을 사용하려면 [plugins](api/method/plugins.md) 메서드를 통해 <b>export_api</b> 플러그인을 활성화합니다:

~~~js
gantt.plugins({
    export_api: true
});
~~~

온라인 내보내기 서비스나 로컬 내보내기 모듈 중 하나를 사용할 수 있게 해 줍니다.

:::note
Gantt 버전이 8.0 미만인 경우, 페이지에 내보내기 기능을 활성화하려면 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다. 예를 들면:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Gantt 차트를 내보내려면 [exportToPDF](api/method/exporttopdf.md) 메서드를 호출합니다:

~~~html
<input value="Export to PDF" type="button" onclick='gantt.exportToPDF()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


관련 예제: [Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## PNG로 내보내기

Gantt 차트를 PNG 이미지로 내보내려면 아래의 단계를 수행합니다:

- 온라인 내보내기 서비스를 사용하려면 [plugins](api/method/plugins.md) 메서드를 통해 <b>export_api</b> 플러그인을 활성화합니다:

~~~js
gantt.plugins({
    export_api: true
});
~~~

:::note
Gantt 버전이 8.0 미만인 경우, 온라인 내보내기 서비스를 활성화하려면 페이지에 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다. 예를 들면:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Gantt 차트를 내보내려면 [exportToPNG](api/method/exporttopng.md) 메서드를 호출합니다:

~~~html
<input value="Export to PNG" type="button" onclick='gantt.exportToPNG()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


관련 예제: [Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## export 메서드의 매개변수

[exportToPDF](api/method/exporttopdf.md) 및 [exportToPNG](api/method/exporttopng.md) 메서드는 여러 속성을 가지는 동일한 객체를 매개변수로 받으며(모든 속성은 선택적):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 출력 파일의 이름</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>string</i>) 출력 Gantt 차트의 [skin](guides/skins.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) 출력 Gantt 차트에서 사용할 언어를 설정</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) 출력 Gantt 차트에 표시될 데이터 범위의 시작 날짜를 설정합니다. 날짜 형식은 [date_format](api/config/date_format.md) 설정으로 정의됩니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) 출력 Gantt 차트에 표시될 데이터 범위의 종료 날짜를 설정합니다. 날짜 형식은 [date_format](api/config/date_format.md) 설정으로 정의됩니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) 출력 Gantt 차트에 표시될 사용자 정의 데이터 소스를 설정합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 출력 PDF 이미지에 추가될 헤더를 지정합니다. HTML은 자유롭게 사용할 수 있습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 출력 PDF 이미지에 추가될 풋터를 지정합니다. HTML은 자유롭게 사용할 수 있습니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 요청의 API 엔드포인트를 설정합니다. 로컬 내보내기 서비스 설치와 함께 사용할 수 있습니다. 기본 값은 [https://export.dhtmlx.com/gantt](https://export.dhtmlx.com/gantt)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) 모든 Gantt 마크업을 있는 그대로, 모든 커스텀 요소를 포함하여 내보내도록 합니다. 기본값은 <em>false</em>. [아래의 세부 정보 참조](guides/export.md#exportingcustommarkupandstyles)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) 생성된 PDF/PNG 파일의 다운로드 URL을 받으려면 callback 속성을 사용할 수 있습니다. URL 속성이 있는 JSON 객체를 반환합니다</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) <b>exportToPDF()</b> 메서드에 대한 추가 설정 객체. 객체는 다음 속성을 포함할 수 있습니다: <ul> <li><b>format</b> - (<i>string</i>) 출력 파일 형식: <i>"A0", "A1", "A2", "A3", "A4", "A5", "A6", "Legal", "Ledger", "Letter", "Tabloid"</i></li> <li><b>landscape</b> - (<i>boolean</i>) 출력 파일의 가로/세로 방향. "format" 속성이 지정된 경우에만 작동합니다.</li> <li><b>width</b> - (<i>string | number | "content"</i>) 출력 페이지의 너비. 다중 페이지 내보내기 시 사용됩니다. </li> <li><b>height</b> - (<i>string | number | "content"</i>) 출력 페이지의 높이. 다중 페이지 내보내기 시 사용됩니다.</li> <li><b>merge_pages</b> - (<i>boolean</i>) 하나의 파일에 다중 페이지 내보내기를 활성화합니다; <i>false</i>로 설정하면 모든 Gantt 데이터를 얻기 위해 여러 차례 내보내야 합니다</li> <li><b>fixed_headers</b> - (<i>boolean</i>) 각 페이지에 그리드 및 타임라인 헤더를 표시하도록 활성화합니다; 기본값은 <i>false</i>. 활성화된 <b>merge_pages</b> 설정과 함께만 작동합니다</li> <li><b>margins</b> - (<i>object</i>) 출력 PDF 파일의 위쪽/아래쪽/왼쪽/오른쪽 여백 객체. 아래의 상세 설명 참고</li> <li><b>header</b> - (<i>string</i>) 출력 PDF 파일 각 페이지에 추가될 헤더를 지정합니다. 아래의 상세 설명 참고</li> <li><b>footer</b> - (<i>string</i>) 출력 PDF 파일 각 페이지에 추가될 풋터를 지정합니다. 아래의 상세 설명 참고</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) <b>exportToPNG()</b> 메서드에 대한 추가 설정 객체. 객체는 다음 속성을 포함할 수 있습니다: <ul> <li><b>width</b> - (<i>number|string</i>) 출력 페이지의 너비</li> <li><b>height</b> - (<i>number|string</i>) 출력 페이지의 높이</li> 출력의 <b>width</b>와 <b>height</b> 매개변수는 <b>slice_archive</b>가 지정되면 무시됩니다. <li><b>slice_archive</b> - (<i>boolean|object</i>) 큰 차트를 조각으로 저장하고 아카이브에서 얻을 수 있게 합니다. 객체로 받을 때는 <b>width</b>와 <b>height</b> 옵션을 사용합니다. 조각 크기가 정의되지 않은 경우(예: <i>slice_archive: true</i>) 기본 크기는 1000×1000입니다.</li> <li><b>slice_check</b> - (<i>boolean</i>) 아카이브에 HTML 페이지를 추가합니다. 이 페이지를 통해 모든 조각이 올바르게 내보내졌는지 확인할 수 있습니다.</li> </ul></td>
  </tr>
  </tbody>
</table>


~~~js title="Calling export methods with optional properties"
gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: {},
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});

gantt.exportToPNG({
    name: "mygantt.png",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: {},
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});
~~~

## 출력 파일의 이름

출력 파일의 이름을 사용자 정의하려면 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 메서드 매개변수의 **name** 속성을 사용합니다:

~~~js
gantt.exportToPDF({
    name: "my_beautiful_gantt.pdf"
});
~~~

## 출력 파일의 언어

기본적으로 Gantt 차트는 페이지에 표시되는 동일한 언어로 내보내집니다.

출력 파일의 언어를 사용자 지정하려면 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 메서드 매개변수의 **locale** 속성을 사용합니다:

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    locale: "de"
});
~~~


## 내보낼 데이터

출력 PDF 또는 PNG 파일에 표시할 작업을 설정하려면 다음 중 하나를 사용합니다:

1. <a href="#daterange">출력 데이터의 날짜 범위 지정</a>.
2. <a href="#customdata">출력용 사용자 정의 데이터 소스 지정</a>.

<a id="daterange"></a>

### 출력 작업의 날짜 범위 지정

출력 문서에 표시될 작업의 범위를 설정하려면 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 메서드 매개변수의 <b>start</b>, <b>end</b> 속성을 사용하십시오:

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    start: "01-04-2026",
    end: "11-04-2026"
});
~~~

:::note
날짜 형식은 [date_format](api/config/date_format.md) 설정에 의해 정의됩니다.
:::

### 출력에 사용할 커스텀 데이터 소스 지정 {#customdata}

Gantt 차트를 커스텀 데이터 세트로 내보내려면(초기 Gantt 차트에 표시된 데이터가 아니라) [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 메서드 매개변수의 **data** 속성을 사용합니다:

~~~js {2}
gantt.exportToPDF({
    data: {
        tasks: [
            { id: 1, text: "Project #1", start_date: "01-04-2026", duration: 18 },
            { id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, parent: 1 },
            { id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, parent: 1 }
        ],
        links: [
            { id: 1, source: 1, target: 2, type: "1" },
            { id: 2, source: 2, target: 3, type: "0" },
            { id: 3, source: 3, target: 4, type: "0" },
            { id: 4, source: 2, target: 5, type: "2" }
        ]
    }
});
~~~

:::note
출력 매개변수의 값으로 URL을 지정할 수는 없습니다. 데이터 객체만 허용됩니다.
:::

## 출력 Gantt 차트의 스킨

기본적으로 Gantt 차트는 페이지에 표시되는 것과 동일한 스킨으로 내보내집니다.

출력 PNG 또는 PDF 파일에 대해 다른 스킨을 설정하려면 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 매개변수의 <b>skin</b> 속성을 사용합니다:

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    skin: "material"
});
~~~

[사용 가능한 모든 Gantt 스킨의 전체 목록 확인](guides/skins.md).


## 출력 파일의 머리말/풋터

출력 PNG 또는 PDF 파일에 머리말/풋터를 추가하려면 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 메서드 매개변수의 <b>header</b>/<b>footer</b> 속성을 사용합니다:

:::note
매개변수를 지정할 때 HTML을 자유롭게 사용할 수 있습니다. 이미지를 지정할 때는 `src` 속성의 경로를 전역적으로 설정해야 한다는 점을 기억하세요.
:::

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>"
});
~~~

### 각 페이지에 대한 머리말/풋터 {#headerfooterforeachpage}

각 페이지에 대한 머리말/풋터를 추가하려면 exportToPDF 메서드의 **additional_settings** 객체의 header/footer 속성을 사용합니다.

현재 페이지 번호를 표시하려면 class="pageNumber"를 가진 요소를, 전체 페이지 수를 표시하려면 class="totalPages"를 가진 요소를 <b>header</b>/<b>footer</b> 속성에 사용합니다:

~~~js
gantt.exportToPDF({
    additional_settings: {
        format: "A4",
        // 헤더/풋터를 렌더링하려면 올바른 여백이 필수
        margins: {
            top: 10,
            bottom: 10,
            left: 0.1,
            right: 1
        },
        header: "Each page header",
        footer: 'Page: <span class="pageNumber"></span>/<span class="totalPages"></span>'
    }
});
~~~

이 설정은 **margins**가 지정되고 헤더/풋터를 올바르게 표시할 충분한 공간이 있을 때만 작동합니다. 그렇지 않으면 헤더/풋터가 가턴트 바깥에 렌더링됩니다. 텍스트 한 줄에 대해 최소 여백으로는 *10*를 설정하는 것이 좋습니다.

## 출력 PDF 파일의 여백

출력 PDF 파일에 여백을 추가하려면 [exportToPDF](guides/export.md#parameters-of-the-export-methods) 메서드의 **additional_settings** 객체에서 **margins** 속성을 사용합니다. 이 여백 설정은 단일 페이지 내보내기와 [다중 페이지 내보내기](api/method/exporttopdf.md#multi-page-export) 모두에 작동합니다.

여백 설정 값은 숫자로 지정합니다:

~~~js
gantt.exportToPDF({
    additional_settings: {
        margins: {
            top: 5,
            bottom: 10,
            left: 2,
            right: 2
        },
    },
});
~~~

일부 여백 설정이 지정되지 않으면 무시됩니다.

기본값은 밀리미터이지만, <b>unit: "inch"</b> 속성을 설정하여 여백 값을 인치 단위로 지정할 수 있습니다:

~~~js {8}
gantt.exportToPDF({
    additional_settings: {
        margins: {
            top: 5,
            bottom: 10,
            left: 2,
            right: 2,
            unit: "inch"
        },
    },
});
~~~

## 출력 파일의 사용자 정의 스타일 {#customstylefortheoutputfile}

출력 파일의 스타일을 사용자 정의하려면 고유 CSS 클래스를 포함하는 스타일시트를 제공하면 됩니다:

- 링크를 통한 방법:

~~~js
gantt.exportToPDF({
    name: "calendar.pdf",
    header: '<link rel="stylesheet" href="http://mysite.com/custom.css">'
});
~~~

- 또는 'style' 태그를 통한 방법:

~~~js
gantt.exportToPDF({
    name: "calendar.pdf",
    header: '<style>... custom css classes here ...</style>'
});
~~~


위의 방법은 전역 HTTP 참조에 대해 작동합니다. 내부망(Intranet)/로컬 환경에서 CSS 클래스가 지정된 경우에도 아래와 같이 모든 스타일을 동일하게 포함시킬 수 있습니다:

~~~js
gantt.exportToPDF({
    header: "<style>.tier1{background: red; color:white;}</style>"
});
~~~

:::note
더 많은 예제는 [How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#how-to-add-resource-chart-or-custom-styles-in-the-exported-pdf-file) 문서를 확인하십시오.
:::

### 내보내기 함수의 모든 스타일 수집하기

가끔 스타일이 공개적으로 접근할 수 없는 서로 다른 파일에 지정되어 있고, 각 파일의 스타일을 따로 포함하기 번거로운 경우가 있습니다. 내보내기를 위해 모든 스타일을 한꺼번에 모아둘 수 있는 방법이 있습니다.

모든 스타일은 HTML 페이지의 document.styleSheets 객체에 저장됩니다. 동일 사이트에서 포함된 style 혹은 link 요소를 사용하면 이를 모두 수집한 뒤 header에 지정할 수 있습니다. 아래의 예제를 확인하십시오:

~~~js
const styles = [];

for (const styleSheet of document.styleSheets) {
    try {
        const rules = styleSheet.cssRules;

        for (const rule of rules) {
            styles.push(rule.cssText);
        }
    } catch (error) {
        // 읽을 수 없는 스타일시트는 무시
    }
}

gantt.exportToPDF({
    raw: true,
    header: "<style>" + styles.join(" ") + "</style>"
});
~~~

관련 예제: [Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/osbscj62)


관련 예제: [Export Gantt with resource load diagram to PDF with no need to specify styles](https://snippet.dhtmlx.com/duf5ijuv)


## 출력 마크업 및 스타일 내보내기 {#exportingcustommarkupandstyles}

기본적으로 Gantt 차트는 지정된 구성과 로드된 데이터를 바탕으로 내보내며, [custom elements](guides/baselines.md) 및 일부 템플릿은 내보내지 않습니다.
전체 Gantt 마크업을 있는 그대로 내보내려면 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 매개변수에서 <b>raw: true</b> 속성을 설정하면 됩니다.

~~~js
gantt.exportToPDF({
    raw: true
});
~~~

참고: 커스텀 요소를 올바르게 표시하려면 [custom styles](guides/export.md#customstylefortheoutputfile) 제공이 필요합니다.

이 모드를 사용할 경우 API 요청 크기가 증가합니다. 큰 차트는 온라인 내보내기의 10MB 제한을 초과할 수 있으며 이 경우 해당 방식으로 내보내지 못할 수 있습니다. 이러한 경우 로컬에 [export 서비스](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 설치하고 요청 크기를 늘려야 합니다.

로컬에서 내보내기 서비스를 설치하려면 시스템 요구사항을 확인하십시오( guides/export-requirements.md).

## HTML 요소 내보내기

Gantt 차트를 PNG 및 PDF 형식으로 내보내는 동안 HTML 요소의 내보내기가 가능성 있는 보안 문제로 인해 제한될 수 있음을 유의해야 합니다.

일부 HTML 요소는 내보내기에 완전히 허용되지 않습니다. 예를 들어 \<canvas\>, \<svg\>, \<script\> 및 Base64 이미지가 포함된 src 속성을 가진 이미지 등은 허용되지 않을 수 있습니다. 다만 SVG 및 Base64 형식으로 이미지를 내보내는 안전한 방법이 있습니다:

- SVG 형식의 이미지 URL이 포함된 \<img\> 요소를 사용할 수 있습니다(PNG 및 JPG 형식에 적합, Base64 형식에는 작동하지 않음), 예:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- style 요소를 사용하여 예: background 혹은 background-image와 이미지에 대한 링크를 Base64 형식의 이미지로 값으로 지정하는 방법( PNG/JPG/SVG 형식에 적합)

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

관련 예제: [Exporting safe and insecure HTML elements to PDF](https://snippet.dhtmlx.com/hj6w4dk3?text="gantt")

만약 내보내기 모듈이 있고 온라인 내보내기 서버에서 지원되지 않는 HTML 요소를 내보내야 하는 경우, 모듈의 제한을 제거하기 위한 변경 방법에 대한 지침을 받으려 지원 요청을 제출할 수 있습니다. 다만 이 경우 서버가 XSS 공격에 취약해질 수 있음을 유의해야 합니다.