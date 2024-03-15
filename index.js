import express from "express";
import dotenv from "dotenv";
import funcionJudicialRoute from "./Routes/funcionJudicialRoute.js";
import supaRoute from "./Routes/supaRoute.js";
import superintendenciaRoute from "./Routes/superintendenciaRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/funcionJudicial", funcionJudicialRoute);
app.use("/api/supa", supaRoute);
app.use("/api/superintendencia", superintendenciaRoute);

const PORT = process.env.PORT || 8089;
app.listen(PORT, console.log(`server run in port ${PORT}`));