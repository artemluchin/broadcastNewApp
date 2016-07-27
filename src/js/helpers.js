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