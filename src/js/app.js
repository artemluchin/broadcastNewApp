var scroller = 0;
var pageContent,
    filters,
    telecasts;

var leftArrow,
    rightArrow;
    
var placeholderText = 'Описание для телепередачи '; 

var days = ['yesterday', 'today', 'tomorrow'];

/**
 * Cпециальное событие фреймворка onsen. Срабатывает, когда страница
 * привязывается к DOM.
 * 
 */
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
/**
 * Перед переходом к окну описания телепередачи
 * запоминает текущее положение скролла.
 *
 */
myNavigator.addEventListener('prepush', function(event) {
  scroller = pageContent.scrollTop;
});

/**
 * После того как вернулись со страницы описания, устанавливаем
 * первоначальный скролл.
 *
 */
myNavigator.addEventListener('postpop', function(event) {
  pageContent.scrollTop = scroller;
});