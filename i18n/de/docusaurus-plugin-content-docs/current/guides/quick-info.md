---
title: "Quick Info (Touch-Unterstützung)"
sidebar_label: "Quick Info (Touch-Unterstützung)"
---

# Quick Info (Touch-Unterstützung)


Die Bibliothek enthält die **Quick Info**-Erweiterung, die ein Popup mit Aufgabendetails anzeigt, wenn ein Benutzer auf eine Aufgabe auf dem Bildschirm tippt.

![quick_info](/img/quick_info.png)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


Um mit der Erweiterung zu starten, aktivieren Sie einfach das ["Quick Info"](guides/extensions-list.md#quickinfo) Plugin mit der [gantt.plugins](api/method/plugins.md) Methode.

~~~js
gantt.plugins({
    quick_info: true
});
~~~

Wenn Sie die **quick_info**-Erweiterung deaktivieren möchten, setzen Sie die Eigenschaft [show_quick_info](api/config/show_quick_info.md) auf *false*:

~~~js
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

## API-Übersicht


Die Quick Info-Erweiterung bietet eine Reihe von APIs, um ihre Einstellungen anzupassen, ihr Verhalten zu steuern oder das Aussehen des Popups zu individualisieren. 


Sie können entweder [die API des gantt.ext.quickInfo Objekts](guides/quick-info.md#quickinfoobject) oder die unten aufgeführte öffentliche dhtmlxGantt API verwenden:

**Methoden**

- [showQuickInfo](api/method/showquickinfo.md) - öffnet das Pop-up-Formular für eine bestimmte Aufgabe
- [hideQuickInfo](api/method/hidequickinfo.md) - schließt das Pop-up-Formular (falls es geöffnet ist)

**Events**

- [onQuickInfo](api/event/onquickinfo.md) - wird ausgelöst, wenn das Pop-up-Bearbeitungsformular erscheint
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - wird ausgelöst, nachdem das Pop-up-Bearbeitungsformular geschlossen wurde

**Eigenschaften**

- [quick_info_detached](api/config/quick_info_detached.md) - steuert, ob das Aufgabenformular in der Nähe der ausgewählten Aufgabe oder an der linken/rechten Seite des Bildschirms erscheint
- [quickinfo_buttons](api/config/quickinfo_buttons.md) - enthält die Sammlung von Buttons im Pop-up-Formular mit Aufgabendetails

**Templates**

- [quick_info_class](api/template/quick_info_class.md) - definiert die CSS-Klasse, die auf das Pop-up-Bearbeitungsformular angewendet wird
- [quick_info_content](api/template/quick_info_content.md) - definiert den Inhalt im Pop-up-Bearbeitungsformular
- [quick_info_date](api/template/quick_info_date.md) - definiert das Datum im Pop-up-Bearbeitungsformular
- [quick_info_title](api/template/quick_info_title.md) - definiert den Titel des Pop-up-Bearbeitungsformulars

## QuickInfo-Objekt {#quickinfoobject}

Standardmäßig zeigt die **Quick Info**-Erweiterung automatisch ein Popup über der ausgewählten Aufgabe an.

Ab Version 7.0 wurde die Quick Info-Funktionalität mit dem [gantt.ext.quickInfo](guides/quickinfo-ext.md) Objekt erweitert, das Methoden zur manuellen Steuerung des Popups bereitstellt.

Das **gantt.ext.quickInfo** Objekt bietet folgende Methoden:

- **show()** - öffnet das Quick Info-Popup für eine bestimmte Aufgabe. Akzeptiert einen Parameter:
    - **id** - (*string|number*) die ID einer Aufgabe/Verknüpfung/Ressource
- **show()** - öffnet das Quick Info-Popup an bestimmten Koordinaten. Parameter:
    - **top** - (*number*) die X-Koordinate
    - **left** - (*number*) die Y-Koordinate
- **hide()** - schließt das Quick Info-Popup. Akzeptiert einen optionalen Parameter:
    - **[ force ]** - (*boolean*) bestimmt, ob das Popup sofort geschlossen wird, wenn [gantt.config.quick_info_detached](api/config/quick_info_detached.md) *false* ist. Wenn *true* übergeben wird, wird das Popup sofort entfernt, andernfalls verschwindet es mit einer kurzen Animation.
- **setContainer()** - legt den Container fest, in dem das Quick Info angezeigt wird.
    - **container** - (*string|HTMLElement*) der QuickInfo-Container. Falls keiner angegeben ist, wird QuickInfo in den ersten gefundenen Node unter **gantt.$task, gantt.$grid, gantt.$layout** eingefügt
- **getNode()** - gibt das HTMLElement des Quick Info-Popups zurück oder *null*, falls es nicht initialisiert ist
- **setContent(config)** - (*object*) befüllt das Quick Info mit Inhalt. Akzeptiert ein Konfigurationsobjekt mit folgender Struktur:
    - **taskId** - (*string|number*) optional, verknüpft die Aktionsbuttons mit einer bestimmten Aufgabe
    - **header** - optional, der Popup-Kopfbereich, der enthalten kann:
        - **title** - (*string*) optional, der Popup-Titel
        - **date** - (*string*) optional, das Popup-Datum
    - **content** - (*string*) optional, der Popup-Inhalt
    - **buttons** - (*string[]*) optional, Buttons, die im Popup angezeigt werden


Wenn weder header noch buttons angegeben werden, werden diese Bereiche im Popup ausgeblendet.

####**Quick Info anzeigen**

Das Popup kann für eine bestimmte Aufgabe, Verknüpfung, Ressourcenpanel oder an einer benutzerdefinierten Position auf dem Bildschirm mit der **gantt.ext.quickInfo.show()** Methode angezeigt werden:

~~~js
// Popup für eine bestimmte Aufgabe anzeigen
var task = gantt.getTask(10);
gantt.ext.quickInfo.show(task.id);

// Popup an bestimmten Koordinaten anzeigen
gantt.ext.quickInfo.show(100, 200);
~~~

Hier ein Beispiel, wie das Popup für eine Ressource angezeigt wird:

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

Und so zeigen Sie das Popup für eine bestimmte Verknüpfung an:

~~~js
const quickInfo = gantt.ext.quickInfo;
gantt.attachEvent("onLinkClick", function(id,e){
    // individuelle Logik hier
    const link = gantt.getLink(id);
    const linksFormatter = gantt.ext.formatters.linkFormatter();

    const domHelpers = gantt.utils.dom;
    const position = domHelpers.getRelativeEventPosition(e, gantt.$task_data);

    const sourceTask = gantt.getTask(link.source);
    const targetTask = gantt.getTask(link.target);
    quickInfo.show(position.x, position.y);

    let linkDescr = "";

    if (link.type === gantt.config.links.start_to_start){
        linkDescr = "Start zu Start";
    } else if (link.type === gantt.config.links.start_to_finish){
        linkDescr = "Start zu Ende";
    } else if (link.type === gantt.config.links.finish_to_finish){
        linkDescr = "Ende zu Ende";
    } else {
        linkDescr = "Ende zu Start";
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

####**Quick Info ausblenden**

Um das Popup zu schließen, verwenden Sie die **gantt.ext.quickInfo.hide()** Methode. Das Verhalten hängt von der Einstellung **gantt.config.quick_info_detached** ab, mit zwei Möglichkeiten:

- Ohne Parameter aufgerufen, wird das Popup nach einer kurzen Animation geschlossen

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// Popup mit Animation ausblenden
gantt.ext.quickInfo.hide();
~~~

- Um das Popup sofort zu schließen, übergeben Sie *true* als Argument:

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// Popup sofort ausblenden
gantt.ext.quickInfo.hide(true);
~~~

Beachten Sie, dass wenn **gantt.config.quick_info_detached** auf *true* gesetzt ist, das Popup immer sofort geschlossen wird.

####**Eigenes QuickInfo erstellen**

Standardmäßig enthält das Quick Info-Popup einen Titel, ein Datum, Inhalt und Buttons und sieht so aus:

![quick_default](/img/quick_default.png)

Wenn Sie das Aussehen des Popups anpassen oder Ihr eigenes erstellen möchten, können Sie den HTML-Inhalt mit **gantt.ext.quickInfo.setContent()** definieren:

~~~js
gantt.locale.labels.custom_button = "Mein Button"
gantt.ext.quickInfo.setContent({
    header:{
        title: "Mein benutzerdefinierter Header",
        date: "18. Februar 2020"
    },
    content: "Hier steht ein Inhalt",
    buttons: ["custom_button"]
})
~~~

Dies erzeugt ein Quick Info-Popup wie dieses:

![quick_custom](/img/quick_custom.png)


####**Eigene Buttons mit individuellem Verhalten hinzufügen**

Mit dem [$click](api/other/click.md) Objekt können Sie benutzerdefinierte Aktionen für Buttons im Popup hinzufügen:

~~~js
gantt.config.quickinfo_buttons="[""icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Erweiterte Infos";
gantt.init("gantt_here");
 
gantt.$click.buttons.advanced_details_button="function(id){"
    gantt.message("Dies sind erweiterte Informationen");
    return false; // blockiert das Standardverhalten
};
~~~

####**Einen Container für QuickInfo festlegen** 

Verwenden Sie **gantt.ext.quickInfo.setContainer()**, um das Quick Info-Popup in einem benutzerdefinierten Container anzuzeigen:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.setContainer(document.body); /*!*/
gantt.ext.quickInfo.show(1300,100);
gantt.locale.labels.custom_button = "Mein Button"
gantt.ext.quickInfo.setContent({
    header:{
        title: "Mein benutzerdefinierter Header",
        date: "18. Februar 2020"
    },
    content: "Hier steht ein Inhalt",
    buttons: ["custom_button"]
});
~~~

Jetzt erscheint das Popup mit benutzerdefiniertem Inhalt im **document.body**, außerhalb des Gantt-Containers:

![quick_container](/img/quick_container.png)

