--- 
title: React Gantt와 Firebase 통합
sidebar_label: Firebase 빠른 시작
description: "Firebase Firestore를 통해 실시간으로 동기화되는 협업용 React Gantt를 구축"
--- 

# React Gantt와 Firebase 통합

이 튜토리얼은 [React Gantt](integrations/react.md) 차트를 Firebase Firestore를 사용해 여러 클라이언트 간에 작업 및 링크 데이터를 실시간으로 동기화하는 방법을 설명합니다. 이 기능은 특히 다음에 유용합니다:

- 프로젝트 관리 도구
- 팀 협업 앱
- 다중 사용자의 동기화가 중요한 일정 관리 플랫폼

다음 내용을 배우게 됩니다:

- 실시간 업데이트를 위한 Firebase 설정
- Gantt 차트의 초기화 및 렌더링
- 라이브 동기화를 이용한 CRUD(생성, 읽기, 업데이트, 삭제) 처리
- Gantt 상태의 실시간 변경을 효율적으로 처리

GitHub에서 대응 예제를 확인할 수 있습니다: [DHTMLX React Gantt with Firebase Firestore Demo](https://github.com/DHTMLX/firebase-react-gantt-demo).

## 1단계: 프로젝트 설정

먼저 React + Vite 프로젝트를 생성합니다.

React 프로젝트를 만들고 프로젝트 디렉토리로 이동하는 방법은 아래 명령을 실행합니다:

~~~bash
npm create vite@latest react-gantt-firebase -- --template react-ts
cd react-gantt-firebase
~~~

필요한 의존성을 설치합니다:

~~~js
npm install firebase
~~~

### React Gantt 설치

[React Gantt 설치 가이드](integrations/react/installation.md)에 설명된 대로 React Gantt를 설치합니다.

이 튜토리얼에서는 평가 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Professional 패키지를 이미 사용하는 경우, 명령어와 import에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 교체합니다.

## 2단계: Firebase 구성

먼저 아래 단계를 따라 Firebase 프로젝트를 만듭니다:

- Firebase Console로 이동
- **Create a project**를 클릭
- 프로젝트 이름을 입력하고(예: `react-gantt-firebase`) 설정 프롬프트를 따라 진행

그런 다음 아래 단계로 Firestore를 설정합니다:

- Firebase 프로젝트 대시보드의 **Firestore Database**로 이동
- **Create database**를 클릭
- 선호하는 위치를 선택
- 개발 중 편의를 위해 테스트 모드로 시작(생산 시 보안 규칙을 구성해야 함)
- **Create**를 클릭

그 후 웹 앱을 다음과 같이 등록합니다:

- Firebase Console 사이드바에서 **Project Overview**를 선택
- 웹 앱 아이콘 `</>`를 클릭해 새 웹 앱을 등록
- 앱 닉네임을 입력(예: `react-gantt-firebase`)
- Firebase Hosting을 활성화
- **Register app**을 클릭
- 생성된 Firebase 구성을 복사해 프로젝트에서 사용할 수 있도록 보관

마지막으로, 아래와 같이 프로젝트에 Firebase를 구성합니다:

- Firebase 구성을 `.env` 파일에 아래 형식으로 붙여넣습니다:

~~~js
VITE_FIREBASE_CONFIGURATION = {
    "apiKey": "YOUR_API_KEY",
    "authDomain":"react-gantt-firebase.firebaseapp.com",
    "projectId": "react-gantt-firebase",
    "storageBucket": "react-gantt-firebase.firebasestorage.app",
    "messagingSenderId": "693536970600",
    "appId": "1:693536970600:web:1b3fa4e4b032acaab368dd"
}
~~~

:::note
 `YOUR_API_KEY` 자리 표시자를 실제 Firebase 프로젝트 자격 증명으로 교체하십시오.
 :::

- 새로운 파일 **firebase.ts**를 만들고 Firebase와 Firestore를 초기화합니다. 아래 예제처럼 컬렉션에 대한 참조도 export합니다:

~~~js title=firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query } from "firebase/firestore";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIGURATION);

