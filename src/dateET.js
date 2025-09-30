//kuupäeva fail, kust saan class_03e kuupäeva
exports.dateFormattedET = function(){
	let timeNow = new Date();
	const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli",
	"august", "september", "oktoober", "november", "detsember"];
	return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}