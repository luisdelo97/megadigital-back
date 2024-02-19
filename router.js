import express from "express";

const router = express.Router();

router.post("/", autenticar);

router.post("/registrar", registrar);

export default router;