initializeApp(firebaseConfig);
const db = getFirestore();
const tasksCollection = collection(db, "tasks");
const linksCollection = collection(db, "links");
const tasksQuery = query(tasksCollection);
const linksQuery = query(linksCollection);

export { db, tasksQuery, linksQuery, tasksCollection, linksCollection };
~~~

## 3단계: Gantt 컴포넌트 만들기

먼저 [**React state**를 사용한 작업 및 링크 상태 관리](integrations/react/overview.md#bindingdata)로 핵심 Gantt 컴포넌트를 구성합니다. 구성은 아래와 같습니다:

~~~js
const [tasks, setTasks] = useState<Task[]>([]);
const [links, setLinks] = useState<Link[]>([]);

const templates: GanttTemplates = {
    parse_date: (date) => new Date(date),
    format_date: (dateString) => dateString.toISOString(),
};

const config: GanttConfig = {
    auto_scheduling: true,
};
~~~

위 스니펫에서:

- **Templates**

Templates를 통해 Gantt 컴포넌트 내부에서 날짜를 파싱하고 포맷하는 방식을 제어할 수 있습니다. Firestore는 날짜를 문자열로 저장하므로 이를 다시 `Date` 객체로 변환([parse_date](api/template/parse_date.md))하고 저장을 위해 올바르게 포맷([format_date](api/template/format_date.md))해야 합니다.

- **Config**

`auto_scheduling` 옵션은 상위 작업이 이동되거나 변경될 때 의존하는 하위 작업의 자동 재계산을 가능하게 합니다. 이는 프로젝트 관리 시나리오에 유용합니다.

이제 Gantt의 내부 상태를 관리하는 **상태 핸들러**를 생성합니다:

~~~js
const createStateHandlers = <T extends { id: string | number }>(
    setState: React.Dispatch<React.SetStateAction<T[]>>
): EntityHandler<T> => ({
    added: (item) => setState((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item])),
    modified: (item) => setState((prev) => prev.map((i) => (i.id === item.id ? { ...i, ...item } : i))),
    removed: (item) => setState((prev) => prev.filter((i) => i.id !== item.id)),
});

const taskHandlers = createStateHandlers<Task>(setTasks);
const linkHandlers = createStateHandlers<Link>(setLinks);
~~~

이 방식은 Firebase 데이터가 변경될 때 로컬 상태를 일관되게 업데이트하는 통합된 방법을 제공합니다.

두 종류의 엔티티(Task와 Link)를 다루기 위해 중복 코드를 제거하고 두 엔티티를 한 구성 객체에서 관리할 수 있습니다. 아래와 같이 각 엔티티 타입을 Firestore 컬렉션, API 경로, 상태 핸들러에 매핑하는 구성을 만들 수 있습니다:

~~~js
const entityConfig = {
    task: {
        collection: tasksCollection,
        path: "tasks",
        handlers: taskHandlers,
    },
    link: {
        collection: linksCollection,
        path: "links",
        handlers: linkHandlers,
    },
};
~~~

### 프로젝트 구조 개요

다음 구조는 최종적으로 얻어지는 프로젝트 구조의 개요를 보여줍니다:

~~~ 
src/
├── App.tsx                 # Entry point
├── App.css                 # Styles
├── components/
│   └── Gantt/
│       ├── Gantt.tsx       # Main logic
│       └── types.ts        # Type declarations
├── config/
│   └── firebase.ts         # Firebase setup
└── main.tsx                # React root
~~~

## 4단계: 초기 데이터 로드

컴포넌트가 마운트되면 아래와 같이 모든 작업과 링크를 로드합니다:

