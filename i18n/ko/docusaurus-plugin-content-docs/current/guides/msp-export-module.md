---
title: "MS Project 및 Primavera P6용 내보내기 모듈"
sidebar_label: "MS Project/P6 모듈"
---

# MS Project 및 Primavera P6용 내보내기 모듈

이 내보내기 모듈은 MS Project와 Primavera 파일의 가져오기/내보내기를 지원합니다. 이는 dotnet 환경 안에서 실행하거나 도커 이미지 안에서 실행할 수 있는 .NET Core 애플리케이션입니다.  

PDF, PNG, Excel 및 iCal 파일에 대한 가져오기/내보내기 기능은 포함되어 있지 않습니다. 이러한 기능이 필요하다면 [해당 내보내기 모듈](guides/pdf-export-module.md) 또는 우리의 온라인 서버를 사용하셔야 합니다.

## 설치 가이드

애플리케이션을 실행하기 전에 [.NET Core 7 환경](https://learn.microsoft.com/en-us/dotnet/core/install/)을 설치해야 합니다. 준비가 되면 클라이언트 영역의 다운로드 탭에서 MS Project 내보내기 모듈을 다운로드할 수 있습니다. 아래 이미지를 확인해 보세요:

![MSP 내보내기 모듈 다운로드](/img/msp_export_module_download.png)

소스 코드를 실행하는 방법은 2가지가 있습니다:

1. Visual Studio에서 실행하기 (Windows 전용)

이 방법의 경우 Visual Studio 2022가 필요합니다. 이전 버전은 .NET Core 7를 지원하지 않기 때문입니다. 애플리케이션을 열면 오른쪽 패널의 솔루션(Solution)을 오른쪽 클릭한 다음 NuGet 패키지 복원(Restore NuGet packages) 버튼을 클릭해야 합니다. 그 후에는 `http` 또는 `https` 버전을 실행할 수 있습니다.

2. 커맨드 라인에서 실행하기

이 방법은 Windows와 Linux에서 동일하게 작동합니다. 애플리케이션의 루트 폴더로 이동한 뒤 패키지를 설치하기 위해 아래 명령어를 실행합니다:

~~~
dotnet restore
~~~

그다음 "GanttToMSProject" 폴더로 이동한 후 애플리케이션을 실행하기 위해 아래 명령어를 실행합니다:

~~~
dotnet run
~~~

다음 명령어를 실행하여 애플리케이션을 게시할 수 있습니다:

~~~
dotnet publish -c Release -o published
~~~

## 내보내기 모듈 테스트

내보내기 모듈의 동작을 테스트하는 방법은 2가지가 있습니다.

1. 테스트 페이지를 이용하는 방법:

- 다음 URL을 엽니다: [https://export.dhtmlx.com/test](https://export.dhtmlx.com/test)
- 명령줄 출력에서 내보내기 모듈의 URL을 찾습니다. 예를 들면:

~~~
Now listening on: http://localhost:5128
~~~

- URL이 있는 첫 번째 드롭다운을 클릭하고 **custom**를 선택합니다.
- 내보내기 모듈의 URL을 붙여넣습니다.

이제 버튼으로 데이터를 내보낼 수 있습니다.

2. 스니펫(snippet) 사용 방법:

- 다음 URL을 엽니다: [https://snippet.dhtmlx.com/kf16k0if](https://snippet.dhtmlx.com/kf16k0if)

- 명령줄 출력에서 내보내기 모듈의 URL을 찾습니다. 예를 들면:

~~~
Now listening on: http://localhost:5128
~~~

- export 함수의 server 매개변수에 URL을 추가합니다. 예:

~~~
gantt.exportToMSProject({
    server: "http://localhost:5128",
});
~~~

이제 버튼으로 데이터를 내보낼 수 있습니다.

## 문제 해결

### PDF/PNG/Excel로의 내보내기가 작동하지 않음

MS Project 내보내기 모듈은 gantt.exportToMSProject(), gantt.importFromMSProject(), gantt.exportToPrimaveraP6(), gantt.importFromPrimaveraP6() 메서드에서만 작동합니다. PDF, PNG, Excel 또는 iCal로는 내보내지 않으므로 아래를 호출하면 작동하지 않습니다:

~~~
gantt.exportToPDF({server:"gantt-to-msproject-url"});
~~~

또한 매개변수를 전달하지 않고 `gantt.exportToMSProject()`를 호출하면 기본적으로 우리의 온라인 서비스인 `export.dhtmlx.com`을 호출합니다라는 점에 유의하십시오. [두 모듈의 상호 작용 방식](guides/export-modules.md#service-topology)을 참조하십시오.

### MPP 파일 내보내기

MS Project 내보내기 모듈과 내보내기 서버는 MS Project 및 Primavera 파일을 가져오고 내보내기 위해 MPXJ 라이브러리를 사용합니다. 불행히도 MPP 파일을 내보낼 방법은 없지만 XML과 MPP 파일을 모두 가져올 수 있습니다([MPXJ FAQ](https://www.mpxj.org/faq/)).

MPP로의 직접 내보내기는 지원되지 않지만, Gantt에서 변경한 내용을 MS Project로 되돌릴 수는 있습니다. 일반적인 왕복(round-trip) 워크플로는 다음과 같습니다:

1. 사용자가 MS Project에서 프로젝트를 만들거나 편집하고 파일을 저장합니다(MPP 또는 XML).
2. 파일을 [Gantt로 가져오면](guides/export-msproject.md#import-from-ms-project) 데이터를 확인하거나 수정할 수 있습니다.
3. Gantt 데이터를 [XML Project 파일로 내보냅니다](guides/export-msproject.md#export-to-ms-project).
4. 생성된 XML 파일을 MS Project의 원본 파일로 다시 가져옵니다:
    - Gantt에서 삭제된 작업이 없다면 **병합(Merge)** 옵션을 사용하여 XML 파일을 가져옵니다(아래 스크린샷 참고). 기존 작업은 업데이트되고 새 작업은 추가됩니다.

    ![MS Project import wizard - Merge option](/img/msp_import_merge.png)

    - Gantt에서 일부 작업이 삭제된 경우, MS Project는 병합 시 작업을 업데이트하고 추가하기만 하므로 가져오기 중에 해당 작업이 자동으로 제거되지 않습니다. 이 경우 먼저 MS Project에서 해당 작업을 직접 선택하여 삭제한 다음, **추가(Append)** 또는 **병합(Merge)** 옵션으로 XML 파일을 가져옵니다(아래에는 **추가(Append)** 옵션이 표시되어 있습니다).

    ![MS Project import wizard - Append option](/img/msp_import_append.png)

기본적으로 Gantt는 기본 작업/프로젝트 속성 집합만 가져오고 내보냅니다. 추가 속성을 왕복 과정에 포함하려면 가져오기에 대해서는 [작업 속성 얻기](guides/export-msproject.md#getting-tasks-properties)를, 내보내기에 대해서는 [Export 설정](guides/export-msproject.md#export-settings)에 설명된 `tasks` 객체를 참조하십시오.

### 대용량 파일 가져오기 {#import-of-large-files}

대용량 파일을 가져오려면 요청 크기 제한을 제거해야 합니다. 이를 위해서는 `GanttToMSProject/Controllers/MspConversionController.cs` 파일을 열어야 합니다. 거기서 `DisableRequestSizeLimit`와 그 뒤의 줄의 주석을 제거해야 합니다.

변경 사항을 저장하고 서버를 재시작하면 대용량 파일을 가져올 수 있어야 합니다. 244Mb 파일을 가져오는 데 최대 4Gb RAM이 필요하고, 400Mb 파일을 가져오는 데는 약 4.7Gb RAM이 필요하다는 것이 테스트를 통해 확인되었습니다.

### Docker 이미지 사용

도커 이미지를 빌드하려면 다음 명령어를 실행합니다:

~~~
docker build -t msp_export_module .
~~~

테스트 목적의 도커 이미지를 실행하려면 다음 명령어를 사용할 수 있습니다:

~~~
docker run -p 8080:8080 msp_export_module 
~~~

컨테이너를 `Ctrl+C` 단축키 조합으로 중지할 수 있습니다.

도커 이미지를 "분리(detached)" 모드로 실행하면 백그라운드에서 실행됩니다:

~~~
docker run -d -p 8080:8080 msp_export_module 
~~~