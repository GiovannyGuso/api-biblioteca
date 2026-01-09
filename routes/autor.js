const express = require("express");
const router = express.Router();
const Autor = require("../models/autor")

//GET para obetenr todos los autores
router.get("/", async (req, res)=>{
    try{
        const autores = await Autor.findAll();
        res.json(autores);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//GET para obtener un autor por id
router.get("/:id", async (req, res)=>{
    try{
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        if (!autor){
            res.status(404).json({"mensaje": "No se encontro"})
        }
        res.json(autor);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//POST para crear un nuevo autor
router.post("/", async (req, res)=>{
    try{
        const { nombre, nacionalidad } = req.body;
        const autor = await Autor.create({nombre, nacionalidad});
        res.status(201).json(autor);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//PUT para actualizar un autor por id
router.put("/:id", async (req, res)=>{
    try{
        const { id } = req.params
        const { nombre, nacionalidad } = req.body;

        const autor = await Autor.findByPk(id);
        await autor.update({nombre, nacionalidad});
        res.json(autor);
        if (!autor){
            res.status(404).json({"mensaje": "No se encontro"})
        }
        res.json(autor);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//DELETE para eliminar un autor por id
router.delete("/:id", async (req, res)=>{
    try{
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        await autor.destroy();
        res.json(autor);
        if (!autor){
            res.status(404).json({"mensaje": "No se encontro"})
        }
        res.json({"mensaje": `El autor con el id ${id} fue eliminado.`});
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

module.exports = router;