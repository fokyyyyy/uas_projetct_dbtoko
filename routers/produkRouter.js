const router = require("express").Router();
const db = require("../config/db");  

const table = "produk";

// Endpoint untuk tabel products
router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(err.message);
    }
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query(`select * from ${table} where id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).json(err.message);
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { nama, harga } = req.body; // Sesuaikan field sesuai dengan database Anda
  db.query(
    `INSERT INTO ${table} (nama, harga) VALUES (?, ?)`,
    [nama, harga],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json({ id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nama, harga } = req.body; // Sesuaikan field sesuai dengan database Anda
  db.query(
    `UPDATE ${table} SET nama = ?, harga = ? WHERE id = ?`,
    [nama, harga, id],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json({ id: id });
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query(`delete from ${table} where id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).json(err.message);
    }
    res.json({ message: "Produk berhasil dihapus" });
  });
});

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

router.get("/harga/:harga", (req, res) => {
  const harga = req.params.harga;
  db.query(
    `select * from ${table} where harga = ?`,
    [harga],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json(result);
    }
  );
});

module.exports = router;
