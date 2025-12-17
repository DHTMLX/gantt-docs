---
title: "dhtmlxReactGantt and Firebase Integration"
sidebar_label: "Firebase Schnellstart"
---

dhtmlxReactGantt and Firebase Integration
====================================

This tutorial describes how to build a [React Gantt](integrations/react.md) chart that synchronizes task and link data across multiple clients 
in real time using Firebase Firestore. This functionality is especially useful for:

- project management tools
- team collaboration apps
- scheduling platforms where multi-user synchronization is critical

You'll learn how to:

- set up Firebase for real-time updates
- initialize and render the Gantt chart
- handle CRUD operations (create, read, update, delete) with live synchronization
- efficiently process real-time changes in the Gantt state

You can check the corresponding example on GitHub: [DHTMLX React Gantt with Firebase Firestore Demo](https://github.com/DHTMLX/firebase-react-gantt-demo).

## Step 1: Project setup

Start by creating a React + Vite project. Install the required dependencies as follows:

~~~js
npm install @dhx/trial-react-gantt firebase
~~~

## Step 2: Configure Firebase

First, create a Firebase project by implementing the following steps:

- go to the Firebase Console
- click **Create a project**
- enter the project name (e.g., `react-gantt-firebase`) and follow the setup prompts

Then set up Firestore by completing the steps below:

- navigate to **Firestore Database** in your Firebase project dashboard 
- click **Create database**
- select your preferred location
- start in the **test mode** for ease during development (remember to configure the security rules before production)
- click **Create**

After that, register your web app in the following way:

- select **Project Overview** in the Firebase Console sidebar
- click the web app icon `</>` to register a new web app
- provide the app nickname (e.g., `react-gantt-firebase`)
- enable Firebase Hosting
- click **Register app**
- copy the generated Firebase configuration (you'll use it in your project)

Finally, configure Firebase in your project as described below:

- paste your Firebase configuration into the `.env` file in the following way:

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
 Replace the `YOUR_API_KEY` placeholder with your actual Firebase project credentials.
:::

- create a new file **firebase.ts** and initialize Firebase and Firestore. Also, export references to collections, as shown below:


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

## Step 3: Create the Gantt component

To begin with, set up the core Gantt component with [**React state** for tasks and links](integrations/react.md#bindingdata) with the following configuration: 

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

In the snippet above:

- **Templates**

Templates allow us to control how dates are parsed and formatted inside the Gantt component. 
Since Firestore stores dates as strings, we need to convert them back to `Date` objects ([parse_date](api/template/parse_date.md)) and correctly format them for storage ([format_date](api/template/format_date.md)).

- **Config**

The `auto_scheduling` option enables automatic recalculation of dependent tasks when a parent task is moved or changed.
This is useful for project management scenarios.

Now, create **state handlers** to manage the Gantt's internal state as in:

~~~js
const createStateHandlers = <T extends { id: string | number }>(
	setState: React.Dispatch<React.SetStateAction<T[]>>
): EntityHandler<T> => ({
	added: (item) => setState((prev) => (prev.find((i) => i.id === 
item.id) ? prev : [...prev, item])),
	modified: (item) => setState((prev) => prev.map((i) => (i.id === 
item.id ? { ...i, ...item } : i))),
	removed: (item) => setState((prev) => prev.filter((i) => i.id !== 
item.id)),
});

const taskHandlers = createStateHandlers<Task>(setTasks);
const linkHandlers = createStateHandlers<Link>(setLinks);
~~~

This provides a unified way to update local state when Firebase data changes.

Since, we are working with two types of entities - tasks and links, we can create a unified configuration
object to handle both instead of duplicating the code. 
This object maps each entity type to its Firestore collection, API path, and state handlers. Check the code snippet below:

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

### Project Structure Overview

You can check the overview of the resulting project structure in the following scheme:

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

## Step 4: Load initial data

When the component mounts, you should load all tasks and links like this:

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

To convert Firebase documents to Gantt-compatible objects, use `processEntity` as provided below:

~~~js
const processEntity = (docSnapshot: QueryDocumentSnapshot): Task | Link => {
	return { ...docSnapshot.data(), id: docSnapshot.id };
};
~~~

## Step 5: Set up real-time synchronization

Use Firebase's `onSnapshot` to subscribe to changes in both collections and unsubscribe when the component is unmounted:
  
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

The first `onSnapshot` call returns the initial data, not the changes, that's why in `watchRealtime` we ignore the first call (since we've already loaded the initial data).

### Processing real-time updates

You can process the real-time updates using the function specified in the following code sample:

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

This method ensures that only the server-confirmed changes are processed, avoiding local duplication.

`docChanges()` returns the list of changes (added, modified, removed) that have been made in the Firestore collection since the last snapshot. Firestore provides the type of change (`added`, `modified`, `removed`), and we route it to the 
corresponding handler to update the React state.

## Step 6: Implement CRUD operations with Firebase

To handle the create, update, and delete requests from the Gantt component, use the logic of the `data.save` method which is given below:

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

Firebase will automatically propagate these changes to all connected clients via the snapshot listeners.

Then, render the Gantt Chart with the following code:

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

The `data` prop connects Gantt's built-in editing to the Firebase save logic provided above.

## Step 7: Deploying the project to Firebase

Once your project is fully working and real-time synchronization is functioning correctly, you can deploy it to make it publicly accessible on the web. There are two ways to deploy the project you can choose from: via the Firebase CLI and via the Firebase console.

### Deployment via the Firebase CLI (Recommended)

This is the most efficient method, especially if you plan to update your project regularly. Follow the steps below:

1\. First, if you haven't installed the Firebase CLI yet, install it using the following command:

~~~
npm install -g firebase-tools
~~~ 

2\. Then, log in to Firebase by using the command given below:

~~~
firebase login
~~~

3\. After that, initialize Firebase in your project with the following command:

~~~
firebase init
~~~

During the initialization complete the steps provided below:

- select *Hosting* (you can also select Firestore, if you haven't configured it yet)
- specify the build folder (for example, `dist` or `build`, depending on your `vite.config.ts` or `package.json` setup)
- when asked about configuring as a Single Page App (SPA), choose *Yes* to ensure all routes are handled via `index.html`

4\. Now, build the project using this code line:

~~~
npm run build
~~~

It will generate the production-ready files in the `dist` (or `build`) folder.

5\. Finally, you can deploy to Firebase by running the following code line:

~~~
firebase deploy
~~~

After deployment has finished, Firebase will provide you with a link to your hosted project.

### Quick deployment via Firebase Console

If you prefer to quickly publish the app without using the CLI, you can do it directly through the Firebase Console.
These are the steps you need to complete:

1\. Build the project by running the code line below:

~~~
npm run build
~~~

2\. Go to Firebase Hosting → Your Project → Hosting

3\. Click "Get Started" or "Upload"

4\. Upload the contents of the `dist` (or `build`) folder

5\. Confirm the upload and Firebase will provide you with a public URL for your site

## Conclusion

In this tutorial we've built a real-time Gantt chart with Firebase synchronization. You've learned how to:

- connect React Gantt to Firebase Firestore
- set up real-time subscriptions to Firestore
- handle the create, update, and delete events with instant multi-client synchronization

This approach is perfect for collaborative project management tools, where all users need to see live updates without refreshing the page.

