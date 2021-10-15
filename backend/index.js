const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "FID_System",
});

app.get('/images', (req, res) => {
    db.query("SELECT * FROM fid", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get('/Photograph', (req, res) => {
    db.query("SELECT * FROM fid WHERE type = 'Photograph'", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.get('/Drawing', (req, res) => {
    db.query("SELECT * FROM fid WHERE type = 'Drawing'", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    const type = req.body.type;
;
  
    db.query(
      "INSERT INTO fid (name, url, type) VALUES (?,?,?)",
      [name, url, type],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

app.put("/update", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    db.query(
      "UPDATE fid SET name = ? WHERE id = ?",
      [name, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM fid WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.listen(3001, () => {
    console.log("server is running ");
});
