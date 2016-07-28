/**
 * Возвращает id страницы следующего дня недели
 * @param {string} - id текущего дня
 * @returns {string} - id следующего дня
 *
 */
function getNextDay(currentDay) {
  var currentPosition = days.indexOf(currentDay);
  var nextDay = days[currentPosition + 1];
  if (nextDay) return nextDay;
  else return days[0];
}

/**
 * Возвращает id страницы предыдущего дня недели
 * @param {string} - id текущего дня
 * @returns {string} - id предыдущего дня
 *
 */
function getPrevDay(currentDay) {
  var currentPosition = days.indexOf(currentDay);
  var nextDay = days[currentPosition - 1];
  if (nextDay) return nextDay;
  else return days[days.length - 1];
}