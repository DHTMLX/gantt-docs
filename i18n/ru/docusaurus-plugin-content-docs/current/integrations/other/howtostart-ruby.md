---
title: "dhtmlxGantt с Ruby on Rails"
sidebar_label: "Ruby on Rails"
---

# dhtmlxGantt с Ruby on Rails 


В этой статье описывается процесс создания диаграммы Gantt с использованием backend на [Ruby on Rails](https://rubyonrails.org/). В примере используются Ruby 2.4.1, Rails 5.1.3 и MySQL. Предполагается, что у вас уже установлены все необходимые компоненты. Если нет, рекомендуем ознакомиться с [официальными учебниками](https://guides.rubyonrails.org/index.html).

Если вы работаете с другим технологическим стеком, другие варианты интеграции можно найти здесь:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)

Демо-проект также доступен на GitHub: [https://github.com/DHTMLX/gantt-howto-rails](https://github.com/DHTMLX/gantt-howto-rails).

## Шаг 1. Создание проекта


Чтобы создать новый проект, выполните в терминале следующую команду:

~~~js
rails new gantt-app -d mysql
~~~

## Шаг 2. Добавление Gantt на страницу


Начнем с создания контроллера и главной страницы приложения. Перейдите в папку приложения и создайте новый контроллер с действием *index*:

~~~js
cd gantt-app
rails generate controller gantt index
~~~

Вы увидите подтверждение о создании новых файлов.

### Установка маршрута по умолчанию

Для настройки маршрутизации откройте файл *config/routes.rb* и измените маршрут по умолчанию, чтобы он указывал на действие "index" нового контроллера:

**config/routes.rb**
~~~js
Rails.application.routes.draw do
  root :to => "gantt#index"
end
~~~

Теперь проверьте работу сервера, выполнив команду:

~~~js
rails server
~~~

Затем откройте в браузере *http://localhost:3000/*. Вы увидите пустую страницу, как показано ниже:

![how_to_start_rails_blank_page](/img/how_to_start_rails_blank_page.png)

Когда приложение работает и главная страница готова, следующим шагом будет добавление диаграммы Gantt.

### Добавление Gantt во View

Теперь нужно встроить диаграмму Gantt на страницу.

Откройте файл layout и вставьте yield внутрь тега *head*. Это позволит подключать файлы dhtmlxGantt:

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

Далее откройте view *gantt/index* и добавьте на страницу Gantt:

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

Здесь файлы dhtmlxGantt загружаются с [CDN](guides/cdn-links-list.md), а не локально. Для разработки вы можете использовать исходные файлы из дистрибутива.

Теперь снова откройте *http://localhost:3000/* в браузере. Вы увидите:

![how_to_start_rails_empty_gantt](/img/how_to_start_rails_empty_gantt.png)

У вас появилась диаграмма Gantt, в которой можно добавлять и редактировать задачи, но функционал сохранения пока отсутствует. Это будет реализовано на следующем этапе с помощью моделей.

## Шаг 3. Создание моделей


Поскольку используется MySQL, убедитесь, что настройки подключения в *config/database.yml* указаны верно, например:

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

Далее необходимо создать модели для [задач и связей](guides/loading.md#standarddatabasestructure).

Для создания модели Task с нужными свойствами выполните команду:

~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal
~~~

Аналогично создайте модель Link:

~~~js
rails generate model Link 
    source:integer 
    target:integer 
    link_type:string:limit1
~~~

Обратите внимание, что объект связи в dhtmlxGantt требует свойства <b>[type](guides/loading.md#standarddatabasestructure)</b> для указания типа связи (начало-к-началу, конец-к-концу и т.д.).

Поскольку имя "<b>type</b>" зарезервировано в ActiveRecord, здесь используется свойство <b>link_type</b>, а необходимое сопоставление будет реализовано в контроллере.

Полный список обязательных и дополнительных свойств смотрите в документации по [объекту Task](guides/loading.md#task_properties) и [объекту Link](guides/loading.md#link_properties).

Затем выполните миграцию для обновления базы данных:

~~~js
rake db:migrate
~~~

Добавим тестовые данные:

1. Откройте консоль Rails:

~~~js
rails c
~~~

2. Добавьте пару задач и связей:

~~~js
Task.create :text=>"Task 1", :start_date=>"2015-10-25",  :duration=>2, :progress=>0;
Task.create :text=>"Task 2", :start_date=>"2015-10-27",  :duration=>3, :progress=>0.5;
Link.create :source=>1, :target=>2, :link_type=>"0";
~~~

3. Введите "exit" для выхода из консоли.

Далее реализуем загрузку и сохранение данных в контроллере.

## Шаг 4. Загрузка данных


Когда модели и миграции готовы, можно загрузить данные из базы в диаграмму Gantt.

Поскольку dhtmlxGantt ожидает данные в [формате JSON](guides/supported-data-formats.md), добавьте новое действие в *GanttController*, которое будет читать, форматировать и выдавать данные:


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

Добавьте маршрут для этого действия в *routes.rb*:

**config/routes.rb**
~~~js
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do/*!*/
    get "/data", :to => "gantt#data"/*!*/
  end/*!*/
end
~~~

На клиенте вызовите это действие с помощью метода [gantt.load](api/method/load.md):

**app/views/gantt/index.html.erb**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/api/data");/*!*/
~~~

Конфигурация [date_format](api/config/date_format.md) определяет формат дат (например, <b>start_date</b> задачи), получаемых с сервера, и соответствует форматированию дат в Rails.

Если вы запустите сервер и откроете *http://localhost:3000/*, вы увидите диаграмму Gantt с задачами и связями из базы данных. Однако изменения пока не сохраняются - это будет реализовано далее.

## Шаг 5. Сохранение изменений


dhtmlxGantt может отправлять все изменения пользователя на RESTful API backend, где они сохраняются в базе данных. Подробнее о протоколе читайте [здесь](guides/server-side.md#technique).

Чтобы включить сохранение, сначала активируйте отправку изменений на клиенте:

**app/views/gantt/index.html.erb**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/api/data");

var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Далее потребуется добавить два контроллера: для задач и для связей, каждый с необходимыми действиями.

### Создание контроллера Task

Создайте контроллер для задач:

~~~js
rails generate controller task --no-helper --no-assets --no-view-specs
~~~

Поскольку у этого контроллера не будет представлений, опции *--no-* предотвращают создание лишних файлов.

Реализуйте действия для создания, обновления и удаления:

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

Несколько замечаний по коду:

- Действие get здесь не требуется, так как все данные загружаются через *gantt#data*.
- Свойство *progress* по умолчанию может не быть инициализировано на клиенте, поэтому здесь ему присваивается значение по умолчанию. Альтернативно, значение по умолчанию можно задать в классе модели (например, через [миграцию](https://api.rubyonrails.org/classes/ActiveRecord/Migration.html)).
- При создании новой записи в ответе возвращается ID новой записи в базе данных.

Наконец, добавьте маршруты для этих действий, чтобы пользователи могли просматривать, создавать, обновлять и удалять задачи в диаграмме Gantt:

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

Следующим шагом будет настройка аналогичного функционала для связей.

### Создание контроллера Link

Создайте контроллер Link с помощью следующей команды:

~~~js
rails generate controller link --no-helper --no-assets --no-view-specs
~~~

Вот пример возможной реализации:

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

Далее добавьте маршруты для новых действий:

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

Вот и всё. После запуска приложения у вас будет интерактивная диаграмма Gantt на базе Rails и MySQL:

![how_to_start_rails_complete](/img/how_to_start_rails_complete.png)

Чтобы узнать больше о возможностях dhtmlxGantt, ознакомьтесь с [нашими руководствами](guides.md).

## Сохранение порядка задач {#storingtheorderoftasks}

Клиентская часть Gantt поддерживает [изменение порядка задач](guides/reordering-tasks.md) с помощью drag and drop. Если вы используете эту функцию, порядок задач потребуется сохранять в базе данных.
Общий обзор доступен [здесь](guides/server-side.md#storingtheorderoftasks).

Давайте добавим эту возможность в приложение.

### Включение изменения порядка задач на клиенте

Сначала включите изменение порядка задач в интерфейсе, обновив конфигурацию Gantt во *вьюхе Index*:

**app/views/gantt/index.html.erb**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Теперь обновите серверную часть, чтобы учесть эти изменения. Необходимо добавить в модель поле для порядка, которое мы назовём *sortorder*. Обновлённое объявление модели может выглядеть так:

~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal  
    sortorder:integer  /*!*/
~~~

Либо вы можете добавить это свойство в существующую модель:

1. Создайте миграцию:

~~~js
rails generate migration add_sortorder_to_tasks sortorder:integer
~~~

2. Отредактируйте сгенерированную миграцию, чтобы задать значение по умолчанию для столбца "sortorder":

~~~js
class AddSortorderToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :sortorder, :integer, :default=>0
  end
end
~~~

Затем примените миграцию:

~~~js
rake db:migrate
~~~

Далее обновите CRUD-операции в контроллерах:

- Действие *data* должно возвращать задачи, отсортированные по столбцу `sortorder`:

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

- При добавлении новых задач устанавливайте начальное значение `sortorder`:

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

- Наконец, когда пользователь меняет порядок задач, обновляйте их порядок соответствующим образом:

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

Вот реализация Task.updateOrder:

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

## Безопасность приложения


Сам Gantt не содержит встроенной защиты от распространённых угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Разработчики должны самостоятельно обеспечивать защиту серверной части своих приложений. Подробнее об этом читайте [в этой статье](guides/app-security.md).

## Устранение неполадок


Если вы выполнили шаги по интеграции Gantt с Ruby on Rails, но задачи и связи не отображаются на странице, обратитесь к руководству по устранению неполадок: [Устранение проблем интеграции с backend](guides/troubleshooting.md). Там вы найдёте рекомендации по диагностике частых проблем.

## Что дальше


Теперь, когда ваша диаграмма Gantt полностью функционирует, вы можете ознакомиться с полным кодом на [GitHub](https://github.com/DHTMLX/gantt-howto-rails), где его можно клонировать или скачать для использования в своих проектах.

Дополнительно изучите [руководства по различным возможностям Gantt](guides.md) или обучающие материалы по [интеграции Gantt с другими серверными фреймворками](integrations/howtostart-guides.md).

