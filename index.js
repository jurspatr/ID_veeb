const express = require("express");
const fs = require("fs");
const bodyparser = require("body-parser");
//lisan andmebaasiga suhtlemiseks mooduli
//nüüd, sync jaoks kasutame mysql2 promise osa
//const mysql = require("mysql2/promise");
//lisan andmebaasi juurdepääsuinfo
//const dbinfo = require("../../../vp2025config");
const dateTimeET = require("./src/dateTimeET");
//me loome objekti, mis ongi express.js programm ja edasi kasutamegi seda
const app = express();
//mأ¤أ¤rame renderdajaks ejs
app.set("view engine", "ejs");
//mأ¤أ¤rame kasutamiseks "avaliku" kataloogi
app.use(express.static("public"));
//pأ¤ringu URL-i parsimine, eraldame POST osa. False, kui ainuylt tekst, true. kui muud infot ka
//kui vormist tuleb ainult text siis false muidu true
app.use(bodyparser.urlencoded({extended: true}));

//loon andmeaasi ühenduse
/* const conn = mysql.createConnection({
	host: dbinfo.configData.host, 
	user: dbinfo.configData.user,
	password: dbinfo.configData.passWord,
	database: dbinfo.configData.dataBase
}); */

/* const dbConf = {
	host: dbinfo.configData.host, 
	user: dbinfo.configData.user,
	password: dbinfo.configData.passWord,
	database: dbinfo.configData.dataBase
}; */

app.get("/", (req, res)=>{
	//res.send("Express.js lأ¤ks edukalt kأ¤ima!");
	res.render("index");
});

app.get("/timenow", (req, res)=>{
	res.render("timenow", {nowDate: dateTimeET.longDate(), nowWd: dateTimeET.weekday()});
});

app.get("/vanasonad", (req, res)=>{
	fs.readFile("public/txt/vanasonad.txt", "utf8", (err, data)=>{
		if(err){
			res.render("genericlist", {heading: "Valik Eesti tuntud vanasأµnasid", listData: ["Kahjuks vanasأµnasid ei leidnud!"]});
		} else {
			let folkWisdom = data.split(";");
			res.render("genericlist", {heading: "Valik Eesti tuntud vanasأµnasid", listData: folkWisdom});
		}
	});
	
});

/* app.get("/regvisit", (req, res)=>{
	res.render("regvisit");
}); */

/* app.post("/regvisit", (req, res)=>{
	console.log(req.body);
	//avan tekstifaili kirjutamiseks sellisel moel, et kui teda pole, luuakse (parameeter "a")
	fs.open("public/txt/visitlog.txt", "a", (err, file)=>{
		if(err){
			throw(err);
		}
		else {
			//faili senisele sisule lisamine
				fs.appendFile("public/txt/visitlog.txt", req.body.firstNameInput + " " + req.body.lastNameInput + ", " + dateEt.longDate() + " kell " + dateEt.time() + ";", (err)=>{
					if(err){
							throw(err);
				}
				else {
					console.log("Salvestatud!");
					res.render("regvisit");
				}
			});
		}
	});
});

app.get("/visitlog", (req, res)=>{
	let listData = [];
	fs.readFile("public/txt/visitlog.txt", "utf8", (err, data)=>{
		if(err){
			//kui tuleb viga, siis ikka vأ¤ljastame veebilehe, liuhtsalt vanasأµnu pole أ¼htegi
			res.render("genericlist", {heading: "Registreeritud kأ¼lastused", listData: ["Ei leidnud أ¼htegi kأ¼lastust!"]});
		}
		else {
			let tempListData = data.split(";");
			for(let i = 0; i < tempListData.length - 1; i ++){
				listData.push(tempListData[i]);
			}
			res.render("genericlist", {heading: "Registreeritud kأ¼lastused", listData: listData});
		}
	});
}); */

/* app.get("/eestifilm", (req, res)=>{
	res.render("eestifilm");
});

app.get("/eestifilm/inimesed", async (req, res)=>{
	let conn;
	const sqlReq = "SELECT * FROM person";
	try {
		conn = await mysql.createConnection(dbConf);
		console.log("Andmebaasiühendus loodud!");
		const [rows, fields] = await conn.execute(sqlReq);
		res.render("filmiinimesed", {personList: rows});
	}
	catch(err) {
		console.log("Viga: " + err);
		res.render("filmiinimesed", {personList: []});
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasi ühendus suletud!");
		}
	}
});
 */
/* app.get("/eestifilm/inimesed", (req, res)=>{
	const sqlReq = "SELECT * FROM person";
	conn.execute(sqlReq, (err, sqlRes)=>{
		if(err){
			console.log(err);
			res.render("filmiinimesed", {personList: []});
		}
		else {
			console.log(sqlRes);
			res.render("filmiinimesed", {personList: sqlRes});
		}
	});
	//res.render("filmiinimesed");
}); */

