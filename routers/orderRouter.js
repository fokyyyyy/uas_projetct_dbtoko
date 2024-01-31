const router = require("express").Router();
const db = require("../config/db"); 

const table = "order";

// Endpoint untuk tabel orders
router.get("/", (req, res) => {
  db.query(`select * from \`${table}\``, (err, result) => { // Tambahkan backtick (`) di sini
    if (err) {
      res.status(500).json(err.message);
    }
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query(`select * from \`${table}\` where id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).json(err.message);
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  // Sesuaikan field sesuai dengan database Anda
  const { id_pengguna, id_produk, jumlah } = req.body;
  db.query(
    `INSERT INTO \`${table}\` (id_pengguna, id_produk, jumlah) VALUES (?, ?, ?)`,
    [id_pengguna, id_produk, jumlah],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json({ id: result.insertId });
    }
  );
});




router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query(`delete from \`${table}\` where id = ?`, [id], (err, result) => {
    if (err) {
      res.status(500).json(err.message);
    }
    res.json({ message: "berhasil dihapus"});
  });
});

router.get("/id_pengguna/:id", (req, res) => {
  const userId = req.params.id;
  db.query(
    `select * from \`${table}\` where id_pengguna = ?`,
    [userId],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json(result);
    }
  );
});

router.get("/id_produk/:id", (req, res) => {
  const productId = req.params.id;
  db.query(
    `select * from \`${table}\` where id_produk = ?`,
    [productId],
    (err, result) => {
      if (err) {
        res.status(500).json(err.message);
      }
      res.json(result);
    }
  );
});

module.exports = router;
