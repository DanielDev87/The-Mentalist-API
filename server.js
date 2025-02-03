require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "The Mentalist API" });
});
//Importar rutas de entrypoints
const characterRoutes = require("./src/entrypoints/characterRoutes");
app.use("/api", characterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});