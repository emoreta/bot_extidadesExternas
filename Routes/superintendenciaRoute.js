import express from "express";
import asyncHandler from "express-async-handler";
import Superintendencia from "../Sites/superintendencia.js";

const superintendenciaRoute = express.Router();

superintendenciaRoute.post(
    "/",
    asyncHandler(async (req, res) => {
        const { tipoDocumento,id,fechaExpedicion,correoElectronico} = req.body;
        const resultado=await Superintendencia(tipoDocumento,id,fechaExpedicion,correoElectronico);
        res.json(resultado);
    }
    )
)
export default superintendenciaRoute;