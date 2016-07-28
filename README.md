### Приложение Broadcast

Сначала опишу функционал приложения, а также идеи, которые не удалось реализовать.
Далее расскажу про возникшие проблемы.

#### Функционал

Ну, большого функционала от телепрограммы ждать не стоит, но всё же.

При загрузке приложения, пользователь видит список телепередач на сегодняшний день,
переключатель дней недели в шапке приложения, а также фильтр телепередач.

<img src="https://github.com/artemluchin/broadcastNewApp/blob/master/screenshots/mainView.png" width="240"/>

Переключая фильтры, можно показать только тот вид передач, который интересует
пользователя. Далее показаны варианты переключения фильтров.

<img src="https://github.com/artemluchin/broadcastNewApp/blob/master/screenshots/moviesFilter.png" width="240"/>

<img src="https://github.com/artemluchin/broadcastNewApp/blob/master/screenshots/seriesFilter.png" width="240"/>

<img src="https://github.com/artemluchin/broadcastNewApp/blob/master/screenshots/newsFilter.png" width="240"/>

Также можно перелистывать дни недели. В приложении представлены только три дня.

<img src="https://github.com/artemluchin/broadcastNewApp/blob/master/screenshots/anotherDay.png" width="240"/>

При нажатии на телепередачу, показывается ее описание, а также изображение.

<img src="https://github.com/artemluchin/broadcastNewApp/blob/master/screenshots/description.png" width="240"/>

#### Нереализованные идеи

Основная идея была хранить всю телепрограмму в базе на телефоне посредством IndexedDB. Но, к сожалению,
мой телефон всячески отторгал любую попытку использовать данную базу данных. Об этом расскажу далее.

Также хотел реализовать возможность "Добавить в избранное" и "Любимые телеканалы". Но, поскольку
я хотел это делать также через IndexedDB, эти функции остались в проекте.


#### Проблемы

В данной работе, в отличие от [старой версии](https://github.com/artemluchin/broadcastOldApp), проблем было куда больше.

1. **IndexedDB**. Сколько я не мучился, база так и не запустилась на моем телефоне. Поэтому
   я решил отказаться от ее использования, поскольку не было нужного девайса, чтобы
   производить отладку на реальном устройстве.
   
   Я использовал плагин `cordova-plugin-indexeddb-async`, подключал все по инструкции, но
   дальше чем создание транзакции моя база не уходила. Было потрачено много времени на
   изучение данной проблемы. В итоге, понимая, что времени оставалось не много, пришлось
   отказаться от использования базы.

   Да, забыл упомянуть, что в браузере все работало как надо.
   
2. **Onsen UI**. Первоначально подумал, что данный фреймворк очень здоровский. Есть много
   готовых элементов, много функционала, взятого из нативных приложений. Но в процессе
   реализации приложения столкнулся с некоторыми неудобствами.

   Первое - это стили. Если попытаться исправить вид какого-то элемента, то не всегда это
   получится сразу. А всему причина - генерация собственных стилей на момент компиляции
   страницы. Даже если мы изначально добавим элементу свой стиль, на момент рендеринга
   к данному элементу применятся еще пара-тройка своих собственных. Поэтому, пока не
   поймешь какой стиль используется, трудно понять какие свойства нужно писать в своем классе.
   
   Второе - собственные обработчики событий. Например, `init`. Данный обработчик срабатывает,
   когда сгенерированная страница присоединяется к DOM. Я бы назвал это не трудностью, а
   неким неудобством, потому что, например, событие `DOMContentLoaded` и `init` происходят в разное время.
   Поэтому, если мы хотим генерировать какой то элемент динамически при загрузке страницы, то
   нужно это делать в момент срабатывания события 'init', поскольку нам просто некуда будет
   ставить новый элемент.
   
   Почему это неудобство? Сложно будет, используя данный фреймворк, завернуть уже написанное
   приложение. Придется адаптировать под новые события.
   
   И вообще, поработав с фреймворком, я решил, что для телепрограммы можно написать все самому.
   
3. **Phonegap Build**. Тут проблема возникла при создании устновочного файла. Долго мучался, не понимая
   почему не видно мои иконки и картинки для splashscreen. После долгого серфинга наткнулся на статью, где
   файл `config.xml` укладывают в папку `www`. Только после этого установочный файл компилировался правильно.