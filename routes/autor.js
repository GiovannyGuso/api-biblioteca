const express = require("express");
const router = express.Router();
const Autor = require("../models/autor");

//Para obtener todos los autores
router.get("/", async (req,res)=>{
    try {
        const autores = await Autor.findAll();
        res.json(autores);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al obtener todos los autores"});
    }
});

//Para obtener autor por id
router.get("/:id", async (req,res)=>{
    try {
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        if (!autor) {
            return res.status(404).json({"mensjae":"No se encontro el autor"});
        }
        res.json(autor);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al obtener todos los autores"});
    }
});

router.post("/",async (req, res) =>{
    try {
        const { nombre, nacionalidad } = req.body;
        const autor = await Autor.create({nombre, nacionalidad});
        res.status(201).json(autor);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al crear autor"});
    }
});

router.put("/:id",async (req, res) =>{
    try {
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        const { nombre, nacionalidad } = req.body;
        await autor.update({nombre, nacionalidad});
        res.status(200).json(autor);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al acualizar autor"});
    }
});

router.delete("/:id",async (req, res) =>{
    try {
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        await autor.destroy();
        res.status(200).json({"mensaje":`El autor con el id ${id} fue eliminado correctamente`});
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al eliminar autor"});
    }
});

module.exports = router;