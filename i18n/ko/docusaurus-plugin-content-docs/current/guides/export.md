---
title: "Export to PDF and PNG"
sidebar_label: "Export to PDF and PNG"
---

# Export to PDF and PNG  

dhtmlxGantt는 Gantt 차트를 [PDF](guides/export.md#exporttopdf) 또는 [PNG](guides/export.md#exporttopng) 파일로 저장할 수 있는 온라인 내보내기 서비스를 제공합니다.

:::note
이 서비스는 무료로 사용할 수 있지만, 내보낸 PDF/PNG 파일에는 GPL 라이선스 하에서 라이브러리의 워터마크가 포함됩니다. 라이선스를 구매하면 활성 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 내보내기 파일에 워터마크가 표시되지 않습니다.
:::

Gantt 차트를 PDF 또는 PNG로 로컬에서 내보내기 위해 직접 설정할 수 있는 다양한 내보내기 서비스가 있습니다. 내보내기 서비스는 Gantt 패키지에 포함되어 있지 않으므로 각 서비스의 사용 조건에 대해서는 [관련 문서](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 참고하세요.

## 온라인 내보내기 서비스 제한 사항  {#onlineexportservicerestrictions}

:::note
내보내기 서비스는 처리 시간과 요청 크기에 제한이 있습니다.
:::

### 시간 제한

내보내기 과정이 20초를 초과하면 프로세스가 중단되고 다음과 같은 오류가 표시됩니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

여러 사용자가 동시에 Gantt 차트를 내보낼 때, 프로세스가 더 오래 걸릴 수 있지만 시간은 각 사용자의 요청별로 별도로 측정됩니다.

### 요청 크기 제한

공용 API 엔드포인트 **https://export.dhtmlx.com/gantt** 에서는 모든 내보내기 메서드(*exportToPDF*, *exportToPNG*, *exportToMSProject* 등)을 처리합니다. 이 엔드포인트의 최대 요청 크기는 **10 MB**입니다.

또한, [MSProject](guides/export-msproject.md) 및 [Primavera P6](guides/export-primavera.md) 내보내기/가져오기 서비스(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* 전용)를 위한 전용 API 엔드포인트 **https://export.dhtmlx.com/gantt/project** 가 있습니다. 이 엔드포인트는 최대 **40 MB**의 요청을 지원합니다.

## 내보내기 모듈 사용   {#usingexportmodules}

:::note
대용량 차트 내보내기에는 [독립형 내보내기 모듈](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)을 사용할 수 있습니다.  
이 모듈은 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), 또는 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스를 보유하고 있으면 무료로 사용할 수 있으며, [별도로 구매](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)할 수도 있습니다.
:::

[PDF 내보내기 모듈 사용에 대한 자세한 내용은 여기를 참고하세요.](guides/pdf-export-module.md)

## Export to PDF   {#exporttopdf}

Gantt 차트를 PDF로 내보내려면 다음 단계를 따르세요:

- <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 방식으로 활성화합니다:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Gantt 8.0 미만 버전을 사용하는 경우, 온라인 내보내기 서비스를 활성화하려면 **https://export.dhtmlx.com/gantt/api.js** 를 페이지에 포함해야 합니다. 예시:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 그런 다음, [exportToPDF](guides/export.md#parametersoftheexportmethods) 메서드를 호출하여 차트를 내보냅니다:

~~~html
<input value="Export to PDF" type="button" onclick='gantt.exportToPDF()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## Export to PNG   {#exporttopng}

Gantt 차트를 PNG 이미지로 내보내려면 다음 단계를 따르세요:

- <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 방식으로 활성화합니다:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Gantt 8.0 미만 버전을 사용하는 경우, 온라인 내보내기 서비스를 활성화하려면 **https://export.dhtmlx.com/gantt/api.js** 를 페이지에 포함해야 합니다. 예시:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 그런 다음, [exportToPNG](guides/export.md#parametersoftheexportmethods) 메서드를 호출하여 차트를 내보냅니다:

~~~html
<input value="Export to PNG" type="button" onclick='gantt.exportToPNG()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## 내보내기 메서드의 파라미터   {#parametersoftheexportmethods}

[exportToPDF](api/method/exporttopdf.md) 및 [exportToPNG](api/method/exporttopng.md) 메서드는 다양한 선택적 속성을 가진 객체를 인자로 받을 수 있습니다:

<table class="webixdoc_links">
    <tbody>
        <tr>
            <td class="webixdoc_links0"><b>name</b></td>
            <td>(<i>string</i>) 내보내는 파일의 이름을 지정합니다</td>
        </tr>
       <tr>
            <td class="webixdoc_links0"><b>skin</b></td>
            <td>(<i>string</i>) 내보낸 Gantt 차트의 [스킨](guides/skins.md)을 지정합니다</td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>locale</b></td>
            <td>(<i>string</i>) 내보낸 Gantt 차트에 사용되는 언어를 정의합니다</td>
        </tr>        
        <tr>
            <td class="webixdoc_links0"><b>start</b></td>
            <td>(<i>string</i>) 내보내기에 포함할 데이터 범위의 시작 날짜를 지정합니다. 날짜 형식은 [date_format](api/config/date_format.md) 설정을 따릅니다</td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>end</b></td>
            <td>(<i>string</i>) 내보내기에 포함할 데이터 범위의 종료 날짜를 지정합니다. 날짜 형식은 [date_format](api/config/date_format.md) 설정을 따릅니다</td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>data</b></td>
            <td>(<i>object</i>) 내보낸 Gantt 차트에 표시할 커스텀 데이터 소스를 제공합니다</td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>header</b></td>
            <td>(<i>string</i>) 내보낸 PDF 이미지에 헤더를 추가합니다. 여기에 HTML 콘텐츠를 사용할 수 있습니다</td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>footer</b></td>
            <td>(<i>string</i>) 내보낸 PDF 이미지에 푸터를 추가합니다. 여기에 HTML 콘텐츠를 사용할 수 있습니다</td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>server</b></td>
            <td>(<i>string</i>) 내보내기 요청의 API 엔드포인트를 설정합니다. 로컬 내보내기 서비스를 사용하는 경우 유용합니다. 기본값은 <strong>https://export.dhtmlx.com/gantt</strong> 입니다</td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>raw</b></td>
            <td>(<i>boolean</i>) 커스텀 요소를 포함하여 모든 Gantt 마크업을 그대로 내보냅니다. 기본값은 <em>false</em>입니다. [아래에서 자세히 보기](guides/export.md#exportingcustommarkupandstyles)</td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>callback</b></td>
            <td>(<i>function</i>) 생성된 PDF/PNG 파일을 다운로드할 수 있는 URL이 담긴 JSON 객체를 받습니다</td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>additional_settings</b></td>
            <td>(<i>object</i>) <b>exportToPDF()</b> 메서드의 추가 설정, 다음을 포함합니다: <ul> <li><b>format</b> - (<i>string</i>) 출력 파일 형식: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) 출력 파일의 방향; "format"이 설정된 경우에만 적용</li> <li><b>width</b> - (<i>string | number | "content"</i>) 다중 페이지 내보내기 시 페이지 너비</li> <li><b>height</b> - (<i>string | number | "content"</i>) 다중 페이지 내보내기 시 페이지 높이</li> <li><b>merge_pages</b> - (<i>boolean</i>) 한 파일에 여러 페이지를 내보내는 기능; <i>false</i>인 경우 모든 Gantt 데이터를 커버하려면 여러 번 내보내야 함</li> <li><b>fixed_headers</b> - (<i>boolean</i>) 모든 페이지에 그리드와 타임라인 헤더를 표시; 기본값은 <i>false</i>. <b>merge_pages</b>가 활성화된 경우에만 작동</li> </ul></td>
        </tr>
        <tr>
            <td class="webixdoc_links0"><b>additional_settings</b></td>
            <td>(<i>object</i>) <b>exportToPNG()</b> 메서드의 추가 설정, 다음을 포함합니다: <ul> <li><b>width</b> - (<i>number|string</i>) 출력 이미지의 너비</li> <li><b>height</b> - (<i>number|string</i>) 출력 이미지의 높이</li> 이 값은 <b>slice_archive</b>가 설정된 경우 무시됩니다. <li><b>slice_archive</b> - (<i>boolean|object</i>) 대용량 차트를 조각내어 아카이브로 내보낼 수 있습니다. 객체로 지정하면 <b>width</b>와 <b>height</b>를 설정할 수 있습니다. <i>true</i>로만 설정하면 기본값은 1000×1000입니다.</li> <li><b>slice_check</b> - (<i>boolean</i>) 아카이브 안에 모든 조각이 정상적으로 내보내졌는지 확인할 수 있는 HTML 페이지를 추가합니다.</li> </ul></td>
        </tr>
    </tbody>
</table>



**옵션 속성을 사용하여 내보내기 메서드를 호출하는 예시**
~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    locale:"en",
    start:"01-04-2013",
    end:"11-04-2013",
    skin:'terrace',
    data:{ },
    server:"https://myapp.com/myexport/gantt",
    raw:true,
    callback: function(res){
        alert(res.url);
    }
});

