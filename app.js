const express = require("express");
const app = express();
const PORT = 3001;
const db = require("./config/db");
const bodyParser = require("body-parser");
const adminAuth = require("./middleware/admin");
const jwt = require("jsonwebtoken");
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const penggunaRouter = require('./routers/penggunaRouter'); 
const produkRouter = require('./routers/produkRouter');
const orderRouter = require('./routers/orderRouter');


app.use('/api/pengguna', penggunaRouter);
app.use('/api/produk', produkRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
  res.json({
    autor: "gumi",
    path: {
      pengguna: ["GET /api/pengguna", "GET /api/pengguna/:id_pengguna", "PUT /api/pengguna/:id_pengguna", "DELETE /api/pengguna/:id_pengguna", "GET /api/pengguna/nama/:nama", "GET /api/pengguna/email/:email", "GET /api/pengguna/email/:email", "GET /api/pengguna/password/:password"],
      order: ["GET /api/order", "POST /api/order", "DELETE /api/order/:id", "GET /api/order/id_pengguna/:id", "GET /api/order/id_produk/:id"],
      produk: [
        "GET /api/produk",
        "GET /api/produk/:id",
        "POST /api/produk",
        "PUT /api/produk/:id",
        "DELETE /api/produk/:id",
        "GET /api/produk/nama/:nama",
        "GET /api/produk/harga/:harga",
      ],
    },
  });
});



app.get("/admin", adminAuth, (req, res) => {
  res.json({ message: "You have access to this protected route", user: req.user });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = { username: "admin", password: "admin" };
  if (username === user.username && password === user.password) {
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '5m' }); // Ubah expiresIn menjadi '5m'
    res.json({ token });
  } else {
    res.json({ message: "kamu tidak dapat akses" });
  }
});







app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });