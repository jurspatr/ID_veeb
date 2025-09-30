//kuupäeva fail, kust saan class_03e kuupäeva
const dateFormattedET = function(){
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

module.exports = {longDate: dateFormattedET, weekday: weekDayET, time: timeNowFormattedET};