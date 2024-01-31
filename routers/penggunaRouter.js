const router = require("express").Router();
const db = require("../config/db");

const table = "pengguna";

// Endpoint untuk tabel user

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(err.message);
    }
    res.json(result);
  });
});

router.get("/:id_pengguna", (req, res) => {
  const id_pengguna = req.params.id_pengguna;
  db.query(`select * from ${table} where id_pengguna = ?`, [id_pengguna], (err, result) => {
    if (err) {
      res.status(500).json(err.message);
    }
    res.json(result);
  });
});

router.put("/:id_pengguna", (req, res) => {
  const id_pengguna = req.params.id_pengguna;
  const { nama, email, password } = req.body;
  db.query(
    `UPDATE ${table} SET nama = ?, email = ?, password = ? WHERE id_pengguna = ?`,
    [nama, email, password, id_pengguna],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json({ id_pengguna: id_pengguna });
    }
  );
});

router.post("/", (req, res) => {
  const { nama, email, password } = req.body; // Sesuaikan field sesuai dengan database Anda
  db.query(
    `INSERT INTO ${table} (nama, email, password) VALUES (?, ?, ?)`,
    [nama, email, password],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json({ id: result.insertId });
    }
  );
});

router.delete("/:id_pengguna", (req, res) => {
  const id_pengguna = req.params.id_pengguna;
  db.query(`delete from ${table} where id_pengguna = ?`, [id_pengguna], (err, result) => {
    if (err) {
      res.status(500).json(err.message);
    }
    res.json({ message: "idpengguna berhasil dihapus"});
  });
});

// Endpoint untuk mencari pengguna berdasarkan nama

router.get("/nama/:nama", (req, res) => {
  const nama = req.params.nama;
  db.query(
    `select * from ${table} where nama like ?`,
    ["%" + nama + "%"],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json(result);
    }
  );
});

// Endpoint untuk mencari pengguna berdasarkan email

router.get("/email/:email", (req, res) => {
  const email = req.params.email;
  db.query(
    `select * from ${table} where email = ?`,
    [email],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json(result);
    }
  );
});

// Endpoint untuk mencari pengguna berdasarkan password

router.get("/password/:password", (req, res) => {
  const password = req.params.password;
  db.query(
    `select * from ${table} where password = ?`,
    [password],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json(result);
    }
  );
});

module.exports = router;
