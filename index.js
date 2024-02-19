import express from "express";
import router from "./router";

const app = express();
app.use(express.json());

// const dominiosPermitidos = [process.env.FRONTEND_URL];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (dominiosPermitidos.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use("/", router);

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
