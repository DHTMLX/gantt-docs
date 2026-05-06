---
title: "Schnellinfo (Berührung-Unterstützung)"
sidebar_label: "Schnellinfo (Berührung-Unterstützung)"
---

# Schnellinfo (Berührung-Unterstützung)

Die Bibliothek enthält die **Quick Info**-Erweiterung, die das Anzeigen eines Pop-up mit Details zur Aufgabe ermöglicht, wenn ein Benutzer die Aufgabe auf dem Bildschirm berührt. 

![quick_info](/img/quick_info.png)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


Um die Erweiterung zu verwenden, aktivieren Sie das ["Quick Info"](guides/extensions-list.md#quick-info)-Plugin über die [gantt.plugins](api/method/plugins.md)-Methode.

~~~js
gantt.plugins({
    quick_info: true
});
~~~

Um die **quick_info**-Erweiterung zu deaktivieren, setzen Sie die [show_quick_info](api/config/show_quick_info.md)-Eigenschaft auf *false*:

~~~js
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

## API-Übersicht

Die Quick Info-Erweiterung bietet eine API-Malette, die es Ihnen ermöglicht, die Einstellungen von Quick Info zu manipulieren, ihr Verhalten zu steuern oder das Erscheinungsbild eines Pop-ups zu ändern. 

Sie können entweder [die API des Objekts gantt.ext.quickInfo](guides/quick-info.md #quickinfoobject) verwenden oder die öffentliche API von dhtmlxGantt, die unten aufgeführt ist:

**Methoden**

- [showQuickInfo](api/method/showquickinfo.md) - zeigt das Pop-up-Formular für die angegebene Aufgabe an
- [hideQuickInfo](api/method/hidequickinfo.md) - blend das Pop-up-Formular aus (falls es aktuell aktiv ist)

**Ereignisse**

- [onQuickInfo](api/event/onquickinfo.md) - wird ausgelöst, wenn das Pop-up-Bearbeitungsformular erscheint
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - wird ausgelöst, nachdem das Pop-up-Bearbeitungsformular geschlossen wurde

**Eigenschaften**

- [quick_info_detached](api/config/quick_info_detached.md) - definiert, ob das Aufgabenformular links/rechts vom Bildschirm erscheint oder in der Nähe der ausgewählten Aufgabe
- [quickinfo_buttons](api/config/quickinfo_buttons.md) - speichert eine Sammlung von Buttons, die im Pop-up-Detailsformular platziert sind

**Vorlagen**

- [quick_info_class](api/template/quick_info_class.md) - gibt die CSS-Klasse an, die dem Pop-up-Bearbeitungsformular zugewiesen wird
- [quick_info_content](api/template/quick_info_content.md) - gibt den Inhalt des Pop-up-Bearbeitungsformulars an
- [quick_info_date](api/template/quick_info_date.md) - gibt das Datum des Pop-up-Bearbeitungsformulars an
- [quick_info_title](api/template/quick_info_title.md) - gibt den Titel des Pop-up-Bearbeitungsformulars an

## QuickInfo-Objekt {#quickinfoobject}

Das Standardverhalten der **Quick Info**-Erweiterung setzt voraus, dass das Pop-up automatisch über einer ausgewählten Aufgabe erscheint.

Seit Version v7.0 wird die Funktionalität von Quick Info erweitert; das [gantt.ext.quickInfo](guides/quickinfo-ext.md)-Objekt, das Methoden zur manuellen Steuerung des Popups bereitstellt, wird hinzugefügt. 

Die über das **gantt.ext.quickInfo**-Objekt verfügbaren Methoden sind:

- **show()** - zeigt das QuickInfo-Pop-up für eine angegebene Aufgabe an. Es hat einen Parameter:
    - **id** - (*string|number*) die ID einer Aufgabe/Verknüpfung/Ressource
- **show()**  - zeigt das QuickInfo-Pop-up an einer bestimmten Position an. Die Parameter sind:
    - **top** - (*number*) die X-Koordinate
    - **left** - (*number*) die Y-Koordinate
- **hide()** - blend das QuickInfo-Pop-up aus. Die Methode kann einen optionalen Parameter haben:
    - **[ force ]** - (*boolean*) gibt an, ob das QuickInfo sofort verschwindet, wenn [gantt.config.quick_info_detached](api/config/quick_info_detached.md) auf *false* gesetzt ist. Wird *true* als Parameter der **hide**-Methode übergeben, wird das Pop-up sofort entfernt, andernfalls verschwindet es nach einer kurzen Animation.
- **setContainer()** - legt einen Container fest, in dem QuickInfo angezeigt wird. 
    - **container** - (*string|HTMLElement*) ein QuickInfo-Container. Wenn kein benutzerdefinierter Container angegeben ist, wird QuickInfo in dem ersten der gefundenen Knoten platziert: **gantt.$task, gantt.$grid, gantt.$layout**
- **getNode()** - gibt das HTMLElement des QuickInfo-Popups zurück. Gibt *null* zurück, wenn QuickInfo nicht initialisiert ist
- **setContent(config)** - (*object*) setzt den Inhalt von QuickInfo. Es nimmt ein Konfigurationsobjekt von QuickInfo als Parameter. 

Das *Konfigurationsobjekt* hat folgende Struktur:
    - **taskId** - (*string|number*) optional, die ID der Aufgabe, an die die Aktionsbuttons des QuickInfo gebunden werden
    - **header** - optional, der Header des Pop-up-Bearbeitungsformulars, der Folgendes enthalten kann:
        - **title** - (*string*) optional, der Titel des Pop-up-Bearbeitungsformulars
        - **date** - (*string*) optional, das Datum des Pop-up-Bearbeitungsformulars
    - **content** - (*string*) optional, der Inhalt des Pop-up-Bearbeitungsformulars
    - **buttons** - (*string[]*) optional, Buttons, die im Pop-up-Bearbeitungsformular platziert werden


Wenn weder Header noch Buttons angegeben sind, werden die entsprechenden Bereiche des QuickInfo-Popups ausgeblendet.

#### **Schnellinfo anzeigen**

Sie können das Pop-up für eine angegebene Aufgabe, Verknüpfung, Ressourcen-Panel anzeigen oder eine andere Position auf dem Bildschirm definieren, an der das Pop-up angezeigt wird, über die Methode **gantt.ext.quickInfo.show()**:

~~~js
// show the popup for the specified task
var task = gantt.getTask(10);
gantt.ext.quickInfo.show(task.id);

// show the popup at specific coordinates
gantt.ext.quickInfo.show(100, 200);
~~~

Ein Beispiel dafür, wie das Pop-up für eine Ressource angezeigt wird, finden Sie unten:

~~~js
const quickInfo = gantt.ext.quickInfo;
gantt.attachEvent("onGanttReady", function(){
    quickInfo.setContainer(document.body);
})

gantt.attachEvent("onEmptyClick", function (e) {
  const domHelpers = gantt.utils.dom;
  const resourceElement = domHelpers.closest(e.target, "[data-resource-id]");
  if(resourceElement){
    const resourceId = resourceElement.getAttribute("data-resource-id");
    const resource = gantt.$resourcesStore.getItem(resourceId);
    const position = resourceElement.getBoundingClientRect();
    quickInfo.show(position.right, position.top);

    const assignedTasks = gantt.getResourceAssignments(resourceId).map(function(assign){
        return gantt.getTask(assign.task_id).text;
    });

    quickInfo.setContent({
        header: {
        title: resource.text,
        date: ""
    },
        content: "Assigned tasks: " + assignedTasks.join(", "),
        buttons: []
    });
  }
});
~~~

Und hier ein Beispiel, das das Pop-up für einen bestimmten Link zeigt:

~~~js
const quickInfo = gantt.ext.quickInfo;
gantt.attachEvent("onLinkClick", function(id,e){
    //any custom logic here
    const link = gantt.getLink(id);
    const linksFormatter = gantt.ext.formatters.linkFormatter();

    const domHelpers = gantt.utils.dom;
    const position = domHelpers.getRelativeEventPosition(e, gantt.$task_data);

    const sourceTask = gantt.getTask(link.source);
    const targetTask = gantt.getTask(link.target);
    quickInfo.show(position.x, position.y);

    let linkDescr = "";

    if (link.type === gantt.config.links.start_to_start){
        linkDescr = "Start to start";
    } else if (link.type === gantt.config.links.start_to_finish){
        linkDescr = "Start to finish";
    } else if (link.type === gantt.config.links.finish_to_finish){
        linkDescr = "Finish to Finish";
    } else {
        linkDescr = "Finish to start";
    }

    quickInfo.setContent({
        header: {
            title: `${linkDescr} link`,
            date: ""
        },
        content: `Source: ${sourceTask.text}


                    Target: ${targetTask.text}`,
        buttons: []
    });
});
~~~

#### **Schnellinfo ausblenden**

Um ein Pop-up-Bearbeitungsformular auszublenden, verwenden Sie die Methode **gantt.ext.quickInfo.hide()**. Die Methode hängt von der Konfiguration **gantt.config.quick_info_detached** ab und sieht zwei mögliche Optionen vor:

- wird ohne Parameter aufgerufen, wird das Pop-up-Bearbeitungsformular nach einer kurzen Animation vom Bildschirm ausgeblendet 

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// hide the popup after a short animation
gantt.ext.quickInfo.hide();
~~~

- wenn Sie die Quick Info sofort ausblenden möchten, übergeben Sie *true* als Parameter an die **hide**-Methode:

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// hide the popup immediately
gantt.ext.quickInfo.hide(true);
~~~

Beachten Sie, dass, wenn die **gantt.config.quick_info_detached**-Konfiguration auf *true* gesetzt ist, die Methode das Pop-up immer sofort ausblendet.

#### **Erstellung eines benutzerdefinierten QuickInfo**

Standardmäßig enthält ein Quick Info-Popup einen Titel, ein Datum, Inhalt, Buttons und sieht so aus:

![quick_default](/img/quick_default.png)

Falls Sie das Erscheinungsbild des Pop-up-Bearbeitungsformulars ändern oder ein benutzerdefiniertes erstellen möchten, können Sie den gewünschten HTML-Inhalt über die **gantt.ext.quickInfo.setContent()**-Methode definieren:

~~~js
gantt.locale.labels.custom_button = "My button"
gantt.ext.quickInfo.setContent({
    header:{
        title: "My custom header",
        date: "18th of February, 2020"
    },
    content: "some content here",
    buttons: ["custom_button"]
})
~~~

Als Ergebnis erscheint auf der Seite folgendes QuickInfo-Popup:

![quick_custom](/img/quick_custom.png)


#### **Benutzerdefinierte Buttons mit benutzerdefiniertem Verhalten hinzufügen**

Das [$click](api/other/click.md) Objekt ermöglicht es Ihnen, benutzerdefiniertes Verhalten für benutzerdefinierte Buttons zu definieren, die im Pop-up-Bearbeitungsformular platziert sind:

~~~js
gantt.config.quickinfo_buttons="[""icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");
 
gantt.$click.buttons.advanced_details_button="function(id){"
    gantt.message("These are advanced details");
    return false; //blocks the default behavior
};
~~~

#### **Festlegen eines Containers für QuickInfo** 

Sie können die Methode **gantt.ext.quickInfo.setContainer()** verwenden, um das QuickInfo-Popup in einem benutzerdefinierten Container anzuzeigen:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.setContainer(document.body); /*!*/
gantt.ext.quickInfo.show(1300,100);
gantt.locale.labels.custom_button = "My button"
gantt.ext.quickInfo.setContent({
    header:{
        title: "My custom header",
        date: "18th of February, 2020"
    },
    content: "some content here",
    buttons: ["custom_button"]
});
~~~

Jetzt wird das Pop-up mit benutzerdefiniertem Inhalt außerhalb des Containers von Gantt in **document.body** gerendert:

![quick_container](/img/quick_container.png)