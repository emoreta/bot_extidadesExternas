import express from "express";
import asyncHandler from "express-async-handler";
import Supa from "../Sites/supa.js";

const supaRoute = express.Router();

supaRoute.post(
    "/",
    asyncHandler(async (req, res) => {
        const { cedula } = req.body;
        const resultado=await Supa(cedula);
        res.json(resultado);
    }
    )
)
export default supaRoute;