~~~js
useEffect(() => {
    let unsubscribeTasks: () => void;
    let unsubscribeLinks: () => void;

    (async () => {
        const tasksSnap = await getDocs(tasksQuery);
        const bulkTasks = tasksSnap.docs.map(processEntity) as Task[];
        const linksSnap = await getDocs(linksQuery);
        const bulkLinks = linksSnap.docs.map(processEntity) as Link[];

        setTasks(bulkTasks);
        setLinks(bulkLinks);

        const unsubscribers = watchRealtime();
        unsubscribeTasks = unsubscribers.unsubscribeTasks;
        unsubscribeLinks = unsubscribers.unsubscribeLinks;
    })();

    return () => {
        if (unsubscribeTasks) unsubscribeTasks();
        if (unsubscribeLinks) unsubscribeLinks();
    };
}, []);
~~~ 

Firebase 문서를 Gantt-호환 객체로 변환하려면 아래와 같이 제공된 `processEntity`를 사용합니다:

~~~js
const processEntity = (docSnapshot: QueryDocumentSnapshot): Task | Link => {
    return { ...docSnapshot.data(), id: docSnapshot.id };
};
~~~

## 5단계: 실시간 동기화 설정

Firebase의 `onSnapshot`을 사용해 두 컬렉션의 변경사항을 구독하고 컴포넌트가 언마운트될 때 구독을 해제합니다:
  
~~~js  
function watchRealtime() {
    let tasksLoaded = false;
    let linksLoaded = false;

    const unsubscribeTasks = onSnapshot(tasksQuery, (querySnapshot) => {
        if (!tasksLoaded) {
            tasksLoaded = true;
            return;
        }

        handleRealtimeUpdates(querySnapshot, "task");
    });

    const unsubscribeLinks = onSnapshot(linksQuery, (querySnapshot) => {
        if (!linksLoaded) {
            linksLoaded = true;
            return;
        }
        handleRealtimeUpdates(querySnapshot, "link");
    });

    return { unsubscribeTasks, unsubscribeLinks };
}
~~~

첫 번째 `onSnapshot` 호출은 초기 데이터를 반환하므로 변경사항이 아닙니다. 따라서 `watchRealtime`에서는 초기 데이터를 이미 로드했기 때문에 첫 호출은 무시합니다.

### 실시간 업데이트 처리

실시간 업데이트를 아래 코드 예제에 제시된 함수로 처리할 수 있습니다:

~~~js
function handleRealtimeUpdates(querySnapshot: QuerySnapshot, type: GanttEntityType) {
    const config = entityConfig[type];
    if (!config) throw new Error(`Unknown entity type: ${type}`);
    const { handlers } = config;
    querySnapshot.docChanges().forEach((change) => {
        if (change.doc.metadata.hasPendingWrites) return;
        const handler = handlers[change.type];
        if (!handler) {
            throw new Error(`Unknown change type: ${change.type}`);
      }
      const data = processEntity(change.doc);
      (handler as (data: Task | Link) => void)(data);
    });
}
~~~

이 방식은 서버에서 확인된 변경사항만 처리하므로 로컬 중복을 피할 수 있습니다.

`docChanges()`는 마지막 스냅샷 이후 Firestore 컬렉션에 대해 수행된 변경사항(추가됨, 수정됨, 제거됨)의 목록을 반환합니다. Firestore은 변경의 타입을 제공하며(`added`, `modified`, `removed`), 이를 해당 핸들러로 라우팅해 React 상태를 업데이트합니다.

## 6단계: Firebase를 이용한 CRUD 연산 구현

Gantt 컴포넌트의 생성, 업데이트, 삭제 요청을 처리하려면 아래에 제시된 `data.save` 메서드 로직을 사용합니다:

~~~js
const data = {
    save: async (
        entity: GanttEntityType, 
        action: GanttActionType, 
        raw: any, id: string | number
    ) => {
        try {
            const config = entityConfig[entity];
            if (!config) throw new Error(`Unknown entity type: ${entity}`);

            const { collection, path, handlers } = config;
            const ref = doc(db, path, id.toString());

            switch (action) {
                case "create": {
                    const addedDoc = await addDoc(collection, raw);
                    handlers.added({ ...raw, id: addedDoc.id });
                    break;
                }
                case "update": {
                    await updateDoc(ref, raw);
                    handlers.modified(raw);
                    break;
                }
                case "delete": {
                    await deleteDoc(ref);
                    handlers.removed(raw);
                    break;
                }
                default:
                    throw new Error(`Unknown action type: ${action}`);
            }
        } catch (err) {
            console.error(`Failed to ${action} ${entity}:`, err);
        }
    },
};
~~~