/* app.get("/eestifilm/inimesed_add", (req, res)=>{
	res.render("filmiinimesed_add", {notice: "Ootan sisestust!"});
}); */

/* app.post("/eestifilm/inimesed_add", (req, res)=>{
	console.log(req.body);
	//kas andmed on olemas
	if(!req.body.firstNameInput || !req.body.lastNameInput || !req.body.
	bornInput > new Date()){
		res.render("filmiinimesed_add", {notice: "Andmed on vigased! Vaata üle!"});
	}
	else {
		let deceasedDate = null;
		if(req.body.deceasedInput != ""){
			deceasedDate = req.body.deceasedInput
		}
		let sqlReq = "INSERT INTO person (first_name, last_name, born, deceased)VALUES (?, ?, ?, ?)";
		conn.execute(sqlReq, [req.body.firstNameInput, req.body.lastNameInput, req.body.bornInput, deceasedDate], (err, sqlRes)=>{
			if(err){
				res.render("filmiinimesed_add", {notice: "Tekkis tehniline viga:" + err});
			}
			else {
				res.render("filmiinimesed_add", {notice: "Andmed on salvestatud"});
			}
		});
	}
	//res.render("filmiinimesed_add", {notice: "Andmed olemas! " + req.body});
}); */

/* app.post("/eestifilm/inimesed_add", async (req, res)=>{
	let conn;
	let sqlReq = "INSERT INTO person (first_name, last_name, born, deceased)VALUES (?, ?, ?, ?)";

	if(!req.body.firstNameInput || !req.body.lastNameInput || !req.body.
	bornInput > new Date()){
		res.render("filmiinimesed_add", {notice: "Andmed on vigased! Vaata üle!"});
		return;
	}
	else {
		try{
			conn = await mysql.createConnection(dbConf);
			console.log("Andmebaasiühendus loodud!");
			let deceasedDate = null;
			if(req.body.deceasedInput != ""){
				deceasedDate = req.body.deceasedInput
			}
			await conn.execute(sqlReq, [req.body.firstNameInput, req.body.lastNameInput, req.body.bornInput, deceasedDate]);
			console.log("Salvestati kirje id:" + result.insertId);
			res.render("filmiinimesed_add", {notice: "Andmed on salvestatud"});
		}
		catch(err) {
			console.log("Viga: " + err);
			res.render("filmiinimesed_add", {notice: "Tekkis tehniline viga:" + err});
		}
		finally {
			if(conn){
				await conn.end();
			console.log("Andmebaasi ühendus suletud!");
			}
		}
	}
});

app.get("/eestifilm/ametid", (req, res)=>{
	const sqlReq = "SELECT * FROM position";
	conn.execute(sqlReq, (err, sqlRes)=>{
		if(err){
			console.log(err);
			res.render("filmiametid", {positionList: []});
		}
		else {
			console.log(sqlRes);
			res.render("filmiametid", {positionList: sqlRes});
		}
		
	});
});

app.get("/eestifilm/ametid_add", (req, res)=>{
	res.render("filmiametid_add", {notice: "Ootan sisestust!"});
});

app.post("/eestifilm/ametid_add", (req, res)=>{
	console.log(req.body);
	//kas andmed on olemas?
	if(!req.body.positionNameInput){
		res.render("filmiametid_add", {notice: "Palun kirjuta ameti nimetus!"});
	}
	else {
		let positionDescription = null;
		if(req.body.positionDescriptionInput != ""){
			positionDescription = req.body.positionDescriptionInput;
		}
		let sqlReq = "INSERT INTO `position` (position_name, description) VALUES (?,?)";
		conn.execute(sqlReq, [req.body.positionNameInput, positionDescription], (err, sqlRes)=>{
			if(err){
				res.render("filmiametid_add", {notice: "Tekkis tehniline viga:" + err});
			}
			else {
				//res.render("filmiametid_add", {notice: "Andmed on salvestatud!"});
				res.redirect("/eestifilm/ametid");
			}
		});
	}
}); */

//Eesti filmi marsruudid
//const eestifilmRouter = require("./routes/eestifilmRoutes");
//app.use("/eestifilm", eestifilmRouter);

const eestifilmRouter = require("./routes/eestifilmRoutes");
app.use("/eestifilm", eestifilmRouter);

const visitsRouter = require("./routes/visitsRoutes");
app.use("/visits", visitsRouter);

//piltide üleslaadimiseks marsruudid
const galleryphotoupRouter = require("./routes/galleryphotoupRoutes");
app.use("/galleryphotoupload", galleryphotoupRouter);

app.get("/regvisit", (req, res) => res.redirect("/visits"));
app.get("/visitlog", (req, res) => res.redirect("/visits/log"));

app.listen(5220);