/**
 * Срабатывает при клике на кнопку "Следующий день"
 *
 */
function _onRightArrowClick() {
  var currentPage = myNavigator.topPage;
  var day = getNextDay(currentPage.id);
  myNavigator.replacePage(day+'.html', {animation: 'none'});
}

/**
 * Срабатывает при клике на кнопку "Предыдущий день"
 *
 */
function _onLeftArrowClick() {
  var currentPage = myNavigator.topPage;
  var day = getPrevDay(currentPage.id);
  myNavigator.replacePage(day+'.html', {animation: 'none'});
}

/**
 * Срабатывает при клике на телепередачу
 *
 */
function _onItemClick() {
    var time = this.querySelector('.programm__item-time').innerHTML;
    var name = this.querySelector('.programm__item-name').innerHTML;
    myNavigator.pushPage('description.html', {data: {title: name, time: time}});
}

/**
 * Срабатывает при клике на какой-либо из фильтров жанров.
 *
 */
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