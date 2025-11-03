const mysql = require("mysql2/promise");
const dbinfo = require("../../../../vp2025config");

const dbConf = {
	host: dbinfo.configData.host, 
	user: dbinfo.configData.user,
	password: dbinfo.configData.passWord,
	database: dbinfo.configData.dataBase
};

//@desc Home page for Estonian film section
//@route GET /eestifilm
//@access public

const filmHomePage = (req, res)=>{
	res.render("eestifilm");
};

//@desc page for list of people involved in Estonian film industry
//@route GET /eestifilm/inimesed
//@access public

const filmPeople = async (req, res)=>{
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
};

//@desc page for adding people involved in Estonian film industry
//@route GET /eestifilm/inimesed_add
//@access public

const filmPeopleAdd = (req, res)=>{
	res.render("filmiinimesed_add", {notice: "Ootan sisestust!"});
};

//@desc page for adding people involved in Estonian film industry
//@route POST /eestifilm/inimesed_add
//@access public

const filmPeopleAddPost = async (req, res)=>{
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
};

//@desc page for list of positions involved in film industry
//@route GET /eestifilm/ametid
//@access public

const filmPosition = async (req, res)=>{
    let conn;
    const sqlReq = "SELECT * FROM `position`";
    try {
        conn = await mysql.createConnection(dbConf);
        console.log("Andmebaasiühendus loodud!");
        const [rows] = await conn.execute(sqlReq);
        res.render("filmiametid", {positionList: rows});
    }
    catch(err) {
        console.log("Viga: " + err);
        res.render("filmiametid", {positionList: []});
    }
    finally {
        if(conn){
            await conn.end();
            console.log("Andmebaasi ühendus suletud!");
        }
    }
};

const filmPositionAddPost = async (req, res)=>{
    let conn;
    let sqlReq = "INSERT INTO `position` (position_name, description) VALUES (?, ?)";
    try{
        if(!req.body.positionNameInput){
            res.render("filmiametid_add", {notice: "Palun kirjuta ameti nimetus!"});
            return;
        }
        conn = await mysql.createConnection(dbConf);
        console.log("Andmebaasiühendus loodud!");
        const [result] = await conn.execute(sqlReq, [req.body.positionNameInput, req.body.positionDescriptionInput || null]);
        await conn.end();
        res.redirect("/eestifilm/ametid");
    }
    catch(err) {
        console.log("Viga: " + err);
        if(conn) await conn.end();
        res.render("filmiametid_add", {notice: "Tekkis tehniline viga: " + err});
    }
};
	
	/* conn.execute(sqlReq, (err, sqlRes)=>{
		if(err){
			console.log(err);
			res.render("filmiametid", {positionList: []});
		}
		else {
			console.log(sqlRes);
			res.render("filmiametid", {positionList: sqlRes});
		}
		
	});
}; */

//@desc page for adding positions involved in film industry
//@route GET /eestifilm/ametid_add
//@access public

const filmPositionAdd = (req, res)=>{
	res.render("filmiametid_add", {notice: "Ootan sisestust!"});
};

//@desc page for adding positions involved in film industry
//@route POST /eestifilm/ametid_add
//@access public

/* const filmPositionAddPost = async (req, res)=>{
	let conn;
	let sqlReq = "INSERT INTO position (nimetus, description)VALUES (?, ?)";

		try{
			conn = await mysql.createConnection(dbConf);
			console.log("Andmebaasiühendus loodud!");
			
			await conn.execute(sqlReq, [req.body.position, req.body.description]);
			//console.log("Salvestati kirje id:" + result.insertId);
			res.render("filmiametid_add", {notice: "Andmed on salvestatud"});
		}
		catch(err) {
			console.log("Viga: " + err);
			res.render("filmiametid_add", {notice: "Tekkis tehniline viga:" + err});
		}
		finally {
			if(conn){
				await conn.end();
			console.log("Andmebaasi ühendus suletud!");
			}
		}
	}; */

	
	
	
	/* console.log(req.body);
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
}; */

/* module.exports = {
	filmHomePage,
	filmPeople, 
	filmPeopleAdd, 
	filmPeopleAddPost, 
	filmPosition, 
	filmPositionAdd, 
	filmPositionAddPost
	
};
 */
 
 
 // ----------------- FILMIDE LISAMINE -----------------
const filmAdd = (req, res)=>{
    res.render("filmi_add", {notice: "Ootan sisestust!"});
};