Firebase는 스냅샷 리스너를 통해 이 변경사항을 연결된 모든 클라이언트에 자동으로 전파합니다.

그런 다음 아래 코드로 Gantt 차트를 렌더링합니다:

~~~js
return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ReactGantt 
            tasks={tasks} 
            links={links} 
            templates={templates} 
            config={config} 
            data={data} 
        />
    </div>
);
~~~

`data` prop은 Gantt의 내장 편집 기능을 Firebase 저장 로직과 연결합니다.

## 7단계: Firebase에 프로젝트 배포

프로젝트가 완전히 작동하고 실시간 동기화가 정상적으로 작동하면 공개적으로 웹에 배포할 수 있습니다. 배포 방법은 Firebase CLI를 통한 방법과 Firebase 콘솔을 통한 방법 두 가지가 있습니다.

### Firebase CLI를 통한 배포(권장)

이 방법이 가장 효율적이며, 정기적으로 프로젝트를 업데이트할 계획이 있다면 특히 유용합니다. 아래 순서를 따르십시오:

1. 먼저 Firebase CLI가 설치되어 있지 않다면 아래 명령으로 설치합니다:

~~~
npm install -g firebase-tools
~~~ 

2. 그런 다음 아래 명령으로 Firebase에 로그인합니다:

~~~ 
firebase login
~~~ 

3. 이후 아래 명령으로 프로젝트에 Firebase를 초기화합니다:

~~~ 
firebase init
~~~ 

초기화 중 아래 단계 구성을 완료합니다:

- Hosting을 선택(구성하지 않은 경우 Firestore도 선택 가능)
- 빌드 폴더를 지정합니다(예: `dist` 또는 `build`, Vite 설정에 따라 다름)
- SPA(단일 페이지 앱)로 구성 여부를 묻는 질문에는 Yes를 선택하여 모든 경로가 `index.html`을 통해 처리되도록 합니다

4. 빌드된 프로덕션 파일을 생성합니다:

~~~ 
npm run build
~~~ 

생성된 파일은 `dist`(또는 `build`) 폴더에 생성됩니다.

5. Firebase에 배포합니다:

~~~ 
firebase deploy
~~~ 

배포가 완료되면 Firebase가 호스팅된 프로젝트의 링크를 제공합니다.

### Firebase 콘솔을 통한 빠른 배포

CLI를 사용하지 않고도 앱을 빠르게 게시하려면 Firebase 콘솔을 이용할 수 있습니다. 필요한 절차는 아래와 같습니다:

1. 아래 명령으로 프로젝트를 빌드합니다:

~~~ 
npm run build
~~~ 

2. Firebase Hosting → Your Project → Hosting으로 이동합니다.

3. "Get Started" 또는 "Upload"를 클릭합니다.

4. `dist`(또는 `build`) 폴더의 내용을 업로드합니다.

5. 업로드를 확인하면 Firebase가 사이트에 대한 공개 URL을 제공합니다.

## 결론

이 튜토리얼에서는 Firebase 동기화가 적용된 실시간 간트 차트를 구축했습니다. 다음을 배웠습니다:

- React Gantt를 Firebase Firestore에 연결하기
- Firestore에 대한 실시간 구독 설정하기
- 즉시 다중 클라이언트 동기화를 통해 생성, 업데이트, 삭제 이벤트를 처리하기

이 접근 방식은 모든 사용자가 페이지를 새로 고침하지 않고도 라이브 업데이트를 볼 수 있도록 하는 협업형 프로젝트 관리 도구에 적합합니다.