gantt.exportToPNG({
    name:"mygantt.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    locale:"en",
    start:"01-04-2013",
    end:"11-04-2013",
    skin:'terrace',
    data:{ },
    server:"https://myapp.com/myexport/gantt",
    raw:true,
    callback: function(res){
        alert(res.url);
    }
});
~~~

## 내보내기 파일 이름 지정

내보내는 파일의 이름을 지정하려면 [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods) 파라미터에서 **name** 속성을 사용하세요:

~~~js
gantt.exportToPDF({
    name:"my_beautiful_gantt.pdf"/*!*/
});
~~~

## 내보내기 파일의 언어

기본적으로 내보내는 Gantt 차트는 페이지에 표시된 언어와 동일한 언어를 사용합니다.

다른 언어로 내보내려면 [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods) 파라미터에 **locale** 속성을 지정하세요:

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    locale:"de" /*!*/
});
~~~

## 내보낼 데이터 지정  {#datatoexport}

PDF 또는 PNG로 내보낼 작업을 지정하는 방법은 두 가지가 있습니다:

1. [내보낼 데이터의 날짜 범위를 지정합니다.](#daterange)
2. [내보낼 커스텀 데이터 소스를 제공합니다.](#customdata)

<a id="daterange"></a>

### 내보낼 작업의 날짜 범위 지정

내보내기에 포함할 작업의 범위를 지정하려면 [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods) 파라미터에 **start** 와 **end** 속성을 사용하세요:

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    start:"01-04-2013",/*!*/
    end:"11-04-2013"/*!*/
});
~~~