const filmAddPost = async (req, res)=>{
    let conn;
    let sqlReq = "INSERT INTO `film` (title, year, description) VALUES (?, ?, ?)";
    try{
        if(!req.body.titleInput){
            res.render("filmi_add", {notice: "Palun sisesta filmi pealkiri!"});
            return;
        }
        conn = await mysql.createConnection(dbConf);
        console.log("Andmebaasiühendus loodud!");
        await conn.execute(sqlReq, [req.body.titleInput, req.body.yearInput || null, req.body.descriptionInput || null]);
        await conn.end();
        res.redirect("/eestifilm"); // või /eestifilm/filmid kui lisad vaatamise
    }
    catch(err){
        console.log("Viga: " + err);
        if(conn) await conn.end();
        res.render("filmi_add", {notice: "Tekkis tehniline viga: " + err});
    }
};
/*
// ----------------- SEOSTE (PERSON-FILM-POSITION) HALDUS -----------------
// GET: loeb person, film ja position tabelid ning renderdab vormi
const seosAdd = async (req, res)=>{
    let conn;
    try{
        conn = await mysql.createConnection(dbConf);
        console.log("Andmebaasiühendus loodud!");
        const [people] = await conn.execute("SELECT id, first_name, last_name FROM person");
        const [films] = await conn.execute("SELECT id, title FROM film");
        const [positions] = await conn.execute("SELECT id, position_name FROM `position`");
        await conn.end();
        res.render("seos_add", {people: people, films: films, positions: positions, notice: "Vali seos"});
    }
    catch(err){
        console.log("Viga: " + err);
        if(conn) await conn.end();
        res.render("seos_add", {people: [], films: [], positions: [], notice: "Tekkis viga: " + err});
    }
};

// POST: salvestab seose (rolli võimalik)
const seosAddPost = async (req, res)=>{
    let conn;
    try{
        const personId = req.body.personSelect;
        const filmId = req.body.filmSelect;
        const positionId = req.body.positionSelect;
        const role = req.body.roleInput || null; // näitleja rolli jaoks
        if(!(personId && filmId && positionId)){
            res.render("seos_add", {people: [], films: [], positions: [], notice: "Palun vali kõik lahtrid!"});
            return;
        }
        conn = await mysql.createConnection(dbConf);
        const sql = "INSERT INTO person_film_position (person_id, film_id, position_id, role) VALUES (?, ?, ?, ?)";
        await conn.execute(sql, [personId, filmId, positionId, role]);
        await conn.end();
        res.redirect("/eestifilm/seosed");
    }
    catch(err){
        console.log("Viga: " + err);
        if(conn) await conn.end();
        res.render("seos_add", {people: [], films: [], positions: [], notice: "Tekkis viga: " + err});
    }
};

// GET: kuvab kõik seosed (lihtne tabel)
const seosedList = async (req, res)=>{
    let conn;
    try{
        conn = await mysql.createConnection(dbConf);
        const sql = `SELECT p.id as person_id, p.first_name, p.last_name, f.title as film_title, pos.position_name, rel.role
                     FROM person p
                     JOIN person_film_position rel ON p.id = rel.person_id
                     JOIN film f ON f.id = rel.film_id
                     JOIN \`position\` pos ON pos.id = rel.position_id
                     ORDER BY p.id`;
        const [rows] = await conn.execute(sql);
        await conn.end();
        res.render("seosed", {relations: rows});
    }
    catch(err){
        console.log("Viga: " + err);
        if(conn) await conn.end();
        res.render("seosed", {relations: []});
    }
}; */
//siit lisasin


const seosAdd = async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConf);
    const [people] = await conn.execute("SELECT id, first_name, last_name FROM person ORDER BY last_name, first_name");
    const [films] = await conn.execute("SELECT id, title FROM film ORDER BY title");
    const [positions] = await conn.execute("SELECT id, position_name FROM `position` ORDER BY position_name");
    await conn.end();
    res.render("seos_add", { people: people, films: films, positions: positions, notice: "" });
  } catch (err) {
    console.error("seosAdd error:", err);
    if (conn) await conn.end();
    res.render("seos_add", { people: [], films: [], positions: [], notice: "Tekkis viga: " + err });
  }
};

const seosAddPost = async (req, res) => {
  let conn;
  try {
    const personId = req.body.personSelect;
    const filmId = req.body.filmSelect;
    const positionId = req.body.positionSelect;
    const role = req.body.roleInput || null;

    if (!(personId && filmId && positionId)) {
      // kui midagi puudu, laadime selectid uuesti ja kuvatakse teade
      conn = await mysql.createConnection(dbConf);
      const [people] = await conn.execute("SELECT id, first_name, last_name FROM person ORDER BY last_name, first_name");
      const [films] = await conn.execute("SELECT id, title FROM film ORDER BY title");
      const [positions] = await conn.execute("SELECT id, position_name FROM `position` ORDER BY position_name");
      await conn.end();
      res.render("seos_add", { people, films, positions, notice: "Palun vali isik, film ja amet." });
      return;
    }

    conn = await mysql.createConnection(dbConf);
    const sql = "INSERT INTO person_film_position (person_id, film_id, position_id, role) VALUES (?, ?, ?, ?)";
    await conn.execute(sql, [personId, filmId, positionId, role]);
    await conn.end();
    res.redirect("/eestifilm/seosed");
  } catch (err) {
    console.error("seosAddPost error:", err);
    if (conn) await conn.end();
    res.render("seos_add", { people: [], films: [], positions: [], notice: "Tekkis viga: " + err });
  }
};

const seosedList = async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConf);
    const sql = `
      SELECT p.id AS person_id, p.first_name, p.last_name,
             f.title AS film_title, pos.position_name, rel.role
      FROM person_film_position rel
      JOIN person p ON p.id = rel.person_id
      JOIN film f ON f.id = rel.film_id
      JOIN \`position\` pos ON pos.id = rel.position_id
      ORDER BY p.last_name, p.first_name, f.title
    `;
    const [rows] = await conn.execute(sql);
    await conn.end();
    res.render("seosed", { relations: rows });
  } catch (err) {
    console.error("seosedList error:", err);
    if (conn) await conn.end();
    res.render("seosed", { relations: [] });
  }
};


module.exports = {
    filmHomePage,
    filmPeople, 
    filmPeopleAdd, 
    filmPeopleAddPost, 
    filmPosition, 
    filmPositionAdd, 
    filmPositionAddPost,
    filmAdd,
    filmAddPost,
    seosAdd,
    seosAddPost,
    seosedList
};