---
title: "dhtmlxGantt mit Ruby on Rails"
sidebar_label: "Ruby on Rails"
---

# dhtmlxGantt mit Ruby on Rails

Dieser Artikel beschreibt die Erstellung eines Gantt-Diagramms mit einem [Ruby on Rails](https://rubyonrails.org/) Backend. Das Beispiel verwendet Ruby 2.4.1, Rails 5.1.3 und MySQL. Es wird vorausgesetzt, dass diese Voraussetzungen bereits installiert sind. Falls nicht, sollten Sie sich zunächst [die offiziellen Tutorials](https://guides.rubyonrails.org/index.html) ansehen.

Falls Sie mit einem anderen Technologie-Stack arbeiten, finden Sie weitere Integrationsmöglichkeiten hier:

- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)

Eine Demo ist ebenfalls auf GitHub verfügbar: [https://github.com/DHTMLX/gantt-howto-rails](https://github.com/DHTMLX/gantt-howto-rails).

## Schritt 1. Projekt erstellen

Um ein neues Projekt zu erstellen, führen Sie folgenden Befehl im Terminal aus:

~~~js
rails new gantt-app -d mysql
~~~

## Schritt 2. Gantt zur Seite hinzufügen

Erstellen Sie zunächst einen Controller und die Standardseite für die App. Navigieren Sie in Ihr Anwendungsverzeichnis und generieren Sie einen neuen Controller mit einer *index*-Aktion:

~~~js
cd gantt-app
rails generate controller gantt index
~~~

Sie sollten eine Bestätigung sehen, dass neue Dateien erstellt wurden.

### Eine Standardroute festlegen

Um das Routing einzurichten, öffnen Sie *config/routes.rb* und ändern Sie die Standardroute, sodass sie auf die "index"-Aktion des neuen Controllers zeigt:

**config/routes.rb**
~~~js
Rails.application.routes.draw do
  root :to => "gantt#index"
end
~~~

Testen Sie nun Ihren Server mit:

~~~js
rails server
~~~

Öffnen Sie anschließend *http://localhost:3000/* in Ihrem Browser. Sie sollten eine leere Seite wie diese sehen:

![how_to_start_rails_blank_page](/img/how_to_start_rails_blank_page.png)

Mit laufender App und vorbereiteter Standardseite können Sie nun das Gantt-Diagramm hinzufügen.

### Gantt in die View einfügen

Jetzt können Sie das Gantt-Diagramm auf der Seite einbetten.

Öffnen Sie die Layout-Datei und fügen Sie ein yield innerhalb des *head*-Tags ein. Dadurch können dhtmlxGantt-Dateien eingebunden werden:

**app/views/layouts/application.html.erb**
~~~html
<!DOCTYPE html>
<html>
<head>
  <title>dhtmlxGantt</title>
  (= stylesheet_link_tag 'application', media:'all','data-turbolinks-track' => true )
  (= javascript_include_tag 'application', 'data-turbolinks-track' => true )  
  (= yield(:head) ) /*!*/
  (= csrf_meta_tags )
</head>
<body>

    (= yield )

</body>
</html>
~~~

Öffnen Sie nun die *gantt/index* View und fügen Sie das Gantt-Diagramm hinzu:

**app/views/gantt/index.html.erb**
~~~js
( content_for :head do )
    (= stylesheet_link_tag 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css' )
    (= javascript_include_tag 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js' )
( end )

<div id="gantt_here" style='width:100%; height:800px;'></div>

<script>
    gantt.init("gantt_here");
</script>
~~~

Hier werden die dhtmlxGantt-Dateien vom [CDN](guides/cdn-links-list.md) geladen, anstatt lokal eingebunden zu werden. Für Entwicklungszwecke können Sie auch die lesbaren Quellcodedateien aus dem Download-Paket verwenden.

Öffnen Sie erneut *http://localhost:3000/* in Ihrem Browser. Sie sollten nun Folgendes sehen:

![how_to_start_rails_empty_gantt](/img/how_to_start_rails_empty_gantt.png)

Sie haben jetzt ein Gantt-Diagramm, in dem Aufgaben hinzugefügt und bearbeitet werden können. Die Speicherfunktionalität fehlt jedoch noch. Diese wird im nächsten Schritt durch die Erstellung von Modellen hinzugefügt.

## Schritt 3. Modelle erstellen

Da MySQL verwendet wird, stellen Sie sicher, dass Ihre Verbindungseinstellungen in *config/database.yml* korrekt sind, zum Beispiel:

**config/database.yml**
~~~js
development:
  adapter: mysql2
  encoding: utf8
  host: localhost
  database: gantt-app
  username: root
  password: 
~~~

Nun müssen Modelle für [tasks und links](guides/loading.md#standarddatabasestructure) erstellt werden.

Um das Task-Modell mit den entsprechenden Eigenschaften zu erstellen, führen Sie folgenden Befehl aus:

~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal
~~~

Erstellen Sie auf ähnliche Weise das Link-Modell mit folgendem Befehl:

~~~js
rails generate model Link 
    source:integer 
    target:integer 
    link_type:string:limit1
~~~

Beachten Sie, dass das dhtmlxGantt-Link-Objekt eine Eigenschaft namens <b>[type](guides/loading.md#standarddatabasestructure)</b> benötigt, um den Beziehungstyp (Start-zu-Start, Ende-zu-Ende, usw.) anzugeben.

Da der Name "<b>type</b>" in ActiveRecord reserviert ist, wird diese Eigenschaft hier als <b>link_type</b> benannt und die nötige Zuordnung später im Controller vorgenommen.

Eine vollständige Liste der Pflicht- und optionalen Eigenschaften finden Sie in der Dokumentation zum [Task-Objekt](guides/loading.md#task_properties) und [Link-Objekt](guides/loading.md#link_properties).

Führen Sie danach die Migration aus, um die Datenbank zu aktualisieren:

~~~js
rake db:migrate
~~~

Fügen Sie nun einige Testdaten hinzu:

1. Öffnen Sie die Rails-Konsole:

~~~js
rails c
~~~

2. Fügen Sie ein paar Aufgaben und Links hinzu:

~~~js
Task.create :text=>"Task 1", :start_date=>"2015-10-25",  :duration=>2, :progress=>0;
Task.create :text=>"Task 2", :start_date=>"2015-10-27",  :duration=>3, :progress=>0.5;
Link.create :source=>1, :target=>2, :link_type=>"0";
~~~

3. Geben Sie "exit" ein, um die Konsole zu verlassen.

Im nächsten Schritt wird das Laden und Speichern von Daten im Controller implementiert.

## Schritt 4. Daten laden

Mit den Modellen und der Migration können die Daten aus der Datenbank in das Gantt-Diagramm geladen werden.

Da dhtmlxGantt die Daten im [JSON-Format](guides/supported-data-formats.md) erwartet, fügen Sie dem *GanttController* eine neue Aktion hinzu, die die Daten liest, formatiert und ausgibt:


**app/controllers/gantt_controller.rb**
~~~js
class GanttController < ApplicationController
  def index
  end
 
  def data 
    tasks = Task.all
    links = Link.all
 
    render :json=>{
      :data => tasks.map{|task|{
        :id => task.id,
        :text => task.text,
        :start_date => task.start_date.to_formatted_s(:db),
        :duration => task.duration,
        :progress => task.progress,
        :parent => task.parent,
        :open => true
      }},
      :links => links.map{|link|{
        :id => link.id,
        :source => link.source,
        :target => link.target,
        :type => link.link_type
      }}
    }
  end
end
~~~

Fügen Sie für diese Aktion eine Route in *routes.rb* hinzu:

**config/routes.rb**
~~~js
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do/*!*/
    get "/data", :to => "gantt#data"/*!*/
  end/*!*/
end
~~~

Auf der Client-Seite rufen Sie diese Aktion mit der Methode [gantt.load](api/method/load.md) auf:

**app/views/gantt/index.html.erb**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/api/data");/*!*/
~~~

Die Konfiguration [date_format](api/config/date_format.md) legt das Datumsformat fest (z. B. das <b>start_date</b> einer Aufgabe), das vom Server empfangen wird und mit dem Datumsformat von Rails übereinstimmt.

Wenn Sie den Server starten und *http://localhost:3000/* öffnen, sollte das Gantt-Diagramm nun mit Aufgaben und Verknüpfungen aus der Datenbank gefüllt sein. Änderungen werden jedoch noch nicht gespeichert - das wird im nächsten Schritt behandelt.

## Schritt 5. Änderungen speichern

dhtmlxGantt kann alle Benutzeränderungen an ein RESTful API im Backend senden, wo sie in der Datenbank gespeichert werden können. Details zu diesem Protokoll finden Sie [hier](guides/server-side.md#technique).

Um das Speichern zu ermöglichen, aktivieren Sie zunächst das Senden von Änderungen auf der Client-Seite:

**app/views/gantt/index.html.erb**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/api/data");

var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Als Nächstes werden zwei Controller hinzugefügt: einer für Tasks und einer für Links, jeweils mit den notwendigen Aktionen.

### Task-Controller erstellen

Erzeugen Sie zunächst den Controller für Tasks:

~~~js
rails generate controller task --no-helper --no-assets --no-view-specs
~~~

Da dieser Controller keine Views benötigt, verhindern die *--no-* Optionen das Anlegen unnötiger Dateien.

Implementieren Sie die Aktionen zum Erstellen, Aktualisieren und Löschen wie folgt:

**app/controllers/task_controller.rb**
~~~js
class TaskController < ApplicationController
    protect_from_forgery
 
    def update
        task = Task.find(params["id"])
        task.text = params["text"]
        task.start_date = params["start_date"]
        task.duration = params["duration"]
        task.progress = params["progress"] || 0
        task.parent = params["parent"]
        task.save
 
        render :json => {:action => "updated"}
    end
 
    def add
        task = Task.create( 
            :text => params["text"], 
            :start_date=> params["start_date"], 
            :duration => params["duration"],
            :progress => params["progress"] || 0, 
            :parent => params["parent"]
        )
 
        render :json => {:action => "inserted", :tid => task.id}
    end
 
    def delete
        Task.find(params["id"]).destroy
        render :json => {:action => "deleted"}
    end
end
~~~

Einige Hinweise zu diesem Code:

- Die get-Aktion wird hier nicht benötigt, da alle Daten bereits über *gantt#data* geladen werden.
- Die Eigenschaft *progress* ist auf dem Client standardmäßig möglicherweise nicht initialisiert, daher wird hier ein Standardwert vergeben. Alternativ könnte dieser Standardwert auch in der Modellklasse festgelegt werden (z. B. über eine [Migration](https://api.rubyonrails.org/classes/ActiveRecord/Migration.html)).
- Beim Erstellen eines neuen Elements gibt die Aktion die Datenbank-ID des neu eingefügten Datensatzes an den Client zurück.

Fügen Sie abschließend Routen für diese Aktionen hinzu, damit Benutzer Aufgaben im Gantt-Diagramm anzeigen, erstellen, aktualisieren und löschen können:

**config/routes.rb**
~~~js
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do
    get "/data", :to => "gantt#data"
  
    post "/task", :to => "task#add"/*!*/
    put "/task/:id", :to => "task#update"/*!*/
    delete "/task/:id", :to => "task#delete"/*!*/
  end
end
~~~

Im nächsten Schritt wird eine ähnliche Funktionalität für Links eingerichtet.

### Erstellen des Link-Controllers

Erstellen Sie einen Link-Controller mit folgendem Befehl:

~~~js
rails generate controller link --no-helper --no-assets --no-view-specs
~~~

Hier ist ein Beispiel, wie die Implementierung aussehen könnte:

**app/controllers/link_controller.rb**
~~~js
class LinkController < ApplicationController
    protect_from_forgery
 
    def update
        link = Link.find(params["id"])
        link.source = params["source"]
        link.target = params["target"]
        link.link_type = params["type"]
        link.save
 
        render :json => {:action => "updated"}
    end
 
    def add
        link = Link.create( 
            :source => params["source"], 
            :target => params["target"], 
            :link_type => params["type"]
        )
 
        render :json => {:action => "inserted", :tid => link.id}
    end
 
    def delete
        Link.find(params["id"]).destroy
        render :json => {:action => "deleted"}
    end
end
~~~

Fügen Sie als Nächstes Routen für die neuen Aktionen hinzu:

**config/routes.rb**
~~~js
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do
    get "/data", :to => "gantt#data"
  
    post "/task", :to => "task#add"
    put "/task/:id", :to => "task#update"
    delete "/task/:id", :to => "task#delete"
  
    post "/link", :to => "link#add"/*!*/
    put "/link/:id", :to => "link#update"/*!*/
    delete "/link/:id", :to => "link#delete"/*!*/
  end
end
~~~

Das ist alles, was notwendig ist. Sobald die Anwendung läuft, verfügt sie über ein interaktives Gantt-Diagramm, das von Rails und MySQL unterstützt wird:

![how_to_start_rails_complete](/img/how_to_start_rails_complete.png)

Weitere Funktionen von dhtmlxGantt finden Sie in [unseren Anleitungen](guides.md).

## Speichern der Aufgabenreihenfolge {#storingtheorderoftasks}

Das Gantt-Diagramm auf der Client-Seite unterstützt das [Umsortieren von Aufgaben](guides/reordering-tasks.md) per Drag-and-drop. Wenn Sie diese Funktion nutzen, muss die Reihenfolge der Aufgaben in der Datenbank gespeichert werden.
Eine allgemeine Übersicht finden Sie [hier](guides/server-side.md#storingtheorderoftasks).

Fügen wir diese Funktionalität der App hinzu.

### Aufgaben-Umsortierung im Client aktivieren

Aktivieren Sie zunächst das Umsortieren der Aufgaben in der Benutzeroberfläche, indem Sie die Gantt-Konfiguration in der *Index*-Ansicht aktualisieren:

**app/views/gantt/index.html.erb**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Aktualisieren Sie nun das Backend, um diese Änderungen widerzuspiegeln. Wir müssen dem Modell ein Sortierfeld hinzufügen, das wir *sortorder* nennen. Die aktualisierte Modelldeklaration könnte folgendermaßen aussehen:

~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal  
    sortorder:integer  /*!*/
~~~

Alternativ können Sie diese neue Eigenschaft zu einem bestehenden Modell hinzufügen:

1. Erstellen Sie eine Migration:

~~~js
rails generate migration add_sortorder_to_tasks sortorder:integer
~~~

2. Bearbeiten Sie die generierte Migration, um einen Standardwert für die "sortorder"-Spalte festzulegen:

~~~js
class AddSortorderToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :sortorder, :integer, :default=>0
  end
end
~~~

Führen Sie dann die Migration aus:

~~~js
rake db:migrate
~~~

Aktualisieren Sie als Nächstes die CRUD-Operationen in den Controllern:

- Die *data*-Aktion sollte Aufgaben nach der `sortorder`-Spalte sortiert zurückgeben:

**app/controllers/gantt_controller.rb**
~~~js
class GanttController < ApplicationController
  def index
  end
 
  def data 
    tasks = Task.all
    links = Link.all
 
    render :json=>{
      :data => tasks.order(:sortorder).map{|task|{ /*!*/
        :id => task.id,
        :text => task.text,
        :start_date => task.start_date.to_formatted_s(:db),
        :duration => task.duration,
        :progress => task.progress,
        :parent => task.parent,
        :open => true
      }},
      :links => links.map{|link|{
        :id => link.id,
        :source => link.source,
        :target => link.target,
        :type => link.link_type
      }}
    }
  end
end
~~~

- Beim Hinzufügen neuer Aufgaben wird ein initialer `sortorder`-Wert vergeben:

**app/controllers/task_controller.rb**
~~~js
class TaskController < ApplicationController
    ...
    def add
    
        maxOrder = Task.maximum("sortorder") || 0/*!*/
        
        task = Task.create( 
            :text => params["text"], 
            :start_date=> params["start_date"], 
            :duration => params["duration"],
            :progress => params["progress"] || 0, 
            :parent => params["parent"],
            :sortorder => maxOrder + 1/*!*/
        )
 
        render :json => {:action => "inserted", :tid => task.id}
    end

end
~~~

- Wenn Aufgaben vom Benutzer umsortiert werden, passen Sie deren Reihenfolge entsprechend an:

**app/controllers/task_controller.rb**
~~~js
class TaskController < ApplicationController
    protect_from_forgery
 
    def update
        task = Task.find(params["id"])
        task.text = params["text"]
        task.start_date = params["start_date"]
        task.duration = params["duration"]
        task.progress = params["progress"] || 0
        task.parent = params["parent"]
        task.save
 
        if(params['target'])/*!*/
            Task.updateOrder(task.id, params['target'])/*!*/
        end/*!*/

        render :json => {:action => "updated"}
    end
 
    ...
end
~~~

Hier ist die Implementierung von Task.updateOrder:

**app/models/task.rb**
~~~js
class Task < ApplicationRecord
    def self.updateOrder(taskId, target)
        nextTask = false
        targetId = target

        if(target.start_with?('next:'))
            targetId = target['next:'.length, target.length]
            nextTask = true;
        end

        if(targetId == 'null')
            return
        end

        targetTask = self.find(targetId)
        
        targetOrder = targetTask.sortorder

        if(nextTask)
            targetOrder += 1
        end
        
        self.where("sortorder >= ?", targetOrder).
            update_all('sortorder = sortorder + 1')
        
        task = self.find(taskId)
        task.sortorder = targetOrder
        task.save
    end
end
~~~

## Applikationssicherheit

Gantt selbst bietet keinen Schutz gegen gängige Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffe. Es ist wichtig, dass Entwickler selbst für die Absicherung ihrer Backend-Implementierungen sorgen. Weitere Details finden Sie [in diesem Artikel](guides/app-security.md).

## Fehlerbehebung

Wenn Sie die Schritte zur Integration von Gantt mit Ruby on Rails befolgt haben, aber Aufgaben und Links nicht auf der Seite angezeigt werden, sehen Sie sich den Leitfaden zur Fehlerbehebung unter [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) an. Dort finden Sie Tipps zur Diagnose häufiger Probleme.

## Wie geht es weiter?

Mit Ihrem nun voll funktionsfähigen Gantt-Diagramm können Sie den vollständigen Code auf [GitHub](https://github.com/DHTMLX/gantt-howto-rails) einsehen. Dort steht er zum Klonen oder Herunterladen für eigene Projekte bereit.

Entdecken Sie außerdem [Anleitungen zu verschiedenen Gantt-Funktionen](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md).

