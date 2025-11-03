//kuupäeva fail, kust saan class_03e kuupäeva
/* const dateFormattedET = function(){
	let timeNow = new Date();
	const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli",
	"august", "september", "oktoober", "november", "detsember"];
	return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}

const weekDayET = function(){
	let timeNow = new Date();
	const weekdayNamesEt = ["pأ¼hapأ¤ev", "esmaspأ¤ev", "teisipأ¤ev", "kolmapأ¤ev", "neljapأ¤ev", "reede", "laupأ¤ev"];
	return weekdayNamesEt[timeNow.getDay()];
}

const timeNowFormattedET = function(){
	let timeNow = new Date();
	return timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
}

// uus: vorminda DB-st loetud kuupäev (nt "YYYY-MM-DD") ilusaks eestikeelseks kujuks
const formatDbDate = function(dateFromDb){
  if(!dateFromDb) return "";
  const givenDate = new Date(dateFromDb);
  const monthNamesET = ["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember"];
  return givenDate.getDate() + ". " + monthNamesET[givenDate.getMonth()] + " " + givenDate.getFullYear();
};

module.exports = {
  dateFormattedET,
  weekDayET,
  timeNowFormattedET,
  formatDbDate
}; */



const longDate = function(){
  const now = new Date();
  const monthNamesET = ["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember"];
  return now.getDate() + ". " + monthNamesET[now.getMonth()] + " " + now.getFullYear();
};

const weekday = function(){
  const now = new Date();
  const weekdayNamesEt = ["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"];
  return weekdayNamesEt[now.getDay()];
};

const time = function(){
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,"0");
  const mm = String(now.getMinutes()).padStart(2,"0");
  const ss = String(now.getSeconds()).padStart(2,"0");
  return hh + ":" + mm + ":" + ss;
};

const formatDbDate = function(dateFromDb){
  if(!dateFromDb) return "";
  const givenDate = new Date(dateFromDb);
  const monthNamesET = ["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember"];
  return givenDate.getDate() + ". " + monthNamesET[givenDate.getMonth()] + " " + givenDate.getFullYear();
};

module.exports = { longDate, weekday, time, formatDbDate };