--- 
title: "dhtmlxGantt mit Ruby on Rails"
sidebar_label: "Ruby on Rails"
---

# dhtmlxGantt mit Ruby on Rails 

In diesem Artikel lernst du, wie man ein Gantt-Diagramm mit einem [Ruby on Rails](https://rubyonrails.org/) Backend erstellt.
Für die Implementierung dieser App verwenden wir Ruby 2.4.1, Rails 5.1.3 und MySQL. Diese Anleitung setzt voraus, dass alle Voraussetzungen bereits installiert sind.
Andernfalls besuchen Sie bitte zuerst die [offiziellen Tutorials](https://guides.rubyonrails.org/index.html).

Falls du eine andere Technologie verwendest, findest du unten die Liste der verfügbaren Integrationsvarianten:

- [dhtmlxGantt mit ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt mit Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt mit PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt mit PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt mit Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)

Werfen Sie einen Blick auf die [Demo](https://github.com/DHTMLX/gantt-howto-rails) auf GitHub.

## Schritt 1. Ein Projekt erstellen

Um ein neues Projekt hinzuzufügen, führe im Terminal einfach den folgenden Befehl aus:

~~~js
rails new gantt-app -d mysql
~~~

## Schritt 2. Gantt zur Seite hinzufügen

Lass uns zunächst mit der Erstellung eines Controllers und einer Standardseite für unsere Anwendung beginnen.
Wechsel in das Anwendungsverzeichnis und generiere einen neuen Controller mit der *index*-Aktion:

~~~js
cd gantt-app
rails generate controller gantt index
~~~

Die Ausgabe sollte bestätigen, dass neue Dateien erstellt wurden.

### Festlegen einer Standardroute

Zur Konfiguration der Routen öffne die Datei *config/routes.rb*. Ändere die Standardroute auf die "index"-Aktion unseres neuen Controllers:

~~~js title="config/routes.rb"
Rails.application.routes.draw do
  root :to => "gantt#index"
end
~~~

Daraufhin können wir unseren Server testen, indem wir ihn in der Befehlszeile starten: 

~~~js
rails server
~~~

Öffne *http://localhost:3000/* in deinem Browser. Das Ergebnis sollte wie folgt aussehen:

![how_to_start_rails_blank_page](/img/how_to_start_rails_blank_page.png)

Also läuft die App und wir haben unsere Standardseite. Nun können wir fortfahren und ein Gantt-Diagramm hinzufügen.

### Gantt zur Ansicht hinzufügen

Nun sind wir bereit, ein Gantt-Diagramm zu unserer Seite hinzuzufügen. 

Öffne die Layout-Datei und füge einen Yield in das *head*-Tag ein. Wir verwenden ihn, um dhtmlxgantt-Dateien in die Seite einzubinden:

~~~html title="app/views/layouts/application.html.erb"
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

Danach wechseln Sie zur *gantt/index*-View und fügen dort ein Gantt-Diagramm hinzu:

~~~js title="app/views/gantt/index.html.erb"
( content_for :head do )
    (= stylesheet_link_tag 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css' )
    (= javascript_include_tag 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js' )
( end )

<div id="gantt_here" style='width:100%; height:800px;'></div>

<script>
    gantt.init("gantt_here");
</script>
~~~

Beachte, dass wir die dhtmlx Gantt-Dateien vom [CDN] anstelle von lokal hinzugefügt haben. Für die Entwicklung möchtest du eine lesbare Version des Quellcodes verwenden, die dem Downloadpaket beiliegt.

Danach können wir uns das aktuelle Ergebnis ansehen. Öffne *http://localhost:3000/* (den Rails-Server) in deinem Browser.
Du solltest das folgende Ergebnis sehen:

![how_to_start_rails_empty_gantt](/img/how_to_start_rails_empty_gantt.png)

Damit hast du ein Gantt-Diagramm, in dem du Aufgaben hinzufügen und ändern kannst. Es fehlt jedoch noch an der Speichermöglichkeit.
Um das bereitzustellen, müssen wir mit der Erstellung von Modellen fortfahren.

## Schritt 3. Modelle erstellen

Da wir MySQL verwenden, stelle sicher, dass du die richtigen Verbindungsparameter in *config/database.yml* konfiguriert hast, zum Beispiel:

~~~js title="config/database.yml"
development:
  adapter: mysql2
  encoding: utf8
  host: localhost
  database: gantt-app
  username: root
  password: 
~~~

Jetzt müssen wir Modelle für [Tasks und Links](guides/loading.md#databasestructure) erstellen.

Um ein Modell für Tasks zu erstellen, müssen wir einen Befehl ausführen, der die Eigenschaften der Aufgabe enthält:

~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal
~~~

Ein ähnlicher, aber kürzerer Befehl wird verwendet, um ein Modell für Links zu erstellen:

~~~js
rails generate model Link 
    source:integer 
    target:integer 
    link_type:string:limit1
~~~

Beachte, dass das dhtmlxgantt-Linkobjekt eine Eigenschaft mit dem Namen <b>[type](guides/loading.md#databasestructure)</b> haben muss, die den Typ der Beziehung speichert (start-to-start, finish-to-finish, etc.).

Wir können eine solche Eigenschaft nicht zu unserem Modell hinzufügen, da der Name "<b>type</b>" bereits von ActiveRecord reserviert ist.
Als Workaround nennen wir diese Eigenschaft <b>link_type</b> und führen die erforderliche Zuordnung im Controller durch.

Du kannst dir die vollständige Liste der Eigenschaften, sowohl Pflicht- als auch optionale, ansehen, die für das [Task object](guides/loading.md#task_properties) und [Link object](guides/loading.md#link_properties) verfügbar sind.

Nach dem das erledigt ist, müssen wir eine Migration ausführen, um unsere Datenbank zu aktualisieren:

~~~js
rake db:migrate
~~~

Lass uns hier noch etwas Testdaten hinzufügen:

1. Öffne die Rails-Konsole durch Ausführung von:

~~~js
rails c
~~~

2. Füge ein paar Aufgaben und Links wie folgt hinzu:

~~~js
Task.create :text=>"Task 1", :start_date=>"2015-10-25",  :duration=>2, :progress=>0;
Task.create :text=>"Task 2", :start_date=>"2015-10-27",  :duration=>3, :progress=>0.5;
Link.create :source=>1, :target=>2, :link_type=>"0";
~~~

3. Gib "exit" ein, um die Konsole zu schließen.

Als Nächstes müssen wir das Laden und Speichern von Daten im Diagramm mithilfe von Controllern implementieren.

## Schritt 4. Laden von Daten

Nachdem wir Modelklassen erstellt und die Migration durchgeführt haben, können wir die Daten aus der Datenbank in unseren Gantt laden.

dhtmlxGantt erwartet Daten im [JSON-Format](guides/supported-data-formats.md). Zunächst fügen wir daher eine neue Aktion zu unserem *GanttController* hinzu, in der wir die Gantt-Daten lesen, formatieren und ausgeben:

~~~js title="app/controllers/gantt_controller.rb"
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

Füge eine Route für diese Aktion in *routes.rb* ein:

~~~js title="config/routes.rb"
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do
    get "/data", :to => "gantt#data"
  
  end
end
~~~

Und rufe diese Aktion von der Client-Seite aus mit der Methode [gantt.load](api/method/load.md):

~~~js title="app/views/gantt/index.html.erb"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/api/data");/*!*/
~~~

Beachte, dass die [date_format](api/config/date_format.md) Konfiguration das [Format der Datumsangaben](https://api.rubyonrails.org/v5.1/classes/DateTime.html#method-i-to_formatted_s) (das <b>start_date</b> der Task) vom Server festlegt.

Wenn du den Server jetzt startest und *http://localhost:3000/* in deinem Browser öffnest, solltest du in der Lage sein, ein Gantt-Diagramm zu sehen, das mit Aufgaben und Links aus der Datenbank gefüllt ist.
Allerdings würden keine Änderungen an die Datenbank zurückgeschickt. Wir werden dies im nächsten Schritt beheben.

## Schritt 5. Änderungen speichern

dhtmlxGantt kann alle vom Benutzer vorgenommenen Änderungen an die REST-API auf dem Backend übertragen, wo alles in der Datenbank gespeichert werden kann.
Du kannst die Details des Protokolls [hier](guides/server-side.md#technique) einsehen.

So werden wir nun das Speichern von Daten implementieren:

Zuerst aktivieren wir das Senden von Änderungen auf dem Client:

~~~js title="app/views/gantt/index.html.erb"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/api/data");

var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Dann müssen zwei Controller hinzugefügt werden: einer für Tasks und einer für Links, und alle benötigten Aktionen implementieren.

### Task-Controller erstellen

Lass uns mit einem Controller für Tasks beginnen:

~~~js
rails generate controller task --no-helper --no-assets --no-view-specs
~~~

Da dieser Controller keine Views enthalten wird, haben wir die Flags --no-* verwendet, um keine unnötigen Dateien zu erzeugen.

Als Nächstes implementieren wir Aktionen zum Erstellen, Aktualisieren und Löschen von Tasks:

~~~js title="app/controllers/task_controller.rb"
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

Ein paar Hinweise zu diesem Code:

- Wir benötigen keine get-Aktion, da alle Daten bereits von *gantt#data* geladen werden.
- Die Eigenschaft *progress* ist möglicherweise standardmäßig nicht auf dem Client initialisiert, daher müssen wir hier den Standardwert bereitstellen. Alternativ hätte man den Standardwert auch in der Modelklasse definieren können (z. B. mittels [Migration](https://api.rubyonrails.org/classes/ActiveRecord/Migration.html)).
- Eine Aktion, die einen neuen Eintrag erstellt, sollte die Datenbank-ID des neu eingefügten Datensatzes an den Client zurückgeben.

Nach diesem Schritt müssen wir die neuen Routen in der Config hinzufügen, damit Benutzer Tasks in unserem Gantt-Diagramm anzeigen, erstellen, aktualisieren und löschen können:

~~~js title="config/routes.rb"
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do
    get "/data", :to => "gantt#data"
  
    post "/task", :to => "task#add"
    put "/task/:id", :to => "task#update"
    delete "/task/:id", :to => "task#delete"
  end
end
~~~

Nun dasselbe für Links.

### Link-Controller erstellen

Generiere einen Link-Controller:

~~~js
rails generate controller link --no-helper --no-assets --no-view-specs
~~~

Die Implementierung könnte wie folgt aussehen:

~~~js title="app/controllers/link_controller.rb"
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

Dann füge Routen für neue Aktionen hinzu:

~~~js title="config/routes.rb"
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

Und das war’s. Wenn du die Anwendung jetzt ausführst, erhältst du ein interaktives Gantt-Diagramm mit Rails- und MySql-Backend:

![how_to_start_rails_complete](/img/how_to_start_rails_complete.png)

Bitte schau dir weitere unserer Guides an, um mehr Funktionen von dhtmlxGantt kennenzulernen.

## Speichern der Reihenfolge der Aufgaben {#storingtheorderoftasks}

Der clientseitige Gantt erlaubt das [Neuordnen von Aufgaben](guides/reordering-tasks.md) per Drag & Drop. Wenn du diese Funktion verwendest, musst du diese Reihenfolge in der Datenbank speichern.
Du kannst [hier die allgemeine Beschreibung finden](guides/server-side.md#storingtheorderoftasks).

Lass uns diese Funktion nun zu unserer App hinzufügen.

### Das Neuanordnen von Aufgaben im Client aktivieren

Zuerst müssen wir es Benutzern ermöglichen, die Reihenfolge der Aufgaben in der UI zu ändern. Öffne die *Index*-Ansicht und aktualisiere die Konfiguration des gantt:

~~~js title="app/views/gantt/index.html.erb"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Nun spiegeln wir diese Änderungen im Backend wider. Wir müssen die Sortierinformation in unserem Modell speichern, wir nennen sie *sortorder*. Die aktualisierte Modell-Definition könnte so aussehen:

~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal  
    sortorder:integer  /*!*/
~~~

Oder füge eine neue Eigenschaft zum bestehenden Modell hinzu:

1. Eine Migration erstellen:

~~~js
rails generate migration add_sortorder_to_tasks sortorder:integer
~~~

2. Öffne die generierte Migration und füge dem Feld "sortorder" einen Standardwert hinzu:

~~~js
class AddSortorderToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :sortorder, :integer, :default=>0
  end
end
~~~

Und migriere:

~~~js
rake db:migrate
~~~

Danach müssen wir CRUD im Controller aktualisieren:

- Die *data*-Aktion muss Aufgaben nach der Spalte `sortorder` sortiert zurückgeben:

~~~js title="app/controllers/gantt_controller.rb"
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

- Neu hinzugefügte Aufgaben müssen den anfänglichen Wert `sortorder` erhalten:

~~~js title="app/controllers/task_controller.rb"
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

- Schließlich müssen, wenn ein Benutzer Aufgaben neu anordnet, die Aufgabenreihenfolgen aktualisiert werden:

~~~js title="app/controllers/task_controller.rb"
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

Task.updateOrder-Implementierung:

~~~js title="app/models/task.rb"
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

## Anwendungssicherheit

Gantt bietet keine Mittel, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, wie SQL-Injektionen oder XSS- und CSRF-Angriffe. Es ist wichtig, dass die Verantwortung für die Sicherheit der Anwendung beim Entwickler liegt, der das Backend implementiert. Die Details finden Sie im entsprechenden Artikel.

## Fehlerbehebung

Falls du die oben beschriebenen Schritte zur Integration von Gantt mit Ruby on Rails abgeschlossen hast, Gantt aber keine Aufgaben und Links auf einer Seite rendert, schau dir den Artikel [Fehlerbehebung bei der Backend-Integration](guides/troubleshooting.md) an. Er beschreibt die Methoden zur Identifizierung der Ursachen der Probleme.

## Was ist als Nächstes

Nun hast du ein voll funktionsfähiges Gantt. Den vollständigen Code kannst du auf [GitHub](https://github.com/DHTMLX/gantt-howto-rails) einsehen, klonen oder herunterladen und für deine Projekte verwenden.

Du kannst auch unsere Guides zu den zahlreichen Funktionen von gantt oder Tutorials zur Integration von Gantt mit anderen Backend-Frameworks einsehen.