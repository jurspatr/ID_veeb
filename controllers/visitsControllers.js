const fs = require("fs");
//const dateEt = require("./src/dateTimeET");

const visitRegister = (req, res) => {
  res.render("regvisit");
}; 
const path = require("path");
const dateEt = require("../src/dateTimeET"); // <- õige tee

const visitLogFile = path.join(__dirname, "..", "public", "txt", "visitlog.txt");

const visitRegisterPost = (req, res) => {
  const line = `${req.body.firstNameInput || ""} ${req.body.lastNameInput || ""}, ${dateEt.longDate()} kell ${dateEt.time()};`;
  fs.open("public/txt/visitlog.txt", "a", (err) => {
    if (err) return res.status(500).send("Faili avamisel viga");
    fs.appendFile("public/txt/visitlog.txt", line, (err) => {
      if (err) return res.status(500).send("Faili kirjutamisel viga");
      res.redirect("/visits/log");
    });
  });
};

const visitLog = (req, res) => {
  fs.readFile("public/txt/visitlog.txt", "utf8", (err, data) => {
    if (err) {
      return res.render("genericlist", { heading: "Registreeritud külastused", listData: ["Ei leidnud ühtegi külastust!"] });
    }
    const items = data.split(";").filter(Boolean);
    res.render("genericlist", { heading: "Registreeritud külastused", listData: items });
  });
};

module.exports = { visitRegister, visitRegisterPost, visitLog };