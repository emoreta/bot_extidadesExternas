import express from "express";
import asyncHandler from "express-async-handler";
//const { FuncionJudicial } = require('../Sites/funcionJudicial');
import FuncionJudicial from "../Sites/funcionJudicial.js";

const funcionJudicialRoute = express.Router();

funcionJudicialRoute.post(
    "/",
    asyncHandler(async (req, res) => {
        const { cedula } = req.body;
        const resultado=await FuncionJudicial(cedula);
        res.json(resultado);
    }
    )
)

export default funcionJudicialRoute;