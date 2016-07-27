var scroller = 0;
var pageContent,
    filters,
    telecasts;

var leftArrow,
    rightArrow;
    
var placeholderText = 'Описание для телепередачи '; 

var days = ['yesterday', 'today', 'tomorrow'];

// специальное событие фреймворка onsen. Срабатывает, когда страница
// привязывается к DOM.
document.addEventListener('init', function(event) {
  var page = event.target;
  

  if (page.id !== 'description') {
    pageContent = page.querySelector('.page__content');
    telecasts = [].slice.call(page.querySelectorAll('.programm__item'));
    filters = [].slice.call(page.querySelectorAll('.filter__item'));
    telecasts.forEach(function(item) {
      item.addEventListener('click', _onItemClick);
    });

    filters.forEach(function(filter) {
      filter.addEventListener('click', _onFilterClick);
    });
  }

  if (page.id === 'description') {
    page.querySelector('.description__title').innerHTML = page.data.title;
    page.querySelector('.description__name').innerHTML = page.data.title;
    page.querySelector('.description__text').innerHTML =  placeholderText + page.data.title + 
                                                          placeholderText + page.data.title +
                                                          placeholderText + page.data.title;
  }
});


myNavigator.addEventListener('prepush', function(event) {
  scroller = pageContent.scrollTop;
});

myNavigator.addEventListener('postpop', function(event) {
  pageContent.scrollTop = scroller;
});
function _onRightArrowClick() {
  var currentPage = myNavigator.topPage;
  var day = getNextDay(currentPage.id);
  myNavigator.replacePage(day+'.html', {animation: 'none'});
}


function _onLeftArrowClick() {
  var currentPage = myNavigator.topPage;
  var day = getPrevDay(currentPage.id);
  myNavigator.replacePage(day+'.html', {animation: 'none'});
}


function _onItemClick() {
    var time = this.querySelector('.programm__item-time').innerHTML;
    var name = this.querySelector('.programm__item-name').innerHTML;
    myNavigator.pushPage('description.html', {data: {title: name, time: time}});
}


function _onFilterClick() {
  var type = this.dataset.type;
  var channels = [].slice.call(document.querySelectorAll('.channel'));

  // если второй раз кликаем по фильтру, то выключаем его и возвращаем
  // все изменения
  if (this.classList.contains('filter__item_active')) {
    this.classList.remove('filter__item_active');
    telecasts.forEach(function(telecast) {
      telecast.classList.remove('programm__item_hide');
    });
  }
  else {
    // убираем active с каждого фильтра
    filters.forEach(function(filter) {
      filter.classList.remove('filter__item_active');
    });
    telecasts.forEach(function(telecast) {
      if (telecast.dataset.type === type) {
        telecast.classList.remove('programm__item_hide');
      }
      else {
        telecast.classList.add('programm__item_hide');
      }
    });
    this.classList.add('filter__item_active');
  }

  channels.forEach(function(channel) {
    var channelEvents = [].slice.call(channel.querySelectorAll('.programm__item'));
    var isAllEventsHidden = true;

    channelEvents.forEach(function(event) {
      if (!event.classList.contains('programm__item_hide')) {
        isAllEventsHidden = false;
      }
    });

    if (isAllEventsHidden) {
      channel.classList.add('programm__item_hide');
    }
    else {
      channel.classList.remove('programm__item_hide');
    }
  });
}
function getNextDay(currentDay) {
  var currentPosition = days.indexOf(currentDay);
  var nextDay = days[currentPosition + 1];
  if (nextDay) return nextDay;
  else return days[0];
}


function getPrevDay(currentDay) {
  var currentPosition = days.indexOf(currentDay);
  var nextDay = days[currentPosition - 1];
  if (nextDay) return nextDay;
  else return days[days.length - 1];
}