:::note
날짜 형식은 [date_format](api/config/date_format.md) 설정에 의해 제어됩니다.
:::

<a id="customdata"></a>

### 내보낼 커스텀 데이터 소스 지정

초기에 표시된 데이터와 다른 데이터 세트로 Gantt 차트를 내보내고 싶다면, [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods) 메서드의 **data** 속성을 사용할 수 있습니다:

~~~js
gantt.exportToPDF({
    data:{/*!*/
        data:[
            {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
            {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
            {id:3, text:"Task #2", start_date:"11-04-2013",duration:8, parent:1}
        ],
        links:[
            {id:1, source:1, target:2, type:"1"},
            {id:2, source:2, target:3, type:"0"},
            {id:3, source:3, target:4, type:"0"},
            {id:4, source:2, target:5, type:"2"}
        ]
    }
});
~~~

:::note
**data** 파라미터는 반드시 데이터를 담은 객체여야 하며, URL을 값으로 지정할 수 없습니다.
:::

## 내보내기 Gantt 차트의 스킨 {#skinoftheoutputganttchart}

기본적으로 내보내는 Gantt 차트는 페이지에 표시된 스킨과 동일한 스킨을 사용합니다.

내보낸 PNG 또는 PDF 파일에서 다른 스킨을 적용하려면 [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods) 파라미터의 **skin** 속성을 사용하세요:

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    skin:"material"/*!*/ 
});
~~~

[사용 가능한 Gantt 스킨 전체 목록 보기](guides/skins.md).

## 출력 파일의 헤더/푸터 {#headerfooteroftheoutputfile}

**header** 및 **footer** 속성을 [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods) 메서드의 파라미터에 사용하여 내보낸 PNG 또는 PDF 파일에 헤더나 푸터를 추가할 수 있습니다.

:::note
이 파라미터에는 어떤 HTML도 포함할 수 있습니다. 이미지를 추가할 때는 "src" 속성에 전역 경로를 사용해야 합니다.
:::

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    header:"<h1>My company</h1>",/*!*/
    footer:"<h4>Bottom line</h4>"/*!*/
});
~~~


## 출력 파일의 커스텀 스타일 {#marginsoftheoutputpdffile}

내보낸 Gantt 차트의 스타일을 커스터마이즈하려면, CSS 클래스를 담은 스타일시트를 다음 두 가지 방법으로 제공할 수 있습니다.

