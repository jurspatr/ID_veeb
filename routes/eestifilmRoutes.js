const express = require("express");
const router = express.Router();

//kontrollerid
const {
	filmHomePage,
	filmPeople, 
	filmPeopleAdd, 
	filmPeopleAddPost, 
	filmPosition, 
	filmPositionAdd, 
	filmPositionAddPost} = require("../controllers/eestifilmControllers");

//app.get("/eestifilm", (req, res)=>{
router.route("/").get(filmHomePage);

//app.get("/eestifilm/inimesed", async (req, res)=>{
router.route("/inimesed").get(filmPeople);	

//app.get("/eestifilm/inimesed_add", (req, res)=>{
router.route("/inimesed_add").get(filmPeopleAdd);
router.route("/inimesed_add").post(filmPeopleAddPost);

//app.get("/eestifilm/ametid", (req, res)=>{
router.route("/ametid").get(filmPosition);	
router.route("/ametid_add").get(filmPositionAdd);
router.route("/ametid_add").post(filmPositionAddPost);


module.exports = router;