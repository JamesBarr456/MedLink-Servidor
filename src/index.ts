import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

// Configurar las variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(morgan("dev")); // Ver peticiones en la consola
app.use(express.json()); // Para parsear JSON en el cuerpo de las peticiones

// Ruta básica
app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
