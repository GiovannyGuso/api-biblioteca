const express = require("express");
const router = express.Router();
const Genero = require("../models/genero");

//Para obtener todos los generos
router.get("/", async (req,res)=>{
    try {
        const generos = await Genero.findAll();
        res.json(generos);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al obtener todos los generos"});
    }
});

//Para obtener Genero por id
router.get("/:id", async (req,res)=>{
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);
        if (!genero ) {
            return res.status(404).json({"mensjae":"No se encontro el genero"});
        }
        res.json(genero);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al obtener todos los generos"});
    }
});

router.post("/",async (req, res) =>{
    try {
        const { nombre, descripcion } = req.body;
        const genero = await Genero.create({nombre, descripcion});
        res.status(201).json(genero);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al crear genero"});
    }
});

router.put("/:id",async (req, res) =>{
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);
        const { nombre, descripcion } = req.body;
        await genero.update({nombre, descripcion});
        res.status(200).json(genero);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al acualizar genero"});
    }
});

router.delete("/:id",async (req, res) =>{
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);
        await genero.destroy();
        res.status(200).json({"mensaje":`El genero con el id ${id} fue eliminado correctamente`});
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al eliminar genero"});
    }
});

module.exports = router;