- 외부 스타일시트에 링크를 추가하는 방법:

~~~js
gantt.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- 또는 'style' 태그를 사용하여 스타일을 직접 삽입하는 방법:

~~~js
gantt.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

이 방법은 전역적으로 접근 가능한 HTTP 참조에서만 동작한다는 점에 유의하세요. CSS 파일이 인트라넷이나 로컬에 호스팅되어 있다면, 아래와 같이 스타일을 직접 삽입할 수 있습니다.

~~~js
gantt.exportToPDF({
    header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~

:::note
추가 예시는 [How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#howtoaddresourcechartorcustomstylesintheexportedpdffile) 문서를 참고하세요.
:::

### 내보내기 함수에 사용할 모든 스타일 수집하기

때로는 스타일이 여러 파일에 분산되어 있고, 각각을 별도로 포함하기 번거로울 수 있습니다. 이 경우 페이지에서 사용되는 모든 스타일을 수집하여 내보내기 헤더에 포함할 수 있습니다.

모든 스타일은 **document.styleSheets** 객체에서 확인할 수 있습니다. 스타일이 동일 도메인에서 제공된다면, CSS 규칙을 수집하여 **header**에 삽입할 수 있습니다. 예시는 다음과 같습니다.

~~~js
const styles = []
for (el in document.styleSheets) {
    try {
        const rules = (document.styleSheets[el]).cssRules;
        for (rule in rules) {
            styles.push(rules[rule].cssText)
        }
    }
    catch (e) { }
}

gantt.exportToPDF({
    raw: true,
    header: "<style>" + styles.join(" ") + "</style>"
});
~~~ 


**Related example:** [Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/osbscj62)




**Related example:** [Export Gantt with resource load diagram to PDF with no need to specify styles](https://snippet.dhtmlx.com/duf5ijuv)


## 커스텀 마크업 및 스타일 내보내기 {#customstylefortheoutputfile}

기본적으로 Gantt 차트는 제공된 구성과 로드된 데이터에 따라 내보내기가 이루어지지만, [custom elements](guides/baselines.md) 및 일부 템플릿은 포함되지 않습니다.

전체 Gantt 마크업을 있는 그대로(모든 커스텀 요소 포함) 내보내려면, [exportToPDF/exportToPNG](guides/export.md#parametersoftheexportmethods) 메서드의 파라미터에 **raw:true** 속성을 설정하세요.

~~~js
gantt.exportToPDF({
    raw:true
});
~~~

커스텀 요소가 제대로 표시되려면 [custom styles](guides/export.md#customstylefortheoutputfile)가 필요합니다.

또한, 이 모드를 사용하면 API 요청의 크기가 커집니다. 대형 차트는 온라인 내보내기 서비스의 10MB 제한을 초과하여 내보내기에 실패할 수 있습니다. 이 경우 [export service](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 로컬에 설치하고 요청 크기를 조정해야 합니다. 


로컬 내보내기 서비스 설정 방법은 [system requirements](guides/export-requirements.md)를 참고하세요.

## HTML 요소 내보내기 {#exportingcustommarkupandstyles}

Gantt 차트를 PNG 또는 PDF로 내보낼 때, 보안상의 이유로 HTML 요소 내보내기에는 제한이 있습니다.

`<canvas>`, `<svg>`, `<script>`와 같이 특정 HTML 요소 및 *src* 속성에 Base64 데이터가 포함된 이미지 등은 제한됩니다. 하지만 SVG 및 Base64 형식의 이미지를 안전하게 내보내는 방법이 있습니다.

- *src* 속성에 SVG 이미지의 URL을 지정한 `<img>` 요소 사용 (PNG, JPG 내보내기에서 동작, Base64는 불가):

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- *background* 또는 *background-image* CSS 스타일에 `url` 값을 사용하여 이미지 URL 또는 Base64 데이터를 지정 (PNG, JPG, SVG 내보내기에서 동작):

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~


**Related example:** [Exporting safe and insecure HTML elements to PDF](https://snippet.dhtmlx.com/hj6w4dk3)


`export` 모듈을 사용하고 있고, 온라인 `export` 서버에서 지원하지 않는 HTML 요소를 내보내야 하는 경우, 해당 제한을 해제하는 방법에 대해 지원팀에 문의할 수 있습니다. 다만, 이 경우 서버가 XSS 취약점에 노출될 수 있으니 주의가 필요합니다.

